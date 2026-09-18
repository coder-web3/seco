import React from 'react';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import ContactForm from '@/components/public/ContactForm';
import { Mail, Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await prisma.seoSetting.findUnique({ where: { pageKey: 'contact' } }).catch(() => null);
  return {
    title: seo?.metaTitle || 'Contact Us - Seko Agency',
    description: seo?.metaDescription || 'Reach out to our engineering team for consultations, proposals, and support.',
  };
}

export default async function ContactPage() {
  const settings = await prisma.siteSetting.findFirst().catch(() => null);

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Get In Touch</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Let’s Build Something Exceptional Together
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Tell us about your technical roadmap, upcoming launches, or migration requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Form (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Send Us a Direct Message</h2>
          <ContactForm />
        </div>

        {/* Contact Info Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-900">Direct Contact Information</h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Email Us</p>
                  <a
                    href={`mailto:${settings?.contactEmail || 'contact@seko.com'}`}
                    className="text-slate-600 hover:text-indigo-600 transition"
                  >
                    {settings?.contactEmail || 'contact@seko.com'}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Call Directly</p>
                  <a
                    href={`tel:${settings?.contactPhone || '+1 (555) 234-5678'}`}
                    className="text-slate-600 hover:text-indigo-600 transition"
                  >
                    {settings?.contactPhone || '+1 (555) 234-5678'}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Studio Headquarters</p>
                  <p className="text-slate-600">
                    {settings?.address || '742 Evergreen Terrace, Suite 100, San Francisco, CA'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Response SLA</p>
                  <p className="text-slate-600">Under 24 hours on business days</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Data Protection</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Inquiries are sanitized, encrypted in transit, and saved into our dedicated MySQL database instance. We never share your data with third parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
