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
    let hero = await prisma.galleryHeroSetting.findFirst();
    if (!hero) {
      hero = await prisma.galleryHeroSetting.create({
        data: {
          id: 1,
          kicker: 'MEDIA & VISUAL GALLERY',
          titleLine1: 'Engineering Excellence &',
          titleGreen: 'Project Showcase',
          subtitle: "Explore curated visual documentation of SECO LINE's industrial material supply, high-pressure piping assemblies, civil engineering sites, and heavy machinery operations across the Kingdom.",
          badge1Text: 'High-Resolution Project Photography',
          badge2Text: 'Aramco & SABIC Site Inspection Verification',
          badge3Text: '100% Certified Operational Standards',
          bgImageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80',
        },
      });
    }
    return NextResponse.json({ success: true, hero });
  } catch (error: any) {
    console.error('Fetch gallery hero error:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery hero settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();

    const hero = await prisma.galleryHeroSetting.upsert({
      where: { id: 1 },
      update: {
        kicker: data.kicker,
        titleLine1: data.titleLine1,
        titleGreen: data.titleGreen,
        subtitle: data.subtitle,
        badge1Text: data.badge1Text,
        badge2Text: data.badge2Text,
        badge3Text: data.badge3Text,
        bgImageUrl: data.bgImageUrl,
      },
      create: {
        id: 1,
        kicker: data.kicker || 'MEDIA & VISUAL GALLERY',
        titleLine1: data.titleLine1 || 'Engineering Excellence &',
        titleGreen: data.titleGreen || 'Project Showcase',
        subtitle: data.subtitle || '',
        badge1Text: data.badge1Text || 'High-Resolution Project Photography',
        badge2Text: data.badge2Text || 'Aramco & SABIC Site Inspection Verification',
        badge3Text: data.badge3Text || '100% Certified Operational Standards',
        bgImageUrl: data.bgImageUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80',
      },
    });

    revalidatePath('/gallery');
    return NextResponse.json({ success: true, hero });
  } catch (error: any) {
    console.error('Save gallery hero error:', error);
    return NextResponse.json({ error: error.message || 'Failed to save gallery hero settings' }, { status: 500 });
  }
}
