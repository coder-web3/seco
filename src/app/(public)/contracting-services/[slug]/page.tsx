import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

import ServiceDetailHero from '@/components/public/service-detail/ServiceDetailHero';
import ServiceDetailOverview from '@/components/public/service-detail/ServiceDetailOverview';
import ServiceDetailCapabilities from '@/components/public/service-detail/ServiceDetailCapabilities';
import ServiceDetailProcess from '@/components/public/service-detail/ServiceDetailProcess';
import ServiceDetailCta from '@/components/public/service-detail/ServiceDetailCta';

export const dynamic = 'force-dynamic';

interface ServiceDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const service = await prisma.service.findUnique({
    where: { slug: params.slug },
  }).catch(() => null);

  if (!service) return { title: 'Service Not Found - SECO LINE' };

  return {
    title: `${service.title} - SECO LINE Contracting Services`,
    description: service.excerpt || `Full details and capabilities for ${service.title}.`,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const service = await prisma.service.findUnique({ where: { slug: params.slug } }).catch(() => null);

  if (!service || !service.isPublished) {
    notFound();
  }

  const [settings, perServiceDetail, globalDetail] = await Promise.all([
    prisma.siteSetting.findFirst().catch(() => null),
    prisma.serviceDetailSetting.findUnique({ where: { serviceId: service.id } }).catch(() => null),
    prisma.serviceDetailSetting.findFirst({ where: { serviceId: null } }).catch(() => null),
  ]);

  const detailSettings = perServiceDetail || globalDetail;

  return (
    <div className="pb-16 font-sans select-none space-y-6">
      
      {/* 1. Dark Hero Section with Floating Glass Stats Bar */}
      <ServiceDetailHero
        title={service.title}
        excerpt={service.excerpt}
        imageUrl={service.imageUrl}
        phoneDisplay={settings?.contactPhone || '+966 12 345 6789'}
        kicker={detailSettings?.heroKicker || undefined}
        heroSubtitleText={detailSettings?.heroSubtitle || undefined}
        stat1Value={detailSettings?.heroStat1Value || undefined}
        stat1Label={detailSettings?.heroStat1Label || undefined}
        stat2Value={detailSettings?.heroStat2Value || undefined}
        stat2Label={detailSettings?.heroStat2Label || undefined}
        stat3Value={detailSettings?.heroStat3Value || undefined}
        stat3Label={detailSettings?.heroStat3Label || undefined}
        heroTaglineText={detailSettings?.heroTagline || undefined}
      />

      {/* 2. "Building What Matters Most" Overview & 3 Feature Badges Section */}
      <ServiceDetailOverview
        title={service.title}
        content={service.content}
        imageUrl={service.imageUrl}
        kicker={detailSettings?.overviewKicker || undefined}
        overviewTitle={detailSettings?.overviewTitle || undefined}
        overviewTitleGreen={detailSettings?.overviewTitleGreen || undefined}
        feature1Title={detailSettings?.feature1Title || undefined}
        feature1Desc={detailSettings?.feature1Desc || undefined}
        feature2Title={detailSettings?.feature2Title || undefined}
        feature2Desc={detailSettings?.feature2Desc || undefined}
        feature3Title={detailSettings?.feature3Title || undefined}
        feature3Desc={detailSettings?.feature3Desc || undefined}
        pdfDownloadUrl={detailSettings?.pdfDownloadUrl || undefined}
      />

      {/* 3. "OUR OTHER SERVICES" Grid & Interactive Carousel Section */}
      <ServiceDetailCapabilities
        serviceTitle={service.title}
        kicker={detailSettings?.capabilitiesKicker || undefined}
        title1={detailSettings?.capabilitiesTitle1 || undefined}
        title2Green={detailSettings?.capabilitiesTitle2Green || undefined}
        subtitle={detailSettings?.capabilitiesSubtitle || undefined}
        capabilitiesJson={detailSettings?.capabilitiesJson || undefined}
      />

      {/* 4. Structured 4-Step Execution Process Section */}
      <ServiceDetailProcess
        kicker={detailSettings?.processKicker || undefined}
        title1={detailSettings?.processTitle1 || undefined}
        title2Green={detailSettings?.processTitle2Green || undefined}
        subtitle={detailSettings?.processSubtitle || undefined}
        processStepsJson={detailSettings?.processStepsJson || undefined}
      />

      {/* 5. Dark Navy Project Enquiry CTA Banner */}
      <ServiceDetailCta
        serviceTitle={service.title}
        kicker={detailSettings?.ctaKicker || undefined}
        title1={detailSettings?.ctaTitle1 || undefined}
        title2Green={detailSettings?.ctaTitle2Green || undefined}
        description={detailSettings?.ctaDescription || undefined}
        buttonText={detailSettings?.ctaButtonText || undefined}
        phone={detailSettings?.ctaPhone || settings?.contactPhone || undefined}
        badge1={detailSettings?.ctaBadge1 || undefined}
        badge2={detailSettings?.ctaBadge2 || undefined}
        badge3={detailSettings?.ctaBadge3 || undefined}
      />

    </div>
  );
}
