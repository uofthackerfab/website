import Image from "next/image"
import { GradientBackground } from "@/components/gradient-background"
import { HeroScene } from "@/components/hero-scene"
import { ShopifyLogo } from "@/components/shopify-logo"

const JOIN_URL = "https://form.typeform.com/to/WDKMFCuC"
const DOCS_URL = "https://docs.torontohackerfab.com"

const projects = [
  {
    name: "Tube furnace",
    status: "Working",
    detail:
      "Used for thermal oxidation. It grows a layer of silicon dioxide on the wafer, which serves as an insulator, a mask, or a gate oxide depending on the process.",
  },
  {
    name: "Spin coater",
    status: "Working",
    detail:
      "Used to apply chemicals such as photoresist evenly across the wafer. The wafer spins at high speed so the liquid spreads into a thin, uniform film.",
  },
  {
    name: "Magnetron sputtering",
    status: "In progress",
    detail:
      "Used for thin-film metal deposition. It adds metal layers to the wafer that are later patterned into interconnects, contacts, or electrodes.",
  },
  {
    name: "Lithography stepper",
    status: "Planned",
    detail:
      "Used to pattern features onto the wafer. Light is projected through a mask onto the photoresist, so later steps know exactly where material should stay or be removed.",
  },
]

const useCases = [
  "Sensor interface chips",
  "Mixed-signal test chips",
  "Neurotech and bioelectronic chips",
  "Accelerator prototype chips for AI",
]

const team = [
  { name: "Kenny Guo", link: "https://www.linkedin.com/in/kennyguo" },
  { name: "Krish Chhajer", link: "https://www.linkedin.com/in/krish-chhajer/" },
  { name: "Luthira Abeykoon", link: "https://www.linkedin.com/in/luthiraa/" },
]

