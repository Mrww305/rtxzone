import React, { useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ isOpen, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  useEffect(() => {
    if (!isOpen) {
      setZoomLevel(1);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Full masterplan high-resolution image"
      className="fixed inset-0 z-[100] bg-[#040a07]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      {/* Top Header Controls */}
      <div
        className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between pointer-events-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#101b17]/90 border border-white/15 px-3 py-1.5 text-white text-[10px] uppercase font-bold tracking-[0.16em] pointer-events-auto">
          RESHMA TEX · Full Campus Masterplan
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Zoom controls */}
          <div className="flex items-center bg-[#101b17]/90 border border-white/20">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.35))}
              className="p-2.5 text-white hover:text-[#d2f36b] hover:bg-white/10 transition-colors"
              title="Zoom In"
              aria-label="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <span className="text-[10px] text-white/70 px-2 font-mono">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(1, z - 0.35))}
              className="p-2.5 text-white hover:text-[#d2f36b] hover:bg-white/10 transition-colors"
              title="Zoom Out"
              aria-label="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            {zoomLevel > 1 && (
              <button
                type="button"
                onClick={() => setZoomLevel(1)}
                className="p-2.5 text-white hover:text-[#d2f36b] hover:bg-white/10 transition-colors border-l border-white/20"
                title="Reset Zoom"
                aria-label="Reset Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close full image view"
            className="w-10 h-10 border border-white/20 hover:border-[#d2f36b] bg-[#101b17]/90 text-white hover:text-[#d2f36b] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Container */}
      <div
        className="max-h-[92vh] max-w-[min(94vw,1440px)] overflow-auto cursor-default flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src="/src/assets/images/masterplan_aerial_1791519865096.jpg"
          alt="Full original RESHMA TEX industrial-zone visualization"
          referrerPolicy="no-referrer"
          style={{ transform: `scale(${zoomLevel})` }}
          className="max-h-[85vh] w-auto max-w-full object-contain transition-transform duration-200 origin-center shadow-2xl"
        />
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-5 text-[10px] uppercase tracking-widest text-[#aab8ad] pointer-events-none">
        Press ESC or click outside to dismiss
      </div>
    </div>
  );
};
