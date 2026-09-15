import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'OVERVIEW', href: '#overview' },
  { label: 'RESIDENCES', href: '#residences' },
  { label: '3D EXPERIENCE', href: '#virtual-tour' },
  { label: 'AMENITIES', href: '#amenities' },
  { label: 'FLOOR PLANS', href: '#floor-plans' },
  { label: 'LOCATION', href: '#location' },
] as const;

interface NavbarProps {
  onOpenLeadModal?: (purpose?: string) => void;
  onOpenFloorPlansModal?: () => void;
  onOpenLocationModal?: () => void;
}

/**
 * Navbar — Floating Modern Glass Luxury Navigation.
 * Initially blends seamlessly into the cinematic hero.
 * Morphs into a floating glass architectural pill upon scrolling.
 */
export const Navbar: React.FC<NavbarProps> = ({
  onOpenLeadModal,
  onOpenFloorPlansModal,
  onOpenLocationModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const closeMobile = useCallback(() => setIsMobileOpen(false), []);

  const handleNavLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    label: string,
    isMobile: boolean = false
  ) => {
    if (label === 'FLOOR PLANS' && onOpenFloorPlansModal) {
      e.preventDefault();
      if (isMobile) closeMobile();
      onOpenFloorPlansModal();
      return;
    }
    if (label === 'LOCATION' && onOpenLocationModal) {
      e.preventDefault();
      if (isMobile) closeMobile();
      onOpenLocationModal();
      return;
    }
    if (isMobile) {
      closeMobile();
    }
  };

  return (
    <>
      {/* ─── Floating Modern Glass Luxury Navbar ─── */}
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-out flex justify-center ${
          isScrolled
            ? 'top-3 sm:top-4 px-4 sm:px-6'
            : 'top-0 px-0 py-6 sm:py-8 bg-gradient-to-b from-dark-950/80 via-dark-950/20 to-transparent'
        }`}
        role="banner"
      >
        <div
          className={`w-full transition-all duration-500 ease-out ${
            isScrolled
              ? 'max-w-6xl glass-navbar rounded-full px-6 sm:px-8 py-2.5 sm:py-3 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)]'
              : 'max-w-7xl px-6 sm:px-8'
          } flex items-center justify-between`}
        >
          {/* ─── Brandmark ─── */}
          <a
            href="#"
            className="flex items-center gap-2 group select-none cursor-pointer"
            aria-label="Aranya The Park — Home"
          >
            <span className="font-serif tracking-[0.28em] text-lg sm:text-xl text-ivory group-hover:text-champagne-300 transition-colors uppercase font-light">
              ARANYA
            </span>
          </a>

          {/* ─── Desktop Navigation Links ─── */}
          <nav
            className="hidden lg:flex items-center gap-7 xl:gap-9"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, link.label, false)}
                className="relative text-[11px] font-sans font-medium tracking-[0.2em] uppercase text-ivory-muted hover:text-ivory transition-colors duration-300 py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-champagne-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* ─── Desktop Primary CTA ─── */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={() => (onOpenLeadModal ? onOpenLeadModal('Navbar Inquiry') : undefined)}
              className="px-5 py-2 text-[10px] font-sans font-semibold tracking-[0.22em] uppercase text-champagne-300 hover:text-dark-950 hover:bg-champagne-400 border border-champagne-400/40 hover:border-champagne-400 rounded-full transition-all duration-300 cursor-pointer select-none"
            >
              ENQUIRE
            </button>
          </div>

          {/* ─── Mobile Menu Toggle ─── */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-ivory hover:text-champagne-300 transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label={isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      {/* ─── Mobile Fullscreen Editorial Drawer ─── */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ${
          isMobileOpen ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMobileOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-dark-950/98 backdrop-blur-2xl transition-opacity duration-500"
          onClick={closeMobile}
        />

        {/* Top Header Bar inside Drawer */}
        <div className="relative z-20 flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
          <div className="flex flex-col">
            <span className="font-serif tracking-[0.24em] text-xl text-ivory uppercase font-light">
              ARANYA
            </span>
            <span className="text-[9px] font-sans font-medium tracking-[0.35em] uppercase text-champagne-400/80 -mt-0.5">
              THE PARK · THE LUSHURY LIFE
            </span>
          </div>

          <button
            onClick={closeMobile}
            className="p-2 text-ivory-muted hover:text-ivory transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer"
            aria-label="Close menu"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Menu Items with Generous Spacing */}
        <div className="relative z-10 flex flex-col justify-between h-[calc(100%-80px)] px-8 py-10 overflow-y-auto overflow-touch">
          <nav className="flex flex-col space-y-7 pt-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, link.label, true)}
                className="font-serif text-2xl sm:text-3xl text-ivory/90 hover:text-champagne-300 tracking-[0.12em] transition-colors uppercase font-light"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-8 pb-4 space-y-4">
            <button
              onClick={() => {
                closeMobile();
                if (onOpenLeadModal) onOpenLeadModal('Mobile Navigation Inquiry');
              }}
              className="w-full py-4 text-xs font-sans font-semibold tracking-[0.2em] uppercase text-dark-950 bg-champagne-400 hover:bg-champagne-300 rounded-full transition-all duration-300 cursor-pointer text-center"
            >
              ENQUIRE NOW
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
