"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Loader2, Play, StopCircle, Upload, Package, Download, ArrowLeft } from "lucide-react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const EXAMPLES: Record<string, string> = {
  "Hello World": `print("Hello, ThinkPythonAI! 👋")`,
  "Loops": `for i in range(5):\n    print("i:", i)`,
  "Lists & Dicts": `nums = [1,2,3]\nprint([n*n for n in nums])\nuser = {"name":"Ankit","role":"Student"}\nprint(user["name"])`,
  "Functions": `def greet(name):\n    return f"Hi {name}!"\n\nprint(greet("GingerByte"))`,
  "Matplotlib": `import micropip\nawait micropip.install('matplotlib')\n\nimport matplotlib.pyplot as plt\nplt.plot([1,2,3],[3,2,5])\nplt.title('My First Plot')\nplt.show()`
};

export default function BrowserIDE() {
  const [pyodide, setPyodide] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [code, setCode] = useState<string>(EXAMPLES["Hello World"]);
  const [output, setOutput] = useState<string>("");
  const [errors, setErrors] = useState<string>("");
  const [pkgName, setPkgName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        if (!window.loadPyodide) {
          const s = document.createElement("script");
          s.src = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js";
          s.onload = init;
          s.async = true;
          document.body.appendChild(s);
        } else {
          await init();
        }
      } catch (e: any) {
        setErrors(String(e));
        setLoading(false);
      }
    };

    const init = async () => {
      setLoading(true);
      // @ts-ignore
      const _pyodide = await window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
      });

      _pyodide.setStdout({
        batched: (data: string) => setOutput((prev) => prev + data),
      });
      _pyodide.setStderr({
        batched: (data: string) => setErrors((prev) => prev + data),
      });

      const shim = `
import sys, io, base64
try:
    import matplotlib.pyplot as plt
    def _tpai_show():
        buf = io.BytesIO()
        plt.savefig(buf, format='png', bbox_inches='tight')
        buf.seek(0)
        data = base64.b64encode(buf.read()).decode('ascii')
        print("__TPAI_IMG__" + data)
        plt.close()
    plt.show = _tpai_show
except Exception:
    pass
`;
      await _pyodide.runPythonAsync(shim);

      setPyodide(_pyodide);
      setLoading(false);
    };

    load();
  }, []);

  const runCode = async () => {
    if (!pyodide) return;
    setOutput("");
    setErrors("");
    setRunning(true);

    try {
      const result = await pyodide.runPythonAsync(code);
      if (result !== undefined) {
        setOutput((prev) => prev + String(result) + "\n");
      }
    } catch (e: any) {
      setErrors((prev) => (prev ? prev + "\n" : "") + String(e?.message || e));
    } finally {
      setRunning(false);
    }
  };

  const stopRun = () => {
    setRunning(false);
  };

  const installPackage = async () => {
    if (!pyodide || !pkgName.trim()) return;
    setErrors("");
    setOutput((p) => p + `Installing ${pkgName}...\n`);
    try {
      await pyodide.loadPackage(["micropip"]);
      await pyodide.runPythonAsync(`import micropip; await micropip.install('${pkgName}')`);
      setOutput((p) => p + `Installed ${pkgName}!\n`);
      setPkgName("");
    } catch (e: any) {
      setErrors((prev) => (prev ? prev + "\n" : "") + String(e?.message || e));
    }
  };

  const onUploadFile = async (file: File) => {
    if (!pyodide) return;
    const arrayBuf = await file.arrayBuffer();
    // @ts-ignore
    pyodide.FS.writeFile(file.name, new Uint8Array(arrayBuf));
    setOutput((p) => p + `Uploaded to virtual FS: ${file.name}\n`);
  };

  const onDownload = () => {
    const blob = new Blob([code], { type: "text/x-python" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "script.py";
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderOutput = useMemo(() => {
    const lines = output.split("\n");
    const parts: JSX.Element[] = [];
    const textLines: string[] = [];

    lines.forEach((ln, idx) => {
      if (ln.startsWith("__TPAI_IMG__")) {
        const b64 = ln.replace("__TPAI_IMG__", "");
        if (textLines.length) {
          parts.push(<pre key={`txt-${idx}`} className="whitespace-pre-wrap text-sm mb-4">{textLines.join("\n")}</pre>);
          textLines.length = 0;
        }
        parts.push(<img key={`img-${idx}`} src={`data:image/png;base64,${b64}`} alt="Plot" className="rounded-xl shadow mb-4"/>);
      } else {
        textLines.push(ln);
      }
    });

    if (textLines.length) {
      parts.push(<pre key={`txt-last`} className="whitespace-pre-wrap text-sm">{textLines.join("\n")}</pre>);
    }

    return parts;
  }, [output]);

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-slate-50 to-white flex flex-col gap-6">
      {/* Back button top */}
      <div>
        <Link href="/" className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-800 text-white text-sm">
          <ArrowLeft className="h-4 w-4"/> Back to ThinkPythonAI
        </Link>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-4 flex-1">
        {/* Editor */}
        <div className="xl:col-span-2 border rounded-lg shadow p-4">
          <div className="flex flex-row items-center justify-between mb-2">
            <div>
              <h2 className="text-2xl font-bold">ThinkPythonAI Browser</h2>
              <p className="text-sm text-slate-500">Run Python in your browser — no installs.</p>
            </div>
            <span className="text-xs px-2 py-1 rounded bg-slate-200">{loading ? "Loading Pyodide..." : "Ready"}</span>
          </div>

          <div className="flex flex-col md:flex-row gap-2 mb-2">
            <div className="flex gap-2">
              <button onClick={runCode} disabled={!pyodide || running} className="px-3 py-1 rounded bg-green-600 text-white flex items-center text-sm"><Play className="h-4 w-4 mr-1"/>Run</button>
              <button onClick={stopRun} disabled={!running} className="px-3 py-1 rounded bg-gray-300 text-sm flex items-center"><StopCircle className="h-4 w-4 mr-1"/>Stop</button>
              <button onClick={onDownload} className="px-3 py-1 rounded bg-blue-500 text-white flex items-center text-sm"><Download className="h-4 w-4 mr-1"/>Download</button>
            </div>
            <div className="ml-auto flex gap-2">
              <select className="border rounded-md px-2 py-1 text-sm" onChange={(e) => setCode(EXAMPLES[e.target.value])}>
                {Object.keys(EXAMPLES).map((k) => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
              <button onClick={() => fileInputRef.current?.click()} className="px-3 py-1 rounded bg-gray-200 flex items-center text-sm"><Upload className="h-4 w-4 mr-1"/>Upload</button>
              <input type="file" accept=".py,.txt" className="hidden" ref={fileInputRef} onChange={(e) => {const f=e.target.files?.[0];if (!f) return;f.text().then((t) => setCode(t));onUploadFile(f);e.currentTarget.value="";}}/>
            </div>
          </div>

          <div className="h-[55vh] border rounded-xl overflow-hidden">
            <MonacoEditor height="100%" defaultLanguage="python" theme="vs-light" value={code} onChange={(v) => setCode(v || "")} options={{ fontSize: 14, minimap: { enabled: false }, wordWrap: "on" }} />
          </div>
        </div>

        {/* Console + Packages */}
        <div className="flex flex-col gap-4">
          <div className="border rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-2">Console</h3>
            <div className="h-[28vh] border rounded-xl p-3 bg-slate-50 overflow-auto">
              {renderOutput}
              {errors && (<pre className="whitespace-pre-wrap text-sm text-red-600 mt-2">{errors}</pre>)}
            </div>
          </div>

          <div className="border rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-2">Packages (micropip)</h3>
            <div className="flex gap-2">
              <input placeholder="e.g. numpy, pandas, matplotlib" value={pkgName} onChange={(e) => setPkgName(e.target.value)} className="border rounded px-2 py-1 flex-1 text-sm" />
              <button onClick={installPackage} disabled={!pyodide || !pkgName.trim()} className="px-3 py-1 rounded bg-purple-500 text-white text-sm flex items-center"><Package className="h-4 w-4 mr-1"/>Install</button>
            </div>
            <p className="text-xs text-slate-500 mt-2">Only pure-Python wheels work in the browser. Heavy/C-extensions may fail.</p>
          </div>

          <div className="border rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-2">Tips</h3>
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-2">
              <li>Use <code>print()</code> to see results in the Console.</li>
              <li><code>await</code> is allowed at top level (e.g., <code>await micropip.install('matplotlib')</code>).</li>
              <li>Your uploaded files live in a sandboxed virtual FS for this session.</li>
              <li>Call <code>plt.show()</code> to render charts beneath the Console.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Back button bottom */}
      <div className="mt-4">
        <Link href="/" className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-800 text-white text-sm">
          <ArrowLeft className="h-4 w-4"/> Back to ThinkPythonAI
        </Link>
      </div>
    </div>
  );
}