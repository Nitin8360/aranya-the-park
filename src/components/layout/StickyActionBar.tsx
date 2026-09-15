import React from 'react';
import { Phone, Calendar, MessageSquare } from 'lucide-react';
import { projectData } from '../../data/projectData';

interface StickyActionBarProps {
  onOpenLeadModal: (purpose?: string) => void;
}

export const StickyActionBar: React.FC<StickyActionBarProps> = ({
  onOpenLeadModal,
}) => {
  const whatsappUrl = `https://wa.me/919769766500?text=${encodeURIComponent(
    'Hello, I would like to schedule a private preview of Aranya The Park, Malad West.'
  )}`;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:bottom-6 lg:right-8 lg:left-auto pointer-events-none">
      <div className="pointer-events-auto">
        {/* Mobile View: Floating Glass Action Bar with Safe Area */}
        <div className="lg:hidden px-4 pb-4 pb-safe">
          <div className="grid grid-cols-3 glass-action-bar rounded-full border border-white/[0.1] divide-x divide-white/[0.08] overflow-hidden">
            <a
              href={projectData.phoneRaw}
              className="flex flex-col items-center justify-center py-3 min-h-[46px] text-center text-ivory hover:text-champagne-300 active:bg-white/5 transition-colors"
              aria-label="Call concierge desk"
            >
              <Phone size={15} className="mb-0.5 text-champagne-400" />
              <span className="text-[9px] font-sans uppercase tracking-[0.18em] font-semibold">
                CALL
              </span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center py-3 min-h-[46px] text-center text-ivory hover:text-champagne-300 active:bg-white/5 transition-colors"
              aria-label="Connect on WhatsApp"
            >
              <MessageSquare size={15} className="mb-0.5 text-[#25D366]" />
              <span className="text-[9px] font-sans uppercase tracking-[0.18em] font-semibold">
                WHATSAPP
              </span>
            </a>

            <button
              onClick={() => onOpenLeadModal('Mobile Quick Action')}
              className="flex flex-col items-center justify-center py-3 min-h-[46px] text-center bg-champagne-400 text-dark-950 hover:bg-champagne-300 active:scale-[0.98] transition-all cursor-pointer font-bold"
              aria-label="Open enquiry form"
            >
              <Calendar size={15} className="mb-0.5 text-dark-950" />
              <span className="text-[9px] font-sans uppercase tracking-[0.18em]">
                ENQUIRE
              </span>
            </button>
          </div>
        </div>

        {/* Desktop View: Refined Floating Glass Luxury Pill */}
        <div className="hidden lg:flex items-center gap-2 p-2 glass-action-bar rounded-full border border-white/[0.1] shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
          <a
            href={projectData.phoneRaw}
            className="flex items-center gap-2 px-4 py-2 text-[11px] font-sans font-medium uppercase tracking-[0.16em] text-ivory hover:text-champagne-300 transition-colors"
          >
            <Phone size={13} className="text-champagne-400" />
            <span>CALL</span>
          </a>

          <span className="w-[1px] h-4 bg-white/[0.12]" />

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-[11px] font-sans font-medium uppercase tracking-[0.16em] text-ivory hover:text-champagne-300 transition-colors"
          >
            <MessageSquare size={13} className="text-[#25D366]" />
            <span>WHATSAPP</span>
          </a>

          <button
            onClick={() => onOpenLeadModal('Desktop Floating Widget')}
            className="flex items-center gap-2 px-6 py-2.5 text-[11px] font-sans font-semibold uppercase tracking-[0.2em] bg-champagne-400 hover:bg-champagne-300 text-dark-950 rounded-full transition-all duration-300 shadow-md cursor-pointer select-none"
          >
            <Calendar size={13} />
            <span>ENQUIRE</span>
          </button>
        </div>
      </div>
    </div>
  );
};
