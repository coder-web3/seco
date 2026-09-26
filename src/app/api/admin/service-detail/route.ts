import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const serviceIdParam = searchParams.get('serviceId');
    const serviceId = serviceIdParam ? parseInt(serviceIdParam, 10) : null;

    let setting = null;

    if (serviceId && !isNaN(serviceId)) {
      setting = await prisma.serviceDetailSetting.findUnique({
        where: { serviceId },
      });

      // If no per-service setting exists yet, fetch global fallback or return default structure
      if (!setting) {
        const globalFallback = await prisma.serviceDetailSetting.findFirst({
          where: { serviceId: null },
        });

        if (globalFallback) {
          setting = {
            ...globalFallback,
            id: 0,
            serviceId,
          };
        }
      }
    } else {
      setting = await prisma.serviceDetailSetting.findFirst({
        where: { serviceId: null },
      });
    }

    if (!setting) {
      setting = await prisma.serviceDetailSetting.create({
        data: {
          serviceId: serviceId && !isNaN(serviceId) ? serviceId : null,
          heroKicker: 'OUR SERVICE ☰',
          heroSubtitle: 'Strong Foundations. A Sustainable Tomorrow.',
          heroStat1Value: '20+',
          heroStat1Label: 'Years of Experience',
          heroStat2Value: '200+',
          heroStat2Label: 'Projects Delivered',
          heroStat3Value: '100%',
          heroStat3Label: 'Commitment to Safety',
          heroTagline: 'BUILDING A STRONGER TOMORROW',

          overviewKicker: 'OUR SERVICES',
          overviewTitle: 'Building What',
          overviewTitleGreen: 'Matters Most',
          overviewDescription: 'SECO LINE delivers reliable and high-quality civil construction solutions for industrial, commercial, and infrastructure projects across Saudi Arabia.',
          feature1Title: 'Safety First',
          feature1Desc: 'A secure work environment for a better tomorrow.',
          feature2Title: 'Experienced Teams',
          feature2Desc: 'Skilled professionals delivering proven results.',
          feature3Title: 'Quality & Precision',
          feature3Desc: 'Built to last with attention to every detail.',
          pdfDownloadUrl: '/SECO_LINE_PROFILE.pdf',

          capabilitiesKicker: 'OUR OTHER SERVICES',
          capabilitiesTitle1: 'Explore Our',
          capabilitiesTitle2Green: 'Other Services',
          capabilitiesSubtitle: 'Explore our specialized engineering, contracting, and construction capabilities tailored to your project scope across Saudi Arabia.',
          
          processKicker: 'EXECUTION METHODOLOGY',
          processTitle1: 'Our Structured',
          processTitle2Green: '4-Step Execution Process',
          processSubtitle: 'From initial consultation to final testing and commissioning, our structured workflow ensures flawless execution across every project milestone.',

          ctaKicker: 'START A CONVERSATION',
          ctaTitle1: 'Ready to Execute',
          ctaTitle2Green: 'Your Next Project?',
          ctaDescription: 'Connect with SECO LINE\'s engineering team today to review scope, specifications, equipment allocation, and scheduling across Saudi Arabia.',
          ctaButtonText: 'Get a Free Proposal',
          ctaPhone: '+966 12 345 6789',
          ctaBadge1: 'Rapid 24h Response',
          ctaBadge2: 'ISO & Aramco Standards',
          ctaBadge3: 'Nationwide Saudi Execution',
        },
      });
    }

    return NextResponse.json({ success: true, serviceDetail: setting });
  } catch (error: any) {
    console.error('Error fetching Service Detail settings:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const serviceId = body.serviceId ? parseInt(body.serviceId, 10) : null;

    let existing = null;
    if (serviceId && !isNaN(serviceId)) {
      existing = await prisma.serviceDetailSetting.findUnique({
        where: { serviceId },
      });
    } else {
      existing = await prisma.serviceDetailSetting.findFirst({
        where: { serviceId: null },
      });
    }

    const data = {
      serviceId: serviceId && !isNaN(serviceId) ? serviceId : null,
      heroKicker: body.heroKicker ?? 'OUR SERVICE ☰',
      heroSubtitle: body.heroSubtitle ?? 'Strong Foundations. A Sustainable Tomorrow.',
      heroStat1Value: body.heroStat1Value ?? '20+',
      heroStat1Label: body.heroStat1Label ?? 'Years of Experience',
      heroStat2Value: body.heroStat2Value ?? '200+',
      heroStat2Label: body.heroStat2Label ?? 'Projects Delivered',
      heroStat3Value: body.heroStat3Value ?? '100%',
      heroStat3Label: body.heroStat3Label ?? 'Commitment to Safety',
      heroTagline: body.heroTagline ?? 'BUILDING A STRONGER TOMORROW',

      overviewKicker: body.overviewKicker ?? 'OUR SERVICES',
      overviewTitle: body.overviewTitle ?? 'Building What',
      overviewTitleGreen: body.overviewTitleGreen ?? 'Matters Most',
      overviewDescription: body.overviewDescription ?? '',
      feature1Title: body.feature1Title ?? 'Safety First',
      feature1Desc: body.feature1Desc ?? '',
      feature2Title: body.feature2Title ?? 'Experienced Teams',
      feature2Desc: body.feature2Desc ?? '',
      feature3Title: body.feature3Title ?? 'Quality & Precision',
      feature3Desc: body.feature3Desc ?? '',
      pdfDownloadUrl: body.pdfDownloadUrl ?? '/SECO_LINE_PROFILE.pdf',

      capabilitiesKicker: body.capabilitiesKicker ?? 'OUR OTHER SERVICES',
      capabilitiesTitle1: body.capabilitiesTitle1 ?? 'Explore Our',
      capabilitiesTitle2Green: body.capabilitiesTitle2Green ?? 'Other Services',
      capabilitiesSubtitle: body.capabilitiesSubtitle ?? '',
      capabilitiesJson: body.capabilitiesJson ?? '',

      processKicker: body.processKicker ?? 'EXECUTION METHODOLOGY',
      processTitle1: body.processTitle1 ?? 'Our Structured',
      processTitle2Green: body.processTitle2Green ?? '4-Step Execution Process',
      processSubtitle: body.processSubtitle ?? '',
      processStepsJson: body.processStepsJson ?? '',

      ctaKicker: body.ctaKicker ?? 'START A CONVERSATION',
      ctaTitle1: body.ctaTitle1 ?? 'Ready to Execute',
      ctaTitle2Green: body.ctaTitle2Green ?? 'Your Next Project?',
      ctaDescription: body.ctaDescription ?? '',
      ctaButtonText: body.ctaButtonText ?? 'Get a Free Proposal',
      ctaPhone: body.ctaPhone ?? '+966 12 345 6789',
      ctaBadge1: body.ctaBadge1 ?? 'Rapid 24h Response',
      ctaBadge2: body.ctaBadge2 ?? 'ISO & Aramco Standards',
      ctaBadge3: body.ctaBadge3 ?? 'Nationwide Saudi Execution',
    };

    let serviceDetail;
    if (existing) {
      serviceDetail = await prisma.serviceDetailSetting.update({
        where: { id: existing.id },
        data,
      });
    } else {
      serviceDetail = await prisma.serviceDetailSetting.create({
        data,
      });
    }

    return NextResponse.json({ success: true, serviceDetail });
  } catch (error: any) {
    console.error('Error updating Service Detail settings:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
