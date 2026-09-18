import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';
import { slugifyText } from '@/lib/utils';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const projects = await prisma.project.findMany({
    include: { images: true },
    orderBy: { sortOrder: 'asc' },
  });
  return NextResponse.json({ success: true, projects });
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    const slug = data.slug ? slugifyText(data.slug) : slugifyText(data.title);

    const project = await prisma.project.create({
      data: {
        title: data.title,
        slug,
        client: data.client,
        category: data.category,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage,
        completedAt: data.completedAt ? new Date(data.completedAt) : null,
        projectUrl: data.projectUrl,
        isFeatured: Boolean(data.isFeatured),
        isPublished: data.isPublished !== false,
        sortOrder: Number(data.sortOrder) || 0,
        images: {
          create: (data.images || []).map((img: any, index: number) => ({
            mediaUrl: typeof img === 'string' ? img : img.mediaUrl,
            caption: typeof img === 'string' ? '' : (img.caption || ''),
            sortOrder: index,
          })),
        },
      },
      include: { images: true },
    });

    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    console.error('Failed to create project:', error);
    return NextResponse.json({ error: error.message || 'Failed to create project' }, { status: 500 });
  }
}
