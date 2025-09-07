import ScreenshotGallery from "@/components/ScreenshotGallery";
import HeroTestimonial from "@/components/HeroTestimonial";

export const metadata = {
  title: "Testimonials | ThinkPythonAI",
  description:
    "Real stories from freshers, working professionals, and parents. Python and AI training that’s practical and respectful.",
};

export default function TestimonialsPage() {
  // Real quotes
  // Archana and Saty HERO feedback  
  {/* ① Georgia Tech — HERO */}
  <HeroTestimonial
    label="💡 From Confusion to Confidence 🚀"
    author="Masters Student"
    role="Georgia Tech, USA"
    text={
      "Ankit sir is an absolutely amazing mentor who has transformed my learning journey in ways I never expected!\n\n" +
      "When I was confused and doubtful about choosing between Python with DevOps or AI, he and his team with their expert guidance helped me understand both paths clearly. " +
      "I couldn’t wait to start his classes, and once I did, I was completely mesmerized by his teaching approach.\n\n" +
      "What sets Ankit apart is his dedication to ensuring every student truly understands the concepts. He explains each and every detail with such clarity, " +
      "and if someone doesn’t grasp something the first time, he patiently teaches it again and again until we completely understand it. " +
      "His teaching methodology is unlike anything I’ve experienced before.\n\n" +
      "He provides extensive practice work and challenging exercises that help us achieve perfection in our skills. " +
      "Among all the courses and trainers I’ve enrolled with, Ankit stands head and shoulders above the rest. " +
      "I feel incredibly lucky to have found such a kind, patient, and knowledgeable mentor.\n\n" +
      "He’s like having a dedicated professor who gives us tricky questions, provides numerous practical examples, and offers perfect guidance throughout our IT journey. " +
      "His support has been invaluable in building my confidence and technical skills.\n\n" +
      "If his classes are offered again, there’s no question — I will choose only him. Anyone who learns from Ankit will gain tremendous confidence after training and become a hero in coding!\n\n" +
      "What truly makes him special is his availability and support. When you’re doubtful or stuck, he’s always there to help, unlike many other trainers. " +
      "Simply put, no one can compare to him — he is the best among everyone I’ve encountered in my learning journey.\n\n" +
      "I am blessed to have Ankit as my mentor, and I wholeheartedly recommend him to anyone serious about excelling in their IT career."
    }
  />
  
  {/* ② Satya — LinkedIn (two-part highlight) */}
  <HeroTestimonial
    label="💡 From Classroom to LinkedIn 🚀"
    author="Satya"
    role="Software Engineer, LinkedIn"
    text={
      "Happy Teacher’s Day to the most special teacher in my life — your guidance has been a light in my journey, and I truly feel blessed to have been your student; " +
      "I am deeply grateful for everything you have done to shape who I am today, and I am sure you will be happy to know that I am now working at LinkedIn, sir.\n\n" +
      "Thank you so much… Sir. It means a lot to me to be called your favorite student.\n\n" +
      "Learning Python with you has been an amazing experience. The way you explain concepts with clarity and real-life examples made even the toughest topics simple to understand. " +
      "Your patience, encouragement, and constant support kept me motivated throughout the sessions.\n\n" +
      "I have not only gained technical knowledge, but also confidence in problem-solving and a genuine interest in coding.\n\n" +
      "Thank you once again for everything you have taught me — it will always stay with me."
    }
  />
  
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
    { src: "/testimonials/Satya.jpeg", alt: "WhatsApp feedback\nShared by carrer-switcher (Non-IT to IT) now an engineer in Linkedin" },
    { src: "/testimonials/Archana_1.jpeg", alt: "WhatsApp feedback\nShared by currently enrolled MS student" },
    { src: "/testimonials/Archana_2.jpeg", alt: "WhatsApp feedback\nShared by currently enrolled MS student" },
    { src: "/testimonials/Passion.jpeg", alt: "WhatsApp feedback\nShared by current batch student" },
    { src: "/testimonials/Effective_approachable.jpeg", alt: "WhatsApp feedback\nShared by current batch student" },
    { src: "/testimonials/complex.jpeg", alt: "WhatsApp feedback\nShared by current batch student" },
    { src: "/testimonials/shweta.jpeg", alt: "WhatsApp feedback\nShared by current batch student" },
    { src: "/testimonials/hackerrank.jpeg", alt: "WhatsApp feedback\nShared by current batch student" },
    { src: "/testimonials/dedication.jpeg", alt: "WhatsApp feedback\nShared by former batch student" },
    { src: "/testimonials/quiz.jpeg", alt: "WhatsApp feedback\nShared by current batch student" },
    { src: "/testimonials/strong_foundation.jpeg", alt: "WhatsApp feedback\nShared by current batch student" },
    { src: "/testimonials/fav.jpeg", alt: "WhatsApp feedback\nShared by former batch  student" },
    { src: "/testimonials/Aug.jpeg", alt: "WhatsApp feedback\nShared by group batch of August 2025" },
    { src: "/testimonials/awesome.jpeg", alt: "WhatsApp feedback\nShared by current batch student" },
    { src: "/testimonials/fan.jpeg", alt: "WhatsApp feedback\nShared by earlier student" },
    { src: "/testimonials/interactive.jpeg", alt: "WhatsApp feedback\nShared by former batch student" },
    { src: "/testimonials/HTD.jpeg", alt: "WhatsApp feedback\nShared by former batch  student" },
    { src: "/testimonials/chandu.jpeg", alt: "WhatsApp feedback\nShared by former batch  student" },
    { src: "/testimonials/fantastic.jpeg", alt: "WhatsApp feedback\nShared by former batch student" },
    { src: "/testimonials/Rashmi.jpeg", alt: "WhatsApp feedback\nShared by former batch student" },
    { src: "/testimonials/Sarah.jpeg", alt: "WhatsApp feedback\nShared by former batch student" },
    { src: "/testimonials/Mamtha.jpeg", alt: "WhatsApp feedback\nShared by former batch student" },
    { src: "/testimonials/lots.jpeg", alt: "WhatsApp feedback\nShared by former batch student" },
    { src: "/testimonials/Pavan.jpeg", alt: "WhatsApp feedback\nShared by current batch student" },
    { src: "/testimonials/Hari.jpeg", alt: "WhatsApp feedback\nShared by former batch student" },
    { src: "/testimonials/clear.jpeg", alt: "WhatsApp feedback\nShared by former batch student" },

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