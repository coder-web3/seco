'use client';

import React, { useState, useEffect } from 'react';
import { X, Upload, Search, Image as ImageIcon, Check, Loader2, Trash2 } from 'lucide-react';
import { formatBytes } from '@/lib/utils';

interface MediaFile {
  id: number;
  originalName: string;
  fileName: string;
  fileUrl: string;
  mimeType: string;
  fileSize: number;
  altText?: string;
  createdAt: string;
}

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  title?: string;
}

export default function MediaPickerModal({
  isOpen,
  onClose,
  onSelect,
  title = 'Select Media',
}: MediaPickerModalProps) {
  const [activeTab, setActiveTab] = useState<'library' | 'upload'>('library');
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen]);

  const fetchMedia = async (searchQuery = '') => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/media?search=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data.success) {
        setFiles(data.files);
      }
    } catch (err) {
      console.error('Failed to load media:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMedia(search);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

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

      // Add to list and select
      setFiles((prev) => [data.media, ...prev]);
      onSelect(data.media.fileUrl);
      onClose();
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (!confirm('Permanently delete this media asset?')) return;
    try {
      const res = await fetch(`/api/admin/media/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setFiles((prev) => prev.filter((f) => f.id !== id));
        if (selectedUrl === files.find((f) => f.id === id)?.fileUrl) {
          setSelectedUrl(null);
        }
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <ImageIcon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation & search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-3 border-b border-slate-100 bg-slate-50/50">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('library')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                activeTab === 'library'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              Media Library ({files.length})
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition flex items-center gap-2 ${
                activeTab === 'upload'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              <Upload className="w-4 h-4" />
              Upload New
            </button>
          </div>

          {activeTab === 'library' && (
            <form onSubmit={handleSearch} className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search images..."
                className="w-full pl-9 pr-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </form>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 min-h-[300px]">
          {activeTab === 'upload' ? (
            <div className="flex flex-col items-center justify-center h-full border-2 border-dashed border-slate-300 rounded-xl p-8 bg-slate-50/50 text-center">
              {uploading ? (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                  <p className="text-sm font-medium text-slate-700">Uploading and processing file...</p>
                </div>
              ) : (
                <>
                  <div className="p-4 bg-indigo-100 text-indigo-600 rounded-full mb-4">
                    <Upload className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-semibold text-slate-800">Upload Image or Asset</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm">
                    Supports JPG, PNG, WEBP, AVIF, GIF, SVG up to 10MB. Filename is safely sanitized automatically.
                  </p>
                  {uploadError && (
                    <div className="mt-3 text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-1.5 rounded-md">
                      {uploadError}
                    </div>
                  )}
                  <label className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg cursor-pointer shadow-sm transition">
                    <Upload className="w-4 h-4" />
                    <span>Choose File</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif,image/gif,image/svg+xml"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </>
              )}
            </div>
          ) : loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
              <span className="text-xs text-slate-500 mt-2">Loading library...</span>
            </div>
          ) : files.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <ImageIcon className="w-12 h-12 text-slate-300 mb-2" />
              <p className="text-sm font-medium text-slate-600">No media files found</p>
              <p className="text-xs text-slate-400 mt-1">Upload an image to get started.</p>
              <button
                onClick={() => setActiveTab('upload')}
                className="mt-3 px-3.5 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md transition"
              >
                Upload now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {files.map((file) => {
                const isSelected = selectedUrl === file.fileUrl;
                return (
                  <div
                    key={file.id}
                    onClick={() => setSelectedUrl(file.fileUrl)}
                    className={`group relative rounded-xl border overflow-hidden cursor-pointer transition ${
                      isSelected
                        ? 'border-indigo-600 ring-2 ring-indigo-500 shadow-md bg-indigo-50/20'
                        : 'border-slate-200 hover:border-slate-300 hover:shadow-sm bg-white'
                    }`}
                  >
                    <div className="aspect-square bg-slate-100 flex items-center justify-center overflow-hidden relative">
                      <img
                        src={file.fileUrl}
                        alt={file.originalName}
                        className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                      />
                      <button
                        onClick={(e) => handleDelete(e, file.id)}
                        className="absolute top-2 left-2 p-1.5 bg-red-600/90 hover:bg-red-600 text-white rounded-lg shadow opacity-0 group-hover:opacity-100 transition z-10"
                        title="Delete File"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 right-2 p-1 bg-indigo-600 text-white rounded-full shadow z-10">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                    <div className="p-2 text-xs">
                      <p className="font-medium text-slate-800 truncate" title={file.originalName}>
                        {file.originalName}
                      </p>
                      <p className="text-[10px] text-slate-400">{formatBytes(file.fileSize)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-100 bg-slate-50">
          <div className="text-xs text-slate-500 truncate max-w-sm">
            {selectedUrl ? `Selected: ${selectedUrl}` : 'No image selected'}
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200/60 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              disabled={!selectedUrl}
              onClick={() => {
                if (selectedUrl) {
                  onSelect(selectedUrl);
                  onClose();
                }
              }}
              className="px-5 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Select Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
