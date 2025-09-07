// app/assistant/page.tsx
import { getIntentAnswer } from "@/components/assistant/intentMap";
"use client";

import { useState } from "react";
import Link from "next/link";
import { detectIntent, type IntentReply } from "@/components/assistant/intentMap";

type Msg = { role: "user" | "assistant"; content: React.ReactNode };

function Pill({
  href,
  children,
  variant = "primary",
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  external?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center px-3 py-2 rounded-xl text-sm font-semibold";
  const styles =
    variant === "primary"
      ? "bg-slate-900 text-white hover:opacity-90"
      : "border text-slate-800 hover:bg-slate-50";
  return (
    <Link
      href={href}
      className={`${base} ${styles}`}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {children}
    </Link>
  );
}

export default function AssistantPage() {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      content: (
        <div>
          Hi! Ask me about <strong>payments</strong>,{" "}
          <strong>trainer</strong>, <strong>kids courses</strong>,{" "}
          <strong>demo</strong>, <strong>pricing</strong>,{" "}
          <strong>refund policy</strong>, <strong>testimonials</strong>, or{" "}
          <strong>Digital Citizenship</strong>.
        </div>
      ),
    },
  ]);

  async function handleSend() {
    const text = input.trim();
    if (!text) return;

    setMsgs((m) => [...m, { role: "user", content: text }]);
    setInput("");

    const reply: IntentReply | null = detectIntent(text);

    if (reply) {
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          content: (
            <div className="space-y-2">
              <div className="font-semibold">{reply.title}</div>
              <div className="prose prose-sm">{reply.body}</div>
              {reply.links?.length ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {reply.links.map((l) => (
                    <Pill
                      key={l.href + l.label}
                      href={l.href}
                      variant={l.variant ?? "primary"}
                      external={l.external}
                    >
                      {l.label}
                    </Pill>
                  ))}
                </div>
              ) : null}
            </div>
          ),
        },
      ]);
      return;
    }

    setMsgs((m) => [
      ...m,
      {
        role: "assistant",
        content: (
          <div>
            I didn’t find a direct link for that. Try asking about{" "}
            <em>payments, trainer, pricing, kids, demo, refund, testimonials</em>.
          </div>
        ),
      },
    ]);
  }

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
            <a href="/" className="btn btn-secondary">
              Back to Home
            </a>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Classroom Assistant
        </h1>
        <p className="mt-2 text-slate-700">
          Quick links for payments, trainer, demo, pricing, refund policy, kids
          & schools, and more.
        </p>

        <div className="mt-6 card">
          <div className="p-4 space-y-4">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : ""}>
                <div
                  className={`inline-block rounded-2xl px-3 py-2 ${
                    m.role === "user"
                      ? "bg-indigo-600 text-white"
                      : "border bg-white"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about payments, trainer, demo…"
              className="flex-1 rounded-xl border px-3 py-2"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold"
            >
              Send
            </button>
          </div>

          {/* Quick intents */}
          <div className="p-3 border-t flex flex-wrap gap-2">
            {[
              "payments",
              "pricing",
              "trainer",
              "kids",
              "refund",
              "demo",
              "testimonials",
              "digital citizenship",
              "instagist",
              "contact",
            ].map((q) => (
              <button
                key={q}
                onClick={() => {
                  setInput(q);
                  setTimeout(handleSend, 0);
                }}
                className="px-3 py-2 rounded-xl border text-sm hover:bg-slate-50"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}