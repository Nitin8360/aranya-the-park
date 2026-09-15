import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, CheckCircle2, Send, MessageSquare, Phone, ShieldCheck } from 'lucide-react';
import { Button } from './Button';
import { projectData } from '../../data/projectData';
import { submitEnquiry } from '../../services/enquiryService';

const POPUP_DISMISSED_KEY = 'aranya_enquiry_popup_dismissed';

type ConfigurationChoice = '2 BHK' | '3 BHK' | '4 BHK' | 'All Configurations';

interface EnquiryPopupProps {
  /** Optional delay in milliseconds before triggering the popup (default: 10000ms = 10s) */
  delayMs?: number;
}

/**
 * EnquiryPopup — Global Automatic Luxury Consultation Modal.
 * Appears smoothly exactly 10 seconds after page load.
 * Dismissal is persisted in sessionStorage so visitors are not repeatedly interrupted.
 */
export const EnquiryPopup: React.FC<EnquiryPopupProps> = ({ delayMs = 10000 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [configuration, setConfiguration] = useState<ConfigurationChoice>('2 BHK');
  const [consentAgreed, setConsentAgreed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // 10-Second Lifecycle Timer
  useEffect(() => {
    // Expose developer trigger helpers on window for instant testing
    if (typeof window !== 'undefined') {
      (window as any).__openEnquiryPopup = () => setIsOpen(true);
      (window as any).__resetEnquiryPopup = () => {
        try {
          sessionStorage.removeItem(POPUP_DISMISSED_KEY);
        } catch {}
        setIsOpen(true);
      };
    }

    // Check if dismissed in this browser session
    try {
      if (sessionStorage.getItem(POPUP_DISMISSED_KEY) === 'true') {
        console.info('[Aranya The Park] Enquiry popup is suppressed because it was previously closed in this session. Open a new tab or run sessionStorage.clear() to re-enable.');
        return;
      }
    } catch {
      // Storage fallback
    }

    console.info(`[Aranya The Park] Global enquiry popup scheduled to appear in ${delayMs / 1000}s...`);

    const timer = setTimeout(() => {
      try {
        if (sessionStorage.getItem(POPUP_DISMISSED_KEY) === 'true') {
          return;
        }
      } catch {
        // Storage fallback
      }

      console.info('[Aranya The Park] 10s elapsed — opening enquiry popup.');
      setIsOpen(true);
    }, delayMs);

    return () => {
      clearTimeout(timer);
    };
  }, [delayMs]);

  // Smooth Dismissal & Session Flag
  const handleClose = useCallback(() => {
    setIsClosing(true);
    try {
      sessionStorage.setItem(POPUP_DISMISSED_KEY, 'true');
    } catch {
      // Storage fallback
    }

    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  }, []);

  // Keyboard Navigation: ESC to close & Focus Trapping
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  // Lock Body Scroll when Modal is active
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Move focus to first input once open
  useEffect(() => {
    if (isOpen && !isSubmitted && !isClosing) {
      const focusTimer = setTimeout(() => {
        firstInputRef.current?.focus();
      }, 200);
      return () => clearTimeout(focusTimer);
    }
  }, [isOpen, isSubmitted, isClosing]);

  // Form Submission Logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim() || !consentAgreed) return;

    setIsSubmitting(true);

    try {
      const response = await submitEnquiry({
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        email: email.trim() || undefined,
        configuration,
        contactMethod: 'WhatsApp',
        purpose: 'Automated 10s Enquiry Consultation',
      });

      setReferenceId(response.leadId);
      setIsSubmitted(true);

      try {
        sessionStorage.setItem(POPUP_DISMISSED_KEY, 'true');
      } catch {
        // Storage write fallback
      }
    } catch (err) {
      console.error('Enquiry submission failed', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3.5 sm:p-6 overflow-x-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-popup-title"
    >
      {/* ─── Dark Translucent Backdrop with Blur ─── */}
      <div
        className={`fixed inset-0 bg-dark-950/85 backdrop-blur-md transition-opacity duration-300 cursor-pointer ${
          isClosing ? 'opacity-0' : 'animate-fade-in'
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* ─── Premium Glass Modal Container ─── */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-[520px] bg-dark-900/95 border border-white/[0.14] rounded-lg sm:rounded-xl shadow-[0_25px_80px_rgba(0,0,0,0.85)] max-h-[90vh] overflow-y-auto overflow-touch p-5 sm:p-8 z-10 pb-safe transition-all duration-300 ${
          isClosing ? 'opacity-0 scale-95 translate-y-2' : 'animate-scale-in'
        }`}
      >
        {/* ─── Close Button (×) ─── */}
        <button
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-2 text-ivory-muted/70 hover:text-ivory hover:bg-white/[0.08] rounded-full transition-all duration-200 cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
          aria-label="Close enquiry popup"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        {isSubmitted ? (
          /* ─── Confirmed Success State ─── */
          <div className="py-6 sm:py-8 text-center space-y-5 animate-in fade-in duration-300">
            <div className="w-16 h-16 mx-auto rounded-full bg-champagne-400/10 border border-champagne-400/30 flex items-center justify-center text-champagne-300">
              <CheckCircle2 size={32} />
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-champagne-300 font-semibold">
                Direct Developer Desk
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl text-ivory font-light">
                Thank You, {fullName}
              </h4>
              <p className="text-ivory-muted font-sans text-xs sm:text-sm leading-relaxed max-w-sm mx-auto font-light">
                Your private enquiry regarding <strong className="text-ivory">{configuration}</strong> at Aranya The Park has been registered under reference <strong className="text-champagne-300 font-medium">{referenceId}</strong>.
              </p>
            </div>

            {/* Quick Action Touchpoint */}
            <div className="pt-3 flex flex-col gap-2.5 max-w-sm mx-auto">
              <a
                href={`https://wa.me/919769766500?text=${encodeURIComponent(
                  `Hello Aranya The Park Team, I am ${fullName} (${referenceId}). I would like to schedule a private consultation and receive floor plans for ${configuration}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#25D366] text-white font-sans text-xs uppercase tracking-widest font-bold inline-flex items-center justify-center gap-2 hover:brightness-105 transition-all rounded-[3px] shadow-md cursor-pointer"
              >
                <MessageSquare size={15} />
                <span>Connect on WhatsApp</span>
              </a>

              <button
                onClick={handleClose}
                className="w-full py-2.5 px-4 text-ivory-muted hover:text-ivory text-xs font-sans tracking-wider uppercase transition-colors cursor-pointer"
              >
                Return to Website
              </button>
            </div>
          </div>
        ) : (
          /* ─── Enquiry Form ─── */
          <div>
            {/* Modal Header Lockup */}
            <div className="text-center mb-6 sm:mb-7 pr-6">
              <img
                src="/assets/branding/aranya-crest.png"
                alt="Aranya Crest"
                className="h-7 w-7 mx-auto mb-2 object-contain opacity-90"
              />
              <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.28em] text-champagne-300 uppercase block mb-1">
                ENQUIRE ABOUT
              </span>
              <h3
                id="enquiry-popup-title"
                className="font-serif text-2xl sm:text-3xl text-ivory font-light tracking-wide uppercase"
              >
                ARANYA THE PARK
              </h3>
              <p className="text-xs sm:text-sm text-ivory-muted/80 font-sans font-light mt-1.5 max-w-xs mx-auto">
                Schedule a private consultation / site visit.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-ivory-muted/80 font-medium block">
                  Full Name <span className="text-champagne-400">*</span>
                </label>
                <input
                  ref={firstInputRef}
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Vikram Malhotra"
                  className="w-full bg-white/[0.04] border border-white/[0.12] rounded-[3px] px-3.5 py-2.5 text-ivory placeholder:text-ivory-muted/30 focus:outline-none focus:border-champagne-400 focus:bg-white/[0.06] transition-all text-base sm:text-sm"
                />
              </div>

              {/* Mobile Number */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-ivory-muted/80 font-medium block">
                  Mobile Number <span className="text-champagne-400">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-ivory-muted/50 font-mono text-xs">+91</span>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="10-digit mobile number"
                    className="w-full bg-white/[0.04] border border-white/[0.12] rounded-[3px] pl-12 pr-3.5 py-2.5 text-ivory placeholder:text-ivory-muted/30 focus:outline-none focus:border-champagne-400 focus:bg-white/[0.06] transition-all text-base sm:text-sm"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-ivory-muted/80 font-medium block">
                  Email Address <span className="text-ivory-muted/50 lowercase">(optional for digital brochure)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-white/[0.04] border border-white/[0.12] rounded-[3px] px-3.5 py-2.5 text-ivory placeholder:text-ivory-muted/30 focus:outline-none focus:border-champagne-400 focus:bg-white/[0.06] transition-all text-base sm:text-sm"
                />
              </div>

              {/* Interested Configuration */}
              <div className="space-y-1.5 pt-0.5">
                <label className="text-[11px] uppercase tracking-wider text-ivory-muted/80 font-medium block">
                  Configuration
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['2 BHK', '3 BHK', '4 BHK', 'All Configurations'] as ConfigurationChoice[]).map((cfg) => (
                    <button
                      type="button"
                      key={cfg}
                      onClick={() => setConfiguration(cfg)}
                      className={`py-2 px-2 text-center rounded-[3px] border font-sans text-xs tracking-wider transition-all cursor-pointer ${
                        configuration === cfg
                          ? 'border-champagne-400 bg-champagne-400 text-dark-950 font-semibold shadow-sm'
                          : 'border-white/[0.08] bg-white/[0.02] text-ivory-muted hover:text-ivory hover:border-white/[0.2]'
                      }`}
                    >
                      {cfg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="pt-1.5 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="popup-consent-check"
                  checked={consentAgreed}
                  onChange={(e) => setConsentAgreed(e.target.checked)}
                  className="mt-0.5 accent-[#C8A96B] cursor-pointer shrink-0"
                  required
                />
                <label
                  htmlFor="popup-consent-check"
                  className="text-[10px] text-ivory-muted/65 leading-relaxed font-light cursor-pointer select-none"
                >
                  I authorize representatives of Aranya The Park (Zaveri Realty & BKM Mindspace) to contact me via Call, WhatsApp, or Email regarding floor plans and private site visits. Zero brokerage.
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="gold"
                  size="md"
                  disabled={isSubmitting || !consentAgreed}
                  className="w-full justify-center tracking-wider uppercase font-semibold text-xs py-3"
                  icon={<Send size={13} />}
                >
                  {isSubmitting ? 'Sending Enquiry…' : 'SEND ENQUIRY'}
                </Button>
              </div>

              {/* Footer Trust Bar */}
              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[10px] text-ivory-muted/65">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-champagne-400" />
                  <span>MahaRERA: <strong className="text-ivory">{projectData.mahaRera}</strong></span>
                </div>
                <a
                  href={`tel:${projectData.phone.replace(/\s+/g, '')}`}
                  className="text-champagne-300 hover:text-champagne-200 uppercase tracking-wider flex items-center gap-1 font-medium transition-colors"
                >
                  <Phone size={10} />
                  <span>{projectData.phone}</span>
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
