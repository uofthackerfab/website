"use client"

import { useEffect, useRef } from "react"

/*
  Furnace atmosphere layer.

  Three things happen on one canvas:
    1. A faint silicon lattice: a static dot grid with diagonal bonds, the
       kind of thing you would see in a crystal-structure diagram.
    2. Embers: small particles that rise from the bottom edge, sway, cool
       from white-hot to deep orange, and fade.
    3. A heat haze: a slow-breathing radial glow anchored at the bottom.

  Respects prefers-reduced-motion by rendering a single static frame.
*/

type Ember = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  life: number
  maxLife: number
  heat: number
}

export function FurnaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let width = 0
    let height = 0
    let dpr = 1
    let raf = 0
    let lattice: HTMLCanvasElement | null = null
    let embers: Ember[] = []
    let lastT = performance.now()
    let running = true

    const emberCount = () => Math.round(Math.min(140, Math.max(50, (width * height) / 16000)))

    const buildLattice = () => {
      lattice = document.createElement("canvas")
      lattice.width = Math.ceil(width * dpr)
      lattice.height = Math.ceil(height * dpr)
      const lctx = lattice.getContext("2d")
      if (!lctx) return
      lctx.scale(dpr, dpr)

      const pitch = 44
      const cols = Math.ceil(width / pitch) + 2
      const rows = Math.ceil(height / pitch) + 2
      const ox = ((width % pitch) / 2) - pitch
      const oy = ((height % pitch) / 2) - pitch

      lctx.lineWidth = 1
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = ox + c * pitch
          const y = oy + r * pitch
          // Diamond-cubic style: alternate offset atoms and diagonal bonds.
          const offset = (r + c) % 2 === 0
          const px = offset ? x : x + pitch / 2
          const py = offset ? y : y + pitch / 2

          lctx.fillStyle = "rgba(255,255,255,0.075)"
          lctx.beginPath()
          lctx.arc(px, py, 1.1, 0, Math.PI * 2)
          lctx.fill()

          if (offset && c % 3 === 0 && r % 2 === 0) {
            lctx.strokeStyle = "rgba(255,255,255,0.035)"
            lctx.beginPath()
            lctx.moveTo(px, py)
            lctx.lineTo(px + pitch / 2, py + pitch / 2)
            lctx.stroke()
          }
        }
      }
    }

    const spawn = (e: Ember, initial = false) => {
      e.x = Math.random() * width
      e.y = initial ? Math.random() * height : height + 8
      e.vx = (Math.random() - 0.5) * 8
      e.vy = -(14 + Math.random() * 26)
      e.size = 0.8 + Math.random() * 1.7
      e.maxLife = 7 + Math.random() * 9
      e.life = initial ? Math.random() * e.maxLife : 0
      e.heat = 0.6 + Math.random() * 0.4
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.ceil(width * dpr)
      canvas.height = Math.ceil(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildLattice()

      const n = emberCount()
      embers = Array.from({ length: n }, () => {
        const e: Ember = { x: 0, y: 0, vx: 0, vy: 0, size: 1, life: 0, maxLife: 1, heat: 1 }
        spawn(e, true)
        return e
      })
    }

    const emberColor = (t: number, heat: number, alpha: number) => {
      // t: 0 fresh (hot) -> 1 old (cool)
      const hot = [255, 228, 196]
      const mid = [255, 138, 60]
      const cool = [154, 47, 0]
      let c: number[]
      if (t < 0.35) {
        const k = t / 0.35
        c = hot.map((v, i) => v + (mid[i] - v) * k)
      } else {
        const k = (t - 0.35) / 0.65
        c = mid.map((v, i) => v + (cool[i] - v) * k)
      }
      return `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${(alpha * heat).toFixed(3)})`
    }

    const drawHaze = (time: number) => {
      const breathe = reduceMotion ? 0.5 : 0.5 + 0.5 * Math.sin(time / 4200)
      const a = 0.10 + breathe * 0.08
      const cx = width * 0.5
      const cy = height * 1.08
      const r = Math.max(width, height) * 0.75
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
      g.addColorStop(0, `rgba(255, 106, 26, ${a})`)
      g.addColorStop(0.35, `rgba(154, 47, 0, ${a * 0.55})`)
      g.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = g
      ctx.fillRect(0, 0, width, height)
    }

    const frame = (now: number) => {
      if (!running) return
      const dt = Math.min(0.05, (now - lastT) / 1000)
      lastT = now

      ctx.clearRect(0, 0, width, height)
      if (lattice) ctx.drawImage(lattice, 0, 0, width, height)
      drawHaze(now)

      for (const e of embers) {
        e.life += dt
        if (e.life >= e.maxLife || e.y < -10) spawn(e)
        const t = e.life / e.maxLife
        // Sway that grows as the ember cools and rises.
        e.x += (e.vx + Math.sin(now / 900 + e.y * 0.02) * 6) * dt
        e.y += e.vy * dt
        // Fade in fast, fade out slowly.
        const alpha = t < 0.1 ? t / 0.1 : 1 - (t - 0.1) / 0.9
        const size = e.size * (1 - t * 0.35)

        ctx.fillStyle = emberColor(t, e.heat, alpha * 0.9)
        ctx.beginPath()
        ctx.arc(e.x, e.y, size, 0, Math.PI * 2)
        ctx.fill()

        // Hot embers carry a small halo.
        if (t < 0.4) {
          ctx.fillStyle = emberColor(t, e.heat, alpha * 0.12)
          ctx.beginPath()
          ctx.arc(e.x, e.y, size * 3.2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      if (!reduceMotion) raf = requestAnimationFrame(frame)
    }

    resize()
    window.addEventListener("resize", resize)

    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!reduceMotion) {
        running = true
        lastT = performance.now()
        raf = requestAnimationFrame(frame)
      }
    }
    document.addEventListener("visibilitychange", onVisibility)

    raf = requestAnimationFrame(frame)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  )
}
