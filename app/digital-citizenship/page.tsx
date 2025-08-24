"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const TARGET =
  process.env.NEXT_PUBLIC_DC_URL ||
  "https://digital-citizenship-ai-auehbputrz3jyadpcnnukp.streamlit.app/?embed=true";

type PingResp = { ok: boolean; status: number; error?: string };

export default function DigitalCitizenshipEmbed() {
  const [awake, setAwake] = useState<boolean | null>(null);
  const [blocked, setBlocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const loadTimer = useRef<number | null>(null);

  async function ping(): Promise<PingResp> {
    const r = await fetch(`/api/ping-external?url=${encodeURIComponent(TARGET)}`, {
      cache: "no-store",
    });
    return (await r.json()) as PingResp;
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await ping();
        if (cancelled) return;
        setAwake(!!res.ok);
      } catch {
        if (cancelled) return;
        setAwake(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleFrameLoad = () => {
    setLoading(false);
    if (loadTimer.current) window.clearTimeout(loadTimer.current);
    setBlocked(false);
  };

  useEffect(() => {
    if (awake === null) return;
    setLoading(true);
    setBlocked(false);
    // If the iframe doesn't complete load quickly, assume blocked (cookies / X-Frame)
    loadTimer.current = window.setTimeout(() => {
      setLoading(false);
      setBlocked(true);
    }, 3500);
    return () => {
      if (loadTimer.current) window.clearTimeout(loadTimer.current);
    };
  }, [awake]);

  return (
    <main style={{ minHeight: "85vh", background: "linear-gradient(180deg,#f8fafc,#ffffff)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "20px 16px 28px" }}>
        {/* Top bar */}
        <div style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#e2e8f0",
              color: "#0f172a",
              textDecoration: "none",
              padding: "9px 14px",
              borderRadius: 10,
              fontWeight: 700,
            }}
          >
            🔙 Back to ThinkPythonAI
          </Link>

          <a
            href={TARGET.replace(/\?embed=true$/, "")} // open full app (no embed mode)
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#0f172a",
              color: "#fff",
              textDecoration: "none",
              padding: "9px 14px",
              borderRadius: 10,
              fontWeight: 700,
            }}
          >
            Open full app ↗
          </a>
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0f172a" }}>
          🛡️ Digital Citizenship Detector (Embedded)
        </h1>
        <p style={{ color: "#475569", marginTop: 6 }}>
          If the embed is blocked by your browser or privacy settings, use “Open full app”.
        </p>

        <div style={{ marginTop: 14, marginBottom: 10, fontSize: 13, color: awake === null ? "#64748b" : awake ? "#059669" : "#b91c1c" }}>
          {awake === null && "Checking app status…"}
          {awake === true && "App looks awake ✅"}
          {awake === false && "The app may be waking up… trying to load ⚡"}
        </div>

        <div
          style={{
            position: "relative",
            width: "100%",
            height: "78vh",
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            overflow: "hidden",
            background: "#fff",
          }}
        >
          {loading && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "grid",
                placeItems: "center",
                background: "linear-gradient(180deg,#f1f5f9,rgba(255,255,255,0.8))",
                zIndex: 1,
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    margin: "0 auto 10px",
                    width: 44,
                    height: 44,
                    border: "3px solid #e2e8f0",
                    borderTopColor: "#4f46e5",
                    borderRadius: "50%",
                    animation: "spin 0.9s linear infinite",
                  }}
                />
                <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                <div style={{ color: "#334155" }}>
                  Loading the embedded app…
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
                    If this takes too long, click “Open full app”.
                  </div>
                </div>
              </div>
            </div>
          )}

          <iframe
            src={TARGET}
            onLoad={handleFrameLoad}
            // NOTE: if third-party cookies are blocked, Streamlit may redirect endlessly; our timeout shows fallback.
            style={{ width: "100%", height: "100%", border: 0 }}
          />

          {blocked && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "grid",
                placeItems: "center",
                background: "linear-gradient(180deg,#fff,#f8fafc)",
                padding: 20,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  maxWidth: 540,
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 14,
                  padding: 18,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                }}
              >
                <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a" }}>
                  Embed blocked by privacy settings
                </h2>
                <p style={{ color: "#475569", marginTop: 8 }}>
                  Your browser is likely blocking third‑party cookies, which Streamlit Cloud
                  needs inside iframes. Open the app in a new tab:
                </p>
                <div style={{ marginTop: 12 }}>
                  <a
                    href={TARGET.replace(/\?embed=true$/, "")}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: "#4f46e5",
                      color: "#fff",
                      textDecoration: "none",
                      padding: "10px 14px",
                      borderRadius: 10,
                      fontWeight: 700,
                    }}
                  >
                    Open full app ↗
                  </a>
                </div>
                <div style={{ marginTop: 8, fontSize: 12, color: "#64748b" }}>
                  Tip: Allow third‑party cookies for <code>*.streamlit.app</code> to enable embedding.
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 14, textAlign: "center" }}>
          <Link
            href="/"
            style={{
              display: "inline-block",
              background: "#0f172a",
              color: "#fff",
              textDecoration: "none",
              padding: "10px 16px",
              borderRadius: 10,
              fontWeight: 700,
            }}
          >
            🔙 Back to ThinkPythonAI
          </Link>
        </div>
      </div>
    </main>
  );
}
