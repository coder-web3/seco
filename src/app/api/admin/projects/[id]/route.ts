import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';
import { slugifyText } from '@/lib/utils';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const resolvedParams = await Promise.resolve(params);
  const id = Number(resolvedParams.id);
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  const project = await prisma.project.findUnique({
    where: { id },
    include: { images: { orderBy: { sortOrder: 'asc' } } },
  });
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({ success: true, project });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const resolvedParams = await Promise.resolve(params);
  const id = Number(resolvedParams.id);
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    const data = await request.json();
    const slug = data.slug ? slugifyText(data.slug) : slugifyText(data.title);

    // If images array is provided, replace existing images
    if (Array.isArray(data.images)) {
      await prisma.projectImage.deleteMany({ where: { projectId: id } });
    }

    const project = await prisma.project.update({
      where: { id },
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
        isPublished: Boolean(data.isPublished),
        sortOrder: Number(data.sortOrder),
        ...(Array.isArray(data.images)
          ? {
              images: {
                create: data.images.map((img: any, index: number) => ({
                  mediaUrl: typeof img === 'string' ? img : img.mediaUrl,
                  caption: typeof img === 'string' ? '' : (img.caption || ''),
                  sortOrder: index,
                })),
              },
            }
          : {}),
      },
      include: { images: true },
    });

    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath(`/projects/${project.slug}`);
    revalidatePath('/seko-admin/projects');

    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const resolvedParams = await Promise.resolve(params);
  const id = Number(resolvedParams.id);
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    await prisma.project.delete({ where: { id } });

    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath('/seko-admin/projects');

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
