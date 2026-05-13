"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Highlighter, Settings, Cloud, Share2, FileDown, ScanLine } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';

export const FloatingToolbar = () => {
  const { setTemplateModalOpen } = useAppStore();

  const tools = [
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'highlight', icon: Highlighter, label: 'Pen/Edit' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="fixed top-8 right-8 z-40 flex items-center gap-4">
      <div className="flex items-center gap-3 mr-4">
         <div className="p-2 text-gray-300">
            <Cloud size={20} />
         </div>
      </div>
      
      <div className="glass-toolbar rounded-full p-1.5 flex items-center gap-1">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setTemplateModalOpen(true)}
          className="w-10 h-10 flex items-center justify-center rounded-full text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Plus size={24} strokeWidth={2.5} />
        </motion.button>
        
        {tools.map((tool) => (
          <motion.button
            key={tool.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 flex items-center justify-center rounded-full text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <tool.icon size={20} strokeWidth={2} />
          </motion.button>
        ))}
      </div>
    </div>
  );
};
