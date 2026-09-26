import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';
import { slugifyText } from '@/lib/utils';
import { TRADING_SERVICES_DATA } from '@/data/tradingServicesData';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let services = await prisma.tradingService.findMany({
    orderBy: { sortOrder: 'asc' },
  });

  // Seed default data if DB table is currently empty
  if (services.length === 0) {
    try {
      for (let i = 0; i < TRADING_SERVICES_DATA.length; i++) {
        const item = TRADING_SERVICES_DATA[i];
        await prisma.tradingService.create({
          data: {
            slug: item.slug,
            title: item.title,
            badge: item.badge,
            iconName: item.iconName,
            imageUrl: item.imageUrl,
            heroBgUrl: item.heroBgUrl,
            shortDesc: item.shortDesc,
            fullDesc: item.fullDesc,
            tags: JSON.stringify(item.tags || []),
            features: JSON.stringify(item.features || []),
            itemsSupplied: JSON.stringify(item.itemsSupplied || []),
            standards: JSON.stringify(item.standards || []),
            sortOrder: i,
            isPublished: true,
          },
        });
      }
      services = await prisma.tradingService.findMany({
        orderBy: { sortOrder: 'asc' },
      });
    } catch (e) {
      console.error('Trading service auto-seed error:', e);
    }
  }

  return NextResponse.json({ success: true, services });
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    let slug = data.slug ? slugifyText(data.slug) : slugifyText(data.title || '');
    if (!slug) slug = `trading-service-${Date.now()}`;

    const sortOrderNum = parseInt(String(data.sortOrder), 10);
    const validSortOrder = isNaN(sortOrderNum) ? 0 : sortOrderNum;

    const service = await prisma.tradingService.create({
      data: {
        title: data.title,
        slug,
        badge: data.badge || null,
        iconName: data.iconName || 'Layers',
        imageUrl: data.imageUrl || null,
        heroBgUrl: data.heroBgUrl || null,
        shortDesc: data.shortDesc || null,
        fullDesc: data.fullDesc || null,
        tags: typeof data.tags === 'string' ? data.tags : JSON.stringify(data.tags || []),
        features: typeof data.features === 'string' ? data.features : JSON.stringify(data.features || []),
        itemsSupplied: typeof data.itemsSupplied === 'string' ? data.itemsSupplied : JSON.stringify(data.itemsSupplied || []),
        standards: typeof data.standards === 'string' ? data.standards : JSON.stringify(data.standards || []),
        industriesJson: typeof data.industriesJson === 'string' ? data.industriesJson : JSON.stringify(data.industriesJson || []),
        whySecoJson: typeof data.whySecoJson === 'string' ? data.whySecoJson : JSON.stringify(data.whySecoJson || []),
        processJson: typeof data.processJson === 'string' ? data.processJson : JSON.stringify(data.processJson || []),
        overviewKicker: data.overviewKicker || undefined,
        overviewTitle: data.overviewTitle || undefined,
        overviewSubtitle: data.overviewSubtitle || undefined,
        overviewDesc2: data.overviewDesc2 || undefined,
        overviewFeaturesJson: typeof data.overviewFeaturesJson === 'string' ? data.overviewFeaturesJson : (data.overviewFeaturesJson ? JSON.stringify(data.overviewFeaturesJson) : undefined),
        pdfUrl: data.pdfUrl || undefined,
        categoriesKicker: data.categoriesKicker || undefined,
        categoriesTitle: data.categoriesTitle || undefined,
        categoriesSubtitle: data.categoriesSubtitle || undefined,
        sortOrder: validSortOrder,
        isPublished: data.isPublished !== false,
      },
    });

    revalidatePath('/');
    revalidatePath('/trading-services');
    revalidatePath(`/trading-services/${service.slug}`);
    revalidatePath('/seko-admin/trading-services');

    return NextResponse.json({ success: true, service });
  } catch (error: any) {
    console.error('Failed to create trading service:', error);
    return NextResponse.json({ error: error.message || 'Failed to create trading service' }, { status: 500 });
  }
}
