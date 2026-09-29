'use client';

import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Trash2, 
  CheckCircle, 
  Loader2, 
  X, 
  Reply, 
  Save, 
  Layout, 
  MapPin, 
  Phone, 
  Sparkles, 
  AlertCircle,
  FileText,
  Globe,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import MediaPickerModal from '@/components/admin/MediaPickerModal';

interface Submission {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface ContactPageSettingData {
  heroKicker: string;
  heroTitleLine1: string;
  heroTitleLine2Green: string;
  heroSubtitle: string;
  heroBgImageUrl: string;
  heroOverlayImageUrl: string;

  enquiryKicker: string;
  enquiryTitleLine1: string;
  enquiryTitleLine2Green: string;
  enquiryDescription: string;

  generalEmail: string;
  callPhone: string;
  headOfficeAddress: string;
  rabighBranchAddress: string;
  workingArea: string;

  mapKicker: string;
  mapTitleLine1: string;
  mapTitleLine2Green: string;
  mapEmbedUrl: string;
  directMapsUrl: string;
}

export default function ContactsAdminPage() {
  const [activeTab, setActiveTab] = useState<'inbox' | 'content'>('inbox');

  // Inbox state
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [inboxLoading, setInboxLoading] = useState(true);
  const [activeMessage, setActiveMessage] = useState<Submission | null>(null);

  // Content Manager state
  const [contentLoading, setContentLoading] = useState(false);
  const [contentSaving, setContentSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [activeMediaTarget, setActiveMediaTarget] = useState<'heroBg' | 'heroOverlay' | null>(null);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [contentForm, setContentForm] = useState<ContactPageSettingData>({
    heroKicker: 'CONTACT SECO LINE',
    heroTitleLine1: "Let's Build Something",
    heroTitleLine2Green: 'Stronger Together.',
    heroSubtitle: "Whether you're planning a new project, looking for specialized industrial support, or exploring a long-term partnership, our team is ready to understand your requirements and provide the right solution.",
    heroBgImageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80',
    heroOverlayImageUrl: '',
    enquiryKicker: 'GET IN TOUCH',
    enquiryTitleLine1: 'Start a Conversation About Your',
    enquiryTitleLine2Green: 'Next Project.',
    enquiryDescription: 'Connect with SECO LINE for contracting, construction, maintenance, manpower, logistics, equipment and industrial requirements across Saudi Arabia.',
    generalEmail: 'info@secoline.com.sa',
    callPhone: '+966 12 345 6789',
    headOfficeAddress: 'Building No. 2341, Salahuddin Al Ayyubi Street, Al Malaz District, Riyadh 12841, Saudi Arabia',
    rabighBranchAddress: 'Building # 6871, Office # 08, 3rd Floor, King Abdul Aziz Road, Rabigh 25753, KSA',
    workingArea: 'Serving projects across Saudi Arabia',
    mapKicker: 'LOCATION & HEADQUARTERS',
    mapTitleLine1: 'Visit Our Headquarters in',
    mapTitleLine2Green: 'Riyadh, Saudi Arabia.',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231920.08945892582!2d46.54233777598822!3d24.72539828551403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa',
    directMapsUrl: 'https://maps.google.com/?q=Riyadh+Saudi+Arabia',
  });

  useEffect(() => {
    fetchSubmissions();
    fetchContentSettings();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await fetch('/api/admin/contacts');
      const data = await res.json();
      if (data.success) {
        setSubmissions(data.submissions);
      }
    } catch (err) {
      console.error('Failed to load contacts:', err);
    } finally {
      setInboxLoading(false);
    }
  };

  const fetchContentSettings = async () => {
    setContentLoading(true);
    try {
      const res = await fetch('/api/admin/contact-page');
      const data = await res.json();
      if (data.success && data.contactPage) {
        setContentForm({
          heroKicker: data.contactPage.heroKicker || '',
          heroTitleLine1: data.contactPage.heroTitleLine1 || '',
          heroTitleLine2Green: data.contactPage.heroTitleLine2Green || '',
          heroSubtitle: data.contactPage.heroSubtitle || '',
          heroBgImageUrl: data.contactPage.heroBgImageUrl || '',
          heroOverlayImageUrl: data.contactPage.heroOverlayImageUrl || '',
          enquiryKicker: data.contactPage.enquiryKicker || '',
          enquiryTitleLine1: data.contactPage.enquiryTitleLine1 || '',
          enquiryTitleLine2Green: data.contactPage.enquiryTitleLine2Green || '',
          enquiryDescription: data.contactPage.enquiryDescription || '',
          generalEmail: data.contactPage.generalEmail || '',
          callPhone: data.contactPage.callPhone || '',
          headOfficeAddress: data.contactPage.headOfficeAddress || '',
          rabighBranchAddress: data.contactPage.rabighBranchAddress || '',
          workingArea: data.contactPage.workingArea || '',
          mapKicker: data.contactPage.mapKicker || '',
          mapTitleLine1: data.contactPage.mapTitleLine1 || '',
          mapTitleLine2Green: data.contactPage.mapTitleLine2Green || '',
          mapEmbedUrl: data.contactPage.mapEmbedUrl || '',
          directMapsUrl: data.contactPage.directMapsUrl || '',
        });
      }
    } catch (err) {
      console.error('Failed to load Contact Page settings:', err);
    } finally {
      setContentLoading(false);
    }
  };

  const handleDirectUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof ContactPageSettingData) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(fieldName);
    setSaveStatus(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('altText', file.name);

    try {
      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Upload failed');
      }

      setContentForm((prev) => ({ ...prev, [fieldName]: data.media.fileUrl }));
      setSaveStatus({ type: 'success', text: `Uploaded ${file.name} successfully from your device!` });
    } catch (err: any) {
      console.error('Direct device upload error:', err);
      setSaveStatus({ type: 'error', text: err.message || 'Failed to upload file from device.' });
    } finally {
      setUploadingField(null);
      e.target.value = '';
    }
  };

