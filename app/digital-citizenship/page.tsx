"use client";
import { useEffect, useRef, useState } from "react";
import BackHeader from "@/components/BackHeader";

const TARGET =
  process.env.NEXT_PUBLIC_DC_URL ||
  "https://digital-citizenship-ai-auehbputrz3jyadpcnnukp.streamlit.app/";

// Normalize + build health path
const base = TARGET.replace(/\/+$/, "");
const HEALTH = `${base}/_stcore/health`;

type PingResp = { ok: boolean; status: number; where?: string; error?: string };

export default function DigitalCitizenshipRedirect() {
  const [checking, setChecking] = useState(true);
  const [ok, setOk] = useState<boolean | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const tries = useRef(0);

  // ---- server ping (our Next.js API) ----
  async function serverPing(): Promise<PingResp> {
    try {
      const u = `/api/ping-external?url=${encodeURIComponent(TARGET)}`;
      const r = await fetch(u, { cache: "no-store" });
      return (await r.json()) as PingResp;
    } catch (e: any) {
      return { ok: false, status: 0, error: e?.message || "server fetch failed" };
    }
  }

  // ---- image ping fallback (bypasses CORS) ----
  function imagePing(url: string, ms = 5000): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      const timer = setTimeout(() => {
        img.onload = null;
        img.onerror = null;
        resolve(false);
      }, ms);
      const done = (val: boolean) => {
        clearTimeout(timer);
        resolve(val);
      };
      img.onload = () => done(true);   // reachable
      img.onerror = () => done(true);  // also proves network reachability!
      img.src = `${url}${url.includes("?") ? "&" : "?"}cb=${Date.now()}`;
    });
  }

  // ---- fetch no-cors probe ----
  async function fetchPing(url: string, ms = 6000): Promise<boolean> {
    try {
      const ctl = new AbortController();
      const t = setTimeout(() => ctl.abort(), ms);
      await fetch(url, { method: "GET", mode: "no-cors", cache: "no-store", signal: ctl.signal });
      clearTimeout(t);
      return true; // if no exception, network path is good
    } catch {
      return false;
    }
  }

  async function clientReachable(): Promise<boolean> {
    // Race multiple strategies; any success = reachable
    const candidates = [
      fetchPing(HEALTH),
      fetchPing(base),
      imagePing(base),
    ];
    // Fastest wins
    const results = await Promise.allSettled(candidates);
    return results.some((r) => r.status === "fulfilled" && r.value === true);
  }

  async function checkAndGo() {
    setChecking(true);

    // 1) Client reachability
    if (await clientReachable()) {
      setOk(true);
      setStatus(200);
      setTimeout(() => window.location.replace(TARGET), 250);
      return;
    }

    // 2) Server ping fallback
    const res = await serverPing();
    setOk(res.ok);
    setStatus(res.status ?? null);
    setChecking(false);
    if (res.ok) {
      setTimeout(() => window.location.replace(TARGET), 250);
    }
  }

  useEffect(() => {
    const run = async () => {
      for (tries.current = 0; tries.current < 3; tries.current++) {
        if (await clientReachable()) {
          setOk(true);
          setStatus(200);
          window.location.replace(TARGET);
          return;
        }
        const res = await serverPing();
        setOk(res.ok);
        setStatus(res.status ?? null);
        if (res.ok) {
          window.location.replace(TARGET);
          return;
        }
        await new Promise((r) => setTimeout(r, 800 * (tries.current + 1)));
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
                The app didn’t respond yet{typeof status === "number" ? ` (status ${status})` : ""}.
              </p>
              <p style={{ color: "#475569", marginTop: 6 }}>
                It might be waking up or temporarily unavailable. You can retry or open it
                in a new tab.
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
