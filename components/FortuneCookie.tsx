"use client";
import { useMemo, useState } from "react";

const FORTUNES = [
  "Your next bug will teach you more than your last success.",
  "A well‑named variable is a gift to your future self.",
  "Patience and practice turn errors into elegance.",
  "Reading docs is a superpower—use it often.",
  "Small steps, strong habits, big wins.",
  "Comment with kindness. Future you is reading.",
  "Today’s curiosity becomes tomorrow’s project.",
  "Tests are tiny time machines—saving future hours.",
  "Refactor when it hurts. Celebrate when it flows.",
  "Share what you learn—teachers learn twice."
];

function pickFortune(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return FORTUNES[h % FORTUNES.length];
}

export default function FortuneCookie() {
  const [name, setName] = useState("");
  const [fortune, setFortune] = useState<string>("");

  const placeholder = useMemo(
    () => ["Your name", "Team name", "Lucky word"][Math.floor(Math.random() * 3)],
    []
  );

  function crack() {
    const seed = (name || crypto.getRandomValues(new Uint32Array(1))[0].toString());
    setFortune(pickFortune(seed));
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e)=>setName(e.target.value)}
          placeholder={placeholder}
          className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm"
        />
        <button
          onClick={crack}
          className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 text-sm font-semibold"
        >
          Crack 🍪
        </button>
      </div>
      {fortune && (
        <p className="text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
          {fortune}
        </p>
      )}
    </div>
  );
}
