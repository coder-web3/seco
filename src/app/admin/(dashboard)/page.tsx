import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import {
  Layers,
  Briefcase,
  BookOpen,
  Mail,
  FolderOpen,
  ArrowUpRight,
  Database,
  PlusCircle,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  // Fetch real counts from MySQL database
  const [
    servicesCount,
    projectsCount,
    postsCount,
    inquiriesCount,
    unreadInquiriesCount,
    mediaCount,
    recentInquiries,
  ] = await Promise.all([
    prisma.service.count(),
    prisma.project.count(),
    prisma.blogPost.count(),
    prisma.contactSubmission.count(),
    prisma.contactSubmission.count({ where: { isRead: false } }),
    prisma.mediaFile.count(),
    prisma.contactSubmission.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  const stats = [
    { label: 'Total Services', value: servicesCount, href: '/admin/services', icon: Layers, color: 'from-blue-600 to-cyan-500' },
    { label: 'Projects & Portfolio', value: projectsCount, href: '/admin/projects', icon: Briefcase, color: 'from-indigo-600 to-blue-500' },
    { label: 'Blog Posts', value: postsCount, href: '/admin/blog', icon: BookOpen, color: 'from-purple-600 to-indigo-500' },
    {
      label: 'Contact Inquiries',
      value: inquiriesCount,
      unread: unreadInquiriesCount,
      href: '/admin/contacts',
      icon: Mail,
      color: 'from-emerald-600 to-teal-500',
    },
    { label: 'Media Assets', value: mediaCount, href: '/admin/media', icon: FolderOpen, color: 'from-amber-600 to-orange-500' },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl">
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time database statistics and content control center.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-medium">
            <Database className="w-3.5 h-3.5 text-emerald-600" />
            <span>Database Connected</span>
          </div>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium rounded-lg shadow-sm transition"
          >
            <span>Live Website</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="group bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition flex flex-col justify-between relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${stat.color} text-white shadow-md shadow-slate-200`}>
                  <Icon className="w-5 h-5" />
                </div>
                {stat.unread !== undefined && stat.unread > 0 && (
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded-full">
                    {stat.unread} unread
                  </span>
                )}
              </div>
              <div>
                <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{stat.value}</p>
                <p className="text-xs font-medium text-slate-500 mt-1">{stat.label}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Inquiries (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Contact Inquiries</h2>
              <p className="text-xs text-slate-500 mt-0.5">Direct messages submitted from the public contact form</p>
            </div>
            <Link
              href="/admin/contacts"
              className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition"
            >
              View all
            </Link>
          </div>

          {recentInquiries.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Mail className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No contact inquiries received yet</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentInquiries.map((inquiry) => (
                <div key={inquiry.id} className="py-3.5 flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900 truncate">
                        {inquiry.name}
                      </span>
                      {!inquiry.isRead && (
                        <span className="w-2 h-2 rounded-full bg-indigo-600" title="Unread" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">{inquiry.subject || inquiry.message}</p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                      <span>{inquiry.email}</span>
                      <span>•</span>
                      <span>{formatDate(inquiry.createdAt)}</span>
                    </div>
                  </div>
                  <Link
                    href={`/admin/contacts`}
                    className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium transition"
                  >
                    Review
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions & System Info */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
            <h2 className="text-base font-bold text-slate-900 mb-4">Quick Management</h2>
            <div className="space-y-2">
              <Link
                href="/admin/projects"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-100 transition group"
              >
                <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <PlusCircle className="w-4 h-4 text-indigo-600" />
                  <span>Add Project</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition" />
              </Link>
              <Link
                href="/admin/services"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-100 transition group"
              >
                <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <PlusCircle className="w-4 h-4 text-indigo-600" />
                  <span>Create Service</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition" />
              </Link>
              <Link
                href="/admin/blog"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-100 transition group"
              >
                <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <PlusCircle className="w-4 h-4 text-indigo-600" />
                  <span>Write Blog Article</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition" />
              </Link>
              <Link
                href="/admin/media"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-100 transition group"
              >
                <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <FolderOpen className="w-4 h-4 text-indigo-600" />
                  <span>Manage Media Library</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition" />
              </Link>
            </div>
          </div>

          {/* Database Architecture Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Database className="w-4 h-4" />
              <span>Production Architecture</span>
            </div>
            <h3 className="text-base font-bold">cPanel & MySQL Ready</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Every change updates MySQL tables in real-time. Export SQL anytime via <code className="text-indigo-300 bg-slate-800 px-1 py-0.5 rounded">prisma/mysql-dump.sql</code> for phpMyAdmin.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-400">
              <span>Database Engine: InnoDB</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
