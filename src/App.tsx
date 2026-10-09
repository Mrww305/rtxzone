/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Topbar } from './components/Topbar';
import { FlightHero } from './components/FlightHero';
import { MasterplanSection } from './components/MasterplanSection';
import { VisionSection } from './components/VisionSection';
import { OpportunitiesSection } from './components/OpportunitiesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LightboxModal } from './components/LightboxModal';
import { BuildingSpec } from './data/buildings';

export default function App() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [enquiryInterest, setEnquiryInterest] = useState<string>('');
  const [selectedBuildingCode, setSelectedBuildingCode] = useState<string>('');

  const handleSelectBuildingForEnquiry = (building: BuildingSpec) => {
    setSelectedBuildingCode(`${building.name} (${building.code})`);
    setEnquiryInterest('Industrial plot or space enquiry');
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectEnquiryType = (type: string) => {
    setEnquiryInterest(type);
    setSelectedBuildingCode('');
  };

  const handleGenericEnquireClick = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExplorePlanClick = () => {
    const planElem = document.getElementById('masterplan');
    if (planElem) {
      planElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#101b17] text-[#fffdf7] selection:bg-[#d2f36b] selection:text-[#101b17] flex flex-col font-sans">
      {/* Navigation Topbar */}
      <Topbar onEnquireClick={handleGenericEnquireClick} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Interactive Cursor-Guided Aerial Descent */}
        <FlightHero
          onExplorePlanClick={handleExplorePlanClick}
          onEnquireClick={handleGenericEnquireClick}
        />

        {/* Masterplan Explorer & Building 01—18 Specifications */}
        <MasterplanSection
          onOpenLightbox={() => setLightboxOpen(true)}
          onSelectBuildingForEnquiry={handleSelectBuildingForEnquiry}
        />

        {/* Vision, Scale & Strategic Infrastructure */}
        <VisionSection />

        {/* Development Opportunities */}
        <OpportunitiesSection onSelectEnquiryType={handleSelectEnquiryType} />

        {/* Contact & Structured Enquiry Engine */}
        <ContactSection
          initialInterest={enquiryInterest}
          selectedBuildingCode={selectedBuildingCode}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Fullscreen Masterplan Lightbox */}
      <LightboxModal isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} />
    </div>
  );
}
