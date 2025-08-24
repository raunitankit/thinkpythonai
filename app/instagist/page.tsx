"use client";
import Link from "next/link";
import { Home } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type SummResp = { title?: string; gist?: string; error?: string; teach?: string };

function readingTimeWords(text: string) {
  const words = (text?.trim().match(/\S+/g) || []).length;
  const minutes = Math.max(1, Math.round(words / 200)); // ~200 wpm
  return { words, minutes };
}

/** Client-side extractive summary for pasted text */
function summarizeLocal(text: string, max = 5, minLen = 40): string {
  const STOP = new Set([
    "the","is","in","at","of","a","and","to","for","on","it","that","as","with","by","an","be","this","are",
    "was","were","or","from","but","not","have","has","had","you","your","we","our","they","their","he","she",
    "his","her","its","them","there","here","which","who","whom","what","when","where","why","how","can","could",
    "would","should","may","might","will","shall","than","then","if","so","do","does","did","about","into","over",
    "also","more","most","some","such","no","nor","only","own","same","too","very","s","t","just","don","now",
  ]);
  const sents = (text || "")
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+(?=[A-Z0-9])/)
    .map(s => s.trim())
    .filter(Boolean);

  if (text.length < 400) return sents.slice(0, max).join(" ");

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

export default function InstaGist() {
  const [url, setUrl] = useState("");
  const [sentences, setSentences] = useState(5);
  const [minLen, setMinLen] = useState(40);
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState<SummResp | null>(null);

  // Paste-text fallback
  const [pasteMode, setPasteMode] = useState(false);
  const [pasted, setPasted] = useState("");

  // Speech
  const [rate, setRate] = useState<number>(() => {
    if (typeof window === "undefined") return 0.9;
    const saved = Number(localStorage.getItem("tg_rate"));
    return Number.isFinite(saved) && saved > 0 ? saved : 0.9;
  });
  const [voiceName, setVoiceName] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("tg_voice") || "";
  });
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
  const lastPlayedRef = useRef<"play" | "stop">("stop");

  useEffect(() => {
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  useEffect(() => { localStorage.setItem("tg_rate", String(rate)); }, [rate]);
  useEffect(() => { localStorage.setItem("tg_voice", voiceName); }, [voiceName]);

  const selectedVoice = useMemo(
    () => voices.find(v => v.name === voiceName) || voices.find(v => /en/i.test(v.lang)) || voices[0],
    [voices, voiceName]
  );

  function stopSpeaking() {
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
      lastPlayedRef.current = "stop";
    }
  }

  function speak(text: string) {
    stopSpeaking();
    if (!text) return;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = rate; // 0.1–10 (1 default)
    if (selectedVoice) u.voice = selectedVoice;
    utterRef.current = u;
    window.speechSynthesis.speak(u);
    lastPlayedRef.current = "play";
  }

  function setRateSafely(v: number) {
    const clamped = Math.max(0.6, Math.min(2, v)); // clamp 0.6–2.0
    setRate(clamped);
  }

  // Keyboard shortcuts: [ to slow −0.25×, ] to speed +0.25×, Space to Play/Stop
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // Avoid typing in inputs/textarea
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      const isTyping = tag === "input" || tag === "textarea" || (e as any).isComposing;
      if (isTyping) return;

      if (e.key === "[") {
        e.preventDefault();
        setRateSafely(rate - 0.25);
      } else if (e.key === "]") {
        e.preventDefault();
        setRateSafely(rate + 0.25);
      } else if (e.code === "Space") {
        e.preventDefault();
        if (resp?.gist) {
          if (window.speechSynthesis.speaking) {
            stopSpeaking();
          } else {
            speak(resp.gist);
          }
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rate, resp?.gist, selectedVoice]);

  async function handleSummarize(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResp(null);
    stopSpeaking();

    try {
      if (pasteMode) {
        const gist = summarizeLocal(pasted, sentences, minLen);
        if (!gist) {
          setResp({
            error: "We couldn't find enough text to summarize.",
            teach: "Paste a few paragraphs from the article and try again.",
          });
        } else {
          const data = { title: "Your Pasted Text", gist };
          setResp(data);
          // auto-play on success
          speak(data.gist!);
        }
      } else {
        const r = await fetch("/api/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, maxSentences: sentences, minSentenceLen: minLen }),
        });
        const data: SummResp = await r.json();
        setResp(data);
        if (!data.error && data.gist) speak(data.gist);
      }
    } catch {
      setResp({
        error: "Network error reaching the summarizer.",
        teach: "Wi‑Fi hiccup—try again or use the Paste Text mode.",
      });
    } finally {
      setLoading(false);
    }
  }

  function copyGist() {
    if (resp?.gist) navigator.clipboard.writeText(resp.gist);
  }

  function downloadTxt() {
    if (!resp?.gist) return;
    const blob = new Blob([resp.gist], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = (resp.title ? resp.title.replace(/[^\w\-]+/g, "_").slice(0, 60) : "gist") + ".txt";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const stats = resp?.gist ? readingTimeWords(resp.gist) : null;

  return (
    <div style={{minHeight:"100vh", background:"linear-gradient(180deg,#fae8ff,#e0f2fe)"}}>
      {/* Back to main site */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "16px 20px 0", display: "flex", alignItems: "center", gap: 8 }}>
        {/* Emoji link */}
        <Link href="/" style={{ fontSize: "20px", textDecoration: "none" }}>
         🔙
        </Link>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            borderRadius: 12,
            background: "#4f46e5",
            color: "#fff",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          <Home width={16} height={16} />
          Back to ThinkPythonAI
        </Link>
      </div>
      <div style={{maxWidth:900, margin:"0 auto", padding:"40px 20px"}}>
      <h1 style={{fontSize:36, fontWeight:800, color:"#0f172a"}}>🎧 InstaGist🚀</h1>
      <p style={{color:"#334155", marginTop:6}}>
        Paste a public article URL or switch to{" "}
        <button
          onClick={() => setPasteMode(!pasteMode)}
          style={{
            color: "#0ea5e9",
            textDecoration: "underline",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontWeight: 600
          }}
        >
          {pasteMode ? "URL mode" : "Paste Text mode"}
        </button>.
        <span style={{marginLeft:8, fontSize:12, color:"#64748b"}}>
          Tips: [ = slower, ] = faster, Space = play/stop
        </span>
      </p>  


        <form onSubmit={handleSummarize} style={{background:"rgba(255,255,255,0.9)", borderRadius:16, padding:16, marginTop:16}}>
          {!pasteMode ? (
            <label style={{display:"block", fontSize:14, fontWeight:600, color:"#334155"}}>
              Article URL
              <input
                style={{marginTop:6, width:"100%", border:"1px solid #cbd5e1", borderRadius:12, padding:"10px 12px"}}
                placeholder="https://example.com/great-article"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                inputMode="url"
              />
            </label>
          ) : (
            <label style={{display:"block", fontSize:14, fontWeight:600, color:"#334155"}}>
              Paste article text
              <textarea
                style={{marginTop:6, width:"100%", minHeight:160, border:"1px solid #cbd5e1", borderRadius:12, padding:"10px 12px"}}
                placeholder="Paste a few paragraphs here…"
                value={pasted}
                onChange={(e)=>setPasted(e.target.value)}
                required
              />
            </label>
          )}

          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginTop:12}}>
            <label style={{fontSize:14}}>
              Sentences
              <input type="number" min={2} max={12} value={sentences}
                     onChange={(e)=>setSentences(parseInt(e.target.value||"5",10))}
                     style={{marginTop:6, width:"100%", border:"1px solid #cbd5e1", borderRadius:12, padding:"10px 12px"}}/>
            </label>
            <label style={{fontSize:14}}>
              Min sentence length
              <input type="number" min={20} max={200} value={minLen}
                     onChange={(e)=>setMinLen(parseInt(e.target.value||"40",10))}
                     style={{marginTop:6, width:"100%", border:"1px solid #cbd5e1", borderRadius:12, padding:"10px 12px"}}/>
            </label>

            {/* Voice & speed (with YouTube-like presets) */}
            <div style={{fontSize:14}}>
              Voice & speed
              <div style={{display:"flex", gap:8, marginTop:6, alignItems:"center", flexWrap:"wrap"}}>
                <select
                  value={voiceName}
                  onChange={(e)=>setVoiceName(e.target.value)}
                  style={{flex:"1 1 280px", border:"1px solid #cbd5e1", borderRadius:12, padding:"8px 10px"}}
                  aria-label="Choose voice"
                >
                  <option value="">(System default)</option>
                  {voices.map(v => <option key={v.name} value={v.name}>{v.name} — {v.lang}</option>)}
                </select>

                {/* Preset chips */}
                <div style={{display:"flex", gap:6, flexWrap:"wrap"}}>
                  {([0.75, 1, 1.25, 1.5, 1.75, 2] as const).map(sp => (
                    <button
                      key={sp}
                      type="button"
                      onClick={()=>setRateSafely(sp)}
                      title={`Set speed to ${sp}×`}
                      style={{
                        background: rate===sp ? "#0ea5e9" : "#e2e8f0",
                        color: rate===sp ? "#fff" : "#0f172a",
                        border:"none",
                        borderRadius:10,
                        padding:"8px 10px",
                        fontWeight:700,
                        cursor:"pointer",
                        minWidth:64
                      }}
                    >
                      {sp.toString().replace(/\.0$/, "")}×
                    </button>
                  ))}
                </div>
              </div>

              {/* Fine‑tune slider (0.6x–2.0x) */}
              <div style={{display:"flex", alignItems:"center", gap:10, marginTop:8}}>
                <input
                  type="range"
                  min={0.6}
                  max={2}
                  step={0.05}
                  value={rate}
                  onChange={(e)=>setRateSafely(parseFloat(e.target.value))}
                  title="Playback speed"
                  style={{flex:1}}
                />
                <span style={{fontFamily:"ui-monospace, SFMono-Regular, Menlo, monospace"}}>
                  {rate.toFixed(2)}×
                </span>
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading}
                  style={{marginTop:12, background:"#0369a1", color:"#fff", border:"none", borderRadius:12, padding:"10px 14px", fontWeight:700, cursor:"pointer", opacity:loading?0.7:1}}>
            {loading ? "Summarizing…" : "Summarize"}
          </button>
        </form>
{/* Help (collapsible) */}
<details
  style={{
    marginTop: 20,
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 16,
    padding: 12,
  }}
