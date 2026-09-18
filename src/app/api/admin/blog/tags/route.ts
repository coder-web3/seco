import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';
import { slugifyText } from '@/lib/utils';

export async function GET() {
  const tags = await prisma.blogTag.findMany({
    include: { _count: { select: { posts: true } } },
    orderBy: { name: 'asc' },
  });
  return NextResponse.json({ success: true, tags });
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { name, slug } = await request.json();
    const finalSlug = slug ? slugifyText(slug) : slugifyText(name);

    const tag = await prisma.blogTag.create({
      data: { name, slug: finalSlug },
    });
    return NextResponse.json({ success: true, tag });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to create tag' }, { status: 500 });
  }
}
