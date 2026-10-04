// Build logs restored from the original site. Text is unchanged apart from
// heading capitalization.

export type PostBlock = {
  heading?: string
  body?: string
  formula?: string
  items?: string[]
  table?: { label: string; value: string; link?: string }[]
  links?: { text: string; url: string }[]
  images?: { src: string; alt: string }[]
}

export type Post = {
  slug: string
  title: string
  cover: { src: string; alt: string }
  intro: string
  blocks: PostBlock[]
}

export const posts: Post[] = [
  {
    "slug": "tube-furnace",
    "title": "Building a tube furnace",
    "cover": {
      "src": "/furnace.gif",
      "alt": "Tube furnace glowing while powered"
    },
    "intro": "Welcome to Toronto Hacker Fab’s first blog post! We consist of a small group of just three people, just trying to do things. We recently completed a huge milestone by creating a working tube furnace! It heats up exactly like an oven, uses resistive heating elements to raise temperatures. Although it sounds simple, there were a huge amount of challenges that we came across, of varying danger levels.\n\nIn this blog below, we break down exactly how we built a working and durable furnace without the hazards. Along the way, we’ll deep dive into exactly how everything was built and the problems that we came across the road. We want this blog to take you on a journey of how we approached and thought about the problem - specifically, working on things the hacky way, and building things up from first principles.",
    "blocks": [
      {
        "heading": "Disclaimer",
        "body": "This project poses high danger and we were surprised, even as electrical engineers, how much we did not know. There is a difference between being an electrical engineer, and an electrician. If you follow this tutorial, it means you proceed at your own risk and we are not responsible for any injuries resulting from this blog post."
      },
      {
        "heading": "Background",
        "body": "Toronto Hacker Fab aims to provide a pipeline for chip tapeout at small scale, low cost. Our first goal is to be able to fabricate an NMOS transistor, which the tube furnace would allow us to accomplish. Specifically, the tube furnace is responsible for catalyzing the chemical reaction with silicon below:",
        "formula": "Si + O₂ → SiO₂"
      },
      {
        "body": "On the right (silicon dioxide) is a high-quality dielectric material that serves as the gate oxide in the nmos transistor structure. This chemical reaction only occurs at high temperatures between 900°C and 1200°C, which our tube furnace reaches by resistive heating.\n\nThe resulting SiO₂ layer thickness is controlled by temperature and oxidation time according to the deal-grove model, allowing us to grow precise gate oxide layers in the 10-100 nm range required for functional transistors.\n\nBeyond gate oxide formation, thermal oxidation also enables field oxide isolation, passivation layers, and masking for subsequent doping steps in the NMOS fabrication process."
      },
      {
        "heading": "How we got started",
        "body": "We got started by watching a few YouTube videos. Without them, it probably would’ve taken much longer to figure out proper build. As much detail as the video went into, it didn’t go into everything.\n\nThe BOM was missing, so we reverse image searched every piece of material we saw in the video. For the proper metal box, it turned out that cutting through metal was not that easy. The video uses a welding and machining setup, which we did not have.\n\nUnfortunately U of T doesn’t support builders, and the machining shop manager did not like our tube furnace idea. We ended up buying a carbon steel box, and through a series of drilling holes with metal drills, metal cutters, and sanders, we slowly chipped away a circular opening for a glass tube to be fit in, aka. the hacky way.\n\nNote for the electronics, we decided to use a programmable PID controller instead of the Arduino circuit, which we will detail later.",
        "images": [
          {
            "src": "/tube.png",
            "alt": "Quartz tube wrapped in nichrome wire"
          },
          {
            "src": "/hole.png",
            "alt": "Opening cut into the steel enclosure for the tube"
          }
        ]
      },
      {
        "heading": "Bill of materials",
        "table": [
          {
            "label": "Heating Element",
            "value": "Nichrome wire - 0.65mm 22 AWG",
            "link": "https://www.amazon.ca/dp/B0DJP7YZQ8?ref=ppx_yo2ov_dt_b_fed_asin_title"
          },
          {
            "label": "Chamber",
            "value": "Quartz tube - 5/8\" OD, 12\" Long",
            "link": "https://www.mcmaster.com/products/tubes/material~glass-2/material~quartz-glass/"
          },
          {
            "label": "Enclosure",
            "value": "Carbon steel box",
            "link": "https://www.amazon.ca/dp/B0DLGVHRRP?ref=ppx_yo2ov_dt_b_fed_asin_title"
          },
          {
            "label": "Connectors",
            "value": "Spade terminals 10-12 AWG"
          },
          {
            "label": "Controller",
            "value": "Programmable digital PID controller (Ramp & Soak capable)",
            "link": "https://www.amazon.ca/dp/B09MG4K7XC?ref=ppx_yo2ov_dt_b_fed_asin_title"
          },
          {
            "label": "Sensor",
            "value": "Type K Thermocouple rated for high temperatures"
          },
          {
            "label": "Switching",
            "value": "Solid State Relay (SSR, 40A) + Heatsink"
          },
          {
            "label": "Insulation (Blanket)",
            "value": "Ceramic Fiber Blanket (>2600F)",
            "link": "https://www.amazon.ca/dp/B0DN11WPFN?ref=ppx_yo2ov_dt_b_fed_asin_title"
          },
          {
            "label": "Insulation (Board)",
            "value": "Ceramic Fiber Insulation Board",
            "link": "https://www.amazon.ca/dp/B08F48GBHF?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1"
          },
          {
            "label": "Wiring (Power)",
            "value": "12 AWG Wire + 10 ft Heavy-Duty NEMA 6-15P to IEC C13 Cord",
            "link": "https://www.amazon.ca/dp/B07MCN2B7J?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1"
          },
          {
            "label": "Wiring (Internal)",
            "value": "12 AWG Silicone Wire High-Temp High-Voltage",
            "link": "https://www.amazon.ca/dp/B08PBYLM3R?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1"
          },
          {
            "label": "Wiring (Interconnect)",
            "value": "99.9% Pure Copper Wire 20 Gauge",
            "link": "https://www.amazon.ca/dp/B0DRT9VZP8?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1"
          },
          {
            "label": "Terminals",
            "value": "Wago 222 - 8-12 AWG 3POS"
          },
          {
            "label": "Adhesive (Refractory)",
            "value": "Sodium Silicate Firebrick Refractory Cement",
            "link": "https://www.amazon.ca/dp/B07872F99B?ref=ppx_yo2ov_dt_b_fed_asin_title"
          },
          {
            "label": "Adhesive (Epoxy)",
            "value": "J-B Weld Original",
            "link": "https://www.amazon.ca/dp/B072V321DX?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1"
          },
          {
            "label": "Tape",
            "value": "Polyimide High Temperature Resistant Tape",
            "link": "https://www.amazon.ca/dp/B08Y8L2W6D?ref=ppx_yo2ov_dt_b_fed_asin_title"
          },
          {
            "label": "Tools",
            "value": "Assortment of screwdrivers, lead cutter"
          }
        ]
      },
      {
        "heading": "Final plan and assembly",
        "body": "We didn’t plan our final circuit or our final BOM, both were iterated as we hacked away. Through watching obscure Indian engineers break down circuitry, we figured out a final plan. This is what the final build looks like:",
        "images": [
          {
            "src": "/tube-furnace-photo.png",
            "alt": "Wiring diagram of the controller, relay, thermocouple and furnace"
          }
        ]
      },
      {
        "body": "The assembly of the furnace was simple with the BOM. Following the video’s steps through the glass tube assembly with the cement, and nichrome wire, we then made holes near the top of the tube furnace, using the same hacky way that we did for the glass tube.\n\nNow the metal box has two openings on the sides, and two openings at the top. IT IS IMPORTANT THAT THESE HOLES AT THE TOP ARE SPACED WELL APART. Otherwise electrical arcing will happen, which you do not want to see. We ended up using ceramic tubing at the entrances for additional insulation when routing the wires through the exits of the metal box.\n\nIn a normal North American building, a standard 120 V outlet is guaranteed to be protected by a building breaker (or fuse) upstream. We properly bonded our furnace to the AC input’s PE (protective earth) green wire to the bottom of the metal box using a metal plate and metal screw. This provides a layer of safety incase, a short occurs. Additional safety can be achieved using a fuse, and a GFCI-installed outlet.",
        "images": [
          {
            "src": "/insulation.png",
            "alt": "Ceramic fiber insulation packed inside the enclosure"
          },
          {
            "src": "/welding_glue.png",
            "alt": "Refractory cement applied around the tube"
          }
        ]
      },
      {
        "body": "Now, it’s important next, that you consider where the nichrome wire could short and touch the metal box. Preventing a short mitigates electrical danger before it occurs. The nichrome wire could short near the entrances (closest to the metal box sides), and near the top (through the holes). The nichrome wire could also short with itself.\n\nFor shorts near the metal sides, you should unwind the corresponding nichrome wire wrapping if they’re too close to it’s closest metal side opening, and generally bend them away from the sides of the metal box. You should also avoid direct contact with the actual nichrome wounding of the glass tube, keep them away from this. We used the insulation to hold the the nichrome wire in place.\n\nWith copper wire, you should twist and wind to connect the copper to the nichrome, and then place the corresponding electrical tubing over it. Make sure that the electrical tubing is well insulated, a distance away from the glass tube, and it’s not close to the nichrome. Nichrome melts rubber, its much much more resistive than copper, and we learned it the hard way, saying goodbye to one of our Wago connectors. Now you know why your cables use copper wiring inside. After that step, cleanly route both copper wires through the top two holes. Use insulation to hold the copper wires in place now.\n\nThe protection both ceramics and rubber insulation makes it much harder for shorts to occur."
      },
      {
        "body": "The rest of assembly involves connecting the circuitry parts, involving the PID controller, the SSR, and the actual furnace. We’ve covered everything that could go wrong. The rest of the build is textbook. High VAC is modulated by an SSR, controlled by the PID controller. The PID controller uses a linear ramp (settings described below), receiving feedback from thermocouple. Connect wires using Wagos. For additional safety, you should use the electrical tape to cover the PID controller’s pins that connect 120V L and N. Place the entire furnace metal box on top of the hard insulation platform."
      },
      {
        "heading": "PID basic settings (hold SET for 3 s)",
        "table": [
          {
            "label": "SP",
            "value": "skip (manual setpoint, only used when run=0)"
          },
          {
            "label": "AL-1",
            "value": "1050 (high-temp safety alarm; triggers if PV > 1050°C)"
          },
          {
            "label": "AL-2",
            "value": "250 (secondary alarm; if it can’t go higher, leave it)"
          },
          {
            "label": "Pb",
            "value": "0.0 (PV offset calibration)"
          },
          {
            "label": "P",
            "value": "100 (proportional response strength)"
          },
          {
            "label": "I",
            "value": "500 (integral correction speed)"
          },
          {
            "label": "d",
            "value": "100 (derivative damping)"
          },
          {
            "label": "t",
            "value": "2 (SSR drive cycle time)"
          },
          {
            "label": "FILT",
            "value": "20 (smooths PV noise)"
          },
          {
            "label": "Hy",
            "value": "0.5 (hysteresis)"
          },
          {
            "label": "dp",
            "value": "0 (integer °C display)"
          },
          {
            "label": "outH",
            "value": "200 (max output limit)"
          },
          {
            "label": "outL",
            "value": "0 (min output limit)"
          },
          {
            "label": "AT",
            "value": "0 (autotune off)"
          },
          {
            "label": "LocK",
            "value": "0 (unlocked)"
          },
          {
            "label": "Sn",
            "value": "K (K-type thermocouple scaling)"
          },
          {
            "label": "OP-A",
            "value": "2 (voltage pulse output for SSR)"
          },
          {
            "label": "C/F",
            "value": "C (Celsius units)"
          },
          {
            "label": "ALP",
            "value": "1 (alarm mode so AL-1 acts as process high alarm)"
          },
          {
            "label": "COOL",
            "value": "0 (heating logic)"
          },
          {
            "label": "P-SH",
            "value": "1300 (high range)"
          },
          {
            "label": "P-SL",
            "value": "0 (low range)"
          },
          {
            "label": "Addr",
            "value": "1 (RS485 address - irrelevant)"
          },
          {
            "label": "bAud",
            "value": "9600 (RS485 baud - irrelevant)"
          }
        ]
      },
      {
        "heading": "PID program settings (SET + UP for 3 s)",
        "body": "Goal: 1000°C target, 20°C/min ramp, then hold",
        "table": [
          {
            "label": "SEC",
            "value": "0 (time unit = minutes)"
          },
          {
            "label": "LOOP",
            "value": "0 (run once, then stop)"
          },
          {
            "label": "PED (PdE)",
            "value": "0 (power-loss behavior = safest)"
          },
          {
            "label": "AL_P",
            "value": "10.0 (wait zone; AT may flash if PV lags SV by >10°C)"
          },
          {
            "label": "run",
            "value": "3 (program enabled/running)"
          },
          {
            "label": "r1",
            "value": "49 (ramp time to C1; ~20°C/min)"
          },
          {
            "label": "t1",
            "value": "30 (hold time at C1 in minutes)"
          },
          {
            "label": "C1",
            "value": "1000 (target temperature)"
          },
          {
            "label": "r2",
            "value": "0 (end program after segment 1)"
          }
        ]
      },
      {
        "heading": "Testing",
        "body": "After setting everything up, you should test in the following manner. First start off by testing the PID controller, WITHOUT the furnace plugged in, only the controller cable. We suggest using an outlet extender with a switch to turn on/off both components for easy and safe testing.\n\nWhat you should see:\n\nPV (top) = current temp (measured by thermocouple)\n\nSV (bottom) should start near the starting value and increase gradually, not jump\n\nIf you see this, you got the PID controller working! Unplug the controller. The settings and state will be saved internally. With the outlet extender off, plug in both the controller cable, and the furnace cable. Now for the moment of truth, turn on the outlet extender. Your furnace should be heating up now. This is where you should be the most careful. The nichrome wire will glow red at times, only for a short bit, before the current decreases as it’s modulated by the PID controller. The cement should protect the glass tube from any heat damage.",
        "images": [
          {
            "src": "/final_setup.png",
            "alt": "Finished furnace setup on the bench"
          }
        ]
      },
      {
        "heading": "Remarks",
        "body": "If you did everything correct, you should see the furnace glow red near 700C! Congrats! You just did things the hacky way.\n\nAlong this journey, we definitely learned a lot! We learned a new way of thinking about problems, starting from everything that could go wrong, when the problem poses extreme danger.\n\nIf you got this far, please do let us know! We tried to make this blog as detailed as possible, but with everything, we can only describe so far. Please reach out to any of us if you have any questions."
      }
    ]
  },
  {
    "slug": "spin-coater",
    "title": "Building a spin coater",
    "cover": {
      "src": "/spincoater.jpg",
      "alt": "Spin coater chassis"
    },
    "intro": "You'd probably think a spin coater is something you can knock out in one sitting. At first glance it's basically a PC fan spinning really fast, so how hard could it be?\n\nThat's exactly what we thought. We gave ourselves one week to build the whole thing.",
    "blocks": [
      {
        "heading": "Intro",
        "body": "Once we actually started putting it together, it got real pretty fast. We started from BirdBrain's DIY spin coater design (one of the cheapest and simplest builds out there).\n\nThere's nothing wrong with his design, it works. The problem for us was the circuit and control. Once we got into the wiring, drivers, and power setup, we realized we were overcomplicating something that could be done way simpler for what we needed.\n\nSo we pivoted to a setup that gave us finer control, better repeatability, and less headache.\n\nWe switched to an Arduino-based setup with PWM control, two potentiometers (coarse and fine), and a small LCD for speed and job duration. The coarse pot sets the rough RPM range, the fine pot lets you dial in the last few percent, and the keypad is used to start/stop runs and choose presets.\n\nThe LCD shows target speed, current speed, and remaining time. That combo gave us way better repeatability and precision, which you actually need once you care about spin profiles instead of just 'fast' and 'faster'."
      },
      {
        "heading": "Specifications",
        "items": [
          "Spin speed: ~600–3000 rpm (Arctic P8 Max @ 12 V under load)",
          "Speed control: Dual potentiometer (coarse: full range, fine: ±5% trim), PWM output from Arduino at 490 Hz",
          "Speed resolution: ~30–60 rpm per fine-adjust step (based on the PWM-to-RPM mapping we measured)",
          "Job duration: 1–300 s, adjustable in 1 s increments",
          "Substrate size: Up to 50 mm diameter (tested with 1×1 inch glass slides and 2 inch wafers)",
          "Power: 12 V DC input, ~0.12–0.20 A at steady 3000 rpm (≈2.4 W)",
          "Controller: Arduino Uno + I2C 1602 LCD + 4×4 membrane keypad",
          "Safety: Automatic spin-down on timeout, capped duty cycle at 85% to avoid overshoot, optional printed lid to contain splatter"
        ]
      },
      {
        "heading": "Bill of materials",
        "items": [
          "Controller / UI: Arduino Uno, I2C 1602 LCD, 4×4 membrane keypad, 2× 10 kΩ potentiometers (speed + time / coarse + fine)",
          "Drive: Arctic P8 Max 12 V PC fan (or any 12 V brushless PC fan with similar RPM), Motor driver (logic-level MOSFET or driver module), 2N2222 transistor (for keypad / LCD backlight control if needed)",
          "Power: 12 V DC supply (at least 0.5 A recommended)",
          "Misc: Breadboard or perfboard, wires, solder, 3D printed housing and chuck"
        ]
      },
      {
        "heading": "Fan preparation",
        "body": "The fan we used for this build is the Arctic P8 Max. It can hit around 3000 rpm and supports 5 to 12 volts, which makes it solid for a spin coater.\n\nTo get access to the motor, we had to take it apart, but this fan isn't like the usual ones where you just peel back the sticker. The teardown is a bit more involved, and you need to be careful. The first time we tried it, we accidentally tore the ground connection right off the 4-pin header.\n\nThe way we do it now:\n\nHold the fan with the sticker side facing away from you and the open side toward you. Put both thumbs on the fan hub (or the blades near the hub) and push with even pressure. Support the frame so you are not flexing the PCB or yanking on the wires.\n\nIf you line it up properly, the hub pops out cleanly without ripping the 4-pin header.\n\nAfter that, pull off the fan blades and lightly sand the round motor cap. This is the surface that will actually spin and that you will mount your printed adapter onto, so you want it flat and clean.\n\nThis next part is optional, but if you do not have M3s longer than 50 mm, mounting everything gets annoying fast. The easier workaround is to trim the fan housing. Cut the outer frame roughly in half so only the motor housing and center supports are left.\n\nThat gives you a much lower profile, which makes it easier to bolt the fan down and keep it rigid without extra-long screws.",
        "images": [
          {
            "src": "/spincoater-fan-prep.png",
            "alt": "Fan disassembled with the motor exposed"
          }
        ]
      },
      {
        "heading": "Housing assembly",
        "body": "Pretty self explanatory, refer to the printable for the full spec (BirdBrain's design):",
        "links": [
          {
            "text": "View Files on Printables",
            "url": "https://www.printables.com/model/658943-diy-spin-coater/files"
          }
        ]
      },
      {
        "heading": "Circuitry",
        "body": "The high level control loop is:\n\nPots → Arduino analog inputs (read speed / time setpoints)\n\nKeypad → Arduino digital inputs (start/stop, preset select)\n\nArduino → PWM output pin → motor driver / MOSFET → 12 V fan\n\nFan tach wire (optional) → Arduino interrupt pin for RPM feedback\n\nArduino → I2C → LCD for UI",
        "images": [
          {
            "src": "/spincoater-cct.png",
            "alt": "Spin coater control circuit"
          }
        ]
      },
      {
        "heading": "What's next",
        "body": "We are currently validating spin profiles for photoresist and testing repeatability across different substrate sizes.\n\nOnce we have consistent results, we'll publish the full Arduino code and wiring diagrams for anyone wanting to build their own."
      }
    ]
  }
]

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug)
}
