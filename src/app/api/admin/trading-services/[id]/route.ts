import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';
import { slugifyText } from '@/lib/utils';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const id = parseInt(params.id, 10);
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  const service = await prisma.tradingService.findUnique({
    where: { id },
    include: { detailSetting: true },
  });

  if (!service) return NextResponse.json({ error: 'Trading Service not found' }, { status: 404 });

  return NextResponse.json({ success: true, service });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const id = parseInt(params.id, 10);
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    const data = await request.json();
    let slug = data.slug ? slugifyText(data.slug) : undefined;

    const existing = await prisma.tradingService.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: 'Trading Service not found' }, { status: 404 });

    const sortOrderNum = parseInt(String(data.sortOrder), 10);
    const validSortOrder = isNaN(sortOrderNum) ? existing.sortOrder : sortOrderNum;

    const updated = await prisma.tradingService.update({
      where: { id },
      data: {
        title: data.title ?? existing.title,
        slug: slug || existing.slug,
        badge: data.badge !== undefined ? data.badge : existing.badge,
        iconName: data.iconName !== undefined ? data.iconName : existing.iconName,
        imageUrl: data.imageUrl !== undefined ? data.imageUrl : existing.imageUrl,
        heroBgUrl: data.heroBgUrl !== undefined ? data.heroBgUrl : existing.heroBgUrl,
        shortDesc: data.shortDesc !== undefined ? data.shortDesc : existing.shortDesc,
        fullDesc: data.fullDesc !== undefined ? data.fullDesc : existing.fullDesc,
        tags: typeof data.tags === 'string' ? data.tags : (data.tags ? JSON.stringify(data.tags) : existing.tags),
        features: typeof data.features === 'string' ? data.features : (data.features ? JSON.stringify(data.features) : existing.features),
        itemsSupplied: typeof data.itemsSupplied === 'string' ? data.itemsSupplied : (data.itemsSupplied ? JSON.stringify(data.itemsSupplied) : existing.itemsSupplied),
        standards: typeof data.standards === 'string' ? data.standards : (data.standards ? JSON.stringify(data.standards) : existing.standards),
        industriesJson: typeof data.industriesJson === 'string' ? data.industriesJson : (data.industriesJson ? JSON.stringify(data.industriesJson) : existing.industriesJson),
        whySecoJson: typeof data.whySecoJson === 'string' ? data.whySecoJson : (data.whySecoJson ? JSON.stringify(data.whySecoJson) : existing.whySecoJson),
        processJson: typeof data.processJson === 'string' ? data.processJson : (data.processJson ? JSON.stringify(data.processJson) : existing.processJson),
        overviewKicker: data.overviewKicker !== undefined ? data.overviewKicker : existing.overviewKicker,
        overviewTitle: data.overviewTitle !== undefined ? data.overviewTitle : existing.overviewTitle,
        overviewSubtitle: data.overviewSubtitle !== undefined ? data.overviewSubtitle : existing.overviewSubtitle,
        overviewDesc2: data.overviewDesc2 !== undefined ? data.overviewDesc2 : existing.overviewDesc2,
        overviewFeaturesJson: typeof data.overviewFeaturesJson === 'string' ? data.overviewFeaturesJson : (data.overviewFeaturesJson ? JSON.stringify(data.overviewFeaturesJson) : existing.overviewFeaturesJson),
        pdfUrl: data.pdfUrl !== undefined ? data.pdfUrl : existing.pdfUrl,
        categoriesKicker: data.categoriesKicker !== undefined ? data.categoriesKicker : existing.categoriesKicker,
        categoriesTitle: data.categoriesTitle !== undefined ? data.categoriesTitle : existing.categoriesTitle,
        categoriesSubtitle: data.categoriesSubtitle !== undefined ? data.categoriesSubtitle : existing.categoriesSubtitle,
        sortOrder: validSortOrder,
        isPublished: data.isPublished !== undefined ? Boolean(data.isPublished) : existing.isPublished,
      },
    });

    revalidatePath('/');
    revalidatePath('/trading-services');
    revalidatePath(`/trading-services/${updated.slug}`);
    revalidatePath('/seko-admin/trading-services');

    return NextResponse.json({ success: true, service: updated });
  } catch (error: any) {
    console.error('Failed to update trading service:', error);
    return NextResponse.json({ error: error.message || 'Failed to update trading service' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const id = parseInt(params.id, 10);
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    const deleted = await prisma.tradingService.delete({
      where: { id },
    });

    revalidatePath('/');
    revalidatePath('/trading-services');
    revalidatePath(`/trading-services/${deleted.slug}`);
    revalidatePath('/seko-admin/trading-services');

    return NextResponse.json({ success: true, message: 'Trading service deleted successfully' });
  } catch (error: any) {
    console.error('Failed to delete trading service:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete trading service' }, { status: 500 });
  }
}
