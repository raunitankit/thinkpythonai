
import type { NextApiRequest, NextApiResponse } from "next";

const HF = "https://api-inference.huggingface.co/models";
const HF_TOKEN = process.env.HF_TOKEN!;

async function hfFetch(model: string, body: any) {
  const res = await fetch(`${HF}/${model}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HF ${model} ${res.status}: ${text}`);
  }
  return res.json();
}

async function zeroShot(
  text: string,
  labels: string[],
  multiLabel = true,
  model = "facebook/bart-large-mnli"
) {
  const out = await hfFetch(model, {
    inputs: text,
    parameters: { candidate_labels: labels, multi_label: multiLabel },
  });
  const map: Record<string, number> = {};
  out.labels.forEach((l: string, i: number) => (map[l] = out.scores[i]));
  return map;
}

async function toxicity(text: string) {
  const out = await hfFetch("unitary/toxic-bert", { inputs: text });
  const arr = Array.isArray(out) ? out[0] : out;
  const tox = arr.find((s: any) => (s.label || "").toLowerCase() === "toxic");
  return tox ? Number(tox.score) : Math.max(...arr.map((s: any) => Number(s.score) || 0));
}

async function scam(text: string) {
  const labels = ["Likely scam", "Likely legitimate"];
  const out = await hfFetch("facebook/bart-large-mnli", {
    inputs: text,
    parameters: { candidate_labels: labels, multi_label: false },
  });
  const idx = out.labels.indexOf("Likely scam");
  return idx >= 0 ? Number(out.scores[idx]) : 0;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });
    if (!HF_TOKEN) return res.status(500).json({ error: "HF_TOKEN missing" });

    const { text } = req.body as { text?: string };
    if (!text || !text.trim()) return res.status(400).json({ error: "text is required" });

    const LABELS = ["Safe behavior", "Risky behavior", "Respectful", "Disrespectful"];

    const [labelScores, tox, scamScore] = await Promise.all([
      zeroShot(text, LABELS, true),
      toxicity(text),
      scam(text),
    ]);

    const ordered = Object.fromEntries(
      Object.entries(labelScores).sort((a, b) => b[1] - a[1]).map(([k, v]) => [k, Number(v.toFixed(3))])
    );

    res.status(200).json({
      labels: ordered,
      toxicity: Number(tox.toFixed(3)),
      scam: Number(scamScore.toFixed(3)),
    });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e.message || "server error" });
  }
}
