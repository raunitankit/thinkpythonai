// components/Subscribe.tsx
"use client";

import { useMemo } from "react";

type Props = {
  compact?: boolean;
  label?: string;
};

export default function Subscribe({ compact = false, label }: Props) {
  const bdUser = process.env.NEXT_PUBLIC_BUTTONDOWN_USERNAME || "";
  const mcAction = process.env.NEXT_PUBLIC_MAILCHIMP_ACTION || "";

  // Prefer Buttondown if username set; else use Mailchimp action URL
  const action = useMemo(() => {
    if (bdUser) return `https://buttondown.email/api/emails/embed-subscribe/${bdUser}`;
    return mcAction; // full action URL copied from Mailchimp embed
  }, [bdUser, mcAction]);

  if (!action) {
    return (
      <div className="text-sm text-red-600">
        Subscription not configured. Set <code>NEXT_PUBLIC_BUTTONDOWN_USERNAME</code> (Buttondown)
        or <code>NEXT_PUBLIC_MAILCHIMP_ACTION</code> (Mailchimp) in Vercel env vars.
      </div>
    );
  }

  return (
    <form
      action={action}
      method="post"
      target="_blank"
      className={`w-full ${compact ? "flex gap-2" : "grid sm:grid-cols-[1fr_auto] gap-2"}`}
    >
      {label ? <label className="sr-only" htmlFor="email">{label}</label> : null}
      <input
        id="email"
        type="email"
        name="email"
        required
        placeholder="Your email"
        className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-300"
      />
      {/* Buttondown optional tag (ignored by Mailchimp) */}
      <input type="hidden" name="tag" value="thinkpythonai" />
      <button
        type="submit"
        className="rounded-xl px-4 py-2 bg-slate-900 text-white hover:opacity-90"
      >
        Subscribe
      </button>
    </form>
  );
}
