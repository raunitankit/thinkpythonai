"use client";

import { useState } from "react";
import QuoteCard from "@/components/QuoteCard";

export default function QuoteLab() {
  const [text, setText] = useState(
    "Ankit’s teaching methodology is unlike anything I’ve experienced — patient, detailed, and practical. His support has been invaluable in building my confidence and technical skills."
  );
  const [author, setAuthor] = useState("Masters Student");
  const [role, setRole] = useState("Georgia Tech, USA");
  const [theme, setTheme] = useState<"indigo" | "emerald" | "rose" | "slate">("indigo");

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Quote Lab (IG Maker)</h1>
      <p className="text-slate-600 mt-1">
        Produce square (1080×1080) and story (1080×1920) images for Instagram, WhatsApp status, etc.
      </p>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        {/* editor */}
        <div className="card p-4">
          <label className="block text-sm font-semibold">Quote text</label>
          <textarea
            className="mt-1 w-full rounded-xl border p-2 text-sm"
            rows={8}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold">Author</label>
              <input
                className="mt-1 w-full rounded-xl border p-2 text-sm"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">Role</label>
              <input
                className="mt-1 w-full rounded-xl border p-2 text-sm"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-3">
            <label className="block text-sm font-semibold">Theme</label>
            <select
              className="mt-1 w-full rounded-xl border p-2 text-sm"
              value={theme}
              onChange={(e) => setTheme(e.target.value as any)}
            >
              <option value="indigo">Indigo / Fuchsia / Cyan</option>
              <option value="emerald">Emerald / Teal / Cyan</option>
              <option value="rose">Rose / Fuchsia / Amber</option>
              <option value="slate">Slate (dark)</option>
            </select>
          </div>
        </div>

        {/* square */}
        <div className="card p-4 overflow-auto">
          <div className="mb-2 text-sm font-semibold">Square (1080×1080)</div>
          <QuoteCard text={text} author={author} role={role} aspect="square" theme={theme} />
        </div>

        {/* story */}
        <div className="card p-4 overflow-auto">
          <div className="mb-2 text-sm font-semibold">Story (1080×1920)</div>
          <QuoteCard text={text} author={author} role={role} aspect="story" theme={theme} />
        </div>
      </div>
    </main>
  );
}