import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ArrowLeft, ArrowRight, Calendar, User, Clock, Eye, Sparkles, Share2, Bookmark, CheckCircle2, ChevronRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import BlogContentRenderer from '@/components/blog/BlogContentRenderer';

export const dynamic = 'force-dynamic';

interface BlogPostDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogPostDetailPageProps): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  }).catch(() => null);

  if (!post) return { title: 'Article Not Found' };

  return {
    title: `${post.title} - SECO LINE Insights`,
    description: post.excerpt || 'In-depth engineering insights and industrial design notes.',
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

function calculateReadTime(content?: string | null): string {
  if (!content) return '2 min read';
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export default async function BlogPostDetailPage({ params }: BlogPostDetailPageProps) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      author: { select: { name: true, email: true } },
      tags: { include: { tag: true } },
    },
  }).catch(() => null);

  if (!post || !post.isPublished) {
    notFound();
  }

  // Increment view counter in background
  prisma.blogPost.update({
    where: { id: post.id },
    data: { views: { increment: 1 } },
  }).catch(() => {});

  // Fetch related articles (same category or latest)
  const relatedPosts = await prisma.blogPost.findMany({
    where: {
      isPublished: true,
      id: { not: post.id },
      ...(post.categoryId ? { categoryId: post.categoryId } : {}),
    },
    include: {
      category: true,
      author: { select: { name: true } },
    },
    take: 3,
    orderBy: { publishedAt: 'desc' },
  }).catch(() => []);

  const readTime = calculateReadTime(post.content);

  return (
    <div className="space-y-10 sm:space-y-12 pb-16 font-sans select-none bg-slate-50/50">
      
      {/* 1. HERO BANNER HEADER (Dark Industrial Styling matching SECO LINE Heros) */}
      <section className="relative overflow-hidden bg-[#050C16] text-white rounded-[2.5rem] lg:rounded-[3rem] mx-3 sm:mx-6 mt-2 shadow-2xl border border-slate-800/80 p-6 sm:p-12 lg:p-14">
        {/* Background Ambient Glow Orbs */}
        <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[#15B83E]/15 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[#084BA4]/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[1600px] mx-auto relative z-10 space-y-6">
          {/* Back Button */}
          <div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#15B83E] hover:text-white transition font-heading"
            >
              <ArrowLeft className="w-4 h-4 text-[#15B83E]" />
              <span>BACK TO ALL ARTICLES</span>
            </Link>
          </div>

          {/* Meta Tags Row */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            {post.category && (
              <span className="px-3.5 py-1.5 bg-[#15B83E]/15 text-[#15B83E] font-bold rounded-xl border border-[#15B83E]/30 uppercase tracking-wider text-[11px] font-mono">
                {post.category.name}
              </span>
            )}

            <div className="flex items-center gap-3 bg-[#071322] border border-slate-700/60 px-3.5 py-1.5 rounded-xl text-slate-300 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-white font-semibold">
                <User className="w-3.5 h-3.5 text-[#15B83E]" />
                {post.author?.name || 'SECO Editorial Team'}
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {formatDate(post.publishedAt || post.createdAt)}
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1 text-slate-300 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {readTime}
              </span>
            </div>

            {post.views !== undefined && post.views > 0 && (
              <span className="flex items-center gap-1.5 bg-[#071322] border border-slate-700/60 px-3.5 py-1.5 rounded-xl text-slate-400 text-xs font-mono">
                <Eye className="w-3.5 h-3.5 text-[#15B83E]" />
                {post.views} views
              </span>
            )}
          </div>

          {/* Article Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight font-heading max-w-5xl">
            {post.title}
          </h1>

          {/* Subheading / Lead Excerpt */}
          {post.excerpt && (
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-3xl border-l-2 border-[#15B83E] pl-4 py-1">
              {post.excerpt}
            </p>
          )}
        </div>
      </section>

      {/* 2. MAIN LAYOUT GRID (Article Body + Sidebar Column in 1600px Container) */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT MAIN ARTICLE COLUMN (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Featured Cover Image Frame */}
            {post.coverImage && (
              <div className="rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-200/80 aspect-[16/9] bg-slate-900 relative">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Rich Content Card */}
            <article className="bg-white rounded-[2.5rem] border border-slate-200/80 p-6 sm:p-10 lg:p-12 shadow-sm space-y-8">
              <BlogContentRenderer content={post.content} />

              {/* Tag Badges */}
              {post.tags && post.tags.length > 0 && (
                <div className="pt-8 mt-8 border-t border-slate-100 space-y-3">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#15B83E] font-heading">
                    <span className="w-4 h-[2px] bg-[#15B83E]" />
                    <span>TAGGED TOPICS</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(({ tag }) => (
                      <span
                        key={tag.id}
                        className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-[#15B83E]/10 hover:text-[#15B83E] transition cursor-pointer"
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Author / Editorial Box */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-[#050C16] text-[#15B83E] flex items-center justify-center font-bold text-xl flex-shrink-0 border border-slate-800 shadow-md">
                {(post.author?.name || 'Seko').charAt(0)}
              </div>
              <div className="space-y-1 text-center sm:text-left flex-1">
                <div className="text-xs font-mono font-bold text-[#15B83E] uppercase tracking-wider">
                  PUBLISHED BY SECO LINE EDITORIAL
                </div>
                <h4 className="text-base font-bold text-slate-900 font-heading">
                  {post.author?.name || 'Engineering & Technical Procurement Team'}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Specialists in industrial contracting, civil execution, MEP, scaffolding, and commercial trading standards across the Kingdom of Saudi Arabia.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR COLUMN (4 cols) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Quick Consultation Callout Widget */}
            <div className="bg-gradient-to-br from-[#050C16] via-[#071322] to-[#050C16] text-white rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl space-y-4">
              <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#15B83E] font-heading">
                <Sparkles className="w-3.5 h-3.5 text-[#15B83E]" />
                <span>TECHNICAL INQUIRY</span>
              </div>
              <h3 className="text-lg font-bold uppercase font-heading leading-snug">
                Need customized technical specifications or material supply?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Speak directly with SECO LINE procurement and contracting engineers for rapid quotes and project estimations.
              </p>
              <Link
                href="/contact"
                className="w-full py-3 bg-[#15B83E] hover:bg-[#129a34] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                <span>Request Quotation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Related Articles Widget */}
            {relatedPosts.length > 0 && (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#15B83E] font-heading border-b border-slate-100 pb-3 w-full">
                  <span className="w-4 h-[2px] bg-[#15B83E]" />
                  <span>RELATED ARTICLES</span>
                </div>

                <div className="divide-y divide-slate-100 space-y-3 pt-1">
                  {relatedPosts.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/blog/${rel.slug}`}
                      className="group block pt-3 first:pt-0 space-y-1.5"
                    >
                      {rel.category && (
                        <span className="text-[9px] font-bold text-[#15B83E] uppercase tracking-wider block font-mono">
                          {rel.category.name}
                        </span>
                      )}
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#15B83E] transition leading-snug line-clamp-2 font-heading">
                        {rel.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                        <span>{formatDate(rel.publishedAt || rel.createdAt)}</span>
                        <span>•</span>
                        <span className="text-[#15B83E] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                          Read <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Back Widget */}
            <div className="bg-slate-100/70 rounded-2xl p-5 border border-slate-200/70 text-center space-y-2">
              <p className="text-xs font-bold text-slate-700">Explore More Insights</p>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#15B83E] hover:underline uppercase tracking-wider"
              >
                <span>Browse All Articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* 3. BOTTOM CTA BANNER (Identical width & style to Trading & Contracting CTA) */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 py-2">
        <div className="bg-gradient-to-r from-[#050C16] via-[#071322] to-[#050C16] text-white rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-xl border border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-56 h-56 bg-[#15B83E]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#15B83E] font-heading">
              <CheckCircle2 className="w-4 h-4 text-[#15B83E]" />
              <span>STAY CONNECTED WITH SECO LINE</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight uppercase font-heading">
              HAVE A SPECIALIZED ENGINEERING INQUIRY OR PROJECT?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Our technical team delivers bespoke solutions across commercial trading and contracting services across Saudi Arabia. Speak with our experts today.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-5 py-3 bg-[#15B83E] hover:bg-[#129a34] text-white font-bold text-xs rounded-xl shadow-md transition text-center flex items-center justify-center gap-1.5 uppercase tracking-wider"
            >
              <span>Contact Our Specialists</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/blog"
              className="w-full sm:w-auto px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl backdrop-blur-md transition text-center uppercase tracking-wider"
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
