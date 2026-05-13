"use client";

import React from 'react';
import { 
  Book, 
  Search, 
  Settings, 
  Plus, 
  Star, 
  Clock, 
  Trash2, 
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  FolderOpen
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export const Sidebar = () => {
  const router = useRouter();
  const { sidebarCollapsed, toggleSidebar } = useAppStore();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
    { icon: Book, label: 'All Notebooks', id: 'notebooks' },
    { icon: Star, label: 'Favorites', id: 'favorites' },
    { icon: Clock, label: 'Recent', id: 'recent' },
    { icon: FolderOpen, label: 'Categories', id: 'categories' },
    { icon: Trash2, label: 'Trash', id: 'trash' },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 80 : 260 }}
      className={cn(
        "h-screen flex flex-col glass border-r z-50 relative transition-all duration-300",
        sidebarCollapsed ? "items-center" : "items-start"
      )}
    >
      <div className="p-6 flex items-center justify-between w-full">
        {!sidebarCollapsed && (
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent"
          >
            Lumina
          </motion.h1>
        )}
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <div className="px-4 py-2 w-full">
        <button 
          onClick={() => router.push('/notebook/new')}
          className={cn(
            "flex items-center gap-3 w-full p-3 rounded-xl bg-brand-primary text-white shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95",
            sidebarCollapsed ? "justify-center" : "justify-start"
          )}
        >
          <Plus size={20} />
          {!sidebarCollapsed && <span className="font-medium">New Note</span>}
        </button>
      </div>

      <nav className="flex-1 w-full px-4 mt-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => router.push(item.id === 'dashboard' ? '/' : `/${item.id}`)}
            className={cn(
              "flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800 group",
              sidebarCollapsed ? "justify-center" : "justify-start text-slate-600 dark:text-slate-400"
            )}
          >
            <item.icon size={20} className="group-hover:text-brand-primary" />
            {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 w-full border-t">
        <button className={cn(
          "flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800",
          sidebarCollapsed ? "justify-center" : "justify-start text-slate-600 dark:text-slate-400"
        )}>
          <Settings size={20} />
          {!sidebarCollapsed && <span className="font-medium">Settings</span>}
        </button>
      </div>
    </motion.aside>
  );
};
