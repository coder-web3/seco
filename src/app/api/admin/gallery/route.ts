import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

const DEFAULT_CATEGORIES = [
  { name: 'Oil & Gas Piping', slug: 'oil-gas-piping', sortOrder: 1 },
  { name: 'Civil & Structural', slug: 'civil-structural', sortOrder: 2 },
  { name: 'Heavy Machinery', slug: 'heavy-machinery', sortOrder: 3 },
  { name: 'Site HSE & Safety', slug: 'site-hse-safety', sortOrder: 4 },
  { name: 'Industrial Equipment', slug: 'industrial-equipment', sortOrder: 5 },
];

const DEFAULT_ITEMS = [
  {
    title: 'High-Pressure Valve Assembly & QA Hydrotest',
    mediaUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1400&q=80',
    categorySlug: 'oil-gas-piping',
    description: 'API 6D certified gate & globe valve inspection at Jubail industrial facility.',
    sortOrder: 1,
  },
  {
    title: 'Heavy Structural Steel Fabrication & Welding',
    mediaUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80',
    categorySlug: 'civil-structural',
    description: 'Precision MIG/TIG welding of structural steel beams for commercial tower.',
    sortOrder: 2,
  },
  {
    title: 'Heavy Mobile Crane & Access Rig Fleet',
    mediaUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=80',
    categorySlug: 'heavy-machinery',
    description: 'Deployment of 100-ton mobile cranes for refinery expansion project in Yanbu.',
    sortOrder: 3,
  },
  {
    title: 'Site Safety Team & Flame-Retardant PPE Inspection',
    mediaUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=80',
    categorySlug: 'site-hse-safety',
    description: 'HSE compliance review and Nomex fire-retardant coverall equipment verification.',
    sortOrder: 4,
  },
  {
    title: 'High-Voltage Electrical & ATEX Junction Box Units',
    mediaUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1400&q=80',
    categorySlug: 'industrial-equipment',
    description: 'Explosion-proof electrical instrumentation setup for petrochemical processing plant.',
    sortOrder: 5,
  },
  {
    title: 'Seamless Steel Pipe Warehouse Inventory Dispatch',
    mediaUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1400&q=80',
    categorySlug: 'oil-gas-piping',
    description: 'ASTM A106 Gr. B seamless steel pipe dispatch from Riyadh central warehouse.',
    sortOrder: 6,
  },
];

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let [items, categories] = await Promise.all([
    prisma.galleryItem.findMany({
      include: { category: true },
      orderBy: { sortOrder: 'asc' },
    }),
    prisma.galleryCategory.findMany({
      orderBy: { sortOrder: 'asc' },
    }),
  ]);

  // Seed default data if empty
  if (categories.length === 0 && items.length === 0) {
    try {
      const createdCats: Record<string, number> = {};
      for (const cat of DEFAULT_CATEGORIES) {
        const c = await prisma.galleryCategory.create({ data: cat });
        createdCats[c.slug] = c.id;
      }

      for (const item of DEFAULT_ITEMS) {
        await prisma.galleryItem.create({
          data: {
            title: item.title,
            mediaUrl: item.mediaUrl,
            description: item.description,
            categoryId: createdCats[item.categorySlug] || null,
            sortOrder: item.sortOrder,
            isPublished: true,
          },
        });
      }

      [items, categories] = await Promise.all([
        prisma.galleryItem.findMany({
          include: { category: true },
          orderBy: { sortOrder: 'asc' },
        }),
        prisma.galleryCategory.findMany({
          orderBy: { sortOrder: 'asc' },
        }),
      ]);
    } catch (e) {
      console.error('Auto seed gallery error:', e);
    }
  }

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
          slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
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
        description: data.description || null,
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
