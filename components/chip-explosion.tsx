"use client"

import React, { useEffect, useRef } from 'react';

const ChipExplosion = () => {
    // 1. Create refs for all moving parts
    const layersRef = useRef<{ [key: string]: SVGElement | null }>({});
    const containerRef = useRef<HTMLDivElement>(null);
    const mainSvgRef = useRef<SVGSVGElement>(null);

    // 2. Setup the animation logic
    useEffect(() => {
        // Reset scroll position on refresh/mount to ensure animation starts from the beginning
        if (typeof window !== 'undefined') {
            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
            }
            window.scrollTo(0, 0);
        }

        let ticking = false;

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        const handleScroll = () => {
            if (!containerRef.current) return;

            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;
            const p = scrollPercent;

            const EXPANSION = { base: 80, sub: 40, die: -10, ring: -60, lid: -120 };

            if (layersRef.current.base) layersRef.current.base.style.transform = `translateY(${p * EXPANSION.base}px)`;
            if (layersRef.current.sub) layersRef.current.sub.style.transform = `translateY(${p * EXPANSION.sub}px)`;
            if (layersRef.current.die) layersRef.current.die.style.transform = `translateY(${p * EXPANSION.die}px)`;
            if (layersRef.current.ring) layersRef.current.ring.style.transform = `translateY(${p * EXPANSION.ring}px)`;
            if (layersRef.current.lid) layersRef.current.lid.style.transform = `translateY(${p * EXPANSION.lid}px)`;

            if (layersRef.current.shadow) {
                layersRef.current.shadow.style.opacity = (0.4 - (p * 0.3)).toString();
                layersRef.current.shadow.style.transform = `scale(${0.95 + (p * 0.2)})`;
            }

            if (mainSvgRef.current) {
                const entranceDuration = 0.15;
                const entranceProgress = Math.min(p / entranceDuration, 1);
                const ease = 1 - Math.pow(1 - entranceProgress, 4);

                mainSvgRef.current.style.opacity = ease.toString();

                const scale = 0.2 + (0.8 * ease);
                const rotate = (1 - ease) * -15;
                mainSvgRef.current.style.transform = `scale(${scale}) rotate(${rotate}deg)`;

                if (layersRef.current.schematic) {
                    layersRef.current.schematic.style.opacity = ease.toString();
                }

                if (layersRef.current.schematicPath) {
                    const len = 300;
                    layersRef.current.schematicPath.style.strokeDashoffset = (len * (1 - ease)).toString();
                }

                if (layersRef.current.schematicText) {
                    const slide = (1 - ease) * -20;
                    layersRef.current.schematicText.style.transform = `translate(${230 + slide}px, 70px)`;
                    layersRef.current.schematicText.style.opacity = ease.toString();
                }
            }
        };

        window.addEventListener('scroll', onScroll);
        // Initial call - simplified, no RAf needed for initial render usually, to prevent FOUC
        handleScroll();

        return () => window.removeEventListener('scroll', onScroll);
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
                    <svg ref={mainSvgRef} viewBox="-200 -250 400 500" style={{ zIndex: 10, width: '100%', height: '100%', overflow: 'visible', opacity: 0, transform: 'scale(0.2) rotate(-15deg)' }}>
                        <defs>
                            <pattern id="circuit-pattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
                                <line x1="0" y1="0" x2="0" y2="8" stroke="#cd853f" strokeWidth="0.5" opacity="0.5" />
                                <rect x="2" y="2" width="1" height="1" fill="#cd853f" opacity="0.5" />
                            </pattern>
                            <filter id="grain-glow" x="-50%" y="-50%" width="200%" height="200%">
                                {/* Generate grainy noise - Optimized to 1 octave */}
                                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" result="noise" />
                                <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />

                                {/* Mask the source with noise to give it texture */}
                                <feComposite operator="in" in="grayNoise" in2="SourceGraphic" result="textured" />

                                {/* Add color overlay to make it gold again (since noise is gray) - actually just use SourceGraphic alpha */}
                                {/* Let's just composite the noise ON TOP of the source with 'overlay' or 'multiply' */}
                                {/* Simpler: Alpha mask. Use noise to vary opacity of the gold stroke */}
                                <feColorMatrix in="noise" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0.5" result="alphaNoise" />
                                <feComposite operator="in" in="SourceGraphic" in2="alphaNoise" result="grainySource" />

                                {/* Add Glow */}
                                <feGaussianBlur stdDeviation="1.5" in="grainySource" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="grainySource" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Shadow */}
                        <g ref={setRef('shadow')} transform="translate(0, 200)" style={{ transformOrigin: "center", willChange: "transform, opacity", filter: 'blur(8px)' }}>
                            <path d="M0,40 L80,10 L0,-20 L-80,10 Z" fill="#cd853f" />
                        </g>

                        {/* GROUP 1: BASE SUBSTRATE */}
                        <g ref={setRef('base')} className="anim-group" style={{ willChange: "transform" }}>
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
                        <g ref={setRef('sub')} className="anim-group" transform="translate(0, -10)" style={{ willChange: "transform" }}>
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
                        <g ref={setRef('die')} className="anim-group" transform="translate(0, -25)" style={{ willChange: "transform" }}>
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
                            </g>

                            {/* SCHEMATIC OVERLAY - Attached to Die Group */}
                            <g ref={setRef('schematic')} className="anim-group" style={{ pointerEvents: 'none' }}>
                                {/* The Line */}
                                <path
                                    ref={setRef('schematicPath')}
                                    d="M 0,0 L 90,0 L 120,75 L 220,75"
                                    fill="none"
                                    stroke="#eca74e"
                                    strokeWidth="1.5"
                                    strokeDasharray="300"
                                    strokeDashoffset="300"
                                    style={{ willChange: 'stroke-dashoffset', filter: 'url(#grain-glow)' }}
                                />
                                {/* The Dot at center */}
                                <circle cx="0" cy="0" r="3" fill="#eca74e" opacity="0.9" />

                                {/* The Text */}
                                <g ref={setRef('schematicText')} transform="translate(230, 70)" style={{ opacity: 0, willChange: 'transform, opacity' }}>
                                    <text x="0" y="0" fill="#eca74e" style={{ fontFamily: 'var(--font-instrument-serif), serif' }} fontSize="12" letterSpacing="4">POWERED BY</text>

                                    {/* Shopify Logo Group - Horizontal Layout */}
                                    <g transform="translate(-10, 14)">
                                        {/* Bag Icon - Shopify Green */}
                                        <g transform="scale(1.5)">
                                            <path
                                                d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.629 0 2.295-1.44 3.76-3.406 3.76-2.354 0-3.54-1.465-3.54-1.465l.646-2.086s1.245 1.066 2.28 1.066c.675 0 .975-.545.975-.932 0-1.619-2.654-1.694-2.654-4.359-.034-2.237 1.571-4.416 4.827-4.416 1.257 0 1.875.361 1.875.361l-.945 2.715-.02.01zM11.17.83c.136 0 .271.038.405.135-.984.465-2.064 1.639-2.508 3.992-.656.213-1.293.405-1.889.578C7.697 3.75 8.951.84 11.17.84V.83zm1.235 2.949v.135c-.754.232-1.583.484-2.394.736.466-1.777 1.333-2.645 2.085-2.971.193.501.309 1.176.309 2.1zm.539-2.234c.694.074 1.141.867 1.429 1.755-.349.114-.735.231-1.158.366v-.252c0-.752-.096-1.371-.271-1.871v.002zm2.992 1.289c-.02 0-.06.021-.078.021s-.289.075-.714.21c-.423-1.233-1.176-2.37-2.508-2.37h-.115C12.135.209 11.669 0 11.265 0 8.159 0 6.675 3.877 6.21 5.846c-1.194.365-2.063.636-2.16.674-.675.213-.694.232-.772.87-.075.462-1.83 14.063-1.83 14.063L15.009 24l.927-21.166z"
                                                fill="#ffffff"
                                            />
                                        </g>
                                        {/* Text - Sans serif, aligned right of icon */}
                                        <text x="45" y="25" fill="#ffffff" style={{ fontFamily: 'Arial, sans-serif' }} fontSize="28" fontWeight="bold" letterSpacing="-0.5">shopify</text>
                                    </g>
                                </g>
                            </g>
                        </g>

                        {/* GROUP 4: RETENTION FRAME */}
                        <g ref={setRef('ring')} className="anim-group" transform="translate(0, -40)" style={{ willChange: "transform" }}>
                            <path className="fill-[#0a0a0a]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M-70,5 L-70,8 L0,35 L0,32 Z" />
                            <path className="fill-[#050505]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" d="M0,32 L0,35 L70,8 L70,5 Z" />
                            <path className="fill-[#111]/90 stroke-[#e5e5e5] stroke-[1] stroke-linecap-round stroke-linejoin-round vector-effect-non-scaling-stroke" fillRule="evenodd"
                                d="M0,-22 L70,5 L0,32 L-70,5 Z M0,-12 L45,5 L0,22 L-45,5 Z" />
                            <circle cx="-60" cy="5" r="1.5" fill="#cd853f" transform="scale(1 0.5) rotate(30)" />
                            <circle cx="60" cy="5" r="1.5" fill="#cd853f" transform="scale(1 0.5) rotate(-30)" />
                        </g>

                        {/* GROUP 5: HEAT SPREADER */}
                        <g ref={setRef('lid')} className="anim-group" transform="translate(0, -55)" style={{ willChange: "transform" }}>
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
        .animate-rotate-slow {
          animation: rotate-slow 120s linear infinite;
        }
      `}</style>
        </div >
    );
};

export default ChipExplosion;
