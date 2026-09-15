import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Container } from '../common/Container';

interface HeroProps {
  onOpenLeadModal?: (purpose?: string) => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section
      id="overview"
      className="relative h-screen min-h-[640px] flex flex-col justify-between overflow-hidden bg-dark-950 text-ivory select-none"
    >
      {/* ─── Architectural Visual Canvas ─── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/assets/hero-elevation.png"
          alt="Aranya The Park Architectural Elevation"
          className="w-full h-full object-cover object-center scale-[1.03] animate-fade-in filter brightness-[0.48] contrast-[1.06]"
        />
        {/* Soft luxury vignettes — charcoal depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-dark-950/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,9,8,0.1)_0%,rgba(8,9,8,0.75)_100%)]" />
      </div>

      {/* ─── Top Spacer for Floating Navbar ─── */}
      <div className="relative z-10 pt-24 sm:pt-32" />

      {/* ─── Center Cinematic Typography ─── */}
      <div className="relative z-10 my-auto py-8">
        <Container className="text-center max-w-4xl">
          {/* Eyebrow */}
          <div className="mb-6 sm:mb-8">
            <span className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.35em] text-champagne-300 font-medium">
              MALAD WEST · MUMBAI
            </span>
          </div>

          {/* Editorial Title */}
          <div className="space-y-1 sm:space-y-2 mb-6 sm:mb-8">
            <h1 className="font-serif text-[clamp(3.5rem,9vw+1rem,7.5rem)] leading-[0.9] tracking-[0.16em] text-ivory font-light drop-shadow-2xl">
              ARANYA
            </h1>
            <div className="font-serif text-[clamp(1.75rem,4vw+0.5rem,3.75rem)] tracking-[0.24em] text-champagne-300/95 font-light drop-shadow-lg">
              THE PARK
            </div>
          </div>

          {/* Supporting Line */}
          <div className="mb-10 sm:mb-14">
            <span className="font-serif text-lg sm:text-xl md:text-2xl tracking-[0.25em] uppercase text-ivory/80 font-light">
              THE LUSHURY LIFE
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a
              href="#story-arrival"
              className="px-8 sm:px-10 py-3.5 sm:py-4 text-[11px] sm:text-xs font-sans font-semibold uppercase tracking-[0.22em] bg-champagne-400 hover:bg-champagne-300 text-dark-950 rounded-full transition-all duration-300 shadow-[0_8px_30px_rgba(200,169,107,0.25)] hover:shadow-[0_10px_35px_rgba(200,169,107,0.4)] cursor-pointer select-none"
            >
              EXPLORE THE STORY
            </a>
            <a
              href="#residences"
              className="px-8 sm:px-10 py-3.5 sm:py-4 text-[11px] sm:text-xs font-sans font-semibold uppercase tracking-[0.22em] text-ivory-muted hover:text-ivory border border-white/[0.12] hover:border-champagne-400/50 rounded-full transition-all duration-300 glass-panel-subtle cursor-pointer select-none"
            >
              EXPLORE RESIDENCES
            </a>
          </div>
        </Container>
      </div>

      {/* ─── Bottom Scroll Cue ─── */}
      <div className="relative z-10 pb-8 sm:pb-10 text-center">
        <a
          href="#story-arrival"
          className="inline-flex flex-col items-center gap-2 text-ivory-muted/60 hover:text-champagne-300 transition-colors cursor-pointer group"
          aria-label="Scroll to explore"
        >
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] font-medium">
            SCROLL TO EXPLORE
          </span>
          <ArrowDown size={14} className="animate-bounce group-hover:translate-y-0.5 transition-transform text-champagne-400" />
        </a>
      </div>
    </section>
  );
};
