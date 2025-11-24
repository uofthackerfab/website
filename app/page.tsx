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
              <Link className="hover:text-white/70 transition-colors" href="/join">
                join
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Content - Fixed overlay so it stays in place (or scrolls away if desired, but user said 'stay inplace') 
          If user wants the PAGE to stay in place, maybe they mean the content too?
          Let's make the Hero content fixed for now, so it overlays the animation.
          But if it's fixed, it will never go away.
          Usually "animate when you scroll" implies the animation happens.
          Let's make the Hero content absolute at the top, so it scrolls away as you scroll down, revealing the chip?
          OR, if the user wants "stick to the middle", they mean the CHIP.
          I've made the CHIP fixed.
          The Hero content should probably scroll away to let the user see the chip clearly.
          Let's keep Hero absolute top-0.
      */}
      {/* Hero Content - Animated */}
      <HeroSection />
    </main>
  )
}
