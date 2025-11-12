import Link from "next/link"
import { Instrument_Serif } from "next/font/google"
import { GradientBackground } from "@/components/gradient-background"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

const steps = [
  {
    step: "01",
    title: "orientation night",
    detail: "Drop in for a tour of the lab stack, meet current project leads, and learn what gear you can access.",
  },
  {
    step: "02",
    title: "skills lab",
    detail: "Pick a micro-lab (process, RF, packaging, firmware) and complete it with a mentor in two evenings.",
  },
  {
    step: "03",
    title: "build crew",
    detail: "Join an existing crew or pitch your own build week. We ship in 6-week sprints with public demos.",
  },
]

export default function JoinPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <GradientBackground />
      <div className="absolute inset-0 -z-10 bg-black/65" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16 md:py-24 flex flex-col gap-14">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-white/60 hover:text-white transition"
          >
            <span aria-hidden="true">←</span> back
          </Link>
        </div>
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.5em] text-white/60">join</p>
          <h1 className={`${instrumentSerif.className} text-3xl sm:text-4xl font-normal tracking-tight`}>
            show up curious, leave with silicon dust on your sleeves
          </h1>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            We onboard twice per semester with rolling invites for collaborators. Start by visiting an orientation night
            or send us a note with what you are building.
          </p>
        </header>

        <section className="flex flex-col gap-6">
          {steps.map((step) => (
            <article key={step.step} className="flex flex-col gap-2">
              <div className="flex items-center gap-4 text-xs uppercase tracking-[0.5em] text-white/50">
                <span>{step.step}</span>
                <div className="h-px flex-1 bg-white/15" />
                <span>{step.title}</span>
              </div>
              <p className="text-sm text-white/85 leading-relaxed">{step.detail}</p>
            </article>
          ))}
        </section>

        <section className="flex flex-col gap-10">
          <div className="space-y-3">
            <h2 className={`${instrumentSerif.className} text-2xl font-normal`}>upcoming orientation</h2>
            <p className="text-sm text-white/80">November 22 · 7PM · BA1230 · snacks + lab tours</p>
            <Link
              href="mailto:hackerfab@utoronto.ca"
              className="inline-flex border-b border-white/50 px-2 pb-1 text-xs uppercase tracking-[0.4em] hover:text-white transition-colors"
            >
              rsvp
            </Link>
          </div>
          <div className="space-y-3">
            <h2 className={`${instrumentSerif.className} text-2xl font-normal`}>pitch a build</h2>
            <p className="text-sm text-white/80">
              Send us five sentences about the technology, constraints, and dream demo. We reply within a week.
            </p>
            <Link
              href="https://forms.gle/hackerfab"
              className="inline-flex border-b border-white/50 px-2 pb-1 text-xs uppercase tracking-[0.4em] hover:text-white transition-colors"
            >
              submit form
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
