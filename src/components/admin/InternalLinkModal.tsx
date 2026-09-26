'use client';

import React, { useState, useEffect } from 'react';
import { X, Link as LinkIcon, ExternalLink, FileText, Globe, Check } from 'lucide-react';

interface InternalLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertLink: (markdownLink: string) => void;
  selectedText?: string;
}

const STATIC_ROUTES = [
  { title: 'Homepage', path: '/', description: 'Main site landing page' },
  { title: 'About Us', path: '/about', description: 'Company overview & profile' },
  { title: 'Contracting Services', path: '/services', description: 'Engineering & contracting services' },
  { title: 'Trading Services', path: '/trading-services', description: 'Commercial trading & products' },
  { title: 'Projects Portfolio', path: '/projects', description: 'Featured projects & portfolio' },
  { title: 'Media Gallery', path: '/gallery', description: 'Photos & video gallery' },
  { title: 'Contact Us', path: '/contact', description: 'Inquiry & contact page' },
  { title: 'Blog & News', path: '/blog', description: 'Blog listings page' },
];

export default function InternalLinkModal({
  isOpen,
  onClose,
  onInsertLink,
  selectedText = '',
}: InternalLinkModalProps) {
  const [activeTab, setActiveTab] = useState<'site' | 'blog' | 'custom'>('site');
  const [anchorText, setAnchorText] = useState(selectedText);
  const [customUrl, setCustomUrl] = useState('');
  const [selectedPath, setSelectedPath] = useState('/');
  const [openInNewTab, setOpenInNewTab] = useState(false);
  const [blogPosts, setBlogPosts] = useState<{ id: number; title: string; slug: string }[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  useEffect(() => {
    if (selectedText) {
      setAnchorText(selectedText);
    }
  }, [selectedText]);

  useEffect(() => {
    if (isOpen) {
      fetchBlogPosts();
    }
  }, [isOpen]);

  const fetchBlogPosts = async () => {
    setLoadingPosts(true);
    try {
      const res = await fetch('/api/admin/blog/posts');
      const data = await res.json();
      if (data.success && Array.isArray(data.posts)) {
        setBlogPosts(data.posts);
      }
    } catch (err) {
      console.error('Failed to fetch blog posts for internal linking:', err);
    } finally {
      setLoadingPosts(false);
    }
  };

  if (!isOpen) return null;

  const handleApply = () => {
    const text = anchorText.trim() || 'Link';
    let url = '';

    if (activeTab === 'site') {
      url = selectedPath;
    } else if (activeTab === 'blog') {
      url = selectedPath;
    } else {
      url = customUrl.trim() || '/';
    }

    let linkMarkup = `[${text}](${url})`;
    if (openInNewTab) {
      linkMarkup = `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
    }

    onInsertLink(linkMarkup);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <LinkIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Insert Internal / External Link</h3>
              <p className="text-xs text-slate-500">Link to site pages, blog posts, or custom URLs</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Anchor Text Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Link Anchor Text *
            </label>
            <input
              type="text"
              value={anchorText}
              onChange={(e) => setAnchorText(e.target.value)}
              placeholder="e.g. Explore our Contracting Services"
              className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Navigation Tabs */}
          <div className="flex p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setActiveTab('site');
                setSelectedPath('/services');
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
                activeTab === 'site' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Site Pages</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('blog');
                if (blogPosts.length > 0) setSelectedPath(`/blog/${blogPosts[0].slug}`);
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
                activeTab === 'blog' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Blog Posts</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('custom')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
                activeTab === 'custom' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Custom URL</span>
            </button>
          </div>

          {/* Tab 1: Static Site Pages */}
          {activeTab === 'site' && (
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Select Website Destination Page:
              </label>
              {STATIC_ROUTES.map((route) => {
                const isSelected = selectedPath === route.path;
                return (
                  <button
                    key={route.path}
                    type="button"
                    onClick={() => setSelectedPath(route.path)}
                    className={`w-full text-left p-3 rounded-xl border text-xs flex items-center justify-between transition ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/60 text-indigo-950 font-medium'
                        : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-slate-900">{route.title}</p>
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5">{route.path}</p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Tab 2: Internal Blog Posts */}
          {activeTab === 'blog' && (
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Select Blog Post Article:
              </label>
              {loadingPosts ? (
                <div className="p-6 text-center text-xs text-slate-400">Loading blog posts...</div>
              ) : blogPosts.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400">No blog posts found</div>
              ) : (
                blogPosts.map((post) => {
                  const path = `/blog/${post.slug}`;
                  const isSelected = selectedPath === path;
                  return (
                    <button
                      key={post.id}
                      type="button"
                      onClick={() => setSelectedPath(path)}
                      className={`w-full text-left p-3 rounded-xl border text-xs flex items-center justify-between transition ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/60 text-indigo-950 font-medium'
                          : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div>
                        <p className="font-semibold text-slate-900 line-clamp-1">{post.title}</p>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">{path}</p>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-indigo-600 flex-shrink-0 ml-2" />}
                    </button>
                  );
                })
              )}
            </div>
          )}

          {/* Tab 3: Custom URL */}
          {activeTab === 'custom' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  URL / Target Address *
                </label>
                <input
                  type="text"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="https://example.com or /contact"
                  className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono text-xs"
                />
              </div>
            </div>
          )}

          {/* Open in New Tab Option */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            <input
              type="checkbox"
              id="newTab"
              checked={openInNewTab}
              onChange={(e) => setOpenInNewTab(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded border-slate-300"
            />
            <label htmlFor="newTab" className="text-xs text-slate-700 font-medium cursor-pointer">
              Open link in a new browser tab (`target="_blank"`)
            </label>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200/60 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-sm transition"
          >
            Insert Link
          </button>
        </div>
      </div>
    </div>
  );
}
