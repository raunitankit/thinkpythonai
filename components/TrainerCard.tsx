export default function TrainerCard() {
    return (
      <div className="card">
        <div className="p-4 border-b">
          <div className="text-base font-semibold">👨‍🏫 Know your trainer</div>
        </div>
        <div className="p-4 text-sm text-slate-700 space-y-3">
          <p className="text-slate-900 font-semibold">
            Ankit — Sr. Automation Architect · Director Level Leader
          </p>
          <ul className="list-disc ml-5 space-y-1">
            <li>
              <span className="font-semibold">20+ years of expertise</span> in
              software development, QA, automation, and DevOps — with leadership
              roles across US and India.
            </li>
            <li>
              Designed and deployed{" "}
              <span className="font-semibold">Python-based automation frameworks</span>{" "}
              (Robot, CI/CD) that accelerated enterprise releases and improved
              product quality at scale.
            </li>
            <li>
              <span className="font-semibold">Proven educator and mentor</span> —
              trained students and professionals in India and the US, consistently
              earning top feedback for clarity and real-world focus.
            </li>
            <li>
              Believes <span className="font-semibold">Python is the backbone of AI</span> —
              powering data science, machine learning, and modern automation.
            </li>
            <li>
              Passionate about <span className="font-semibold">starting young</span> —
              introducing kids and schools to Python & AI early, building a strong
              foundation for future innovators.
            </li>
          </ul>
          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href="mailto:thinkpythonai@gmail.com"
              className="inline-flex items-center px-3 py-2 rounded-xl border text-slate-800"
            >
              📧 Email Ankit
            </a>
          </div>
        </div>
      </div>
    );
  }
  