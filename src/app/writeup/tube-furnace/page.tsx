"use client"
import { useState } from 'react'
import { Calendar, User, Github, Twitter } from "lucide-react"
// ...existing code...

export default function TubeFurnaceWriteup() {
  const [tocHovered, setTocHovered] = useState(false)

  const tocItems = [
    { id: 'introduction', title: 'Introduction', level: 1 },
    { id: 'design-overview', title: 'Design Overview', level: 1 },
    { id: 'heating-element', title: 'Heating Element Design', level: 1 },
    { id: 'insulation', title: 'Insulation Strategy', level: 1 },
    { id: 'temperature-control', title: 'Temperature Control', level: 1 },
    { id: 'safety', title: 'Safety (The "Not Dying" Part)', level: 1 },
    { id: 'construction', title: 'Construction Process', level: 1 },
    { id: 'testing', title: 'Testing & Validation', level: 1 },
    { id: 'lessons-learned', title: 'Lessons Learned', level: 1 },
    { id: 'performance', title: 'Performance & Results', level: 1 },
    { id: 'improvements', title: 'Future Improvements', level: 1 }
  ]

  const scrollToSection = (id: string) => {
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
                Tube Furnace - &quot;How Did We Not Die&quot;
            </h1>
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              the complete article on "how" we built a 1100°C tube furnace from scratch
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
            </div>
            <div className="w-full h-px bg-gray-200 mb-8"></div>
          </header>

          <div className="blog-content space-y-8">
            <section id="introduction">
              <img src="/images/writeup/tube-furnace/hackerfab.gif" alt="Tube Furnace Introduction" className="w-full h-auto rounded-lg mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
              <p className="text-gray-200 leading-relaxed mb-4">
                Building a 1100°C tube furnace from scratch - honestly, looking back, we're not entirely sure how we didn't accidentally create a small disaster. But here we are, with a fully functional high-temperature furnace that's been running reliably for months. This writeup covers everything from our initial "let's just wing it" approach to the final implementation that actually works.
              </p>
              
              <p className="text-gray-200 leading-relaxed mb-4">
                The motivation was simple: commercial tube furnaces cost $15,000+ and we needed something for our semiconductor processing experiments. Our budget? About $800. The solution? Build it ourselves using nichrome wire, firebrick, and a healthy dose of engineering stubbornness. What could possibly go wrong?
              </p>

              <p className="text-gray-200 leading-relaxed mb-4">
                Spoiler alert: A lot could go wrong. We went through three temperature controllers, burned out two heating elements, and discovered that "eyeballing" thermal expansion calculations is not a recommended engineering practice. But we learned a ton, saved a ridiculous amount of money, and ended up with something that works better than we had any right to expect.
              </p>

              <blockquote className="border-l-4 border-gray-500 pl-4 py-2 bg-gray-800 text-gray-100 italic">
                &quot;The best way to understand complex fabrication processes is to build the tools yourself.&quot;
              </blockquote>
            </section>

            <section id="design-overview">
              <h2 className="text-2xl font-bold text-white mb-6">Design Overview</h2>
              <p className="text-gray-200 leading-relaxed mb-6">
                Our tube furnace follows a pretty standard design: a quartz tube surrounded by heating elements, wrapped in insulation, all controlled by a PID temperature controller. The devil, as always, is in the details - and there are a lot of details that can kill you if you get them wrong.
              </p>
              
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-6">
                <h4 className="text-white font-semibold mb-3">Key Specifications</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Max Temperature:</span>
                    <span className="text-orange-300 ml-2 font-mono">1100°C</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Tube Diameter:</span>
                    <span className="text-blue-300 ml-2 font-mono">50mm ID</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Heating Length:</span>
                    <span className="text-blue-300 ml-2 font-mono">300mm</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Total Power:</span>
                    <span className="text-orange-300 ml-2 font-mono">2.5kW</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Temperature Stability:</span>
                    <span className="text-green-300 ml-2 font-mono">±2°C</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Total Cost:</span>
                    <span className="text-green-300 ml-2 font-mono">~$750</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-200 leading-relaxed mb-4">
                The core philosophy was "keep it simple, but don't cut corners on safety." We used proven materials and designs, but fabricated everything ourselves. The quartz tube came from a lab supply company (about $80 - definitely not something to DIY), but everything else was built from scratch.
              </p>
            </section>

            <section id="heating-element">
              <h2 className="text-2xl font-bold text-white mb-6">Heating Element Design</h2>
              <p className="text-gray-200 leading-relaxed mb-6">
                This is where things get spicy - literally. We're pumping 2.5kW through nichrome wire to hit 1100°C. The heating element design is critical because if it fails, you either get no heat or... well, too much heat in the wrong places.
              </p>

              <ul className="space-y-4 text-gray-200 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Wire Selection:</strong> 20 AWG nichrome (Ni80Cr20) - chosen for its high melting point and stable resistance characteristics up to 1200°C</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Winding Pattern:</strong> Helical coils with 2mm spacing to prevent hot spots and ensure even heat distribution along the tube</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Support Structure:</strong> Custom-machined alumina ceramic tube to hold the heating coils - alumina is stable to 1700°C and electrically insulating</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Power Calculation:</strong> ~8.3 W/cm² power density - calculated to reach 1100°C with our insulation setup while staying well below wire limits</span>
                </li>
              </ul>

              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <h4 className="text-white font-semibold mb-3">Heating Element Math</h4>
                <p className="text-gray-300 text-sm mb-3">Because someone's going to ask how we calculated the wire length...</p>
                <div className="font-mono text-sm space-y-2">
                  <div className="text-blue-300">Target Power: 2500W @ 240V → R = V²/P = 23Ω</div>
                  <div className="text-blue-300">Nichrome resistance: ~1.1Ω/ft @ 20°C</div>
                  <div className="text-blue-300">Wire length needed: 23Ω ÷ 1.1Ω/ft ≈ 21 feet</div>
                  <div className="text-gray-400 text-xs mt-2">* Resistance increases ~30% at operating temperature</div>
                </div>
              </div>
            </section>

            <section id="insulation">
              <h2 className="text-2xl font-bold text-white mb-6">Insulation Strategy</h2>
              <p className="text-gray-200 leading-relaxed mb-6">
                Good insulation is what separates a tube furnace from a very expensive space heater. We went with a multi-layer approach: ceramic fiber blanket closest to the heating element, then vermiculite-filled firebrick, then an outer steel shell.
              </p>

              <p className="text-gray-200 leading-relaxed mb-4">
                The ceramic fiber blanket (Kaowool) handles the high-temperature zone and provides excellent thermal isolation. The firebrick adds thermal mass and structural support. The outer shell keeps everything contained and provides mounting points for accessories.
              </p>

              <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 text-amber-400 mt-0.5">⚠️</div>
                  <div>
                    <h4 className="text-amber-200 font-semibold mb-2">Insulation Safety Note</h4>
                    <p className="text-amber-100 text-sm">
                      Ceramic fiber insulation can release respirable fibers. Always wear proper PPE during installation and ensure adequate ventilation. We sealed all exposed edges with high-temp cement.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="temperature-control">
              <h2 className="text-2xl font-bold text-white mb-6">Temperature Control</h2>
              <p className="text-gray-200 leading-relaxed mb-6">
                We went through three different temperature controllers before settling on a proper PID controller with K-type thermocouple input. The first two were... learning experiences. Turns out "good enough for a toaster oven" is not the same as "good enough for 1100°C semiconductor processing."
              </p>

              <ul className="space-y-4 text-gray-200 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Controller:</strong> Inkbird ITC-100VH with K-type thermocouple input - chosen for its 1200°C range and solid-state relay output</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Thermocouple Placement:</strong> K-type probe positioned at the center of the heating zone, about 5mm from the tube wall</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Power Switching:</strong> 40A solid-state relay (massive overkill, but heat sinks are cheaper than replacing burnt relays)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>PID Tuning:</strong> P=50, I=200, D=50 - took about a week of tweaking to get stable ±2°C control</span>
                </li>
              </ul>
            </section>

            <section id="safety">
              <h2 className="text-2xl font-bold text-white mb-6">Safety (The "Not Dying" Part)</h2>
              <p className="text-gray-200 leading-relaxed mb-6">
                Let's be real: we're dealing with enough electrical power to weld steel, temperatures that can melt copper, and toxic gases if things go wrong. Safety isn't optional - it's the difference between a successful project and a very expensive insurance claim.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
                  <h4 className="text-red-200 font-semibold mb-3 flex items-center gap-2">
                    🔥 Thermal Safety
                  </h4>
                  <ul className="space-y-2 text-red-100 text-sm">
                    <li>• Outer surface stays below 60°C at max temp</li>
                    <li>• Automatic shutdown if thermocouple fails</li>
                    <li>• Emergency power cutoff switch</li>
                    <li>• Heat-resistant gloves rated to 1200°C</li>
                  </ul>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
                  <h4 className="text-yellow-200 font-semibold mb-3 flex items-center gap-2">
                    ⚡ Electrical Safety
                  </h4>
                  <ul className="space-y-2 text-yellow-100 text-sm">
                    <li>• Proper grounding on all components</li>
                    <li>• GFCI protection on all circuits</li>
                    <li>• Enclosed wiring in metal conduit</li>
                    <li>• Over-current protection sized correctly</li>
                  </ul>
                </div>
              </div>

              <p className="text-gray-200 leading-relaxed mb-4">
                The most important safety feature? A brain. We don't operate this thing without proper planning, and we never leave it unattended during heating cycles. Murphy's Law loves high-temperature equipment.
              </p>
            </section>

            <section id="construction">
              <h2 className="text-2xl font-bold text-white mb-6">Construction Process</h2>
              <p className="text-gray-200 leading-relaxed mb-6">
                Building this thing was a exercise in "measure twice, cut once, swear frequently." The construction took about three weeks of evenings and weekends, plus an embarrassing number of trips to various specialty suppliers.
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-semibold mb-3">Phase 1: The Shell</h4>
                  <p className="text-gray-200 leading-relaxed mb-3">
                    Started with a steel enclosure - 16-gauge steel tube, welded end caps, mounting flanges for the quartz tube. Nothing fancy, but solid construction. The key was getting the tube alignment perfect; any misalignment would create hot spots.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-3">Phase 2: Heating Elements</h4>
                  <p className="text-gray-200 leading-relaxed mb-3">
                    Winding 21 feet of nichrome wire into perfectly spaced coils was... meditative. And frustrating. The coils had to be uniform or you get temperature gradients. We built a simple jig to keep the spacing consistent.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-3">Phase 3: Insulation Installation</h4>
                  <p className="text-gray-200 leading-relaxed mb-3">
                    This is where things got itchy. Ceramic fiber insulation is amazing stuff, but it's not kind to exposed skin. Full PPE required. We cut everything slightly oversized and compressed it into place for a tight fit.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-3">Phase 4: Controls & Wiring</h4>
                  <p className="text-gray-200 leading-relaxed mb-3">
                    The control panel was built into a separate NEMA enclosure - never put electronics inside the furnace itself. Learned that lesson from someone else's mistake. All high-voltage wiring in proper conduit with appropriate ratings.
                  </p>
                </div>
              </div>
            </section>

            <section id="testing">
              <h2 className="text-2xl font-bold text-white mb-6">Testing & Validation</h2>
              <p className="text-gray-200 leading-relaxed mb-6">
                First power-up was... tense. We started conservatively at 200°C and worked our way up in 100°C increments over several days. Each temperature step included a 2-hour soak time to check for any issues.
              </p>

              <p className="text-gray-200 leading-relaxed mb-4">
                The validation process included temperature mapping across the heating zone, power consumption measurements, and thermal cycling tests. We also tested the safety systems by deliberately triggering thermocouple failures and emergency shutdowns.
              </p>

              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <h4 className="text-white font-semibold mb-3">Validation Results</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Temperature Uniformity:</span>
                    <span className="text-green-300 ml-2">±5°C over 200mm zone</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Heat-up Time:</span>
                    <span className="text-blue-300 ml-2">45 min to 1000°C</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Power Consumption:</span>
                    <span className="text-blue-300 ml-2">2.1kW at 1100°C</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Stability:</span>
                    <span className="text-green-300 ml-2">±2°C at setpoint</span>
                  </div>
                </div>
              </div>
            </section>

            <section id="lessons-learned">
              <h2 className="text-2xl font-bold text-white mb-6">Lessons Learned</h2>
              <p className="text-gray-200 leading-relaxed mb-6">
                Every project teaches you something. This one taught us a lot, sometimes the hard way. Here's what we wish we'd known before starting:
              </p>

              <ul className="space-y-4 text-gray-200 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Thermal expansion is real:</strong> Everything grows when heated. Design for it or watch your carefully machined parts bind up at temperature.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Quality thermocouples matter:</strong> Cheap thermocouples drift. At 1100°C, a few degrees of drift can ruin your process.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>PID tuning takes time:</strong> Don't expect perfect control immediately. Each system is different and requires patient tuning.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Safety systems aren't optional:</strong> The one time you skip a safety check is when something will go wrong.</span>
                </li>
              </ul>
            </section>

            <section id="performance">
              <h2 className="text-2xl font-bold text-white mb-6">Performance & Results</h2>
              <p className="text-gray-200 leading-relaxed mb-6">
                After six months of regular use, the furnace has exceeded our expectations. We've successfully run oxidation processes, annealing cycles, and dopant activation steps. The temperature control is solid, and the construction has held up well.
              </p>

              <p className="text-gray-200 leading-relaxed mb-4">
                Most importantly, we haven't died. That might sound like a low bar, but given the amount of energy this thing contains, we consider it a significant achievement.
              </p>
            </section>

            <section id="improvements">
              <h2 className="text-2xl font-bold text-white mb-6">Future Improvements</h2>
              <p className="text-gray-200 leading-relaxed mb-6">
                No project is ever truly finished. Here's what we'd change for version 2:
              </p>

              <ul className="space-y-3 text-gray-200">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Multi-zone heating:</strong> Independent control of three heating zones for better temperature uniformity</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Data logging:</strong> Automated temperature logging with alerts for out-of-range conditions</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Gas control:</strong> Automated inert gas purging for controlled atmosphere processes</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Faster cooling:</strong> Forced air cooling to reduce cycle times</span>
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