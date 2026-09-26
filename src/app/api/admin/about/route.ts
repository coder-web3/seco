import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    let about = await prisma.aboutPage.findFirst();

    if (!about) {
      about = await prisma.aboutPage.create({
        data: {
          id: 1,
          heading: 'Building a Stronger Tomorrow',
          subheading: 'SECO LINE Trading and Contracting Company (LLC) is a trusted partner for industrial, commercial and infrastructure projects across Saudi Arabia.',
          
          // Section 1: Hero
          heroKicker: 'ABOUT SECO LINE',
          heroTitleLine1: 'ENGINEERING & INDUSTRIAL',
          heroTitleLine2Green: 'SERVICES',
          heroSubtitle: 'SECO LINE is a leading multi-disciplinary contractor providing civil execution, scaffolding, equipment rental, manpower supply, and industrial trading solutions across Saudi Arabia.',
          heroBgImageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80',
          heroVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          heroBadge1Value: '15+',
          heroBadge1Label: 'Years Industry Track Record',
          heroBadge2Value: '500+',
          heroBadge2Label: 'Projects Successfully Executed',
          heroBadge3Value: '100%',
          heroBadge3Label: 'Safety & Quality Compliance',

          // Section 2: Vision, Mission & Values
          vmvKicker: 'VISION, MISSION & CORE VALUES',
          vmvTitleLine1: 'Guided by Purpose.',
          vmvTitleLine2Green: 'Committed to a Stronger Tomorrow.',
          vmvDescription: 'At SECO LINE, our vision, mission and core values guide everything we do. They reflect our commitment to delivering safe, high-quality and sustainable industrial solutions, while building long-term partnerships and creating lasting value for Saudi Arabia.',
          vmvSkylineImageUrl: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=1200&q=80',
          vmvBadgeText: 'A STRONGER SAUDI ARABIA THROUGH PARTNERSHIP',
          vmvVisionTitle: 'Our Vision',
          vmvVisionDesc: 'To become a trusted industrial solutions partner recognized for quality, safety, innovation, operational excellence and dependable service.',
          vmvMissionTitle: 'Our Mission',
          vmvMissionDesc: 'To deliver reliable, professional and efficient industrial solutions through skilled people, technical expertise, modern equipment and responsible execution.',
          vmvValuesJson: JSON.stringify([
            { num: '01', title: 'Quality', desc: 'Maintain contracting, civil execution, materials and customer service excellence.', icon: 'Trophy', color: 'green' },
            { num: '02', title: 'Safety', desc: 'Prioritize health, safety and environmental protection in all operations.', icon: 'HardHat', color: 'navy' },
            { num: '03', title: 'Integrity', desc: 'Operate with honesty, transparency and professionalism.', icon: 'ShieldCheck', color: 'green' },
            { num: '04', title: 'Commitment', desc: 'Focus on timely completion, reliable support and client satisfaction.', icon: 'Users', color: 'navy' },
            { num: '05', title: 'Continuous Improvement', desc: 'Improve services through modern techniques and industry best practices.', icon: 'TrendingUp', color: 'green' }
          ]),

          // Section 3: Our Strengths
          strengthsKicker: 'OUR STRENGTHS',
          strengthsTitleLine1: 'Our',
          strengthsTitleLine2Green: 'Strengths',
          strengthsDescription: 'Our operating model is designed to combine technical services, project resources and industrial supply into practical solutions for client requirements.',
          strengthsTagline: 'ENGINEERING TODAY FOR A STRONGER TOMORROW',
          strengthsImageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1000&q=80',
          strengthsBadgeText: 'PEOPLE | SOLUTIONS | PROGRESS | TOGETHER',
          strengthsJson: JSON.stringify([
            { title: 'INTEGRATED CAPABILITY', desc: 'Multiple contracting, support and trading services coordinated through one platform.', icon: 'Layers', color: 'green' },
            { title: 'TECHNICAL EXPERTISE', desc: 'Engineering, supervision, skilled trades and industrial project support.', icon: 'Cog', color: 'navy' },
            { title: 'SKILLED WORKFORCE', desc: 'Skilled, semi-skilled and specialized personnel across project disciplines.', icon: 'Users', color: 'green' },
            { title: 'PROJECT SUPPORT', desc: 'Logistics, scaffolding, temporary facilities and material delivery support.', icon: 'Truck', color: 'navy' },
            { title: 'HSE FOCUS', desc: 'Safety-conscious planning and execution aligned with project requirements.', icon: 'ShieldCheck', color: 'green' },
            { title: 'EQUIPMENT CAPABILITY', desc: 'Heavy equipment, access equipment and specialized lifting solutions.', icon: 'Wrench', color: 'navy' }
          ]),

          // Section 4: Partner CTA Banner
          ctaKicker: "LET'S BUILD TOGETHER",
          ctaTitleLine1: 'Partner with SECO LINE',
          ctaTitleLine2Green: 'for a Stronger Tomorrow',
          ctaButtonText: 'Get In Touch',
          ctaButtonLink: '/contact',
          ctaValue1: 'Reliable Solutions',
          ctaValue2: 'Long-Term Partnerships',
          ctaValue3: 'Sustainable Growth',
          ctaImageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80',
          ctaOverlayText: 'BUILDING INDUSTRIES EMPOWERING PEOPLE',
        },
      });
    }

    return NextResponse.json({ success: true, about });
  } catch (error: any) {
    console.error('Fetch about error:', error);
    return NextResponse.json({ error: 'Failed to fetch about page content' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    const about = await prisma.aboutPage.upsert({
      where: { id: 1 },
      update: {
        heading: data.heading || 'Building a Stronger Tomorrow',
        subheading: data.subheading,
        story: data.story,
        mission: data.mission,
        vision: data.vision,
        values: data.values,
        imageUrl: data.imageUrl,
        secondaryImageUrl: data.secondaryImageUrl,
        experienceYears: data.experienceYears,
        statsJson: data.statsJson,

        // Hero
        heroKicker: data.heroKicker,
        heroTitleLine1: data.heroTitleLine1,
        heroTitleLine2Green: data.heroTitleLine2Green,
        heroSubtitle: data.heroSubtitle,
        heroBgImageUrl: data.heroBgImageUrl,
        heroVideoUrl: data.heroVideoUrl,
        heroBadge1Value: data.heroBadge1Value,
        heroBadge1Label: data.heroBadge1Label,
        heroBadge2Value: data.heroBadge2Value,
        heroBadge2Label: data.heroBadge2Label,
        heroBadge3Value: data.heroBadge3Value,
        heroBadge3Label: data.heroBadge3Label,

        // Vision, Mission & Values
        vmvKicker: data.vmvKicker,
        vmvTitleLine1: data.vmvTitleLine1,
        vmvTitleLine2Green: data.vmvTitleLine2Green,
        vmvDescription: data.vmvDescription,
        vmvSkylineImageUrl: data.vmvSkylineImageUrl,
        vmvBadgeText: data.vmvBadgeText,
        vmvVisionTitle: data.vmvVisionTitle,
        vmvVisionDesc: data.vmvVisionDesc,
        vmvMissionTitle: data.vmvMissionTitle,
        vmvMissionDesc: data.vmvMissionDesc,
        vmvValuesJson: data.vmvValuesJson,

        // Strengths
        strengthsKicker: data.strengthsKicker,
        strengthsTitleLine1: data.strengthsTitleLine1,
        strengthsTitleLine2Green: data.strengthsTitleLine2Green,
        strengthsDescription: data.strengthsDescription,
        strengthsTagline: data.strengthsTagline,
        strengthsImageUrl: data.strengthsImageUrl,
        strengthsBadgeText: data.strengthsBadgeText,
        strengthsJson: data.strengthsJson,

        // CTA
        ctaKicker: data.ctaKicker,
        ctaTitleLine1: data.ctaTitleLine1,
        ctaTitleLine2Green: data.ctaTitleLine2Green,
        ctaButtonText: data.ctaButtonText,
        ctaButtonLink: data.ctaButtonLink,
        ctaValue1: data.ctaValue1,
        ctaValue2: data.ctaValue2,
        ctaValue3: data.ctaValue3,
        ctaImageUrl: data.ctaImageUrl,
        ctaOverlayText: data.ctaOverlayText,
      },
      create: {
        id: 1,
        heading: data.heading || 'Building a Stronger Tomorrow',
        subheading: data.subheading,
        story: data.story,
        mission: data.mission,
        vision: data.vision,
        values: data.values,
        imageUrl: data.imageUrl,
        secondaryImageUrl: data.secondaryImageUrl,
        experienceYears: data.experienceYears,
        statsJson: data.statsJson,

        heroKicker: data.heroKicker,
        heroTitleLine1: data.heroTitleLine1,
        heroTitleLine2Green: data.heroTitleLine2Green,
        heroSubtitle: data.heroSubtitle,
        heroBgImageUrl: data.heroBgImageUrl,
        heroVideoUrl: data.heroVideoUrl,
        heroBadge1Value: data.heroBadge1Value,
        heroBadge1Label: data.heroBadge1Label,
        heroBadge2Value: data.heroBadge2Value,
        heroBadge2Label: data.heroBadge2Label,
        heroBadge3Value: data.heroBadge3Value,
        heroBadge3Label: data.heroBadge3Label,

        vmvKicker: data.vmvKicker,
        vmvTitleLine1: data.vmvTitleLine1,
        vmvTitleLine2Green: data.vmvTitleLine2Green,
        vmvDescription: data.vmvDescription,
        vmvSkylineImageUrl: data.vmvSkylineImageUrl,
        vmvBadgeText: data.vmvBadgeText,
        vmvVisionTitle: data.vmvVisionTitle,
        vmvVisionDesc: data.vmvVisionDesc,
        vmvMissionTitle: data.vmvMissionTitle,
        vmvMissionDesc: data.vmvMissionDesc,
        vmvValuesJson: data.vmvValuesJson,

        strengthsKicker: data.strengthsKicker,
        strengthsTitleLine1: data.strengthsTitleLine1,
        strengthsTitleLine2Green: data.strengthsTitleLine2Green,
        strengthsDescription: data.strengthsDescription,
        strengthsTagline: data.strengthsTagline,
        strengthsImageUrl: data.strengthsImageUrl,
        strengthsBadgeText: data.strengthsBadgeText,
        strengthsJson: data.strengthsJson,

        ctaKicker: data.ctaKicker,
        ctaTitleLine1: data.ctaTitleLine1,
        ctaTitleLine2Green: data.ctaTitleLine2Green,
        ctaButtonText: data.ctaButtonText,
        ctaButtonLink: data.ctaButtonLink,
        ctaValue1: data.ctaValue1,
        ctaValue2: data.ctaValue2,
        ctaValue3: data.ctaValue3,
        ctaImageUrl: data.ctaImageUrl,
        ctaOverlayText: data.ctaOverlayText,
      },
    });

    revalidatePath('/about');
    return NextResponse.json({ success: true, about });
  } catch (error: any) {
    console.error('Failed to update about page:', error);
    return NextResponse.json({ error: 'Failed to update about page' }, { status: 500 });
  }
}
