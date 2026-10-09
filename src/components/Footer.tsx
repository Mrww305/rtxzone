import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#101b17] py-8 border-t border-white/10 text-[#9aa99d]">
      <div className="w-[min(1240px,calc(100%-48px))] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <a
            href="#home"
            className="font-display font-extrabold text-[13px] tracking-[0.2em] text-[#fffdf7] hover:text-[#d2f36b] transition-colors flex items-center gap-2"
          >
            <span className="w-5 h-5 rounded-full border border-[#d2f36b]/60 flex items-center justify-center text-[#d2f36b] text-[11px]">
              R
            </span>
            RESHMA TEX
          </a>
          <small className="text-[11px] text-[#78887b]">
            Private Industrial Zone · Project information subject to confirmation.
          </small>
        </div>

        <div className="flex items-center gap-6 text-[11px] tracking-wider uppercase">
          <a href="#masterplan" className="hover:text-[#d2f36b] transition-colors">
            Masterplan
          </a>
          <a href="#vision" className="hover:text-[#d2f36b] transition-colors">
            Our vision
          </a>
          <a href="#opportunities" className="hover:text-[#d2f36b] transition-colors">
            Opportunities
          </a>
          <a href="#contact" className="hover:text-[#d2f36b] transition-colors">
            Contact
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
            className="w-8 h-8 rounded border border-white/15 hover:border-[#d2f36b] text-white hover:text-[#d2f36b] flex items-center justify-center transition-colors ml-2"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
