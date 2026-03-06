import Link from "next/link"
import { GradientBackground } from "@/components/gradient-background"
import ChipExplosion from "@/components/chip-explosion"
import { HeroSection } from "@/components/hero-section"
import { Instrument_Serif } from "next/font/google"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

export default function Page() {
  return (
    <main className="relative min-h-screen">
      {/* Background Gradient */}
      <GradientBackground />

      {/* The Scroll Animation Component - acts as the background and provides scroll height */}
      <ChipExplosion />

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-8 flex items-center justify-center">
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
              <a className="hover:text-white/70 transition-colors" href="https://form.typeform.com/to/WDKMFCuC" target="_blank" rel="noopener noreferrer">
                join
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Content - Animated */}
      <HeroSection />
    </main>
  )
}