export default function Page() {
  return (
    <>
      <GradientBackground />

      <header className="site-header fixed inset-x-0 top-0 z-50">
        <div className="shell flex items-center justify-between h-16">
          <a href="#top" className="t-label">
            Hacker Fab Toronto
          </a>
          <nav aria-label="Primary" className="flex items-center gap-6 t-label">
            <a className="nav-link" href="#projects">
              Projects
            </a>
            <a className="nav-link" href={DOCS_URL} target="_blank" rel="noopener noreferrer">
              Docs
            </a>
            <a className="nav-link" href={JOIN_URL} target="_blank" rel="noopener noreferrer">
              Join
            </a>
          </nav>
        </div>
      </header>

      <main id="top" className="relative">
        <HeroScene>
          <div className="shell">
            <div className="max-w-[40rem]">
              <h1 className="t-display">Hacker Fab</h1>
              <p className="t-lede mt-6">
                A student-run project at the University of Toronto. We are building an open
                hardware stack and software toolchain for making advanced chips that accelerate
                computational tasks.
              </p>
            </div>
          </div>
        </HeroScene>

        <div className="content">
          <section className="section" aria-labelledby="goal-title">
            <div className="shell grid-12">
              <div className="span-4">
                <h2 id="goal-title" className="t-title">
                  Our goal
                </h2>
              </div>
              <div className="span-7 start-6 space-y-6">
                <p className="t-body text-primary">
                  Take the core knowledge, process structure, tooling philosophy, and iteration
                  loops behind advanced chip fabrication, and make them far more legible,
                  accessible, reproducible, and buildable by many more people.
                </p>
                <p className="t-body">
                  We are not trying to compete with Atomic Semi by building a rival fab, and we are
                  not trying to compete with TSMC on state-of-the-art chips. The aim is to learn as
                  much as possible about closed-source procedures, and to use experiments and
                  ablations to reinvent the steps needed to make quality semiconductor devices in a
                  reproducible way.
                </p>
              </div>
            </div>
          </section>

          <section className="section" aria-labelledby="value-title">
            <div className="shell grid-12">
              <div className="span-4">
                <h2 id="value-title" className="t-title">
                  Why it matters
                </h2>
              </div>
              <div className="span-7 start-6 space-y-6">
                <p className="t-body">
                  Hacker Fab is building a fast-turn, transparent, modular semiconductor prototyping
                  stack for simple and moderately complex designs at larger nodes, where iteration
                  speed, process legibility, and low NRE matter more than cutting-edge density. For
                  a certain class of chips, a quick, low-cost, larger-node tapeout with tight
                  iteration loops is worth far more than access to the best node.
                </p>
                <p className="t-body">Examples of use cases:</p>
                <ul className="t-body space-y-1 pl-5 list-disc marker:text-[color:var(--text-secondary)]">
                  {useCases.map((u) => (
                    <li key={u}>{u}</li>
                  ))}
                </ul>
                <p className="t-body">
                  Above all, we are optimizing for transparent, high-frequency prototyping and
                  learning. We want the cycle of
                </p>
                <p className="t-heading-20 text-primary">
                  Design → Fabricate → Measure → Debug → Repeat
                </p>
                <p className="t-body">
                  to be as fast as it can possibly get, so that feedback loops for learning are
                  short. That also means we learn more ourselves.
                </p>
                <p className="t-body">
                  We want to own the layer of process development and early prototyping that comes
                  before high-end foundry use. This matters for validation beyond FPGA prototyping:
                  an FPGA can validate logic, but not full silicon behaviour across process, layout,
                  IO, and device effects. Researchers, device teams, hardware startups, and
                  educational labs should be able to tape out and debug much faster than traditional
                  channels allow, especially where transistor counts are modest, performance per
                  watt is not the bottleneck, and custom interfaces, iteration speed, and
                  post-FPGA silicon validation matter more.
                </p>
              </div>
            </div>
          </section>

          <section id="projects" className="section" aria-labelledby="projects-title">
            <div className="shell grid-12">
              <div className="span-4">
                <h2 id="projects-title" className="t-title">
                  Major projects
                </h2>
              </div>
              <div className="span-7 start-6 space-y-6">
                <p className="t-body">
                  A basic semiconductor workflow needs tools for growing material, depositing
                  material, coating the wafer, and patterning the wafer. We are building each of
                  these and making sure they are durable and resistant to every kind of error.
                  Starting the hacky way is a good way to begin, but eventually the work has to be
                  professional: we need to consider every way the equipment could go wrong and
                  prevent issues or danger before they arise.
                </p>
                <dl className="divide-y divide-[color:var(--border-subtle)] border-t border-[color:var(--border-subtle)]">
                  {projects.map((p) => (
                    <div key={p.name} className="py-5 space-y-2">
                      <dt className="flex items-baseline justify-between gap-6">
                        <span className="t-heading-16 text-primary">{p.name}</span>
                        <span className="t-caption">{p.status}</span>
                      </dt>
                      <dd className="t-body">{p.detail}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>

          <section className="section" aria-labelledby="process-title">
            <div className="shell grid-12">
              <div className="span-4">
                <h2 id="process-title" className="t-title">
                  Process documentation
                </h2>
              </div>
              <div className="span-7 start-6 space-y-6">
                <p className="t-body">
                  Alongside the projects, we are writing a proposal document that lays out exactly
                  what we are going to do and how. The most important question it has to answer:
                </p>
                <p className="t-body text-primary">
                  In a multi-step process, if something goes wrong, how do we debug and fix the
                  issue?
                </p>
                <p className="t-body">
                  Thinking this through carefully reduces our iteration attempts and uncertainty
                  during actual fabrication. Once we move to real experiments and ablations, we
                  document every finding and discovery in detail.
                </p>
              </div>
            </div>
          </section>

          <section className="section" aria-labelledby="extra-title">
            <div className="shell grid-12">
              <div className="span-4">
                <h2 id="extra-title" className="t-title">
                  Extra projects
                </h2>
              </div>
              <div className="span-7 start-6">
                <ul className="t-body space-y-1">
                  <li>OPU (optical processing unit)</li>
                  <li>NV diamond sensing (quantum-related)</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="section" aria-labelledby="team-title">
            <div className="shell grid-12">
              <div className="span-4">
                <h2 id="team-title" className="t-title">
                  Team
                </h2>
              </div>
              <div className="span-7 start-6">
                <ul className="t-body space-y-1">
                  {team.map((m) => (
                    <li key={m.name}>
                      <a className="nav-link" href={m.link} target="_blank" rel="noopener noreferrer">
                        {m.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="section" aria-labelledby="grants-title">
            <div className="shell grid-12">
              <div className="span-4">
                <h2 id="grants-title" className="t-title">
                  Supported by
                </h2>
              </div>
              <div className="span-7 start-6 space-y-6">
                <p className="t-body">
                  Hacker Fab is funded by grants from Shopify and Emergent Ventures. Thank you.
                </p>
                <ul className="flex flex-wrap items-center gap-x-12 gap-y-6 text-primary">
                  <li>
                    <ShopifyLogo className="h-7 w-auto" />
                  </li>
                  <li>
                    <Image
                      src="/ev.png"
                      alt="Emergent Ventures"
                      width={400}
                      height={192}
                      className="h-10 w-auto"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <footer className="border-t border-[color:var(--border-subtle)]">
            <div className="shell flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-8 t-caption">
              <span>Hacker Fab Toronto</span>
              <nav aria-label="Footer" className="flex gap-6">
                <a className="nav-link" href={DOCS_URL} target="_blank" rel="noopener noreferrer">
                  Docs
                </a>
                <a className="nav-link" href={JOIN_URL} target="_blank" rel="noopener noreferrer">
                  Join
                </a>
              </nav>
            </div>
          </footer>
        </div>
      </main>
    </>
  )
}
