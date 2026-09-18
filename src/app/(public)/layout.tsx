import React from 'react';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';

export const dynamic = 'force-dynamic';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await prisma.siteSetting.findFirst().catch(() => null);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      <Navbar
        siteName={settings?.siteName || 'SECO LINE'}
        logoUrl={settings?.logoUrl}
        contactPhone={settings?.contactPhone}
        contactEmail={settings?.contactEmail}
        address={settings?.address}
        workingHours={settings?.workingHours}
        socialLinks={settings?.socialLinks}
      />
      <main className="flex-1">{children}</main>
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
