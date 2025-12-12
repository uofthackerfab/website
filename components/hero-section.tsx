"use client"

import { useEffect, useRef } from "react"
import { Instrument_Serif } from "next/font/google"

const instrumentSerif = Instrument_Serif({
    subsets: ["latin"],
    weight: ["400"],
    display: "swap",
})

export function HeroSection() {
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return
            const scrollY = window.scrollY
            const maxScroll = window.innerHeight * 0.5 // Fade out by 50vh

            // Calculate opacity: 1 at top, 0 at maxScroll
            const opacity = Math.max(0, 1 - scrollY / maxScroll)

            // Calculate blur: 0 at top, 20px at maxScroll (intense blur as it passes 'camera')
            const blur = (scrollY / maxScroll) * 20

            // Calculate scale: 1 at top, massive expansion at maxScroll ("zoom all the way")
            // Using cubic power for that "accelerating into the screen" feel
            const progress = Math.min(1, scrollY / maxScroll)
            const scale = 1 + (Math.pow(progress, 3) * 80)

            ref.current.style.opacity = opacity.toString()
            ref.current.style.filter = `blur(${blur}px)`
            ref.current.style.transform = `scale(${scale})`
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <section
            ref={ref}
            className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center z-40 pointer-events-none transition-transform duration-75 ease-out will-change-transform"
        >
            <h1
                className={`${instrumentSerif.className} text-white text-center text-balance font-normal tracking-tight text-7xl`}
            >
                Hacker Fab | Toronto
            </h1>
            <h2
                className={`${instrumentSerif.className} hero-subtitle mt-10 text-center text-base sm:text-lg tracking-[0.3em] italic text-white/80`}
            >
                imagination is limitless | silicon from scratch
            </h2>
        </section>
    )
}
