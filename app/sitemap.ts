// app/sitemap.ts
export default function sitemap() {
  const base = "https://thinkpythonai.com";
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/assistant`, lastModified: now },
    { url: `${base}/qr`, lastModified: now },
    { url: `${base}/instagist`, lastModified: now },
    { url: `${base}/digital-citizenship`, lastModified: now },
    { url: `${base}/courses`, lastModified: now },  
    { url: `${base}/testimonials`, lastModified: now },
  ];
}
