"use client"

import React, { useEffect, useRef } from "react"

/*
  Hero scene.

  A 200vh section with a sticky viewport inside it. As the reader scrolls
  through the section, the packaged chip pulls apart layer by layer and the
  die heats up: the wafer under the die goes from cold silicon to ember, the
  way a wafer glows inside a tube furnace during oxidation. Two process
  callouts draw in beside the die. The hero copy fades and recedes over the
  first part of the scroll.
*/

const EXPANSION = { base: 80, sub: 40, die: -10, ring: -60, lid: -120 }

const structure =
  "fill-[#0a0a0a]/95 stroke-[#d4d4d4] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke"
const structureDark =
  "fill-[#050505]/95 stroke-[#d4d4d4] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke"
const structureTop =
  "fill-[#121212]/95 stroke-[#d4d4d4] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke"

export function HeroScene({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const layers = useRef<Record<string, SVGElement | null>>({})

  const setRef = (key: string) => (el: SVGElement | null) => {
    layers.current[key] = el
  }

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual"

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let ticking = false

    // Reduced motion: no scroll travel. Show the scene mid-explosion, warm,
    // with the copy fully visible, in a single-viewport hero.
    if (reduceMotion && sectionRef.current) {
      sectionRef.current.style.height = "100vh"
    }

    const apply = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const travel = section.offsetHeight - window.innerHeight
      const raw = travel > 0 ? -rect.top / travel : 0
      const p = reduceMotion ? 0.55 : Math.min(1, Math.max(0, raw))
      const L = layers.current

      // Entrance: chip scales up and settles in the first 15% of travel.
      const entrance = Math.min(p / 0.15, 1)
      const ease = 1 - Math.pow(1 - entrance, 4)

      if (svgRef.current) {
        svgRef.current.style.opacity = (0.7 + 0.3 * ease).toString()
        const scale = 0.84 + 0.16 * ease
        const rotate = (1 - ease) * -6
        svgRef.current.style.transform = `scale(${scale}) rotate(${rotate}deg)`
      }

      // At rest the chip sits beside the copy (right on wide screens, above
      // it on narrow ones) and travels to centre as the reader scrolls.
      const wide = window.innerWidth >= 900
      if (stageRef.current) {
        const shiftX = wide ? window.innerWidth * 0.24 : 0
        const shiftY = wide ? -window.innerHeight * 0.02 : -window.innerHeight * 0.22
        // With reduced motion the chip stays beside the copy.
        const k = reduceMotion ? 1 : 1 - ease
        stageRef.current.style.transform = `translate(${shiftX * k}px, ${shiftY * k}px)`
      }

      // Explosion.
      const set = (k: keyof typeof EXPANSION) => {
        const el = L[k]
        if (el) el.style.transform = `translateY(${p * EXPANSION[k]}px)`
      }
      set("base")
      set("sub")
      set("die")
      set("ring")
      set("lid")

      // Heat: ramps from 0.2 -> 1 across the scroll, peaks near the end.
      const heat = Math.pow(p, 1.4)
      if (L.heatGlow) L.heatGlow.style.opacity = (0.08 + heat * 0.85).toString()
      if (L.heatCore) L.heatCore.style.opacity = (heat * 0.9).toString()
      if (L.dieFace) {
        // Die face warms from dark grey to ember-tinted.
        L.dieFace.style.fill = heat > 0.5 ? `rgba(255,106,26,${0.08 + (heat - 0.5) * 0.4})` : "rgba(26,26,26,0.95)"
      }
      if (L.pool) {
        L.pool.style.opacity = (0.35 + heat * 0.45).toString()
        L.pool.style.transform = `translate(0px, 200px) scale(${0.95 + p * 0.25})`
      }

      // Callouts draw in once the copy has cleared. They need horizontal
      // room, so narrow viewports and the static reduced-motion hero skip them.
      const drawP = wide && !reduceMotion ? Math.min(1, Math.max(0, (p - 0.4) / 0.3)) : 0
      const drawEase = 1 - Math.pow(1 - drawP, 3)
      const len = 320
      if (L.leftPath) L.leftPath.style.strokeDashoffset = (len * (1 - drawEase)).toString()
      if (L.rightPath) L.rightPath.style.strokeDashoffset = (len * (1 - drawEase)).toString()
      if (L.leftText) {
        L.leftText.style.opacity = drawEase.toString()
        L.leftText.style.transform = `translate(${-16 * (1 - drawEase)}px, 0px)`
      }
      if (L.rightText) {
        L.rightText.style.opacity = drawEase.toString()
        L.rightText.style.transform = `translate(${16 * (1 - drawEase)}px, 0px)`
      }

      // Hero copy recedes over the first 45% of travel.
      if (copyRef.current) {
        const c = reduceMotion ? 0 : Math.min(1, p / 0.45)
        const cEase = c * c
        copyRef.current.style.opacity = (1 - cEase).toString()
        copyRef.current.style.transform = `translateY(${-cEase * 48}px)`
        copyRef.current.style.pointerEvents = c >= 1 ? "none" : "auto"
      }
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        apply()
        ticking = false
      })
    }

    apply()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[200vh]" aria-label="Introduction">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Scene */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div
            ref={stageRef}
            className="relative w-[min(92vw,820px)] aspect-square flex items-center justify-center translate-y-[6vh] md:translate-y-[4vh] will-change-transform"
          >
            <svg
              ref={svgRef}
              viewBox="-200 -250 400 500"
              className="w-full h-full overflow-visible will-change-transform"
              style={{ opacity: 0.35, transform: "scale(0.72) rotate(-8deg)" }}
            >
              <defs>
                <pattern
                  id="die-pattern"
                  x="0"
                  y="0"
                  width="8"
                  height="8"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(-30)"
                >
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#ff9a5c" strokeWidth="0.5" opacity="0.55" />
                  <rect x="2" y="2" width="1" height="1" fill="#ff9a5c" opacity="0.55" />
                </pattern>
                <radialGradient id="heat-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffe4c4" stopOpacity="0.9" />
                  <stop offset="35%" stopColor="#ff6a1a" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#9a2f00" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="ember-pool" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ff6a1a" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#9a2f00" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Ember pool beneath the package */}
              <g
                ref={setRef("pool")}
                style={{ transformOrigin: "center", willChange: "transform, opacity", opacity: 0.35, transform: "translate(0px, 200px)" }}
              >
                <ellipse cx="0" cy="10" rx="140" ry="52" fill="url(#ember-pool)" />
              </g>

              {/* Base substrate */}
              <g ref={setRef("base")} style={{ willChange: "transform" }}>
                <path className={structure} d="M-80,10 L-80,25 L0,55 L0,40 Z" />
                <path className={structureDark} d="M0,40 L0,55 L80,25 L80,10 Z" />
                <path className={structureTop} d="M0,-20 L80,10 L0,40 L-80,10 Z" />
                <g className="stroke-[#ff9a5c] stroke-[0.8] stroke-linecap-round">
                  {[-70, -60, -50, -40, -30, -20, -10, 10, 20, 30, 40, 50, 60, 70].map((x) => {
                    const y = 18 + (70 - Math.abs(x)) * 0.4
                    return <line key={x} x1={x} y1={y} x2={x} y2={y + 5} />
                  })}
                </g>
              </g>

              {/* Interposer */}
              <g ref={setRef("sub")} transform="translate(0, -10)" style={{ willChange: "transform" }}>
                <path className={structure} d="M-65,5 L-65,8 L0,32 L0,29 Z" />
                <path className={structureDark} d="M0,29 L0,32 L65,8 L65,5 Z" />
                <path className={structureTop} d="M0,-20 L65,5 L0,29 L-65,5 Z" />
                <g transform="translate(-35, 0)" fill="#2a1408" stroke="#ff9a5c" strokeWidth="0.5">
                  <path d="M0,0 L5,2 L0,4 L-5,2 Z" />
                </g>
                <g transform="translate(35, 0)" fill="#2a1408" stroke="#ff9a5c" strokeWidth="0.5">
                  <path d="M0,0 L5,2 L0,4 L-5,2 Z" />
                </g>
                <path
                  className="stroke-[#ff9a5c] stroke-[0.8] stroke-linecap-round stroke-linejoin-round"
                  d="M-20,10 L-10,14 L0,10 M20,10 L10,14 L0,10"
                  fill="none"
                  opacity="0.8"
                />
              </g>

              {/* Silicon die (the wafer that heats) */}
              <g ref={setRef("die")} transform="translate(0, -25)" style={{ willChange: "transform" }}>
                <g ref={setRef("heatGlow")} style={{ opacity: 0.08, willChange: "opacity" }}>
                  <ellipse cx="0" cy="2" rx="70" ry="30" fill="url(#heat-glow)" />
                </g>
                <path className={structure} d="M-30,0 L-30,3 L0,14 L0,11 Z" />
                <path className={structureDark} d="M0,11 L0,14 L30,3 L30,0 Z" />
                <path
                  ref={setRef("dieFace")}
                  className="stroke-[#ff9a5c] stroke-[0.8] stroke-linecap-round stroke-linejoin-round"
                  style={{ fill: "rgba(26,26,26,0.95)", transition: "fill 200ms linear" }}
                  d="M0,-11 L30,0 L0,11 L-30,0 Z"
                />
                <path fill="url(#die-pattern)" d="M0,-11 L30,0 L0,11 L-30,0 Z" />
                <g ref={setRef("heatCore")} style={{ opacity: 0, willChange: "opacity" }}>
                  <ellipse cx="0" cy="0" rx="14" ry="6" fill="#ffe4c4" opacity="0.5" />
                </g>
                <g transform="translate(-45, 8)">
                  <path className={structure} d="M-8,0 L-8,2 L0,5 L0,3 Z" />
                  <path className={structureDark} d="M0,3 L0,5 L8,2 L8,0 Z" />
                  <path className="fill-[#121212]/95 stroke-[#ff9a5c] stroke-[0.8]" d="M0,-3 L8,0 L0,3 L-8,0 Z" />
                </g>
                <g transform="translate(45, 8)">
                  <path className={structure} d="M-8,0 L-8,2 L0,5 L0,3 Z" />
                  <path className={structureDark} d="M0,3 L0,5 L8,2 L8,0 Z" />
                  <path className="fill-[#121212]/95 stroke-[#ff9a5c] stroke-[0.8]" d="M0,-3 L8,0 L0,3 L-8,0 Z" />
                </g>

                {/* Left callout: gate oxide */}
                <g style={{ pointerEvents: "none" }}>
                  <path
                    ref={setRef("leftPath")}
                    d="M 0,0 L -90,0 L -120,75 L -220,75"
                    fill="none"
                    stroke="#ff9a5c"
                    strokeWidth="1.2"
                    strokeDasharray="320"
                    strokeDashoffset="320"
                    style={{ willChange: "stroke-dashoffset" }}
                  />
                  <circle cx="0" cy="0" r="2.4" fill="#ffe4c4" />
                  <g ref={setRef("leftText")} transform="translate(-16, 0)" style={{ opacity: 0, willChange: "transform, opacity" }}>
                    <text
                      x="-222"
                      y="68"
                      textAnchor="end"
                      fill="#ededed"
                      fontFamily="var(--font-hack), monospace"
                      fontSize="11"
                      fontWeight="700"
                    >
                      SiO₂ gate oxide
                    </text>
                    <text
                      x="-222"
                      y="84"
                      textAnchor="end"
                      fill="#a1a1a1"
                      fontFamily="var(--font-hack), monospace"
                      fontSize="9"
                    >
                      grown in the tube furnace
                    </text>
                  </g>
                </g>

                {/* Right callout: metal contacts */}
                <g style={{ pointerEvents: "none" }}>
                  <path
                    ref={setRef("rightPath")}
                    d="M 0,0 L 90,0 L 120,75 L 220,75"
                    fill="none"
                    stroke="#ff9a5c"
                    strokeWidth="1.2"
                    strokeDasharray="320"
                    strokeDashoffset="320"
                    style={{ willChange: "stroke-dashoffset" }}
                  />
                  <g ref={setRef("rightText")} transform="translate(16, 0)" style={{ opacity: 0, willChange: "transform, opacity" }}>
                    <text
                      x="222"
                      y="68"
                      textAnchor="start"
                      fill="#ededed"
                      fontFamily="var(--font-hack), monospace"
                      fontSize="11"
                      fontWeight="700"
                    >
                      Al contacts
                    </text>
                    <text
                      x="222"
                      y="84"
                      textAnchor="start"
                      fill="#a1a1a1"
                      fontFamily="var(--font-hack), monospace"
                      fontSize="9"
                    >
                      sputtered, then patterned
                    </text>
                  </g>
                </g>
              </g>

              {/* Retention frame */}
              <g ref={setRef("ring")} transform="translate(0, -40)" style={{ willChange: "transform" }}>
                <path className={structure} d="M-70,5 L-70,8 L0,35 L0,32 Z" />
                <path className={structureDark} d="M0,32 L0,35 L70,8 L70,5 Z" />
                <path
                  className={structureTop}
                  fillRule="evenodd"
                  d="M0,-22 L70,5 L0,32 L-70,5 Z M0,-12 L45,5 L0,22 L-45,5 Z"
                />
                <circle cx="-60" cy="5" r="1.5" fill="#ff9a5c" transform="scale(1 0.5) rotate(30)" />
                <circle cx="60" cy="5" r="1.5" fill="#ff9a5c" transform="scale(1 0.5) rotate(-30)" />
              </g>

              {/* Heat spreader */}
              <g ref={setRef("lid")} transform="translate(0, -55)" style={{ willChange: "transform" }}>
                <path className={structure} d="M-70,5 L-70,12 L0,39 L0,32 Z" />
                <path className={structureDark} d="M0,32 L0,39 L70,12 L70,5 Z" />
                <path className={structureTop} d="M0,-22 L70,5 L0,32 L-70,5 Z" />
                <g transform="translate(0, -2)">
                  <path className={structure} d="M-20,0 L-20,3 L0,11 L0,8 Z" />
                  <path className={structureDark} d="M0,8 L0,11 L20,3 L20,0 Z" />
                  <path className={structureTop} d="M0,-8 L20,0 L0,8 L-20,0 Z" />
                </g>
              </g>
            </svg>
          </div>
        </div>

        {/* Copy */}
        <div ref={copyRef} className="hero-copy absolute inset-x-0 top-0 h-full flex flex-col justify-end pb-[9vh] md:pb-[11vh]">
          {children}
        </div>
      </div>
    </section>
  )
}
