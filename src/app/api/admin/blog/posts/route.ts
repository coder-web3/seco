import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';
import { slugifyText } from '@/lib/utils';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const posts = await prisma.blogPost.findMany({
    include: {
      category: true,
      author: { select: { id: true, name: true, email: true } },
      tags: { include: { tag: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ success: true, posts });
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    const slug = data.slug ? slugifyText(data.slug) : slugifyText(data.title);

    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage,
        authorId: admin.userId,
        categoryId: data.categoryId ? Number(data.categoryId) : null,
        isPublished: Boolean(data.isPublished),
        publishedAt: data.isPublished ? (data.publishedAt ? new Date(data.publishedAt) : new Date()) : null,
        tags: {
          create: (data.tagIds || []).map((tagId: number) => ({
            tagId: Number(tagId),
          })),
        },
      },
      include: {
        category: true,
        author: { select: { id: true, name: true, email: true } },
        tags: { include: { tag: true } },
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    console.error('Failed to create post:', error);
    return NextResponse.json({ error: error.message || 'Failed to create blog post' }, { status: 500 });
  }
}
