'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  PackageCheck, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Loader2, 
  Image as ImageIcon, 
  Sparkles, 
  Save, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  FileText, 
  Layout, 
  Upload, 
  Tag, 
  Award, 
  Boxes
} from 'lucide-react';
import MediaPickerModal from '@/components/admin/MediaPickerModal';

interface TradingService {
  id: number;
  slug: string;
  title: string;
  badge?: string | null;
  iconName?: string | null;
  imageUrl?: string | null;
  heroBgUrl?: string | null;
  shortDesc?: string | null;
  fullDesc?: string | null;
  tags?: string | null;
  features?: string | null;
  itemsSupplied?: string | null;
  standards?: string | null;
  industriesJson?: string | null;
  whySecoJson?: string | null;
  processJson?: string | null;
  overviewKicker?: string | null;
  overviewTitle?: string | null;
  overviewSubtitle?: string | null;
  overviewDesc2?: string | null;
  overviewFeaturesJson?: string | null;
  pdfUrl?: string | null;
  categoriesKicker?: string | null;
  categoriesTitle?: string | null;
  categoriesSubtitle?: string | null;
  sortOrder: number;
  isPublished: boolean;
}

export default function TradingServicesAdminPage() {
  const [activeTab, setActiveTab] = useState<'divisions' | 'hero'>('divisions');
  const [modalTab, setModalTab] = useState<'basic' | 'overview' | 'categories' | 'custom'>('basic');
  const [services, setServices] = useState<TradingService[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<TradingService | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  // Media Picker state
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [mediaTarget, setMediaTarget] = useState<string>('cardImage');

  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Division Form State
  const [form, setForm] = useState({
    title: '',
    slug: '',
    badge: 'High Spec',
    iconName: 'Layers',
    imageUrl: '',
    heroBgUrl: '',
    shortDesc: '',
    fullDesc: '',
    tagsStr: '',
    featuresStr: '',
    itemsSuppliedStr: '',
    standardsStr: '',
    industriesStr: '',
    whySecoStr: '',
    processStr: '',
    overviewKicker: 'DIVISION OVERVIEW & STRATEGIC VALUE',
    overviewTitle: 'Uncompromising Quality in',
    overviewSubtitle: 'Engineered to meet the most rigorous technical demands of Saudi Arabia’s industrial, energy, civil, and infrastructure mega-projects.',
    overviewDesc2: 'Every material batch undergoes comprehensive quality control, heat traceability verification, and third-party inspection to ensure total alignment with Saudi Aramco, SABIC, SEC, and international ASTM/API standards.',
    overviewFeaturesStr: 'Traceable Mill Specs | Full MTC 3.1 & heat batch documentation.\nKingdom Logistics | Rapid site delivery to all KSA regions.\nAramco Compliant | Fully certified for energy & plant sites.',
    pdfUrl: '/SECO_LINE_PROFILE.pdf',
    categoriesKicker: 'PRODUCT / SERVICE CATEGORIES',
    categoriesTitle: 'Main Supply Classifications',
    categoriesSubtitle: '',
    sortOrder: 0,
    isPublished: true,
  });

  // Hero Form State
  const [heroForm, setHeroForm] = useState({
    badgeText: "SAUDI ARABIA'S TIER-1 INDUSTRIAL TRADING DIVISION",
    titleLine1: 'Certified Industrial Material',
    titleGreen: '& Equipment Supply',
    subtitle: 'We supply high-grade certified piping, safety equipment, electrical components, heavy machinery, structural steel, and specialized hardware across Saudi Arabia.',
    badge1Text: '100% Aramco Traceable',
    badge2Text: 'Kingdom-Wide Fast Dispatch',
    badge3Text: 'Tier-1 Wholesale Pricing',
    stat1Value: '6+',
    stat1Label: 'Trading Divisions',
    stat2Value: '5,000+',
    stat2Label: 'MTC 3.1 Certified Items',
    stat3Value: '24/7',
    stat3Label: 'RFQ Fast Response',
    bgImageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80',
    overlayImageUrl: '',
  });

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/trading-services');
      const data = await res.json();
      if (data.success) {
        setServices(data.services || []);
      }
    } catch (err) {
      console.error('Failed to fetch trading services:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHeroSetting = async () => {
    try {
      const res = await fetch('/api/admin/trading-services/hero');
      const data = await res.json();
      if (data.success && data.heroSetting) {
        setHeroForm({
          badgeText: data.heroSetting.badgeText || '',
          titleLine1: data.heroSetting.titleLine1 || '',
          titleGreen: data.heroSetting.titleGreen || '',
          subtitle: data.heroSetting.subtitle || '',
          badge1Text: data.heroSetting.badge1Text || '',
          badge2Text: data.heroSetting.badge2Text || '',
          badge3Text: data.heroSetting.badge3Text || '',
          stat1Value: data.heroSetting.stat1Value || '',
          stat1Label: data.heroSetting.stat1Label || '',
          stat2Value: data.heroSetting.stat2Value || '',
          stat2Label: data.heroSetting.stat2Label || '',
          stat3Value: data.heroSetting.stat3Value || '',
          stat3Label: data.heroSetting.stat3Label || '',
          bgImageUrl: data.heroSetting.bgImageUrl || '',
          overlayImageUrl: data.heroSetting.overlayImageUrl || '',
        });
      }
    } catch (err) {
      console.error('Failed to fetch hero setting:', err);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchHeroSetting();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setModalTab('basic');
    setForm({
      title: '',
      slug: '',
      badge: 'High Spec',
      iconName: 'Layers',
      imageUrl: '',
      heroBgUrl: '',
      shortDesc: '',
      fullDesc: '',
      tagsStr: '',
      featuresStr: '',
      itemsSuppliedStr: '',
      standardsStr: '',
      industriesStr: '',
      whySecoStr: '',
      processStr: '',
      overviewKicker: 'DIVISION OVERVIEW & STRATEGIC VALUE',
      overviewTitle: 'Uncompromising Quality in',
      overviewSubtitle: 'Engineered to meet the most rigorous technical demands of Saudi Arabia’s industrial, energy, civil, and infrastructure mega-projects.',
      overviewDesc2: 'Every material batch undergoes comprehensive quality control, heat traceability verification, and third-party inspection to ensure total alignment with Saudi Aramco, SABIC, SEC, and international ASTM/API standards.',
      overviewFeaturesStr: 'Traceable Mill Specs | Full MTC 3.1 & heat batch documentation.\nKingdom Logistics | Rapid site delivery to all KSA regions.\nAramco Compliant | Fully certified for energy & plant sites.',
      pdfUrl: '/SECO_LINE_PROFILE.pdf',
      categoriesKicker: 'PRODUCT / SERVICE CATEGORIES',
      categoriesTitle: 'Main Supply Classifications',
      categoriesSubtitle: '',
      sortOrder: services.length,
      isPublished: true,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (service: TradingService) => {
    setEditingService(service);
    setModalTab('basic');
    
    // Parse JSON or string fields
    let tagsStr = '';
    let featuresStr = '';
    let itemsSuppliedStr = '';
    let standardsStr = '';
    let industriesStr = '';
    let whySecoStr = '';
    let processStr = '';
    let overviewFeaturesStr = '';

    try {
      const tagsArr = service.tags ? JSON.parse(service.tags) : [];
      if (Array.isArray(tagsArr) && tagsArr.length > 0 && typeof tagsArr[0] === 'object') {
        tagsStr = tagsArr.map((it: any) => `${it.name || it.title || ''} | ${it.desc || ''}${it.imageUrl || it.image ? ` | ${it.imageUrl || it.image}` : ''}`).join('\n');
      } else {
        tagsStr = Array.isArray(tagsArr) ? tagsArr.join('\n') : service.tags || '';
      }
    } catch {
      tagsStr = service.tags || '';
    }

    try {
      const featsArr = service.features ? JSON.parse(service.features) : [];
      featuresStr = Array.isArray(featsArr) ? featsArr.join('\n') : service.features || '';
    } catch {
      featuresStr = service.features || '';
    }

    try {
      const itemsArr = service.itemsSupplied ? JSON.parse(service.itemsSupplied) : [];
      if (Array.isArray(itemsArr) && itemsArr.length > 0 && typeof itemsArr[0] === 'object') {
        itemsSuppliedStr = itemsArr.map((it: any) => `${it.name || ''} | ${it.spec || ''}`).join('\n');
      } else {
        itemsSuppliedStr = Array.isArray(itemsArr) ? itemsArr.join('\n') : service.itemsSupplied || '';
      }
    } catch {
      itemsSuppliedStr = service.itemsSupplied || '';
    }

    try {
      const stdsArr = service.standards ? JSON.parse(service.standards) : [];
      standardsStr = Array.isArray(stdsArr) ? stdsArr.join('\n') : service.standards || '';
    } catch {
      standardsStr = service.standards || '';
    }

    try {
      const indArr = service.industriesJson ? JSON.parse(service.industriesJson) : [];
      industriesStr = Array.isArray(indArr) ? indArr.map((it: any) => `${it.name || ''} | ${it.desc || ''}`).join('\n') : '';
    } catch { industriesStr = ''; }

    try {
      const wArr = service.whySecoJson ? JSON.parse(service.whySecoJson) : [];
      whySecoStr = Array.isArray(wArr) ? wArr.map((it: any) => `${it.title || ''} | ${it.desc || ''}`).join('\n') : '';
    } catch { whySecoStr = ''; }

    try {
      const pArr = service.processJson ? JSON.parse(service.processJson) : [];
      processStr = Array.isArray(pArr) ? pArr.map((it: any) => `${it.title || ''} | ${it.desc || ''}`).join('\n') : '';
    } catch { processStr = ''; }

    try {
      const ovArr = service.overviewFeaturesJson ? JSON.parse(service.overviewFeaturesJson) : [];
      if (Array.isArray(ovArr) && ovArr.length > 0) {
        overviewFeaturesStr = ovArr.map((it: any) => `${it.title || ''} | ${it.desc || ''}`).join('\n');
      } else {
        overviewFeaturesStr = 'Traceable Mill Specs | Full MTC 3.1 & heat batch documentation.\nKingdom Logistics | Rapid site delivery to all KSA regions.\nAramco Compliant | Fully certified for energy & plant sites.';
      }
    } catch {
      overviewFeaturesStr = 'Traceable Mill Specs | Full MTC 3.1 & heat batch documentation.\nKingdom Logistics | Rapid site delivery to all KSA regions.\nAramco Compliant | Fully certified for energy & plant sites.';
    }

    setForm({
      title: service.title,
      slug: service.slug,
      badge: service.badge || 'High Spec',
      iconName: service.iconName || 'Layers',
      imageUrl: service.imageUrl || '',
      heroBgUrl: service.heroBgUrl || '',
      shortDesc: service.shortDesc || '',
      fullDesc: service.fullDesc || '',
      tagsStr,
      featuresStr,
      itemsSuppliedStr,
      standardsStr,
      industriesStr,
      whySecoStr,
      processStr,
      overviewKicker: service.overviewKicker || 'DIVISION OVERVIEW & STRATEGIC VALUE',
      overviewTitle: service.overviewTitle || 'Uncompromising Quality in',
      overviewSubtitle: service.overviewSubtitle || 'Engineered to meet the most rigorous technical demands of Saudi Arabia’s industrial, energy, civil, and infrastructure mega-projects.',
      overviewDesc2: service.overviewDesc2 || 'Every material batch undergoes comprehensive quality control, heat traceability verification, and third-party inspection to ensure total alignment with Saudi Aramco, SABIC, SEC, and international ASTM/API standards.',
      overviewFeaturesStr,
      pdfUrl: service.pdfUrl || '/SECO_LINE_PROFILE.pdf',
      categoriesKicker: service.categoriesKicker || 'PRODUCT / SERVICE CATEGORIES',
      categoriesTitle: service.categoriesTitle || 'Main Supply Classifications',
      categoriesSubtitle: service.categoriesSubtitle || '',
      sortOrder: service.sortOrder,
      isPublished: service.isPublished,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);

    // Format tags array (support Title | Description | ImageURL)
    const tagsArr = form.tagsStr.split('\n').map(s => s.trim()).filter(Boolean).map(line => {
      const parts = line.split('|');
      if (parts.length >= 3) {
        return { name: parts[0].trim(), desc: parts[1].trim(), imageUrl: parts.slice(2).join('|').trim() };
      }
      if (parts.length >= 2) {
        return { name: parts[0].trim(), desc: parts.slice(1).join('|').trim() };
      }
      return line;
    });

    const featuresArr = form.featuresStr.split('\n').map(s => s.trim()).filter(Boolean);
    const standardsArr = form.standardsStr.split('\n').map(s => s.trim()).filter(Boolean);
    
    let itemsSuppliedArr = [];
    if (form.itemsSuppliedStr.trim()) {
      try {
        itemsSuppliedArr = JSON.parse(form.itemsSuppliedStr);
      } catch {
        itemsSuppliedArr = form.itemsSuppliedStr.split('\n').map(s => s.trim()).filter(Boolean).map(line => {
          const parts = line.split('|');
          if (parts.length >= 2) {
            return { name: parts[0].trim(), spec: parts.slice(1).join('|').trim() };
          }
          const dashParts = line.split('-');
          if (dashParts.length >= 2) {
            return { name: dashParts[0].trim(), spec: dashParts.slice(1).join('-').trim() };
          }
          return { name: line, spec: 'Certified Grade' };
        });
      }
    }

    let industriesArr = [];
    if (form.industriesStr.trim()) {
      try {
        industriesArr = JSON.parse(form.industriesStr);
      } catch {
        industriesArr = form.industriesStr.split('\n').map(s => s.trim()).filter(Boolean).map(line => {
          const parts = line.split('|');
          return { name: parts[0].trim(), desc: parts.slice(1).join('|').trim() };
        });
      }
    }

    let whySecoArr = [];
    if (form.whySecoStr.trim()) {
      try {
        whySecoArr = JSON.parse(form.whySecoStr);
      } catch {
        whySecoArr = form.whySecoStr.split('\n').map(s => s.trim()).filter(Boolean).map(line => {
          const parts = line.split('|');
          return { title: parts[0].trim(), desc: parts.slice(1).join('|').trim() };
        });
      }
    }

    let processArr = [];
    if (form.processStr.trim()) {
      try {
        processArr = JSON.parse(form.processStr);
      } catch {
        processArr = form.processStr.split('\n').map(s => s.trim()).filter(Boolean).map((line, idx) => {
          const parts = line.split('|');
          return { step: `0${idx + 1}`, title: parts[0].trim(), desc: parts.slice(1).join('|').trim() };
        });
      }
    }

    let overviewFeaturesArr = [];
    if (form.overviewFeaturesStr.trim()) {
      try {
        overviewFeaturesArr = JSON.parse(form.overviewFeaturesStr);
      } catch {
        overviewFeaturesArr = form.overviewFeaturesStr.split('\n').map(s => s.trim()).filter(Boolean).map(line => {
          const parts = line.split('|');
          return { title: parts[0].trim(), desc: parts.slice(1).join('|').trim() };
        });
      }
    }

    const payload = {
      title: form.title,
      slug: form.slug,
      badge: form.badge,
      iconName: form.iconName,
      imageUrl: form.imageUrl,
      heroBgUrl: form.heroBgUrl,
      shortDesc: form.shortDesc,
      fullDesc: form.fullDesc,
      tags: tagsArr,
      features: featuresArr,
      itemsSupplied: itemsSuppliedArr,
      standards: standardsArr,
      industriesJson: industriesArr,
      whySecoJson: whySecoArr,
      processJson: processArr,
      overviewKicker: form.overviewKicker,
      overviewTitle: form.overviewTitle,
      overviewSubtitle: form.overviewSubtitle,
      overviewDesc2: form.overviewDesc2,
      overviewFeaturesJson: overviewFeaturesArr,
      pdfUrl: form.pdfUrl,
      categoriesKicker: form.categoriesKicker,
      categoriesTitle: form.categoriesTitle,
      categoriesSubtitle: form.categoriesSubtitle,
      sortOrder: form.sortOrder,
      isPublished: form.isPublished,
    };

    try {
      const url = editingService 
        ? `/api/admin/trading-services/${editingService.id}`
        : '/api/admin/trading-services';
      const method = editingService ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save trading service');
      }

      setIsModalOpen(false);
      setSuccessMessage(editingService ? 'Division updated successfully!' : 'Division created successfully!');
      setTimeout(() => setSuccessMessage(null), 4000);
      fetchServices();
    } catch (err: any) {
      setFormError(err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/admin/trading-services/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to delete service');
      }

      setSuccessMessage(`"${title}" deleted successfully.`);
      setTimeout(() => setSuccessMessage(null), 4000);
      fetchServices();
    } catch (err: any) {
      alert(err.message || 'Delete failed');
    }
  };

  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);

    try {
      const res = await fetch('/api/admin/trading-services/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(heroForm),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save hero section settings');
      }

      setSuccessMessage('Hero Section updated successfully!');
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setFormError(err.message || 'Save failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleMediaSelect = (fileUrl: string) => {
    if (mediaTarget === 'cardImage') {
      setForm(prev => ({ ...prev, imageUrl: fileUrl }));
    } else if (mediaTarget === 'heroBg') {
      setForm(prev => ({ ...prev, heroBgUrl: fileUrl }));
    } else if (mediaTarget === 'tradingHeroBg') {
      setHeroForm(prev => ({ ...prev, bgImageUrl: fileUrl }));
    } else if (mediaTarget === 'tradingHeroOverlay') {
      setHeroForm(prev => ({ ...prev, overlayImageUrl: fileUrl }));
    } else if (mediaTarget.startsWith('categoryCard_')) {
      const cardIdx = parseInt(mediaTarget.replace('categoryCard_', ''), 10);
      if (!isNaN(cardIdx)) {
        const lines = form.tagsStr.split('\n').filter(Boolean);
        if (cardIdx >= 0 && cardIdx < lines.length) {
          const parts = lines[cardIdx].split('|').map(s => s.trim());
          const name = parts[0] || 'Category Item';
          const desc = parts[1] || '';
          lines[cardIdx] = `${name} | ${desc} | ${fileUrl}`;
          setForm(prev => ({ ...prev, tagsStr: lines.join('\n') }));
        } else {
          lines.push(`Category ${cardIdx + 1} | Sub-category material description | ${fileUrl}`);
          setForm(prev => ({ ...prev, tagsStr: lines.join('\n') }));
        }
      }
    }
    setMediaPickerOpen(false);
  };

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto font-sans">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#15B83E]">
            <PackageCheck className="w-4 h-4" />
            <span>INDUSTRIAL TRADING MANAGEMENT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading">
            Trading Services & Divisions
          </h1>
          <p className="text-xs text-slate-400">
            Create, edit, reorder, and manage industrial material supply divisions & hero banner.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 bg-[#15B83E] hover:bg-[#129c35] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Division</span>
          </button>
        </div>
      </div>

      {/* Alert Notifications */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#15B83E]" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage(null)} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Tabs Row */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('divisions')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            activeTab === 'divisions'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Boxes className="w-4 h-4 text-[#15B83E]" />
          <span>Trading Divisions ({services.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('hero')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            activeTab === 'hero'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#15B83E]" />
          <span>Hero Banner Settings</span>
        </button>
      </div>

      {/* TAB 1: Trading Divisions List & CRUD */}
      {activeTab === 'divisions' && (
        <div className="space-y-6">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-3 text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin text-[#15B83E]" />
              <p className="text-xs font-mono">Loading Trading Divisions...</p>
            </div>
          ) : services.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4">
              <PackageCheck className="w-12 h-12 text-slate-300 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-800">No Trading Divisions Found</h3>
                <p className="text-xs text-slate-500">Click "Add New Division" to create your first material supply category.</p>
              </div>
              <button
                onClick={openCreateModal}
                className="inline-flex items-center gap-2 bg-[#15B83E] text-white font-bold text-xs px-5 py-2.5 rounded-xl"
              >
                <Plus className="w-4 h-4" />
                <span>Create Division</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Card Header Image */}
                  <div className="relative h-44 bg-slate-900 overflow-hidden">
                    {srv.imageUrl ? (
                      <img
                        src={srv.imageUrl}
                        alt={srv.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600 bg-slate-800">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold bg-[#15B83E] text-white px-2.5 py-0.5 rounded-md shadow-sm">
                        {srv.badge || 'Division'}
                      </span>
                      {!srv.isPublished && (
                        <span className="text-[10px] font-mono font-bold bg-amber-500 text-white px-2 py-0.5 rounded-md">
                          DRAFT
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="text-base font-extrabold font-heading line-clamp-1">
                        {srv.title}
                      </h3>
                      <p className="text-[11px] font-mono text-slate-300">
                        /trading-services/{srv.slug}
                      </p>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-3 flex-grow">
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {srv.shortDesc || srv.fullDesc || 'No description provided.'}
                    </p>
                  </div>

                  {/* Card Actions */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-400 text-[11px]">
                      Order: {srv.sortOrder}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(srv)}
                        className="inline-flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg font-semibold text-xs transition"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDelete(srv.id, srv.title)}
                        className="inline-flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg font-semibold text-xs border border-red-200 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Trading Services Hero Banner Settings */}
      {activeTab === 'hero' && (
        <form onSubmit={handleHeroSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1 border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900 font-heading">
              Trading Services Hero Banner Settings
            </h2>
            <p className="text-xs text-slate-500">
              Customize the title, subtitle, statistics, and background image rendered at the top of `/trading-services`.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-slate-700 font-mono">
                Top Kicker Badge
              </label>
              <input
                type="text"
                value={heroForm.badgeText}
                onChange={(e) => setHeroForm(prev => ({ ...prev, badgeText: e.target.value }))}
                className="w-full px-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:border-[#15B83E] focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-slate-700 font-mono">
                Hero Title Line 1
              </label>
              <input
                type="text"
                value={heroForm.titleLine1}
                onChange={(e) => setHeroForm(prev => ({ ...prev, titleLine1: e.target.value }))}
                className="w-full px-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:border-[#15B83E] focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-slate-700 font-mono">
                Hero Title Green Highlight
              </label>
              <input
                type="text"
                value={heroForm.titleGreen}
                onChange={(e) => setHeroForm(prev => ({ ...prev, titleGreen: e.target.value }))}
                className="w-full px-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:border-[#15B83E] focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-slate-700 font-mono">
                Background Image URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={heroForm.bgImageUrl}
                  onChange={(e) => setHeroForm(prev => ({ ...prev, bgImageUrl: e.target.value }))}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:border-[#15B83E] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => { setMediaTarget('tradingHeroBg'); setMediaPickerOpen(true); }}
                  className="px-3 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
                >
                  <Upload className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase text-slate-700 font-mono">
              Hero Subtitle / Paragraph
            </label>
            <textarea
              rows={3}
              value={heroForm.subtitle}
              onChange={(e) => setHeroForm(prev => ({ ...prev, subtitle: e.target.value }))}
              className="w-full px-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:border-[#15B83E] focus:outline-none"
            />
          </div>

          {/* 3 Metric Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-[11px] font-bold text-slate-700">Stat 1 (Value & Label)</label>
              <input
                type="text"
                placeholder="Value (e.g. 6+)"
                value={heroForm.stat1Value}
                onChange={(e) => setHeroForm(prev => ({ ...prev, stat1Value: e.target.value }))}
                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg mb-2"
              />
              <input
                type="text"
                placeholder="Label"
                value={heroForm.stat1Label}
                onChange={(e) => setHeroForm(prev => ({ ...prev, stat1Label: e.target.value }))}
                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg"
              />
            </div>

            <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-[11px] font-bold text-slate-700">Stat 2 (Value & Label)</label>
              <input
                type="text"
                placeholder="Value (e.g. 5,000+)"
                value={heroForm.stat2Value}
                onChange={(e) => setHeroForm(prev => ({ ...prev, stat2Value: e.target.value }))}
                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg mb-2"
              />
              <input
                type="text"
                placeholder="Label"
                value={heroForm.stat2Label}
                onChange={(e) => setHeroForm(prev => ({ ...prev, stat2Label: e.target.value }))}
                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg"
              />
            </div>

            <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-[11px] font-bold text-slate-700">Stat 3 (Value & Label)</label>
              <input
                type="text"
                placeholder="Value (e.g. 24/7)"
                value={heroForm.stat3Value}
                onChange={(e) => setHeroForm(prev => ({ ...prev, stat3Value: e.target.value }))}
                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg mb-2"
              />
              <input
                type="text"
                placeholder="Label"
                value={heroForm.stat3Label}
                onChange={(e) => setHeroForm(prev => ({ ...prev, stat3Label: e.target.value }))}
                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-[#15B83E] hover:bg-[#129c35] text-white font-bold text-xs sm:text-sm px-7 py-3 rounded-xl shadow-lg transition-all"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Hero Banner Settings</span>
            </button>
          </div>
        </form>
      )}

      {/* CREATE / EDIT DIVISION MODAL (Light Theme Full-Width) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-[95vw] lg:max-w-[96vw] my-4 overflow-hidden flex flex-col max-h-[92vh] text-slate-900 font-sans">
            
            {/* Emerald Top Accent Bar */}
            <div className="h-1.5 w-full bg-[#15B83E]" />

            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#15B83E] shadow-sm">
                  <Boxes className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold font-heading text-slate-900">
                      {editingService ? `Edit Division: ${editingService.title}` : 'Add New Trading Division'}
                    </h3>
                    {editingService && (
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                        editingService.isPublished ? 'bg-emerald-50 text-[#15B83E] border border-emerald-200' : 'bg-amber-50 text-amber-600 border border-amber-200'
                      }`}>
                        {editingService.isPublished ? 'PUBLISHED' : 'DRAFT'}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">
                    Configure division settings, imagery, strategic overview narrative, products, and specs.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 4 Internal Modal Navigation Tabs */}
            <div className="bg-slate-100/80 border-b border-slate-200 px-6 py-2.5 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setModalTab('basic')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  modalTab === 'basic'
                    ? 'bg-[#15B83E] text-white shadow-md'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 font-semibold'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>1. Basic & Media</span>
              </button>

              <button
                type="button"
                onClick={() => setModalTab('overview')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  modalTab === 'overview'
                    ? 'bg-[#15B83E] text-white shadow-md'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 font-semibold'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>2. Division Overview</span>
              </button>

              <button
                type="button"
                onClick={() => setModalTab('categories')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  modalTab === 'categories'
                    ? 'bg-[#15B83E] text-white shadow-md'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 font-semibold'
                }`}
              >
                <Boxes className="w-3.5 h-3.5" />
                <span>3. Categories & Stock Table</span>
              </button>

              <button
                type="button"
                onClick={() => setModalTab('custom')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  modalTab === 'custom'
                    ? 'bg-[#15B83E] text-white shadow-md'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 font-semibold'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>4. Standards & Custom Sections</span>
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleServiceSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-white">
              
              {formError && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                  <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* TAB 1: Basic & Media */}
              {modalTab === 'basic' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider">
                        Division Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.title}
                        onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g. Industrial Valves & Piping"
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm rounded-xl focus:border-[#15B83E] focus:outline-none focus:ring-1 focus:ring-[#15B83E] font-medium"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider">
                        URL Slug
                      </label>
                      <input
                        type="text"
                        value={form.slug}
                        onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
                        placeholder="industrial-valves-piping"
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 text-emerald-600 font-mono text-xs sm:text-sm rounded-xl focus:border-[#15B83E] focus:outline-none focus:ring-1 focus:ring-[#15B83E]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider">
                        Badge Label
                      </label>
                      <input
                        type="text"
                        value={form.badge}
                        onChange={(e) => setForm(prev => ({ ...prev, badge: e.target.value }))}
                        placeholder="e.g. High Pressure Spec"
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm rounded-xl focus:border-[#15B83E] focus:outline-none focus:ring-1 focus:ring-[#15B83E]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider">
                        Lucide Icon Name
                      </label>
                      <input
                        type="text"
                        value={form.iconName}
                        onChange={(e) => setForm(prev => ({ ...prev, iconName: e.target.value }))}
                        placeholder="Layers / ShieldCheck / Truck"
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm rounded-xl focus:border-[#15B83E] focus:outline-none focus:ring-1 focus:ring-[#15B83E] font-mono"
                      />
                    </div>
                  </div>

                  {/* Image Pickers */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider">
                        Card Background Image URL
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={form.imageUrl}
                          onChange={(e) => setForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                          placeholder="https://..."
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 text-slate-800 text-xs rounded-xl focus:border-[#15B83E] focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => { setMediaTarget('cardImage'); setMediaPickerOpen(true); }}
                          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center cursor-pointer transition"
                        >
                          <Upload className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider">
                        Hero Section Background Image URL
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={form.heroBgUrl}
                          onChange={(e) => setForm(prev => ({ ...prev, heroBgUrl: e.target.value }))}
                          placeholder="https://..."
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 text-slate-800 text-xs rounded-xl focus:border-[#15B83E] focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => { setMediaTarget('heroBg'); setMediaPickerOpen(true); }}
                          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center cursor-pointer transition"
                        >
                          <Upload className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Summaries */}
                  <div className="space-y-1.5 pt-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider">
                      Short Card Summary (Used in cards & listings)
                    </label>
                    <textarea
                      rows={2}
                      value={form.shortDesc}
                      onChange={(e) => setForm(prev => ({ ...prev, shortDesc: e.target.value }))}
                      placeholder="Brief 1-2 sentence overview..."
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 text-slate-800 text-xs rounded-xl focus:border-[#15B83E] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider">
                      Full Strategic Description (Main paragraph on detail page)
                    </label>
                    <textarea
                      rows={3}
                      value={form.fullDesc}
                      onChange={(e) => setForm(prev => ({ ...prev, fullDesc: e.target.value }))}
                      placeholder="Detailed strategic description of this division..."
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 text-slate-800 text-xs rounded-xl focus:border-[#15B83E] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: Division Overview */}
              {modalTab === 'overview' && (
                <div className="space-y-6">
                  <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-[#129c35]">Division Overview & Strategic Value Settings</span>
                    <span className="text-[11px] font-mono text-slate-500">Controls the first overview card section on /trading-services/[slug]</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider">
                        Overview Kicker Badge Text
                      </label>
                      <input
                        type="text"
                        value={form.overviewKicker}
                        onChange={(e) => setForm(prev => ({ ...prev, overviewKicker: e.target.value }))}
                        placeholder="DIVISION OVERVIEW & STRATEGIC VALUE"
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 text-slate-900 text-xs rounded-xl focus:border-[#15B83E] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider">
                        Overview Title Prefix
                      </label>
                      <input
                        type="text"
                        value={form.overviewTitle}
                        onChange={(e) => setForm(prev => ({ ...prev, overviewTitle: e.target.value }))}
                        placeholder="Uncompromising Quality in"
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 text-slate-900 text-xs rounded-xl focus:border-[#15B83E] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider">
                      Overview Subtitle Paragraph
                    </label>
                    <textarea
                      rows={2}
                      value={form.overviewSubtitle}
                      onChange={(e) => setForm(prev => ({ ...prev, overviewSubtitle: e.target.value }))}
                      placeholder="Engineered to meet the most rigorous technical demands..."
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 text-slate-800 text-xs rounded-xl focus:border-[#15B83E] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider">
                      Overview Second Paragraph (Quality & Standards Assurance)
                    </label>
                    <textarea
                      rows={2}
                      value={form.overviewDesc2}
                      onChange={(e) => setForm(prev => ({ ...prev, overviewDesc2: e.target.value }))}
                      placeholder="Every material batch undergoes comprehensive quality control..."
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 text-slate-800 text-xs rounded-xl focus:border-[#15B83E] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider">
                          3 Overview Mini Cards
                        </label>
                        <span className="text-[10px] font-mono text-[#15B83E] font-bold">Format: Title | Description</span>
                      </div>
                      <textarea
                        rows={4}
                        value={form.overviewFeaturesStr}
                        onChange={(e) => setForm(prev => ({ ...prev, overviewFeaturesStr: e.target.value }))}
                        placeholder="Traceable Mill Specs | Full MTC 3.1 & heat batch documentation.&#10;Kingdom Logistics | Rapid site delivery to all KSA regions.&#10;Aramco Compliant | Fully certified for energy & plant sites."
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 text-slate-800 text-xs rounded-xl focus:border-[#15B83E] focus:outline-none font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider">
                        Download Profile PDF Link URL
                      </label>
                      <input
                        type="text"
                        value={form.pdfUrl}
                        onChange={(e) => setForm(prev => ({ ...prev, pdfUrl: e.target.value }))}
                        placeholder="/SECO_LINE_PROFILE.pdf"
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 text-slate-900 text-xs rounded-xl focus:border-[#15B83E] focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Categories & Stock Table */}
              {modalTab === 'categories' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider">
                        Categories Section Kicker
                      </label>
                      <input
                        type="text"
                        value={form.categoriesKicker}
                        onChange={(e) => setForm(prev => ({ ...prev, categoriesKicker: e.target.value }))}
                        placeholder="PRODUCT / SERVICE CATEGORIES"
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 text-slate-900 text-xs rounded-xl focus:border-[#15B83E] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider">
                        Categories Section Title
                      </label>
                      <input
                        type="text"
                        value={form.categoriesTitle}
                        onChange={(e) => setForm(prev => ({ ...prev, categoriesTitle: e.target.value }))}
                        placeholder="Main Supply Classifications"
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 text-slate-900 text-xs rounded-xl focus:border-[#15B83E] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Interactive Category Cards Builder */}
                  <div className="space-y-4 pt-2 border-t border-slate-200/80">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 uppercase font-mono tracking-wider">
                          Sub-Category Classification Cards & Custom Images
                        </label>
                        <p className="text-[11px] text-slate-500">
                          Upload or choose custom card background images for each category card shown on the live detail page.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const lines = form.tagsStr.split('\n').filter(Boolean);
                          lines.push(`New Category | Sub-category material description | `);
                          setForm(prev => ({ ...prev, tagsStr: lines.join('\n') }));
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#15B83E]/10 hover:bg-[#15B83E]/20 text-[#15B83E] text-xs font-bold rounded-lg border border-[#15B83E]/30 transition"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Category Card</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {form.tagsStr.split('\n').filter(Boolean).map((line, idx) => {
                        const parts = line.split('|').map(s => s.trim());
                        const cardTitle = parts[0] || '';
                        const cardDesc = parts[1] || '';
                        const cardImg = parts.slice(2).join('|') || '';

                        const updateLine = (newTitle: string, newDesc: string, newImg: string) => {
                          const lines = form.tagsStr.split('\n').filter(Boolean);
                          lines[idx] = `${newTitle} | ${newDesc}${newImg ? ` | ${newImg}` : ''}`;
                          setForm(prev => ({ ...prev, tagsStr: lines.join('\n') }));
                        };

                        const removeLine = () => {
                          const lines = form.tagsStr.split('\n').filter(Boolean);
                          lines.splice(idx, 1);
                          setForm(prev => ({ ...prev, tagsStr: lines.join('\n') }));
                        };

                        return (
                          <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3 relative group">
                            <div className="flex items-center justify-between border-b border-slate-200/70 pb-2">
                              <span className="text-[10px] font-mono font-bold text-[#15B83E] bg-[#15B83E]/10 px-2 py-0.5 rounded border border-[#15B83E]/20">
                                CATEGORY 0{idx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={removeLine}
                                className="text-slate-400 hover:text-red-500 p-1 transition"
                                title="Remove Category Card"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] font-bold text-slate-600 mb-1">Card Title</label>
                                <input
                                  type="text"
                                  value={cardTitle}
                                  onChange={(e) => updateLine(e.target.value, cardDesc, cardImg)}
                                  placeholder="e.g. Carbon Steel Pipes"
                                  className="w-full px-3 py-2 bg-white border border-slate-200 text-xs rounded-lg text-slate-800 focus:border-[#15B83E] focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-bold text-slate-600 mb-1">Card Description</label>
                                <input
                                  type="text"
                                  value={cardDesc}
                                  onChange={(e) => updateLine(cardTitle, e.target.value, cardImg)}
                                  placeholder="e.g. Certified high-spec material supply..."
                                  className="w-full px-3 py-2 bg-white border border-slate-200 text-xs rounded-lg text-slate-800 focus:border-[#15B83E] focus:outline-none"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-slate-600 mb-1">Card Background Image</label>
                              <div className="flex items-center gap-2">
                                {cardImg ? (
                                  <img src={cardImg} alt="" className="w-10 h-10 object-cover rounded-lg border border-slate-200 shrink-0" />
                                ) : (
                                  <div className="w-10 h-10 rounded-lg bg-slate-200/80 flex items-center justify-center text-slate-400 shrink-0">
                                    <ImageIcon className="w-4 h-4" />
                                  </div>
                                )}
                                <input
                                  type="text"
                                  value={cardImg}
                                  onChange={(e) => updateLine(cardTitle, cardDesc, e.target.value)}
                                  placeholder="Image URL or choose from media..."
                                  className="flex-1 px-3 py-2 bg-white border border-slate-200 text-xs rounded-lg text-slate-800 focus:border-[#15B83E] focus:outline-none font-mono"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setMediaTarget(`categoryCard_${idx}`);
                                    setMediaPickerOpen(true);
                                  }}
                                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition shrink-0"
                                >
                                  <Upload className="w-3.5 h-3.5" />
                                  <span>Media</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="space-y-1 pt-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-[11px] font-bold text-slate-500 uppercase font-mono">
                          Raw Bulk Text Editor (Title | Description | ImageURL)
                        </label>
                      </div>
                      <textarea
                        rows={3}
                        value={form.tagsStr}
                        onChange={(e) => setForm(prev => ({ ...prev, tagsStr: e.target.value }))}
                        placeholder="Carbon Steel Pipes | Certified high-spec material supply... | /uploads/image.jpg"
                        className="w-full px-3 py-2 bg-white border border-slate-200 text-slate-800 text-xs rounded-xl focus:border-[#15B83E] focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider">
                          Items & Stock Range Table
                        </label>
                        <span className="text-[10px] font-mono text-[#15B83E] font-bold">Format: Item Name | Specification</span>
                      </div>
                      <textarea
                        rows={5}
                        value={form.itemsSuppliedStr}
                        onChange={(e) => setForm(prev => ({ ...prev, itemsSuppliedStr: e.target.value }))}
                        placeholder="Gate & Globe Valves | Class 150 - 2500&#10;Seamless & Welded Pipes | API 5L Grade B, ASTM A106&#10;Flanges & Fittings | ANSI B16.5, Forged Steel"
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 text-slate-800 text-xs rounded-xl focus:border-[#15B83E] focus:outline-none font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider">
                        Technical Specifications & Features (One per line)
                      </label>
                      <textarea
                        rows={5}
                        value={form.featuresStr}
                        onChange={(e) => setForm(prev => ({ ...prev, featuresStr: e.target.value }))}
                        placeholder="API 6D & API 600 Certified&#10;High-Pressure Carbon & Stainless Steel&#10;100% Hydrotested"
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 text-slate-800 text-xs rounded-xl focus:border-[#15B83E] focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: Standards & Custom Sections */}
              {modalTab === 'custom' && (
                <div className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider">
                      Compliance Standards & Certifications (One per line)
                    </label>
                    <textarea
                      rows={3}
                      value={form.standardsStr}
                      onChange={(e) => setForm(prev => ({ ...prev, standardsStr: e.target.value }))}
                      placeholder="Saudi Aramco Approved 01-SAMSS&#10;SABIC Spec Compliant&#10;ASTM / ASME A53 / A106 Grade B&#10;API 5L / API 6D Certified"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 text-slate-800 text-xs rounded-xl focus:border-[#15B83E] focus:outline-none font-mono"
                    />
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div className="text-xs font-bold text-[#129c35]">Optional Section Overrides for Division Detail Page</div>
                    <p className="text-xs text-slate-500">Leave blank to use default global values, or customize specifically for this trading division.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider">
                          Industries Supported
                        </label>
                        <span className="text-[10px] font-mono text-[#15B83E] font-bold">Name | Desc</span>
                      </div>
                      <textarea
                        rows={4}
                        value={form.industriesStr}
                        onChange={(e) => setForm(prev => ({ ...prev, industriesStr: e.target.value }))}
                        placeholder="Oil & Gas | Refineries & Pipelines&#10;Petrochemical | Chemical plants"
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 text-slate-800 text-xs rounded-xl focus:border-[#15B83E] focus:outline-none font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider">
                          Why SECO Pillars
                        </label>
                        <span className="text-[10px] font-mono text-[#15B83E] font-bold">Title | Desc</span>
                      </div>
                      <textarea
                        rows={4}
                        value={form.whySecoStr}
                        onChange={(e) => setForm(prev => ({ ...prev, whySecoStr: e.target.value }))}
                        placeholder="Uncompromising Quality | 100% MTC 3.1&#10;Immediate Availability | Local warehouse"
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 text-slate-800 text-xs rounded-xl focus:border-[#15B83E] focus:outline-none font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider">
                          4-Step Process
                        </label>
                        <span className="text-[10px] font-mono text-[#15B83E] font-bold">Title | Desc</span>
                      </div>
                      <textarea
                        rows={4}
                        value={form.processStr}
                        onChange={(e) => setForm(prev => ({ ...prev, processStr: e.target.value }))}
                        placeholder="Requirement Analysis | BOQ check&#10;Mill Sourcing | Sourced from mills"
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 text-slate-800 text-xs rounded-xl focus:border-[#15B83E] focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Sort Order & Publishing */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs">
                <div className="flex items-center gap-3">
                  <label className="text-xs font-bold text-slate-700 uppercase font-mono">
                    Sort Order:
                  </label>
                  <input
                    type="number"
                    value={form.sortOrder}
                    onChange={(e) => setForm(prev => ({ ...prev, sortOrder: parseInt(e.target.value, 10) || 0 }))}
                    className="w-20 px-3 py-1.5 bg-white border border-slate-200 text-slate-900 rounded-lg text-center focus:border-[#15B83E] focus:outline-none font-mono font-bold"
                  />
                </div>

                <label className="flex items-center gap-2.5 cursor-pointer bg-slate-50 hover:bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 transition">
                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={(e) => setForm(prev => ({ ...prev, isPublished: e.target.checked }))}
                    className="w-4 h-4 text-[#15B83E] rounded border-slate-300 focus:ring-[#15B83E] accent-[#15B83E]"
                  />
                  <span className="text-xs font-bold text-slate-800">Published on Live Site</span>
                </label>
              </div>

              {/* Form Actions */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 bg-[#15B83E] hover:bg-[#129c35] text-white font-bold text-xs px-7 py-2.5 rounded-xl shadow-md transition cursor-pointer hover:scale-[1.01] active:scale-95"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>{editingService ? 'Update Division' : 'Save Division'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* MEDIA PICKER MODAL */}
      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelect={handleMediaSelect}
      />

    </div>
  );
}
