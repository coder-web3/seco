'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Settings,
  Search,
  Home,
  FileText,
  Briefcase,
  Layers,
  Image as ImageIcon,
  BookOpen,
  Mail,
  FolderOpen,
  Users,
  LogOut,
  ExternalLink,
  PackageCheck,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/seko-admin', icon: LayoutDashboard },
  { label: 'Site Settings', href: '/seko-admin/settings', icon: Settings },
  { label: 'SEO Settings', href: '/seko-admin/seo', icon: Search },
  { label: 'Homepage', href: '/seko-admin/homepage', icon: Home },
  { label: 'About Page', href: '/seko-admin/about', icon: FileText },
  { label: 'Contracting Services', href: '/seko-admin/services', icon: Layers },
  { label: 'Trading Services', href: '/seko-admin/trading-services', icon: PackageCheck },
  { label: 'Projects', href: '/seko-admin/projects', icon: Briefcase },
  { label: 'Gallery', href: '/seko-admin/gallery', icon: ImageIcon },
  { label: 'Blog Posts', href: '/seko-admin/blog', icon: BookOpen },
  { label: 'Contact Inquiries', href: '/seko-admin/contacts', icon: Mail },
  { label: 'Media Library', href: '/seko-admin/media', icon: FolderOpen },
  { label: 'Admin Users', href: '/seko-admin/users', icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/seko-admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col flex-shrink-0 border-r border-slate-800 min-h-screen">
      {/* Brand Logo Header */}
      <div className="h-20 flex items-center justify-center px-4 bg-white border-b border-slate-200">
        <Link href="/seko-admin" className="flex items-center justify-center w-full py-1.5">
          <img
            src="/uploads/1789714169770-seco---02-01-2eb82342d4daf61c.png"
            alt="SECO LINE"
            className="h-11 w-auto object-contain max-w-full"
          />
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Management
        </div>

        {navItems.map((item) => {
          const isActive =
            item.href === '/seko-admin'
              ? pathname === '/seko-admin'
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl transition ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-3 border-t border-slate-800 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            View Live Site
          </span>
          <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">public</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-lg transition"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
