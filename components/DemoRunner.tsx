// components/DemoRunner.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw, Sparkles } from "lucide-react";

declare global {
  interface Window {
    loadPyodide?: (opts: { indexURL: string }) => Promise<any>;
  }
}

type Snippet = { key: string; title: string; code: string; };

const SNIPPETS: Snippet[] = [
    {
      key: "fortune",
      title: "🥠 AI Fortune Cookie",
      code: `import random
  messages = [
    "You will squash a bug on the first try.",
    "A clean commit brings a clear mind.",
    "Your next project gets 🌟🌟🌟🌟🌟",
    "You debug with the elegance of a zen master.",
    "An opportunity pings your inbox soon."
  ]
  print("🥠 Your AI fortune:")
  print(random.choice(messages))`,
    },
    {
      key: "confetti",
      title: "🎉 Emoji Confetti",
      code: `import random
  emojis = ["🎉","✨","💥","🎈","💫","🥳","🎊"]
  print("Party time! 🎉\\n")
  for _ in range(5):
      row = "".join(random.choice(emojis) for _ in range(24))
      print(row)`,
    },
    {
      key: "rocket",
      title: "🚀 Rocket Countdown",
      code: `import time
  print("🚀 Launching in...")
  for i in range(3, 0, -1):
      print(f"{i}…")
      time.sleep(0.2)
  print("Liftoff! ✨")`,
    },
    {
      key: "hello",
      title: "👋 Classic Hello + Loop",
      code: `print("Hello, ThinkPythonAI! 👋")
  for i in range(3):
      print("Python is fun!", i+1)`,
    },
  ];
  

export default function DemoRunner() {
  const [snip, setSnip] = useState<Snippet>(SNIPPETS[0]);
  const [code, setCode] = useState(snip.code);
  const [loading, setLoading] = useState(false);
  const [running, setRunning] = useState(false);
  const [out, setOut] = useState("");
  const [err, setErr] = useState("");
  const pyodideRef = useRef<any>(null);

  // When user switches snippet, reset editor & output
  useEffect(() => {
    setCode(snip.code);
    setOut("");
    setErr("");
  }, [snip]);

  async function ensurePyodideReady() {
    if (pyodideRef.current) return;
    setLoading(true);
    try {
      if (!window.loadPyodide) {
        await new Promise<void>((resolve, reject) => {
          const s = document.createElement("script");
          s.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
          s.onload = () => resolve();
          s.onerror = () => reject(new Error("Failed loading pyodide.js"));
          document.head.appendChild(s);
        });
      }
      const pyodide = await window.loadPyodide!({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/",
      });

      await pyodide.runPythonAsync(`
import sys, io, traceback
def __run_user_code__(code: str):
    stdout_buf, stderr_buf = io.StringIO(), io.StringIO()
    old_out, old_err = sys.stdout, sys.stderr
    sys.stdout, sys.stderr = stdout_buf, stderr_buf
    try:
        ns = {}
        exec(code, ns, ns)
    except Exception:
        traceback.print_exc()
    finally:
        sys.stdout, sys.stderr = old_out, old_err
    return {"stdout": stdout_buf.getvalue(), "stderr": stderr_buf.getvalue()}
      `);

      pyodideRef.current = pyodide;
    } finally {
      setLoading(false);
    }
  }

  async function onRun() {
    setOut("");
    setErr("");
    setRunning(true);
    try {
      await ensurePyodideReady();
      const fn = pyodideRef.current.globals.get("__run_user_code__");
      const resProxy = await fn(code);
      const res = resProxy.toJs?.() ?? resProxy;
      resProxy.destroy?.();
      setOut(String(res.stdout || ""));
      if (res.stderr) setErr(String(res.stderr));
      if (!res.stderr) {
        setOut((prev) => (prev.endsWith("\n") ? prev : prev + "\n") + "✅ See—easy and fun! 🚀");
      }
    } catch (e: any) {
      setErr(e?.message || "Error while running code.");
    } finally {
      setRunning(false);
    }
  }

  function onReset() {
    setCode(snip.code);
    setOut("");
    setErr("");
  }

  return (
    <div className="rounded-xl bg-slate-950 p-3 md:p-4 text-slate-100">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-3">
        <div className="inline-flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-fuchsia-400" />
          <span className="text-xs md:text-sm text-slate-300">Try a fun example:</span>
        </div>
        <select
          value={snip.key}
          onChange={(e) => {
            const next = SNIPPETS.find(s => s.key === e.target.value)!;
            setSnip(next);
          }}
          className="w-full md:w-auto rounded-lg bg-slate-900/70 border border-slate-700
                     px-3 py-2 text-sm"
          aria-label="Choose example"
        >
          {SNIPPETS.map(s => (
            <option key={s.key} value={s.key}>{s.title}</option>
          ))}
        </select>
      </div>

      {/* Editor */}
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        className="w-full rounded-lg border border-slate-800 bg-slate-900/80
                   text-slate-100 font-mono text-[12px] md:text-sm leading-relaxed
                   p-3 md:p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500
                   min-h-[150px] md:min-h-[180px] resize-vertical"
      />

      {/* Actions */}
      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={onRun}
          disabled={loading || running}
          className="inline-flex items-center gap-2 rounded-lg
                     bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white
                     px-3 py-2 md:px-4 md:py-2.5 disabled:opacity-50"
          title={loading ? "Loading Python…" : "Run (Cmd/Ctrl + Enter)"}
        >
          <Play className="w-4 h-4" />
          {loading ? "Loading Python…" : running ? "Running…" : "Run"}
        </button>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-lg
                     border border-slate-700 bg-slate-900/60 text-slate-200
                     px-3 py-2 md:px-4 md:py-2.5"
          title="Reset to example"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* Output */}
      {out && (
        <div className="mt-3 rounded-lg bg-slate-900/70 p-3 md:p-4 font-mono text-[12px] md:text-sm overflow-auto">
          <pre>{out}</pre>
        </div>
      )}
      {err && (
        <div className="mt-3 rounded-lg border border-rose-400/30 bg-rose-900/30 p-3 md:p-4 text-rose-200 text-xs md:text-sm">
          <div className="font-semibold mb-1">Traceback (most recent call last):</div>
          <pre className="whitespace-pre-wrap">{err}</pre>
        </div>
      )}
    </div>
  );
}
