"use client"

import { GrainGradient } from "@paper-design/shaders-react"

/*
  Fireball glow, inspired by the Trinity test footage in Oppenheimer:
  slowly billowing metaballs that run from black through deep red and
  orange to a white-hot core, under heavy film grain. Masked so it rises
  from the bottom of the viewport and leaves the top dark for reading.
*/
export function GradientBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-20 pointer-events-none"
      style={{
        opacity: 0.6,
        maskImage:
          "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0) 70%)",
        WebkitMaskImage:
          "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0) 70%)",
      }}
    >
      <GrainGradient
        style={{ height: "100%", width: "100%" }}
        colorBack="hsl(0, 0%, 2%)"
        softness={0.9}
        intensity={0.4}
        noise={0.45}
        shape="ripple"
        offsetX={0}
        offsetY={1}
        scale={1.2}
        rotation={0}
        speed={1.1}
        colors={["#1a0400", "#6b1d05", "#c2470f", "#ff8a3d"]}
      />
    </div>
  )
}
