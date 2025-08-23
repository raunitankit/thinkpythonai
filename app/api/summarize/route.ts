import * as cheerio from "cheerio";
export const runtime = "nodejs";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Safari/605.1.15";

const STOP = new Set([
  "the","is","in","at","of","a","and","to","for","on","it","that","as","with","by","an","be","this","are",
  "was","were","or","from","but","not","have","has","had","you","your","we","our","they","their","he","she",
  "his","her","its","them","there","here","which","who","whom","what","when","where","why","how","can","could",
  "would","should","may","might","will","shall","than","then","if","so","do","does","did","about","into","over",
  "also","more","most","some","such","no","nor","only","own","same","too","very","s","t","just","don","now",
]);

function splitSentences(text: string): string[] {
  return (text || "")
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+(?=[A-Z0-9])/)
    .map(s => s.trim())
    .filter(Boolean);
}

function summarize(text: string, max = 5, minLen = 40): string {
  if (!text) return "";
  if (text.length < 400) return splitSentences(text).slice(0, max).join(" ");
  const sents = splitSentences(text);
  const freqs: Record<string, number> = {};
  for (const w of (text.toLowerCase().match(/[a-z][a-z\-']+/g) || [])) {
    if (w.length < 3 || STOP.has(w)) continue;
    freqs[w] = (freqs[w] || 0) + 1;
  }
  const scored: [number, number, string][] = [];
  sents.forEach((s, i) => {
    if (s.length < minLen) return;
    const score = (s.toLowerCase().match(/[a-z][a-z\-']+/g) || [])
      .reduce((acc, t) => acc + (freqs[t] || 0), 0);
    if (score > 0) scored.push([i, score, s]);
  });
  if (!scored.length) return sents.slice(0, max).join(" ");
  scored.sort((a, b) => b[1] - a[1]);
  const top = scored.slice(0, max).sort((a, b) => a[0] - b[0]);
  return top.map(x => x[2]).join(" ");
}

async function extractArticle(html: string) {
  const $ = cheerio.load(html);
  const title = ($("title").first().text() || "").trim();
  const paras: string[] = [];
  $("article p, main p, .content p, .post p, p").each((_, el) => {
    const t = $(el).text().replace(/\s+/g, " ").trim();
    if (t) paras.push(t);
  });
  const text = Array.from(new Set(paras)).join("\n");
  return { title, text };
}

export async function POST(req: Request) {
  const { url, maxSentences = 5, minSentenceLen = 40 } = await req.json();
  try {
    if (!url || typeof url !== "string" || !/^https?:\/\//i.test(url)) {
      return Response.json({ error: "Please enter a valid http(s) URL.", teach: "URLs look like https://example.com." }, { status: 400 });
    }

    const r = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });

    if (r.status === 401) {
      return Response.json(
        { error: "This site requires you to be logged in (401 Unauthorized).", teach: "Open the page, log in, then try again—or pick a public article." },
        { status: 401 }
      );
    }
    if (r.status === 403) {
      return Response.json(
        { error: "This site blocked automated reads (403 Forbidden).", teach: "Some news sites protect content. Try a different, open site." },
        { status: 403 }
      );
    }
    if (!r.ok) {
      return Response.json(
        { error: `We couldn't fetch this page (HTTP ${r.status}).`, teach: "4xx is a request issue; 5xx is a site issue." },
        { status: r.status }
      );
    }

    const ctype = r.headers.get("content-type") || "";
    if (!/text\/html/i.test(ctype)) {
      return Response.json(
        { error: `This URL isn't HTML (got ${ctype}).`, teach: "Pick a typical blog/news article URL." },
        { status: 415 }
      );
    }

    const html = await r.text();
    const { title, text } = await extractArticle(html);

    if (!text || text.split(/\s+/).length < 40) {
      return Response.json(
        { error: "Not enough article text found to summarize.", teach: "Try a text-heavy page (blogs/tutorials work great!)." },
        { status: 422 }
      );
    }

    const gist = summarize(text, Number(maxSentences), Number(minSentenceLen));
    return Response.json({ title, gist });
  } catch (err: any) {
    return Response.json(
      { error: "Something went wrong while fetching/summarizing.", teach: "Network hiccup—try again.", details: err?.message || String(err) },
      { status: 500 }
    );
  }
}
