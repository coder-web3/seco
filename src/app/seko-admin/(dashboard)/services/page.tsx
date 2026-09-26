'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Layers, 
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
  Users, 
  Cog, 
  HardHat, 
  FileText,
  Layout,
  CheckCircle,
  Upload,
  Globe,
  ChevronDown
} from 'lucide-react';
import MediaPickerModal from '@/components/admin/MediaPickerModal';

interface Service {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  icon?: string | null;
  imageUrl?: string | null;
  sortOrder: number;
  isPublished: boolean;
}

export default function ServicesAdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'cards' | 'hero' | 'detail'>('cards');
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('global');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<'service' | 'heroBg' | 'heroOverlay'>('service');
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Service Card Form State
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    icon: 'Layers',
    imageUrl: '',
    sortOrder: 0,
    isPublished: true,
  });

  // Services Hero Form State
  const [heroForm, setHeroForm] = useState({
    kicker: 'OUR SERVICES',
    titleLine1: 'Integrated Services for a',
    titleLine2: 'Stronger',
    titleGreen: 'Tomorrow',
    subtitle: 'At SECO LINE, we deliver end-to-end industrial and contracting solutions with a focus on safety, quality and long-term value.',
    badge1Text: 'Reliable Execution',
    badge2Text: 'Experienced Team',
    badge3Text: 'Sustainable Results',
    stat1Value: '10+',
    stat1Label: 'Service Capabilities',
    stat2Value: '25+',
    stat2Label: 'Years of Industry Support',
    stat3Value: '100+',
    stat3Label: 'Projects Delivered',
    bgImageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80',
    overlayImageUrl: '',
  });

  // Service Detail Page Sections State
  const [detailForm, setDetailForm] = useState({
    heroKicker: 'OUR SERVICE ☰',
    heroSubtitle: 'Strong Foundations. A Sustainable Tomorrow.',
    heroStat1Value: '20+',
    heroStat1Label: 'Years of Experience',
    heroStat2Value: '200+',
    heroStat2Label: 'Projects Delivered',
    heroStat3Value: '100%',
    heroStat3Label: 'Commitment to Safety',
    heroTagline: 'BUILDING A STRONGER TOMORROW',

    overviewKicker: 'OUR SERVICES',
    overviewTitle: 'Building What',
    overviewTitleGreen: 'Matters Most',
    overviewDescription: '',
    feature1Title: 'Safety First',
    feature1Desc: 'A secure work environment for a better tomorrow.',
    feature2Title: 'Experienced Teams',
    feature2Desc: 'Skilled professionals delivering proven results.',
    feature3Title: 'Quality & Precision',
    feature3Desc: 'Built to last with attention to every detail.',
    pdfDownloadUrl: '/SECO_LINE_PROFILE.pdf',

    capabilitiesKicker: 'OUR OTHER SERVICES',
    capabilitiesTitle1: 'Explore Our',
    capabilitiesTitle2Green: 'Other Services',
    capabilitiesSubtitle: 'Explore our specialized engineering, contracting, and construction capabilities tailored to your project scope across Saudi Arabia.',

    processKicker: 'EXECUTION METHODOLOGY',
    processTitle1: 'Our Structured',
    processTitle2Green: '4-Step Execution Process',
    processSubtitle: 'From initial consultation to final testing and commissioning, our structured workflow ensures flawless execution across every project milestone.',

    ctaKicker: 'START A CONVERSATION',
    ctaTitle1: 'Ready to Execute',
    ctaTitle2Green: 'Your Next Project?',
    ctaDescription: 'Connect with SECO LINE\'s engineering team today to review scope, specifications, equipment allocation, and scheduling across Saudi Arabia.',
    ctaButtonText: 'Get a Free Proposal',
    ctaPhone: '+966 12 345 6789',
    ctaBadge1: 'Rapid 24h Response',
    ctaBadge2: 'ISO & Aramco Standards',
    ctaBadge3: 'Nationwide Saudi Execution',
  });

  const [savingHero, setSavingHero] = useState(false);
  const [savingDetail, setSavingDetail] = useState(false);

  const [capabilitiesList, setCapabilitiesList] = useState<any[]>([
    {
      id: 'earthworks',
      title: 'Earthworks & Site Preparation',
      description: 'Excavation, grading, and ground improvement for solid foundations.',
      detailedContent: 'SECO LINE provides comprehensive site preparation, bulk earthmoving, and foundation grading utilizing heavy machinery and laser-guided grading technology.',
      highlights: 'Bulk Excavation & Precision Grading\nSoil Stabilization & Ground Improvement\nLaser-Guided Trenching & Backfilling\nGeotechnical Compliance & Testing',
      imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'structural',
      title: 'Structural Construction',
      description: 'Reinforced concrete and steel structures for industrial and commercial projects.',
      detailedContent: 'We specialize in the erection and pouring of high-tolerance reinforced concrete and structural steel frameworks.',
      highlights: 'Reinforced Concrete Foundations & Columns\nHeavy Structural Steel Erection\nPre-cast & Post-tensioned Concrete Systems\nSeismic Design & Structural Quality Audits',
      imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure Development',
      description: 'Roads, utilities, drainage, and supporting infrastructure works.',
      detailedContent: 'Delivering large-scale municipal and industrial infrastructure, including asphalt paving, storm water drainage networks, underground utility installation, and street lighting.',
      highlights: 'Asphalt Paving & Sub-grade Construction\nStorm Water & Sewage Utility Networks\nUnderground Electrical & Piping Trenching\nRoad Marking & Traffic Safety Barriers',
      imageUrl: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'industrial',
      title: 'Industrial Construction',
      description: 'Production plants, warehouses, and heavy-duty facilities.',
      detailedContent: 'Turnkey construction for manufacturing plants, logistics warehouses, and processing facilities.',
      highlights: 'Turnkey Warehouse & Factory Construction\nHeavy Industrial Floor Slabs (High-Tolerance)\nOverhead Crane Runway Infrastructure\nCleanrooms & Industrial Ventilation Setup',
      imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'special',
      title: 'Special Structures',
      description: 'Tanks, foundations, substations, and other complex builds.',
      detailedContent: 'Specialized expertise in custom civil engineering structures, including electrical substations, industrial storage tank foundations, heavy machinery basements, retaining walls.',
      highlights: 'High-Voltage Electrical Substation Pads\nStorage Tank Basements & Containments\nHeavy Equipment Machinery Foundations\nReinforced Retaining Wall Systems',
      imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'renovation',
      title: 'Renovation & Expansion',
      description: 'Upgrades and extensions to support growing operations.',
      detailedContent: 'Revitalizing and expanding existing commercial and industrial assets. We manage structural retrofitting, footprint extensions, facility reconfigurations.',
      highlights: 'Structural Retrofitting & Strengthening\nFacility Footprint Extensions\nFacade Renewal & Architectural Cladding\nInterior Space Reconfiguration & Fit-Out',
      imageUrl: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=1200&q=80',
    },
  ]);

  const [processList, setProcessList] = useState<any[]>([
    {
      num: '01',
      title: 'Consultation & Technical Scope',
      description: 'In-depth assessment of engineering specifications, site conditions, client requirements, and safety compliance.',
    },
    {
      num: '02',
      title: 'Resource Planning & Mobilization',
      description: 'Allocation of certified equipment, skilled manpower, materials, and comprehensive HSE risk mitigation setup.',
    },
    {
      num: '03',
      title: 'Safe Execution & Quality Audits',
      description: 'Field execution conducted under strict Aramco & ISO safety standards with continuous QA/QC inspection milestones.',
    },
    {
      num: '04',
      title: 'Testing, Commissioning & Handover',
      description: 'Final load testing, quality certification, documentation sign-off, and seamless project commissioning.',
    },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [servicesRes, heroRes, detailRes] = await Promise.all([
        fetch('/api/admin/services'),
        fetch('/api/admin/services-hero'),
        fetch('/api/admin/service-detail'),
      ]);

      const servicesData = await servicesRes.json();
      const heroData = await heroRes.json();
      const detailData = await detailRes.json();

      if (servicesData.success && servicesData.services) {
        setServices(servicesData.services);
      }

      if (heroData.success && heroData.hero) {
        const h = heroData.hero;
        setHeroForm({
          kicker: h.kicker || 'OUR SERVICES',
          titleLine1: h.titleLine1 || 'Integrated Services for a',
          titleLine2: h.titleLine2 || 'Stronger',
          titleGreen: h.titleGreen || 'Tomorrow',
          subtitle: h.subtitle || '',
          badge1Text: h.badge1Text || 'Reliable Execution',
          badge2Text: h.badge2Text || 'Experienced Team',
          badge3Text: h.badge3Text || 'Sustainable Results',
          stat1Value: h.stat1Value || '10+',
          stat1Label: h.stat1Label || 'Service Capabilities',
          stat2Value: h.stat2Value || '25+',
          stat2Label: h.stat2Label || 'Years of Industry Support',
          stat3Value: h.stat3Value || '100+',
          stat3Label: h.stat3Label || 'Projects Delivered',
          bgImageUrl: h.bgImageUrl || '',
          overlayImageUrl: h.overlayImageUrl || '',
        });
      }

      if (detailData.success && detailData.serviceDetail) {
        const d = detailData.serviceDetail;
        setDetailForm({
          heroKicker: d.heroKicker || '',
          heroSubtitle: d.heroSubtitle || '',
          heroStat1Value: d.heroStat1Value || '',
          heroStat1Label: d.heroStat1Label || '',
          heroStat2Value: d.heroStat2Value || '',
          heroStat2Label: d.heroStat2Label || '',
          heroStat3Value: d.heroStat3Value || '',
          heroStat3Label: d.heroStat3Label || '',
          heroTagline: d.heroTagline || '',

          overviewKicker: d.overviewKicker || '',
          overviewTitle: d.overviewTitle || '',
          overviewTitleGreen: d.overviewTitleGreen || '',
          overviewDescription: d.overviewDescription || '',
          feature1Title: d.feature1Title || '',
          feature1Desc: d.feature1Desc || '',
          feature2Title: d.feature2Title || '',
          feature2Desc: d.feature2Desc || '',
          feature3Title: d.feature3Title || '',
          feature3Desc: d.feature3Desc || '',
          pdfDownloadUrl: d.pdfDownloadUrl || '',

          capabilitiesKicker: d.capabilitiesKicker || '',
          capabilitiesTitle1: d.capabilitiesTitle1 || '',
          capabilitiesTitle2Green: d.capabilitiesTitle2Green || '',
          capabilitiesSubtitle: d.capabilitiesSubtitle || '',

          processKicker: d.processKicker || '',
          processTitle1: d.processTitle1 || '',
          processTitle2Green: d.processTitle2Green || '',
          processSubtitle: d.processSubtitle || '',

          ctaKicker: d.ctaKicker || '',
          ctaTitle1: d.ctaTitle1 || '',
          ctaTitle2Green: d.ctaTitle2Green || '',
          ctaDescription: d.ctaDescription || '',
          ctaButtonText: d.ctaButtonText || '',
          ctaPhone: d.ctaPhone || '',
          ctaBadge1: d.ctaBadge1 || '',
          ctaBadge2: d.ctaBadge2 || '',
          ctaBadge3: d.ctaBadge3 || '',
        });

        if (d.capabilitiesJson) {
          try {
            const parsed = JSON.parse(d.capabilitiesJson);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setCapabilitiesList(parsed.map((item: any, idx: number) => ({
                id: item.id || `cap-${idx}`,
                title: item.title || '',
                description: item.description || '',
                detailedContent: item.detailedContent || '',
                highlights: Array.isArray(item.highlights) ? item.highlights.join('\n') : (item.highlights || ''),
                imageUrl: item.imageUrl || '',
              })));
            }
          } catch (err) {}
        }

        if (d.processStepsJson) {
          try {
            const parsed = JSON.parse(d.processStepsJson);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setProcessList(parsed);
            }
          } catch (err) {}
        }
      }
    } catch (err) {
      console.error('Failed to load services data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingService(null);
    setFormError(null);
    setForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      icon: 'Layers',
      imageUrl: '',
      sortOrder: services.length + 1,
      isPublished: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (service: Service) => {
    setEditingService(service);
    setFormError(null);
    setForm({
      title: service.title,
      slug: service.slug,
      excerpt: service.excerpt || '',
      content: service.content || '',
      icon: service.icon || 'Layers',
      imageUrl: service.imageUrl || '',
      sortOrder: service.sortOrder,
      isPublished: service.isPublished,
    });
    setIsModalOpen(true);
  };

  const handleSubmitService = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);

    try {
      if (editingService) {
        const res = await fetch(`/api/admin/services/${editingService.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (data.success && data.service) {
          setServices((prev) => prev.map((s) => (s.id === editingService.id ? data.service : s)));
          setIsModalOpen(false);
          router.refresh();
          fetchData();
        } else {
          throw new Error(data.error || 'Failed to update service.');
        }
      } else {
        const res = await fetch('/api/admin/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (data.success && data.service) {
          setServices((prev) => [...prev, data.service]);
          setIsModalOpen(false);
          router.refresh();
          fetchData();
        } else {
          throw new Error(data.error || 'Failed to create service.');
        }
      }
    } catch (err: any) {
      setFormError(err.message || 'An error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteService = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== id));
        router.refresh();
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingHero(true);
    setSuccessMessage(null);
    try {
      const res = await fetch('/api/admin/services-hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(heroForm),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage('Contracting Services Hero section saved successfully!');
      } else {
        throw new Error(data.error || 'Failed to save hero settings.');
      }
    } catch (err: any) {
      alert(err.message || 'Error saving hero settings.');
    } finally {
      setSavingHero(false);
    }
  };

  const handleAddCapabilityCard = () => {
    setCapabilitiesList((prev) => [
      ...prev,
      {
        id: `cap-${Date.now()}`,
        title: 'New Service Capability',
        description: 'Short summary description of service.',
        detailedContent: 'Detailed overview of technical capability, equipment used, and standards.',
        highlights: 'Specification 1\nSpecification 2\nSpecification 3',
        imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
      },
    ]);
  };

  const handleRemoveCapabilityCard = (index: number) => {
    setCapabilitiesList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCapabilityImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.success && data.media?.fileUrl) {
        const updated = [...capabilitiesList];
        updated[index].imageUrl = data.media.fileUrl;
        setCapabilitiesList(updated);
      } else {
        alert(data.error || 'Failed to upload image.');
      }
    } catch (err: any) {
      alert(err.message || 'Error uploading image file.');
    }
  };

  const handleAddProcessStep = () => {
    const nextNum = processList.length < 9 ? `0${processList.length + 1}` : `${processList.length + 1}`;
    setProcessList((prev) => [
      ...prev,
      {
        num: nextNum,
        title: 'New Execution Phase',
        description: 'Phase overview and milestone description.',
      },
    ]);
  };

  const handleRemoveProcessStep = (index: number) => {
    setProcessList((prev) => prev.filter((_, i) => i !== index));
  };

  const loadServiceDetailData = async (serviceIdStr: string) => {
    try {
      const url = serviceIdStr === 'global' ? '/api/admin/service-detail' : `/api/admin/service-detail?serviceId=${serviceIdStr}`;
      const res = await fetch(url);
      const detailData = await res.json();
      if (detailData.success && detailData.serviceDetail) {
        const d = detailData.serviceDetail;
        setDetailForm({
          heroKicker: d.heroKicker || '',
          heroSubtitle: d.heroSubtitle || '',
          heroStat1Value: d.heroStat1Value || '',
          heroStat1Label: d.heroStat1Label || '',
          heroStat2Value: d.heroStat2Value || '',
          heroStat2Label: d.heroStat2Label || '',
          heroStat3Value: d.heroStat3Value || '',
          heroStat3Label: d.heroStat3Label || '',
          heroTagline: d.heroTagline || '',

          overviewKicker: d.overviewKicker || '',
          overviewTitle: d.overviewTitle || '',
          overviewTitleGreen: d.overviewTitleGreen || '',
          overviewDescription: d.overviewDescription || '',
          feature1Title: d.feature1Title || '',
          feature1Desc: d.feature1Desc || '',
          feature2Title: d.feature2Title || '',
          feature2Desc: d.feature2Desc || '',
          feature3Title: d.feature3Title || '',
          feature3Desc: d.feature3Desc || '',
          pdfDownloadUrl: d.pdfDownloadUrl || '',

          capabilitiesKicker: d.capabilitiesKicker || '',
          capabilitiesTitle1: d.capabilitiesTitle1 || '',
          capabilitiesTitle2Green: d.capabilitiesTitle2Green || '',
          capabilitiesSubtitle: d.capabilitiesSubtitle || '',

          processKicker: d.processKicker || '',
          processTitle1: d.processTitle1 || '',
          processTitle2Green: d.processTitle2Green || '',
          processSubtitle: d.processSubtitle || '',

          ctaKicker: d.ctaKicker || '',
          ctaTitle1: d.ctaTitle1 || '',
          ctaTitle2Green: d.ctaTitle2Green || '',
          ctaDescription: d.ctaDescription || '',
          ctaButtonText: d.ctaButtonText || '',
          ctaPhone: d.ctaPhone || '',
          ctaBadge1: d.ctaBadge1 || '',
          ctaBadge2: d.ctaBadge2 || '',
          ctaBadge3: d.ctaBadge3 || '',
        });

        if (d.capabilitiesJson) {
          try {
            const parsed = JSON.parse(d.capabilitiesJson);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setCapabilitiesList(parsed.map((item: any, idx: number) => ({
                id: item.id || `cap-${idx}`,
                title: item.title || '',
                description: item.description || '',
                detailedContent: item.detailedContent || '',
                highlights: Array.isArray(item.highlights) ? item.highlights.join('\n') : (item.highlights || ''),
                imageUrl: item.imageUrl || '',
              })));
            }
          } catch (err) {}
        }

        if (d.processStepsJson) {
          try {
            const parsed = JSON.parse(d.processStepsJson);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setProcessList(parsed);
            }
          } catch (err) {}
        }
      }
    } catch (err) {
      console.error('Error loading service detail data:', err);
    }
  };

  const handleServiceChange = (val: string) => {
    setSelectedServiceId(val);
    loadServiceDetailData(val);
  };

  const handleSaveDetailSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingDetail(true);
    setSuccessMessage(null);
    try {
      const bodyPayload = {
        ...detailForm,
        serviceId: selectedServiceId === 'global' ? null : parseInt(selectedServiceId, 10),
        capabilitiesJson: JSON.stringify(
          capabilitiesList.map((item) => ({
            ...item,
            highlights: typeof item.highlights === 'string'
              ? item.highlights.split('\n').map((s: string) => s.trim()).filter(Boolean)
              : item.highlights,
          }))
        ),
        processStepsJson: JSON.stringify(processList),
      };

      const res = await fetch('/api/admin/service-detail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage(
          selectedServiceId === 'global'
            ? 'Default Global Service Detail settings saved successfully!'
            : 'Custom Service Detail settings for selected service saved successfully!'
        );
      } else {
        throw new Error(data.error || 'Failed to update Service Detail settings.');
      }
    } catch (err: any) {
      alert(err.message || 'Error saving Service Detail settings.');
    } finally {
      setSavingDetail(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl space-y-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight font-heading">Contracting Services Management</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage individual service capabilities, landing hero banner, and Service Detail page sections.
          </p>
        </div>

        {activeTab === 'cards' ? (
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl flex items-center gap-2 shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        ) : activeTab === 'hero' ? (
          <button
            onClick={handleSaveHero}
            disabled={savingHero}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl flex items-center gap-2 shadow-md transition disabled:opacity-50"
          >
            {savingHero ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Hero...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Hero Section</span>
              </>
            )}
          </button>
        ) : (
          <button
            onClick={handleSaveDetailSettings}
            disabled={savingDetail}
            className="px-6 py-2.5 bg-[#15B83E] hover:bg-[#129c35] text-white text-sm font-semibold rounded-xl flex items-center gap-2 shadow-md transition disabled:opacity-50"
          >
            {savingDetail ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Settings...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Service Detail Settings</span>
              </>
            )}
          </button>
        )}
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl flex items-center gap-2 animate-in fade-in shadow-sm font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-px">
        <button
          onClick={() => setActiveTab('cards')}
          className={`px-5 py-3 text-xs sm:text-sm font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'cards'
              ? 'border-indigo-600 text-indigo-600 bg-white shadow-sm'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Service Capability Cards ({services.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('hero')}
          className={`px-5 py-3 text-xs sm:text-sm font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'hero'
              ? 'border-emerald-600 text-emerald-700 bg-white shadow-sm'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
          }`}
        >
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Landing Page Hero Section</span>
        </button>

        <button
          onClick={() => setActiveTab('detail')}
          className={`px-5 py-3 text-xs sm:text-sm font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'detail'
              ? 'border-[#15B83E] text-[#15B83E] bg-white shadow-sm'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
          }`}
        >
          <Layout className="w-4 h-4 text-[#15B83E]" />
          <span>Service Detail Page Manager</span>
        </button>
      </div>

      {/* TAB 1: Service Cards Management */}
      {activeTab === 'cards' && (
        <>
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
          ) : services.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-400">
              <Layers className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-base font-medium text-slate-700">No services created yet</p>
              <p className="text-xs text-slate-400 mt-1">Add your first service to showcase on the public site.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3.5">Service</th>
                    <th className="px-6 py-3.5">Slug</th>
                    <th className="px-6 py-3.5">Order</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {services.map((service) => (
                    <tr key={service.id} className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {service.imageUrl ? (
                            <img
                              src={service.imageUrl}
                              alt={service.title}
                              className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                              {service.title.substring(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-slate-900">{service.title}</p>
                            <p className="text-xs text-slate-400 line-clamp-1">{service.excerpt}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-500">/contracting-services/{service.slug}</td>
                      <td className="px-6 py-4 text-xs text-slate-500">{service.sortOrder}</td>
                      <td className="px-6 py-4">
                        {service.isPublished ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <Check className="w-3 h-3 text-emerald-600" /> Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                            Draft
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEdit(service)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(service.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* TAB 2: Services Landing Hero */}
      {activeTab === 'hero' && (
        <form onSubmit={handleSaveHero} className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Landing Page Hero Banner</h2>
              <p className="text-xs text-slate-500">Configure main header titles, subtitle, background image, and stats cards on `/contracting-services`.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Top Kicker Tag</label>
              <input
                type="text"
                value={heroForm.kicker}
                onChange={(e) => setHeroForm({ ...heroForm, kicker: e.target.value })}
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Title Line 1</label>
              <input
                type="text"
                value={heroForm.titleLine1}
                onChange={(e) => setHeroForm({ ...heroForm, titleLine1: e.target.value })}
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Title Line 2</label>
              <input
                type="text"
                value={heroForm.titleLine2}
                onChange={(e) => setHeroForm({ ...heroForm, titleLine2: e.target.value })}
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Green Title Ending</label>
              <input
                type="text"
                value={heroForm.titleGreen}
                onChange={(e) => setHeroForm({ ...heroForm, titleGreen: e.target.value })}
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Subtitle Paragraph</label>
            <textarea
              rows={3}
              value={heroForm.subtitle}
              onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
              className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Background Image URL</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={heroForm.bgImageUrl}
                onChange={(e) => setHeroForm({ ...heroForm, bgImageUrl: e.target.value })}
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  setMediaPickerTarget('heroBg');
                  setMediaPickerOpen(true);
                }}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
              >
                <ImageIcon className="w-4 h-4 text-slate-500" />
                <span>Media</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* TAB 3: Service Detail Page Manager */}
      {activeTab === 'detail' && (
        <form onSubmit={handleSaveDetailSettings} className="space-y-8">
          
          {/* Per-Service Selector Dropdown Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#15B83E] uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> PER-SERVICE CONTENT CUSTOMIZER
              </span>
              <h2 className="text-lg font-bold font-heading">
                {selectedServiceId === 'global' 
                  ? 'Editing Default Global Service Detail Settings' 
                  : `Editing Custom Details for: ${services.find(s => s.id === parseInt(selectedServiceId, 10))?.title || 'Selected Service'}`}
              </h2>
              <p className="text-xs text-slate-400">
                Select any service from your database to configure its own distinct hero stats, overview points, capability cards, and process steps.
              </p>
            </div>

            <div className="relative min-w-[280px] sm:min-w-[360px]" ref={dropdownRef}>
              {/* Trigger Button */}
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-300 shadow-md cursor-pointer border ${
                  dropdownOpen 
                    ? 'bg-[#0F2238] border-[#15B83E] ring-2 ring-[#15B83E]/40 text-white' 
                    : 'bg-[#0B1727] hover:bg-[#0F2238] border-slate-700/80 text-white'
                }`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-8 h-8 rounded-lg bg-[#15B83E]/15 border border-[#15B83E]/40 text-[#15B83E] flex items-center justify-center flex-shrink-0 font-bold">
                    {selectedServiceId === 'global' ? (
                      <Globe className="w-4 h-4 text-[#15B83E]" />
                    ) : (
                      <HardHat className="w-4 h-4 text-[#15B83E]" />
                    )}
                  </div>

                  <div className="text-left truncate">
                    <div className="text-xs font-bold text-white truncate font-heading">
                      {selectedServiceId === 'global' 
                        ? 'Default Global Settings' 
                        : services.find((s) => s.id === parseInt(selectedServiceId, 10))?.title || 'Selected Service'}
                    </div>
                    <div className="text-[10px] text-emerald-400 font-mono font-medium truncate">
                      {selectedServiceId === 'global' ? 'All Services Fallback Template' : `/contracting-services/${services.find((s) => s.id === parseInt(selectedServiceId, 10))?.slug}`}
                    </div>
                  </div>
                </div>

                <div className={`w-6 h-6 rounded-md bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center transition-transform duration-300 ${dropdownOpen ? 'rotate-180 bg-[#15B83E] text-white border-[#15B83E]' : ''}`}>
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </button>

              {/* Floating Popup Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-2.5 w-full sm:w-[400px] bg-[#07111E] border border-slate-700/90 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl animate-fadeIn font-sans">
                  
                  {/* Menu Header */}
                  <div className="px-4 py-2.5 bg-slate-950/90 border-b border-slate-800/80 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    <span>Select Service Scope</span>
                    <span className="text-[#15B83E] font-bold">{services.length + 1} Available</span>
                  </div>

                  <div className="max-h-[320px] overflow-y-auto p-2 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-700">
                    
                    {/* Global Fallback Option */}
                    <button
                      type="button"
                      onClick={() => {
                        handleServiceChange('global');
                        setDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 text-left cursor-pointer border ${
                        selectedServiceId === 'global'
                          ? 'bg-[#15B83E]/15 border-[#15B83E]/60 text-white font-semibold'
                          : 'hover:bg-[#0F2238] border-transparent text-slate-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedServiceId === 'global' ? 'bg-[#15B83E] text-white shadow-md' : 'bg-slate-800 text-slate-400'}`}>
                          <Globe className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold font-heading">Default Global Settings</div>
                          <div className="text-[10px] text-slate-400">Master fallback template for all services</div>
                        </div>
                      </div>
                      {selectedServiceId === 'global' && (
                        <CheckCircle2 className="w-4 h-4 text-[#15B83E] flex-shrink-0" />
                      )}
                    </button>

                    {/* Divider */}
                    <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-slate-500 border-t border-slate-800/60 mt-1">
                      Database Services ({services.length})
                    </div>

                    {/* Individual Service Options */}
                    {services.map((s) => {
                      const isSelected = selectedServiceId === String(s.id);
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => {
                            handleServiceChange(String(s.id));
                            setDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 text-left cursor-pointer border ${
                            isSelected
                              ? 'bg-[#15B83E]/15 border-[#15B83E]/60 text-white font-semibold'
                              : 'hover:bg-[#0F2238] border-transparent text-slate-300 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            {s.imageUrl ? (
                              <img src={s.imageUrl} alt={s.title} className="w-8 h-8 rounded-lg object-cover border border-slate-700 flex-shrink-0" />
                            ) : (
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-[#15B83E] text-white' : 'bg-slate-800 text-slate-400'}`}>
                                <HardHat className="w-4 h-4" />
                              </div>
                            )}
                            <div className="truncate">
                              <div className="text-xs font-bold font-heading truncate">{s.title}</div>
                              <div className="text-[10px] text-emerald-400 font-mono truncate">/contracting-services/{s.slug}</div>
                            </div>
                          </div>

                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-[#15B83E] flex-shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}

                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* SECTION 1: HERO SECTION */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 text-[#15B83E] flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">1. Hero Section Setup</h2>
                <p className="text-xs text-slate-500">Configure top hero kicker, subtitle, stats cards, and right tagline on `/contracting-services/[slug]`.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Top Kicker</label>
                <input
                  type="text"
                  value={detailForm.heroKicker}
                  onChange={(e) => setDetailForm({ ...detailForm, heroKicker: e.target.value })}
                  className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#15B83E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Subtitle Text</label>
                <input
                  type="text"
                  value={detailForm.heroSubtitle}
                  onChange={(e) => setDetailForm({ ...detailForm, heroSubtitle: e.target.value })}
                  className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#15B83E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Stat 1 (Value & Label)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={detailForm.heroStat1Value}
                    onChange={(e) => setDetailForm({ ...detailForm, heroStat1Value: e.target.value })}
                    placeholder="20+"
                    className="w-24 px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                  <input
                    type="text"
                    value={detailForm.heroStat1Label}
                    onChange={(e) => setDetailForm({ ...detailForm, heroStat1Label: e.target.value })}
                    placeholder="Years of Experience"
                    className="flex-1 px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Stat 2 (Value & Label)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={detailForm.heroStat2Value}
                    onChange={(e) => setDetailForm({ ...detailForm, heroStat2Value: e.target.value })}
                    placeholder="200+"
                    className="w-24 px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                  <input
                    type="text"
                    value={detailForm.heroStat2Label}
                    onChange={(e) => setDetailForm({ ...detailForm, heroStat2Label: e.target.value })}
                    placeholder="Projects Delivered"
                    className="flex-1 px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Stat 3 (Value & Label)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={detailForm.heroStat3Value}
                    onChange={(e) => setDetailForm({ ...detailForm, heroStat3Value: e.target.value })}
                    placeholder="100%"
                    className="w-24 px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl font-bold text-[#15B83E]"
                  />
                  <input
                    type="text"
                    value={detailForm.heroStat3Label}
                    onChange={(e) => setDetailForm({ ...detailForm, heroStat3Label: e.target.value })}
                    placeholder="Commitment to Safety"
                    className="flex-1 px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Right Accent Tagline</label>
                <input
                  type="text"
                  value={detailForm.heroTagline}
                  onChange={(e) => setDetailForm({ ...detailForm, heroTagline: e.target.value })}
                  placeholder="BUILDING A STRONGER TOMORROW"
                  className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#15B83E] focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: OVERVIEW SECTION */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">2. Overview Section ("Building What Matters Most")</h2>
                <p className="text-xs text-slate-500">Configure overview headlines, fallback description, 3 feature cards, and PDF profile download link.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Kicker</label>
                <input
                  type="text"
                  value={detailForm.overviewKicker}
                  onChange={(e) => setDetailForm({ ...detailForm, overviewKicker: e.target.value })}
                  className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#15B83E] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Title Part 1</label>
                <input
                  type="text"
                  value={detailForm.overviewTitle}
                  onChange={(e) => setDetailForm({ ...detailForm, overviewTitle: e.target.value })}
                  className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#15B83E] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Title Green Highlight</label>
                <input
                  type="text"
                  value={detailForm.overviewTitleGreen}
                  onChange={(e) => setDetailForm({ ...detailForm, overviewTitleGreen: e.target.value })}
                  className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#15B83E] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Fallback Overview Description Paragraph</label>
              <textarea
                rows={3}
                value={detailForm.overviewDescription}
                onChange={(e) => setDetailForm({ ...detailForm, overviewDescription: e.target.value })}
                placeholder="SECO LINE delivers reliable and high-quality civil construction solutions..."
                className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#15B83E] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-700 uppercase">Feature Card 1</span>
                <input
                  type="text"
                  value={detailForm.feature1Title}
                  onChange={(e) => setDetailForm({ ...detailForm, feature1Title: e.target.value })}
                  placeholder="Safety First"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-bold"
                />
                <input
                  type="text"
                  value={detailForm.feature1Desc}
                  onChange={(e) => setDetailForm({ ...detailForm, feature1Desc: e.target.value })}
                  placeholder="Description..."
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                />
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-700 uppercase">Feature Card 2</span>
                <input
                  type="text"
                  value={detailForm.feature2Title}
                  onChange={(e) => setDetailForm({ ...detailForm, feature2Title: e.target.value })}
                  placeholder="Experienced Teams"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-bold"
                />
                <input
                  type="text"
                  value={detailForm.feature2Desc}
                  onChange={(e) => setDetailForm({ ...detailForm, feature2Desc: e.target.value })}
                  placeholder="Description..."
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                />
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-700 uppercase">Feature Card 3</span>
                <input
                  type="text"
                  value={detailForm.feature3Title}
                  onChange={(e) => setDetailForm({ ...detailForm, feature3Title: e.target.value })}
                  placeholder="Quality & Precision"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-bold"
                />
                <input
                  type="text"
                  value={detailForm.feature3Desc}
                  onChange={(e) => setDetailForm({ ...detailForm, feature3Desc: e.target.value })}
                  placeholder="Description..."
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Company Profile PDF Link</label>
              <input
                type="text"
                value={detailForm.pdfDownloadUrl}
                onChange={(e) => setDetailForm({ ...detailForm, pdfDownloadUrl: e.target.value })}
                placeholder="/SECO_LINE_PROFILE.pdf"
                className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#15B83E] focus:outline-none"
              />
            </div>
          </div>

          {/* SECTION 3: OUR OTHER SERVICES & CAPABILITY CARDS MANAGER */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3 justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 text-[#15B83E] flex items-center justify-center font-bold">
                  <HardHat className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">3. Our Other Services Section & Cards Manager</h2>
                  <p className="text-xs text-slate-500">Configure section headers and edit every service capability card (images, modal text, bullet points).</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddCapabilityCard}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#15B83E] text-white rounded-xl hover:bg-[#12a036] transition-all shadow-sm cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Capability Card</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Kicker</label>
                <input
                  type="text"
                  value={detailForm.capabilitiesKicker}
                  onChange={(e) => setDetailForm({ ...detailForm, capabilitiesKicker: e.target.value })}
                  className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Title Part 1</label>
                <input
                  type="text"
                  value={detailForm.capabilitiesTitle1}
                  onChange={(e) => setDetailForm({ ...detailForm, capabilitiesTitle1: e.target.value })}
                  className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Title Green Highlight</label>
                <input
                  type="text"
                  value={detailForm.capabilitiesTitle2Green}
                  onChange={(e) => setDetailForm({ ...detailForm, capabilitiesTitle2Green: e.target.value })}
                  className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Subtitle Paragraph</label>
              <textarea
                rows={2}
                value={detailForm.capabilitiesSubtitle}
                onChange={(e) => setDetailForm({ ...detailForm, capabilitiesSubtitle: e.target.value })}
                className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            {/* Capability Cards List */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Service Cards ({capabilitiesList.length} Cards)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {capabilitiesList.map((card, cIdx) => (
                  <div key={card.id || cIdx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 relative group">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                      <span className="text-xs font-bold text-[#15B83E] uppercase font-heading">
                        Card #{cIdx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCapabilityCard(cIdx)}
                        className="text-rose-500 hover:text-rose-700 p-1 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Remove Card"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase">Card Title</label>
                        <input
                          type="text"
                          value={card.title}
                          onChange={(e) => {
                            const updated = [...capabilitiesList];
                            updated[cIdx].title = e.target.value;
                            setCapabilitiesList(updated);
                          }}
                          className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase">Short Description (Card Face)</label>
                        <textarea
                          rows={2}
                          value={card.description}
                          onChange={(e) => {
                            const updated = [...capabilitiesList];
                            updated[cIdx].description = e.target.value;
                            setCapabilitiesList(updated);
                          }}
                          className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase">Detailed Overview (Popup Modal)</label>
                        <textarea
                          rows={3}
                          value={card.detailedContent}
                          onChange={(e) => {
                            const updated = [...capabilitiesList];
                            updated[cIdx].detailedContent = e.target.value;
                            setCapabilitiesList(updated);
                          }}
                          className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase">Key Specifications (1 per line)</label>
                        <textarea
                          rows={3}
                          value={card.highlights}
                          onChange={(e) => {
                            const updated = [...capabilitiesList];
                            updated[cIdx].highlights = e.target.value;
                            setCapabilitiesList(updated);
                          }}
                          placeholder="Specification 1&#10;Specification 2&#10;Specification 3"
                          className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-mono text-[11px]"
                        />
                      </div>

                      {/* Image Preview & Device File Upload */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Image URL & Direct Upload</label>
                        <div className="flex items-center gap-2">
                          {card.imageUrl && (
                            <img 
                              src={card.imageUrl} 
                              alt="Thumbnail" 
                              className="w-10 h-10 object-cover rounded-lg border border-slate-200 flex-shrink-0"
                            />
                          )}
                          <input
                            type="text"
                            value={card.imageUrl}
                            onChange={(e) => {
                              const updated = [...capabilitiesList];
                              updated[cIdx].imageUrl = e.target.value;
                              setCapabilitiesList(updated);
                            }}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                          />
                          <label className="inline-flex items-center justify-center p-2 rounded-lg bg-slate-900 text-white hover:bg-[#15B83E] transition-colors cursor-pointer flex-shrink-0" title="Upload from Device">
                            <Upload className="w-3.5 h-3.5" />
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleCapabilityImageUpload(cIdx, e)}
                            />
                          </label>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 4: EXECUTION METHODOLOGY & PROCESS STEPS MANAGER */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3 justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#15B83E]/10 border border-[#15B83E]/20 text-[#15B83E] flex items-center justify-center font-bold">
                  <Cog className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">4. Execution Process & Steps Manager</h2>
                  <p className="text-xs text-slate-500">Configure 4-step execution methodology section title and phase cards.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddProcessStep}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-xl hover:bg-[#15B83E] transition-all shadow-sm cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Step</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Kicker</label>
                <input
                  type="text"
                  value={detailForm.processKicker}
                  onChange={(e) => setDetailForm({ ...detailForm, processKicker: e.target.value })}
                  className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Title Part 1</label>
                <input
                  type="text"
                  value={detailForm.processTitle1}
                  onChange={(e) => setDetailForm({ ...detailForm, processTitle1: e.target.value })}
                  className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Title Green Highlight</label>
                <input
                  type="text"
                  value={detailForm.processTitle2Green}
                  onChange={(e) => setDetailForm({ ...detailForm, processTitle2Green: e.target.value })}
                  className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Subtitle Paragraph</label>
              <textarea
                rows={2}
                value={detailForm.processSubtitle}
                onChange={(e) => setDetailForm({ ...detailForm, processSubtitle: e.target.value })}
                className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            {/* Process Steps List */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Execution Steps ({processList.length} Phases)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {processList.map((step, sIdx) => (
                  <div key={sIdx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 relative">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                      <span className="text-xs font-bold text-[#15B83E] uppercase font-mono">
                        Phase {step.num || `0${sIdx + 1}`}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveProcessStep(sIdx)}
                        className="text-rose-500 hover:text-rose-700 p-1 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Remove Step"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase">Step Number</label>
                        <input
                          type="text"
                          value={step.num}
                          onChange={(e) => {
                            const updated = [...processList];
                            updated[sIdx].num = e.target.value;
                            setProcessList(updated);
                          }}
                          placeholder={`0${sIdx + 1}`}
                          className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-mono font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase">Phase Title</label>
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) => {
                            const updated = [...processList];
                            updated[sIdx].title = e.target.value;
                            setProcessList(updated);
                          }}
                          className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase">Description</label>
                        <textarea
                          rows={3}
                          value={step.description}
                          onChange={(e) => {
                            const updated = [...processList];
                            updated[sIdx].description = e.target.value;
                            setProcessList(updated);
                          }}
                          className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 4: PROJECT ENQUIRY CTA */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">5. Project Enquiry CTA Banner Setup</h2>
                <p className="text-xs text-slate-500">Configure bottom dark CTA banner titles, button text, contact phone, and 3 trust badges.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Kicker</label>
                <input
                  type="text"
                  value={detailForm.ctaKicker}
                  onChange={(e) => setDetailForm({ ...detailForm, ctaKicker: e.target.value })}
                  className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#15B83E] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Headline Part 1</label>
                <input
                  type="text"
                  value={detailForm.ctaTitle1}
                  onChange={(e) => setDetailForm({ ...detailForm, ctaTitle1: e.target.value })}
                  className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#15B83E] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Title Green Ending</label>
                <input
                  type="text"
                  value={detailForm.ctaTitle2Green}
                  onChange={(e) => setDetailForm({ ...detailForm, ctaTitle2Green: e.target.value })}
                  className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#15B83E] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Description Paragraph</label>
              <textarea
                rows={2}
                value={detailForm.ctaDescription}
                onChange={(e) => setDetailForm({ ...detailForm, ctaDescription: e.target.value })}
                className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#15B83E] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Button Text</label>
                <input
                  type="text"
                  value={detailForm.ctaButtonText}
                  onChange={(e) => setDetailForm({ ...detailForm, ctaButtonText: e.target.value })}
                  placeholder="Get a Free Proposal"
                  className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#15B83E] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Contact Phone Number</label>
                <input
                  type="text"
                  value={detailForm.ctaPhone}
                  onChange={(e) => setDetailForm({ ...detailForm, ctaPhone: e.target.value })}
                  placeholder="+966 12 345 6789"
                  className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#15B83E] focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Trust Badge 1</label>
                <input
                  type="text"
                  value={detailForm.ctaBadge1}
                  onChange={(e) => setDetailForm({ ...detailForm, ctaBadge1: e.target.value })}
                  placeholder="Rapid 24h Response"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Trust Badge 2</label>
                <input
                  type="text"
                  value={detailForm.ctaBadge2}
                  onChange={(e) => setDetailForm({ ...detailForm, ctaBadge2: e.target.value })}
                  placeholder="ISO & Aramco Standards"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Trust Badge 3</label>
                <input
                  type="text"
                  value={detailForm.ctaBadge3}
                  onChange={(e) => setDetailForm({ ...detailForm, ctaBadge3: e.target.value })}
                  placeholder="Nationwide Saudi Execution"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* SAVE BUTTON */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={savingDetail}
              className="inline-flex items-center gap-2 bg-[#15B83E] hover:bg-[#129c35] text-white text-xs sm:text-sm font-bold px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 font-heading uppercase tracking-wider cursor-pointer"
            >
              {savingDetail ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Service Detail Settings...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Service Detail Settings</span>
                </>
              )}
            </button>
          </div>

        </form>
      )}

      {/* Service Card Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-base">
                {editingService ? 'Edit Service Capability' : 'Add New Service Capability'}
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmitService} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    const autoSlug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                    setForm({ ...form, title: newTitle, slug: autoSlug });
                  }}
                  placeholder="e.g. Civil Execution & Construction"
                  className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="civil-execution-construction"
                  className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Short Excerpt
                </label>
                <textarea
                  rows={2}
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="Brief summary for card display..."
                  className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Description & Capabilities
                </label>
                <textarea
                  rows={4}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Image / Thumbnail
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    placeholder="/uploads/... or https://..."
                    className="flex-1 px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setMediaPickerTarget('service');
                      setMediaPickerOpen(true);
                    }}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl flex items-center gap-1.5 transition"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Media</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={form.sortOrder}
                    onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
                    className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isPublished}
                      onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                      className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                    />
                    <span className="text-sm font-medium text-slate-700">Publish Service</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-sm transition disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingService ? 'Update Service' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelect={(url) => {
          if (mediaPickerTarget === 'service') {
            setForm((prev) => ({ ...prev, imageUrl: url }));
          } else if (mediaPickerTarget === 'heroBg') {
            setHeroForm((prev) => ({ ...prev, bgImageUrl: url }));
          } else if (mediaPickerTarget === 'heroOverlay') {
            setHeroForm((prev) => ({ ...prev, overlayImageUrl: url }));
          }
          setMediaPickerOpen(false);
        }}
        title="Select Media Asset"
      />
    </div>
  );
}
