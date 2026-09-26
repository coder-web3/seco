import React from 'react';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import ContactHero from '@/components/public/ContactHero';
import ContactProjectEnquirySection from '@/components/public/ContactProjectEnquirySection';
import ContactMapSection from '@/components/public/ContactMapSection';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await prisma.seoSetting.findUnique({ where: { pageKey: 'contact' } }).catch(() => null);
  return {
    title: seo?.metaTitle || 'Contact Us - SECO LINE',
    description: seo?.metaDescription || 'Reach out to our contracting and engineering team for consultations, project proposals, and technical support across Saudi Arabia.',
  };
}

export default async function ContactPage() {
  const [settings, contactPage] = await Promise.all([
    prisma.siteSetting.findFirst().catch(() => null),
    prisma.contactPageSetting.findFirst().catch(() => null),
  ]);

  return (
    <div className="pb-16 font-sans select-none space-y-6">
      
      {/* 1. Premium Unique Contact Hero Section */}
      <ContactHero 
        kicker={contactPage?.heroKicker || undefined}
        titleLine1={contactPage?.heroTitleLine1 || undefined}
        titleLine2Green={contactPage?.heroTitleLine2Green || undefined}
        subtitle={contactPage?.heroSubtitle || undefined}
        phoneDisplay={contactPage?.callPhone || settings?.contactPhone || '+966 12 345 6789'} 
        bgImageUrl={contactPage?.heroBgImageUrl || undefined}
        overlayImageUrl={contactPage?.heroOverlayImageUrl || undefined}
      />

      {/* 2. Start a Conversation & Project Enquiry Section */}
      <ContactProjectEnquirySection
        kicker={contactPage?.enquiryKicker || undefined}
        titleLine1={contactPage?.enquiryTitleLine1 || undefined}
        titleLine2Green={contactPage?.enquiryTitleLine2Green || undefined}
        description={contactPage?.enquiryDescription || undefined}
        email={contactPage?.generalEmail || settings?.contactEmail || 'info@secoline.com.sa'}
        phone={contactPage?.callPhone || settings?.contactPhone || '+966 12 345 6789'}
        address={contactPage?.headOfficeAddress || settings?.address || 'Building No. 2341, Salahuddin Al Ayyubi Street, Al Malaz District, Riyadh 12841, Saudi Arabia'}
        workingArea={contactPage?.workingArea || undefined}
      />

      {/* 3. Google Maps iFrame Section */}
      <ContactMapSection
        kicker={contactPage?.mapKicker || undefined}
        titleLine1={contactPage?.mapTitleLine1 || undefined}
        titleLine2Green={contactPage?.mapTitleLine2Green || undefined}
        address={contactPage?.headOfficeAddress || settings?.address || 'Building No. 2341, Salahuddin Al Ayyubi Street, Al Malaz District, Riyadh 12841, Saudi Arabia'}
        mapEmbedUrl={contactPage?.mapEmbedUrl || undefined}
        directMapsUrl={contactPage?.directMapsUrl || undefined}
      />

    </div>
  );
}
