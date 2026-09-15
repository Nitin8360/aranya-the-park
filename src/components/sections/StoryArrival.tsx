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

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: isMobile ? '+=70%' : '+=130%',
          pin: pinRef.current,
          scrub: isMobile ? 0.6 : 1,
          anticipatePin: 1,
        },
      });

      // Phase 1: Gentle scale of arrival visual & fade text 1 out
      tl.to(img1Ref.current, {
        scale: isMobile ? 1.06 : 1.12,
        ease: 'none',
      }, 0);

      tl.to(text1Ref.current, {
        opacity: 0,
        y: isMobile ? -20 : -35,
        ease: 'power1.out',
      }, 0.12);

      // Phase 2: Fade in architectural image 2 with subtle zoom
      tl.fromTo(img2Ref.current, 
        { opacity: 0, scale: isMobile ? 1.04 : 1.08 },
        { opacity: 1, scale: 1, ease: 'power1.inOut' },
        0.28
      );

      // Phase 3: Reveal second typography layer
      tl.fromTo(text2Ref.current,
        { opacity: 0, y: isMobile ? 25 : 40 },
        { opacity: 1, y: 0, ease: 'power2.out' },
        0.48
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="story-arrival" ref={sectionRef} className="relative bg-dark-950 text-ivory">
      <div ref={pinRef} className="relative h-[100dvh] min-h-[100svh] sm:h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Layer 1: Grand Arrival Visual — Warm, Bright & Inviting */}
        <div className="absolute inset-0 z-0">
          <img
            ref={img1Ref}
            src="/assets/grand-lobby.png"
            alt="Aranya The Park Grand Arrival Lobby"
            className="w-full h-full object-cover object-center filter brightness-[0.80] sm:brightness-[0.84] contrast-[1.03] saturate-[1.05]"
          />
          {/* Subtle warm architectural vignette — early evening light */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950/85 via-dark-950/15 to-dark-950/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,9,8,0)_30%,rgba(8,9,8,0.55)_100%)]" />
        </div>

        {/* Layer 2: Architectural Elevation Reveal */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <picture>
            <source media="(max-width: 1023px)" srcSet="/assets/hero-elevation-mobile.png" />
            <img
              ref={img2Ref}
              src="/assets/hero-elevation.png"
              alt="Aranya The Park Architectural Elevation"
              className="w-full h-full object-cover object-top sm:object-center filter brightness-[0.72] sm:brightness-[0.74] contrast-[1.04] opacity-0"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950/85 via-dark-950/20 to-dark-950/50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,9,8,0)_30%,rgba(8,9,8,0.55)_100%)]" />
        </div>

        {/* Text Layer 1: "THE LUSHURY LIFE" */}
        <div ref={text1Ref} className="relative z-20 text-center px-5 sm:px-6 max-w-4xl mx-auto drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
          <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.4em] text-champagne-300 block mb-4 sm:mb-6 font-medium">
            CHAPTER 01 · THE ARRIVAL
          </span>
          <h2 className="font-serif text-3xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.14em] text-ivory font-light leading-[0.96] uppercase drop-shadow-2xl">
            The Lushury Life
          </h2>
          <p className="font-sans text-[11px] sm:text-sm uppercase tracking-[0.22em] text-ivory/90 mt-4 sm:mt-6 font-light">
            Behind Evershine Mall · Serviced by an 18.3-Metre Boulevard
          </p>
        </div>

        {/* Text Layer 2: Revealed Architectural Paradigm */}
        <div ref={text2Ref} className="absolute z-20 text-center px-5 sm:px-6 max-w-3xl mx-auto opacity-0 pointer-events-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
          <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.4em] text-champagne-300 block mb-4 sm:mb-6 font-medium">
            ARCHITECTURAL SCALE
          </span>
          <h3 className="font-serif text-2xl sm:text-5xl md:text-6xl text-ivory font-light leading-tight mb-4 sm:mb-6">
            Where Space, Air & Light Reclaim Their True Meaning
          </h3>
          <p className="font-sans text-xs sm:text-base text-ivory/90 font-light leading-relaxed max-w-2xl mx-auto">
            A sanctuary secluded from city cacophony, rising tall on Malad West's most prestigious boulevard.
          </p>
        </div>
      </div>
    </div>
  );
};
