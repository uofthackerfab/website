"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Github, Mail, Wrench, CircuitBoard, Microscope } from "lucide-react"

function LiquidGlassPopup({ open, onClose }: { open: boolean, onClose: () => void }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white/10 border border-cyan-400 rounded-2xl shadow-xl p-10 text-center relative" style={{backdropFilter: 'blur(16px) saturate(180%)', WebkitBackdropFilter: 'blur(16px) saturate(180%)'}}>
        <div className="text-3xl font-bold text-cyan-400 mb-4">coming soon</div>
        <div className="text-gray-200 mb-6">schematics will be available on github soon!</div>
        <button onClick={onClose} className="px-6 py-2 rounded bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition">close</button>
      </div>
    </div>
  )
}

export default function HackerFabWebsite() {
  const [glitchText, setGlitchText] = useState("hackerfab")
  // Add simple top phrases
  const topPhrases = [
    "hacking the hardware_",
    "pushing the limits_",
    "breaking the barriers_",
    "fabricating access_",
    "from schematics to systems_", 
  ]
  const [topPhraseIndex, setTopPhraseIndex] = useState(0)

  // Remove cipher effect from top phrase, just rotate every 12s
  useEffect(() => {
    const interval = setInterval(() => {
      setTopPhraseIndex((prev) => (prev + 1) % topPhrases.length)
    }, 12000)
    return () => clearInterval(interval)
  }, [topPhrases.length])

  useEffect(() => {
    const glitchChars = ["h4ck3rf4b", "hackerfab", "h@ckerfab", "hackerfab"]
    const glitchInterval = setInterval(() => {
      setGlitchText(glitchChars[Math.floor(Math.random() * glitchChars.length)])
    }, 2000)
    return () => clearInterval(glitchInterval)
  }, [])

  const projects = [
    {
      name: "tube furnace",
      description: "High-temperature furnace for semiconductor processing and material synthesis.",
      tech: ["Thermal Processing", "Quartz Tube", "Gas Flow"],
      status: "active",
    },
    {
      name: "spincoater",
      description: "Device for uniform thin film deposition via high-speed spinning.",
      tech: ["Thin Films", "Photoresist", "Motor Control"],
      status: "active",
    },
    {
      name: "lithography stepper",
      description: "Precision optical system for photolithography pattern transfer.",
      tech: ["Photolithography", "Optics", "Stepper"],
      status: "research",
    },
    {
      name: "magnetron sputter",
      description: "Vacuum deposition system for thin film metal and dielectric coatings.",
      tech: ["Vacuum", "Plasma", "Thin Films"],
      status: "research",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400 border-green-400"
      case "beta":
        return "text-yellow-400 border-yellow-400"
      case "prototype":
        return "text-blue-400 border-blue-400"
      case "research":
        return "text-purple-400 border-purple-400"
      default:
        return "text-gray-400 border-gray-400"
    }
  }

  const [popupOpen, setPopupOpen] = useState(false)

  // Fix hydration error: generate random lines only on client
  const [randomLines, setRandomLines] = useState<
    { left: string; top: string; animationDelay: string; char: string }[]
  >([])
useEffect(() => {
  if (typeof window === "undefined") return // skip on server

  const lines = Array.from({ length: 30 }).map(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    char: Math.random() > 0.5 ? "━" : "┃",
  }))
  setRandomLines(lines)
}, [])

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-x-hidden">
      <LiquidGlassPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent"></div>
        {randomLines.map((line, i) => (
          <div
            key={i}
            className="absolute text-xs animate-pulse"
            style={{
              left: line.left,
              top: line.top,
              animationDelay: line.animationDelay,
            }}
          >
            {line.char}
          </div>
        ))}
      </div>

      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-8 max-w-4xl">
          <div className="text-cyan-400 text-xs mb-2" style={{letterSpacing: 2}}>{topPhrases[topPhraseIndex]}</div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mx-auto w-fit">
  <span className="text-white">{glitchText}</span>
  <span className="text-cyan-400 animate-pulse">_</span>
</h1>
<div className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
  uoft&apos;s hardware hacking collective
</div>
          <div className="text-lg text-gray-400 mb-6">semiconductors • chip fabrication • building with silicon</div>
          <div className="flex flex-wrap justify-center gap-4 text-sm mt-4">
            <div className="flex items-center gap-2 px-3 py-1 border border-green-400 rounded">
              <CircuitBoard className="w-4 h-4" />
              <span>design</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 border border-cyan-400 rounded">
              <Wrench className="w-4 h-4" />
              <span>fabricate</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 border border-yellow-400 rounded">
              <Microscope className="w-4 h-4" />
              <span>test</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 border border-purple-400 rounded">
              <Zap className="w-4 h-4" />
              <span>iterate</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 flex justify-center items-center">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            {'//'} what we build
          </h2>
          <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
            <p>
              we design and fabricate semiconductors, build custom processors, and push the limits of what&apos;s
              possible with silicon.
            </p>
            <p>
              from cleanroom fabrication to high-frequency circuit design, we get our hands dirty with real
              hardware.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            {'//'} current projects
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="bg-black border-gray-700 hover:border-green-400 transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                      {project.name}
                    </h3>
                    <div className={`px-2 py-1 text-xs border rounded ${getStatusColor(project.status)}`}>
                      {project.status}
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-1 bg-gray-800 text-cyan-400 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm" className="text-green-400 hover:text-white hover:bg-green-400/20" onClick={() => setPopupOpen(true)}>
                      <Github className="w-4 h-4 mr-2" />
                      schematics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold text-white">
            {'//'} join the lab
          </h2>

          <p className="text-xl text-gray-300">ready to build the future of computing? hit us up.</p>
          <div className="text-sm text-gray-500 space-y-1">
            <p>shoot us an email if u have any questions, suggestions, tips or just want to connect :)</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-green-400 text-black hover:bg-green-300 font-semibold px-8 py-3">
              <Mail className="w-4 h-4 mr-2" />
              hackerfab@uoft.ca
            </Button>
            <a
              href="https://github.com/uofthackerfab"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button
                variant="outline"
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-semibold px-8 py-3 bg-transparent"
              >
                <Github className="w-4 h-4 mr-2" />
                github.com/uofthackerfab
              </Button>
            </a>
          </div>

        </div>
      </section>

      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>built by hackerfab • university of toronto • est. 2025</p>
        </div>
      </footer>
    </div>
  )
}
