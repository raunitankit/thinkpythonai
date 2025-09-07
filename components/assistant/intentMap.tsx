// components/assistant/intentMap.tsx
import type { ReactNode } from "react";

export type Intent =
  | "payments"
  | "trainer"
  | "courses"
  | "kids"
  | "testimonials"
  | "contact"
  | "home"
  | "unknown";

export type IntentReply = {
  title: string;
  body: ReactNode; // JSX-friendly
};

const normalize = (s: string) => s.toLowerCase().trim();

export function detectIntent(input: string): Intent {
  const q = normalize(input);

  // --- Order matters: check for testimonials BEFORE payments ---
  if (/\b(testimonial|testimonials|review|reviews|feedback|student (story|stories)|trainer feedback)\b/.test(q)) {
    return "testimonials";
  }

  if (/\b(trainer|coach|instructor|about (you|trainer)|know your trainer)\b/.test(q)) {
    return "trainer";
  }

  if (/\b(course|courses|track|tracks|syllabus|curriculum|program|starter|pro|elite)\b/.test(q)) {
    return "courses";
  }

  if (/\b(kid|kids|school|schools|district|teacher|classroom|iste|csta|po|invoice|invoices)\b/.test(q)) {
    return "kids";
  }

  // ✅ Word-boundaries stop matching "fee" inside "feedback"
  if (
    /\b(payment|payments|pay|zelle|enrol+l|enrollment|fee|fees|pricing|price|prices|how (to )?join|book|register)\b/.test(q)
  ) {
    return "payments";
  }

  if (/\b(contact|email|phone|whatsapp|reach|support|help)\b/.test(q)) {
    return "contact";
  }

  if (/\b(home|homepage|main page|thinkpythonai)\b/.test(q)) {
    return "home";
  }

  return "unknown";
}

export function getIntentAnswer(intent: Intent): IntentReply {
  switch (intent) {
    case "payments":
      return {
        title: "Payments & ways to enroll",
        body: (
          <>
            We currently accept <strong>Zelle: +1 (603) 417-0825</strong>. Email your
            receipt to{" "}
            <a className="underline" href="mailto:thinkpythonai@gmail.com">
              thinkpythonai@gmail.com
            </a>
            . First 2 live classes are free—see the refund policy for details.
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              <a href="/#pricing" className="underline">
                View pricing →
              </a>
              <a
                href="https://forms.gle/D8W6ePzfzeszgPFr6"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Join the next live demo →
              </a>
            </div>
          </>
        ),
      };

    case "trainer":
      return {
        title: "Know your trainer",
        body: (
          <>
            Learn from <strong>Ankit</strong> — Sr. Automation Architect (Director-level
            leader). 20+ years across development, QA, test automation, and DevOps.
            Students consistently rate the sessions highly. Python is the backbone of AI,
            and we teach it hands-on.
            <div className="mt-3 text-sm">
              <a href="/#trainer" className="underline">
                Meet your trainer →
              </a>
            </div>
          </>
        ),
      };

    case "courses":
      return {
        title: "Find your track",
        body: (
          <>
            Choose from Starter, Pro, or Elite. Build real projects (automation, AI,
            dashboards) with recordings and community support.
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              <a href="/#trainer" className="underline">
                Explore tracks →
              </a>
              <a href="/#curriculum" className="underline">
                See curriculum →
              </a>
            </div>
          </>
        ),
      };

    case "kids":
      return {
        title: "Kids & Schools",
        body: (
          <>
            We partner with schools/districts and offer after-school clubs, electives, and
            teacher PD. Projects align to <strong>ISTE</strong> & <strong>CSTA</strong>.
            POs/invoices supported.
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              <a href="/courses#kids" className="underline">
                Kids & Schools page →
              </a>
              <a href="/#schools" className="underline">
                School benefits →
              </a>
            </div>
          </>
        ),
      };

    case "testimonials":
      return {
        title: "What students say",
        body: (
          <>
            Read real feedback from freshers, working pros, and parents. Includes
            screenshots and detailed quotes.
            <div className="mt-3 text-sm">
              <a href="/testimonials" className="underline">
                See testimonials →
              </a>
            </div>
          </>
        ),
      };

    case "contact":
      return {
        title: "Contact ThinkPythonAI",
        body: (
          <>
            Email:{" "}
            <a className="underline" href="mailto:thinkpythonai@gmail.com">
              thinkpythonai@gmail.com
            </a>{" "}
            · WhatsApp:{" "}
            <a
              className="underline"
              href="https://wa.me/16034170825"
              target="_blank"
              rel="noreferrer"
            >
              +1 (603) 417-0825
            </a>{" "}
            · Call: <strong>+1 (603) 417-0825</strong>
            <div className="mt-3 text-sm">
              <a href="/assistant" className="underline">
                Chat on this page →
              </a>
            </div>
          </>
        ),
      };

    case "home":
      return {
        title: "Homepage",
        body: (
          <>
            Head back to the main page to explore features, projects, and pricing.
            <div className="mt-3 text-sm">
              <a href="/" className="underline">
                Go to ThinkPythonAI →
              </a>
            </div>
          </>
        ),
      };

    default:
      return {
        title: "I can help with these:",
        body: (
          <ul className="list-disc ml-5 space-y-1">
            <li>Payments, pricing, and enrolling</li>
            <li>About the trainer</li>
            <li>Courses / curriculum</li>
            <li>Kids & Schools partnerships</li>
            <li>Testimonials</li>
            <li>Contact options</li>
          </ul>
        ),
      };
  }
}