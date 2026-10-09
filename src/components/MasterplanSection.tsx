import React, { useState } from 'react';
import { BUILDINGS_DATA, BuildingSpec } from '../data/buildings';
import { ZoomIn, ZoomOut, Maximize2, MapPin, CheckCircle2, ArrowUpRight, Zap, Warehouse, Ruler, Truck } from 'lucide-react';

interface MasterplanSectionProps {
  onOpenLightbox: () => void;
  onSelectBuildingForEnquiry: (building: BuildingSpec) => void;
}

export const MasterplanSection: React.FC<MasterplanSectionProps> = ({
  onOpenLightbox,
  onSelectBuildingForEnquiry
}) => {
  const [selectedId, setSelectedId] = useState<number>(1);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);

  const selectedBuilding = BUILDINGS_DATA.find((b) => b.id === selectedId) || BUILDINGS_DATA[0];

  return (
    <section id="masterplan" className="py-24 md:py-32 bg-[#f2f0e8] text-[#101b17] transition-colors">
      <div className="w-[min(1240px,calc(100%-48px))] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-10 mb-12">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#4c694f] mb-3">
              The site, at a glance
            </div>
            <h2 className="font-display font-medium text-[clamp(36px,5vw,66px)] leading-[1.04] tracking-[-0.065em] text-[#101b17]">
              One masterplan.
              <br />
              <em className="font-serif-italic font-normal text-[#2b4d32]">Many possibilities.</em>
            </h2>
          </div>
          <div className="max-w-[360px]">
            <p className="text-[#5b6a5e] text-[13px] leading-[1.8] m-0 mb-3">
              Explore the original RESHMA TEX campus visualization. Select a building number to inspect specifications, dimensions, power connectivity, and lease availability.
            </p>
            <div className="flex items-center gap-2">
              <label className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#324b37] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showHotspots}
                  onChange={(e) => setShowHotspots(e.target.checked)}
                  className="accent-[#101b17] w-3.5 h-3.5"
                />
                Show interactive hotspot pins on plan
              </label>
            </div>
          </div>
        </div>

        {/* Masterplan Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Masterplan Interactive Canvas */}
          <div className="lg:col-span-8 relative bg-[#d6d4c8] overflow-hidden border border-[#101b17]/15 min-h-[420px] md:min-h-[540px] flex items-center justify-center group shadow-sm">
            {/* Tag badge */}
            <div className="absolute left-4 top-4 z-20 bg-[#101b17] text-[#fffdf7] px-3 py-2 text-[9px] font-bold tracking-[0.18em] uppercase flex items-center gap-2 shadow">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d2f36b]" />
              Original site visualization · Campus 01—18
            </div>

            {/* Hotspot indicator overlay */}
            <div
              className={`relative w-full h-full overflow-hidden transition-transform duration-500 ease-out origin-[50%_40%] ${
                isZoomed ? 'scale-125 md:scale-135 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src="/src/assets/images/masterplan_aerial_1791519865096.jpg"
                alt="Full original RESHMA TEX industrial-zone masterplan visualization"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover block select-none pointer-events-none"
              />

              {/* Hotspot Pins on Plan */}
              {showHotspots && (
                <div className="absolute inset-0 pointer-events-auto">
                  {BUILDINGS_DATA.map((b) => {
                    const isSelected = b.id === selectedId;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedId(b.id);
                        }}
                        style={{
                          left: `${b.hotspot.x}%`,
                          top: `${b.hotspot.y}%`
                        }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-10 flex items-center justify-center rounded-full font-display text-[9px] font-bold shadow-lg ${
                          isSelected
                            ? 'w-7 h-7 bg-[#d2f36b] text-[#101b17] ring-4 ring-[#101b17] scale-110 z-30'
                            : 'w-5 h-5 bg-[#101b17]/85 text-white hover:bg-[#d2f36b] hover:text-[#101b17] hover:scale-110 border border-white/50'
                        }`}
                        title={`${b.name} (${b.code}) — ${b.type}`}
                        aria-label={`Select ${b.name}`}
                      >
                        {String(b.id).padStart(2, '0')}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Controls bottom right */}
            <div className="absolute z-20 bottom-4 right-4 flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(!isZoomed);
                }}
                className="w-10 h-10 border border-white/40 bg-[#101b17]/90 text-white hover:bg-[#d2f36b] hover:text-[#101b17] flex items-center justify-center transition-colors shadow"
                aria-label={isZoomed ? 'Zoom out masterplan' : 'Zoom in masterplan'}
                title={isZoomed ? 'Zoom out' : 'Zoom in'}
              >
                {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenLightbox();
                }}
                className="w-10 h-10 border border-white/40 bg-[#101b17]/90 text-white hover:bg-[#d2f36b] hover:text-[#101b17] flex items-center justify-center transition-colors shadow"
                aria-label="View full masterplan in fullscreen"
                title="Fullscreen lightbox view"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Interactive Building Selector & Detailed Specs */}
          <aside className="lg:col-span-4 bg-[#e5e3d9] p-6 md:p-7 flex flex-col justify-between border border-[#101b17]/10">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#627364] mb-2">
                Explore the plan
              </div>
              <h3 className="font-display font-semibold text-[24px] leading-[1.15] tracking-[-0.04em] text-[#101b17] mb-2">
                Find your point
                <br />
                of interest.
              </h3>
              <p className="text-[12px] leading-[1.7] text-[#556457] mb-5">
                Choose a numbered building from the supplied visualization to view engineered parameters and availability.
              </p>

              {/* Number Buttons Grid 01 - 18 */}
              <div className="grid grid-cols-6 gap-1.5 mb-6" role="group" aria-label="Select building number">
                {BUILDINGS_DATA.map((b) => {
                  const active = b.id === selectedId;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setSelectedId(b.id)}
                      aria-pressed={active}
                      className={`py-2 px-1 text-center font-display text-[11px] font-bold border transition-all ${
                        active
                          ? 'bg-[#101b17] text-[#d2f36b] border-[#101b17] shadow-sm transform scale-102'
                          : 'bg-transparent text-[#3d4f42] border-[#c0c6b7] hover:bg-[#101b17] hover:text-[#d2f36b] hover:border-[#101b17]'
                      }`}
                    >
                      {String(b.id).padStart(2, '0')}
                    </button>
                  );
                })}
              </div>

              {/* Selected Building Details Card */}
              <div className="bg-[#f0eee4] p-4.5 border border-[#c7cdbe] mb-5 animate-in fade-in duration-200">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#101b17]" />
                    <h4 className="font-display font-bold text-[17px] text-[#101b17]">
                      {selectedBuilding.name} <span className="text-[#647667] text-[13px] font-normal">({selectedBuilding.code})</span>
                    </h4>
                  </div>
                  <span
                    className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 border"
                    style={{
                      borderColor: '#101b17',
                      backgroundColor: selectedBuilding.status.includes('Ready') ? '#d2f36b' : '#101b17',
                      color: selectedBuilding.status.includes('Ready') ? '#101b17' : '#fff'
                    }}
                  >
                    {selectedBuilding.status}
                  </span>
                </div>

                <div className="text-[12px] font-medium text-[#293c2e] mb-2.5">
                  {selectedBuilding.type}
                </div>

                <p className="text-[11px] leading-[1.6] text-[#556357] mb-3.5">
                  {selectedBuilding.description}
                </p>

                {/* Specs Matrix */}
                <div className="grid grid-cols-2 gap-2 text-[10px] pt-3 border-t border-[#d8dcca] mb-3">
                  <div className="flex items-center gap-1.5">
                    <Warehouse className="w-3.5 h-3.5 text-[#516454]" />
                    <span>
                      <strong className="text-[#101b17]">{(selectedBuilding.areaSqM).toLocaleString()} m²</strong>
                      <span className="text-[#6d7b6f] block text-[9px]">({(selectedBuilding.areaSqFt).toLocaleString()} sq ft)</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-[#516454]" />
                    <span>
                      <strong className="text-[#101b17]">{selectedBuilding.clearHeightM} m</strong>
                      <span className="text-[#6d7b6f] block text-[9px]">Clear apex height</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#516454]" />
                    <span>
                      <strong className="text-[#101b17]">{selectedBuilding.loadingDocks}</strong>
                      <span className="text-[#6d7b6f] block text-[9px]">Dock levelers</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#516454]" />
                    <span>
                      <strong className="text-[#101b17]">{selectedBuilding.powerKva} kVA</strong>
                      <span className="text-[#6d7b6f] block text-[9px]">High-power sub</span>
                    </span>
                  </div>
                </div>

                {/* Features checklist */}
                <ul className="space-y-1 text-[10px] text-[#425244] mb-3.5">
                  {selectedBuilding.features.slice(0, 3).map((feat, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-[#39593f] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => onSelectBuildingForEnquiry(selectedBuilding)}
                  className="w-full py-2.5 bg-[#101b17] text-[#d2f36b] hover:bg-[#1f3529] font-display text-[10px] uppercase font-bold tracking-[0.1em] transition-colors flex items-center justify-center gap-2"
                >
                  Enquire about {selectedBuilding.code} <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="text-[10px] text-[#717e72] leading-[1.6] pt-3 border-t border-[#cbd2c3]">
              Illustrative masterplan. Building use, specifications, and availability subject to final lease & engineering confirmation.
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
