import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { BookOpen, ArrowRight, Tag } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await prisma.seoSetting.findUnique({ where: { pageKey: 'blog' } }).catch(() => null);
  return {
    title: seo?.metaTitle || 'Insights & Engineering Notes - Seko Agency',
    description: seo?.metaDescription || 'Articles on Next.js, MySQL architecture, and modern product engineering.',
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { cat?: string };
}) {
  const selectedCat = searchParams.cat || '';

  const [categories, posts] = await Promise.all([
    prisma.blogCategory.findMany({ orderBy: { name: 'asc' } }).catch(() => []),
    prisma.blogPost.findMany({
      where: {
        isPublished: true,
        ...(selectedCat ? { category: { slug: selectedCat } } : {}),
      },
      include: {
        category: true,
        author: { select: { name: true } },
        tags: { include: { tag: true } },
      },
      orderBy: { publishedAt: 'desc' },
    }).catch(() => []),
  ]);

  return (
    <div className="py-16 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Engineering & Design</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Articles & Insights
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Deep dives into software architecture, relational database design, and web speed optimization.
        </p>
      </div>

      {/* Category Tabs */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
          <a
            href="/blog"
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition ${
              !selectedCat
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            All Articles
          </a>
          {categories.map((c) => (
            <a
              key={c.id}
              href={`/blog?cat=${c.slug}`}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition ${
                selectedCat === c.slug
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {c.name}
            </a>
          ))}
        </div>
      )}

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-16 text-center text-slate-400">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-base font-semibold text-slate-700">No articles found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/9] bg-slate-100 relative overflow-hidden">
                  {post.coverImage ? (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-indigo-500/10 to-violet-500/10 flex items-center justify-center font-bold text-indigo-500">
                      Seko Engineering
                    </div>
                  )}
                  {post.category && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold rounded-lg">
                      {post.category.name}
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                    <span>{post.author?.name || 'Editorial Team'}</span>
                    <span>•</span>
                    <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {post.tags.slice(0, 3).map(({ tag }) => (
                        <span
                          key={tag.id}
                          className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-medium rounded-md"
                        >
                          #{tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center text-xs font-semibold text-indigo-600 gap-1 group-hover:gap-2 transition-all">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