>
  <summary
    style={{
      cursor: "pointer",
      fontWeight: 800,
      color: "#0f172a",
      listStyle: "none",
      display: "flex",
      alignItems: "center",
      gap: 8,
      outline: "none",
    }}
  >
    <span aria-hidden>❓</span> Need help? <span style={{opacity:0.6}}>▼</span>
  </summary>

  <div style={{ marginTop: 10, padding: "4px 4px 0 4px" }}>
    <ul style={{ color: "#334155", lineHeight: 1.6, paddingLeft: 20, marginTop: 4 }}>
      <li>Paste a <strong>URL</strong> to an article (or switch to <strong>Paste Text</strong>).</li>
      <li>Pick how many <strong>sentences</strong> you want in your gist.</li>
      <li>Click <strong>Summarize</strong> — then press <strong>▶️ Play</strong> to listen.</li>
      <li>Adjust <strong>speed</strong> with buttons or keys: <code>[</code> / <code>]</code> and <code>Space</code>.</li>
    </ul>

    <div style={{ marginTop: 10, fontSize: 13, color: "#64748b" }}>
      <strong>Tips:</strong>
      <ul style={{ marginTop: 6, paddingLeft: 20 }}>
        <li>Works best on <em>public</em> articles (no paywall/login).</li>
        <li>If you see “401” (login) or “403” (blocked) errors, try <strong>Paste Text mode</strong>.</li>
        <li>You can <strong>copy</strong> or <strong>save</strong> the gist for homework notes.</li>
      </ul>
    </div>
  </div>
