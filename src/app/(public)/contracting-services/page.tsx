import React from 'react';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import ServicesHero from '@/components/public/ServicesHero';
import ContractingCapabilitiesGrid from '@/components/public/ContractingCapabilitiesGrid';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await prisma.seoSetting.findUnique({ where: { pageKey: 'contracting-services' } })
    .catch(() => null);
  const fallbackSeo = await prisma.seoSetting.findUnique({ where: { pageKey: 'services' } })
    .catch(() => null);

  return {
    title: seo?.metaTitle || fallbackSeo?.metaTitle || 'Contracting Services - SECO LINE',
    description: seo?.metaDescription || fallbackSeo?.metaDescription || 'End-to-end industrial, civil execution, MEP, scaffolding, equipment rental, and manpower contracting solutions across Saudi Arabia.',
  };
}

export default async function ContractingServicesPage() {
  const [services, heroData] = await Promise.all([
    prisma.service.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: 'asc' },
    }).catch(() => []),
    prisma.servicesHeroSetting.findFirst().catch(() => null),
  ]);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 font-sans select-none">
      
      {/* 1. Hero Section */}
      <ServicesHero
        kicker={heroData?.kicker || undefined}
        titleLine1={heroData?.titleLine1 || undefined}
        titleLine2={heroData?.titleLine2 || undefined}
        titleGreen={heroData?.titleGreen || undefined}
        subtitle={heroData?.subtitle || undefined}
        badge1Text={heroData?.badge1Text || undefined}
        badge2Text={heroData?.badge2Text || undefined}
        badge3Text={heroData?.badge3Text || undefined}
        stat1Value={heroData?.stat1Value || undefined}
        stat1Label={heroData?.stat1Label || undefined}
        stat2Value={heroData?.stat2Value || undefined}
        stat2Label={heroData?.stat2Label || undefined}
        stat3Value={heroData?.stat3Value || undefined}
        stat3Label={heroData?.stat3Label || undefined}
        bgImageUrl={heroData?.bgImageUrl || undefined}
        overlayImageUrl={heroData?.overlayImageUrl || undefined}
      />

      {/* 2. Premium Unique Contracting Capabilities Grid with Animations */}
      <ContractingCapabilitiesGrid services={services} />

    </div>
  );
}
