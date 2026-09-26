import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';
import { slugifyText } from '@/lib/utils';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const resolvedParams = await Promise.resolve(params);
  const id = Number(resolvedParams.id);
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({ success: true, service });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const resolvedParams = await Promise.resolve(params);
  const id = Number(resolvedParams.id);
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    const data = await request.json();
    let slug = data.slug ? slugifyText(data.slug) : slugifyText(data.title || '');
    if (!slug) slug = `service-${id}-${Date.now()}`;

    const sortOrderNum = parseInt(String(data.sortOrder), 10);
    const validSortOrder = isNaN(sortOrderNum) ? 0 : sortOrderNum;

    const service = await prisma.service.update({
      where: { id },
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt || null,
        content: data.content || null,
        icon: data.icon || 'Layers',
        imageUrl: data.imageUrl || null,
        features: data.features || null,
        sortOrder: validSortOrder,
        isPublished: Boolean(data.isPublished),
      },
    });

    revalidatePath('/');
    revalidatePath('/services');
    revalidatePath(`/services/${service.slug}`);
    revalidatePath('/seko-admin/services');

    return NextResponse.json({ success: true, service });
  } catch (error: any) {
    console.error('Update service error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const resolvedParams = await Promise.resolve(params);
  const id = Number(resolvedParams.id);
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    await prisma.service.delete({ where: { id } });

    revalidatePath('/');
    revalidatePath('/services');
    revalidatePath('/seko-admin/services');

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