  const handleSaveContentSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setContentSaving(true);
    setSaveStatus(null);
    try {
      const res = await fetch('/api/admin/contact-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contentForm),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSaveStatus({ type: 'success', text: 'Contact page settings saved successfully!' });
      } else {
        throw new Error(data.error || 'Failed to update contact page settings.');
      }
    } catch (err: any) {
      setSaveStatus({ type: 'error', text: err.message || 'An error occurred while saving.' });
    } finally {
      setContentSaving(false);
    }
  };

  const handleToggleRead = async (submission: Submission) => {
    const updatedStatus = !submission.isRead;
    try {
      const res = await fetch(`/api/admin/contacts/${submission.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: updatedStatus }),
      });
      if (res.ok) {
        setSubmissions(
          submissions.map((s) => (s.id === submission.id ? { ...s, isRead: updatedStatus } : s))
        );
        if (activeMessage && activeMessage.id === submission.id) {
          setActiveMessage({ ...activeMessage, isRead: updatedStatus });
        }
      }
    } catch (err) {
      console.error('Toggle error:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Permanently delete this contact message?')) return;
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSubmissions(submissions.filter((s) => s.id !== id));
        if (activeMessage?.id === id) setActiveMessage(null);
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const unreadCount = submissions.filter((s) => !s.isRead).length;

  return (
    <div className="p-8 max-w-7xl space-y-6 font-sans">
      
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight font-heading">Contact Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage client inquiries and customize public Contact page content.</p>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/80 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('inbox')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'inbox'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Mail className="w-4 h-4 text-indigo-600" />
            <span>Inquiries Inbox</span>
            {unreadCount > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'content'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Layout className="w-4 h-4 text-emerald-600" />
            <span>Page Content Manager</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CLIENT INQUIRIES INBOX */}
      {activeTab === 'inbox' && (
        <>
          {inboxLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
          ) : submissions.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-400">
              <Mail className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-base font-medium text-slate-700">No contact inquiries yet</p>
              <p className="text-xs text-slate-400 mt-1">Inquiries submitted on your public contact page will appear here.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5">Sender</th>
                    <th className="px-6 py-3.5">Subject</th>
                    <th className="px-6 py-3.5">Date</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {submissions.map((sub) => (
                    <tr
                      key={sub.id}
                      onClick={() => {
                        setActiveMessage(sub);
                        if (!sub.isRead) handleToggleRead(sub);
                      }}
                      className={`hover:bg-slate-50/80 transition cursor-pointer ${
                        !sub.isRead ? 'bg-indigo-50/30 font-medium' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        {sub.isRead ? (
                          <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                            <CheckCircle className="w-3.5 h-3.5 text-slate-400" />
                            Read
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                            New
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900">{sub.name}</p>
                        <p className="text-xs text-slate-400">{sub.email}</p>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-600">
                        <p className="font-medium text-slate-800 line-clamp-1">{sub.subject || '(No subject)'}</p>
                        <p className="text-slate-400 line-clamp-1">{sub.message}</p>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400 whitespace-nowrap">
                        {formatDate(sub.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(sub.id);
                          }}
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

      {/* TAB 2: CONTACT PAGE CONTENT MANAGER */}
      {activeTab === 'content' && (
        <form onSubmit={handleSaveContentSettings} className="space-y-8">
          
          {/* Top Save Alert & Action Bar */}
          {saveStatus && (
            <div className={`p-4 rounded-2xl text-xs sm:text-sm flex items-start gap-3 shadow-sm ${
              saveStatus.type === 'success' 
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {saveStatus.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <span className="leading-relaxed font-medium">{saveStatus.text}</span>
            </div>
          )}

          {/* SECTION 1: HERO SECTION EDITOR */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Hero Section</h2>
                <p className="text-xs text-slate-500">Configure top hero banner headline, taglines, and background imagery.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Top Kicker</label>
                <input
                  type="text"
                  value={contentForm.heroKicker}
                  onChange={(e) => setContentForm({ ...contentForm, heroKicker: e.target.value })}
                  placeholder="CONTACT SECO LINE"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Title Line 1</label>
                <input
                  type="text"
                  value={contentForm.heroTitleLine1}
                  onChange={(e) => setContentForm({ ...contentForm, heroTitleLine1: e.target.value })}
                  placeholder="Let's Build Something"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Title Line 2 (Green Highlight)</label>
                <input
                  type="text"
                  value={contentForm.heroTitleLine2Green}
                  onChange={(e) => setContentForm({ ...contentForm, heroTitleLine2Green: e.target.value })}
                  placeholder="Stronger Together."
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition"
                />
              </div>

              {/* Background Image Upload & Select Control */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Background Image
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={contentForm.heroBgImageUrl}
                      onChange={(e) => setContentForm({ ...contentForm, heroBgImageUrl: e.target.value })}
                      placeholder="https://... or upload from device"
                      className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition"
                    />

                    {/* Direct Upload From Computer Button */}
                    <label className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-sm transition flex-shrink-0">
                      {uploadingField === 'heroBgImageUrl' ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Upload className="w-3.5 h-3.5" />
                      )}
                      <span>Upload File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleDirectUpload(e, 'heroBgImageUrl')}
                        className="hidden"
                        disabled={uploadingField !== null}
                      />
                    </label>

                    {/* Choose from Library Modal */}
                    <button
                      type="button"
                      onClick={() => setActiveMediaTarget('heroBg')}
                      className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition flex-shrink-0 border border-slate-200"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-slate-500" />
                      <span>Library</span>
                    </button>
                  </div>

                  {contentForm.heroBgImageUrl && (
                    <div className="relative inline-block mt-1 group">
                      <img
                        src={contentForm.heroBgImageUrl}
                        alt="Background Preview"
                        className="h-20 w-36 object-cover rounded-xl border border-slate-200 shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setContentForm({ ...contentForm, heroBgImageUrl: '' })}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition"
                        title="Remove Image"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Hero Subtitle Paragraph</label>
              <textarea
                rows={3}
                value={contentForm.heroSubtitle}
                onChange={(e) => setContentForm({ ...contentForm, heroSubtitle: e.target.value })}
                placeholder="Whether you're planning a new project..."
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition"
              />
            </div>

            {/* Overlay Image Upload & Select Control */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Overlay Image (Optional PNG)
              </label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={contentForm.heroOverlayImageUrl}
                    onChange={(e) => setContentForm({ ...contentForm, heroOverlayImageUrl: e.target.value })}
                    placeholder="https://... or upload engineer cutout PNG"
                    className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition"
                  />

                  {/* Direct Upload From Computer Button */}
                  <label className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-sm transition flex-shrink-0">
                    {uploadingField === 'heroOverlayImageUrl' ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>Upload File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleDirectUpload(e, 'heroOverlayImageUrl')}
                      className="hidden"
                      disabled={uploadingField !== null}
                    />
                  </label>

                  {/* Choose from Library Modal */}
                  <button
                    type="button"
                    onClick={() => setActiveMediaTarget('heroOverlay')}
                    className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition flex-shrink-0 border border-slate-200"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-slate-500" />
                    <span>Library</span>
                  </button>
                </div>

                {contentForm.heroOverlayImageUrl && (
                  <div className="relative inline-block mt-1 group">
                    <img
                      src={contentForm.heroOverlayImageUrl}
                      alt="Overlay Preview"
                      className="h-20 w-36 object-contain rounded-xl border border-slate-200 shadow-sm bg-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => setContentForm({ ...contentForm, heroOverlayImageUrl: '' })}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition"
                      title="Remove Image"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SECTION 2: ENQUIRY & CONTACT CARDS EDITOR */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Contact Cards & Enquiry Section</h2>
                <p className="text-xs text-slate-500">Configure public contact emails, phone numbers, office address, and area text.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Section Kicker</label>
                <input
                  type="text"
                  value={contentForm.enquiryKicker}
                  onChange={(e) => setContentForm({ ...contentForm, enquiryKicker: e.target.value })}
                  placeholder="GET IN TOUCH"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Title Line 1</label>
                <input
                  type="text"
                  value={contentForm.enquiryTitleLine1}
                  onChange={(e) => setContentForm({ ...contentForm, enquiryTitleLine1: e.target.value })}
                  placeholder="Start a Conversation About Your"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Title Line 2 (Green Highlight)</label>
                <input
                  type="text"
                  value={contentForm.enquiryTitleLine2Green}
                  onChange={(e) => setContentForm({ ...contentForm, enquiryTitleLine2Green: e.target.value })}
                  placeholder="Next Project."
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">General Email Address</label>
                <input
                  type="email"
                  value={contentForm.generalEmail}
                  onChange={(e) => setContentForm({ ...contentForm, generalEmail: e.target.value })}
                  placeholder="info@secoline.com.sa"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Direct Phone Number</label>
                <input
                  type="text"
                  value={contentForm.callPhone}
                  onChange={(e) => setContentForm({ ...contentForm, callPhone: e.target.value })}
                  placeholder="+966 12 345 6789"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Working Area Label</label>
                <input
                  type="text"
                  value={contentForm.workingArea}
                  onChange={(e) => setContentForm({ ...contentForm, workingArea: e.target.value })}
                  placeholder="Serving projects across Saudi Arabia"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Head Office Address</label>
              <textarea
                rows={2}
                value={contentForm.headOfficeAddress}
                onChange={(e) => setContentForm({ ...contentForm, headOfficeAddress: e.target.value })}
                placeholder="Building No. 2341, Salahuddin Al Ayyubi Street, Al Malaz District, Riyadh 12841, Saudi Arabia"
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Rabigh Branch Office Address</label>
              <textarea
                rows={2}
                value={contentForm.rabighBranchAddress}
                onChange={(e) => setContentForm({ ...contentForm, rabighBranchAddress: e.target.value })}
                placeholder="Building # 6871, Office # 08, 3rd Floor, King Abdul Aziz Road, Rabigh 25753, KSA"
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Enquiry Description Text</label>
              <textarea
                rows={3}
                value={contentForm.enquiryDescription}
                onChange={(e) => setContentForm({ ...contentForm, enquiryDescription: e.target.value })}
                placeholder="Connect with SECO LINE for contracting..."
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition"
              />
            </div>
          </div>

          {/* SECTION 3: GOOGLE MAPS SETUP EDITOR */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Google Maps iFrame Setup</h2>
                <p className="text-xs text-slate-500">Configure map embed URL and direct location link for public contact map section.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Map Kicker</label>
                <input
                  type="text"
                  value={contentForm.mapKicker}
                  onChange={(e) => setContentForm({ ...contentForm, mapKicker: e.target.value })}
                  placeholder="LOCATION & HEADQUARTERS"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Title Line 1</label>
                <input
                  type="text"
                  value={contentForm.mapTitleLine1}
                  onChange={(e) => setContentForm({ ...contentForm, mapTitleLine1: e.target.value })}
                  placeholder="Visit Our Headquarters in"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Title Line 2 (Green Highlight)</label>
                <input
                  type="text"
                  value={contentForm.mapTitleLine2Green}
                  onChange={(e) => setContentForm({ ...contentForm, mapTitleLine2Green: e.target.value })}
                  placeholder="Riyadh, Saudi Arabia."
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Direct Google Maps Web Link</label>
                <input
                  type="text"
                  value={contentForm.directMapsUrl}
                  onChange={(e) => setContentForm({ ...contentForm, directMapsUrl: e.target.value })}
                  placeholder="https://maps.google.com/?q=..."
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Google Maps iFrame Embed URL (src)</label>
              <textarea
                rows={3}
                value={contentForm.mapEmbedUrl}
                onChange={(e) => setContentForm({ ...contentForm, mapEmbedUrl: e.target.value })}
                placeholder="https://www.google.com/maps/embed?pb=..."
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition font-mono"
              />
            </div>
          </div>

          {/* SAVE BUTTON */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={contentSaving}
              className="inline-flex items-center gap-2 bg-[#15B83E] hover:bg-[#129c35] text-white text-xs sm:text-sm font-bold px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 font-heading uppercase tracking-wider cursor-pointer"
            >
              {contentSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Settings...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Contact Page Settings</span>
                </>
              )}
            </button>
          </div>

        </form>
      )}

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={activeMediaTarget !== null}
        onClose={() => setActiveMediaTarget(null)}
        onSelect={(url) => {
          if (activeMediaTarget === 'heroBg') {
            setContentForm((prev) => ({ ...prev, heroBgImageUrl: url }));
          } else if (activeMediaTarget === 'heroOverlay') {
            setContentForm((prev) => ({ ...prev, heroOverlayImageUrl: url }));
          }
          setActiveMediaTarget(null);
        }}
        title="Select or Upload Image"
      />

      {/* Message Viewer Modal */}
      {activeMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">{activeMessage.subject || 'Contact Submission'}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{formatDate(activeMessage.createdAt)}</p>
              </div>
              <button onClick={() => setActiveMessage(null)}>
                <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="bg-slate-50 p-3 rounded-xl space-y-1">
                <p className="text-xs text-slate-500">From: <strong className="text-slate-800">{activeMessage.name}</strong> ({activeMessage.email})</p>
                {activeMessage.phone && (
                  <p className="text-xs text-slate-500">Phone: <strong className="text-slate-800">{activeMessage.phone}</strong></p>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">Message Content</label>
                <div className="p-4 bg-slate-50/60 border border-slate-100 rounded-xl text-slate-800 text-sm whitespace-pre-wrap leading-relaxed">
                  {activeMessage.message}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-5 mt-5 border-t border-slate-100">
              <button
                onClick={() => handleToggleRead(activeMessage)}
                className="text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                Mark as {activeMessage.isRead ? 'Unread' : 'Read'}
              </button>

              <div className="flex gap-2">
                <a
                  href={`mailto:${activeMessage.email}?subject=Re: ${encodeURIComponent(activeMessage.subject || 'Your Inquiry to Seko')}`}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition shadow-sm"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
