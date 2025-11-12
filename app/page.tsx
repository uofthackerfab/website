import Link from "next/link"
import { GradientBackground } from "@/components/gradient-background"
import { Instrument_Serif } from "next/font/google"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

export default function Page() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GradientBackground />
      <div className="absolute inset-0 -z-10 bg-black/20" />

      <header className="absolute top-0 left-0 right-0 z-20 px-6 py-8 flex items-center justify-center">
        <nav>
          <ul className={`flex gap-10 text-white text-sm uppercase tracking-[0.35em] ${instrumentSerif.className}`}>
            <li>
              <Link className="hover:text-white/70 transition-colors" href="/projects">
                projects
              </Link>
            </li>
            <li>
              <Link className="hover:text-white/70 transition-colors" href="/about">
                about
              </Link>
            </li>
            <li>
              <Link className="hover:text-white/70 transition-colors" href="/join">
                join
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <section className="px-6">
        <h1
          className={`${instrumentSerif.className} text-white text-center text-balance font-normal tracking-tight text-7xl`}
        >
          Toronto Hackerfab 
        </h1>
        <h2
          className={`${instrumentSerif.className} hero-subtitle mt-10 text-center text-base sm:text-lg tracking-[0.3em] italic`}
        >
          uoft&rsquo;s hardware hacking collective | building with silicon
        </h2>
      </section>
    </main>
  )
}
