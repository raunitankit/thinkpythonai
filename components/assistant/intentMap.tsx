// components/assistant/intentMap.ts
import type { ReactNode } from "react";

export type IntentReply = {
  title: string;
  body: ReactNode;
  links: Array<{
    href: string;
    label: string;
    variant?: "primary" | "outline";
    external?: boolean;
  }>;
};

function norm(s: string) {
  return s.toLowerCase();
}

export function detectIntent(raw: string): IntentReply | null {
  const q = norm(raw);

  // Payments / pricing / fees
  if (/(payment|pay|zelle|fees?)/.test(q)) {
    return {
      title: "Payments & ways to enroll",
      body: (
        <>
          We currently accept <strong>Zelle: +1 (603) 417-0825</strong>. Email your
          receipt to <a className="underline" href="mailto:thinkpythonai@gmail.com">thinkpythonai@gmail.com</a>.
          First 2 live classes are free—see the refund policy for details.
        </>
      ),
      links: [
        { href: "#pricing", label: "See Pricing" },
        { href: "#refund-policy", label: "Refund Policy", variant: "outline" },
        { href: "mailto:thinkpythonai@gmail.com", label: "Email Us", variant: "outline", external: true },
        { href: "tel:+16034170825", label: "Call +1 (603) 417-0825", variant: "outline", external: true },
        { href: "https://wa.me/16034170825", label: "WhatsApp", variant: "outline", external: true },
      ],
    };
  }

  // Trainer / about trainer
  if (/(trainer|instructor|about (you|trainer)|mentor)/.test(q)) {
    return {
      title: "Know your trainer",
      body: (
        <>
          Learn directly from <strong>Ankit</strong> — Sr. Automation Architect (Director-level).  
          20+ years across development, QA, CI/CD and DevOps. Believes Python is the backbone of AI.
        </>
      ),
      links: [{ href: "#trainer", label: "Meet Your Trainer" }],
    };
  }

  // Kids & Schools
  if (/(kids|school|schools|district|k-12|k12)/.test(q)) {
    return {
      title: "Kids & Schools",
      body: (
        <>
          We run after-school clubs, semester electives, and teacher PD. Projects align to
          ISTE & CSTA standards, with rubrics and outcomes.
        </>
      ),
      links: [
        { href: "/courses#kids", label: "Kids & Schools" },
        { href: "#schools", label: "For Schools (Overview)", variant: "outline" },
      ],
    };
  }

  // Live demo
  if (/(demo|join demo|live demo|book a seat)/.test(q)) {
    return {
      title: "Join the next live demo",
      body: <>See how we teach, what you’ll build, and how we support placements.</>,
      links: [
        { href: "https://forms.gle/D8W6ePzfzeszgPFr6", label: "Book a Seat", external: true },
        { href: "#sample", label: "Watch a Sample", variant: "outline" },
      ],
    };
  }

  // Pricing
  if (/(pricing|price|cost|fees)/.test(q)) {
    return {
      title: "Simple, transparent pricing",
      body: <>Choose Starter, Pro, or Elite. Scholarships available.</>,
      links: [{ href: "#pricing", label: "See Pricing" }],
    };
  }

  // Refund policy
  if (/(refund|trial)/.test(q)) {
    return {
      title: "Trial & refund policy",
      body: (
        <>
          Attend the first two live classes; if it’s not a fit, request a{" "}
          <strong>full refund before the third class begins</strong>.
        </>
      ),
      links: [{ href: "#refund-policy", label: "Read Policy" }],
    };
  }

  // Testimonials
  if (/(testimonial|feedback|reviews?)/.test(q)) {
    return {
      title: "What students say",
      body: <>Real feedback from freshers, working professionals, and parents.</>,
      links: [{ href: "/testimonials", label: "See Testimonials" }],
    };
  }

  // Digital Citizenship
  if (/(citizenship|digital citizenship|safety|responsible ai)/.test(q)) {
    return {
      title: "AI Digital Citizenship Detector",
      body: (
        <>
          Explore online behavior, safety, and respectful use of AI with our interactive Streamlit app.
        </>
      ),
      links: [{ href: "/digital-citizenship", label: "Open App" }],
    };
  }

  // InstaGist
  if (/(instagist|gist|article|summary)/.test(q)) {
    return {
      title: "InstaGist 🚀",
      body: <>Paste a URL or text, get a friendly gist, and listen to it at variable speeds.</>,
      links: [{ href: "/instagist", label: "Try InstaGist" }],
    };
  }

  // Contact
  if (/(contact|email|phone|whatsapp|call)/.test(q)) {
    return {
      title: "Contact us",
      body: (
        <>
          Reach us by email or message; we usually reply within a few hours.
        </>
      ),
      links: [
        { href: "mailto:thinkpythonai@gmail.com", label: "Email", variant: "outline", external: true },
        { href: "tel:+16034170825", label: "Call +1 (603) 417-0825", variant: "outline", external: true },
        { href: "https://wa.me/16034170825", label: "WhatsApp", variant: "primary", external: true },
      ],
    };
  }

  return null;
}