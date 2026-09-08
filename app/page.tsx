import Image from "next/image"
import { GradientBackground } from "@/components/gradient-background"
import { FurnaceBackground } from "@/components/furnace-background"
import { HeroScene } from "@/components/hero-scene"

const JOIN_URL = "https://form.typeform.com/to/WDKMFCuC"
const DOCS_URL = "https://docs.torontohackerfab.com"

type Status = "operational" | "complete" | "progress" | "research"

const processStack: {
  step: string
  tool: string
  purpose: string
  status: Status
  statusLabel: string
}[] = [
  {
    step: "Thermal oxidation",
    tool: "Tube furnace",
    purpose:
      "Grows a silicon dioxide layer on the wafer. Depending on the recipe it becomes an insulator, an etch mask, or the gate oxide.",
    status: "operational",
    statusLabel: "Operational",
  },
  {
    step: "Resist coating",
    tool: "Spin coater",
    purpose:
      "Spreads photoresist into a thin, even film by spinning the wafer at speed. Every pattern step starts here.",
    status: "complete",
    statusLabel: "Complete",
  },
  {
    step: "Metal deposition",
    tool: "Magnetron sputtering",
    purpose:
      "Deposits thin metal films that later become contacts, interconnects, and electrodes.",
    status: "progress",
    statusLabel: "In progress",
  },
  {
    step: "Patterning",
    tool: "Lithography stepper",
    purpose:
      "Projects a mask pattern into the resist so later steps know exactly where material stays and where it goes.",
    status: "research",
    statusLabel: "Researching",
  },
]

const useCases = [
  "Sensor interface chips",
  "Mixed-signal test chips",
  "Neurotech and bioelectronic devices",
  "Small accelerator prototypes for AI workloads",
]

const audiences = ["Researchers", "Device teams", "Hardware startups", "Educational labs"]

const sideProjects = [
  {
    name: "Optical processing unit",
    detail: "An experiment in computing with light instead of charge.",
  },
  {
    name: "NV-diamond sensing",
    detail: "Quantum sensing with nitrogen-vacancy centres in diamond.",
  },
]

const team = [
  { name: "Kenny Guo", role: "Co-founder", photo: "/1750374255916.jpeg", link: "https://www.linkedin.com/in/kennyguo" },
  { name: "Krish Chhajer", role: "Co-founder", photo: "/1746147185644.jpeg", link: "https://www.linkedin.com/in/krish-chhajer/" },
  { name: "Luthira Abeykoon", role: "Co-founder", photo: "/1755988168159.jpeg", link: "https://www.linkedin.com/in/luthiraa/" },
]

function Wordmark() {
  return (
    <span className="inline-flex items-baseline gap-2 t-label">
      <span className="mark" aria-hidden="true">
        {""}
      </span>
      <span>hacker fab</span>
      <span className="prose-secondary font-normal">toronto</span>
    </span>
  )
}

