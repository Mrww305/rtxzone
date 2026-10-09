import React from 'react';
import { ShieldCheck, Cpu, Anchor, Sun, Droplets, Truck } from 'lucide-react';

export const VisionSection: React.FC = () => {
  return (
    <section id="vision" className="py-28 md:py-36 bg-[#192821] text-[#fffdf7] relative overflow-hidden">
      {/* Massive subtle watermark R in background */}
      <div
        className="absolute right-[-40px] bottom-[-220px] font-display font-extrabold text-[580px] leading-[0.8] tracking-[-0.14em] text-white/[0.022] select-none pointer-events-none"
        aria-hidden="true"
      >
        R
      </div>

      <div className="w-[min(1240px,calc(100%-48px))] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Aside Big Counter & Badge */}
          <div className="lg:col-span-4 lg:pt-3">
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#d2f36b] mb-4">
              Infrastructure Scope
            </div>
            <div className="font-display font-medium text-[76px] md:text-[92px] leading-[0.9] tracking-[-0.08em] text-[#d2f36b] mb-3">
              01—18
            </div>
            <p className="text-[12px] uppercase tracking-[0.12em] leading-[1.8] text-[#9ead9f] max-w-[220px]">
              Numbered buildings shown in the supplied visualization
            </p>

            <div className="mt-10 p-5 bg-[#101b17]/60 border border-white/10 space-y-4">
              <div className="flex items-start gap-3">
                <Sun className="w-4 h-4 text-[#d2f36b] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[12px] font-bold font-display text-white">Solar-Optimized Roofs</h4>
                  <p className="text-[11px] text-[#9ead9f]">Engineered for high-capacity photovoltaic arrays across all 18 hall spans.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Droplets className="w-4 h-4 text-[#d2f36b] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[12px] font-bold font-display text-white">Dual Retention Basins</h4>
                  <p className="text-[11px] text-[#9ead9f]">On-site ecological retention lakes providing industrial runoff management.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="w-4 h-4 text-[#d2f36b] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[12px] font-bold font-display text-white">Heavy Freight Logistics</h4>
                  <p className="text-[11px] text-[#9ead9f]">Full 60m trailer turning radiuses with uninterrupted arterial highway access.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Narrative & 3 Strategic Pillars */}
          <div className="lg:col-span-8">
            <div className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#d2f36b] mb-4 flex items-center gap-2">
              <span className="w-6 h-[1px] bg-[#d2f36b]" />
              A place to move business forward
            </div>

            <h2 className="font-display font-medium text-[clamp(38px,5.2vw,70px)] leading-[1.04] tracking-[-0.07em] mb-7 max-w-[760px]">
              Built around the next chapter of <em className="font-serif-italic font-normal text-[#d2f36b]">industry.</em>
            </h2>

            <p className="text-[#b4c0b6] text-[14px] md:text-[15px] leading-[1.85] max-w-[620px] mb-12">
              RESHMA TEX is being presented as a private industrial zone: a destination where industrial businesses can explore space, understand the development, and connect with the project team. The website brings the supplied masterplan to the forefront—without inventing what is not yet confirmed.
            </p>

            {/* Visual separator rule */}
            <div className="h-[1px] bg-white/15 w-full mb-10" />

            {/* 3 Core Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border-t border-[#d2f36b]/40 pt-4">
                <span className="block text-[#d2f36b] font-display text-[13px] font-bold tracking-wider mb-2">
                  01
                </span>
                <strong className="block font-display font-semibold text-[15px] text-white mb-2">
                  Explore the site
                </strong>
                <p className="text-[#9eafa2] text-[12px] leading-[1.7] m-0">
                  Navigate the original campus visualization and its numbered buildings with interactive dimensions and clearances.
                </p>
              </div>

              <div className="border-t border-[#d2f36b]/40 pt-4">
                <span className="block text-[#d2f36b] font-display text-[13px] font-bold tracking-wider mb-2">
                  02
                </span>
                <strong className="block font-display font-semibold text-[15px] text-white mb-2">
                  Understand the opportunity
                </strong>
                <p className="text-[#9eafa2] text-[12px] leading-[1.7] m-0">
                  Review verified project parameters, power connectivity, logistics aprons, and build-to-suit configurations.
                </p>
              </div>

              <div className="border-t border-[#d2f36b]/40 pt-4">
                <span className="block text-[#d2f36b] font-display text-[13px] font-bold tracking-wider mb-2">
                  03
                </span>
                <strong className="block font-display font-semibold text-[15px] text-white mb-2">
                  Start a conversation
                </strong>
                <p className="text-[#9eafa2] text-[12px] leading-[1.7] m-0">
                  Contact the leadership team about plots, long-term facilities, customs clearance, or strategic industrial partnerships.
                </p>
              </div>
            </div>

            {/* Aerial Zone Image Feature Banner */}
            <div className="mt-12 relative overflow-hidden border border-white/10 group">
              <img
                src="/src/assets/images/industrial_zone_1791519891210.jpg"
                alt="Architectural landscape and master-planned logistics view of RESHMA TEX"
                referrerPolicy="no-referrer"
                className="w-full h-[240px] md:h-[300px] object-cover group-hover:scale-102 transition-transform duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101b17] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="text-[11px] text-white font-medium">
                  Eco-Industrial Zone Masterplan · Intermodal Arterial Corridor
                </div>
                <div className="text-[10px] text-[#d2f36b] uppercase tracking-wider font-bold">
                  Phase 1 Operational · Phase 2 Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
