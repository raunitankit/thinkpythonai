import ScreenshotGallery from "@/components/ScreenshotGallery";

export const metadata = {
  title: "Testimonials | ThinkPythonAI",
  description:
    "Real stories from freshers, working professionals, and parents. Python and AI training that’s practical and respectful.",
};

export default function TestimonialsPage() {
  // Real quotes
  const quotes = [
    {
      quote:
        "Before joining Ankit’s sessions, I always felt Python was too complex and only for hardcore developers. \nWithin just a few classes, he broke it down step by step, with real projects that made me actually enjoy coding. \nNow I can build small automations on my own — something I never thought I’d say! \nAnkit doesn’t just teach Python, he makes sure you understand why things work, and how Python is really the backbone of AI and automation today. \nI’d recommend Ankit and ThinkPythonAI to any student or working professional who wants practical skills they can use immediately.",
      by: "Sachin",
      role: "Software engineer in a Pharma company",
    },
    {
      quote:
        "Happy Teacher’s Day to the most special teacher in my life — your guidance has been a light in my journey, and I truly feel blessed to have been your student; \nI am deeply grateful for everything you have done to shape who I am today, and I am sure you will be happy to know that I am now working at LinkedIn, sir",
      by: "Satya",
      role: "Engineer at LinkedIn",
    },
    {
      quote:
        "I can’t recommend ThinkPythonAI training enough! A huge shoutout to my coach Ankit for his incredible way of teaching. \nIt’s not the usual traditional lecture style, instead, he makes every session highly interactive. He keeps asking thought-provoking questions that push you to think logically and stay engaged throughout. \nWhen I started, I had zero knowledge of Python. But thanks to Ankit’s unique approach and guidance, I’m not only learning but actually building the confidence to master it. \nHis teaching style makes the journey exciting, practical, and motivating. \nIf you’re looking to truly understand Python and enjoy the process, Ankit’s ThinkPythonAI training is the way to go!",
      by: "Shweta",
      role: "QA engineer in Silicon Valley",
    },
  ];

  // 🖼️ Screenshots go to /public/testimonials and list them here
  const shots = [
    { src: "/testimonials/Satya.jpg", alt: "WhatsApp feedback\nShared by carrer-switcher (Non-IT to IT)" },
    { src: "/testimonials/Effective_approachable.jpg", alt: "WhatsApp feedback\nShared by current batch student" },
    { src: "/testimonials/Passion.jpg", alt: "WhatsApp feedback\nShared by current batch student" },
    { src: "/testimonials/complex.jpg", alt: "WhatsApp feedback\nShared by current batch student" },
    { src: "/testimonials/shweta.jpg", alt: "WhatsApp feedback\nShared by current batch student" },
    { src: "/testimonials/hackerrank.jpg", alt: "WhatsApp feedback\nShared by current batch student" },
    { src: "/testimonials/dedication.jpg", alt: "WhatsApp feedback\nShared by former batch student" },
    { src: "/testimonials/quiz.jpg", alt: "WhatsApp feedback\nShared by current batch student" },
    { src: "/testimonials/strong_foundation.jpg", alt: "WhatsApp feedback\nShared by current batch student" },
    { src: "/testimonials/fav.jpg", alt: "WhatsApp feedback\nShared by former batch  student" },
    { src: "/testimonials/Aug.jpg", alt: "WhatsApp feedback\nShared by group batch of August 2025" },
    { src: "/testimonials/awesome.jpg", alt: "WhatsApp feedback\nShared by current batch student" },
    { src: "/testimonials/fan.jpg", alt: "WhatsApp feedback\nShared by earlier student" },
    { src: "/testimonials/interactive.jpg", alt: "WhatsApp feedback\nShared by former batch student" },
    { src: "/testimonials/HTD.jpg", alt: "WhatsApp feedback\nShared by former batch  student" },
    { src: "/testimonials/chandu.jpg", alt: "WhatsApp feedback\nShared by former batch  student" },
    { src: "/testimonials/Hari.jpg", alt: "WhatsApp feedback\nShared by former batch student" },
    { src: "/testimonials/clear.jpg", alt: "WhatsApp feedback\nShared by former batch student" },


  ];

  return (
    <main className="container py-10">
      {/* Back button */}
      <div className="mb-6">
        <a
          href="/"
          className="inline-block bg-slate-900 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90"
        >
          🔙 Back to ThinkPythonAI
        </a>
      </div>

      <h1 className="text-3xl font-extrabold">Testimonials</h1>
      <p className="text-slate-600 mt-2">
        Real feedback from freshers, working professionals, and parents — all
        learning Python and <span className="font-semibold">responsible AI</span>.
      </p>

      {/* Text quotes */}
      <section className="mt-8 grid md:grid-cols-3 gap-4">
        {quotes.map((t) => (
          <figure
            key={t.quote.slice(0, 30)}
            className="rounded-2xl border bg-white p-6 shadow-sm flex flex-col justify-between"
          >
            <blockquote className="italic text-slate-700 space-y-3">
              {t.quote.split("\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </blockquote>
            <figcaption className="mt-4 text-sm">
              <span className="font-semibold">{t.by}</span>
              <span className="ml-2 text-slate-500">— {t.role}</span>
            </figcaption>
          </figure>
        ))}
      </section>

      {/* Screenshot gallery */}
      <section className="mt-10">
        <div className="p-4 border-b font-semibold card">Screenshots (WhatsApp & Forms)</div>
        <div className="p-4 card">
          <p className="text-sm text-slate-600 mb-4">
            We’ve blurred/removed personal details for privacy. Click any image to view full size.
          </p>
          <ScreenshotGallery items={shots} />
        </div>
      </section>

      {/* Bottom back button */}
      <div className="mt-8 text-center">
        <a
          href="/"
          className="inline-block bg-slate-900 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90"
        >
          🔙 Back to ThinkPythonAI
        </a>
      </div>
    </main>
  );
}