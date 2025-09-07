"use client";

import { useState } from "react";
import Link from "next/link";
import { detectIntent, getIntentAnswer, type IntentReply } from "@/components/assistant/intentMap";

type Msg = { role: "user" | "assistant"; content: React.ReactNode };

export default function AssistantPage() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Msg[]>([
    {
      role: "assistant",
      content: (
        <div>
          Hi! Ask me about{" "}
          <strong>payments, trainer, courses, kids/schools, testimonials</strong> or{" "}
          <strong>contact</strong>. I’ll reply with the right links and details.
        </div>
      ),
    },
  ]);

  const onSend = () => {
    const q = input.trim();
    if (!q) return;

    const userMsg: Msg = { role: "user", content: q };
    const intent = detectIntent(q);
    const reply: IntentReply = getIntentAnswer(intent);

    const botMsg: Msg = {
      role: "assistant",
      content: (
        <div className="space-y-1">
          <div className="font-semibold">{reply.title}</div>
          <div className="text-slate-700">{reply.body}</div>
        </div>
      ),
    };

    setHistory((h) => [...h, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-sky-50 to-fuchsia-50 text-slate-900">
      <header className="header">
        <div className="container py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl grid place-items-center bg-gradient-to-br from-indigo-600 via-fuchsia-600 to-cyan-500 text-white">
              <svg viewBox="0 0 48 48" className="w-7 h-7" aria-hidden>
                <path d="M10 12h28v6H28v18h-8V18H10z M30 24h8v6h-8z" fill="#fff" />
              </svg>
            </div>
            <span className="font-semibold">ThinkPythonAI</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" className="btn btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Classroom Assistant</h1>
        <p className="mt-2 text-slate-700">
          Ask about schedule, payments, trainer, courses, kids & schools, or contact info.
        </p>

        <div className="mt-6 card">
          <div className="p-4 border-b text-sm text-slate-600">
            Tip: try “how to make a payment”, “know your trainer”, “kids & schools”, or “testimonials”.
          </div>
          <div className="p-4 space-y-4">
            {/* chat window */}
            <div className="rounded-xl border bg-white p-4 h-[420px] overflow-y-auto space-y-3">
              {history.map((m, i) => (
                <div
                  key={i}
                  className={`${
                    m.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block rounded-2xl px-3 py-2 ${
                      m.role === "user"
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-900"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
            </div>

            {/* input row */}
            <div className="flex gap-2">
              <input
                className="flex-1 rounded-xl border px-3 py-2"
                placeholder="Type your question…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSend();
                }}
              />
              <button
                onClick={onSend}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:opacity-90"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}