import { useMemo, useState } from "react";
import Head from "next/head";

type Result = {
  labels: Record<string, number>;
  toxicity: number;
  scam: number;
};

const BRAND = {
  name: "ThinkPythonAI",
  accentFrom: "from-blue-600",
  accentTo: "to-emerald-500",
  logoSrc: "/thinkpythonai-logo.png",
};

const PRESETS: Record<string, string> = {
  "Safe — Stranger request": "I only accept requests from people I actually know.",
  "Respectful — Don’t share": "Let’s not share that photo—it could hurt their feelings.",
  "Borderline — Just a joke": "Relax, it’s just a joke. Everyone shares stuff.",
  "Toxic": "You're such a loser.",
  "Scam": "Congrats! Click here to claim your FREE iPhone—offer ends today!",
};

function kinderRewrite(text: string) {
  const rude: Record<string, string> = { loser: "person", stupid: "unfair", idiot: "person" };
  return text
    .split(/(\W)/)
    .map((tok) => (rude[tok.toLowerCase()] ? rude[tok.toLowerCase()] : tok))
    .join("");
}

export default function DigitalCitizenship() {
  const [choice, setChoice] = useState<string>("Custom");
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toxThreshold, setToxThreshold] = useState<number>(0.6);

  const activeText = choice === "Custom" ? text : PRESETS[choice];

  async function analyze() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const r = await fetch("/api/digicit/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: activeText }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Request failed");
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const topLabel = useMemo(() => {
    if (!result) return null;
    return Object.keys(result.labels)[0] ?? null;
  }, [result]);

  const feedback = useMemo(() => {
    const bank: Record<string, string> = {
      "Safe behavior": "Great choice—this protects your privacy and keeps you safe online.",
      "Risky behavior": "Think twice—this choice could expose personal info or lead to unsafe interactions.",
      "Respectful": "Nice! That supports a positive, kind online community.",
      "Disrespectful": "Consider how this might make others feel—try a more considerate approach.",
    };
    return topLabel ? bank[topLabel] ?? "Good effort—let’s keep improving!" : "";
  }, [topLabel]);

  return (
    <>
      <Head>
        <title>Digital Citizenship Detector | {BRAND.name}</title>
        <meta
          name="description"
          content="Interactive, kid-friendly AI that estimates safety, respect, toxicity & scam likelihood—by ThinkPythonAI."
        />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <div className={`bg-gradient-to-r ${BRAND.accentFrom} ${BRAND.accentTo} text-white`}>
          <div className="mx-auto max-w-6xl px-4 py-12">
            <div className="flex items-center gap-3">
              <img src={BRAND.logoSrc} alt="ThinkPythonAI logo" className="h-10 w-10 rounded-lg bg-white/80 p-1" />
              <h1 className="text-3xl sm:text-4xl font-bold">Digital Citizenship Detector</h1>
            </div>
            <p className="mt-3 max-w-2xl text-white/90">
              A friendly tool to help students think before they post: safety, respect, and critical thinking—powered by AI.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="mx-auto max-w-4xl px-4 py-8">
          <div className="bg-gray-50 border rounded-2xl p-5 shadow-sm">
            <div className="grid gap-4">
              <label className="text-sm font-medium">Preset</label>
              <select
                value={choice}
                onChange={(e) => setChoice(e.target.value)}
                className="rounded-lg border p-2"
              >
                <option>Custom</option>
                {Object.keys(PRESETS).map((k) => (
                  <option key={k}>{k}</option>
                ))}
              </select>

              {choice === "Custom" && (
                <>
                  <label className="text-sm font-medium">Your text</label>
                  <textarea
                    className="w-full rounded-lg border p-3 h-32"
                    placeholder="Write how you would respond if a stranger sent you a friend request..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </>
              )}

              {choice !== "Custom" && (
                <div className="text-sm text-gray-700">
                  <span className="font-semibold">Preset text:</span> {activeText}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={analyze}
                  disabled={loading || !activeText.trim()}
                  className="rounded-lg bg-black text-white px-4 py-2 disabled:opacity-40"
                >
                  {loading ? "Analyzing…" : "Analyze"}
                </button>

                <button
                  onClick={() => {
                    setChoice("Custom");
                    setText("");
                    setResult(null);
                    setError(null);
                  }}
                  className="rounded-lg border px-4 py-2"
                >
                  Reset
                </button>

                <button
                  onClick={() => setText((t) => kinderRewrite(t))}
                  disabled={choice !== "Custom" || !text.trim()}
                  className="rounded-lg border px-4 py-2"
                  title="Suggest a kinder rewrite (simple local heuristic)"
                >
                  Kinder rewrite
                </button>
              </div>

              <div className="mt-2">
                <label className="text-sm font-medium">Highlight if toxicity ≥ {toxThreshold.toFixed(2)}</label>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={toxThreshold}
                  onChange={(e) => setToxThreshold(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {error && <div className="text-red-600 mt-4">{error}</div>}

          {result && (
            <div className="mt-6 space-y-4">
              <section className="border rounded-2xl p-4">
                <h2 className="font-semibold mb-2">Digital Behavior Labels</h2>
                <ul className="space-y-1">
                  {Object.entries(result.labels).map(([k, v]) => (
                    <li key={k} className="flex justify-between">
                      <span>{k}</span>
                      <span className="tabular-nums">{v.toFixed(3)}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={`border rounded-2xl p-4 ${result.toxicity >= toxThreshold ? "bg-red-50" : ""}`}>
                  <h3 className="font-semibold mb-1">Toxicity</h3>
                  <div className="text-2xl">{result.toxicity.toFixed(3)}</div>
                  {result.toxicity >= toxThreshold && (
                    <p className="text-sm mt-1 text-red-700">Heads-up: consider a kinder rewrite.</p>
                  )}
                </div>

                <div className="border rounded-2xl p-4">
                  <h3 className="font-semibold mb-1">Scam likelihood</h3>
                  <div className="text-2xl">{result.scam.toFixed(3)}</div>
                </div>
              </section>

              <section className="border rounded-2xl p-4 bg-green-50">
                <h3 className="font-semibold mb-1">Feedback</h3>
                <p className="text-gray-800">{feedback}</p>
              </section>

              <p className="text-xs text-gray-500">
                Note: These are estimates from small language models; always apply human judgment.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
