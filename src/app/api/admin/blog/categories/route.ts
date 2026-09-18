import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';
import { slugifyText } from '@/lib/utils';

export async function GET() {
  const categories = await prisma.blogCategory.findMany({
    include: { _count: { select: { posts: true } } },
    orderBy: { name: 'asc' },
  });
  return NextResponse.json({ success: true, categories });
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { name, slug, description } = await request.json();
    const finalSlug = slug ? slugifyText(slug) : slugifyText(name);

    const category = await prisma.blogCategory.create({
      data: { name, slug: finalSlug, description },
    });
    return NextResponse.json({ success: true, category });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
