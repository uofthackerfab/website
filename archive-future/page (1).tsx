"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Cpu, Zap, Github, Mail, Users, Wrench, CircuitBoard, Microscope } from "lucide-react"

export default function HackerFabWebsite() {
  const [glitchText, setGlitchText] = useState("hackerfab")
  const [terminalText, setTerminalText] = useState("")
  const fullTerminalText = "> fabricating the future_"

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const glitchChars = ["h4ck3rf4b", "hackerfab", "h@ckerfab", "hackerfab"]
      setGlitchText(glitchChars[Math.floor(Math.random() * glitchChars.length)])
    }, 2000)

    return () => clearInterval(glitchInterval)
  }, [])

  useEffect(() => {
    let i = 0
    const typeInterval = setInterval(() => {
      if (i < fullTerminalText.length) {
        setTerminalText(fullTerminalText.slice(0, i + 1))
        i++
      } else {
        clearInterval(typeInterval)
      }
    }, 100)

    return () => clearInterval(typeInterval)
  }, [])

  const projects = [
    {
      name: "8-bit-cpu",
      description: "Custom 8-bit processor designed from scratch using discrete logic",
      tech: ["TTL Logic", "PCB Design", "Verilog"],
      status: "active",
      contributors: 6,
    },
    {
      name: "mems-accelerometer",
      description: "Micro-electromechanical accelerometer fabricated in cleanroom",
      tech: ["Silicon Etching", "Photolithography", "COMSOL"],
      status: "beta",
      contributors: 4,
    },
    {
      name: "rf-amplifier",
      description: "High-frequency amplifier circuit for 5GHz applications",
      tech: ["GaN FETs", "Smith Charts", "ADS"],
      status: "prototype",
      contributors: 3,
    },
    {
      name: "quantum-dots",
      description: "Semiconductor quantum dots for next-gen displays",
      tech: ["MBE", "Spectroscopy", "Cleanroom"],
      status: "research",
      contributors: 5,
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

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-x-hidden">
      {/* Circuit-like background effect */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent"></div>
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-xs animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {Math.random() > 0.5 ? "━" : "┃"}
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-8 max-w-4xl">
          <div className="space-y-4">
            <div className="text-sm text-cyan-400 tracking-widest">{terminalText}</div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
              <span className="text-white">{glitchText}</span>
              <span className="text-cyan-400 animate-pulse">_</span>
            </h1>
            <div className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              uoft's hardware hacking collective
            </div>
            <div className="text-lg text-gray-400">semiconductors • chip fabrication • circuit design</div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
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

      {/* About Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white">
                <span className="text-cyan-400">//</span> what we build
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  we design and fabricate semiconductors, build custom processors, and push the limits of what's
                  possible with silicon.
                </p>
                <p>
                  from cleanroom fabrication to high-frequency circuit design, we get our hands dirty with real
                  hardware.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Card className="bg-gray-900 border-green-400 border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-5 h-5 text-green-400" />
                    <span className="text-white font-semibold">active members</span>
                  </div>
                  <div className="text-3xl font-bold text-green-400">34</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-cyan-400 border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Cpu className="w-5 h-5 text-cyan-400" />
                    <span className="text-white font-semibold">chips fabricated</span>
                  </div>
                  <div className="text-3xl font-bold text-cyan-400">127</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-yellow-400 border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span className="text-white font-semibold">cleanroom hours</span>
                  </div>
                  <div className="text-3xl font-bold text-yellow-400">892</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            <span className="text-cyan-400">//</span> current projects
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

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{project.contributors} members</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-green-400 hover:text-white hover:bg-green-400/20">
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

      {/* Join Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold text-white">
            <span className="text-cyan-400">//</span> join the lab
          </h2>

          <p className="text-xl text-gray-300">ready to build the future of computing? hit us up.</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-green-400 text-black hover:bg-green-300 font-semibold px-8 py-3">
              <Mail className="w-4 h-4 mr-2" />
              hackerfab@uoft.ca
            </Button>
            <Button
              variant="outline"
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-semibold px-8 py-3 bg-transparent"
            >
              <Github className="w-4 h-4 mr-2" />
              github.com/hackerfab-uoft
            </Button>
          </div>

          <div className="text-sm text-gray-500 space-y-1">
            <p>lab sessions: tuesdays & thursdays @ 6pm</p>
            <p>cleanroom access: wednesdays @ 2pm</p>
            <p>location: sandford fleming building</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>built by hackerfab • university of toronto • est. 2023</p>
        </div>
      </footer>
    </div>
  )
}
