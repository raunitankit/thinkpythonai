import { NextResponse } from "next/server";

const ALLOWED_STATUSES = new Set([200, 201, 202, 203, 204, 301, 302, 303, 307, 308, 403]);

// Optional: guard which hosts you let the server ping (sensible default)
function isAllowed(url: URL) {
  const host = url.hostname.toLowerCase();
  // allow streamlit + your domain; add others if needed
  return (
    host.endsWith(".streamlit.app") ||
    host === "streamlit.app" ||
    host === "thinkpythonai.com"
  );
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const target = searchParams.get("url");

  if (!target) {
    return NextResponse.json({ ok: false, status: 0, error: "Missing url param" }, { status: 400 });
  }

  let u: URL;
  try {
    u = new URL(target);
  } catch {
    return NextResponse.json({ ok: false, status: 0, error: "Bad URL" }, { status: 400 });
  }

  if (!isAllowed(u)) {
    return NextResponse.json({ ok: false, status: 0, error: "Host not allowed" }, { status: 400 });
  }

  // Quick timeout to avoid hanging
  const controller = new AbortController();
  const TIMEOUT_MS = 3000;
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const headers: Record<string, string> = {
    // Some hosts behave better when a UA is present
    "user-agent":
      "Mozilla/5.0 (compatible; ThinkPythonAI-Ping/1.0; +https://thinkpythonai.com)",
    accept: "*/*",
  };

  async function tryOnce(method: "HEAD" | "GET") {
    try {
      const res = await fetch(u.toString(), {
        method,
        headers,
        redirect: "manual", // don't auto-follow; we consider 30x as "alive"
        signal: controller.signal,
      });
      return { okish: ALLOWED_STATUSES.has(res.status), status: res.status };
    } catch (e: any) {
      return { okish: false, status: 0, error: e?.message || "fetch error" };
    }
  }

  // Try HEAD first (cheap), then GET
  const head = await tryOnce("HEAD");
  if (head.okish) {
    clearTimeout(timeout);
    return NextResponse.json({ ok: true, status: head.status });
  }
  const get = await tryOnce("GET");
  clearTimeout(timeout);

  if (get.okish) {
    return NextResponse.json({ ok: true, status: get.status });
  }
  return NextResponse.json(
    { ok: false, status: get.status || head.status || 0, error: get.error || head.error || "unreachable" },
    { status: 200 }, // return 200 so the client can render nicely
  );
}
