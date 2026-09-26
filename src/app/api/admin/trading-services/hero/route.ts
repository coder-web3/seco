import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let heroSetting = await prisma.tradingServicesHeroSetting.findFirst();

  if (!heroSetting) {
    heroSetting = await prisma.tradingServicesHeroSetting.create({
      data: {
        badgeText: "SAUDI ARABIA'S TIER-1 INDUSTRIAL TRADING DIVISION",
        titleLine1: 'Certified Industrial Material',
        titleGreen: '& Equipment Supply',
        subtitle: 'We supply high-grade certified piping, safety equipment, electrical components, heavy machinery, structural steel, and specialized hardware across Saudi Arabia.',
        badge1Text: '100% Aramco Traceable',
        badge2Text: 'Kingdom-Wide Fast Dispatch',
        badge3Text: 'Tier-1 Wholesale Pricing',
        stat1Value: '6+',
        stat1Label: 'Trading Divisions',
        stat2Value: '5,000+',
        stat2Label: 'MTC 3.1 Certified Items',
        stat3Value: '24/7',
        stat3Label: 'RFQ Fast Response',
        bgImageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80',
        overlayImageUrl: '',
      },
    });
  }

  return NextResponse.json({ success: true, heroSetting });
}

export async function PUT(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    let heroSetting = await prisma.tradingServicesHeroSetting.findFirst();

    if (heroSetting) {
      heroSetting = await prisma.tradingServicesHeroSetting.update({
        where: { id: heroSetting.id },
        data: {
          badgeText: data.badgeText,
          titleLine1: data.titleLine1,
          titleGreen: data.titleGreen,
          subtitle: data.subtitle,
          badge1Text: data.badge1Text,
          badge2Text: data.badge2Text,
          badge3Text: data.badge3Text,
          stat1Value: data.stat1Value,
          stat1Label: data.stat1Label,
          stat2Value: data.stat2Value,
          stat2Label: data.stat2Label,
          stat3Value: data.stat3Value,
          stat3Label: data.stat3Label,
          bgImageUrl: data.bgImageUrl,
          overlayImageUrl: data.overlayImageUrl,
        },
      });
    } else {
      heroSetting = await prisma.tradingServicesHeroSetting.create({
        data,
      });
    }

    revalidatePath('/');
    revalidatePath('/trading-services');
    revalidatePath('/seko-admin/trading-services');

    return NextResponse.json({ success: true, heroSetting });
  } catch (error: any) {
    console.error('Failed to update hero setting:', error);
    return NextResponse.json({ error: error.message || 'Failed to update hero setting' }, { status: 500 });
  }
}
