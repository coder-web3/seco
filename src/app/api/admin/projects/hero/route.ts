import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    let hero = await (prisma as any).projectsHeroSetting?.findFirst().catch(() => null);
    if (!hero && (prisma as any).projectsHeroSetting) {
      hero = await (prisma as any).projectsHeroSetting.create({
        data: {
          id: 1,
          kicker: 'OUR PORTFOLIO',
          titleLine1: 'Delivered Landmark',
          titleLine2: 'Industrial & Civil',
          titleGreen: 'Projects',
          subtitle: 'Explore landmark contracting executions, high-pressure piping installations, structural steel fabrication, and material supply delivered for Saudi Aramco, SABIC, SEC, and major EPC partners across',
          badge1Text: 'Safety Excellence',
          badge2Text: 'Aramco Certified',
          badge3Text: 'Kingdom Logistics',
          stat1Value: '150+',
          stat1Label: 'Projects Delivered',
          stat2Value: '100%',
          stat2Label: 'Aramco & ISO Compliant',
          stat3Value: 'SAR 500M+',
          stat3Label: 'Contracting Volume',
          bgImageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80',
        },
      });
    }
    return NextResponse.json({ success: true, hero });
  } catch (error: any) {
    console.error('Fetch projects hero error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects hero settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();

    const hero = await (prisma as any).projectsHeroSetting.upsert({
      where: { id: 1 },
      update: {
        kicker: data.kicker,
        titleLine1: data.titleLine1,
        titleLine2: data.titleLine2,
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
      create: {
        id: 1,
        kicker: data.kicker || 'OUR PORTFOLIO',
        titleLine1: data.titleLine1 || 'Delivered Landmark',
        titleLine2: data.titleLine2 || 'Industrial & Civil',
        titleGreen: data.titleGreen || 'Projects',
        subtitle: data.subtitle || '',
        badge1Text: data.badge1Text || 'Safety Excellence',
        badge2Text: data.badge2Text || 'Aramco Certified',
        badge3Text: data.badge3Text || 'Kingdom Logistics',
        stat1Value: data.stat1Value || '150+',
        stat1Label: data.stat1Label || 'Projects Delivered',
        stat2Value: data.stat2Value || '100%',
        stat2Label: data.stat2Label || 'Aramco & ISO Compliant',
        stat3Value: data.stat3Value || 'SAR 500M+',
        stat3Label: data.stat3Label || 'Contracting Volume',
        bgImageUrl: data.bgImageUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80',
        overlayImageUrl: data.overlayImageUrl || '',
      },
    });

    revalidatePath('/projects');
    return NextResponse.json({ success: true, hero });
  } catch (error: any) {
    console.error('Save projects hero error:', error);
    return NextResponse.json({ error: error.message || 'Failed to save projects hero settings' }, { status: 500 });
  }
}
