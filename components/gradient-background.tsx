"use client"

import { Warp } from "@paper-design/shaders-react"

/*
  Fire and smoke, inspired by the Trinity footage in Oppenheimer: swirling,
  turbulent tendrils of ember on black, under a layer of film grain. Masked
  so the heat rises from the bottom of the viewport and the top stays dark.
*/

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

const MASK =
  "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 28%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0) 75%)"

export function GradientBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-20 pointer-events-none"
      style={{ opacity: 0.55, maskImage: MASK, WebkitMaskImage: MASK }}
    >
      <Warp
        style={{ height: "100%", width: "100%" }}
        colors={["#0a0a0a", "#7a2206", "#0a0a0a", "#e0601a", "#2a0a02"]}
        proportion={0.42}
        softness={1}
        distortion={0.2}
        swirl={0.55}
        swirlIterations={7}
        shape="checks"
        shapeScale={0.07}
        scale={1}
        rotation={0}
        speed={1}
      />
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "220px 220px", opacity: 0.5 }}
      />
    </div>
  )
}
