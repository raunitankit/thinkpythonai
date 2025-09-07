import type { ReactNode } from "react";

export type IntentAnswer = {
  title: string;
  body: ReactNode;
  actions?: { label: string; href: string }[];
};

const norm = (s: string) => s.toLowerCase().trim();

export function getIntentAnswer(raw: string): IntentAnswer | null {
  const q = norm(raw);

  if (/\b(pay|payment|payments|enroll|enrol|zelle|fee|fees|pricing)\b/.test(q)) {
    return {
      title: "Payments & ways to enroll",
      body: (
        <>
          We currently accept <strong>Zelle: +1 (603) 417-0825</strong>. Email your
          receipt to <a className="underline" href="mailto:thinkpythonai@gmail.com">thinkpythonai@gmail.com</a>.
          First 2 live classes are free—see the refund policy for details.
        </>
      ),
      actions: [
        { label: "Pricing", href: "/#pricing" },
        { label: "Refund policy", href: "/#refund-policy" },
        { label: "Join Live Demo", href: "https://forms.gle/D8W6ePzfzeszgPFr6" },
      ],
    };
  }

  if (/\b(trainer|instructor|coach|about trainer|know your trainer|teacher)\b/.test(q)) {
    return {
      title: "Know your trainer",
      body: (
        <>
          Ankit — Senior Automation Architect (Director level). 20+ years across
          Dev/QA/DevOps. Teaches hands-on Python & AI; students consistently rate the
          sessions highly. Believes <strong>Python is the backbone of AI</strong>.
        </>
      ),
      actions: [{ label: "Jump to Trainer", href: "/#trainer" }],
    };
  }

  if (/\b(kid|kids|school|schools|district|teacher|students)\b/.test(q)) {
    return {
      title: "For Kids & Schools",
      body: (
        <>
          Flexible delivery for public & private schools: after-school clubs, electives,
          or teacher PD. Aligned to ISTE & CSTA; rubrics and outcomes included.
        </>
      ),
      actions: [
        { label: "Kids & Schools", href: "/courses#kids" },
        { label: "Schools section", href: "/#schools" },
      ],
    };
  }

  if (/\b(refund|trial|free class|money back)\b/.test(q)) {
    return {
      title: "Trial & Refund Policy",
      body: (
        <>
          Attend the first two live classes and request a <strong>full refund before the
          third class begins</strong> — no questions asked.
        </>
      ),
      actions: [
        { label: "Refund policy", href: "/#refund-policy" },
        { label: "Join Live Demo", href: "https://forms.gle/D8W6ePzfzeszgPFr6" },
      ],
    };
  }

  if (/\b(testimonial|testimonials|reviews|feedback)\b/.test(q)) {
    return {
      title: "Student feedback",
      body: <>Read quotes and real WhatsApp/screenshots from students and parents.</>,
      actions: [{ label: "Open testimonials", href: "/testimonials" }],
    };
  }

  if (/\b(price|pricing|cost|fees|plans|starter|pro|elite)\b/.test(q)) {
    return {
      title: "Pricing",
      body: <>Simple, transparent plans: <strong>Starter</strong>, <strong>Pro</strong>, and <strong>Elite</strong>. Scholarships available.</>,
      actions: [{ label: "See pricing", href: "/#pricing" }],
    };
  }

  if (/\b(course|courses|track|curriculum|syllabus)\b/.test(q)) {
    return {
      title: "Find your track",
      body: <>Beginner → Advanced Python, Automation, AI & Agents, and portfolio projects.</>,
      actions: [
        { label: "Meet Trainer & Tracks", href: "/#trainer" },
        { label: "Curriculum", href: "/#curriculum" },
      ],
    };
  }

  return null;
}