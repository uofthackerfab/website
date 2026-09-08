"use client"

import { GrainGradient } from "@paper-design/shaders-react"

/*
  Furnace glow. A slow, grainy wave in deep ember tones, masked so the heat
  sits low in the viewport like the mouth of a furnace beneath the page.
  Kept dim on purpose: the page reads over it, it does not compete.
*/
export function GradientBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-20 pointer-events-none"
      style={{
        opacity: 0.55,
        maskImage:
          "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 25%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0) 80%)",
        WebkitMaskImage:
          "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 25%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0) 80%)",
      }}
    >
      <GrainGradient
        style={{ height: "100%", width: "100%" }}
        colorBack="hsl(0, 0%, 3%)"
        softness={0.9}
        intensity={0.12}
        noise={0.35}
        shape="wave"
        offsetX={0}
        offsetY={0.6}
        scale={1.4}
        rotation={0}
        speed={0.4}
        colors={["#5a1b00", "#b8410a", "#ff7a2f"]}
      />
    </div>
  )
}
