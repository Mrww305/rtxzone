import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Download, Copy, Check, Info } from 'lucide-react';
import { BUILDINGS_DATA } from '../data/buildings';

interface ContactSectionProps {
  initialInterest?: string;
  selectedBuildingCode?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialInterest,
  selectedBuildingCode
}) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    interest: initialInterest || '',
    building: selectedBuildingCode || '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<string>(
    'Prototype only — prepare your structured enquiry draft or download as a file.'
  );
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialInterest) {
      setFormData((prev) => ({ ...prev, interest: initialInterest }));
    }
  }, [initialInterest]);

  useEffect(() => {
    if (selectedBuildingCode) {
      setFormData((prev) => ({
        ...prev,
        building: selectedBuildingCode,
        interest: prev.interest || 'Industrial plot or space enquiry',
        message: prev.message || `We are interested in discussing lease options and technical specifications for ${selectedBuildingCode}.`
      }));
    }
  }, [selectedBuildingCode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateEnquiryText = () => {
    return [
      `==================================================`,
      `RESHMA TEX — PRIVATE INDUSTRIAL ZONE`,
      `Official Enquiry & Development Brief`,
      `Date: ${new Date().toLocaleDateString('en-US', { dateStyle: 'full' })}`,
      `==================================================`,
      ``,
      `Full Name:    ${formData.name || 'Not provided'}`,
      `Company:      ${formData.company || 'Not provided'}`,
      `Email:        ${formData.email || 'Not provided'}`,
      `Phone:        ${formData.phone || 'Not provided'}`,
      `Enquiry Type: ${formData.interest || 'General'}`,
      `Building:     ${formData.building || 'General Zone / Multiple Buildings'}`,
      ``,
      `Requirements & Message:`,
      `${formData.message || 'No additional message provided.'}`,
      ``,
      `==================================================`,
      `Prepared via RESHMA TEX Interactive Zone Portal.`
    ].join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enquiryText = generateEnquiryText();

    // Create and download file
    const blob = new Blob([enquiryText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reshma-tex-enquiry-${formData.building || 'general'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setSubmitted(true);
    setFormStatus(
      `Your enquiry draft has been prepared and downloaded as "${a.download}". Connect your API or CRM endpoint for live dispatch.`
    );
  };

  const handleCopy = async () => {
    const enquiryText = generateEnquiryText();
    try {
      await navigator.clipboard.writeText(enquiryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#d2f36b] text-[#101b17] transition-colors">
      <div className="w-[min(1240px,calc(100%-48px))] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Contact Narrative */}
          <div className="lg:col-span-5">
            <div className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#445b37] mb-3 flex items-center gap-2">
              <span className="w-5 h-[1px] bg-[#445b37]" />
              Let's connect
            </div>

            <h2 className="font-display font-medium text-[clamp(40px,5.8vw,74px)] leading-[0.98] tracking-[-0.075em] my-4 md:my-5 text-[#101b17]">
              Your next industrial opportunity <em className="font-serif-italic font-normal">starts here.</em>
            </h2>

            <p className="text-[#3f5235] text-[14px] leading-[1.8] max-w-[420px] mb-8">
              Tell us a little about what you are looking for. The form is a front-end prototype; connect it to your preferred email or CRM service before publishing.
            </p>

            <div className="p-5 bg-[#bfdf5b] border border-[#a2c340] space-y-3 text-[12px] text-[#2c3d24]">
              <div className="flex items-center gap-2 font-display font-bold text-[13px] text-[#101b17]">
                <Info className="w-4 h-4 text-[#101b17]" />
                Zone Management Liaison
              </div>
              <p className="m-0 leading-[1.6]">
                Our leasing and engineering representatives assist with custom facility specs, electrical load sizing (kVA), clear heights, and export corridor access.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-[#1d2b17] flex items-center gap-3">
                <span>📍 Private Industrial Zone, Campus 01—18</span>
              </div>
            </div>
          </div>

          {/* Right: Enquiry Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-[10px] uppercase tracking-[0.14em] font-bold text-[#101b17]">
                  Full name *
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-[#101b17]/35 bg-white/30 p-3.5 rounded-none text-[#101b17] placeholder:text-[#101b17]/45 outline-none focus:border-[#101b17] focus:bg-white/60 transition-colors text-[13px]"
                />
              </div>

              {/* Company */}
              <div className="flex flex-col gap-2">
                <label htmlFor="company" className="text-[10px] uppercase tracking-[0.14em] font-bold text-[#101b17]">
                  Company / Organization
                </label>
                <input
                  id="company"
                  name="company"
                  autoComplete="organization"
                  placeholder="Company name"
                  value={formData.company}
                  onChange={handleChange}
                  className="border border-[#101b17]/35 bg-white/30 p-3.5 rounded-none text-[#101b17] placeholder:text-[#101b17]/45 outline-none focus:border-[#101b17] focus:bg-white/60 transition-colors text-[13px]"
                />
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[10px] uppercase tracking-[0.14em] font-bold text-[#101b17]">
                  Email address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-[#101b17]/35 bg-white/30 p-3.5 rounded-none text-[#101b17] placeholder:text-[#101b17]/45 outline-none focus:border-[#101b17] focus:bg-white/60 transition-colors text-[13px]"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-[10px] uppercase tracking-[0.14em] font-bold text-[#101b17]">
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+1 (555) 012-3456"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border border-[#101b17]/35 bg-white/30 p-3.5 rounded-none text-[#101b17] placeholder:text-[#101b17]/45 outline-none focus:border-[#101b17] focus:bg-white/60 transition-colors text-[13px]"
                />
              </div>

              {/* Interest Type */}
              <div className="flex flex-col gap-2">
                <label htmlFor="interest" className="text-[10px] uppercase tracking-[0.14em] font-bold text-[#101b17]">
                  I'm interested in *
                </label>
                <select
                  id="interest"
                  name="interest"
                  required
                  value={formData.interest}
                  onChange={handleChange}
                  className="border border-[#101b17]/35 bg-white/30 p-3.5 rounded-none text-[#101b17] outline-none focus:border-[#101b17] focus:bg-white/60 transition-colors text-[13px] cursor-pointer"
                >
                  <option value="">Select an enquiry type</option>
                  <option value="Industrial plot or space enquiry">Industrial plot or space enquiry</option>
                  <option value="Business establishment enquiry">Business establishment enquiry</option>
                  <option value="Investment or partnership enquiry">Investment or partnership enquiry</option>
                  <option value="Site visit request">Site visit request</option>
                  <option value="General enquiry">General enquiry</option>
                </select>
              </div>

              {/* Target Building Selector */}
              <div className="flex flex-col gap-2">
                <label htmlFor="building" className="text-[10px] uppercase tracking-[0.14em] font-bold text-[#101b17]">
                  Specific Building (Optional)
                </label>
                <select
                  id="building"
                  name="building"
                  value={formData.building}
                  onChange={handleChange}
                  className="border border-[#101b17]/35 bg-white/30 p-3.5 rounded-none text-[#101b17] outline-none focus:border-[#101b17] focus:bg-white/60 transition-colors text-[13px] cursor-pointer"
                >
                  <option value="">Any available plot or hall</option>
                  {BUILDINGS_DATA.map((b) => (
                    <option key={b.id} value={`${b.name} (${b.code})`}>
                      {b.name} ({b.code}) — {b.type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="sm:col-span-2 flex flex-col gap-2">
                <label htmlFor="message" className="text-[10px] uppercase tracking-[0.14em] font-bold text-[#101b17]">
                  Tell us more
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Your space requirements, timeline, electrical kVA needs, or preferred next steps..."
                  value={formData.message}
                  onChange={handleChange}
                  className="border border-[#101b17]/35 bg-white/30 p-3.5 rounded-none text-[#101b17] placeholder:text-[#101b17]/45 outline-none focus:border-[#101b17] focus:bg-white/60 transition-colors text-[13px] resize-y min-h-[110px]"
                />
              </div>

              {/* Submit & Secondary Action Buttons */}
              <div className="sm:col-span-2 flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-4 px-6 bg-[#101b17] text-[#fffdf7] hover:bg-[#1a2d23] hover:text-[#d2f36b] font-display text-[11px] font-bold tracking-[0.12em] uppercase transition-all flex items-center justify-between cursor-pointer border border-[#101b17]"
                >
                  <span>Prepare enquiry draft</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-full sm:w-auto py-4 px-5 border border-[#101b17]/40 hover:border-[#101b17] hover:bg-white/20 text-[#101b17] font-display text-[11px] font-bold tracking-[0.1em] uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#101b17]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy brief</span>
                    </>
                  )}
                </button>
              </div>

              {/* Status Note */}
              <div className="sm:col-span-2 text-[12px] leading-[1.6] text-[#2c3d24] pt-2" role="status">
                {formStatus}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
