"use client"

import { GrainGradient, Warp } from "@paper-design/shaders-react"

/*
  Fire under film grain, inspired by the Trinity footage in Oppenheimer.
  Two layers: a grainy heat shockwave rising from the bottom, and a faint
  wisp of smoke over it so the glow never settles into simple rings.

  Performance notes:
  - Both shaders render below screen resolution. The grain layer is capped
    at roughly 1080p; the smoke is soft, so it renders at a fraction of that.
  - The smoke uses transparent colours rather than a blend mode, and the
    fade to black at the top is a plain gradient overlay rather than a mask,
    so the browser does not re-blend the whole window every frame.
  - The whole layer is hidden while a build log pop-out covers the page.
*/
export function GradientBackground() {
  return (
    <div aria-hidden="true" className="site-bg fixed inset-0 -z-20 pointer-events-none">
      <div className="absolute inset-0" style={{ opacity: 0.6 }}>
        <GrainGradient
          style={{ height: "100%", width: "100%" }}
          minPixelRatio={1}
          maxPixelCount={1920 * 1080}
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
      <div className="absolute inset-0" style={{ opacity: 0.3 }}>
        <Warp
          style={{ height: "100%", width: "100%" }}
          minPixelRatio={0.5}
          maxPixelCount={640 * 360}
          colors={["#00000000", "#5a180499", "#00000000", "#b44a12aa"]}
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
      {/* Keeps the heat low: fades the top of the screen back to the page colour. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #0a0a0a 0%, #0a0a0a 25%, rgba(10,10,10,0.8) 45%, rgba(10,10,10,0.35) 72%, rgba(10,10,10,0) 100%)",
        }}
      />
    </div>
  )
}
