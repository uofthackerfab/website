"use client"

import React, { useEffect, useRef } from 'react';

const ChipExplosion = () => {
    // 1. Create refs for all moving parts
    const layersRef = useRef<{ [key: string]: SVGElement | null }>({});
    const containerRef = useRef<HTMLDivElement>(null);
    const mainSvgRef = useRef<SVGSVGElement>(null);

    // 2. Setup the animation logic
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            // Calculate scroll progress (0.0 to 1.0)
            // We want the progress relative to this component's container

            // The container is 300vh tall.
            // We want animation to start when container enters (or is at top) and end when it leaves.
            // However, the user's snippet used window.scrollY / docHeight.
            // Let's stick to the user's snippet logic for now as requested, 
            // but keep in mind it might need adjustment if the component isn't the whole page.
            // User snippet:
            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            // Guard against division by zero
            const scrollPercent = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;

            const p = scrollPercent;

            // Define expansion distances
            const EXPANSION = { base: 80, sub: 40, die: -10, ring: -70, lid: -140 };

            // Apply transforms via refs directly (performance optimization)
            if (layersRef.current.base) layersRef.current.base.style.transform = `translateY(${p * EXPANSION.base}px)`;
            if (layersRef.current.sub) layersRef.current.sub.style.transform = `translateY(${p * EXPANSION.sub}px)`;
            if (layersRef.current.die) layersRef.current.die.style.transform = `translateY(${p * EXPANSION.die}px)`;
            if (layersRef.current.ring) layersRef.current.ring.style.transform = `translateY(${p * EXPANSION.ring}px)`;
            if (layersRef.current.lid) layersRef.current.lid.style.transform = `translateY(${p * EXPANSION.lid}px)`;

            // Shadow logic
            if (layersRef.current.shadow) {
                layersRef.current.shadow.style.opacity = (0.4 - (p * 0.3)).toString();
                layersRef.current.shadow.style.transform = `scale(${0.95 + (p * 0.2)})`;
                layersRef.current.shadow.style.filter = `blur(${8 + (p * 12)}px)`;
            }

            // Main SVG Blur Logic
            // "Less intense" -> 1.5px max
            // "Diff kinda blur" -> Let's try clearing it up very fast, so it feels like an immediate focus snap.
            if (mainSvgRef.current) {
                const blurAmount = Math.max(0, 1.5 - (p * 10));
                mainSvgRef.current.style.filter = `blur(${blurAmount}px)`;
                // Optional: Add a slight opacity change for a "focus" feel?
                // mainSvgRef.current.style.opacity = Math.min(1, 0.8 + (p * 0.5)).toString();
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 3. Helper to assign refs easily
    const setRef = (key: string) => (el: SVGElement | null) => {
        layersRef.current[key] = el;
    };

    return (
        <div ref={containerRef} className="relative w-full h-[300vh] text-[#e5e5e5] font-serif overflow-hidden">
            {/* Viewport Wrapper (Fixed) */}
            <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center overflow-hidden z-0">

                <div className="relative w-[800px] h-[800px] flex justify-center items-center z-10 mix-blend-screen opacity-90">
                    <svg ref={mainSvgRef} viewBox="-200 -250 400 500" style={{ zIndex: 10, width: '100%', height: '100%', overflow: 'visible', transition: 'filter 0.1s ease-out' }}>
                        <defs>
                            <pattern id="circuit-pattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
                                <line x1="0" y1="0" x2="0" y2="8" stroke="#cd853f" strokeWidth="0.5" opacity="0.5" />
                                <rect x="2" y="2" width="1" height="1" fill="#cd853f" opacity="0.5" />
                            </pattern>
                        </defs>

                        {/* Shadow */}
                        <g ref={setRef('shadow')} transform="translate(0, 200)" style={{ transformOrigin: "center", willChange: "transform, opacity, filter" }}>
                            <path d="M0,40 L80,10 L0,-20 L-80,10 Z" fill="#cd853f" />
                        </g>

                        {/* GROUP 1: BASE SUBSTRATE */}
                        <g ref={setRef('base')} className="anim-group" style={{ willChange: "transform", transition: "transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}>
                            <path className="fill-[#0a0a0a]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M-80,10 L-80,25 L0,55 L0,40 Z" />
                            <path className="fill-[#050505]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M0,40 L0,55 L80,25 L80,10 Z" />
                            <path className="fill-[#111]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M0,-20 L80,10 L0,40 L-80,10 Z" />

                            <g className="stroke-[#cd853f] stroke-[0.8] stroke-linecap-round stroke-linejoin-round">
                                <line x1="-70" y1="18" x2="-70" y2="23" />
                                <line x1="-60" y1="22" x2="-60" y2="27" />
                                <line x1="-50" y1="26" x2="-50" y2="31" />
                                <line x1="-40" y1="30" x2="-40" y2="35" />
                                <line x1="-30" y1="34" x2="-30" y2="39" />
                                <line x1="-20" y1="38" x2="-20" y2="43" />
                                <line x1="-10" y1="42" x2="-10" y2="47" />
                                <line x1="10" y1="42" x2="10" y2="47" />
                                <line x1="20" y1="38" x2="20" y2="43" />
                                <line x1="30" y1="34" x2="30" y2="39" />
                                <line x1="40" y1="30" x2="40" y2="35" />
                                <line x1="50" y1="26" x2="50" y2="31" />
                                <line x1="60" y1="22" x2="60" y2="27" />
                                <line x1="70" y1="18" x2="70" y2="23" />
                            </g>
                        </g>

                        {/* GROUP 2: INTERPOSER */}
                        <g ref={setRef('sub')} className="anim-group" transform="translate(0, -10)" style={{ willChange: "transform", transition: "transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}>
                            <path className="fill-[#0a0a0a]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M-65,5 L-65,8 L0,32 L0,29 Z" />
                            <path className="fill-[#050505]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M0,29 L0,32 L65,8 L65,5 Z" />
                            <path className="fill-[#111]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M0,-20 L65,5 L0,29 L-65,5 Z" />

                            <g transform="translate(-35, 0)" fill="#3e2723" stroke="#cd853f" strokeWidth="0.5">
                                <path d="M0,0 L5,2 L0,4 L-5,2 Z" />
                            </g>
                            <g transform="translate(35, 0)" fill="#3e2723" stroke="#cd853f" strokeWidth="0.5">
                                <path d="M0,0 L5,2 L0,4 L-5,2 Z" />
                            </g>
                            <path className="stroke-[#cd853f] stroke-[0.8] stroke-linecap-round stroke-linejoin-round" d="M-20,10 L-10,14 L0,10 M20,10 L10,14 L0,10" fill="none" opacity="0.8" />
                        </g>

                        {/* GROUP 3: SILICON DIE */}
                        <g ref={setRef('die')} className="anim-group" transform="translate(0, -25)" style={{ willChange: "transform", transition: "transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}>
                            <path className="fill-[#0a0a0a]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M-30,0 L-30,3 L0,14 L0,11 Z" />
                            <path className="fill-[#050505]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M0,11 L0,14 L30,3 L30,0 Z" />
                            <path className="fill-[#1a1a1a]/95 stroke-[#cd853f] stroke-[0.8] stroke-linecap-round stroke-linejoin-round" d="M0,-11 L30,0 L0,11 L-30,0 Z" />
                            <path fill="url(#circuit-pattern)" d="M0,-11 L30,0 L0,11 L-30,0 Z" />
                            <g transform="translate(-45, 8)">
                                <path className="fill-[#0a0a0a]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M-8,0 L-8,2 L0,5 L0,3 Z" />
                                <path className="fill-[#050505]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M0,3 L0,5 L8,2 L8,0 Z" />
                                <path className="fill-[#111]/90 stroke-[#cd853f] stroke-[0.8] stroke-linecap-round stroke-linejoin-round" d="M0,-3 L8,0 L0,3 L-8,0 Z" />
                            </g>
                            <g transform="translate(45, 8)">
                                <path className="fill-[#0a0a0a]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M-8,0 L-8,2 L0,5 L0,3 Z" />
                                <path className="fill-[#050505]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M0,3 L0,5 L8,2 L8,0 Z" />
                                <path className="fill-[#111]/90 stroke-[#cd853f] stroke-[0.8] stroke-linecap-round stroke-linejoin-round" d="M0,-3 L8,0 L0,3 L-8,0 Z" />
                            </g>
                        </g>

                        {/* GROUP 4: RETENTION FRAME */}
                        <g ref={setRef('ring')} className="anim-group" transform="translate(0, -40)" style={{ willChange: "transform", transition: "transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}>
                            <path className="fill-[#0a0a0a]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M-70,5 L-70,8 L0,35 L0,32 Z" />
                            <path className="fill-[#050505]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M0,32 L0,35 L70,8 L70,5 Z" />
                            <path className="fill-[#111]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" fillRule="evenodd"
                                d="M0,-22 L70,5 L0,32 L-70,5 Z M0,-12 L45,5 L0,22 L-45,5 Z" />
                            <circle cx="-60" cy="5" r="1.5" fill="#cd853f" transform="scale(1 0.5) rotate(30)" />
                            <circle cx="60" cy="5" r="1.5" fill="#cd853f" transform="scale(1 0.5) rotate(-30)" />
                        </g>

                        {/* GROUP 5: HEAT SPREADER */}
                        <g ref={setRef('lid')} className="anim-group" transform="translate(0, -55)" style={{ willChange: "transform", transition: "transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}>
                            <path className="fill-[#0a0a0a]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M-70,5 L-70,12 L0,39 L0,32 Z" />
                            <path className="fill-[#050505]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M0,32 L0,39 L70,12 L70,5 Z" />
                            <path className="fill-[#111]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M0,-22 L70,5 L0,32 L-70,5 Z" />
                            <g transform="translate(0, -2)">
                                <path className="fill-[#0a0a0a]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M-20,0 L-20,3 L0,11 L0,8 Z" />
                                <path className="fill-[#050505]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M0,8 L0,11 L20,3 L20,0 Z" />
                                <path className="fill-[#111]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M0,-8 L20,0 L0,8 L-20,0 Z" />
                            </g>
                        </g>

                    </svg>
                </div>



            </div>

            <style jsx global>{`
        @keyframes pulse-glow {
          0% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(1.1); opacity: 0.5; }
        }
        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 10s ease-in-out infinite alternate;
        }
        .animate-rotate-slow {
          animation: rotate-slow 120s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default ChipExplosion;
