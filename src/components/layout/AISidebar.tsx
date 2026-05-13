"use client";

import React, { useState } from 'react';
import { Sparkles, Send, Brain, FileSearch, Zap, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export const AISidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm your Lumina AI assistant. How can I help you with your notes today?" }
  ]);

  const features = [
    { name: 'Summarize', icon: FileSearch, color: 'text-blue-500' },
    { name: 'Flashcards', icon: Brain, color: 'text-purple-500' },
    { name: 'Quiz Me', icon: Zap, color: 'text-orange-500' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 400 }}
          animate={{ x: 0 }}
          exit={{ x: 400 }}
          className="fixed right-0 top-0 h-screen w-96 glass border-l z-[100] flex flex-col shadow-2xl"
        >
          <div className="p-6 border-b flex items-center justify-between bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5">
            <div className="flex items-center gap-2">
              <Sparkles className="text-brand-primary animate-pulse" size={20} />
              <h2 className="font-bold text-lg">Lumina AI</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-auto p-6 space-y-6">
            <div className="grid grid-cols-3 gap-3">
              {features.map(f => (
                <button key={f.name} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-brand-primary/30 transition-all group shadow-sm">
                  <f.icon className={cn(f.color, "group-hover:scale-110 transition-transform")} size={20} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">{f.name}</span>
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={cn(
                  "p-4 rounded-2xl max-w-[85%]",
                  m.role === 'assistant' 
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-tl-none" 
                    : "bg-brand-primary text-white ml-auto rounded-tr-none shadow-md"
                )}>
                  <p className="text-sm leading-relaxed">{m.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 border-t bg-white dark:bg-slate-950">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask Lumina AI..."
                className="w-full pl-4 pr-12 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all shadow-inner"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-primary text-white rounded-xl shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all">
                <Send size={18} />
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-400 mt-3">Lumina AI can make mistakes. Verify important info.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
