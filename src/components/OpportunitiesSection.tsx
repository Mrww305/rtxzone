import React from 'react';
import { ArrowUpRight, Building2, Briefcase, Handshake, Compass } from 'lucide-react';

interface OpportunitiesSectionProps {
  onSelectEnquiryType: (type: string) => void;
}

export const OpportunitiesSection: React.FC<OpportunitiesSectionProps> = ({
  onSelectEnquiryType
}) => {
  const opportunities = [
    {
      num: '01 / INDUSTRIAL SPACE',
      title: 'Plot & space enquiries',
      desc: 'Discuss your space requirements and ask the team about current options, covered floor areas, high-bay clearances, and immediate availability.',
      cta: 'Discuss your requirements',
      type: 'Industrial plot or space enquiry',
      icon: Building2
    },
    {
      num: '02 / BUSINESS',
      title: 'Business establishment',
      desc: 'Explore whether the development suits your operational manufacturing needs, heavy power demands, and export supply chain logistics.',
      cta: 'Talk to the team',
      type: 'Business establishment enquiry',
      icon: Briefcase
    },
    {
      num: '03 / PARTNERSHIPS',
      title: 'Investment & partnerships',
      desc: 'Open a conversation about long-term institutional investment, industrial joint ventures, supply chain collaboration, or strategic relationships.',
      cta: 'Start a conversation',
      type: 'Investment or partnership enquiry',
      icon: Handshake
    }
  ];

  const handleClick = (e: React.MouseEvent, type: string) => {
    e.preventDefault();
    onSelectEnquiryType(type);
    const target = document.getElementById('contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="opportunities" className="py-24 md:py-32 bg-[#e9e8de] text-[#101b17] transition-colors">
      <div className="w-[min(1240px,calc(100%-48px))] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-10 mb-14">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#566858] mb-3">
              Make your next move
            </div>
            <h2 className="font-display font-medium text-[clamp(36px,5vw,66px)] leading-[1.04] tracking-[-0.065em] text-[#101b17]">
              Opportunity starts
              <br />
              <em className="font-serif-italic font-normal text-[#2b4d32]">with a conversation.</em>
            </h2>
          </div>
          <p className="text-[#69756b] text-[13px] leading-[1.8] max-w-[360px] m-0">
            Whether you are exploring a dedicated plot for your manufacturing operations or discussing a strategic regional partnership, start by telling us what you need.
          </p>
        </div>

        {/* 3 Interactive Opportunity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {opportunities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <article
                key={idx}
                className="group border border-[#c9cec2] bg-[#e9e8de] hover:bg-[#fffdf7] hover:border-[#8f9a8b] p-7 md:p-8 min-h-[290px] flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-display text-[11px] font-semibold tracking-wider text-[#63735f]">
                      {item.num}
                    </span>
                    <Icon className="w-4 h-4 text-[#758471] group-hover:text-[#101b17] transition-colors" />
                  </div>

                  <h3 className="font-display font-semibold text-[23px] md:text-[25px] leading-[1.12] tracking-[-0.04em] text-[#101b17] mb-3">
                    {item.title}
                  </h3>

                  <p className="text-[12px] leading-[1.8] text-[#667267] m-0">
                    {item.desc}
                  </p>
                </div>

                <a
                  href="#contact"
                  onClick={(e) => handleClick(e, item.type)}
                  className="mt-8 pt-4 border-t border-[#c9cec2] group-hover:border-[#101b17]/30 text-[10px] tracking-[0.14em] uppercase font-bold text-[#101b17] flex items-center justify-between group-hover:text-[#214328] transition-colors"
                >
                  <span>{item.cta}</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </article>
            );
          })}
        </div>

        {/* Quick Highlights Strip */}
        <div className="mt-12 p-6 bg-[#dfddd0] border border-[#c5cbbd] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-[#2d3f32]">
          <div>
            <span className="block font-display font-bold text-[18px] md:text-[22px] text-[#101b17]">18 Units</span>
            <span className="text-[10px] uppercase tracking-wider text-[#69796a]">Masterplan Buildings</span>
          </div>
          <div>
            <span className="block font-display font-bold text-[18px] md:text-[22px] text-[#101b17]">15.0 M</span>
            <span className="text-[10px] uppercase tracking-wider text-[#69796a]">Max Apex Height</span>
          </div>
          <div>
            <span className="block font-display font-bold text-[18px] md:text-[22px] text-[#101b17]">24/7 Security</span>
            <span className="text-[10px] uppercase tracking-wider text-[#69796a]">Bonded Gatehouse</span>
          </div>
          <div>
            <span className="block font-display font-bold text-[18px] md:text-[22px] text-[#101b17]">Direct Rail</span>
            <span className="text-[10px] uppercase tracking-wider text-[#69796a]">Intermodal Cargo Siding</span>
          </div>
        </div>
      </div>
    </section>
  );
};
