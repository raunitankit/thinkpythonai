import { type MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://thinkpythonai.vercel.app";
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/assistant`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
