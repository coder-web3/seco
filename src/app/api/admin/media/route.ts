import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const type = searchParams.get('type') || '';

  try {
    const where: any = {};
    if (search) {
      where.OR = [
        { originalName: { contains: search } },
        { altText: { contains: search } },
      ];
    }
    if (type) {
      where.mimeType = { startsWith: type };
    }

    const files = await prisma.mediaFile.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return NextResponse.json({ success: true, files });
  } catch (error: any) {
    console.error('Failed to list media:', error);
    return NextResponse.json({ error: 'Failed to retrieve media files' }, { status: 500 });
  }
}
