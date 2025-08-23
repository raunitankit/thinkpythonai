// app/sitemap.ts
export default function sitemap() {
  const base = "https://thinkpythonai.com";
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/assistant`, lastModified: now },
    { url: `${base}/qr`, lastModified: now },
    { url: `${base}/teen-gist`, lastModified: now }, // 👈 new page
  ];
}
