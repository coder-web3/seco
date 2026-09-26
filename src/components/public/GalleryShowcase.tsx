'use client';

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Search, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Image as ImageIcon,
  Tag,
  Layers,
  ArrowRight
} from 'lucide-react';

interface GalleryCategory {
  id: number;
  name: string;
  slug: string;
}

interface GalleryItem {
  id: number;
  title: string;
  mediaUrl: string;
  description?: string | null;
  category?: GalleryCategory | null;
  sortOrder: number;
  isPublished: boolean;
}

interface GalleryShowcaseProps {
  initialItems: GalleryItem[];
  categories: GalleryCategory[];
}

export default function GalleryShowcase({ initialItems, categories }: GalleryShowcaseProps) {
  const [selectedCatSlug, setSelectedCatSlug] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter items based on selected category and search query
  const filteredItems = useMemo(() => {
    return initialItems.filter((item) => {
      const matchesCat = selectedCatSlug === 'all' || item.category?.slug === selectedCatSlug;
      const matchesSearch = 
        !searchQuery || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.category && item.category.name.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCat && matchesSearch;
    });
  }, [initialItems, selectedCatSlug, searchQuery]);

  // Lightbox Navigation
  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    } else if (lightboxIndex === 0) {
      setLightboxIndex(filteredItems.length - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && lightboxIndex < filteredItems.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    } else if (lightboxIndex === filteredItems.length - 1) {
      setLightboxIndex(0);
    }
  };

  return (
    <div className="space-y-10 sm:space-y-12">
      
      {/* Search & Category Filter Bar */}
      <div className="bg-white border border-slate-200/90 rounded-[2rem] p-4 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none no-scrollbar">
            <button
              onClick={() => setSelectedCatSlug('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCatSlug === 'all'
                  ? 'bg-[#0D2137] text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              All Artifacts ({initialItems.length})
            </button>

            {categories.map((c) => {
              const catCount = initialItems.filter(i => i.category?.slug === c.slug).length;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCatSlug(c.slug)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedCatSlug === c.slug
                      ? 'bg-[#15B83E] text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {c.name} ({catCount})
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 flex-shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search gallery artifacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-8 py-2 text-xs border border-slate-200 rounded-xl focus:border-[#15B83E] focus:outline-none bg-slate-50 focus:bg-white transition-colors font-medium text-slate-800"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Gallery Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-200/90 p-16 text-center text-slate-400 space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <ImageIcon className="w-8 h-8 opacity-40" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-800 font-heading">No Visual Artifacts Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No media matches your search query or selected category filter. Try clearing your filters.
            </p>
          </div>
          <button
            onClick={() => { setSelectedCatSlug('all'); setSearchQuery(''); }}
            className="inline-flex items-center gap-2 bg-[#0D2137] text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#15B83E] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative rounded-2xl overflow-hidden bg-[#060E1A] text-white border border-slate-800/90 hover:border-[#15B83E] hover:shadow-[0_15px_35px_rgba(21,184,62,0.25)] transition-all duration-500 flex flex-col justify-between cursor-pointer h-[320px] sm:h-[340px]"
            >
              {/* Background Image with Hover Zoom & Opacity Blend */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-65 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
                style={{ backgroundImage: `url('${item.mediaUrl}')` }}
              />

              {/* Ambient Dark Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#040A12] via-[#040A12]/40 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-[#15B83E]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Top Row: Category Badge & Zoom Indicator */}
              <div className="relative z-10 p-5 flex items-center justify-between">
                {item.category ? (
                  <span className="text-[10px] font-mono font-bold text-[#15B83E] bg-[#15B83E]/15 border border-[#15B83E]/40 px-3 py-1 rounded-full backdrop-blur-md shadow-md">
                    {item.category.name}
                  </span>
                ) : (
                  <span className="text-[10px] font-mono font-bold text-slate-300 bg-slate-900/60 border border-slate-700 px-3 py-1 rounded-full backdrop-blur-md">
                    PROJECT ARTIFACT
                  </span>
                )}

                <div className="w-8 h-8 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-300 group-hover:bg-[#15B83E] group-hover:text-white group-hover:border-[#15B83E] transition-all duration-300 flex items-center justify-center shadow-lg">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 p-6 space-y-1.5 mt-auto">
                <h3 className="text-base sm:text-lg font-extrabold text-white font-heading group-hover:text-[#15B83E] transition-colors leading-tight line-clamp-1">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-xs text-slate-300 leading-relaxed font-normal line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Top Glowing Laser Edge */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#15B83E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
            </div>
          ))}
        </div>
      )}

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      {activeItem && (
        <div 
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 overflow-hidden select-none animate-fadeIn"
        >
          {/* Close Button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-slate-900/90 border border-slate-700 text-white hover:bg-[#15B83E] hover:border-[#15B83E] transition-all flex items-center justify-center shadow-2xl z-50 cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 border border-slate-700 text-white hover:bg-[#15B83E] hover:border-[#15B83E] transition-all flex items-center justify-center shadow-2xl z-50 cursor-pointer group"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 border border-slate-700 text-white hover:bg-[#15B83E] hover:border-[#15B83E] transition-all flex items-center justify-center shadow-2xl z-50 cursor-pointer group"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Main Lightbox Content Box */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[85vh] bg-[#070E18] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between z-40"
          >
            {/* Image Container */}
            <div className="relative flex-grow min-h-[350px] sm:min-h-[480px] bg-slate-950 flex items-center justify-center p-2 overflow-hidden">
              <img
                src={activeItem.mediaUrl}
                alt={activeItem.title}
                className="max-w-full max-h-[65vh] object-contain rounded-xl shadow-2xl"
              />
            </div>

            {/* Bottom Caption & Info Bar */}
            <div className="p-6 bg-[#040A12] border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-white">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {activeItem.category && (
                    <span className="text-[10px] font-mono font-bold text-[#15B83E] bg-[#15B83E]/10 border border-[#15B83E]/30 px-2.5 py-0.5 rounded-md">
                      {activeItem.category.name}
                    </span>
                  )}
                  <span className="text-[11px] font-mono text-slate-400">
                    Artifact {lightboxIndex !== null ? lightboxIndex + 1 : 0} of {filteredItems.length}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-heading text-white">
                  {activeItem.title}
                </h3>
                {activeItem.description && (
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {activeItem.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <a
                  href={activeItem.mediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold bg-[#15B83E] hover:bg-[#129c35] text-white px-5 py-2.5 rounded-full shadow-md transition-all"
                >
                  <span>View Full Resolution</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
