// app/qr/flyer/page.tsx
export const dynamic = "force-static";

import PrintControls from "./PrintControls";

const DOMAIN = "https://thinkpythonai.com";

export default function FlyerPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Screen-only toolbar */}
      <div className="screen-only sticky top-0 z-10 border-b bg-white/90 backdrop-blur">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <a href="/" className="inline-flex items-center gap-2 text-sm">
            <span className="inline-grid place-items-center w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-600 via-fuchsia-600 to-cyan-500">
              <svg viewBox="0 0 48 48" className="w-5 h-5" aria-hidden>
                <path d="M10 12h28v6H28v18h-8V18H10z M30 24h8v6h-8z" fill="#fff" />
              </svg>
            </span>
            ThinkPythonAI
          </a>
          <PrintControls />
        </div>
      </div>

      {/* Flyer canvas */}
      <main className="py-6 md:py-10">
        <div
          className="flyer mx-auto bg-white rounded-2xl shadow max-w-[850px] p-6 md:p-10 print:p-6"
          /* 850px ~ 8.5in at 100px/in preview, good approximation on screen */
        >
          {/* Header block */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 via-fuchsia-600 to-cyan-500">
                <svg viewBox="0 0 48 48" className="w-8 h-8" aria-hidden>
                  <path d="M10 12h28v6H28v18h-8V18H10z M30 24h8v6h-8z" fill="#fff" />
                </svg>
              </span>
              <div>
                <div className="text-2xl font-extrabold tracking-tight">ThinkPythonAI</div>
                <div className="text-sm text-slate-600">Python · Automation · AI — real projects</div>
              </div>
            </div>
            <span className="inline-block rounded-full px-3 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
              First 2 classes free*
            </span>
          </div>

          {/* Big headline */}
          <h1 className="mt-6 text-3xl md:text-5xl print:text-4xl font-extrabold leading-tight">
            Learn Python that gets you <span className="bg-gradient-to-r from-yellow-200 via-rose-200 to-sky-200 px-2 rounded">hired</span>
          </h1>
          <p className="mt-3 text-slate-700 text-base md:text-lg print:text-base">
            Hands-on coding for real outcomes — automation, AI basics, and portfolio projects. Built for busy students,
            professionals, and schools.
          </p>

          {/* QR + Contact row */}
          <div className="mt-8 print:mt-6 grid md:grid-cols-2 gap-8 md:gap-8 print:gap-6 items-start">
            {/* QR */}
            <div className="rounded-2xl border p-4">
              {/* Use the crisp SVG route we added */}
              <img src="/qr.svg" alt="QR code to ThinkPythonAI.com" className="w-full h-auto" />
              <div className="mt-3 text-center text-sm text-slate-600">
                Scan to visit <span className="font-mono">{DOMAIN}</span>
              </div>
            </div>

            {/* Contact + bullets */}
            <div className="space-y-3">
              <div className="text-lg font-semibold">Get in touch</div>
              <div className="text-slate-700 text-sm leading-6">
                <div><strong>WhatsApp:</strong> +1 (603) 417-0825</div>
                <div><strong>Email:</strong> <a href="mailto:thinkpythonai@gmail.com" className="underline">thinkpythonai@gmail.com</a></div>
                <div><strong>Site:</strong> <a href={DOMAIN} className="underline">{DOMAIN}</a></div>
              </div>

              <ul className="mt-4 space-y-2 text-slate-700 text-sm">
                <li>Beginner → Advanced Python: automation, APIs, data</li>
                <li>AI & agents (intro) · real projects · Stock Automation</li>
                <li>Live classes + recordings · school partnerships</li>
              </ul>

              <div className="mt-4 text-xs text-slate-500">
                * You can attend the first two live classes and, if it’s not a fit, request a full refund before the third class begins.
              </div>
            </div>
          </div>

          {/* Footer strip (print) */}
          <div className="mt-10 print:mt-6 border-t pt-4 text-xs text-slate-500">
            © {new Date().getFullYear()} ThinkPythonAI — Zelle accepted: +1 (603) 417-0825
          </div>
        </div>
      </main>

      {/* Print CSS (page size/margins) */}
      <style>{`
        /* One US Letter page with a bit less margin */
        @page { size: Letter; margin: 0.4in; }
        @media print {
          .screen-only { display: none !important; }
          .flyer {
            box-shadow: none !important;
            border-radius: 0 !important;
            /* Keep width safely inside printable area */
            width: 7.5in !important;          /* 8.5in - (0.4in*2) = 7.7in printable; use 7.5in to be safe */
            break-inside: avoid;
          }
          body { background: #fff !important; }
        }
      `}</style>
    </div>
  );
}
