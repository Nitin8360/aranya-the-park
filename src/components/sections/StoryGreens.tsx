import React from 'react';
import { Container } from '../common/Container';

/**
 * Story Chapter 02 — A New Kind of Luxury
 * Editorial storytelling with large typography and imagery:
 * "A NEW KIND OF LUXURY" -> "40% OPEN GREEN SPACES"
 */
export const StoryGreens: React.FC = () => {
  return (
    <section id="story-greens" className="section-spacing bg-dark-900 text-ivory relative overflow-hidden">
      {/* Background ambient warmth */}
      <div className="absolute top-1/3 -right-48 w-[600px] h-[600px] bg-champagne-400/[0.02] rounded-full blur-3xl pointer-events-none" />

      <Container>
        {/* Chapter Eyebrow */}
        <div className="text-center mb-16 sm:mb-24">
          <span className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.4em] text-champagne-300 font-medium block mb-6">
            CHAPTER 02 · BIOPHILIC SANCTUARY
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight text-ivory leading-[1.05] max-w-4xl mx-auto uppercase">
            A Newer Kind<br />The Lushury
          </h2>
        </div>

        {/* Cinematic Dual Composition: Story Number & Visual Landscape */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: 40% Large Editorial Stat & Narrative */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-2">
              <span className="font-serif text-7xl sm:text-8xl lg:text-9xl text-champagne-300 font-light tracking-tight leading-none block">
                40%
              </span>
              <span className="font-sans text-xs sm:text-sm uppercase tracking-[0.25em] text-ivory font-semibold block">
                Open Green Spaces
              </span>
            </div>

            <p className="font-sans text-sm sm:text-base text-ivory-muted font-light leading-relaxed">
              While the world races behind fleeting luxuries, we bring you a different kind — <strong className="text-ivory font-medium">The Lushury</strong>. Where life is lush with over 40% open green landscapes, sensory aroma lawns, and tranquil courtyards curated by <strong className="text-ivory font-medium">BeyondGreen</strong>.
            </p>

            <div className="pt-4 border-t border-white/[0.08] flex items-center gap-8">
              <div>
                <span className="font-serif text-2xl text-ivory font-light block">11 Ft.</span>
                <span className="text-[10px] font-sans uppercase tracking-widest text-ivory-muted/70">Ceiling Clearance</span>
              </div>
              <div className="w-px h-8 bg-white/[0.08]" />
              <div>
                <span className="font-serif text-2xl text-ivory font-light block">100%</span>
                <span className="text-[10px] font-sans uppercase tracking-widest text-ivory-muted/70">Vastu Aligned</span>
              </div>
            </div>
          </div>

          {/* Right Column: Expansive Panoramic Image */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-white/[0.06] group">
              <img
                src="/assets/lifestyle-park-greens.png"
                alt="Verdant parkscapes at Aranya The Park"
                className="w-full h-full object-cover object-center filter brightness-[0.88] group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[11px] font-sans text-ivory-muted uppercase tracking-wider">
                <span>BeyondGreen Landscape Architecture</span>
                <span>Malad West</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
