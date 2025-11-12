"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Linkedin } from "lucide-react"
import { Instrument_Serif } from "next/font/google"
import { GradientBackground } from "@/components/gradient-background"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

const stats = [
  { label: "members", value: "42" },
  { label: "labs unlocked", value: "6" },
  { label: "active builds", value: "9" },
]

const teamProfiles = [
  {
    name: "Kenny Guo",
    role: "Operations",
    focus: "",
    photo: "/1750374255916.jpeg",
    linkedin: "https://www.linkedin.com/in/kennyguo",
    x: "https://x.com/kennykgguo",
  },
  {
    name: "Krish Chhajer",
    role: "Technical",
    focus: "",
    photo: "/1746147185644.jpeg",
    linkedin: "https://www.linkedin.com/in/krish-chhajer/",
    x: "https://x.com/krishchhajer",
  },
  {
    name: "Luthira Abeykoon",
    role: "Product",
    focus: "",
    photo: "/1755988168159.jpeg",
    linkedin: "https://www.linkedin.com/in/luthiraa/",
    x: "https://x.com/luthiraabeykoon",
  },
]
function XLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M18.9 3.1h-3l-3.3 4.7L9 3.1H5.2l5.1 7.1L4.8 20h3l3.7-5.2 3.7 5.2h3.2l-5.5-7.6 5-7.3Z"
      />
    </svg>
  )
}



export default function AboutPage() {
  const [teamOpen, setTeamOpen] = useState(false)

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <GradientBackground />
      <div className="absolute inset-0 -z-10 bg-black/60 mix-blend-soft-light" />

      <div
        className={`relative z-10 max-w-2xl mx-auto px-6 py-16 md:py-24 space-y-14 transition duration-300 ${
          teamOpen ? "scale-[0.99] blur-[2px] opacity-80" : ""
        }`}
      >
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-white/60 hover:text-white transition"
          >
            <span aria-hidden="true">←</span> back
          </Link>
        </div>
        <header className="space-y-4 text-left">
          <p className="text-xs uppercase tracking-[0.5em] text-white/60">about</p>
          <h1 className={`${instrumentSerif.className} text-3xl sm:text-4xl font-normal tracking-tight`}>
            a fabrication playground inside uoft
          </h1>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            Hackerfab is a collective of students who obsess over silicon, packaging, RF,
            and the weird tooling that makes it all happen. We bridge the gap between course labs and full-stack
            hardware companies by giving members a place to ship hardware with intention.
          </p>
        </header>

        <section className="space-y-5">
          <h2 className={`${instrumentSerif.className} text-2xl font-normal tracking-tight`}>what we believe</h2>
          <p className="text-sm text-white/80 leading-relaxed">
            Access to fabrication gear and mentorship should not hinge on co-ops or NDAs. We pair small cohort-based labs
            with open build weeks so every member can learn lithography, process, assembly, and validation on real
            hardware. We keep a low ego, high curiosity space.
          </p>
          <p className="text-sm text-white/80 leading-relaxed">
            Every build is documented internally and demoed publicly.
          </p>
        </section>

        <section className="space-y-8">
          {/* <div className="grid grid-cols-3 gap-6 text-left">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className={`${instrumentSerif.className} text-2xl`}>{stat.value}</p>
                <p className="text-xs uppercase tracking-[0.4em] text-white/60">{stat.label}</p>
              </div>
            ))}
          </div> */}
          {/* <div className="space-y-4 text-sm text-white/75 leading-relaxed">
            <p>Weekly design reviews happen every Wednesday night in BA1230.</p>
            <p>Deep-dive lab access rotates between ECEB cleanrooms and partner shops downtown.</p>
            <p>Mentor office hours happen bi-weekly, remote friendly.</p>
          </div> */}
        </section>

        <section className="space-y-4 text-sm text-white/75 leading-relaxed">
          <p>
            If you are building something ambitious and need a place to run wafers, test RF chains, or just think with
            other people who love hardware, reach out. We host open salons, record every demo, and keep the archives
            available for members.
          </p>
          <button
            type="button"
            onClick={() => setTeamOpen(true)}
            className="inline-flex border-b border-white/50 px-2 pb-1 text-xs uppercase tracking-[0.4em] hover:text-white transition-colors"
          >
            meet the team
          </button>
        </section>
      </div>

      {teamOpen && (
        <div className="team-overlay fixed inset-0 z-30 flex">
          <div
            className="team-overlay__backdrop absolute inset-0 bg-black/75 backdrop-blur-3xl"
            onClick={() => setTeamOpen(false)}
          />
          <div className="team-overlay__panel relative z-10 flex h-full w-full flex-col items-center bg-black/30 px-6 py-12 text-white backdrop-blur-2xl md:px-12">
            <button
              type="button"
              onClick={() => setTeamOpen(false)}
              className="absolute right-6 top-6 text-xs uppercase tracking-[0.3em] text-white/60 transition hover:text-white md:right-10 md:top-8"
            >
              close
            </button>
            <div className="flex h-full w-full items-center justify-center">
              <div className="w-full max-w-5xl space-y-12">
                <div className="space-y-3 text-center md:text-left">
                  <p className="text-xs uppercase tracking-[0.5em] text-white/45">team</p>
                  <h2 className={`${instrumentSerif.className} text-4xl font-normal`}>People behind the builds</h2>
                  <p className="text-sm text-white/75">
                    Reach out anytime during build weeks — they keep the lab calm, weird, and shipping.
                  </p>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                  {teamProfiles.map((profile) => (
                    <div key={profile.name} className="flex flex-col items-center gap-4 text-center">
                      <div className="relative h-24 w-24 overflow-hidden rounded-full border border-white/20">
                        <Image
                          src={profile.photo}
                          alt={`${profile.name} portrait`}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <p className={`${instrumentSerif.className} text-2xl`}>{profile.name}</p>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/55">{profile.role}</p>
                      </div>
                      <p className="text-sm text-white/75">{profile.focus}</p>
                      <div className="flex items-center gap-4 pt-1 text-white/70">
                        <a
                          href={profile.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="transition hover:text-white"
                          aria-label={`${profile.name} on LinkedIn`}
                        >
                          <Linkedin className="h-4 w-4" strokeWidth={1.5} />
                        </a>
                        <a
                          href={profile.x}
                          target="_blank"
                          rel="noreferrer"
                          className="transition hover:text-white"
                          aria-label={`${profile.name} on X`}
                        >
                          <XLogo className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
