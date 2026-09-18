import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const settings = await prisma.siteSetting.findFirst();
    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    const settings = await prisma.siteSetting.upsert({
      where: { id: 1 },
      update: {
        siteName: data.siteName,
        siteTagline: data.siteTagline,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        address: data.address,
        workingHours: data.workingHours,
        socialLinks: typeof data.socialLinks === 'string' ? data.socialLinks : JSON.stringify(data.socialLinks || {}),
        logoUrl: data.logoUrl,
        faviconUrl: data.faviconUrl,
        footerImageUrl: data.footerImageUrl,
        footerText: data.footerText,
      },
      create: {
        id: 1,
        siteName: data.siteName || 'SECO LINE',
        siteTagline: data.siteTagline,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        address: data.address,
        workingHours: data.workingHours,
        socialLinks: typeof data.socialLinks === 'string' ? data.socialLinks : JSON.stringify(data.socialLinks || {}),
        logoUrl: data.logoUrl,
        faviconUrl: data.faviconUrl,
        footerImageUrl: data.footerImageUrl,
        footerText: data.footerText,
      },
    });

    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    console.error('Failed to update site settings:', error);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
