import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';
import { slugifyText } from '@/lib/utils';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const id = Number(params.id);
    const { name, slug, description } = await request.json();
    const finalSlug = slug ? slugifyText(slug) : slugifyText(name);

    const category = await prisma.blogCategory.update({
      where: { id },
      data: { name, slug: finalSlug, description },
    });
    return NextResponse.json({ success: true, category });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const id = Number(params.id);
    await prisma.blogCategory.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
