import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';
import { slugifyText } from '@/lib/utils';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const services = await prisma.service.findMany({
    orderBy: { sortOrder: 'asc' },
  });
  return NextResponse.json({ success: true, services });
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    let slug = data.slug ? slugifyText(data.slug) : slugifyText(data.title || '');
    if (!slug) slug = `service-${Date.now()}`;

    const sortOrderNum = parseInt(String(data.sortOrder), 10);
    const validSortOrder = isNaN(sortOrderNum) ? 0 : sortOrderNum;

    const service = await prisma.service.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt || null,
        content: data.content || null,
        icon: data.icon || 'Layers',
        imageUrl: data.imageUrl || null,
        features: data.features || null,
        sortOrder: validSortOrder,
        isPublished: data.isPublished !== false,
      },
    });

    revalidatePath('/');
    revalidatePath('/services');
    revalidatePath(`/services/${service.slug}`);
    revalidatePath('/admin/services');

    return NextResponse.json({ success: true, service });
  } catch (error: any) {
    console.error('Failed to create service:', error);
    return NextResponse.json({ error: error.message || 'Failed to create service' }, { status: 500 });
  }
}
