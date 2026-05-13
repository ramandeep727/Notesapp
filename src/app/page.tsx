"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { NotebookCard } from '@/components/layout/NotebookCard';
import { LayoutGrid } from 'lucide-react';

export default function Dashboard() {
  const { notebooks } = useAppStore();

  // Mock notebooks for demo if empty
  const displayNotebooks = notebooks.length > 0 ? notebooks : [
    { id: '1', title: 'ALPHABET TEST', coverColor: '#b2ebf2', coverStyle: 'simple', is_favorite: true, notes_count: 26, last_modified: '05 02,2026 13:24' },
    { id: '2', title: 'LOGICAL VENN DIAGRAM', coverColor: '#e0f2f1', coverStyle: 'simple', is_favorite: false, notes_count: 24, last_modified: '04 15,2026 17:51' },
    { id: '3', title: 'puzzle test', coverColor: '#d7ccc8', coverStyle: 'wood', is_favorite: false, notes_count: 12, last_modified: '04 03,2026 16:43' },
    { id: '4', title: 'CODING & DECODING', coverColor: '#3b82f6', coverStyle: 'minimalist', is_favorite: true, notes_count: 19, last_modified: '04 01,2026 11:54' },
    { id: '5', title: 'Classification', coverColor: '#c5e1a5', coverStyle: 'fresh', is_favorite: true, notes_count: 45, last_modified: '03 27,2026 11:01' },
    { id: '6', title: 'Series + analogy', coverColor: '#ffffff', coverStyle: 'plain', is_favorite: false, notes_count: 5, last_modified: '03 26,2026 13:26' },
  ];

  return (
    <div className="p-12 pt-16 min-h-full">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
           <div className="p-2 bg-blue-500 rounded-lg text-white">
              <LayoutGrid size={24} />
           </div>
           <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Reasoning</h1>
        </div>
        
        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
           Total {displayNotebooks.length}
        </div>
      </div>

      {/* Notebook Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-x-12 gap-y-16">
        {displayNotebooks.map((nb, i) => (
          <NotebookCard
            key={nb.id}
            id={nb.id}
            title={nb.title}
            coverColor={nb.coverColor}
            coverStyle={nb.coverStyle}
            is_favorite={nb.is_favorite}
            notes_count={nb.notes_count}
            last_modified={nb.last_modified}
          />
        ))}
      </div>
    </div>
  );
}

