"use client";

import { useEffect, useRef, useState } from "react";

// Direct Streamlit URL (no share.streamlit.io)
const TARGET =
  process.env.NEXT_PUBLIC_DC_URL ||
  "https://digital-citizenship-ai-auehbputrz3jyadpcnnukp.streamlit.app/";

type PingResp = { ok: boolean; status: number; error?: string };

export default function DigitalCitizenshipRedirect() {
  const [checking, setChecking] = useState(true);
  const [ok, setOk] = useState<boolean | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const tries = useRef(0);

  async function pingOnce(): Promise<PingResp> {
    try {
      const r = await fetch(`/api/ping-external?url=${encodeURIComponent(TARGET)}`, {
        cache: "no-store",
      });
      return (await r.json()) as PingResp;
    } catch {
      // Network error on our own API → report as status 0
      return { ok: false, status: 0, error: "client fetch error" };
    }
  }

  function go() {
    // Small delay so the message isn't jarring
    setTimeout(() => {
      window.location.href = TARGET;
    }, 300);
  }

  async function checkAndGo() {
    setChecking(true);
    const res = await pingOnce();
    setStatus(res.status ?? null);
    setOk(res.ok);
    setChecking(false);

    // If API says OK -> go
    if (res.ok) return go();

    // Heuristic: sometimes we get status 0 even when the app is fine (privacy/network quirks)
    // Offer a "Try anyway" auto-redirect path.
    // (Kids still have Open-in-new-tab as a guaranteed escape hatch.)
  }

  useEffect(() => {
    const run = async () => {
      for (tries.current = 0; tries.current < 2; tries.current++) {
        const res = await pingOnce();
        setStatus(res.status ?? null);
        setOk(res.ok);
        if (res.ok) {
          return go();
        }
        // brief backoff
        await new Promise((r) => setTimeout(r, 700 * (tries.current + 1)));
      }
      setChecking(false);
    };
    run();
  }, []);

  return (
    <main
      style={{
        minHeight: "70vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background:
          "linear-gradient(180deg, rgba(236,253,245,0.9), rgba(219,234,254,0.9))",
      }}
    >
      <div
        style={{
          maxWidth: 720,
          textAlign: "center",
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
        }}
      >
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0f172a" }}>
          Taking you to Digital Citizenship…
        </h1>

        {checking && (
          <>
            <p style={{ color: "#475569", marginTop: 10 }}>
              We’re checking that the app is awake. This can take a moment.
            </p>
            <div
              style={{
                margin: "16px auto 0",
                width: 42,
                height: 42,
                border: "3px solid #e2e8f0",
                borderTopColor: "#4f46e5",
                borderRadius: "50%",
                animation: "spin 0.9s linear infinite",
              }}
            />
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 8 }}>
              Tip: if it seems slow, you can open it directly below.
            </p>
          </>
        )}

        {!checking && (
          <>
            <p style={{ color: "#b91c1c", marginTop: 12, fontWeight: 600 }}>
              {ok
                ? "Ready!"
                : `The app didn’t confirm yet${typeof status === "number" ? ` (status ${status})` : ""}.`}
            </p>
            <p style={{ color: "#475569", marginTop: 6 }}>
              It might be waking up or blocking pings. You can retry, try anyway, or open it in a new tab.
            </p>
          </>
        )}

        <div
          style={{
            marginTop: 16,
            display: "flex",
            gap: 10,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href={TARGET}
            target="_blank"
            rel="noreferrer"
            style={{
              background: "#4f46e5",
              color: "#fff",
              textDecoration: "none",
              padding: "10px 14px",
              borderRadius: 12,
              fontWeight: 700,
            }}
          >
            Open in new tab ↗
          </a>

          <button
            onClick={checkAndGo}
            style={{
              background: "#e2e8f0",
              color: "#0f172a",
              padding: "10px 14px",
              borderRadius: 12,
              border: "none",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Retry check
          </button>

          {!ok && (
            <button
              onClick={go}
              style={{
                background: "#10b981",
                color: "white",
                padding: "10px 14px",
                borderRadius: 12,
                border: "none",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Try anyway →
            </button>
          )}

          <a
            href="/"
            style={{
              background: "#f1f5f9",
              color: "#0f172a",
              textDecoration: "none",
              padding: "10px 14px",
              borderRadius: 12,
              fontWeight: 700,
            }}
          >
            Back to ThinkPythonAI
          </a>
        </div>
      </div>
    </main>
  );
}
