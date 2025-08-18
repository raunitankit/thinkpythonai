"use client";

import { useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";

declare global {
  interface Window {
    loadPyodide?: (opts: { indexURL: string }) => Promise<any>;
  }
}

type Props = {
  defaultCode?: string;
};

export default function DemoRunner({
  defaultCode = `print("Hello, ThinkPythonAI! 👋")
for i in range(3):
    print("Python is fun!", i+1)`,
}: Props) {
  const [code, setCode] = useState(defaultCode);
  const [loading, setLoading] = useState(false);
  const [running, setRunning] = useState(false);
  const [out, setOut] = useState("");
  const [err, setErr] = useState("");

  const pyodideRef = useRef<any>(null);

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

      // Small helper to capture stdout/stderr
      await pyodide.runPythonAsync(`
import sys, io, traceback

def __run_user_code__(code: str):
    stdout_buf, stderr_buf = io.StringIO(), io.StringIO()
    old_out, old_err = sys.stdout, sys.stderr
    sys.stdout, sys.stderr = stdout_buf, stderr_buf
    try:
        ns = {}
        exec(code, ns, ns)
    except Exception as e:
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
    setCode(defaultCode);
    setOut("");
    setErr("");
  }

  return (
    <div className="space-y-3">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        className="w-full rounded-xl border bg-slate-900 text-slate-100 font-mono
                   text-[11px] md:text-sm leading-relaxed p-3 md:p-4
                   focus:outline-none focus:ring-2 focus:ring-indigo-400
                   min-h-[140px] md:min-h-[180px] resize-vertical"
      />

      <div className="flex items-center gap-2">
        <button
          onClick={onRun}
          disabled={loading || running}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white
                     px-3 py-2 md:px-4 md:py-2.5 disabled:opacity-50"
          title={loading ? "Loading Python…" : "Run (Cmd/Ctrl + Enter)"}
        >
          <Play className="w-4 h-4" />
          {loading ? "Loading Python…" : running ? "Running…" : "Run"}
        </button>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 md:px-4 md:py-2.5"
          title="Reset to example"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      {out && (
        <div className="rounded-xl bg-slate-950 text-slate-100 font-mono
                        text-[11px] md:text-sm leading-relaxed p-3 md:p-4 overflow-auto">
          <pre>{out}</pre>
        </div>
      )}
      {err && (
        <div className="rounded-xl bg-rose-50 text-rose-700 border border-rose-200 p-3 md:p-4 text-xs md:text-sm">
          <div className="font-semibold mb-1">Traceback (most recent call last):</div>
          <pre className="whitespace-pre-wrap">{err}</pre>
        </div>
      )}
    </div>
  );
}
