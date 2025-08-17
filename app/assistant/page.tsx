// app/assistant/page.tsx
export const dynamic = "force-static";

import dynamicImport from "next/dynamic";

// IMPORTANT: no localhost default — empty means "not configured"
const RAW_URL = process.env.NEXT_PUBLIC_ASSISTANT_URL ?? "";
const hasUrl = RAW_URL.startsWith("http");
const isLocalhost = RAW_URL.includes("localhost");

// Client-only iframe (avoid SSR mismatch)
const Embed = dynamicImport(() => import("./Embed"), { ssr: false });

export default function AssistantPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-sky-50 to-fuchsia-50 text-slate-900">
      <header className="header">
        <div className="container py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl grid place-items-center bg-gradient-to-br from-indigo-600 via-fuchsia-600 to-cyan-500 text-white">
              <svg viewBox="0 0 48 48" className="w-7 h-7" aria-hidden>
                <path d="M10 12h28v6H28v18h-8V18H10z M30 24h8v6h-8z" fill="#fff" />
              </svg>
            </div>
            <span className="font-semibold">ThinkPythonAI</span>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" className="btn btn-secondary">Back to Home</a>
            {hasUrl && !isLocalhost && (
              <a href={RAW_URL} target="_blank" rel="noreferrer" className="btn btn-primary">
                Open in New Tab
              </a>
            )}
          </div>
        </div>
      </header>

      <main className="container py-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Classroom Assistant</h1>
        <p className="mt-2 text-slate-700">
          Chat with us for quick info on schedule, payments, and contacting ThinkPythonAI.
        </p>

        {/* Show friendly guidance if not configured or pointing to localhost */}
        {!hasUrl || isLocalhost ? (
          <div className="mt-6 card">
            <div className="p-5">
              <h2 className="font-semibold">Assistant not configured for production</h2>
              <p className="mt-2 text-sm text-slate-600">
                Set <code className="bg-slate-100 px-1 rounded">NEXT_PUBLIC_ASSISTANT_URL</code> to your Streamlit Cloud URL
                (must be <strong>https</strong> and end with <code>?embed=true</code>) and redeploy.
              </p>
              <ol className="mt-3 text-sm text-slate-600 list-decimal pl-5 space-y-1">
                <li>Streamlit app → Settings → Advanced → <strong>Allow embedding</strong> = ON</li>
                <li>Copy the URL, e.g. <em>https://your-app.streamlit.app/?embed=true</em></li>
                <li>Vercel → Project → Settings → <strong>Environment Variables</strong>:
                  <div className="mt-1"><code className="bg-slate-100 px-1 rounded">NEXT_PUBLIC_ASSISTANT_URL=https://your-app.streamlit.app/?embed=true</code></div>
                </li>
                <li>Redeploy (Vercel will pick it up at build time)</li>
              </ol>
            </div>
          </div>
        ) : (
          <div className="mt-6 card">
            <div className="p-3 border-b text-sm text-slate-600">
              If you don’t see the chat, ensure your Streamlit app allows embedding in Settings → Advanced.
            </div>
            <Embed src={RAW_URL} />
          </div>
        )}
      </main>
    </div>
  );
}