</details>

        {resp && (
          <section style={{marginTop:20, background:"#fff", borderRadius:16, padding:16}}>
            {resp.error ? (
              <>
                <p style={{color:"#dc2626", fontWeight:700}}>⚠️ {resp.error}</p>
                {resp.teach && <p style={{color:"#475569", fontSize:12}}>💡 {resp.teach}</p>}
              </>
            ) : (
              <>
                {resp.title && <h2 style={{fontSize:20, fontWeight:800, color:"#0f172a"}}>{resp.title}</h2>}
                {stats && (
                  <p style={{fontSize:12, color:"#64748b", marginTop:4}}>
                    {stats.words} words • ~{stats.minutes} min to read
                  </p>
                )}
                <p style={{color:"#0f172a", lineHeight:1.6, whiteSpace:"pre-line", marginTop:8}}>{resp.gist}</p>

                <div style={{display:"flex", flexWrap:"wrap", gap:8, marginTop:12}}>
                  <button onClick={()=>resp.gist && speak(resp.gist)}
                          style={{background:"#059669", color:"#fff", border:"none", borderRadius:10, padding:"8px 12px", fontWeight:700, cursor:"pointer"}}>
                    ▶️ Play
                  </button>
                  <button onClick={stopSpeaking}
                          style={{background:"#e2e8f0", color:"#0f172a", border:"none", borderRadius:10, padding:"8px 12px", fontWeight:700, cursor:"pointer"}}>
                    ⏹ Stop
                  </button>
                  <button onClick={copyGist}
                          style={{background:"#7c3aed", color:"#fff", border:"none", borderRadius:10, padding:"8px 12px", fontWeight:700, cursor:"pointer"}}>
                    📋 Copy Gist
                  </button>
                  <button onClick={downloadTxt}
                          style={{background:"#0ea5e9", color:"#fff", border:"none", borderRadius:10, padding:"8px 12px", fontWeight:700, cursor:"pointer"}}>
                    ⬇️ Save .txt
                  </button>
                </div>

                <p style={{fontSize:11, color:"#64748b", marginTop:8}}>
                  Educational note: We rank sentences by how often important words appear (an extractive summary).
                </p>
              </>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
