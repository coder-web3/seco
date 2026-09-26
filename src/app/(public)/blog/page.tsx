import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { BookOpen, ArrowRight, Search, Clock, Calendar, User, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await prisma.seoSetting.findUnique({ where: { pageKey: 'blog' } }).catch(() => null);
  return {
    title: seo?.metaTitle || 'Insights & Engineering Notes - SECO LINE',
    description: seo?.metaDescription || 'Industry insights, engineering standards, and company updates from SECO LINE.',
  };
}

function calculateReadTime(content?: string | null): string {
  if (!content) return '2 min read';
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { cat?: string; q?: string };
}) {
  const selectedCat = searchParams.cat || '';
  const searchQuery = (searchParams.q || '').trim();

  const [categories, allPosts] = await Promise.all([
    prisma.blogCategory.findMany({
      include: { _count: { select: { posts: true } } },
      orderBy: { name: 'asc' },
    }).catch(() => []),
    prisma.blogPost.findMany({
      where: {
        isPublished: true,
        ...(selectedCat ? { category: { slug: selectedCat } } : {}),
        ...(searchQuery
          ? {
              OR: [
                { title: { contains: searchQuery } },
                { excerpt: { contains: searchQuery } },
                { content: { contains: searchQuery } },
              ],
            }
          : {}),
      },
      include: {
        category: true,
        author: { select: { name: true } },
        tags: { include: { tag: true } },
      },
      orderBy: { publishedAt: 'desc' },
    }).catch(() => []),
  ]);

  // Separate featured (latest) article from remaining articles
  const featuredPost = (!selectedCat && !searchQuery && allPosts.length > 0) ? allPosts[0] : null;
  const gridPosts = featuredPost ? allPosts.slice(1) : allPosts;

  return (
    <div className="space-y-10 sm:space-y-12 pb-16 font-sans select-none bg-slate-50/50">
      {/* 1. HERO SECTION (Exact Trading Services Font Setup) */}
      <section className="relative overflow-hidden bg-[#050C16] text-white rounded-[2.5rem] lg:rounded-[3rem] mx-3 sm:mx-6 mt-2 shadow-2xl border border-slate-800/80 p-6 sm:p-10 lg:p-12">
        {/* Background Ambient Glow Orbs */}
        <div className="absolute top-0 left-1/3 w-[450px] h-[450px] bg-[#15B83E]/15 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-[#084BA4]/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[1600px] mx-auto relative z-10 space-y-4 sm:space-y-5">
          {/* Top Green Accent Kicker */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#15B83E] font-heading">
              <span className="w-5 h-[2px] bg-[#15B83E]" />
              <span>SECO LINE KNOWLEDGE HUB</span>
            </div>
          </div>

          {/* Main Headline (Reduced to match Trading Services) */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase font-heading leading-tight">
            INSIGHTS & <span className="text-[#15B83E]">ENGINEERING</span> NOTES
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-normal font-sans">
            Explore expert analysis, technical standards, project milestones, and industry perspectives from our engineering and contracting specialists across Saudi Arabia.
          </p>

          {/* Search Bar Input */}
          <form action="/blog" method="GET" className="flex items-center gap-2 pt-1 max-w-lg">
            {selectedCat && <input type="hidden" name="cat" value={selectedCat} />}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                name="q"
                defaultValue={searchQuery}
                placeholder="Search articles, keywords..."
                className="w-full pl-9 pr-4 py-2.5 bg-[#071322] border border-slate-700/60 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#15B83E] focus:border-[#15B83E] transition font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#15B83E] hover:bg-[#129a34] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl shadow-md transition flex items-center gap-1.5"
            >
              <span>Search</span>
            </button>
          </form>
        </div>
      </section>

      {/* 2. CATEGORY FILTER PILLS (Trading Services Styling) */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full text-nowrap scrollbar-none">
            <Link
              href={searchQuery ? `/blog?q=${encodeURIComponent(searchQuery)}` : '/blog'}
              className={`px-3.5 py-2 text-[11px] font-bold rounded-lg transition whitespace-nowrap shrink-0 ${
                !selectedCat
                  ? 'bg-[#15B83E] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              ALL ARTICLES ({allPosts.length})
            </Link>
            {categories.map((c) => {
              const isActive = selectedCat === c.slug;
              const linkHref = `/blog?cat=${c.slug}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ''}`;
              return (
                <Link
                  key={c.id}
                  href={linkHref}
                  className={`px-3.5 py-2 text-[11px] font-bold rounded-lg transition flex items-center gap-1.5 uppercase whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#15B83E] text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{c.name}</span>
                  {c._count && c._count.posts > 0 && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                        isActive ? 'bg-[#129a34] text-white' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {c._count.posts}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {searchQuery && (
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <span>Filtering by: "<strong className="text-slate-900">{searchQuery}</strong>"</span>
              <Link href="/blog" className="text-[#15B83E] hover:underline font-semibold">
                Clear search
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 3. FEATURED STORY SPOTLIGHT (Reduced Font Size & Weight matching Trading Services) */}
      {featuredPost && (
        <section className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 space-y-3">
          <div className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#15B83E] font-heading">
            <span className="w-6 h-[2px] bg-[#15B83E]" />
            <span>FEATURED ARTICLE SPOTLIGHT</span>
          </div>

          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md hover:border-[#15B83E]/40 transition-all duration-300"
          >
            {/* Image Column (Compact Height) */}
            <div className="lg:col-span-5 relative overflow-hidden bg-slate-100 h-44 sm:h-52 lg:h-56">
              {featuredPost.coverImage ? (
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 ease-out"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#050C16] via-slate-900 to-[#040A12] flex items-center justify-center p-6 text-center text-white">
                  <div>
                    <span className="text-[#15B83E] font-bold text-[10px] tracking-widest uppercase block mb-1">SECO LINE</span>
                    <p className="font-bold text-sm">Industrial Insights</p>
                  </div>
                </div>
              )}
              {featuredPost.category && (
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#050C16]/80 backdrop-blur-md text-white text-[10px] font-bold rounded-md border border-white/20 uppercase tracking-wider">
                  {featuredPost.category.name}
                </span>
              )}
            </div>

            {/* Content Column (Exact Font & Mobile Wrapping Specs) */}
            <div className="lg:col-span-7 p-4 sm:p-5 lg:p-6 flex flex-col justify-between h-auto sm:h-52 lg:h-56 space-y-2">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1 text-slate-700 font-semibold whitespace-nowrap">
                    <User className="w-3 h-3 text-[#15B83E]" />
                    {featuredPost.author?.name || 'Editorial Team'}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {formatDate(featuredPost.publishedAt || featuredPost.createdAt)}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1 text-slate-600 font-medium whitespace-nowrap">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {calculateReadTime(featuredPost.content)}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#0D2137] group-hover:text-[#15B83E] transition leading-snug tracking-tight line-clamp-2 font-heading">
                  {featuredPost.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                  {featuredPost.excerpt || 'Read the full story to learn more about our latest project developments and technical findings.'}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#15B83E]">
                <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1 uppercase tracking-wider">
                  READ FEATURED ARTICLE
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="p-1.5 bg-emerald-50 text-[#15B83E] rounded-full group-hover:bg-[#15B83E] group-hover:text-white transition">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* 4. MAIN ARTICLES GRID (Reduced Font Sizes & Weights) */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 space-y-4">
        {featuredPost && (
          <div className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#15B83E] font-heading">
            <span className="w-6 h-[2px] bg-[#15B83E]" />
            <span>RECENT ARTICLES & GUIDES</span>
          </div>
        )}

        {gridPosts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-400">
            <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-30 text-[#15B83E]" />
            <p className="text-sm font-bold text-slate-800">No articles match your search or filter</p>
            <p className="text-xs text-slate-500 mt-1">Try selecting another category or clearing your search term.</p>
            <Link
              href="/blog"
              className="inline-block mt-3 px-4 py-2 bg-[#15B83E] text-white text-[11px] font-bold rounded-lg uppercase tracking-wider"
            >
              View All Articles
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 hover:border-[#15B83E]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Cover Image */}
                  <div className="aspect-[16/9] bg-slate-100 relative overflow-hidden">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-tr from-[#050C16] to-[#040A12] flex items-center justify-center p-6 text-center text-slate-300 font-bold text-xs">
                        SECO LINE Insight
                      </div>
                    )}

                    {post.category && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#050C16]/80 backdrop-blur-md text-white text-[10px] font-bold rounded-md border border-white/10 uppercase tracking-wider">
                        {post.category.name}
                      </span>
                    )}

                    <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-[#050C16]/85 backdrop-blur-md text-slate-200 text-[9px] font-medium rounded font-mono">
                      {calculateReadTime(post.content)}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-2">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-500 font-medium">
                      <span className="text-slate-600 font-semibold whitespace-nowrap">{post.author?.name || 'Editorial Team'}</span>
                      <span className="text-slate-300">•</span>
                      <span className="whitespace-nowrap">{formatDate(post.publishedAt || post.createdAt)}</span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-[#0D2137] group-hover:text-[#15B83E] transition leading-snug tracking-tight line-clamp-2 font-heading">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {post.excerpt || 'Explore this article for detailed insights and operational benchmarks.'}
                    </p>

                    {/* Tag Pills */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {post.tags.slice(0, 3).map(({ tag }) => (
                          <span
                            key={tag.id}
                            className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-medium rounded"
                          >
                            #{tag.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 pb-4 pt-2 flex items-center justify-between text-[11px] font-bold text-[#15B83E] border-t border-slate-100/80 mt-1">
                  <span className="flex items-center gap-1 group-hover:gap-1.5 transition-all uppercase tracking-wider">
                    READ ARTICLE
                    <ArrowRight className="w-3 h-3" />
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 group-hover:text-[#15B83E] transition">
                    SECO-BLOG
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 5. BOTTOM CTA BANNER (Trading Services Font Setup) */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 py-2">
        <div className="bg-gradient-to-r from-[#050C16] via-[#071322] to-[#050C16] text-white rounded-[2rem] p-6 sm:p-10 lg:p-12 shadow-xl border border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-56 h-56 bg-[#15B83E]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#15B83E] font-heading">
              <span className="w-4 h-[2px] bg-[#15B83E]" />
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
              href="/trading-services"
              className="w-full sm:w-auto px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl backdrop-blur-md transition text-center uppercase tracking-wider"
            >
              Trading Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
