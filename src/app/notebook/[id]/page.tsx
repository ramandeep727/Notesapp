"use client";

import React, { useState } from 'react';
import { HandwritingCanvas } from '@/components/editor/HandwritingCanvas';
import { RichTextEditor } from '@/components/editor/RichTextEditor';
import { 
  Type, 
  PenTool, 
  ChevronLeft, 
  Share2, 
  Layout, 
  MoreHorizontal,
  FileText,
  Layers,
  Plus,
  Sparkles,
  Settings2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AISidebar } from '@/components/layout/AISidebar';

export default function NotebookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [mode, setMode] = useState<'handwriting' | 'richtext'>('handwriting');
  const [paperStyle, setPaperStyle] = useState<'blank' | 'dotted' | 'lined' | 'graph'>('blank');
  const [paperColor, setPaperColor] = useState('#ffffff');
  const [paperSpacing, setPaperSpacing] = useState(1);
  const [aiSidebarOpen, setAiSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [tabs] = useState([
    { id: '1', title: 'Reasoning Notes', active: true },
    { id: '2', title: 'Daily Practice', active: false },
  ]);

  return (
    <div className="h-screen flex flex-col bg-[#f0f0f2] dark:bg-[#000000]">
      {/* Premium Header */}
      <header className="bg-white/80 dark:bg-black/80 backdrop-blur-md px-6 py-2 flex items-center justify-between z-20 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-4 flex-1">
          <button 
            onClick={() => router.push('/')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors text-gray-500"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex items-center gap-1">
            {tabs.map((tab, i) => (
              <div 
                key={tab.id}
                onClick={() => setActiveTab(i)}
                className={cn(
                  "px-4 py-2 rounded-xl text-[13px] font-semibold cursor-pointer transition-all flex items-center gap-2 min-w-[120px]",
                  activeTab === i 
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" 
                    : "text-gray-400 hover:text-gray-600"
                )}
              >
                <FileText size={14} className={activeTab === i ? "text-blue-500" : ""} />
                <span className="truncate">{tab.title}</span>
              </div>
            ))}
            <button className="p-2 text-gray-400 hover:text-blue-500">
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl mx-8">
          <button
            onClick={() => setMode('handwriting')}
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-lg transition-all text-[13px] font-bold",
              mode === 'handwriting' 
                ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600" 
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            <PenTool size={16} />
            Draw
          </button>
          <button
            onClick={() => setMode('richtext')}
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-lg transition-all text-[13px] font-bold",
              mode === 'richtext' 
                ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600" 
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            <Type size={16} />
            Write
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors text-gray-500">
            <Share2 size={20} />
          </button>
          <button 
             onClick={() => setAiSidebarOpen(true)}
             className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors text-blue-500"
          >
            <Sparkles size={20} />
          </button>
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-800 mx-2" />
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors text-gray-500">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {mode === 'handwriting' ? (
            <motion.div
              key="handwriting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <HandwritingCanvas 
                paperStyle={paperStyle} 
                paperColor={paperColor}
                paperSpacing={paperSpacing}
              />
            </motion.div>
          ) : (
            <motion.div
              key="richtext"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full bg-white dark:bg-black p-8 overflow-auto"
            >
              <div className="max-w-4xl mx-auto">
                 <RichTextEditor />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Paper Settings */}
        <div className="absolute left-8 bottom-8 flex flex-col gap-3 z-30">
           <div className="glass-toolbar p-2 rounded-2xl flex flex-col gap-2 shadow-2xl border border-white/20">
              {(['blank', 'dotted', 'lined', 'graph'] as const).map(style => (
                <button
                  key={style}
                  onClick={() => setPaperStyle(style)}
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                    paperStyle === style 
                      ? "bg-blue-500 text-white shadow-lg scale-110" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"
                  )}
                >
                  <div className={cn(
                    "w-5 h-5 border-2 rounded-sm",
                    style === 'blank' ? "border-current" : 
                    style === 'dotted' ? "border-dotted border-current" :
                    style === 'lined' ? "border-current bg-[linear-gradient(transparent_50%,currentColor_50%)] bg-[length:100%_4px]" :
                    "bg-[linear-gradient(90deg,currentColor_1px,transparent_1px),linear-gradient(currentColor_1px,transparent_1px)] bg-[length:4px_4px]"
                  )} />
                </button>
              ))}
              <div className="h-px bg-gray-200 dark:bg-gray-800 mx-2 my-1" />
              <button 
                onClick={() => setPaperColor(paperColor === '#ffffff' ? '#fefaf0' : paperColor === '#fefaf0' ? '#1c1c1e' : '#ffffff')}
                className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-all"
              >
                 <Settings2 size={20} />
              </button>
           </div>
        </div>

        <AISidebar isOpen={aiSidebarOpen} onClose={() => setAiSidebarOpen(false)} />
      </div>
    </div>
  );
}

