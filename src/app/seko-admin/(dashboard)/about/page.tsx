'use client';

import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Loader2, 
  Image as ImageIcon, 
  CheckCircle2, 
  Sparkles, 
  Eye, 
  Layers, 
  PhoneCall, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown 
} from 'lucide-react';
import MediaPickerModal from '@/components/admin/MediaPickerModal';

export default function AboutPageAdmin() {
  const [activeTab, setActiveTab] = useState<'hero' | 'vmv' | 'strengths' | 'cta'>('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [mediaTargetField, setMediaTargetField] = useState<string | null>(null);

  const [form, setForm] = useState({
    // Section 1: Hero
    heroKicker: '',
    heroTitleLine1: '',
    heroTitleLine2Green: '',
    heroSubtitle: '',
    heroBgImageUrl: '',
    heroVideoUrl: '',
    heroBadge1Value: '',
    heroBadge1Label: '',
    heroBadge2Value: '',
    heroBadge2Label: '',
    heroBadge3Value: '',
    heroBadge3Label: '',

    // Section 2: Vision, Mission & Values
    vmvKicker: '',
    vmvTitleLine1: '',
    vmvTitleLine2Green: '',
    vmvDescription: '',
    vmvSkylineImageUrl: '',
    vmvBadgeText: '',
    vmvVisionTitle: '',
    vmvVisionDesc: '',
    vmvMissionTitle: '',
    vmvMissionDesc: '',
    vmvValuesList: [] as Array<{ num: string; title: string; desc: string; icon: string; color: string }>,

    // Section 3: Strengths
    strengthsKicker: '',
    strengthsTitleLine1: '',
    strengthsTitleLine2Green: '',
    strengthsDescription: '',
    strengthsTagline: '',
    strengthsImageUrl: '',
    strengthsBadgeText: '',
    strengthsList: [] as Array<{ title: string; desc: string; icon: string; color: string }>,

    // Section 4: CTA Banner
    ctaKicker: '',
    ctaTitleLine1: '',
    ctaTitleLine2Green: '',
    ctaButtonText: '',
    ctaButtonLink: '',
    ctaValue1: '',
    ctaValue2: '',
    ctaValue3: '',
    ctaImageUrl: '',
    ctaOverlayText: '',
  });

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await fetch('/api/admin/about');
      const data = await res.json();
      if (data.success && data.about) {
        const a = data.about;

        let parsedValues = [];
        try {
          if (a.vmvValuesJson) parsedValues = JSON.parse(a.vmvValuesJson);
        } catch (e) {
          console.error('Error parsing vmvValuesJson', e);
        }

        let parsedStrengths = [];
        try {
          if (a.strengthsJson) parsedStrengths = JSON.parse(a.strengthsJson);
        } catch (e) {
          console.error('Error parsing strengthsJson', e);
        }

        setForm({
          heroKicker: a.heroKicker || 'ABOUT SECO LINE',
          heroTitleLine1: a.heroTitleLine1 || 'ENGINEERING & INDUSTRIAL',
          heroTitleLine2Green: a.heroTitleLine2Green || 'SERVICES',
          heroSubtitle: a.heroSubtitle || '',
          heroBgImageUrl: a.heroBgImageUrl || '',
          heroVideoUrl: a.heroVideoUrl || '',
          heroBadge1Value: a.heroBadge1Value || '15+',
          heroBadge1Label: a.heroBadge1Label || 'Years Track Record',
          heroBadge2Value: a.heroBadge2Value || '500+',
          heroBadge2Label: a.heroBadge2Label || 'Projects Completed',
          heroBadge3Value: a.heroBadge3Value || '100%',
          heroBadge3Label: a.heroBadge3Label || 'Safety & Quality Compliance',

          vmvKicker: a.vmvKicker || 'VISION, MISSION & CORE VALUES',
          vmvTitleLine1: a.vmvTitleLine1 || 'Guided by Purpose.',
          vmvTitleLine2Green: a.vmvTitleLine2Green || 'Committed to a Stronger Tomorrow.',
          vmvDescription: a.vmvDescription || '',
          vmvSkylineImageUrl: a.vmvSkylineImageUrl || '',
          vmvBadgeText: a.vmvBadgeText || 'A STRONGER SAUDI ARABIA THROUGH PARTNERSHIP',
          vmvVisionTitle: a.vmvVisionTitle || 'Our Vision',
          vmvVisionDesc: a.vmvVisionDesc || '',
          vmvMissionTitle: a.vmvMissionTitle || 'Our Mission',
          vmvMissionDesc: a.vmvMissionDesc || '',
          vmvValuesList: parsedValues.length > 0 ? parsedValues : [
            { num: '01', title: 'Quality', desc: 'Maintain contracting, civil execution, materials and customer service excellence.', icon: 'Trophy', color: 'green' },
            { num: '02', title: 'Safety', desc: 'Prioritize health, safety and environmental protection in all operations.', icon: 'HardHat', color: 'navy' },
            { num: '03', title: 'Integrity', desc: 'Operate with honesty, transparency and professionalism.', icon: 'ShieldCheck', color: 'green' },
            { num: '04', title: 'Commitment', desc: 'Focus on timely completion, reliable support and client satisfaction.', icon: 'Users', color: 'navy' },
            { num: '05', title: 'Continuous Improvement', desc: 'Improve services through modern techniques and industry best practices.', icon: 'TrendingUp', color: 'green' }
          ],

          strengthsKicker: a.strengthsKicker || 'OUR STRENGTHS',
          strengthsTitleLine1: a.strengthsTitleLine1 || 'Our',
          strengthsTitleLine2Green: a.strengthsTitleLine2Green || 'Strengths',
          strengthsDescription: a.strengthsDescription || '',
          strengthsTagline: a.strengthsTagline || 'ENGINEERING TODAY FOR A STRONGER TOMORROW',
          strengthsImageUrl: a.strengthsImageUrl || '',
          strengthsBadgeText: a.strengthsBadgeText || 'PEOPLE | SOLUTIONS | PROGRESS | TOGETHER',
          strengthsList: parsedStrengths.length > 0 ? parsedStrengths : [
            { title: 'INTEGRATED CAPABILITY', desc: 'Multiple contracting, support and trading services coordinated through one platform.', icon: 'Layers', color: 'green' },
            { title: 'TECHNICAL EXPERTISE', desc: 'Engineering, supervision, skilled trades and industrial project support.', icon: 'Cog', color: 'navy' },
            { title: 'SKILLED WORKFORCE', desc: 'Skilled, semi-skilled and specialized personnel across project disciplines.', icon: 'Users', color: 'green' },
            { title: 'PROJECT SUPPORT', desc: 'Logistics, scaffolding, temporary facilities and material delivery support.', icon: 'Truck', color: 'navy' },
            { title: 'HSE FOCUS', desc: 'Safety-conscious planning and execution aligned with project requirements.', icon: 'ShieldCheck', color: 'green' },
            { title: 'EQUIPMENT CAPABILITY', desc: 'Heavy equipment, access equipment and specialized lifting solutions.', icon: 'Wrench', color: 'navy' }
          ],

          ctaKicker: a.ctaKicker || "LET'S BUILD TOGETHER",
          ctaTitleLine1: a.ctaTitleLine1 || 'Partner with SECO LINE',
          ctaTitleLine2Green: a.ctaTitleLine2Green || 'for a Stronger Tomorrow',
          ctaButtonText: a.ctaButtonText || 'Get In Touch',
          ctaButtonLink: a.ctaButtonLink || '/contact',
          ctaValue1: a.ctaValue1 || 'Reliable Solutions',
          ctaValue2: a.ctaValue2 || 'Long-Term Partnerships',
          ctaValue3: a.ctaValue3 || 'Sustainable Growth',
          ctaImageUrl: a.ctaImageUrl || '',
          ctaOverlayText: a.ctaOverlayText || 'BUILDING INDUSTRIES EMPOWERING PEOPLE',
        });
      }
    } catch (err) {
      console.error('Failed to load about page admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage(null);

    const payload = {
      ...form,
      vmvValuesJson: JSON.stringify(form.vmvValuesList),
      strengthsJson: JSON.stringify(form.strengthsList),
    };

    try {
      const res = await fetch('/api/admin/about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage('About Page details successfully saved to MySQL database!');
        setTimeout(() => setSuccessMessage(null), 4000);
      }
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  const tabs = [
    { id: 'hero', label: '1. About Hero Section', icon: Sparkles },
    { id: 'vmv', label: '2. Vision, Mission & Values', icon: Eye },
    { id: 'strengths', label: '3. Our Strengths', icon: Layers },
    { id: 'cta', label: '4. Partner CTA Banner', icon: PhoneCall },
  ] as const;

  return (
    <div className="p-8 max-w-6xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">About Page Content Manager</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage all 4 sections, titles, imagery, core values cards, and CTA content dynamically on the public site.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save About Page</span>
            </>
          )}
        </button>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Tabs Row */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-px">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-xs sm:text-sm font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? 'border-indigo-600 text-indigo-600 bg-white shadow-sm'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Tab 1: Hero */}
        {activeTab === 'hero' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>About Hero Section Settings</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Kicker / Badge Text
                </label>
                <input
                  type="text"
                  value={form.heroKicker}
                  onChange={(e) => setForm({ ...form, heroKicker: e.target.value })}
                  placeholder="e.g. ABOUT SECO LINE"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Heading Line 1 (Main Text)
                </label>
                <input
                  type="text"
                  value={form.heroTitleLine1}
                  onChange={(e) => setForm({ ...form, heroTitleLine1: e.target.value })}
                  placeholder="e.g. ENGINEERING & INDUSTRIAL"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Heading Line 2 (Green Gradient Text)
                </label>
                <input
                  type="text"
                  value={form.heroTitleLine2Green}
                  onChange={(e) => setForm({ ...form, heroTitleLine2Green: e.target.value })}
                  placeholder="e.g. SERVICES"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Hero Subtitle Description
              </label>
              <textarea
                rows={3}
                value={form.heroSubtitle}
                onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
                placeholder="Enter description text..."
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Hero Background Image URL
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={form.heroBgImageUrl}
                    onChange={(e) => setForm({ ...form, heroBgImageUrl: e.target.value })}
                    placeholder="https://... or /uploads/..."
                    className="flex-1 px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setMediaTargetField('heroBgImageUrl')}
                    className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Select</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Video Embed / Modal Video URL
                </label>
                <input
                  type="text"
                  value={form.heroVideoUrl}
                  onChange={(e) => setForm({ ...form, heroVideoUrl: e.target.value })}
                  placeholder="e.g. https://www.youtube.com/embed/..."
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* 3 Badges / Stats */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Hero Stat Badges</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <input
                    type="text"
                    value={form.heroBadge1Value}
                    onChange={(e) => setForm({ ...form, heroBadge1Value: e.target.value })}
                    placeholder="Badge 1 Value (e.g. 15+)"
                    className="w-full px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg font-bold"
                  />
                  <input
                    type="text"
                    value={form.heroBadge1Label}
                    onChange={(e) => setForm({ ...form, heroBadge1Label: e.target.value })}
                    placeholder="Badge 1 Label"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                  />
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <input
                    type="text"
                    value={form.heroBadge2Value}
                    onChange={(e) => setForm({ ...form, heroBadge2Value: e.target.value })}
                    placeholder="Badge 2 Value (e.g. 500+)"
                    className="w-full px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg font-bold"
                  />
                  <input
                    type="text"
                    value={form.heroBadge2Label}
                    onChange={(e) => setForm({ ...form, heroBadge2Label: e.target.value })}
                    placeholder="Badge 2 Label"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                  />
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <input
                    type="text"
                    value={form.heroBadge3Value}
                    onChange={(e) => setForm({ ...form, heroBadge3Value: e.target.value })}
                    placeholder="Badge 3 Value (e.g. 100%)"
                    className="w-full px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg font-bold"
                  />
                  <input
                    type="text"
                    value={form.heroBadge3Label}
                    onChange={(e) => setForm({ ...form, heroBadge3Label: e.target.value })}
                    placeholder="Badge 3 Label"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Vision, Mission & Values */}
        {activeTab === 'vmv' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Eye className="w-4 h-4 text-indigo-600" />
              <span>Vision, Mission & Core Values Settings</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Kicker Tag
                </label>
                <input
                  type="text"
                  value={form.vmvKicker}
                  onChange={(e) => setForm({ ...form, vmvKicker: e.target.value })}
                  placeholder="e.g. VISION, MISSION & CORE VALUES"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Title Line 1
                </label>
                <input
                  type="text"
                  value={form.vmvTitleLine1}
                  onChange={(e) => setForm({ ...form, vmvTitleLine1: e.target.value })}
                  placeholder="e.g. Guided by Purpose."
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Title Line 2 (Green Gradient)
                </label>
                <input
                  type="text"
                  value={form.vmvTitleLine2Green}
                  onChange={(e) => setForm({ ...form, vmvTitleLine2Green: e.target.value })}
                  placeholder="e.g. Committed to a Stronger Tomorrow."
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Section Description
              </label>
              <textarea
                rows={2}
                value={form.vmvDescription}
                onChange={(e) => setForm({ ...form, vmvDescription: e.target.value })}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Riyadh Skyline Image URL
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={form.vmvSkylineImageUrl}
                    onChange={(e) => setForm({ ...form, vmvSkylineImageUrl: e.target.value })}
                    placeholder="https://..."
                    className="flex-1 px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setMediaTargetField('vmvSkylineImageUrl')}
                    className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Select</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Glass Badge Overlay Text
                </label>
                <input
                  type="text"
                  value={form.vmvBadgeText}
                  onChange={(e) => setForm({ ...form, vmvBadgeText: e.target.value })}
                  placeholder="e.g. A STRONGER SAUDI ARABIA THROUGH PARTNERSHIP"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Vision & Mission Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase">Vision Card</label>
                <input
                  type="text"
                  value={form.vmvVisionTitle}
                  onChange={(e) => setForm({ ...form, vmvVisionTitle: e.target.value })}
                  placeholder="Title (e.g. Our Vision)"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg font-bold"
                />
                <textarea
                  rows={3}
                  value={form.vmvVisionDesc}
                  onChange={(e) => setForm({ ...form, vmvVisionDesc: e.target.value })}
                  placeholder="Vision statement description..."
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg"
                />
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase">Mission Card</label>
                <input
                  type="text"
                  value={form.vmvMissionTitle}
                  onChange={(e) => setForm({ ...form, vmvMissionTitle: e.target.value })}
                  placeholder="Title (e.g. Our Mission)"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg font-bold"
                />
                <textarea
                  rows={3}
                  value={form.vmvMissionDesc}
                  onChange={(e) => setForm({ ...form, vmvMissionDesc: e.target.value })}
                  placeholder="Mission statement description..."
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg"
                />
              </div>
            </div>

            {/* 5 Core Values List Editor */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Core Values ({form.vmvValuesList.length})
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setForm({
                      ...form,
                      vmvValuesList: [
                        ...form.vmvValuesList,
                        {
                          num: `0${form.vmvValuesList.length + 1}`,
                          title: 'New Value',
                          desc: 'Description of the value.',
                          icon: 'ShieldCheck',
                          color: 'green',
                        },
                      ],
                    });
                  }}
                  className="px-3 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Core Value</span>
                </button>
              </div>

              <div className="space-y-3">
                {form.vmvValuesList.map((val, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center font-mono">
                          {idx + 1}
                        </span>
                        <input
                          type="text"
                          value={val.title}
                          onChange={(e) => {
                            const updated = [...form.vmvValuesList];
                            updated[idx].title = e.target.value;
                            setForm({ ...form, vmvValuesList: updated });
                          }}
                          placeholder="Value Title"
                          className="px-3 py-1 text-sm bg-white border border-slate-200 rounded-md font-bold"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={val.icon}
                          onChange={(e) => {
                            const updated = [...form.vmvValuesList];
                            updated[idx].icon = e.target.value;
                            setForm({ ...form, vmvValuesList: updated });
                          }}
                          className="px-2 py-1 text-xs bg-white border border-slate-200 rounded-md"
                        >
                          <option value="Trophy">Trophy</option>
                          <option value="HardHat">HardHat</option>
                          <option value="ShieldCheck">ShieldCheck</option>
                          <option value="Users">Users</option>
                          <option value="TrendingUp">TrendingUp</option>
                        </select>

                        <select
                          value={val.color}
                          onChange={(e) => {
                            const updated = [...form.vmvValuesList];
                            updated[idx].color = e.target.value;
                            setForm({ ...form, vmvValuesList: updated });
                          }}
                          className="px-2 py-1 text-xs bg-white border border-slate-200 rounded-md"
                        >
                          <option value="green">Green Accent</option>
                          <option value="navy">Navy Accent</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => {
                            const updated = form.vmvValuesList.filter((_, i) => i !== idx);
                            setForm({ ...form, vmvValuesList: updated });
                          }}
                          className="p-1 text-slate-400 hover:text-red-600 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <textarea
                      rows={2}
                      value={val.desc}
                      onChange={(e) => {
                        const updated = [...form.vmvValuesList];
                        updated[idx].desc = e.target.value;
                        setForm({ ...form, vmvValuesList: updated });
                      }}
                      placeholder="Value description text..."
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Our Strengths */}
        {activeTab === 'strengths' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Our Strengths Settings</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Kicker Tag
                </label>
                <input
                  type="text"
                  value={form.strengthsKicker}
                  onChange={(e) => setForm({ ...form, strengthsKicker: e.target.value })}
                  placeholder="e.g. OUR STRENGTHS"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Title Line 1
                </label>
                <input
                  type="text"
                  value={form.strengthsTitleLine1}
                  onChange={(e) => setForm({ ...form, strengthsTitleLine1: e.target.value })}
                  placeholder="e.g. Our"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Title Line 2 (Green Gradient)
                </label>
                <input
                  type="text"
                  value={form.strengthsTitleLine2Green}
                  onChange={(e) => setForm({ ...form, strengthsTitleLine2Green: e.target.value })}
                  placeholder="e.g. Strengths"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Section Description
              </label>
              <textarea
                rows={2}
                value={form.strengthsDescription}
                onChange={(e) => setForm({ ...form, strengthsDescription: e.target.value })}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Middle Tagline Text
                </label>
                <input
                  type="text"
                  value={form.strengthsTagline}
                  onChange={(e) => setForm({ ...form, strengthsTagline: e.target.value })}
                  placeholder="e.g. ENGINEERING TODAY FOR A STRONGER TOMORROW"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Refinery Photo URL
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={form.strengthsImageUrl}
                    onChange={(e) => setForm({ ...form, strengthsImageUrl: e.target.value })}
                    placeholder="https://..."
                    className="flex-1 px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setMediaTargetField('strengthsImageUrl')}
                    className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Select</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Glass Badge Overlay Text
                </label>
                <input
                  type="text"
                  value={form.strengthsBadgeText}
                  onChange={(e) => setForm({ ...form, strengthsBadgeText: e.target.value })}
                  placeholder="e.g. PEOPLE | SOLUTIONS | PROGRESS | TOGETHER"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* 6 Strength Cards List Editor */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Strength Cards ({form.strengthsList.length})
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setForm({
                      ...form,
                      strengthsList: [
                        ...form.strengthsList,
                        {
                          title: 'NEW STRENGTH',
                          desc: 'Description of key strength capability.',
                          icon: 'Layers',
                          color: 'green',
                        },
                      ],
                    });
                  }}
                  className="px-3 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Strength Card</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {form.strengthsList.map((st, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        value={st.title}
                        onChange={(e) => {
                          const updated = [...form.strengthsList];
                          updated[idx].title = e.target.value;
                          setForm({ ...form, strengthsList: updated });
                        }}
                        placeholder="Strength Title"
                        className="px-3 py-1 text-xs bg-white border border-slate-200 rounded-md font-bold uppercase tracking-wider flex-1"
                      />

                      <select
                        value={st.icon}
                        onChange={(e) => {
                          const updated = [...form.strengthsList];
                          updated[idx].icon = e.target.value;
                          setForm({ ...form, strengthsList: updated });
                        }}
                        className="px-2 py-1 text-xs bg-white border border-slate-200 rounded-md"
                      >
                        <option value="Layers">Layers</option>
                        <option value="Cog">Cog</option>
                        <option value="Users">Users</option>
                        <option value="Truck">Truck</option>
                        <option value="ShieldCheck">ShieldCheck</option>
                        <option value="Wrench">Wrench</option>
                      </select>

                      <select
                        value={st.color}
                        onChange={(e) => {
                          const updated = [...form.strengthsList];
                          updated[idx].color = e.target.value;
                          setForm({ ...form, strengthsList: updated });
                        }}
                        className="px-2 py-1 text-xs bg-white border border-slate-200 rounded-md"
                      >
                        <option value="green">Green Accent</option>
                        <option value="navy">Navy Accent</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => {
                          const updated = form.strengthsList.filter((_, i) => i !== idx);
                          setForm({ ...form, strengthsList: updated });
                        }}
                        className="p-1 text-slate-400 hover:text-red-600 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <textarea
                      rows={2}
                      value={st.desc}
                      onChange={(e) => {
                        const updated = [...form.strengthsList];
                        updated[idx].desc = e.target.value;
                        setForm({ ...form, strengthsList: updated });
                      }}
                      placeholder="Strength description..."
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Partner CTA Banner */}
        {activeTab === 'cta' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-indigo-600" />
              <span>Partner CTA Banner Settings</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Kicker Tag
                </label>
                <input
                  type="text"
                  value={form.ctaKicker}
                  onChange={(e) => setForm({ ...form, ctaKicker: e.target.value })}
                  placeholder="e.g. LET'S BUILD TOGETHER"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Banner Title Line 1
                </label>
                <input
                  type="text"
                  value={form.ctaTitleLine1}
                  onChange={(e) => setForm({ ...form, ctaTitleLine1: e.target.value })}
                  placeholder="e.g. Partner with SECO LINE"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Banner Title Line 2 (Green)
                </label>
                <input
                  type="text"
                  value={form.ctaTitleLine2Green}
                  onChange={(e) => setForm({ ...form, ctaTitleLine2Green: e.target.value })}
                  placeholder="e.g. for a Stronger Tomorrow"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  value={form.ctaButtonText}
                  onChange={(e) => setForm({ ...form, ctaButtonText: e.target.value })}
                  placeholder="e.g. Get In Touch"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Button Target URL Link
                </label>
                <input
                  type="text"
                  value={form.ctaButtonLink}
                  onChange={(e) => setForm({ ...form, ctaButtonLink: e.target.value })}
                  placeholder="e.g. /contact"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">3 Value Indicators</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold mb-1">Indicator 1</label>
                  <input
                    type="text"
                    value={form.ctaValue1}
                    onChange={(e) => setForm({ ...form, ctaValue1: e.target.value })}
                    placeholder="e.g. Reliable Solutions"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold mb-1">Indicator 2</label>
                  <input
                    type="text"
                    value={form.ctaValue2}
                    onChange={(e) => setForm({ ...form, ctaValue2: e.target.value })}
                    placeholder="e.g. Long-Term Partnerships"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold mb-1">Indicator 3</label>
                  <input
                    type="text"
                    value={form.ctaValue3}
                    onChange={(e) => setForm({ ...form, ctaValue3: e.target.value })}
                    placeholder="e.g. Sustainable Growth"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Engineer Background Photo URL
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={form.ctaImageUrl}
                    onChange={(e) => setForm({ ...form, ctaImageUrl: e.target.value })}
                    placeholder="https://..."
                    className="flex-1 px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setMediaTargetField('ctaImageUrl')}
                    className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Select</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Wall Engraving Overlay Text
                </label>
                <input
                  type="text"
                  value={form.ctaOverlayText}
                  onChange={(e) => setForm({ ...form, ctaOverlayText: e.target.value })}
                  placeholder="e.g. BUILDING INDUSTRIES EMPOWERING PEOPLE"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/25 flex items-center gap-2 transition disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving to MySQL...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save About Page Changes</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={mediaTargetField !== null}
        onClose={() => setMediaTargetField(null)}
        onSelect={(url) => {
          if (mediaTargetField) {
            setForm((prev) => ({ ...prev, [mediaTargetField]: url }));
          }
        }}
        title="Select Image from Media Library"
      />
    </div>
  );
}
