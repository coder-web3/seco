import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    let setting = await prisma.servicesHeroSetting.findFirst();
    if (!setting) {
      setting = await prisma.servicesHeroSetting.create({
        data: {
          kicker: 'OUR SERVICES',
          titleLine1: 'Integrated Services for a',
          titleLine2: 'Stronger',
          titleGreen: 'Tomorrow',
          subtitle: 'At SECO LINE, we deliver end-to-end industrial and contracting solutions with a focus on safety, quality and long-term value. Our services are designed to meet the evolving needs of industrial, commercial, and infrastructure sectors across',
          badge1Text: 'Reliable Execution',
          badge2Text: 'Experienced Team',
          badge3Text: 'Sustainable Results',
          stat1Value: '10+',
          stat1Label: 'Service Capabilities',
          stat2Value: '25+',
          stat2Label: 'Years of Industry Support',
          stat3Value: '100+',
          stat3Label: 'Projects Delivered',
          bgImageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80',
          overlayImageUrl: '',
        },
      });
    }
    return NextResponse.json({ success: true, hero: setting });
  } catch (error: any) {
    console.error('Error fetching Services Hero settings:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const existing = await prisma.servicesHeroSetting.findFirst();

    const data = {
      kicker: body.kicker ?? 'OUR SERVICES',
      titleLine1: body.titleLine1 ?? 'Integrated Services for a',
      titleLine2: body.titleLine2 ?? 'Stronger',
      titleGreen: body.titleGreen ?? 'Tomorrow',
      subtitle: body.subtitle ?? '',
      badge1Text: body.badge1Text ?? 'Reliable Execution',
      badge2Text: body.badge2Text ?? 'Experienced Team',
      badge3Text: body.badge3Text ?? 'Sustainable Results',
      stat1Value: body.stat1Value ?? '10+',
      stat1Label: body.stat1Label ?? 'Service Capabilities',
      stat2Value: body.stat2Value ?? '25+',
      stat2Label: body.stat2Label ?? 'Years of Industry Support',
      stat3Value: body.stat3Value ?? '100+',
      stat3Label: body.stat3Label ?? 'Projects Delivered',
      bgImageUrl: body.bgImageUrl ?? '',
      overlayImageUrl: body.overlayImageUrl ?? '',
    };

    let hero;
    if (existing) {
      hero = await prisma.servicesHeroSetting.update({
        where: { id: existing.id },
        data,
      });
    } else {
      hero = await prisma.servicesHeroSetting.create({
        data,
      });
    }

    return NextResponse.json({ success: true, hero });
  } catch (error: any) {
    console.error('Error updating Services Hero settings:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
