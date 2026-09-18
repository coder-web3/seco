import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const seoList = await prisma.seoSetting.findMany({
      orderBy: { pageKey: 'asc' },
    });
    return NextResponse.json({ success: true, seoList });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch SEO settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { pageKey, metaTitle, metaDescription, metaKeywords, ogImage, canonicalUrl } = body;

    if (!pageKey || !metaTitle) {
      return NextResponse.json({ error: 'Page key and Meta Title are required' }, { status: 400 });
    }

    const updated = await prisma.seoSetting.upsert({
      where: { pageKey },
      update: {
        metaTitle,
        metaDescription,
        metaKeywords,
        ogImage,
        canonicalUrl,
      },
      create: {
        pageKey,
        metaTitle,
        metaDescription,
        metaKeywords,
        ogImage,
        canonicalUrl,
      },
    });

    return NextResponse.json({ success: true, seo: updated });
  } catch (error: any) {
    console.error('Failed to update SEO:', error);
    return NextResponse.json({ error: 'Failed to save SEO settings' }, { status: 500 });
  }
}
