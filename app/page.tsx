import Image from "next/image"
import Link from "next/link"
import { GradientBackground } from "@/components/gradient-background"
import { HeroScene } from "@/components/hero-scene"
import { ShopifyLogo } from "@/components/shopify-logo"
import { SiteFooter, SiteHeader } from "@/components/site-chrome"

const projects: { name: string; status: string; detail: string; post?: string }[] = [
  {
    name: "Tube furnace",
    status: "Working",
    post: "/blog/tube-furnace",
    detail: "Grows silicon dioxide on the wafer for insulation, masking, or a gate oxide.",
  },
  {
    name: "Spin coater",
    status: "Working",
    post: "/blog/spin-coater",
    detail: "Spins the wafer at high speed to spread photoresist into a thin, even film.",
  },
  {
    name: "Magnetron sputtering",
    status: "In progress",
    detail: "Deposits thin metal films that become contacts, interconnects, and electrodes.",
  },
  {
    name: "Lithography stepper",
    status: "Planned",
    detail: "Projects a mask pattern onto the photoresist to define where material stays.",
  },
]

const team = [
  { name: "Kenny Guo", link: "https://www.linkedin.com/in/kennyguo" },
  { name: "Krish Chhajer", link: "https://www.linkedin.com/in/krish-chhajer/" },
  { name: "Luthira Abeykoon", link: "https://www.linkedin.com/in/luthiraa/" },
  { name: "William Xu", link: "https://www.linkedin.com/in/william-xu-willy/" },
  { name: "Adit Bhargava", link: "https://www.linkedin.com/in/adit-bhargava/" },
]

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <div className="shell grid-12">
        <div className="span-4">
          <h2 id={`${id}-title`} className="t-title">
            {title}
          </h2>
        </div>
        <div className="span-8 space-y-6">{children}</div>
      </div>
    </section>
  )
}

export default function Page() {
  return (
    <>
      <GradientBackground />

      <SiteHeader />

      <main id="top" className="relative">
        <HeroScene>
          <div className="shell">
            <div className="max-w-[44rem]">
              <h1 className="t-display">Hacker Fab</h1>
              <p className="t-lede mt-6">
                A student-run project at the University of Toronto building an open hardware stack
                and software toolchain for making chips.
              </p>
            </div>
          </div>
        </HeroScene>

        <div className="content">
          <Section id="goal" title="Our goal">
            <p className="t-body text-primary">
              Make the knowledge, process, and tooling behind chip fabrication legible,
              reproducible, and buildable by far more people.
            </p>
            <p className="t-body">
              We are not building a rival fab or competing with TSMC. We want to learn the
              closed-source procedures, then reinvent each step through experiments and ablations
              until we can make good devices reproducibly.
            </p>
          </Section>

          <Section id="why" title="Why it matters">
            <p className="t-body">
              We are building a fast, transparent, modular prototyping stack for simple designs at
              larger nodes, where iteration speed and low cost matter more than density. Think
              sensor interfaces, mixed-signal test chips, neurotech, and AI accelerator prototypes.
            </p>
            <p className="t-heading-20 text-primary">Design → Fabricate → Measure → Debug → Repeat</p>
            <p className="t-body">
              We want that loop to be as fast as possible. An FPGA can validate logic, but not how
              real silicon behaves across process, layout, and device effects. A quick, cheap
              tapeout can.
            </p>
          </Section>

          <Section id="projects" title="Projects">
            <p className="t-body">
              A basic chip process needs tools to grow, deposit, coat, and pattern material. We are
              building each one, starting hacky and making it robust and safe.
            </p>
            <dl className="divide-y divide-[color:var(--border-subtle)] border-y border-[color:var(--border-subtle)]">
              {projects.map((p) => (
                <div key={p.name} className="py-5 grid sm:grid-cols-[16rem_1fr_auto] gap-x-6 gap-y-1">
                  <dt className="t-heading-16 text-primary">{p.name}</dt>
                  <dd className="t-body">
                    {p.detail}
                    {p.post && (
                      <>
                        {" "}
                        <Link className="nav-link text-primary" href={p.post}>
                          Read the build log.
                        </Link>
                      </>
                    )}
                  </dd>
                  <dd className="t-caption sm:text-right whitespace-nowrap">{p.status}</dd>
                </div>
              ))}
            </dl>
            <p className="t-body">
              Alongside the tools, we are writing a process proposal built around one question:
              when a multi-step process goes wrong, how do we find and fix the problem? Every
              experiment gets documented.
            </p>
            <p className="t-body">
              Side projects: an optical processing unit, and NV-diamond quantum sensing.
            </p>
          </Section>

          <Section id="team" title="Team">
            <ul className="t-body space-y-1">
              {team.map((m) => (
                <li key={m.name}>
                  <a className="nav-link" href={m.link} target="_blank" rel="noopener noreferrer">
                    {m.name}
                  </a>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="support" title="Supported by">
            <p className="t-body">
              Hacker Fab is funded by grants from Shopify and Emergent Ventures. Thank you.
            </p>
            <ul className="flex flex-wrap items-center gap-x-12 gap-y-6 text-primary">
              <li>
                <ShopifyLogo className="h-8 w-auto" />
              </li>
              <li>
                <Image
                  src="/ev.png"
                  alt="Emergent Ventures"
                  width={400}
                  height={192}
                  className="h-11 w-auto"
                />
              </li>
            </ul>
          </Section>

          <SiteFooter />
        </div>
      </main>
    </>
  )
}
