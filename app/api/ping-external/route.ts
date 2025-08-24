// app/api/ping-external/route.ts
export const runtime = "nodejs"; // use "edge" if you prefer

function withTimeout(ms: number) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), ms);
  return { signal: ctl.signal, cancel: () => clearTimeout(t) };
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    if (!url || !/^https?:\/\//i.test(url)) {
      return Response.json({ ok: false, status: 400, error: "Invalid URL" }, { status: 400 });
    }

    // Try a quick HEAD, then a GET as fallback (some hosts don’t allow HEAD)
    const { signal, cancel } = withTimeout(6000);
    let res = await fetch(url, { method: "HEAD", redirect: "follow", signal });
    if (!res.ok || res.status === 405) {
      cancel();
      const t2 = withTimeout(8000);
      res = await fetch(url, { method: "GET", redirect: "follow", signal: t2.signal });
      t2.cancel();
    } else {
      cancel();
    }

    const healthy = res.ok && res.status < 500;
    return Response.json({ ok: healthy, status: res.status }, { status: 200 });
  } catch (err: any) {
    // Network/timeout/etc.
    return Response.json({ ok: false, status: 0, error: err?.message || "fetch failed" }, { status: 200 });
  }
}
