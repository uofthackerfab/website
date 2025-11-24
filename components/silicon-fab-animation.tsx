"use client"

import { useEffect, useRef } from "react"
import { EB_Garamond } from "next/font/google"

const ebGaramond = EB_Garamond({
    subsets: ["latin"],
    weight: ["400", "500"],
    display: "swap",
})

export function SiliconFabAnimation() {
    const containerRef = useRef<HTMLDivElement>(null)

    // Refs for animation layers
    const layerBaseRef = useRef<SVGGElement>(null)
    const layerSubRef = useRef<SVGGElement>(null)
    const layerDieRef = useRef<SVGGElement>(null)
    const layerRingRef = useRef<SVGGElement>(null)
    const layerLidRef = useRef<SVGGElement>(null)
    const shadowRef = useRef<SVGGElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return

            // Calculate scroll progress based on the container's position relative to the viewport
            // We want the animation to play as the user scrolls through the container
            // The container should be tall (e.g., 300vh) to allow for scrolling

            // For a global scroll effect (as per snippet), we can just use window.scrollY
            // relative to the document height.
            // However, to be more component-friendly, let's assume this component
            // controls the height of its parent or is placed in a tall container.

            // Let's stick to the snippet's logic: window scroll relative to body height.
            const scrollTop = window.scrollY
            const docHeight = document.body.scrollHeight - window.innerHeight
            let p = scrollTop / docHeight

            // Clamp between 0 and 1
            p = Math.min(Math.max(p, 0), 1)

            // Update transforms directly for performance
            const EXPANSION = {
                base: 80,
                sub: 40,
                die: -10,
                ring: -70,
                lid: -140,
            }

            if (layerBaseRef.current) layerBaseRef.current.style.transform = `translateY(${p * EXPANSION.base}px)`
            if (layerSubRef.current) layerSubRef.current.style.transform = `translateY(${p * EXPANSION.sub}px)`
            if (layerDieRef.current) layerDieRef.current.style.transform = `translateY(${p * EXPANSION.die}px)`
            if (layerRingRef.current) layerRingRef.current.style.transform = `translateY(${p * EXPANSION.ring}px)`
            if (layerLidRef.current) layerLidRef.current.style.transform = `translateY(${p * EXPANSION.lid}px)`

            if (shadowRef.current) {
                const shadowOpacity = 0.4 - p * 0.3
                const shadowScale = 0.95 + p * 0.2
                const shadowBlur = 8 + p * 12
                shadowRef.current.style.opacity = shadowOpacity.toString()
                shadowRef.current.style.transform = `scale(${shadowScale})`
                shadowRef.current.style.filter = `blur(${shadowBlur}px)`
            }
        }

        window.addEventListener("scroll", handleScroll)
        // Initial call
        handleScroll()

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className={`relative w-full ${ebGaramond.className}`} style={{ height: "300vh" }}>
            <div className="viewport-wrapper fixed top-0 left-0 w-full h-screen flex justify-center items-center overflow-hidden pointer-events-none">
                {/* Atmospheric Background Layers */}
                <div className="glow-1 ambient-glow absolute rounded-full blur-[80px] opacity-40 z-[1] w-[500px] h-[500px] -top-[10%] -right-[10%] bg-[radial-gradient(circle,#cd853f_0%,transparent_70%)] animate-pulse-glow" />
                <div className="glow-2 ambient-glow absolute rounded-full blur-[80px] opacity-40 z-[1] w-[600px] h-[600px] -bottom-[20%] -left-[20%] bg-[radial-gradient(circle,#8b4513_0%,transparent_70%)] animate-pulse-glow delay-[-5s]" />

                <div className="noise-overlay absolute top-0 left-0 w-full h-full pointer-events-none z-[5] opacity-[0.07]"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                />

                <div className="scene-container relative w-[800px] h-[800px] flex justify-center items-center z-10">
                    {/* Technical Grid Background */}
                    <svg className="bg-grid absolute w-full h-full opacity-15 z-[2] animate-rotate-slow" viewBox="0 0 800 800">
                        <circle cx="400" cy="400" r="300" fill="none" stroke="#cd853f" strokeWidth="0.5" />
                        <circle cx="400" cy="400" r="380" fill="none" stroke="#fff" strokeWidth="0.3" strokeDasharray="2 4" />
                        <line x1="400" y1="50" x2="400" y2="750" stroke="#cd853f" strokeWidth="0.3" />
                        <line x1="50" y1="400" x2="750" y2="400" stroke="#cd853f" strokeWidth="0.3" />
                    </svg>

                    {/* Main Chip SVG */}
                    <svg viewBox="-200 -250 400 500" className="w-full h-full overflow-visible z-10">
                        <defs>
                            <pattern
                                id="circuit-pattern"
                                x="0"
                                y="0"
                                width="8"
                                height="8"
                                patternUnits="userSpaceOnUse"
                                patternTransform="rotate(-30)"
                            >
                                <line x1="0" y1="0" x2="0" y2="8" stroke="#cd853f" strokeWidth="0.5" opacity="0.5" />
                                <rect x="2" y="2" width="1" height="1" fill="#cd853f" opacity="0.5" />
                            </pattern>
                        </defs>

                        {/* Shadow */}
                        <g id="shadow-cast" ref={shadowRef} transform="translate(0, 200)" style={{ transformOrigin: "center", willChange: "transform, opacity, filter" }}>
                            <path d="M0,40 L80,10 L0,-20 L-80,10 Z" fill="#cd853f" />
                        </g>

                        {/* GROUP 1: BASE SUBSTRATE */}
                        <g id="layer-base" ref={layerBaseRef} className="anim-group" style={{ willChange: "transform", transition: "transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}>
                            <path className="fill-[#0a0a0a]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M-80,10 L-80,25 L0,55 L0,40 Z" />
                            <path className="fill-[#050505]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M0,40 L0,55 L80,25 L80,10 Z" />
                            <path className="fill-[#111]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M0,-20 L80,10 L0,40 L-80,10 Z" />

                            <g className="stroke-[#cd853f] stroke-[0.8] stroke-linecap-round stroke-linejoin-round">
                                <line x1="-70" y1="18" x2="-70" y2="23" />
                                <line x1="-60" y1="22" x2="-60" y2="27" />
                                <line x1="-50" y1="26" x2="-50" y2="31" />
                                <line x1="-40" y1="30" x2="-40" y2="35" />
                                <line x1="-30" y1="34" x2="-30" y2="39" />
                                <line x1="-20" y1="38" x2="-20" y2="43" />
                                <line x1="-10" y1="42" x2="-10" y2="47" />
                                <line x1="10" y1="42" x2="10" y2="47" />
                                <line x1="20" y1="38" x2="20" y2="43" />
                                <line x1="30" y1="34" x2="30" y2="39" />
                                <line x1="40" y1="30" x2="40" y2="35" />
                                <line x1="50" y1="26" x2="50" y2="31" />
                                <line x1="60" y1="22" x2="60" y2="27" />
                                <line x1="70" y1="18" x2="70" y2="23" />
                            </g>
                        </g>

                        {/* GROUP 2: INTERPOSER */}
                        <g id="layer-sub" ref={layerSubRef} className="anim-group" transform="translate(0, -10)" style={{ willChange: "transform", transition: "transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}>
                            <path className="fill-[#0a0a0a]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M-65,5 L-65,8 L0,32 L0,29 Z" />
                            <path className="fill-[#050505]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M0,29 L0,32 L65,8 L65,5 Z" />
                            <path className="fill-[#111]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M0,-20 L65,5 L0,29 L-65,5 Z" />

                            <g transform="translate(-35, 0)" fill="#3e2723" stroke="#cd853f" strokeWidth="0.5">
                                <path d="M0,0 L5,2 L0,4 L-5,2 Z" />
                            </g>
                            <g transform="translate(35, 0)" fill="#3e2723" stroke="#cd853f" strokeWidth="0.5">
                                <path d="M0,0 L5,2 L0,4 L-5,2 Z" />
                            </g>
                            <path className="stroke-[#cd853f] stroke-[0.8] stroke-linecap-round stroke-linejoin-round" d="M-20,10 L-10,14 L0,10 M20,10 L10,14 L0,10" fill="none" opacity="0.8" />
                        </g>

                        {/* GROUP 3: SILICON DIE */}
                        <g id="layer-die" ref={layerDieRef} className="anim-group" transform="translate(0, -25)" style={{ willChange: "transform", transition: "transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}>
                            <path className="fill-[#0a0a0a]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M-30,0 L-30,3 L0,14 L0,11 Z" />
                            <path className="fill-[#050505]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M0,11 L0,14 L30,3 L30,0 Z" />
                            <path className="fill-[#1a1a1a]/95 stroke-[#cd853f] stroke-[0.8] stroke-linecap-round stroke-linejoin-round" d="M0,-11 L30,0 L0,11 L-30,0 Z" />
                            <path fill="url(#circuit-pattern)" d="M0,-11 L30,0 L0,11 L-30,0 Z" />
                            <g transform="translate(-45, 8)">
                                <path className="fill-[#0a0a0a]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M-8,0 L-8,2 L0,5 L0,3 Z" />
                                <path className="fill-[#050505]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M0,3 L0,5 L8,2 L8,0 Z" />
                                <path className="fill-[#111]/90 stroke-[#cd853f] stroke-[0.8] stroke-linecap-round stroke-linejoin-round" d="M0,-3 L8,0 L0,3 L-8,0 Z" />
                            </g>
                            <g transform="translate(45, 8)">
                                <path className="fill-[#0a0a0a]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M-8,0 L-8,2 L0,5 L0,3 Z" />
                                <path className="fill-[#050505]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M0,3 L0,5 L8,2 L8,0 Z" />
                                <path className="fill-[#111]/90 stroke-[#cd853f] stroke-[0.8] stroke-linecap-round stroke-linejoin-round" d="M0,-3 L8,0 L0,3 L-8,0 Z" />
                            </g>
                        </g>

                        {/* GROUP 4: RETENTION FRAME */}
                        <g id="layer-ring" ref={layerRingRef} className="anim-group" transform="translate(0, -40)" style={{ willChange: "transform", transition: "transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}>
                            <path className="fill-[#0a0a0a]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M-70,5 L-70,8 L0,35 L0,32 Z" />
                            <path className="fill-[#050505]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M0,32 L0,35 L70,8 L70,5 Z" />
                            <path className="fill-[#111]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" fillRule="evenodd" d="M0,-22 L70,5 L0,32 L-70,5 Z M0,-12 L45,5 L0,22 L-45,5 Z" />
                            <circle cx="-60" cy="5" r="1.5" fill="#cd853f" transform="scale(1 0.5) rotate(30)" />
                            <circle cx="60" cy="5" r="1.5" fill="#cd853f" transform="scale(1 0.5) rotate(-30)" />
                        </g>

                        {/* GROUP 5: HEAT SPREADER */}
                        <g id="layer-lid" ref={layerLidRef} className="anim-group" transform="translate(0, -55)" style={{ willChange: "transform", transition: "transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}>
                            <path className="fill-[#0a0a0a]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M-70,5 L-70,12 L0,39 L0,32 Z" />
                            <path className="fill-[#050505]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M0,32 L0,39 L70,12 L70,5 Z" />
                            <path className="fill-[#111]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M0,-22 L70,5 L0,32 L-70,5 Z" />
                            <g transform="translate(0, -2)">
                                <path className="fill-[#0a0a0a]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M-20,0 L-20,3 L0,11 L0,8 Z" />
                                <path className="fill-[#050505]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M0,8 L0,11 L20,3 L20,0 Z" />
                                <path className="fill-[#111]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M0,-8 L20,0 L0,8 L-20,0 Z" />
                                <line x1="-12" y1="0" x2="12" y2="0" stroke="#cd853f" strokeWidth="0.5" opacity="0.8" />
                            </g>
                        </g>
                    </svg>
                </div>

                <div className="scroll-hint absolute bottom-10 left-1/2 -translate-x-1/2 text-center opacity-60 z-20 pointer-events-none">
                    <div className="scroll-line w-px h-10 bg-gradient-to-b from-[#cd853f] to-transparent mx-auto mb-2.5" />
                    <p className="text-xs tracking-widest uppercase text-[#e5e5e5]"></p>
                </div>
            </div>

            <style jsx global>{`
        @keyframes pulse-glow {
          0% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(1.1); opacity: 0.5; }
        }
        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 10s ease-in-out infinite alternate;
        }
        .animate-rotate-slow {
          animation: rotate-slow 120s linear infinite;
        }
      `}</style>
        </div>
    )
}
