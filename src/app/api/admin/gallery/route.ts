import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const [items, categories] = await Promise.all([
    prisma.galleryItem.findMany({
      include: { category: true },
      orderBy: { sortOrder: 'asc' },
    }),
    prisma.galleryCategory.findMany({
      orderBy: { sortOrder: 'asc' },
    }),
  ]);

  return NextResponse.json({ success: true, items, categories });
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();

    // Check if creating a category or an item
    if (data.type === 'category') {
      const cat = await prisma.galleryCategory.create({
        data: {
          name: data.name,
          slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-'),
          sortOrder: Number(data.sortOrder) || 0,
        },
      });
      return NextResponse.json({ success: true, category: cat });
    }

    const item = await prisma.galleryItem.create({
      data: {
        title: data.title,
        mediaUrl: data.mediaUrl,
        categoryId: data.categoryId ? Number(data.categoryId) : null,
        description: data.description,
        sortOrder: Number(data.sortOrder) || 0,
        isPublished: data.isPublished !== false,
      },
      include: { category: true },
    });

    return NextResponse.json({ success: true, item });
  } catch (error: any) {
    console.error('Failed to create gallery item:', error);
    return NextResponse.json({ error: error.message || 'Failed to create gallery item' }, { status: 500 });
  }
}
