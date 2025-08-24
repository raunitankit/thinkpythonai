// app/api/ping-external/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // don't cache on server

function withTimeout(ms: number) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), ms);
  return { signal: ctl.signal, clear: () => clearTimeout(t) };
}

async function tryGet(url: string, ms = 10000) {
  const { signal, clear } = withTimeout(ms);
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal,
      headers: {
        // some hosts behave better with a UA
        "User-Agent": "ThinkPythonAI-HealthCheck/1.0",
        Accept: "text/plain,application/json,*/*",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      next: { revalidate: 0 }, // Next.js hint, though runtime is node
    });
    clear();
    return res;
  } catch (e) {
    clear();
    throw e;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get("url");

  if (!raw || !/^https?:\/\//i.test(raw)) {
    return Response.json({ ok: false, status: 400, error: "Invalid URL" }, { status: 400 });
  }

  // Normalize and craft Streamlit health path
  const base = raw.replace(/\/+$/, ""); // strip trailing slash
  const health = `${base}/_stcore/health`;

  try {
    // 1) Try Streamlit health path first (fast and reliable)
    let res = await tryGet(health, 8000);
    if (res.ok) {
      return Response.json({ ok: true, status: res.status, where: "health" }, { status: 200 });
    }

    // 2) Fallback to root GET (some deployments might not expose health)
    res = await tryGet(base, 10000);
    const ok = res.ok && res.status < 500;
    return Response.json({ ok, status: res.status, where: "root" }, { status: 200 });
  } catch (err: any) {
    return Response.json(
      { ok: false, status: 0, error: err?.message || "network/timeout" },
      { status: 200 },
    );
  }
}
