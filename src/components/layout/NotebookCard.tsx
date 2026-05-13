"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface NotebookCardProps {
  id: string;
  title: string;
  coverStyle: string;
  coverColor: string;
  is_favorite: boolean;
  notes_count: number;
  last_modified: string;
}

export const NotebookCard = ({
  id,
  title,
  coverStyle,
  coverColor,
  is_favorite,
  notes_count,
  last_modified,
}: NotebookCardProps) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      onClick={() => router.push(`/notebook/${id}`)}
      className="group cursor-pointer flex flex-col gap-3"
    >
      <div className="notebook-card relative">
        <div 
          className="notebook-inner aspect-[3/4] relative overflow-hidden"
          style={{ backgroundColor: coverColor }}
        >
          {/* Spine Texture */}
          <div className="absolute left-0 top-0 bottom-0 w-[12%] bg-black/10 border-r border-white/5 z-10" />
          <div className="absolute left-[2%] top-0 bottom-0 w-[0.5px] bg-white/20 z-20" />
          
          {/* Cover Texture Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/10 mix-blend-overlay pointer-events-none" />
          
          {/* WellNote Branding */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
             <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-1">
                Wellnote
             </div>
             <div className="text-[8px] font-medium text-white/30 uppercase tracking-widest mb-6">
                Notebook
             </div>
             
             <h3 className="text-white font-bold text-sm leading-tight line-clamp-3 drop-shadow-sm uppercase tracking-wide px-2">
                {title}
             </h3>
          </div>

          {/* Handwriting Preview Mockup */}
          {notes_count > 10 && (
             <div className="absolute inset-0 opacity-20 pointer-events-none rotate-3 translate-x-2 translate-y-4">
                <svg width="100%" height="100%" viewBox="0 0 100 120">
                   <path d="M10 20 Q 30 10 50 20 T 90 20" fill="none" stroke="white" strokeWidth="1" />
                   <path d="M15 40 Q 35 30 55 40 T 85 45" fill="none" stroke="white" strokeWidth="0.8" />
                   <path d="M12 60 Q 32 50 52 65 T 92 60" fill="none" stroke="white" strokeWidth="1.2" />
                </svg>
             </div>
          )}

          {/* Favorite Star */}
          {is_favorite && (
            <div className="absolute top-2 right-2 z-20">
              <Star size={16} fill="white" className="text-white drop-shadow-md" />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-0.5 items-center text-center">
        <h4 className="text-[14px] font-medium text-gray-800 dark:text-gray-200 truncate w-full px-2">
          {title}
        </h4>
        <p className="text-[10px] font-medium text-gray-400">
          {last_modified}
        </p>
      </div>
    </motion.div>
  );
};
