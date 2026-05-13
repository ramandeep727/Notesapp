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
  Plus
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AISidebar } from '@/components/layout/AISidebar';
import { Sparkles } from 'lucide-react';

export default function NotebookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [mode, setMode] = useState<'handwriting' | 'richtext'>('handwriting');
  const [paperStyle, setPaperStyle] = useState<'ruled' | 'grid' | 'dots' | 'blank'>('ruled');
  const [aiSidebarOpen, setAiSidebarOpen] = useState(false);
  const [pageBrowserOpen, setPageBrowserOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState([
    { id: '1', title: 'UPSC History Notes', active: true },
    { id: '2', title: 'Ancient India Map', active: false },
  ]);

  return (
    <div className="h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="glass px-6 py-3 flex items-center justify-between z-20">
        <div className="flex items-center gap-4 flex-1">
          <button 
            onClick={() => router.push('/')}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          
          {/* Wellnotes Style Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto max-w-xl">
            {tabs.map((tab, i) => (
              <div 
                key={tab.id}
                onClick={() => setActiveTab(i)}
                className={cn(
                  "px-4 py-2 rounded-t-xl text-sm font-medium cursor-pointer transition-all flex items-center gap-2 min-w-[150px] border-b-2",
                  activeTab === i 
                    ? "bg-white dark:bg-slate-900 border-brand-primary text-brand-primary shadow-[0_-4px_10px_rgba(0,0,0,0.05)]" 
                    : "text-slate-400 hover:text-slate-600 border-transparent"
                )}
              >
                <FileText size={14} />
                <span className="truncate">{tab.title}</span>
              </div>
            ))}
            <button className="p-2 text-slate-400 hover:text-brand-primary">
              <Plus size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setMode('handwriting')}
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-xl transition-all text-sm font-medium",
              mode === 'handwriting' 
                ? "bg-white dark:bg-slate-700 shadow-sm text-brand-primary" 
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            )}
          >
            <PenTool size={16} />
            Handwriting
          </button>
          <button
            onClick={() => setMode('richtext')}
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-xl transition-all text-sm font-medium",
              mode === 'richtext' 
                ? "bg-white dark:bg-slate-700 shadow-sm text-brand-primary" 
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            )}
          >
            <Type size={16} />
            Rich Text
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-600 dark:text-slate-400">
            <Share2 size={20} />
          </button>
          <button 
            onClick={() => setPageBrowserOpen(!pageBrowserOpen)}
            className={cn(
              "p-2.5 rounded-xl transition-colors",
              pageBrowserOpen ? "bg-brand-primary/10 text-brand-primary" : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
            )}
          >
            <Layout size={20} />
          </button>
          <button className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-600 dark:text-slate-400">
            <Layers size={20} />
          </button>
          <button 
            onClick={() => setAiSidebarOpen(true)}
            className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-brand-primary"
          >
            <Sparkles size={20} />
          </button>
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-800" />
          <button 
            onClick={() => {
              const btn = document.activeElement as HTMLButtonElement;
              btn.innerText = "Saved!";
              setTimeout(() => btn.innerText = "Save Note", 2000);
            }}
            className="bg-brand-primary text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            Save Note
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Page Browser (Wellnotes style) */}
        <AnimatePresence>
          {pageBrowserOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 240, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="glass border-r flex flex-col"
            >
              <div className="p-4 border-b font-bold text-xs uppercase tracking-widest text-slate-400">Pages</div>
              <div className="flex-1 overflow-auto p-4 space-y-4">
                {[1, 2, 3, 4, 5].map(p => (
                  <div key={p} className={cn(
                    "aspect-[3/4] rounded-lg border-2 transition-all cursor-pointer overflow-hidden",
                    p === 4 ? "border-brand-primary ring-2 ring-brand-primary/20" : "border-slate-100 dark:border-slate-800 hover:border-slate-300"
                  )}>
                    <div className="w-full h-full bg-white dark:bg-slate-900 relative">
                       <div className="absolute inset-0 paper-ruled opacity-50" />
                       <div className="absolute bottom-2 right-2 text-[10px] font-bold text-slate-300">{p}</div>
                    </div>
                  </div>
                ))}
                <button className="w-full aspect-[3/4] rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-slate-400 hover:text-brand-primary transition-colors">
                   <Plus size={24} />
                   <span className="text-[10px] font-bold mt-2">ADD PAGE</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-1 overflow-hidden relative bg-slate-50/50 dark:bg-slate-900/50">
          <AnimatePresence mode="wait">
          {mode === 'handwriting' ? (
            <motion.div
              key="handwriting"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full"
            >
              <HandwritingCanvas paperStyle={paperStyle} />
            </motion.div>
          ) : (
            <motion.div
              key="richtext"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              <RichTextEditor />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Paper Style Quick Toggle (Floating) */}
        <div className="absolute right-8 bottom-8 flex flex-col gap-2">
           <div className="glass p-2 rounded-2xl flex flex-col gap-1 shadow-2xl">
              {(['ruled', 'grid', 'dots', 'blank'] as const).map(style => (
                <button
                  key={style}
                  onClick={() => setPaperStyle(style)}
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                    paperStyle === style 
                      ? "bg-brand-primary text-white" 
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                  )}
                  title={style.charAt(0).toUpperCase() + style.slice(1)}
                >
                  <FileText size={18} />
                </button>
              ))}
           </div>
        </div>

        <AISidebar isOpen={aiSidebarOpen} onClose={() => setAiSidebarOpen(false)} />
      </main>
      </div>
    </div>
  );
}
