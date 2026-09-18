import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ArrowLeft, ArrowRight, Calendar, User, Tag } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

interface BlogPostDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogPostDetailPageProps): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  }).catch(() => null);

  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} - Seko Insights`,
    description: post.excerpt || 'In-depth engineering insights and design notes.',
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

export default async function BlogPostDetailPage({ params }: BlogPostDetailPageProps) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      author: { select: { name: true } },
      tags: { include: { tag: true } },
    },
  }).catch(() => null);

  if (!post || !post.isPublished) {
    notFound();
  }

  // Increment views in background
  prisma.blogPost.update({
    where: { id: post.id },
    data: { views: { increment: 1 } },
  }).catch(() => {});

  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all articles</span>
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-4 text-xs">
          {post.category && (
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 font-semibold rounded-lg border border-indigo-100">
              {post.category.name}
            </span>
          )}
          <span className="text-slate-500 flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            <span>{post.author?.name || 'Seko Engineering'}</span>
          </span>
          <span className="text-slate-500 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(post.publishedAt || post.createdAt)}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-medium">
            {post.excerpt}
          </p>
        )}
      </div>

      {post.coverImage && (
        <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 aspect-[16/9] bg-slate-100">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Content */}
      <article className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-6">
        <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed text-sm sm:text-base whitespace-pre-line">
          {post.content}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="pt-8 mt-8 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-3">
              Tagged Topics:
            </span>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(({ tag }) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Share / Next CTA */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold">Have questions or want to collaborate?</h3>
          <p className="text-xs text-slate-300 mt-1">Contact our team to explore technical partnerships and bespoke builds.</p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 whitespace-nowrap"
        >
          <span>Get in Touch</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
