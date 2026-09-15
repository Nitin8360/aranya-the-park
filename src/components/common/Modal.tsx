import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** Title shown in the modal header */
  title?: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Max width variant */
  size?: 'sm' | 'md' | 'lg';
  /** Custom max width override */
  maxWidth?: string;
}

const modalSizes: Record<string, string> = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

/**
 * Modal — Dark Luxury overlay dialog with glass panel styling.
 * Supports ESC to close, click-outside to close, scroll lock.
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  subtitle,
  size = 'md',
  maxWidth,
}) => {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on ESC key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Dialog'}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-dark-950/90 backdrop-blur-xl animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div
        className={`relative w-full ${maxWidth || modalSizes[size]} bg-dark-900 border border-white/[0.12] shadow-[0_25px_70px_rgba(0,0,0,0.85)] rounded-[4px] animate-scale-in max-h-[92vh] overflow-y-auto overflow-touch`}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-5 sm:px-7 py-4 sm:py-5 border-b border-white/[0.08]">
            <div>
              <h3 className="font-serif text-lg sm:text-xl text-ivory font-light">{title}</h3>
              {subtitle && (
                <p className="text-xs text-ivory-muted/70 mt-0.5 font-sans">{subtitle}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 min-h-[40px] min-w-[40px] flex items-center justify-center text-ivory-muted hover:text-ivory hover:bg-white/[0.06] rounded-full transition-all duration-200 cursor-pointer"
              aria-label="Close dialog"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>
        )}

        {/* Close button (when no title) */}
        {!title && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 min-h-[40px] min-w-[40px] flex items-center justify-center text-ivory-muted hover:text-ivory hover:bg-white/[0.06] rounded-full transition-all duration-200 z-10 cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        )}

        {/* Content */}
        <div className="p-5 sm:p-7">{children}</div>
      </div>
    </div>
  );
};
