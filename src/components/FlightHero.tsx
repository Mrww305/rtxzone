import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowDownRight, ArrowUpRight, Maximize2, X, Eye, Compass, Layers } from 'lucide-react';

interface FlightHeroProps {
  onExplorePlanClick?: () => void;
  onEnquireClick?: () => void;
}

export const FlightHero: React.FC<FlightHeroProps> = ({
  onExplorePlanClick,
  onEnquireClick
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [flightP, setFlightP] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [interiorOpen, setInteriorOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setPointer({ x: px, y: py });
  }, []);

  const updateFlight = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const total = Math.max(1, sectionRef.current.offsetHeight - window.innerHeight);
    const progress = Math.max(0, Math.min(1, -rect.top / total));
    setFlightP(progress);

    if (imageRef.current) {
      if (reducedMotion) {
        imageRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        return;
      }
      const scale = 1 + progress * 2.05;
      const targetX = 0.52;
      const targetY = 0.28;

      const isMobile = window.innerWidth <= 560;
      const isTablet = window.innerWidth <= 900;
      const baseH = window.innerHeight * (isMobile ? 0.78 : isTablet ? 0.86 : 1);
      const baseW = baseH * (16 / 9);

      const tx = (0.5 - targetX) * baseW * scale + pointer.x * (1 - progress * 0.8) * 36;
      const ty = (0.5 - targetY) * baseH * scale + pointer.y * (1 - progress * 0.8) * 36;

      imageRef.current.style.transform = `translate(calc(-50% + ${tx.toFixed(1)}px), calc(-50% + ${ty.toFixed(1)}px)) scale(${scale.toFixed(3)})`;
    }
  }, [pointer, reducedMotion]);

  useEffect(() => {
    window.addEventListener('scroll', updateFlight, { passive: true });
    window.addEventListener('resize', updateFlight);
    updateFlight();
    return () => {
      window.removeEventListener('scroll', updateFlight);
      window.removeEventListener('resize', updateFlight);
    };
  }, [updateFlight]);

  useEffect(() => {
    if (interiorOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setInteriorOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [interiorOpen]);

  const copyOpacity = Math.max(0, 1 - flightP * 1.85);
  const copyTranslateY = -flightP * 38;
  const isReadyToEnter = flightP > 0.65;

  const altitudeText =
    flightP < 0.2
      ? 'Aerial view / 01—18'
      : flightP < 0.62
      ? 'Descending / Approaching hall'
      : 'Hall approach / Interior transition';

  const instructionText =
    flightP < 0.18
      ? 'Move cursor to steer · Scroll to descend'
      : flightP < 0.72
      ? 'Descending toward the existing hall roofs'
      : 'At hall approach · Continue to interior transition';

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-[220svh] bg-[#09110d] isolation-isolate"
      aria-label="Cursor-guided aerial descent"
    >
      <div
        ref={stageRef}
        onPointerMove={handlePointerMove}
        className="sticky top-0 h-[100svh] overflow-hidden bg-[radial-gradient(ellipse_at_52%_42%,#1a2b20_0%,#09110d_68%)] select-none"
      >
        {/* Aerial Image */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            ref={imageRef}
            src="/src/assets/images/masterplan_aerial_1791519865096.jpg"
            alt="Original aerial visualization of the RESHMA TEX industrial zone"
            referrerPolicy="no-referrer"
            fetchPriority="high"
            className="absolute h-[100svh] w-auto max-w-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center will-change-transform filter saturate-[0.92] contrast-[1.03] transition-[filter] duration-300"
          />
        </div>

        {/* Ambient Vignette & Shadow Gradients */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              'linear-gradient(90deg, rgba(5,12,8,0.92) 0%, rgba(5,12,8,0.52) 36%, rgba(5,12,8,0.08) 72%), linear-gradient(0deg, rgba(5,12,8,0.85) 0%, transparent 28%, rgba(5,12,8,0.15) 100%)'
          }}
        />

        {/* Hero Content Overlay */}
        <div
          className="absolute z-[3] left-[max(5vw,calc((100vw-1240px)/2))] top-[22%] md:top-[25%] w-[min(540px,88vw)] md:w-[min(510px,44vw)] pointer-events-auto transition-[opacity,transform] duration-200"
          style={{
            opacity: copyOpacity,
            transform: `translateY(${copyTranslateY}px)`,
            pointerEvents: copyOpacity < 0.1 ? 'none' : 'auto'
          }}
        >
          <div className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#d2f36b] flex items-center gap-3">
            <span className="w-[30px] h-[1px] bg-[#d2f36b] inline-block" />
            <span>RESHMA TEX · PRIVATE INDUSTRIAL ZONE</span>
          </div>

          <h1 className="font-display font-medium text-[clamp(48px,6.8vw,96px)] leading-[0.94] tracking-[-0.075em] my-5 md:my-6 text-[#fffdf7]">
            A new ground
            <br />
            for <em className="font-serif-italic font-normal text-[#d2f36b]">industry.</em>
          </h1>

          <p className="text-[#c0cbc2] text-[13px] md:text-[14px] leading-[1.8] max-w-[390px] mb-7">
            Move your cursor to steer the view. Scroll down to descend from the aerial masterplan toward the existing halls.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#masterplan"
              onClick={onExplorePlanClick}
              className="inline-flex items-center gap-2.5 px-5 py-3.5 bg-[#d2f36b] text-[#101b17] border border-[#d2f36b] font-display text-[11px] font-bold uppercase tracking-[0.08em] hover:bg-[#e2ff9b] transition-all transform hover:-translate-y-0.5"
            >
              Explore the zone <ArrowDownRight className="w-4 h-4" />
            </a>
            <a
              href="#vision"
              className="inline-flex items-center gap-2 px-5 py-3.5 border border-[#d2f36b]/60 text-[#d2f36b] font-display text-[11px] font-bold uppercase tracking-[0.08em] hover:bg-[#d2f36b]/10 transition-all"
            >
              Masterplan Details
            </a>
          </div>
        </div>

        {/* Flight Enter Trigger Button (appears at deep descent) */}
        <button
          type="button"
          onClick={() => setInteriorOpen(true)}
          className={`absolute z-[5] right-5 md:right-8 top-1/2 -translate-y-1/2 border border-[#d2f36b]/70 bg-[#09110d]/85 text-[#d2f36b] px-5 py-4 text-[10px] uppercase font-bold tracking-[0.14em] cursor-pointer transition-all duration-300 hover:bg-[#d2f36b] hover:text-[#101b17] shadow-xl backdrop-blur-sm ${
            isReadyToEnter
              ? 'opacity-100 visible translate-x-0'
              : 'opacity-0 invisible translate-x-4 pointer-events-none'
          }`}
        >
          <span className="flex items-center gap-2">
            <Eye className="w-3.5 h-3.5" />
            Continue into the hall ↗
          </span>
        </button>

        {/* HUD Instrument Panel */}
        <div className="absolute z-[4] left-5 md:left-8 right-5 md:right-8 bottom-6 md:bottom-7 flex justify-between items-end gap-5 text-[#d2ddd4] text-[9px] md:text-[10px] tracking-[0.14em] uppercase">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#d2f36b] shadow-[0_0_14px_rgba(210,243,107,0.7)] animate-flight-pulse" />
              <span className="font-medium text-[#f2f0e8]">{instructionText}</span>
            </div>
            {/* Progress meter */}
            <div className="h-[2px] w-[min(38vw,240px)] bg-white/20 mt-2.5 relative overflow-hidden">
              <div
                className="h-full bg-[#d2f36b] transition-all duration-100 ease-linear"
                style={{ width: `${(flightP * 100).toFixed(1)}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 text-right">
            <div className="hidden sm:block text-white/50 text-[9px]">
              ZOOM: {(1 + flightP * 2.05).toFixed(2)}x
            </div>
            <div className="font-display font-semibold tracking-wider text-[#d2f36b]">
              {altitudeText}
            </div>
          </div>
        </div>

        {/* Interior Transition Modal / Screen */}
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="interiorTitle"
          className={`fixed inset-0 z-50 bg-[#09110d]/98 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 transition-all duration-700 ${
            interiorOpen
              ? 'opacity-100 visible scale-100'
              : 'opacity-0 invisible scale-105 pointer-events-none'
          }`}
        >
          <button
            type="button"
            onClick={() => setInteriorOpen(false)}
            aria-label="Close interior transition"
            className="absolute right-5 md:right-8 top-5 md:top-8 w-11 h-11 border border-white/20 hover:border-[#d2f36b] text-white hover:text-[#d2f36b] flex items-center justify-center transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="max-w-[1080px] w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#101b17] border border-white/15 p-6 md:p-10 shadow-2xl relative overflow-hidden">
            {/* Left/Main: Interior Hall Visual */}
            <div className="lg:col-span-7 relative overflow-hidden border border-white/10 group">
              <img
                src="/src/assets/images/interior_hall_1791519879526.jpg"
                alt="Modern textile logistics and manufacturing hall interior"
                referrerPolicy="no-referrer"
                className="w-full h-[280px] sm:h-[360px] md:h-[420px] object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 bg-[#101b17]/90 text-[#d2f36b] px-3 py-1.5 text-[9px] font-bold tracking-[0.16em] uppercase border border-[#d2f36b]/40">
                Building 01 · Interior Perspective
              </div>
              <div className="absolute bottom-3 right-3 bg-[#101b17]/85 text-white/80 px-2.5 py-1 text-[9px] tracking-wider">
                14.5M Apex Clearance · ESFR Spinklers
              </div>
            </div>

            {/* Right: Architectural Explanation & Direct Enquire */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#d2f36b] mb-2 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-[#d2f36b]" />
                INTERIOR TRANSITION · HALL VIEW
              </div>

              <h2
                id="interiorTitle"
                className="font-display font-medium text-[34px] md:text-[44px] leading-[1.04] tracking-[-0.05em] text-[#fffdf7] mb-4"
              >
                Continue the journey <em className="font-serif-italic font-normal text-[#d2f36b]">inside.</em>
              </h2>

              <p className="text-[#aab8ad] text-[13px] leading-[1.8] mb-6">
                The aerial image shows the exterior roofs, not the inside of the halls. To make the final fly-through accurate to your real buildings, replace this transition with your actual hall-interior photo, video, or 3D render. No fictional construction has been added.
              </p>

              {/* Key interior spec highlights */}
              <div className="grid grid-cols-2 gap-3 mb-6 p-3.5 bg-[#192821] border border-white/10 text-[11px]">
                <div>
                  <span className="text-white/40 block text-[9px] uppercase">Floor Spec</span>
                  <span className="text-[#d2f36b] font-display font-semibold">FM2 Super-Flat Slab</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[9px] uppercase">Load Bearing</span>
                  <span className="text-white font-display font-semibold">85 kN/m² Heavy</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[9px] uppercase">Lighting</span>
                  <span className="text-white font-display font-semibold">LED Smart Sensors</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[9px] uppercase">Ventilation</span>
                  <span className="text-[#d2f36b] font-display font-semibold">Active Air Exchange</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setInteriorOpen(false)}
                  className="px-5 py-3.5 bg-[#d2f36b] text-[#101b17] border border-[#d2f36b] font-display text-[10px] font-bold uppercase tracking-[0.1em] hover:bg-[#e2ff9b] transition-all flex items-center justify-center gap-2"
                >
                  Return to aerial view <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <a
                  href="#contact"
                  onClick={() => {
                    setInteriorOpen(false);
                    onEnquireClick?.();
                  }}
                  className="px-5 py-3.5 border border-white/20 text-white font-display text-[10px] font-bold uppercase tracking-[0.1em] hover:border-[#d2f36b] hover:text-[#d2f36b] transition-all flex items-center justify-center gap-2"
                >
                  Enquire this hall ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
