import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    let homepage = await prisma.homepage.findFirst();
    if (!homepage) {
      homepage = await prisma.homepage.create({
        data: {
          id: 1,
          heroBadge: 'CONSTRUCTING A BETTER TOMORROW',
          heroTitle: 'Spaces Today',
          heroTitleLine2Green: 'Greater Tomorrow',
          heroSubtitle: 'At SECO LINE, we build more than structures — we create lasting spaces for people, businesses and communities across Saudi Arabia.',
          heroCtaText: 'Get a Free Quote',
          heroCtaLink: '/contact',
          aboutKicker: 'ABOUT SECO LINE',
          aboutSnippetTitle: 'Built on Trust.',
          aboutTitleLine2Green: 'Driven by a Greater Tomorrow.',
          aboutSnippetContent: 'SECO LINE is a Saudi Arabian construction and contracting company committed to building more than structures — we build opportunities, stronger communities and a more sustainable future for the Kingdom.',
          aboutSnippetImage: '/assets/images/about-secoline.jpg',
          aboutSnippetLink: '/about',
          aboutCtaText: 'Learn More About Us',
          servicesKicker: 'OUR SERVICES',
          servicesTitleLine1: 'Complete Construction',
          servicesTitleLine2Green: 'Solutions for a Brighter Tomorrow',
          servicesDescription: 'From concept to completion, SECO LINE delivers integrated construction and contracting services that create lasting value for people, businesses and communities across Saudi Arabia.',
          processKicker: 'OUR PROCESS',
          processTitleLine1: 'From Vision',
          processTitleLine2Green: 'to a Lasting Reality',
          processDescription: 'We follow a structured and transparent process to ensure every project is delivered with quality, efficiency and long-term value.',
          processConsultationLink: '/contact',
          projectsKicker: 'FEATURED PROJECTS',
          projectsTitleLine1: 'Real Projects.',
          projectsTitleLine2Green: 'Lasting Impact.',
          projectsDescription: 'From landmark developments to essential infrastructure, SECO LINE delivers spaces that inspire growth and strengthen communities across Saudi Arabia.',
          ctaTitle: 'Ready to Build Your Next Landmark in Saudi Arabia?',
          ctaSubtitle: 'Partner with SECO LINE for world-class construction, engineering, and infrastructure solutions aligned with Saudi Vision 2030.',
          ctaButtonText: 'Get a Free Quote',
          ctaButtonLink: '/contact',
        },
      });
    }
    return NextResponse.json({ success: true, homepage });
  } catch (error: any) {
    console.error('Fetch homepage error:', error);
    return NextResponse.json({ error: 'Failed to fetch homepage content' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    const homepage = await prisma.homepage.upsert({
      where: { id: 1 },
      update: {
        heroBadge: data.heroBadge,
        heroTitle: data.heroTitle || 'Spaces Today',
        heroTitleLine2Green: data.heroTitleLine2Green,
        heroSubtitle: data.heroSubtitle,
        heroCtaText: data.heroCtaText,
        heroCtaLink: data.heroCtaLink,
        heroSecondaryCtaText: data.heroSecondaryCtaText,
        heroSecondaryCtaLink: data.heroSecondaryCtaLink,
        heroImageUrl: data.heroImageUrl,

        aboutKicker: data.aboutKicker,
        aboutSnippetTitle: data.aboutSnippetTitle,
        aboutTitleLine2Green: data.aboutTitleLine2Green,
        aboutSnippetContent: data.aboutSnippetContent,
        aboutSnippetImage: data.aboutSnippetImage,
        aboutSnippetLink: data.aboutSnippetLink,
        aboutCtaText: data.aboutCtaText,

        servicesKicker: data.servicesKicker,
        servicesTitleLine1: data.servicesTitleLine1,
        servicesTitleLine2Green: data.servicesTitleLine2Green,
        servicesDescription: data.servicesDescription,
        servicesImageUrl: data.servicesImageUrl,

        processKicker: data.processKicker,
        processTitleLine1: data.processTitleLine1,
        processTitleLine2Green: data.processTitleLine2Green,
        processDescription: data.processDescription,
        processConsultationLink: data.processConsultationLink,
        processStepsJson: data.processStepsJson,
        processImageUrl: data.processImageUrl,

        projectsKicker: data.projectsKicker,
        projectsTitleLine1: data.projectsTitleLine1,
        projectsTitleLine2Green: data.projectsTitleLine2Green,
        projectsDescription: data.projectsDescription,
        projectsImageUrl: data.projectsImageUrl,

        featuresTitle: data.featuresTitle,
        featuresSubtitle: data.featuresSubtitle,
        ctaTitle: data.ctaTitle,
        ctaSubtitle: data.ctaSubtitle,
        ctaButtonText: data.ctaButtonText,
        ctaButtonLink: data.ctaButtonLink,
      },
      create: {
        id: 1,
        heroBadge: data.heroBadge,
        heroTitle: data.heroTitle || 'Spaces Today',
        heroTitleLine2Green: data.heroTitleLine2Green,
        heroSubtitle: data.heroSubtitle,
        heroCtaText: data.heroCtaText,
        heroCtaLink: data.heroCtaLink,
        heroSecondaryCtaText: data.heroSecondaryCtaText,
        heroSecondaryCtaLink: data.heroSecondaryCtaLink,
        heroImageUrl: data.heroImageUrl,

        aboutKicker: data.aboutKicker,
        aboutSnippetTitle: data.aboutSnippetTitle,
        aboutTitleLine2Green: data.aboutTitleLine2Green,
        aboutSnippetContent: data.aboutSnippetContent,
        aboutSnippetImage: data.aboutSnippetImage,
        aboutSnippetLink: data.aboutSnippetLink,
        aboutCtaText: data.aboutCtaText,

        servicesKicker: data.servicesKicker,
        servicesTitleLine1: data.servicesTitleLine1,
        servicesTitleLine2Green: data.servicesTitleLine2Green,
        servicesDescription: data.servicesDescription,
        servicesImageUrl: data.servicesImageUrl,

        processKicker: data.processKicker,
        processTitleLine1: data.processTitleLine1,
        processTitleLine2Green: data.processTitleLine2Green,
        processDescription: data.processDescription,
        processConsultationLink: data.processConsultationLink,
        processStepsJson: data.processStepsJson,
        processImageUrl: data.processImageUrl,

        projectsKicker: data.projectsKicker,
        projectsTitleLine1: data.projectsTitleLine1,
        projectsTitleLine2Green: data.projectsTitleLine2Green,
        projectsDescription: data.projectsDescription,
        projectsImageUrl: data.projectsImageUrl,

        featuresTitle: data.featuresTitle,
        featuresSubtitle: data.featuresSubtitle,
        ctaTitle: data.ctaTitle,
        ctaSubtitle: data.ctaSubtitle,
        ctaButtonText: data.ctaButtonText,
        ctaButtonLink: data.ctaButtonLink,
      },
    });

    revalidatePath('/');
    return NextResponse.json({ success: true, homepage });
  } catch (error: any) {
    console.error('Failed to update homepage:', error);
    return NextResponse.json({ error: 'Failed to save homepage' }, { status: 500 });
  }
}
