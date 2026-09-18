'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Trash2, CheckCircle, Clock, Loader2, X, Reply } from 'lucide-react';
import { formatDate } from '@/lib/utils';

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

export default function ContactsAdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMessage, setActiveMessage] = useState<Submission | null>(null);

  useEffect(() => {
    fetchSubmissions();
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
      setLoading(false);
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

  return (
    <div className="p-8 max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Contact Inquiries</h1>
        <p className="text-sm text-slate-500 mt-1">Review, organize, and reply to client inquiries from the website.</p>
      </div>

      {loading ? (
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
