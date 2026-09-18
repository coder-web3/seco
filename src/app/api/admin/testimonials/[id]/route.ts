import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id: rawId } = await params;
  const id = Number(rawId);
  try {
    const data = await request.json();
    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        authorName: data.authorName,
        authorRole: data.authorRole,
        company: data.company,
        content: data.content,
        rating: Number(data.rating),
        avatarUrl: data.avatarUrl,
        companyLogoUrl: data.companyLogoUrl,
        sortOrder: Number(data.sortOrder),
        isPublished: Boolean(data.isPublished),
      },
    });
    return NextResponse.json({ success: true, testimonial });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id: rawId } = await params;
  const id = Number(rawId);
  try {
    await prisma.testimonial.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