export default function Page() {
  return (
    <>
      <a
        href="#mission"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] btn btn-contrast"
      >
        Skip to content
      </a>

      <GradientBackground />
      <FurnaceBackground />

      <header className="site-header fixed inset-x-0 top-0 z-50">
        <div className="shell flex items-center justify-between h-16">
          <a href="#top" aria-label="Hacker Fab Toronto, back to top">
            <Wordmark />
          </a>
          <nav aria-label="Primary" className="flex items-center gap-6 t-label">
            <a className="link hidden sm:inline" href="#process">
              process
            </a>
            <a className="link hidden sm:inline" href="#team">
              team
            </a>
            <a className="link" href={DOCS_URL} target="_blank" rel="noopener noreferrer">
              docs
            </a>
            <a className="btn btn-contrast h-8 px-3 text-[13px]" href={JOIN_URL} target="_blank" rel="noopener noreferrer">
              join
            </a>
          </nav>
        </div>
      </header>

      <main id="top" className="relative">
        <HeroScene>
          <div className="shell">
            <div className="grid-12 items-end">
              <div className="span-7">
                <h1 className="t-display">Chips, built from first principles.</h1>
                <p className="t-lede mt-6">
                  Hacker Fab Toronto is a student-run team at the University of Toronto building an
                  open hardware stack and toolchain for making semiconductor devices, in a lab we
                  assembled ourselves.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a className="btn btn-contrast" href={JOIN_URL} target="_blank" rel="noopener noreferrer">
                    Join the team
                  </a>
                  <a className="btn" href="#mission">
                    Read the mission
                  </a>
                </div>
              </div>
              <div className="span-5 hidden md:block">
                <dl className="t-caption grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 justify-end text-right">
                  <dt className="prose-secondary">where</dt>
                  <dd>University of Toronto</dd>
                  <dt className="prose-secondary">first target</dt>
                  <dd>a working NMOS transistor</dd>
                  <dt className="prose-secondary">tools online</dt>
                  <dd>2 of 4</dd>
                </dl>
              </div>
            </div>
          </div>
        </HeroScene>

        {/* Content sits on a solid ground so it reads over the scene. */}
        <div className="relative bg-[color:var(--surface-primary)]/92 border-t border-[color:var(--border-default)]">
          <section id="mission" className="section border-t-0" aria-labelledby="mission-title">
            <div className="shell grid-12">
              <div className="span-4">
                <h2 id="mission-title" className="t-title">
                  What we are doing
                </h2>
              </div>
              <div className="span-7 start-6 space-y-6">
                <p className="t-lede" style={{ color: "var(--text-primary)" }}>
                  Take the knowledge, process structure, tooling, and iteration habits behind
                  advanced chip fabrication, and make them legible, reproducible, and buildable by
                  far more people.
                </p>
                <p className="t-body prose-secondary">
                  We are not trying to build a rival foundry, and we are not chasing leading-edge
                  density. Most of the procedures behind a working process are closed. We want to
                  understand them, rebuild the steps through experiments and ablations, and end up
                  with a process that produces working devices the same way every time.
                </p>
                <p className="t-body prose-secondary">
                  Every build starts hacky. It has to end up professional: durable equipment, every
                  failure mode considered, and hazards handled before they happen.
                </p>
              </div>
            </div>
          </section>

          <section id="loop" className="section" aria-labelledby="loop-title">
            <div className="shell grid-12">
              <div className="span-4">
                <h2 id="loop-title" className="t-title">
                  The loop we optimise for
                </h2>
              </div>
              <div className="span-7 start-6 space-y-8">
                <p className="loop" aria-label="Design, fabricate, measure, debug, repeat">
                  <span>design</span>
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                  <span>fabricate</span>
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                  <span>measure</span>
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                  <span>debug</span>
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                  <span>repeat</span>
                </p>
                <p className="t-body prose-secondary">
                  The whole point is a short feedback loop. A fast, transparent, modular prototyping
                  stack at larger nodes, for simple and moderately complex designs, where turnaround
                  time, a legible process, and low setup cost matter more than density.
                </p>
                <p className="t-body prose-secondary">
                  We want to own the layer between an FPGA and a high-end foundry. An FPGA can prove
                  your logic. It cannot show you how your design behaves as real silicon across
                  process, layout, IO, and device effects. A quick, cheap tapeout can.
                </p>
              </div>
            </div>
          </section>

          <section id="who" className="section" aria-labelledby="who-title">
            <div className="shell grid-12">
              <div className="span-4">
                <h2 id="who-title" className="t-title">
                  Who it is for
                </h2>
              </div>
              <div className="span-7 start-6">
                <p className="t-body prose-secondary">
                  Teams that are blocked by slow, expensive tapeout options, whose transistor counts
                  are modest, and who care more about custom interfaces and iteration speed than
                  performance per watt.
                </p>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10 mt-10">
                  <div>
                    <h3 className="t-heading-16">Working with</h3>
                    <ul className="mt-4 space-y-2 t-body">
                      {audiences.map((a) => (
                        <li key={a} className="flex gap-3">
                          <span className="text-ember" aria-hidden="true">
                            ·
                          </span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="t-heading-16">Example devices</h3>
                    <ul className="mt-4 space-y-2 t-body">
                      {useCases.map((u) => (
                        <li key={u} className="flex gap-3">
                          <span className="text-ember" aria-hidden="true">
                            ·
                          </span>
                          <span>{u}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="process" className="section" aria-labelledby="process-title">
            <div className="shell">
              <div className="grid-12">
                <div className="span-4">
                  <h2 id="process-title" className="t-title">
                    The process stack
                  </h2>
                </div>
                <div className="span-7 start-6">
                  <p className="t-body prose-secondary">
                    A basic semiconductor flow needs tools to grow material, deposit material, coat
                    the wafer, and pattern it. We are building each one, and each one has to survive
                    every way it could fail.
                  </p>
                </div>
              </div>
              <figure className="mt-12">
                <div className="table-wrap">
                  <table className="data">
                    <thead>
                      <tr>
                        <th scope="col">Step</th>
                        <th scope="col">Tool</th>
                        <th scope="col" className="w-[44%]">
                          What it does
                        </th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {processStack.map((row) => (
                        <tr key={row.step}>
                          <td className="font-bold whitespace-nowrap">{row.step}</td>
                          <td className="whitespace-nowrap">{row.tool}</td>
                          <td className="prose-secondary min-w-[18rem]">{row.purpose}</td>
                          <td>
                            <span className={`status status-${row.status}`}>{row.statusLabel}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <figcaption className="t-caption mt-4">
                  Status as of September 2026. Build notes and process documentation live in the{" "}
                  <a className="link" href={DOCS_URL} target="_blank" rel="noopener noreferrer">
                    docs
                  </a>
                  .
                </figcaption>
              </figure>

              <div className="grid-12 mt-16">
                <div className="span-7 start-6 space-y-6">
                  <h3 className="t-heading-20">Documenting the process, not just the parts</h3>
                  <p className="t-body prose-secondary">
                    Alongside the equipment we are writing a proposal that spells out what we will do
                    and how. The question it has to answer: in a multi-step process, when a step goes
                    wrong, how do we find it and fix it? Thinking that through up front cuts iteration
                    attempts and uncertainty once real wafers are in the furnace.
                  </p>
                  <p className="t-body prose-secondary">
                    When experiments start, every finding gets written down. The point is to learn,
                    and the notes are the product.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="side" className="section" aria-labelledby="side-title">
            <div className="shell grid-12">
              <div className="span-4">
                <h2 id="side-title" className="t-title">
                  Also in the lab
                </h2>
              </div>
              <div className="span-7 start-6">
                <dl className="divide-y divide-[color:var(--border-subtle)]">
                  {sideProjects.map((p) => (
                    <div key={p.name} className="grid sm:grid-cols-[14rem_1fr] gap-x-6 gap-y-1 py-5 first:pt-0">
                      <dt className="t-heading-16">{p.name}</dt>
                      <dd className="t-body prose-secondary">{p.detail}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>

          <section id="team" className="section" aria-labelledby="team-title">
            <div className="shell grid-12">
              <div className="span-4">
                <h2 id="team-title" className="t-title">
                  Team
                </h2>
              </div>
              <div className="span-7 start-6">
                <p className="t-body prose-secondary">
                  A small group of students who wanted to know what actually happens inside a fab,
                  and decided the fastest way to find out was to build one.
                </p>
                <ul className="mt-10 divide-y divide-[color:var(--border-subtle)]">
                  {team.map((m) => (
                    <li key={m.name} className="flex items-center gap-5 py-4 first:pt-0">
                      <span className="relative h-12 w-12 flex-none overflow-hidden rounded-full border border-[color:var(--border-default)]">
                        <Image src={m.photo} alt="" fill sizes="48px" className="object-cover" />
                      </span>
                      <span className="flex-1 min-w-0">
                        <a className="link t-heading-16" href={m.link} target="_blank" rel="noopener noreferrer">
                          {m.name}
                        </a>
                        <span className="block t-caption">{m.role}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-12">
                  <h3 className="t-heading-16">Supported by</h3>
                  <ul className="mt-4 flex flex-wrap items-center gap-x-10 gap-y-4">
                    <li>
                      <Image
                        src="/ev.png"
                        alt="Emergent Ventures"
                        width={400}
                        height={192}
                        className="h-9 w-auto opacity-90"
                      />
                    </li>
                    <li className="t-heading-16" aria-label="Shopify">
                      shopify
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="join" className="section" aria-labelledby="join-title">
            <div className="shell grid-12">
              <div className="span-4">
                <h2 id="join-title" className="t-title">
                  Work with us
                </h2>
              </div>
              <div className="span-7 start-6">
                <p className="t-body prose-secondary">
                  If you want to run wafers, write process docs, design a stepper, or just learn how a
                  transistor gets made, there is a bench for you. No prior fab experience required.
                  Curiosity and care are.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a className="btn btn-contrast" href={JOIN_URL} target="_blank" rel="noopener noreferrer">
                    Apply to join
                  </a>
                  <a className="btn" href={DOCS_URL} target="_blank" rel="noopener noreferrer">
                    Read the docs
                  </a>
                </div>
              </div>
            </div>
          </section>

          <footer className="border-t border-[color:var(--border-default)]">
            <div className="shell flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-8 t-caption">
              <Wordmark />
              <p>
                © {new Date().getFullYear()} Hacker Fab Toronto. Built at the University of Toronto.
              </p>
            </div>
          </footer>
        </div>
      </main>
    </>
  )
}
