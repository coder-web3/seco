import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const testimonials = await prisma.testimonial.findMany({
    orderBy: { sortOrder: 'asc' },
  });
  return NextResponse.json({ success: true, testimonials });
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    const testimonial = await prisma.testimonial.create({
      data: {
        authorName: data.authorName,
        authorRole: data.authorRole,
        company: data.company,
        content: data.content,
        rating: Number(data.rating) || 5,
        avatarUrl: data.avatarUrl,
        companyLogoUrl: data.companyLogoUrl,
        sortOrder: Number(data.sortOrder) || 0,
        isPublished: data.isPublished !== false,
      },
    });
    return NextResponse.json({ success: true, testimonial });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}
