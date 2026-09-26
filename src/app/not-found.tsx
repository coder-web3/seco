import React from 'react';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import NotFoundClient from '@/components/public/NotFoundClient';

export const dynamic = 'force-dynamic';

export default async function NotFound() {
  const settings = await prisma.siteSetting.findFirst().catch(() => null);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Exact Homepage Header */}
      <Navbar
        siteName={settings?.siteName || 'SECO LINE'}
        logoUrl={settings?.logoUrl}
        contactPhone={settings?.contactPhone}
        contactEmail={settings?.contactEmail}
        address={settings?.address}
        workingHours={settings?.workingHours}
        socialLinks={settings?.socialLinks}
      />

      {/* Main 404 Section with Reduced Font Sizes */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 bg-gradient-to-b from-slate-50 via-slate-100/60 to-slate-50">
        <NotFoundClient />
      </main>

      {/* Exact Homepage Footer */}
      <Footer
        siteName={settings?.siteName || 'SECO LINE'}
        tagline={settings?.siteTagline}
        contactEmail={settings?.contactEmail}
        contactPhone={settings?.contactPhone}
        address={settings?.address}
        socialLinks={settings?.socialLinks}
        footerText={settings?.footerText}
        logoUrl={settings?.logoUrl}
        footerImageUrl={settings?.footerImageUrl}
      />
    </div>
  );
}
