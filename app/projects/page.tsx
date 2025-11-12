import Link from "next/link"
import { Instrument_Serif } from "next/font/google"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

const highlightProjects = [
  {
    title: "tube furnace",
    description: "High-temperature furnace for semiconductor processing and material synthesis.",
    status: "Lab-Ready",
    tags: ["furnace", "pid", "process"],
  },
  {
    title: "spin coater",
    description: "Device for uniform thin film deposition via high-speed spinning.",
    status: "active-build",
    tags: ["electronics", "thin film", "deposition"],
  },
  {
    title: "lithography stepper",
    description: "Precision optical system for photolithography pattern transfer.",
    status: "researching",
    tags: ["photolithography", "optics", "stepper"],
  },
]

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="glow-sheen" />
      <div className="absolute inset-0 -z-20 bg-black" />

      <div className="relative z-10 flex flex-col gap-16 px-6 py-16 md:py-24 max-w-3xl mx-auto">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-white/60 hover:text-white transition"
          >
            <span aria-hidden="true">←</span> back
          </Link>
        </div>
        <header className="space-y-4 text-left">
          <p className="text-xs uppercase tracking-[0.5em] text-white/60">projects</p>
          <h1 className={`${instrumentSerif.className} text-4xl sm:text-5xl font-normal tracking-tight`}>
            building with silicon, one weird idea at a time
          </h1>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            Each build cycle pairs fabrication-minded engineers with the lab infrastructure, mentors, and capital
            equipment we maintain across UofT. These are the builds on deck right now.
          </p>
        </header>

        <section className="space-y-10">
          {highlightProjects.map((project) => (
            <article
              key={project.title}
              className="group relative flex flex-col gap-3 border-l border-white/30 pl-6 transition-all duration-300 ease-out hover:border-white/70 hover:bg-white/5 hover:-translate-y-1 hover:shadow-[0_15px_45px_rgba(0,0,0,0.45)]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-4 -left-px w-px bg-gradient-to-b from-white/70 via-white/20 to-white/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <p className="text-xs uppercase tracking-[0.5em] text-white/50 transition-colors duration-300 group-hover:text-white/80">
                {project.status}
              </p>
              <h2
                className={`${instrumentSerif.className} text-3xl font-normal tracking-tight transition-colors duration-300 group-hover:text-white`}
              >
                {project.title}
              </h2>
              <p className="text-base text-white/80 leading-relaxed transition-colors duration-300 group-hover:text-white/90">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.35em] text-white/60 transition-colors duration-300 group-hover:text-white/80">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </section>

        <footer className="flex flex-col items-center gap-3 text-sm text-white/70">
          <span>Shipping something wild? We want to hear about it.</span>
          <Link
            href="/join"
            className="inline-flex items-center justify-center border-b border-white/50 text-xs uppercase tracking-[0.4em] pb-1 hover:text-white transition-colors"
          >
            join a build week
          </Link>
        </footer>
      </div>
    </main>
  )
}
