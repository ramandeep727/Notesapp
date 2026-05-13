"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Search, ChevronDown, Monitor, Smartphone, Layout } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';

const COVERS = [
  { id: 'no-cover', name: 'No Cover', color: '#ffffff', style: 'plain' },
  { id: 'simple-style', name: 'Simple Style', color: '#e0f2f1', style: 'simple' },
  { id: 'fresh-style', name: 'Fresh Style', color: '#f1f8e9', style: 'fresh' },
  { id: 'natural-wood', name: 'Natural Wood', color: '#d7ccc8', style: 'wood' },
  { id: 'academic-style', name: 'Academic Style', color: '#8d6e63', style: 'academic' },
  { id: 'minimalist-style', name: 'Minimalist Style', color: '#3b82f6', style: 'minimalist' },
  { id: 'leather-notebook', name: 'Leather Notebook', color: '#e67e22', style: 'leather' },
];

const PAPERS = [
  { id: 'blank', name: 'Blank Paper', icon: '📄' },
  { id: 'dotted', name: 'dot matrix paper', icon: '⋮' },
  { id: 'lined', name: 'Lined Paper', icon: '≡' },
  { id: 'graph', name: 'graph paper', icon: '▦' },
];

export const TemplateModal = () => {
  const { isTemplateModalOpen, setTemplateModalOpen } = useAppStore();
  const [activeTab, setActiveTab] = useState<'cover' | 'paper'>('cover');
  const [selectedCover, setSelectedCover] = useState(COVERS[5]);
  const [selectedPaper, setSelectedPaper] = useState(PAPERS[0]);
  const [paperColor, setPaperColor] = useState('#ffffff');
  const [lineSpacing, setLineSpacing] = useState(1);

  if (!isTemplateModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setTemplateModalOpen(false)}
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#1c1c1e] rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 dark:border-gray-800">
            <button 
              onClick={() => setTemplateModalOpen(false)}
              className="text-blue-500 font-medium hover:opacity-70 transition-opacity"
            >
              Cancel
            </button>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Template</h2>
            <button 
              onClick={() => setTemplateModalOpen(false)}
              className="text-blue-500 font-bold hover:opacity-70 transition-opacity"
            >
              Apply
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8">
            {/* Tab Switcher */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-2xl w-full max-w-[240px]">
                <button
                  onClick={() => setActiveTab('cover')}
                  className={cn(
                    "flex-1 py-2 text-sm font-semibold rounded-xl transition-all",
                    activeTab === 'cover' ? "bg-white dark:bg-gray-700 text-blue-600 shadow-sm" : "text-gray-500"
                  )}
                >
                  Cover
                </button>
                <button
                  onClick={() => setActiveTab('paper')}
                  className={cn(
                    "flex-1 py-2 text-sm font-semibold rounded-xl transition-all",
                    activeTab === 'paper' ? "bg-white dark:bg-gray-700 text-blue-600 shadow-sm" : "text-gray-500"
                  )}
                >
                  Paper
                </button>
              </div>
            </div>

            {/* Preview Section */}
            <div className="flex justify-center gap-12 mb-10">
              <div className="flex flex-col items-center gap-3">
                <div 
                  className="w-[100px] h-[130px] rounded-r-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden relative"
                  style={{ backgroundColor: selectedCover.color }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-black/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <span className="text-[10px] font-bold opacity-20 uppercase tracking-tighter">Wellnote</span>
                  </div>
                </div>
                <span className="text-xs text-gray-400 font-medium">Cover</span>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <div 
                  className={cn(
                    "w-[100px] h-[130px] rounded shadow-md border border-gray-200 dark:border-gray-700 relative",
                    `paper-${selectedPaper.id}`
                  )}
                  style={{ backgroundColor: paperColor }}
                >
                   {/* Paper Content Preview */}
                </div>
                <span className="text-xs text-gray-400 font-medium">Paper</span>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-6">
               <div className="flex items-center justify-between py-4 border-t border-b border-gray-100 dark:border-gray-800">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Size</span>
                  <div className="flex items-center gap-4">
                     <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium">
                        A4 <ChevronDown size={14} />
                     </div>
                     <div className="flex p-0.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <button className="p-1.5 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                           <Layout size={16} className="text-gray-600 dark:text-gray-300" />
                        </button>
                        <button className="p-1.5">
                           <Monitor size={16} className="text-gray-400" />
                        </button>
                     </div>
                  </div>
               </div>

               {activeTab === 'cover' ? (
                 <>
                   <div className="flex items-center justify-between">
                     <span className="text-gray-700 dark:text-gray-300 font-medium">Set the home page as the cover</span>
                     <div className="w-12 h-6 bg-black dark:bg-white rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white dark:bg-black rounded-full" />
                     </div>
                   </div>

                   <div className="mt-8">
                     <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider">Simple Cover</h3>
                     <div className="grid grid-cols-4 gap-6">
                        {COVERS.slice(0, 4).map((cover) => (
                          <button
                            key={cover.id}
                            onClick={() => setSelectedCover(cover)}
                            className="flex flex-col items-center gap-3 group"
                          >
                            <div 
                              className={cn(
                                "w-full aspect-[3/4] rounded-r-lg shadow-md transition-all group-hover:scale-105 relative",
                                selectedCover.id === cover.id ? "ring-2 ring-blue-500 ring-offset-4" : "border border-gray-100 dark:border-gray-800"
                              )}
                              style={{ backgroundColor: cover.color }}
                            >
                               <div className="absolute left-0 top-0 bottom-0 w-1 bg-black/10" />
                               {selectedCover.id === cover.id && (
                                 <div className="absolute bottom-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white">
                                    <Check size={12} strokeWidth={3} />
                                 </div>
                               )}
                            </div>
                            <span className="text-[11px] font-bold text-gray-600 dark:text-gray-400 text-center leading-tight">
                              {cover.name}
                            </span>
                          </button>
                        ))}
                     </div>
                   </div>

                   <div className="mt-8">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Custom Cover</h3>
                      <button className="w-full h-12 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl flex items-center justify-center text-gray-400 text-sm font-medium hover:border-blue-500 hover:text-blue-500 transition-all">
                         + Add Image
                      </button>
                   </div>
                 </>
               ) : (
                 <>
                   <div className="space-y-6">
                      <div className="flex items-center justify-between">
                         <span className="text-gray-700 dark:text-gray-300 font-medium">Background Color</span>
                         <div className="flex items-center gap-3">
                            <button 
                              onClick={() => setPaperColor('#ffffff')}
                              className={cn("w-6 h-6 rounded-full border border-gray-200", paperColor === '#ffffff' && "ring-2 ring-blue-500 ring-offset-2")}
                            />
                            <button 
                              onClick={() => setPaperColor('#1c1c1e')}
                              className={cn("w-6 h-6 rounded-full bg-[#1c1c1e] border border-gray-700", paperColor === '#1c1c1e' && "ring-2 ring-blue-500 ring-offset-2")}
                            />
                            <button 
                              onClick={() => setPaperColor('#fefaf0')}
                              className={cn("w-6 h-6 rounded-full bg-[#fefaf0] border border-gray-200", paperColor === '#fefaf0' && "ring-2 ring-blue-500 ring-offset-2")}
                            />
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-[10px] font-bold text-gray-500 ml-2">
                               {paperColor.toUpperCase()} <span className="opacity-40">100%</span>
                            </div>
                         </div>
                      </div>

                      <div className="flex items-center justify-between">
                         <span className="text-gray-700 dark:text-gray-300 font-medium">Spacing</span>
                         <div className="flex items-center gap-4 flex-1 max-w-[200px]">
                            <input 
                              type="range" 
                              min="0.5" 
                              max="2" 
                              step="0.1" 
                              value={lineSpacing}
                              onChange={(e) => setLineSpacing(parseFloat(e.target.value))}
                              className="w-full accent-blue-500"
                            />
                            <div className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-[10px] font-bold text-gray-500 whitespace-nowrap min-w-[90px] text-center">
                               Line Spacing {lineSpacing}
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="mt-8">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider">Basic Template</h3>
                      <div className="grid grid-cols-4 gap-6">
                        {PAPERS.map((paper) => (
                          <button
                            key={paper.id}
                            onClick={() => setSelectedPaper(paper)}
                            className="flex flex-col items-center gap-3 group"
                          >
                            <div 
                              className={cn(
                                "w-full aspect-[3/4] rounded-md shadow-md transition-all group-hover:scale-105 relative",
                                selectedPaper.id === paper.id ? "ring-2 ring-blue-500 ring-offset-4" : "border border-gray-100 dark:border-gray-800",
                                `paper-${paper.id}`
                              )}
                              style={{ backgroundColor: paperColor }}
                            >
                               {selectedPaper.id === paper.id && (
                                 <div className="absolute bottom-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white">
                                    <Check size={12} strokeWidth={3} />
                                 </div>
                               )}
                            </div>
                            <span className="text-[11px] font-bold text-gray-600 dark:text-gray-400 text-center leading-tight lowercase">
                              {paper.name}
                            </span>
                          </button>
                        ))}
                      </div>
                   </div>
                 </>
               )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
