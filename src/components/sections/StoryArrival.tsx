import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Story Chapter 01 — Arrival
 * Pinned cinematic scroll sequence:
 * Full-screen visual with "THE LUSHURY LIFE" -> image scale -> architectural reveal -> typography transition.
 */
export const StoryArrival: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLImageElement>(null);
  const img2Ref = useRef<HTMLImageElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: pinRef.current,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Phase 1: Scale initial image & fade text 1 out
      tl.to(img1Ref.current, {
        scale: 1.15,
        ease: 'none',
      }, 0);

      tl.to(text1Ref.current, {
        opacity: 0,
        y: -40,
        ease: 'power1.out',
      }, 0.15);

      // Phase 2: Fade in architectural image 2 with subtle zoom
      tl.fromTo(img2Ref.current, 
        { opacity: 0, scale: 1.08 },
        { opacity: 1, scale: 1, ease: 'power1.inOut' },
        0.3
      );

      // Phase 3: Reveal second typography layer
      tl.fromTo(text2Ref.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, ease: 'power2.out' },
        0.5
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="story-arrival" ref={sectionRef} className="relative bg-dark-950 text-ivory">
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Layer 1: Initial Grand Arrival Visual */}
        <div className="absolute inset-0 z-0">
          <img
            ref={img1Ref}
            src="/assets/grand-lobby.png"
            alt="Aranya The Park Grand Arrival"
            className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-dark-950/40" />
        </div>

        {/* Layer 2: Architectural Elevation Reveal */}
        <div className="absolute inset-0 z-10">
          <img
            ref={img2Ref}
            src="/assets/hero-elevation.png"
            alt="Aranya The Park Architectural Elevation"
            className="w-full h-full object-cover object-center filter brightness-[0.5] contrast-[1.08] opacity-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/30 to-dark-950/60" />
        </div>

        {/* Text Layer 1: "THE LUSHURY LIFE" */}
        <div ref={text1Ref} className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <span className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.4em] text-champagne-300 block mb-6 font-medium">
            CHAPTER 01 · THE ARRIVAL
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.14em] text-ivory font-light leading-[0.95] drop-shadow-2xl uppercase">
            The Lushury Life
          </h2>
          <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.25em] text-ivory-muted/70 mt-6 font-light">
            Behind Evershine Mall · Serviced by a 18.3-Metre Boulevard
          </p>
        </div>

        {/* Text Layer 2: Revealed Architectural Paradigm */}
        <div ref={text2Ref} className="absolute z-20 text-center px-6 max-w-3xl mx-auto opacity-0 pointer-events-none">
          <span className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.4em] text-champagne-300 block mb-6 font-medium">
            ARCHITECTURAL SCALE
          </span>
          <h3 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory font-light leading-tight mb-6">
            Where Space, Air & Light Reclaim Their True Meaning
          </h3>
          <p className="font-sans text-sm sm:text-base text-ivory-muted font-light leading-relaxed max-w-2xl mx-auto">
            A sanctuary secluded from city cacophony, rising tall on Malad West's most prestigious boulevard.
          </p>
        </div>
      </div>
    </div>
  );
};
