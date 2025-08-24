"use client"
import { useState } from 'react'
import { ArrowLeft, Calendar, User, ExternalLink, Github, Twitter } from "lucide-react"
import Link from "next/link"

export default function TubeFurnaceWriteup() {
  const [tocHovered, setTocHovered] = useState(false)

  const tocItems = [
    { id: 'introduction', title: 'Introduction', level: 1 },
    { id: 'patterning', title: 'Patterning', level: 1 },
    { id: 'diy-blu-ray', title: 'DIY Blu-Ray Lithography (Spinner)', level: 2 },
    { id: 'safety', title: 'Safety', level: 1 },
    { id: 'technical-concepts', title: 'Technical Concepts', level: 1 },
    { id: 'operational-notes', title: 'Operational Notes', level: 1 },
    { id: 'documentation', title: 'Documentation and Examples', level: 1 },
    { id: 'stepper-system', title: 'Stepper System', level: 1 },
    { id: 'stepper-setup', title: 'Stepper Setup', level: 1 },
    { id: 'k-layout', title: 'K-Layout (Mask Design)', level: 1 },
    { id: 'stepper-improvements', title: 'Stepper V1/V2/V2.1 Improvements', level: 1 },
    { id: 'improving-feature-size', title: 'Improving Feature Size', level: 1 },
    { id: 'capabilities', title: 'Capabilities', level: 1 },
    { id: 'projector-analysis', title: 'Projector Analysis RCA PD110', level: 1 }
  ]

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
  <div className="min-h-screen bg-[#1a1a1a] text-white">
      <div 
        className={`fixed left-4 top-1/2 transform -translate-y-1/2 z-10 transition-all duration-200 ease-out`}
        onMouseEnter={() => setTocHovered(true)}
        onMouseLeave={() => setTocHovered(false)}
      >
        <div className="w-6 h-6 flex items-center justify-center bg-[#232323] backdrop-blur-sm rounded hover:bg-[#2a2a2a] transition-colors cursor-pointer shadow-sm border border-gray-800/50">
          <svg
            className="w-3.5 h-3.5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </div>

        {tocHovered && (
          <div className="absolute left-0 top-0 w-64 bg-[#232323] backdrop-blur-md rounded-lg border border-gray-800/80 shadow-xl p-4 animate-fade-in">
            <div className="flex items-center mb-3 pb-2 border-b border-gray-800">
              <svg 
                className="w-3.5 h-3.5 text-gray-400 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              <span className="text-sm font-medium text-gray-200">Table of Contents</span>
            </div>
            
            <nav className="space-y-0.5 max-h-80 overflow-y-auto">
              {tocItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-2 py-1.5 text-sm rounded hover:bg-[#292929] transition-colors ${
                    item.level === 2 ? 'ml-3 text-gray-400' : 'text-gray-100'
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <article className="bg-[#232323] border border-gray-800 rounded-lg p-8 text-white">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
                Tube Furnace - "How Did We Not Die"
            </h1>
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
            Complete technical writeup on the design, and construction of our DIY tube furnace capable of reaching 1100°C for advanced material processing.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>UofT Hacker Fab Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>August 21st, 2025</span>
              </div>
              <span>- min read</span>
            </div>

            <div className="flex gap-3 mb-6">
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-700 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                <Github className="w-4 h-4" />
                GitHub
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-700 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                <Twitter className="w-4 h-4" />
                Twitter
              </button>
            </div>

            <div className="w-full h-px bg-gray-200 mb-8"></div>
          </header>

          <div className="blog-content space-y-8">
            <section id="introduction">
              <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
              <p className="text-gray-200 leading-relaxed mb-4">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              
              <p className="text-gray-200 leading-relaxed mb-4">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>

              <blockquote className="border-l-4 border-gray-500 pl-4 py-2 bg-gray-800 text-gray-100 italic">
                "The best way to understand complex fabrication processes is to build the tools yourself."
              </blockquote>
            </section>

            <section id="patterning">
              <h2 className="text-2xl font-bold text-white mb-6">Patterning</h2>
              <p className="text-gray-200 leading-relaxed mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <div id="diy-blu-ray" className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">DIY Blu-Ray Lithography (Spinner)</h3>
                <p className="text-gray-200 leading-relaxed mb-4">
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..
                </p>
                <ul className="space-y-3 text-gray-200 mb-6">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Resolution:</strong> Capable of patterning down to 500 nm resolution with proper optics alignment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Laser System:</strong> Uses Blu-ray laser (405 nm wavelength), sled and spindle motors for high-precision positioning</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Dual Function:</strong> Motors serve dual-purpose for both spin-coating and laser writing operations</span>
                  </li>
                </ul>
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                  <h4 className="text-white font-semibold mb-3">System Specifications</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Minimum Feature Size:</span>
                      <span className="text-blue-300 ml-2 font-mono">500nm</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Laser Wavelength:</span>
                      <span className="text-blue-300 ml-2 font-mono">405nm</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Positioning Accuracy:</span>
                      <span className="text-blue-300 ml-2 font-mono">±100nm</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Write Speed:</span>
                      <span className="text-blue-300 ml-2 font-mono">2.5mm/s</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section id="technical-concepts">
              <h2 className="text-2xl font-bold text-white mb-6">Technical Implementation</h2>
              <p className="text-gray-200 leading-relaxed mb-6">
                The core technologies behind our lithography system involve precise optical control, 
                mechanical positioning, and real-time feedback systems. Understanding these fundamentals 
                is crucial for successful implementation.
              </p>
              <ul className="space-y-4 text-gray-200">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>OPU (Optical Pickup Unit):</strong> The heart of the system - reads/writes optical discs and provides integrated laser diodes, photodiodes, and focus mechanisms</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Rayleigh Criterion:</strong> Defines the fundamental limit of optical resolution - determines smallest resolvable feature size (<a href="#" className="text-blue-300 underline">theoretical background</a>)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Astigmatic Focus:</strong> Uses ABCD photodiode configuration for precise focus control - optimal focus achieved when (A+C) - (B+D) = 0</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Substrate Matching:</strong> Laser must focus through optical path similar to disc's polycarbonate layer - use standard microscope cover glass for impedance matching</span>
                </li>
              </ul>
            </section>
          </div>
        </article>
      </main>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.15s ease-out forwards;
        }
      `}</style>
    </div>
  )
}