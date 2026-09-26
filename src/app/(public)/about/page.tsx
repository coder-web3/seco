import React from 'react';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import AboutHero from '@/components/public/AboutHero';
import VisionMissionValues from '@/components/public/VisionMissionValues';
import OurStrengths from '@/components/public/OurStrengths';
import AboutCtaBanner from '@/components/public/AboutCtaBanner';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await prisma.seoSetting.findUnique({ where: { pageKey: 'about' } }).catch(() => null);
  return {
    title: seo?.metaTitle || 'About Us - SECO LINE',
    description: seo?.metaDescription || 'Learn about our engineering philosophy, team, and track record.',
  };
}

export default async function AboutPage() {
  const about = await prisma.aboutPage.findFirst().catch(() => null);

  let vmvValuesList = undefined;
  if (about?.vmvValuesJson) {
    try {
      vmvValuesList = JSON.parse(about.vmvValuesJson);
    } catch (e) {
      console.error('Error parsing vmvValuesJson', e);
    }
  }

  let strengthsList = undefined;
  if (about?.strengthsJson) {
    try {
      strengthsList = JSON.parse(about.strengthsJson);
    } catch (e) {
      console.error('Error parsing strengthsJson', e);
    }
  }

  return (
    <div className="space-y-12 sm:space-y-16 pb-12 overflow-x-hidden w-full max-w-full">
      {/* 1. Custom About Hero Section */}
      <AboutHero 
        kicker={about?.heroKicker || undefined}
        titleLine1={about?.heroTitleLine1 || about?.heading || undefined}
        titleGreen={about?.heroTitleLine2Green || undefined}
        subtitle={about?.heroSubtitle || about?.subheading || undefined}
        bgImageUrl={about?.heroBgImageUrl || about?.imageUrl || undefined}
        videoUrl={about?.heroVideoUrl || undefined}
        badge1Value={about?.heroBadge1Value || undefined}
        badge1Label={about?.heroBadge1Label || undefined}
        badge2Value={about?.heroBadge2Value || undefined}
        badge2Label={about?.heroBadge2Label || undefined}
        badge3Value={about?.heroBadge3Value || undefined}
        badge3Label={about?.heroBadge3Label || undefined}
      />

      {/* 2. Vision, Mission & Core Values Section */}
      <VisionMissionValues 
        kicker={about?.vmvKicker || undefined}
        titleLine1={about?.vmvTitleLine1 || undefined}
        titleGreen={about?.vmvTitleLine2Green || undefined}
        description={about?.vmvDescription || undefined}
        skylineImageUrl={about?.vmvSkylineImageUrl || undefined}
        badgeText={about?.vmvBadgeText || undefined}
        visionTitle={about?.vmvVisionTitle || undefined}
        visionDesc={about?.vmvVisionDesc || about?.vision || undefined}
        missionTitle={about?.vmvMissionTitle || undefined}
        missionDesc={about?.vmvMissionDesc || about?.mission || undefined}
        valuesList={vmvValuesList}
      />

      {/* 3. Our Strengths Section */}
      <OurStrengths 
        kicker={about?.strengthsKicker || undefined}
        titleLine1={about?.strengthsTitleLine1 || undefined}
        titleGreen={about?.strengthsTitleLine2Green || undefined}
        description={about?.strengthsDescription || undefined}
        tagline={about?.strengthsTagline || undefined}
        imageUrl={about?.strengthsImageUrl || undefined}
        badgeText={about?.strengthsBadgeText || undefined}
        strengthsList={strengthsList}
      />

      {/* 4. Partner with SECO LINE CTA Banner */}
      <AboutCtaBanner 
        kicker={about?.ctaKicker || undefined}
        titleLine1={about?.ctaTitleLine1 || undefined}
        titleGreen={about?.ctaTitleLine2Green || undefined}
        buttonText={about?.ctaButtonText || undefined}
        buttonLink={about?.ctaButtonLink || undefined}
        value1={about?.ctaValue1 || undefined}
        value2={about?.ctaValue2 || undefined}
        value3={about?.ctaValue3 || undefined}
        imageUrl={about?.ctaImageUrl || undefined}
        overlayText={about?.ctaOverlayText || undefined}
      />
    </div>
  );
}
