import React from 'react';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { Image as ImageIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await prisma.seoSetting.findUnique({ where: { pageKey: 'gallery' } }).catch(() => null);
  return {
    title: seo?.metaTitle || 'Media & Gallery - Seko Agency',
    description: seo?.metaDescription || 'Curated visual showcase of our creative work, engineering spaces, and studio artifacts.',
  };
}

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: { cat?: string };
}) {
  const selectedCat = searchParams.cat || '';

  const [categories, items] = await Promise.all([
    prisma.galleryCategory.findMany({ orderBy: { sortOrder: 'asc' } }).catch(() => []),
    prisma.galleryItem.findMany({
      where: {
        isPublished: true,
        ...(selectedCat ? { category: { slug: selectedCat } } : {}),
      },
      include: { category: true },
      orderBy: { sortOrder: 'asc' },
    }).catch(() => []),
  ]);

  return (
    <div className="py-16 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Visual Showcase</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Studio & Media Gallery
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          A glimpse into our engineering culture, creative process, and design artifacts.
        </p>
      </div>

      {/* Category Filter Tabs */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
          <a
            href="/gallery"
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition ${
              !selectedCat
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            All Work ({items.length})
          </a>
          {categories.map((c) => (
            <a
              key={c.id}
              href={`/gallery?cat=${c.slug}`}
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

      {/* Grid */}
      {items.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-16 text-center text-slate-400">
          <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-base font-semibold text-slate-700">No media items in this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col justify-between"
            >
              <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                <img
                  src={item.mediaUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                {item.category && (
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold rounded-lg">
                    {item.category.name}
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                {item.description && (
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
