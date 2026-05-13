"use client";

import React from 'react';
import { 
  Folder, 
  Hexagon, 
  Star, 
  Timer, 
  BookOpen, 
  Trash2, 
  Plus,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar, user } = useAppStore();

  const categories = [
    { id: 'all', label: 'All', icon: Folder },
    { id: 'unfiled', label: 'Unfiled', icon: Hexagon },
    { id: 'collect', label: 'Collect', icon: Star },
    { id: 'reasoning', label: 'Reasoning', icon: Timer, active: true },
    { id: 'english', label: 'English', icon: "🦁" },
    { id: 'general', label: 'General Awareness', icon: "📕" },
    { id: 'quant', label: 'Quant apt', icon: "🐘" },
    { id: 'mern', label: 'MERN', icon: Folder },
    { id: 'trash', label: 'Trash', icon: Trash2 },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 80 : 280 }}
      className={cn(
        "h-screen flex flex-col bg-[#f5f5f7] dark:bg-[#1c1c1e] z-50 relative transition-all duration-300 border-r border-gray-200 dark:border-gray-800",
        sidebarCollapsed ? "items-center" : "items-start"
      )}
    >
      {/* User Profile */}
      <div className="p-6 w-full mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-sm bg-blue-100 flex items-center justify-center">
             {user?.avatar_url ? (
               <img src={user.avatar_url} alt="Profile" className="w-full h-full object-cover" />
             ) : (
               <div className="text-blue-500 font-semibold text-lg">
                 {user?.full_name?.charAt(0) || 'R'}
               </div>
             )}
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {user?.full_name || 'Raman'}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 w-full mb-2">
         {!sidebarCollapsed && (
           <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
             <span>Category</span>
             <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors">
                <Folder size={14} />
             </button>
           </div>
         )}
      </div>

      <nav className="flex-1 w-full px-4 space-y-1 overflow-y-auto">
        {categories.map((cat) => {
          const isActive = cat.id === 'reasoning'; // Hardcoded for demo to match screenshot
          const isEmoji = typeof cat.icon === 'string';
          
          return (
            <button
              key={cat.id}
              onClick={() => router.push(`/${cat.id}`)}
              className={cn(
                "flex items-center gap-3 w-full p-2.5 rounded-xl transition-all duration-200 group relative",
                isActive ? "sidebar-item-active text-blue-600 shadow-sm" : "text-gray-500 hover:bg-gray-200/50 dark:hover:bg-gray-800/50"
              )}
            >
              <div className={cn(
                "flex items-center justify-center w-6 h-6",
                isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
              )}>
                {isEmoji ? (
                  <span className="text-lg leading-none">{cat.icon}</span>
                ) : (
                  <cat.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                )}
              </div>
              
              {!sidebarCollapsed && (
                <>
                  <span className={cn(
                    "font-medium flex-1 text-left truncate text-[14px]",
                    isActive ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"
                  )}>
                    {cat.label}
                  </span>
                  {(cat.id === 'all' || cat.id === 'mern' || cat.id === 'unfiled' || cat.id === 'reasoning' || cat.id === 'english' || cat.id === 'general' || cat.id === 'quant') && (
                    <Plus 
                      size={14} 
                      className="text-gray-300 hover:text-gray-600 dark:hover:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity" 
                    />
                  )}
                </>
              )}
              
              {isActive && (
                <motion.div 
                  layoutId="active-indicator"
                  className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Toggle Button */}
      <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-24 w-6 h-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-50"
      >
        {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div className="p-4 w-full">
         {/* Could add settings or storage info here if needed */}
      </div>
    </motion.aside>
  );
};

