import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface TopbarProps {
  onEnquireClick?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onEnquireClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 30);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? (y / max) * 100 : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Top progress bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-[#d2f36b] z-[70] transition-[width] duration-75 pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Main navigation bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled
            ? 'bg-[#101b17]/92 backdrop-blur-md border-b border-white/10'
            : 'border-b border-transparent'
        }`}
      >
        <div className="w-[min(1240px,calc(100%-48px))] mx-auto h-[78px] md:h-[82px] flex items-center justify-between">
          {/* Brand */}
          <a
            href="#home"
            className="flex items-center gap-3 font-display font-extrabold text-[13px] md:text-[14px] tracking-[0.22em] text-[#fffdf7] hover:text-[#d2f36b] transition-colors"
            aria-label="RESHMA TEX Home"
          >
            <span className="w-[34px] h-[34px] rounded-full border border-[#d2f36b]/65 flex items-center justify-center text-[#d2f36b] text-[15px] tracking-normal font-bold">
              R
            </span>
            <span>RESHMA TEX</span>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8 text-[12px] tracking-[0.05em] text-[#d1d9d2]">
            <a href="#masterplan" className="hover:text-[#d2f36b] transition-colors">
              Masterplan
            </a>
            <a href="#vision" className="hover:text-[#d2f36b] transition-colors">
              Our vision
            </a>
            <a href="#opportunities" className="hover:text-[#d2f36b] transition-colors">
              Opportunities
            </a>
            <a
              href="#contact"
              onClick={onEnquireClick}
              className="inline-flex items-center gap-2 px-[18px] py-[12px] border border-[#d2f36b]/60 text-[#d2f36b] text-[11px] font-bold tracking-[0.1em] uppercase hover:bg-[#d2f36b] hover:text-[#101b17] transition-all transform hover:-translate-y-0.5"
            >
              Make an enquiry <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </nav>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="#contact"
              onClick={onEnquireClick}
              className="px-3 py-2 border border-[#d2f36b]/60 text-[#d2f36b] text-[10px] font-bold uppercase tracking-wider hover:bg-[#d2f36b] hover:text-[#101b17]"
            >
              Enquire ↗
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-white/20 text-white rounded-none hover:bg-white/10"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[78px] z-40 bg-[#101b17]/98 border-b border-white/15 px-6 py-6 flex flex-col backdrop-blur-lg animate-in slide-in-from-top-2">
          <a
            href="#home"
            onClick={closeMobile}
            className="py-3.5 border-b border-white/10 text-sm font-medium text-[#d1d9d2] hover:text-[#d2f36b]"
          >
            Home Overview
          </a>
          <a
            href="#masterplan"
            onClick={closeMobile}
            className="py-3.5 border-b border-white/10 text-sm font-medium text-[#d1d9d2] hover:text-[#d2f36b]"
          >
            Site Masterplan (01—18)
          </a>
          <a
            href="#vision"
            onClick={closeMobile}
            className="py-3.5 border-b border-white/10 text-sm font-medium text-[#d1d9d2] hover:text-[#d2f36b]"
          >
            Our Vision & Infrastructure
          </a>
          <a
            href="#opportunities"
            onClick={closeMobile}
            className="py-3.5 border-b border-white/10 text-sm font-medium text-[#d1d9d2] hover:text-[#d2f36b]"
          >
            Development Opportunities
          </a>
          <a
            href="#contact"
            onClick={() => {
              closeMobile();
              onEnquireClick?.();
            }}
            className="py-4 text-sm font-bold text-[#d2f36b] flex items-center justify-between"
          >
            <span>Make an Enquiry</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </>
  );
};
