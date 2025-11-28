"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Instrument_Serif } from "next/font/google"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

type ProjectDetail = {
  title: string
  status: string
  summary: string
  sections: {
    heading: string
    body: string
  }[]
  image?: {
    src: string
    alt: string
    className?: string
  }
}

const highlightProjects = [
  {
    slug: "tube-furnace",
    title: "tube furnace",
    description: "High-temperature furnace for semiconductor processing and material synthesis.",
    status: "Lab-Ready",
    tags: ["furnace", "pid", "process"],
  },
  {
    slug: "spin-coater",
    title: "spin coater",
    description: "Device for uniform thin film deposition via high-speed spinning.",
    status: "active-build",
    tags: ["electronics", "thin film", "deposition"],
  },
  {
    slug: "lithography-stepper",
    title: "lithography stepper",
    description: "Precision optical system for photolithography pattern transfer.",
    status: "researching",
    tags: ["photolithography", "optics", "stepper"],
  },
]

const projectDetails: Record<string, ProjectDetail> = {
  "tube-furnace": {
    title: "tube furnace",
    status: "lab-ready",
    image: {
      src: "/furnace.gif",
      alt: "Tube furnace under power",
      className: "object-cover",
    },
    summary:
      "A 48\" quartz tube furnace tuned for slow drift and reliable dwell control. The build mixes off-the-shelf controls with custom thermal monitoring so we can run diffusion, annealing, or weird material experiments without renting time elsewhere.",
    sections: [
      {
        heading: "process window",
        body: "Dual-zone heaters and a custom Kanthal coil give us a stable 1100 C ceiling. The rig runs a cascaded PID stack reading four thermocouples so we can hold +/- 2 C even when swapping in different liners or gas mixes.",
      },
      {
        heading: "safety + enclosure",
        body: "Interlocked doors, positive-pressure purge, and an inline scrubber keep the chemistry boring. The control cart is on lockable casters so we can roll the furnace next to whichever hood is free.",
      },
      {
        heading: "what's next",
        body: "We are validating thermal recipes for dopant drive-in and oxide growth before opening the queue. After that, we will publish quick-start notes for anyone wanting to process their own wafers.",
      },
    ],
  },
  "spin-coater": {
    title: "spin coater",
    status: "active-build",
    image: {
      src: "/spincoater.jpg",
      alt: "Spin coater chassis",
      className: "object-cover",
    },
    summary:
      "You'd probably think a spin coater is something you can knock out in one sitting. At first glance it's basically a PC fan spinning really fast, so how hard could it be?\n\nThat's exactly what we thought. We gave ourselves one week to build the whole thing.",
    sections: [
      {
        heading: "intro",
        body: "Once we actually started putting it together, it got real pretty fast. We started from BirdBrain's DIY spin coater design (one of the cheapest and simplest builds out there).\n\nThere's nothing wrong with his design, it works. The problem for us was the circuit and control. Once we got into the wiring, drivers, and power setup, we realized we were overcomplicating something that could be done way simpler for what we needed.\n\nSo we pivoted to a setup that gave us finer control, better repeatability, and less headache.\n\nWe switched to an Arduino-based setup with PWM control, two potentiometers (coarse and fine), and a small LCD for speed and job duration. The coarse pot sets the rough RPM range, the fine pot lets you dial in the last few percent, and the keypad is used to start/stop runs and choose presets.\n\nThe LCD shows target speed, current speed, and remaining time. That combo gave us way better repeatability and precision, which you actually need once you care about spin profiles instead of just 'fast' and 'faster'.",
      },
      {
        heading: "specifications",
        body: "Spin speed: ~600–3000 rpm (Arctic P8 Max @ 12 V under load)\n\nSpeed control: Dual potentiometer (coarse: full range, fine: ±5% trim), PWM output from Arduino at 490 Hz\n\nSpeed resolution: ~30–60 rpm per fine-adjust step (based on the PWM-to-RPM mapping we measured)\n\nJob duration: 1–300 s, adjustable in 1 s increments\n\nSubstrate size: Up to 50 mm diameter (tested with 1×1 inch glass slides and 2 inch wafers)\n\nPower: 12 V DC input, ~0.12–0.20 A at steady 3000 rpm (≈2.4 W)\n\nController: Arduino Uno + I2C 1602 LCD + 4×4 membrane keypad\n\nSafety: Automatic spin-down on timeout, capped duty cycle at 85% to avoid overshoot, optional printed lid to contain splatter",
      },
      {
        heading: "bill of materials",
        body: "Controller / UI:\nArduino Uno, I2C 1602 LCD, 4×4 membrane keypad, 2× 10 kΩ potentiometers (speed + time / coarse + fine)\n\nDrive:\nArctic P8 Max 12 V PC fan (or any 12 V brushless PC fan with similar RPM), Motor driver (logic-level MOSFET or driver module), 2N2222 transistor (for keypad / LCD backlight control if needed)\n\nPower:\n12 V DC supply (at least 0.5 A recommended)\n\nMisc:\nBreadboard or perfboard, wires, solder, 3D printed housing and chuck",
      },
      {
        heading: "fan preparation",
        body: "The fan we used for this build is the Arctic P8 Max. It can hit around 3000 rpm and supports 5 to 12 volts, which makes it solid for a spin coater.\n\nTo get access to the motor, we had to take it apart, but this fan isn't like the usual ones where you just peel back the sticker. The teardown is a bit more involved, and you need to be careful. The first time we tried it, we accidentally tore the ground connection right off the 4-pin header.\n\nThe way we do it now:\n\nHold the fan with the sticker side facing away from you and the open side toward you. Put both thumbs on the fan hub (or the blades near the hub) and push with even pressure. Support the frame so you are not flexing the PCB or yanking on the wires.\n\nIf you line it up properly, the hub pops out cleanly without ripping the 4-pin header.\n\nAfter that, pull off the fan blades and lightly sand the round motor cap. This is the surface that will actually spin and that you will mount your printed adapter onto, so you want it flat and clean.\n\nThis next part is optional, but if you do not have M3s longer than 50 mm, mounting everything gets annoying fast. The easier workaround is to trim the fan housing. Cut the outer frame roughly in half so only the motor housing and center supports are left.\n\nThat gives you a much lower profile, which makes it easier to bolt the fan down and keep it rigid without extra-long screws.",
      },
      {
        heading: "housing assembly",
        body: "Pretty self explanatory, refer to the printable for the full spec (BirdBrain's design):\n\nhttps://www.printables.com/model/658943-diy-spin-coater/files",
      },
      {
        heading: "circuitry",
        body: "The high level control loop is:\n\nPots → Arduino analog inputs (read speed / time setpoints)\n\nKeypad → Arduino digital inputs (start/stop, preset select)\n\nArduino → PWM output pin → motor driver / MOSFET → 12 V fan\n\nFan tach wire (optional) → Arduino interrupt pin for RPM feedback\n\nArduino → I2C → LCD for UI",
      },
      {
        heading: "what's next",
        body: "We are currently validating spin profiles for photoresist and testing repeatability across different substrate sizes.\n\nOnce we have consistent results, we'll publish the full Arduino code and wiring diagrams for anyone wanting to build their own.",
      },
    ],
  },
}

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null)
  const [overlayVisible, setOverlayVisible] = useState(false)

  const openProject = useCallback((slug: string) => {
    const detail = projectDetails[slug]
    if (detail) {
      setActiveProject(detail)
      requestAnimationFrame(() => setOverlayVisible(true))
    }
  }, [])

  const closeProject = useCallback(() => {
    setOverlayVisible(false)
  }, [])

  useEffect(() => {
    if (!overlayVisible && activeProject) {
      const timeout = setTimeout(() => setActiveProject(null), 320)
      return () => clearTimeout(timeout)
    }
    return
  }, [overlayVisible, activeProject])

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
          {highlightProjects.map((project) => {
            const detail = projectDetails[project.slug]
            const isInteractive = Boolean(detail)

            return (
              <article
                key={project.title}
                role={isInteractive ? "button" : undefined}
                tabIndex={isInteractive ? 0 : undefined}
                onClick={() => isInteractive && openProject(project.slug)}
                onKeyDown={(event) => {
                  if (!isInteractive) return
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault()
                    openProject(project.slug)
                  }
                }}
                className={`group relative flex flex-col gap-3 border-l border-white/30 pl-6 transition-all duration-300 ease-out ${isInteractive
                  ? "cursor-pointer hover:-translate-y-1 hover:border-white/70 hover:bg-white/5 hover:shadow-[0_15px_45px_rgba(0,0,0,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  : ""
                  }`}
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
                {isInteractive && (
                  <p className="text-[11px] uppercase tracking-[0.45em] text-white/40 transition-colors duration-300 group-hover:text-white/70">
                    open overlay
                  </p>
                )}
              </article>
            )
          })}
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

      {activeProject && (
        <div className="project-overlay fixed inset-0 z-30">
          <div
            className={`absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_55%)] bg-black/85 backdrop-blur-[90px] transition-opacity duration-500 ${overlayVisible ? "opacity-100" : "opacity-0"
              }`}
            onClick={closeProject}
          />
          <div
            className={`relative z-10 flex h-full w-full transform-gpu flex-col px-6 py-12 text-white transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] sm:px-10 ${overlayVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
          >
            <button
              type="button"
              onClick={closeProject}
              className="self-end text-xs uppercase tracking-[0.3em] text-white/60 transition hover:text-white"
            >
              close
            </button>
            <div className="relative z-10 mx-auto mt-6 flex w-full max-w-5xl flex-1 flex-col gap-10 overflow-hidden md:flex-row md:gap-12">
              <div className="flex max-h-full flex-1 flex-col gap-6 overflow-y-auto pr-2 text-sm leading-relaxed text-white/80">
                <p className="text-xs uppercase tracking-[0.5em] text-white/50">{activeProject.status}</p>
                <h2 className={`${instrumentSerif.className} text-4xl font-normal tracking-tight text-white`}>
                  {activeProject.title}
                </h2>
                <div className="space-y-4">
                  {activeProject.summary.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
                {activeProject.sections.map((section) => (
                  <div key={section.heading} className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.45em] text-white/45">{section.heading}</p>
                    <div className="space-y-4">
                      {section.body.split('\n\n').map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative w-full max-w-md flex-shrink-0">
                <div className="sticky top-10">
                  <p className="text-xs uppercase tracking-[0.45em] text-white/45">build image</p>
                  <figure className="mt-4 aspect-[3/4] overflow-hidden border border-white/15 bg-white/5 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
                    <div className="relative h-full w-full">
                      {(() => {
                        const defaultImage = {
                          src: "/window.svg",
                          alt: `${activeProject.title} placeholder render`,
                          className: "object-contain p-10 opacity-90 mix-blend-screen",
                          caption: "placeholder",
                        }
                        const imageData = activeProject.image
                          ? { ...activeProject.image, caption: activeProject.image.alt }
                          : defaultImage

                        return (
                          <>
                            <Image
                              src={imageData.src}
                              alt={imageData.alt}
                              fill
                              sizes="(min-width: 768px) 320px, 80vw"
                              className={imageData.className ?? defaultImage.className}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40" />
                            <figcaption className="absolute left-6 bottom-6 text-[11px] uppercase tracking-[0.45em] text-white/70">
                              {imageData.caption}
                            </figcaption>
                          </>
                        )
                      })()}
                    </div>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
