"use client"

import { GrainGradient, Warp } from "@paper-design/shaders-react"

/*
  Fire under film grain, inspired by the Trinity footage in Oppenheimer.
  Two layers: a grainy heat shockwave rising from the bottom, and a faint
  wisp of smoke screened over it so the glow never settles into simple
  rings. Masked so the heat stays low and the top of the page stays dark.
*/

const MASK =
  "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 28%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0) 75%)"

export function GradientBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-20 pointer-events-none"
      style={{ maskImage: MASK, WebkitMaskImage: MASK }}
    >
      <div className="absolute inset-0" style={{ opacity: 0.6 }}>
        <GrainGradient
          style={{ height: "100%", width: "100%" }}
          colorBack="hsl(0, 0%, 2%)"
          softness={0.9}
          intensity={0.45}
          noise={0.5}
          shape="ripple"
          offsetX={0}
          offsetY={1}
          scale={1.2}
          rotation={0}
          speed={1.1}
          colors={["#1a0400", "#6b1d05", "#c2470f", "#ff8a3d"]}
        />
      </div>
      <div className="absolute inset-0 mix-blend-screen" style={{ opacity: 0.35 }}>
        <Warp
          style={{ height: "100%", width: "100%" }}
          colors={["#000000", "#5a1804", "#000000", "#b44a12"]}
          proportion={0.4}
          softness={1}
          distortion={0.15}
          swirl={0.45}
          swirlIterations={6}
          shape="checks"
          shapeScale={0.06}
          scale={1}
          rotation={0}
          speed={0.8}
        />
      </div>
    </div>
  )
}
