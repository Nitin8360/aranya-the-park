import React from 'react';
import {
  ShieldCheck,
  ExternalLink,
  FileCheck,
} from 'lucide-react';
import { Container } from '../common/Container';
import { developerData } from '../../data/developerData';
import { projectData } from '../../data/projectData';

interface DeveloperTrustProps {
  onOpenLeadModal?: (purpose: string, config?: string) => void;
}

export const DeveloperTrust: React.FC<DeveloperTrustProps> = ({ onOpenLeadModal }) => {
  return (
    <section id="developer" className="section-spacing bg-dark-900 relative overflow-hidden border-t border-white/[0.06]">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/4 -right-40 w-[450px] h-[450px] bg-champagne-400/[0.02] rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="font-sans text-[11px] uppercase tracking-[0.35em] text-champagne-300 font-medium block mb-4">
            DEVELOPER HERITAGE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-ivory font-light tracking-tight mb-4">
            Aranya The Park
          </h2>
          <p className="font-serif text-xl sm:text-2xl text-champagne-300/80 font-light tracking-wide mb-5">
            Zaveri Realty × BKM Mindspace
          </p>
          <p className="font-sans text-sm sm:text-base text-ivory-muted font-light leading-relaxed max-w-2xl mx-auto">
            Bringing together collective expertise in structural longevity, spatial integrity, and distinguished Mumbai residential developments.
          </p>
        </div>

        {/* Developer Narrative Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Developer Story + Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <div className="glass-panel p-8 rounded-[4px] border border-white/[0.08]">
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-champagne-300 font-medium mb-2 block">
                DEVELOPER ENTITY
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-ivory font-light mb-4">
                {developerData.entity}
              </h3>
              <p className="font-sans text-sm text-ivory-muted font-light leading-relaxed">
                {developerData.narrative}
              </p>
            </div>

            {/* Trust Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {developerData.pillars.map((pillar) => (
                <div key={pillar.title} className="p-5 rounded-[4px] bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <h4 className="font-serif text-base text-champagne-200 font-normal">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-ivory-muted/80 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: MahaRERA + Verification */}
          <div className="lg:col-span-5 space-y-8">
            {/* RERA Verification Card */}
            <div className="glass-panel p-8 sm:p-10 text-center space-y-5 rounded-[4px] border border-white/[0.08]">
              <div className="w-14 h-14 mx-auto rounded-full bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-champagne-300">
                <ShieldCheck size={28} />
              </div>
              <div>
                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-champagne-300 font-medium block mb-2">
                  STATUTORY REGISTRATION
                </span>
                <h4 className="font-serif text-2xl text-ivory font-light">MahaRERA Registered</h4>
                <div className="inline-block mt-3 px-4 py-2 bg-white/[0.04] border border-white/[0.1] font-mono text-sm text-champagne-300 font-medium rounded-[3px]">
                  {projectData.mahaRera}
                </div>
              </div>
              <a
                href={projectData.reraUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-champagne-400 hover:bg-champagne-300 text-dark-950 font-sans text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 rounded-[3px] shadow-[0_4px_16px_rgba(200,169,107,0.25)]"
              >
                <FileCheck size={14} />
                <span>Verify on MahaRERA Portal</span>
                <ExternalLink size={12} />
              </a>
            </div>

            {/* Technical Consortium */}
            <div className="p-6 rounded-[4px] bg-white/[0.02] border border-white/[0.06]">
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-champagne-300 font-medium block mb-4">
                TECHNICAL CONSORTIUM
              </span>
              <div className="grid grid-cols-2 gap-3">
                {developerData.consultants.slice(0, 6).map((partner) => (
                  <div key={partner.name} className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-[3px]">
                    <span className="text-[9px] font-sans uppercase tracking-widest text-ivory-muted/60 block mb-0.5">
                      {partner.role}
                    </span>
                    <p className="font-serif text-xs text-ivory font-light">
                      {partner.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Connect CTA */}
        {onOpenLeadModal && (
          <div className="mt-14 text-center">
            <button
              onClick={() => onOpenLeadModal('Connect with Developer', 'Developer Trust')}
              className="text-xs text-champagne-300/80 hover:text-champagne-200 uppercase tracking-widest font-sans transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <span>Connect with Developer Desk</span>
              <span>→</span>
            </button>
          </div>
        )}
      </Container>
    </section>
  );
};
