import React, { useEffect, useState, useRef } from 'react';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
} from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  description?: string;
  category?: string;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  currentIndex?: number;
  totalCount?: number;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
  description,
  category,
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false,
  currentIndex,
  totalCount,
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setZoom(1);
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext && hasNext) onNext();
      if (e.key === 'f' || e.key === 'F') toggleFullscreen();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onPrev, onNext, hasPrev, hasNext, onClose]);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.3, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.3, 0.7));
  const handleReset = () => setZoom(1);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50 && onNext && hasNext) {
      onNext();
    } else if (diff < -50 && onPrev && hasPrev) {
      onPrev();
    }
    touchStartX.current = null;
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col bg-[#05100C]/98 backdrop-blur-2xl select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-3.5 border-b border-[#C5A880]/20 bg-[#071510]/90 shrink-0">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              {category && (
                <span className="text-[10px] font-sans font-semibold text-[#C5A880] tracking-[0.2em] uppercase">
                  {category}
                </span>
              )}
              {currentIndex !== undefined && totalCount !== undefined && (
                <span className="text-[10px] text-stone-400 font-mono">
                  • {currentIndex + 1} of {totalCount}
                </span>
              )}
            </div>
            <h4 className="font-serif text-base sm:text-lg text-[#F9F7F2] font-light truncate max-w-xs sm:max-w-md">
              {title}
            </h4>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <button
            onClick={handleZoomIn}
            className="p-2 text-[#DFCA9F] hover:bg-white/10 transition-colors cursor-pointer border border-[#C5A880]/25"
            title="Zoom In"
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 text-[#DFCA9F] hover:bg-white/10 transition-colors cursor-pointer border border-[#C5A880]/25"
            title="Zoom Out"
          >
            <ZoomOut size={16} />
          </button>
          <button
            onClick={handleReset}
            className="p-2 text-[#DFCA9F] hover:bg-white/10 transition-colors cursor-pointer border border-[#C5A880]/25 hidden sm:inline-flex"
            title="Reset Zoom"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 text-[#DFCA9F] hover:bg-white/10 transition-colors cursor-pointer border border-[#C5A880]/25 hidden sm:inline-flex"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
          </button>
          <a
            href={imageUrl}
            download
            target="_blank"
            rel="noreferrer"
            className="p-2 text-[#DFCA9F] hover:bg-white/10 transition-colors cursor-pointer border border-[#C5A880]/25 inline-flex items-center"
            title="Open / Download Original"
          >
            <Download size={16} />
          </a>
          <button
            onClick={onClose}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#C5A880] hover:text-white hover:bg-white/20 transition-colors cursor-pointer ml-1 sm:ml-2 border border-[#C5A880]/40"
            title="Close Lightbox (Esc)"
            aria-label="Close Lightbox"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Image Canvas Container */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center p-2 sm:p-8">
        {/* Navigation Arrow Left */}
        {hasPrev && onPrev && (
          <button
            onClick={onPrev}
            className="absolute left-2 sm:left-6 z-20 p-2.5 sm:p-4 rounded-full bg-[#071510]/80 border border-[#C5A880]/40 text-[#DFCA9F] hover:text-white hover:bg-[#122A22] transition-all cursor-pointer shadow-xl backdrop-blur-md"
            title="Previous Image (Left Arrow)"
            aria-label="Previous Image"
          >
            <ChevronLeft size={20} className="sm:w-[22px] sm:h-[22px]" />
          </button>
        )}

        {/* Scaled Image */}
        <div
          className="transition-transform duration-200 ease-out origin-center flex items-center justify-center max-w-full max-h-full"
          style={{ transform: `scale(${zoom})` }}
        >
          <img
            src={imageUrl}
            alt={title}
            className="max-h-[70vh] sm:max-h-[78vh] max-w-[92vw] sm:max-w-[85vw] object-contain rounded-none border border-[#C5A880]/20 shadow-2xl"
          />
        </div>

        {/* Navigation Arrow Right */}
        {hasNext && onNext && (
          <button
            onClick={onNext}
            className="absolute right-2 sm:right-6 z-20 p-2.5 sm:p-4 rounded-full bg-[#071510]/80 border border-[#C5A880]/40 text-[#DFCA9F] hover:text-white hover:bg-[#122A22] transition-all cursor-pointer shadow-xl backdrop-blur-md"
            title="Next Image (Right Arrow)"
            aria-label="Next Image"
          >
            <ChevronRight size={20} className="sm:w-[22px] sm:h-[22px]" />
          </button>
        )}
      </div>

      {/* Bottom Footer Info Strip with Safe Area */}
      <div className="px-4 sm:px-6 py-3 pb-safe border-t border-[#C5A880]/20 bg-[#071510]/95 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 text-center sm:text-left">
          {description && (
            <p className="text-xs text-stone-300 font-sans font-light line-clamp-1">
              {description}
            </p>
          )}
        </div>

        <div className="text-[10px] text-stone-400 font-sans hidden md:flex items-center gap-3">
          <span>Keyboard: Left / Right arrows to navigate</span>
          <span>•</span>
          <span>Esc to exit</span>
          <span>•</span>
          <span>Swipe on mobile</span>
        </div>
      </div>
    </div>
  );
};
