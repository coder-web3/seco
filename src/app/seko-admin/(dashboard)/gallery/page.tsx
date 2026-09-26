'use client';

import React, { useState, useEffect } from 'react';
import { 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Loader2, 
  FolderPlus, 
  X, 
  Edit3, 
  Eye, 
  EyeOff, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Filter,
  Search,
  Check,
  Upload,
  Save
} from 'lucide-react';
import MediaPickerModal from '@/components/admin/MediaPickerModal';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface GalleryItem {
  id: number;
  title: string;
  mediaUrl: string;
  categoryId?: number | null;
  description?: string | null;
  category?: Category | null;
  sortOrder: number;
  isPublished: boolean;
}

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [catSubmitting, setCatSubmitting] = useState(false);

  // Forms
  const [itemForm, setItemForm] = useState({
    title: '',
    mediaUrl: '',
    categoryId: '',
    description: '',
    sortOrder: 0,
    isPublished: true,
  });

  const [catName, setCatName] = useState('');

  // Gallery Hero Section State
  const [heroForm, setHeroForm] = useState({
    kicker: 'MEDIA & VISUAL GALLERY',
    titleLine1: 'Engineering Excellence &',
    titleGreen: 'Project Showcase',
    subtitle: "Explore curated visual documentation of SECO LINE's industrial material supply, high-pressure piping assemblies, civil engineering sites, and heavy machinery operations across the Kingdom.",
    badge1Text: 'High-Resolution Project Photography',
    badge2Text: 'Aramco & SABIC Site Inspection Verification',
    badge3Text: '100% Certified Operational Standards',
    bgImageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80',
  });
  const [savingHero, setSavingHero] = useState(false);
  const [heroSuccessMsg, setHeroSuccessMsg] = useState<string | null>(null);
  const [uploadingHeroBg, setUploadingHeroBg] = useState(false);
  const [heroMediaPickerOpen, setHeroMediaPickerOpen] = useState(false);
  const [showHeroEditor, setShowHeroEditor] = useState(false);

  useEffect(() => {
    fetchGallery();
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const res = await fetch('/api/admin/gallery/hero');
      const data = await res.json();
      if (data.success && data.hero) {
        const h = data.hero;
        setHeroForm({
          kicker: h.kicker || 'MEDIA & VISUAL GALLERY',
          titleLine1: h.titleLine1 || 'Engineering Excellence &',
          titleGreen: h.titleGreen || 'Project Showcase',
          subtitle: h.subtitle || '',
          badge1Text: h.badge1Text || 'High-Resolution Project Photography',
          badge2Text: h.badge2Text || 'Aramco & SABIC Site Inspection Verification',
          badge3Text: h.badge3Text || '100% Certified Operational Standards',
          bgImageUrl: h.bgImageUrl || '',
        });
      }
    } catch (err) {
      console.error('Failed to load gallery hero:', err);
    }
  };

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingHero(true);
    setHeroSuccessMsg(null);
    try {
      const res = await fetch('/api/admin/gallery/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(heroForm),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setHeroSuccessMsg('Gallery Hero section updated successfully!');
        setTimeout(() => setHeroSuccessMsg(null), 4000);
      } else {
        alert(data.error || 'Failed to save gallery hero.');
      }
    } catch (err: any) {
      alert(err.message || 'Error saving gallery hero section.');
    } finally {
      setSavingHero(false);
    }
  };

  const handleDirectHeroBgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingHeroBg(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('altText', file.name);

    try {
      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.success && data.media?.fileUrl) {
        setHeroForm((prev) => ({ ...prev, bgImageUrl: data.media.fileUrl }));
        setHeroSuccessMsg(`Uploaded hero image "${file.name}"!`);
        setTimeout(() => setHeroSuccessMsg(null), 4000);
      } else {
        alert(data.error || 'Failed to upload image.');
      }
    } catch (err: any) {
      alert(err.message || 'Error uploading image.');
    } finally {
      setUploadingHeroBg(false);
    }
  };

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/admin/gallery');
      const data = await res.json();
      if (data.success) {
        setItems(data.items);
        setCategories(data.categories);
      }
    } catch (err) {
      console.error('Failed to load gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingItem(null);
    setItemForm({
      title: '',
      mediaUrl: '',
      categoryId: selectedCategory !== 'all' ? selectedCategory : '',
      description: '',
      sortOrder: items.length + 1,
      isPublished: true,
    });
    setIsItemModalOpen(true);
  };

  const openEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setItemForm({
      title: item.title,
      mediaUrl: item.mediaUrl,
      categoryId: item.categoryId ? String(item.categoryId) : '',
      description: item.description || '',
      sortOrder: item.sortOrder || 0,
      isPublished: item.isPublished,
    });
    setIsItemModalOpen(true);
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...itemForm,
        categoryId: itemForm.categoryId ? Number(itemForm.categoryId) : null,
      };

      if (editingItem) {
        // PUT update
        const res = await fetch(`/api/admin/gallery/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          setItems(items.map((i) => (i.id === editingItem.id ? data.item : i)));
          setIsItemModalOpen(false);
        }
      } else {
        // POST create
        const res = await fetch('/api/admin/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          setItems([...items, data.item]);
          setIsItemModalOpen(false);
        }
      }
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateCat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;
    setCatSubmitting(true);
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'category', name: catName }),
      });
      const data = await res.json();
      if (data.success) {
        setCategories([...categories, data.category]);
        setCatName('');
      }
    } catch (err) {
      console.error('Category error:', err);
    } finally {
      setCatSubmitting(false);
    }
  };

  const handleDeleteCat = async (id: number) => {
    if (!confirm('Are you sure you want to delete this category? Items will become uncategorized.')) return;
    try {
      const res = await fetch(`/api/admin/gallery/category/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCategories(categories.filter((c) => c.id !== id));
        if (selectedCategory === String(id)) setSelectedCategory('all');
        // Refresh items to clear category disassociation
        fetchGallery();
      }
    } catch (err) {
      console.error('Category delete error:', err);
    }
  };

  const handleDeleteItem = async (id: number) => {
    if (!confirm('Permanently remove this photo from the gallery?')) return;
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItems(items.filter((i) => i.id !== id));
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleTogglePublish = async (item: GalleryItem) => {
    try {
      const res = await fetch(`/api/admin/gallery/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...item,
          isPublished: !item.isPublished,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setItems(items.map((i) => (i.id === item.id ? data.item : i)));
      }
    } catch (err) {
      console.error('Toggle publish error:', err);
    }
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesCat =
      selectedCategory === 'all'
        ? true
        : selectedCategory === 'uncategorized'
        ? !item.categoryId
        : String(item.categoryId) === selectedCategory;

    const matchesSearch =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesSearch;
  });

  const totalPublished = items.filter((i) => i.isPublished).length;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Media & Visual Assets</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Gallery Showcase</h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Curate project site photos, high-resolution machinery shots, and industrial certifications shown on the public gallery.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowHeroEditor(!showHeroEditor)}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 text-xs font-semibold rounded-xl flex items-center gap-2 transition shadow-sm"
            >
              <Edit3 className="w-4 h-4 text-emerald-400" />
              <span>{showHeroEditor ? 'Hide Hero Editor' : 'Edit Hero Section'}</span>
            </button>

            <button
              onClick={() => setIsCatModalOpen(true)}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl flex items-center gap-2 transition shadow-sm"
            >
              <FolderPlus className="w-4 h-4 text-emerald-400" />
              <span>Categories ({categories.length})</span>
            </button>

            <button
              onClick={openCreateModal}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition transform active:scale-95"
            >
              <Plus className="w-4.5 h-4.5 stroke-[2.5]" />
              <span>Add New Photo</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-800">
            <span className="text-xs font-medium text-slate-400 block">Total Photos</span>
            <span className="text-2xl font-bold text-white mt-1 block">{items.length}</span>
          </div>
          <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-800">
            <span className="text-xs font-medium text-slate-400 block font-sans">Live / Published</span>
            <span className="text-2xl font-bold text-emerald-400 mt-1 block">{totalPublished}</span>
          </div>
          <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-800">
            <span className="text-xs font-medium text-slate-400 block">Categories</span>
            <span className="text-2xl font-bold text-indigo-400 mt-1 block">{categories.length}</span>
          </div>
          <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-800">
            <span className="text-xs font-medium text-slate-400 block">Draft / Hidden</span>
            <span className="text-2xl font-bold text-amber-400 mt-1 block">{items.length - totalPublished}</span>
          </div>
        </div>
      </div>

      {/* Gallery Hero Section Editor Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Gallery Page Hero Banner Settings</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Customize the kicker tag, title lines, subtitle, bottom badges, and background showcase image on the public gallery page.</p>
          </div>
          <button
            type="button"
            onClick={() => setShowHeroEditor(!showHeroEditor)}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 transition"
          >
            {showHeroEditor ? 'Hide Form' : 'Edit Hero Content'}
          </button>
        </div>

        {heroSuccessMsg && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 animate-in fade-in shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{heroSuccessMsg}</span>
          </div>
        )}

        {showHeroEditor && (
          <form onSubmit={handleSaveHero} className="space-y-4 pt-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Kicker Tag
                </label>
                <input
                  type="text"
                  value={heroForm.kicker}
                  onChange={(e) => setHeroForm({ ...heroForm, kicker: e.target.value })}
                  placeholder="MEDIA & VISUAL GALLERY"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Title Line 1 (White Text)
                </label>
                <input
                  type="text"
                  value={heroForm.titleLine1}
                  onChange={(e) => setHeroForm({ ...heroForm, titleLine1: e.target.value })}
                  placeholder="Engineering Excellence &"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Title Line 2 (Green Highlight)
                </label>
                <input
                  type="text"
                  value={heroForm.titleGreen}
                  onChange={(e) => setHeroForm({ ...heroForm, titleGreen: e.target.value })}
                  placeholder="Project Showcase"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold text-emerald-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Subtitle Paragraph
              </label>
              <textarea
                rows={2}
                value={heroForm.subtitle}
                onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                placeholder="Explore curated visual documentation of SECO LINE's operations..."
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Bottom Badge 1
                </label>
                <input
                  type="text"
                  value={heroForm.badge1Text}
                  onChange={(e) => setHeroForm({ ...heroForm, badge1Text: e.target.value })}
                  placeholder="High-Resolution Project Photography"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Bottom Badge 2
                </label>
                <input
                  type="text"
                  value={heroForm.badge2Text}
                  onChange={(e) => setHeroForm({ ...heroForm, badge2Text: e.target.value })}
                  placeholder="Aramco & SABIC Site Inspection Verification"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Bottom Badge 3
                </label>
                <input
                  type="text"
                  value={heroForm.badge3Text}
                  onChange={(e) => setHeroForm({ ...heroForm, badge3Text: e.target.value })}
                  placeholder="100% Certified Operational Standards"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Hero Showcase Image URL & Direct Upload
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={heroForm.bgImageUrl}
                  onChange={(e) => setHeroForm({ ...heroForm, bgImageUrl: e.target.value })}
                  placeholder="https://... or /uploads/..."
                  className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <label className="px-4 py-2 bg-[#008738] hover:bg-[#00702e] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer transition shadow-xs">
                  {uploadingHeroBg ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Upload className="w-3.5 h-3.5" />
                  )}
                  <span>{uploadingHeroBg ? 'Uploading...' : 'Upload'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleDirectHeroBgUpload}
                    disabled={uploadingHeroBg}
                    className="hidden"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => setHeroMediaPickerOpen(true)}
                  className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-[#008738] text-xs font-bold rounded-xl flex items-center gap-1.5 transition border border-emerald-200"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Media</span>
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={savingHero}
                className="px-6 py-2.5 bg-[#008738] hover:bg-[#00702e] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition disabled:opacity-50"
              >
                {savingHero ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving Hero...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Gallery Hero Section</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Controls Bar: Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white shadow'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            All Items ({items.length})
          </button>
          {categories.map((cat) => {
            const count = items.filter((i) => i.categoryId === cat.id).length;
            const isSelected = selectedCategory === String(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(String(cat.id))}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search gallery..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
          />
        </div>
      </div>

      {/* Main Content / Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200/80">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mb-2" />
          <p className="text-xs text-slate-400 font-medium">Loading gallery items...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-16 text-center shadow-sm">
          <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400">
            <ImageIcon className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No photos found</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
            {searchQuery || selectedCategory !== 'all'
              ? 'Try resetting your search filter or selecting another category.'
              : 'Add your first project photo to start displaying visual artifacts.'}
          </p>
          <button
            onClick={openCreateModal}
            className="mt-5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl inline-flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Photo</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md group flex flex-col ${
                !item.isPublished ? 'border-amber-200 bg-amber-50/10' : 'border-slate-200/90 hover:border-emerald-500/40'
              }`}
            >
              {/* Photo Preview Container */}
              <div className="aspect-[4/3] bg-slate-900 relative overflow-hidden">
                <img
                  src={item.mediaUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top Action Overlay Bar */}
                <div className="absolute inset-x-0 top-0 p-2.5 flex items-center justify-between bg-gradient-to-b from-black/70 via-black/30 to-transparent">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-wider backdrop-blur-md ${
                      item.isPublished
                        ? 'bg-emerald-500/90 text-white'
                        : 'bg-amber-500/90 text-white'
                    }`}
                  >
                    {item.isPublished ? 'Published' : 'Draft'}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleTogglePublish(item)}
                      className={`p-1.5 rounded-lg backdrop-blur-md transition ${
                        item.isPublished
                          ? 'bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-900'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                      title={item.isPublished ? 'Hide from public' : 'Publish to gallery'}
                    >
                      {item.isPublished ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 bg-slate-900/70 hover:bg-indigo-600 text-slate-300 hover:text-white rounded-lg backdrop-blur-md transition"
                      title="Edit photo details"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-1.5 bg-slate-900/70 hover:bg-rose-600 text-slate-300 hover:text-white rounded-lg backdrop-blur-md transition"
                      title="Delete photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Category Pill on bottom left of image */}
                {item.category && (
                  <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 bg-slate-950/80 backdrop-blur-md border border-white/10 text-white text-[10px] font-medium rounded-lg">
                    {item.category.name}
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs leading-snug group-hover:text-emerald-700 transition">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Order #{item.sortOrder}</span>
                  <span className="font-mono text-slate-400">ID #{item.id}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Photo Modal */}
      {isItemModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm tracking-tight">
                  {editingItem ? 'Edit Gallery Photo' : 'Add Gallery Photo'}
                </h3>
              </div>
              <button
                onClick={() => setIsItemModalOpen(false)}
                className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Photo Title *
                </label>
                <input
                  type="text"
                  required
                  value={itemForm.title}
                  onChange={(e) => setItemForm({ ...itemForm, title: e.target.value })}
                  placeholder="e.g. High-Pressure Valve Hydrotest"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Image URL / File Path *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={itemForm.mediaUrl}
                    onChange={(e) => setItemForm({ ...itemForm, mediaUrl: e.target.value })}
                    placeholder="/uploads/... or https://..."
                    className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setMediaPickerOpen(true)}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
                  >
                    <Upload className="w-3.5 h-3.5 text-slate-500" />
                    <span>Select Media</span>
                  </button>
                </div>

                {itemForm.mediaUrl && (
                  <div className="mt-2.5 h-28 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 relative">
                    <img
                      src={itemForm.mediaUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={itemForm.categoryId}
                    onChange={(e) => setItemForm({ ...itemForm, categoryId: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                  >
                    <option value="">No Category (General)</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={itemForm.sortOrder}
                    onChange={(e) => setItemForm({ ...itemForm, sortOrder: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Description / Subcaption
                </label>
                <textarea
                  rows={3}
                  value={itemForm.description}
                  onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                  placeholder="Optional details about this project photo, location, or equipment specifications..."
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={itemForm.isPublished}
                    onChange={(e) => setItemForm({ ...itemForm, isPublished: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                  />
                  <span className="text-xs font-semibold text-slate-700">Publish immediately to public gallery</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsItemModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 stroke-[2.5]" />
                      <span>{editingItem ? 'Update Photo' : 'Save Photo'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manage Categories Modal */}
      {isCatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm tracking-tight">Gallery Categories</h3>
              </div>
              <button
                onClick={() => setIsCatModalOpen(false)}
                className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Form to create */}
              <form onSubmit={handleCreateCat} className="space-y-3">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                  Add New Category
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
                    placeholder="e.g. Electrical & Instrumentation"
                    className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                  />
                  <button
                    type="submit"
                    disabled={catSubmitting}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow transition flex items-center gap-1.5"
                  >
                    {catSubmitting ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* List existing */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Existing Categories ({categories.length})
                </label>
                {categories.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No categories created yet.</p>
                ) : (
                  <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                    {categories.map((cat) => {
                      const itemCount = items.filter((i) => i.categoryId === cat.id).length;
                      return (
                        <div
                          key={cat.id}
                          className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs"
                        >
                          <div>
                            <span className="font-semibold text-slate-800">{cat.name}</span>
                            <span className="text-[10px] text-slate-400 ml-2">({itemCount} photos)</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteCat(cat.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 transition"
                            title="Delete category"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelect={(url) => setItemForm({ ...itemForm, mediaUrl: url })}
        title="Select Gallery Photo from Server"
      />

      <MediaPickerModal
        isOpen={heroMediaPickerOpen}
        onClose={() => setHeroMediaPickerOpen(false)}
        onSelect={(url) => setHeroForm({ ...heroForm, bgImageUrl: url })}
        title="Select Gallery Hero Image from Server"
      />
    </div>
  );
}
