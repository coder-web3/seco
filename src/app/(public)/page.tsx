import React from 'react';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Hero from '@/components/public/Hero';
import AboutSection from '@/components/public/AboutSection';
import ServicesSection from '@/components/public/ServicesSection';
import CtaBanner from '@/components/public/CtaBanner';
import ProcessSection from '@/components/public/ProcessSection';
import ProjectsSection from '@/components/public/ProjectsSection';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await prisma.seoSetting.findUnique({
    where: { pageKey: 'home' },
  }).catch(() => null);

  return {
    title: seo?.metaTitle || 'SECO LINE - Saudi Arabian Construction & Contracting',
    description: seo?.metaDescription || 'SECO LINE is a premier Saudi Arabian construction and contracting company building sustainable solutions for the Kingdom.',
    openGraph: {
      title: seo?.metaTitle || 'SECO LINE',
      description: seo?.metaDescription || 'Saudi Arabian Construction & Contracting Company.',
      images: seo?.ogImage ? [{ url: seo.ogImage }] : undefined,
    },
  };
}

export default async function HomePage() {
  const [homepage, dbServices, dbProjects, dbStats] = await Promise.all([
    prisma.homepage.findFirst().catch(() => null),
    prisma.service.findMany({ where: { isPublished: true }, orderBy: { sortOrder: 'asc' } }).catch(() => []),
    prisma.project.findMany({ where: { isPublished: true }, orderBy: { sortOrder: 'asc' }, take: 4 }).catch(() => []),
    prisma.homepageStat.findMany({ where: { isVisible: true }, orderBy: { sortOrder: 'asc' } }).catch(() => []),
  ]);

  const formattedServices = dbServices.length > 0
    ? dbServices.map((s) => ({
        id: s.id,
        title: s.title,
        excerpt: s.excerpt || s.content || '',
        slug: s.slug,
        iconName: s.icon || 'building',
        imageUrl: s.imageUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
      }))
    : undefined;

  const formattedProjects = dbProjects.length > 0
    ? dbProjects.map((p, idx) => ({
        id: p.id,
        number: `0${idx + 1}`,
        title: p.title,
        category: p.category || 'Construction',
        imageUrl: p.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        linkUrl: `/projects/${p.slug}`,
      }))
    : undefined;

  const formattedStats = dbStats.length > 0
    ? dbStats.map((s) => ({
        id: s.id,
        value: `${s.prefix || ''}${s.value}${s.suffix || ''}`,
        label: s.label,
      }))
    : undefined;

  let industryCards = undefined;
  if (homepage?.featuresSubtitle) {
    try {
      const parsed = JSON.parse(homepage.featuresSubtitle);
      if (Array.isArray(parsed) && parsed.length > 0) {
        industryCards = parsed;
      }
    } catch (e) {
      console.error('Failed to parse industry cards JSON', e);
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6 pb-12">
      {/* 1. Hero Section */}
      <Hero
        kicker={homepage?.heroBadge || 'CONSTRUCTING A BETTER TOMORROW'}
        titleLine1={homepage?.heroTitle || 'Spaces Today'}
        titleLine2Green={homepage?.heroTitleLine2Green || 'Greater Tomorrow'}
        subtitle={homepage?.heroSubtitle || 'At SECO LINE, we build more than structures — we create lasting spaces for people, businesses and communities across Saudi Arabia.'}
        primaryCtaText={homepage?.heroCtaText || 'Get a Free Quote'}
        primaryCtaLink={homepage?.heroCtaLink || '/contact'}
        bgImageUrl={homepage?.heroImageUrl || undefined}
        personImageUrl={homepage?.personImageUrl || undefined}
        personHoverImageUrl={homepage?.personHoverImageUrl || undefined}
      />

      {/* 2. About SECO LINE Section */}
      <div className="-mt-10 sm:-mt-12">
        <AboutSection
          kicker={homepage?.aboutKicker || 'ABOUT SECO LINE'}
          titleLine1={homepage?.aboutSnippetTitle || 'Built on Trust.'}
          titleLine2Green={homepage?.aboutTitleLine2Green || 'Driven by a Greater Tomorrow.'}
          description={homepage?.aboutSnippetContent || 'SECO LINE is a Saudi Arabian construction and contracting company committed to building more than structures — we build opportunities, stronger communities and a more sustainable future for the Kingdom.'}
          primaryCtaText={homepage?.aboutCtaText || 'Learn More About Us'}
          primaryCtaLink={homepage?.aboutSnippetLink || '/about'}
          imageUrl={homepage?.aboutSnippetImage || '/assets/images/about-secoline.jpg'}
          stats={formattedStats}
        />
      </div>

      {/* 3. Our Services Section */}
      <ServicesSection
        kicker={homepage?.servicesKicker || 'OUR SERVICES'}
        titleLine1={homepage?.servicesTitleLine1 || 'Complete Construction'}
        titleLine2Green={homepage?.servicesTitleLine2Green || 'Solutions for a Brighter Tomorrow'}
        description={homepage?.servicesDescription || 'From concept to completion, SECO LINE delivers integrated construction and contracting services that create lasting value for people, businesses and communities across Saudi Arabia.'}
        services={formattedServices}
        allServicesLink="/services"
        bannerImageUrl={homepage?.servicesImageUrl || '/assets/images/about-secoline.jpg'}
      />

      {/* 4. Call-to-Action Banner */}
      <CtaBanner
        badge="START YOUR PROJECT TODAY"
        title={homepage?.ctaTitle || 'Ready to Build Your Next Landmark in Saudi Arabia?'}
        subtitle={homepage?.ctaSubtitle || 'Partner with SECO LINE for world-class construction, engineering, and infrastructure solutions aligned with Saudi Vision 2030.'}
        primaryCtaText={homepage?.ctaButtonText || 'Get a Free Quote'}
        primaryCtaLink={homepage?.ctaButtonLink || '/contact'}
        secondaryCtaText="Talk with Experts"
        secondaryCtaLink="/contact"
      />

      {/* 5. Our Process Section */}
      <ProcessSection
        kicker={homepage?.processKicker || 'OUR PROCESS'}
        titleLine1={homepage?.processTitleLine1 || 'From Vision'}
        titleLine2Green={homepage?.processTitleLine2Green || 'to a Lasting Reality'}
        description={homepage?.processDescription || 'We follow a structured and transparent process to ensure every project is delivered with quality, efficiency and long-term value.'}
        consultationLink={homepage?.processConsultationLink || '/contact'}
        stepsJson={homepage?.processStepsJson}
        bannerImageUrl={homepage?.processImageUrl || '/assets/images/about-secoline.jpg'}
      />

      {/* 5. Our Industries Section */}
      <ProjectsSection
        kicker={homepage?.projectsKicker || 'OUR INDUSTRIES'}
        titleLine1={homepage?.projectsTitleLine1 || 'Powering Key Industries'}
        titleLine2Green={homepage?.projectsTitleLine2Green || 'Across Saudi Arabia'}
        description={homepage?.projectsDescription || 'We deliver integrated solutions tailored to the unique needs of diverse industries, helping our clients build, operate and grow toward a more sustainable future.'}
        viewAllText={homepage?.featuresTitle || 'Get In Touch'}
        viewAllLink="/contact"
        bgImageUrl={homepage?.projectsImageUrl || '/assets/images/about-secoline.jpg'}
        projects={industryCards}
      />
    </div>
  );
}
