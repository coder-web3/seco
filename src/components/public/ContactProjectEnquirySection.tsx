'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  ArrowRight, 
  ShieldCheck, 
  Loader2, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

interface ContactProjectEnquirySectionProps {
  kicker?: string;
  titleLine1?: string;
  titleLine2Green?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  rabighBranchAddress?: string;
  workingArea?: string;
}

export default function ContactProjectEnquirySection({
  kicker = 'GET IN TOUCH',
  titleLine1 = 'Start a Conversation About Your',
  titleLine2Green = 'Next Project.',
  description = 'Connect with SECO LINE for contracting, construction, maintenance, manpower, logistics, equipment and industrial requirements across Saudi Arabia.',
  email = 'info@secoline.com.sa',
  phone = '+966 12 345 6789',
  address = 'Building No. 2341, Salahuddin Al Ayyubi Street, Al Malaz District, Riyadh 12841, Saudi Arabia',
  rabighBranchAddress = 'Building # 6871, Office # 08,\n3rd Floor, King Abdul Aziz Road,\nRabigh 25753, KSA',
  workingArea,
}: ContactProjectEnquirySectionProps) {

  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const [form, setForm] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    serviceRequired: '',
    projectLocation: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const subjectText = `[Project Enquiry] ${form.serviceRequired || 'General'} - ${form.projectLocation || 'KSA'}`;
      const fullMessage = `Company: ${form.companyName || 'N/A'}\nService Required: ${form.serviceRequired || 'N/A'}\nProject Location: ${form.projectLocation || 'N/A'}\n\nProject Requirements:\n${form.message}`;

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          phone: form.phone,
          subject: subjectText,
          message: fullMessage,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to send inquiry.');
      }

      setStatus({
        type: 'success',
        text: 'Thank you! Your project enquiry has been submitted successfully. Our engineering team will contact you shortly.',
      });

      setForm({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        serviceRequired: '',
        projectLocation: '',
        message: '',
      });
    } catch (err: any) {
      setStatus({
        type: 'error',
        text: err.message || 'An error occurred while submitting your enquiry. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact-form-section" className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 py-6 sm:py-10 select-none font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* LEFT COLUMN: Contact Information & Brand Taglines (5 Cols) */}
        <div className={`lg:col-span-5 space-y-6 sm:space-y-8 transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          
          {/* Header Title & Kicker */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#15B83E] font-heading">
              <span className="w-5 h-[2px] bg-[#15B83E]" />
              <span>{kicker}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold text-[#0D2137] font-heading tracking-tight leading-[1.15]">
              {titleLine1}{' '}
              <span className="text-[#15B83E] font-bold">{titleLine2Green}</span>
            </h2>

            <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed max-w-md">
              {description}
            </p>
          </div>

          {/* 4 Clean Contact Cards with Entrance & Icon Hover Animations */}
          <div className="space-y-3.5">
            
            {/* 1. General Enquiries */}
            <div 
              className={`group bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:border-[#15B83E]/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '150ms' }}
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200/80 text-[#15B83E] flex items-center justify-center flex-shrink-0 group-hover:bg-[#15B83E] group-hover:text-white group-hover:shadow-[0_6px_20px_rgba(21,184,62,0.35)] group-hover:scale-110 transition-all duration-300">
                <Mail className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#0D2137] font-heading group-hover:text-[#15B83E] transition-colors">
                  General Enquiries
                </div>
                <a href={`mailto:${email}`} className="text-xs sm:text-sm font-normal text-slate-600 hover:text-[#15B83E] transition truncate block mt-0.5">
                  {email}
                </a>
              </div>
            </div>

            {/* 2. Call Us */}
            <div 
              className={`group bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:border-[#15B83E]/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '250ms' }}
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200/80 text-[#15B83E] flex items-center justify-center flex-shrink-0 group-hover:bg-[#15B83E] group-hover:text-white group-hover:shadow-[0_6px_20px_rgba(21,184,62,0.35)] group-hover:scale-110 transition-all duration-300">
                <Phone className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#0D2137] font-heading group-hover:text-[#15B83E] transition-colors">
                  Call Us
                </div>
                <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="text-xs sm:text-sm font-semibold font-mono text-slate-700 hover:text-[#15B83E] transition truncate block mt-0.5">
                  {phone}
                </a>
              </div>
            </div>

            {/* 3. Head Office */}
            <div 
              className={`group bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:border-[#15B83E]/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '350ms' }}
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200/80 text-[#15B83E] flex items-center justify-center flex-shrink-0 group-hover:bg-[#15B83E] group-hover:text-white group-hover:shadow-[0_6px_20px_rgba(21,184,62,0.35)] group-hover:scale-110 transition-all duration-300">
                <MapPin className="w-5 h-5 transition-transform duration-300 group-hover:bounce" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#0D2137] font-heading group-hover:text-[#15B83E] transition-colors">
                  Head Office
                </div>
                <p className="text-xs sm:text-sm font-normal text-slate-600 leading-snug mt-0.5">
                  {address}
                </p>
              </div>
            </div>

            {/* 4. Rabigh Branch Office */}
            <div 
              className={`group bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:border-[#15B83E]/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '450ms' }}
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200/80 text-[#15B83E] flex items-center justify-center flex-shrink-0 group-hover:bg-[#15B83E] group-hover:text-white group-hover:shadow-[0_6px_20px_rgba(21,184,62,0.35)] group-hover:scale-110 transition-all duration-300">
                <Building2 className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#0D2137] font-heading group-hover:text-[#15B83E] transition-colors">
                  Rabigh Branch Office
                </div>
                <p className="text-xs sm:text-sm font-normal text-slate-600 leading-snug mt-0.5 whitespace-pre-line">
                  {rabighBranchAddress}
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Left Riyadh Skyline Vector Silhouette & Vertical Tagline */}
          <div className="pt-4 flex items-end justify-between gap-4">
            
            {/* Riyadh Skyline Vector Graphic */}
            <div className="relative w-64 h-16 opacity-30 pointer-events-none">
              <svg viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#15B83E]">
                <path d="M10 80 V50 H20 V40 H30 V80 M40 80 V30 H50 L60 20 L70 30 V80 M80 80 V60 H90 V80 M100 80 V10 H115 V80 M125 80 V45 H135 V80 M145 80 V25 L160 5 L175 25 V80 M185 80 V55 H195 V80 M205 80 V35 H220 V80 M230 80 V50 H245 V80 M255 80 V20 H270 V80" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Tagline */}
            <div className="flex items-center gap-2.5 font-mono text-[10px] font-bold tracking-widest text-slate-400 uppercase leading-snug text-right">
              <div className="w-[2px] h-10 bg-[#15B83E]" />
              <div>
                <div>PEOPLE</div>
                <div>SOLUTIONS</div>
                <div>PROGRESS</div>
                <div className="text-[#15B83E]">TOGETHER</div>
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: Project Enquiry Form Card (7 Cols) with Entrance Animation */}
        <div className={`lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6 relative overflow-hidden transition-all duration-700 delay-200 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          
          {/* Top Form Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#15B83E] font-heading">
                <span className="w-5 h-[2px] bg-[#15B83E]" />
                <span>PROJECT ENQUIRY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0D2137] font-heading tracking-tight">
                Tell Us What <span className="text-[#15B83E]">You Need.</span>
              </h2>
            </div>

            <p className="text-slate-500 text-xs sm:text-sm font-normal max-w-xs leading-relaxed">
              Share your project requirements and our team will get in touch to discuss the appropriate support for your needs.
            </p>
          </div>

          {/* Alert Status Feedback */}
          {status && (
            <div className={`p-4 rounded-2xl text-xs sm:text-sm flex items-start gap-3 shadow-sm ${
              status.type === 'success' 
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {status.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <span className="leading-relaxed">{status.text}</span>
            </div>
          )}

          {/* Main Enquiry Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Row 1: Full Name & Company Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0D2137] mb-1.5 font-heading">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#15B83E] focus:border-[#15B83E] focus:outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0D2137] mb-1.5 font-heading">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                  placeholder="Enter your company name"
                  className="w-full px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#15B83E] focus:border-[#15B83E] focus:outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Row 2: Email Address & Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0D2137] mb-1.5 font-heading">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#15B83E] focus:border-[#15B83E] focus:outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0D2137] mb-1.5 font-heading">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#15B83E] focus:border-[#15B83E] focus:outline-none transition-all duration-200 font-mono"
                />
              </div>
            </div>

            {/* Row 3: Service Required & Project Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0D2137] mb-1.5 font-heading">
                  Service Required <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={form.serviceRequired}
                  onChange={(e) => setForm({ ...form, serviceRequired: e.target.value })}
                  className="w-full px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#15B83E] focus:border-[#15B83E] focus:outline-none transition-all duration-200"
                >
                  <option value="">Select a service</option>
                  <option value="Civil Execution & Construction">Civil Execution & Construction</option>
                  <option value="Mechanical & Industrial Piping">Mechanical & Industrial Piping</option>
                  <option value="Electrical & Instrumentation (MEP)">Electrical & Instrumentation (MEP)</option>
                  <option value="Scaffolding & Access Solutions">Scaffolding & Access Solutions</option>
                  <option value="Equipment Rental & Lifting">Equipment Rental & Lifting Services</option>
                  <option value="Manpower Supply & Project Support">Manpower Supply & Support</option>
                  <option value="Quality & HSE Auditing">Quality & HSE Auditing</option>
                  <option value="Trading & Supply Solutions">Trading & Material Supply</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0D2137] mb-1.5 font-heading">
                  Project Location <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={form.projectLocation}
                  onChange={(e) => setForm({ ...form, projectLocation: e.target.value })}
                  className="w-full px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#15B83E] focus:border-[#15B83E] focus:outline-none transition-all duration-200"
                >
                  <option value="">Select location</option>
                  <option value="Riyadh Region">Riyadh Region</option>
                  <option value="Eastern Province (Dammam / Jubail)">Eastern Province (Dammam / Jubail)</option>
                  <option value="Jeddah / Makkah Region">Jeddah / Makkah Region</option>
                  <option value="NEOM / Tabuk Region">NEOM / Tabuk Region</option>
                  <option value="Yanbu / Madinah Region">Yanbu / Madinah Region</option>
                  <option value="AlUla / Northern Region">AlUla / Northern Region</option>
                  <option value="Southern Region">Southern Region</option>
                  <option value="Other Saudi Region">Other Saudi Region</option>
                </select>
              </div>
            </div>

            {/* Row 4: Project Details / Requirements */}
            <div>
              <label className="block text-xs font-bold text-[#0D2137] mb-1.5 font-heading">
                Project Details / Requirements <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us about your project..."
                className="w-full px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#15B83E] focus:border-[#15B83E] focus:outline-none transition-all duration-200"
              />
            </div>

            {/* Form Footer Action & Trust Badge */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-100">
              
              <button
                type="submit"
                disabled={loading}
                className="group relative inline-flex items-center justify-center gap-2.5 bg-[#15B83E] hover:bg-[#129c35] text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-[0_4px_25px_rgba(21,184,62,0.4)] hover:shadow-[0_6px_35px_rgba(21,184,62,0.65)] transition-all duration-300 hover:scale-[1.03] active:scale-95 disabled:opacity-50 font-heading uppercase tracking-wider cursor-pointer w-full sm:w-auto"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Enquiry</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </>
                )}
              </button>

              {/* Trust Badge with Hover Icon Animation */}
              <div className="group/trust flex items-center gap-3 text-slate-500 cursor-default">
                <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200/80 text-[#15B83E] flex items-center justify-center flex-shrink-0 group-hover/trust:bg-[#15B83E] group-hover/trust:text-white group-hover/trust:scale-110 transition-all duration-300 shadow-sm">
                  <ShieldCheck className="w-4 h-4 transition-transform duration-300 group-hover/trust:rotate-12" />
                </div>
                <div className="text-[11px] leading-tight">
                  <div className="font-bold text-[#0D2137] group-hover/trust:text-[#15B83E] transition-colors">Your information is safe with us.</div>
                  <div className="text-slate-400">We respect your privacy.</div>
                </div>
              </div>

            </div>

          </form>

        </div>

      </div>
    </section>
  );
}
