"use client";
import { useEffect, useRef, useState } from "react";
import BackHeader from "@/components/BackHeader";

const TARGET =
  process.env.NEXT_PUBLIC_DC_URL ||
  "https://digital-citizenship-ai-auehbputrz3jyadpcnnukp.streamlit.app/";

// Build health URL safely (no double slashes)
const base = TARGET.replace(/\/+$/, "");
const HEALTH = `${base}/_stcore/health`;

type PingResp = { ok: boolean; status: number; where?: string; error?: string };

export default function DigitalCitizenshipRedirect() {
  const [checking, setChecking] = useState(true);
  const [ok, setOk] = useState<boolean | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const tries = useRef(0);

  async function serverPing(): Promise<PingResp> {
    try {
      const u = `/api/ping-external?url=${encodeURIComponent(TARGET)}`;
      const r = await fetch(u, { cache: "no-store" });
      return (await r.json()) as PingResp;
    } catch (e: any) {
      return { ok: false, status: 0, error: e?.message || "server fetch failed" };
    }
  }

  // Client-side health probe: no-cors fetch resolves if reachable (status is opaque)
  async function clientPing(): Promise<boolean> {
    try {
      const res = await fetch(HEALTH, { method: "GET", mode: "no-cors", cache: "no-store" });
      // If we got here without throwing, the network path is OK; count as healthy.
      return true;
    } catch {
      return false;
    }
  }

  async function checkAndGo() {
    setChecking(true);
    // 1) Try client ping first for quick success
    if (await clientPing()) {
      setOk(true);
      setStatus(200);
      setTimeout(() => (window.location.href = TARGET), 300);
      return;
    }
    // 2) Fallback to server ping
    const res = await serverPing();
    setOk(res.ok);
    setStatus(res.status ?? null);
    setChecking(false);
    if (res.ok) {
      setTimeout(() => (window.location.href = TARGET), 300);
    }
  }

  useEffect(() => {
    const run = async () => {
      // Try up to 3 rounds: client ping → (if needed) server ping → short backoff
      for (tries.current = 0; tries.current < 3; tries.current++) {
        if (await clientPing()) {
          setOk(true);
          setStatus(200);
          window.location.href = TARGET;
          return;
        }
        const res = await serverPing();
        setOk(res.ok);
        setStatus(res.status ?? null);
        if (res.ok) {
          window.location.href = TARGET;
          return;
        }
        await new Promise((r) => setTimeout(r, 1000 * (tries.current + 1)));
      }
      setChecking(false);
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BackHeader />
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

          {!checking && ok === false && (
            <>
              <p style={{ color: "#b91c1c", marginTop: 12, fontWeight: 600 }}>
                The app didn’t respond yet
                {typeof status === "number" ? ` (status ${status})` : ""}.
              </p>
              <p style={{ color: "#475569", marginTop: 6 }}>
                It might be waking up or temporarily unavailable. You can retry
                or open it in a new tab.
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
    </>
  );
}
