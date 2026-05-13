"use client";

import React, { useState } from 'react';
import { Sparkles, Send, Brain, FileSearch, Zap, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export const AISidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [query, setQuery] = useState('');
  const [messages] = useState([
    { role: 'assistant', content: "Hello! I'm your WellNotes AI assistant. How can I help you with your notes today?" }
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
          className="fixed right-0 top-0 h-screen w-96 bg-white dark:bg-[#1c1c1e] border-l border-gray-200 dark:border-gray-800 z-[100] flex flex-col shadow-2xl"
        >
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="text-blue-500" size={20} />
              <h2 className="font-bold text-lg text-gray-900 dark:text-white">WellNotes AI</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-400">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-auto p-6 space-y-8">
            <div className="grid grid-cols-3 gap-3">
              {features.map(f => (
                <button key={f.name} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-transparent hover:border-blue-500/30 transition-all group shadow-sm">
                  <f.icon className={cn(f.color, "group-hover:scale-110 transition-transform")} size={20} />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{f.name}</span>
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={cn(
                  "p-4 rounded-2xl max-w-[85%]",
                  m.role === 'assistant' 
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-tl-none" 
                    : "bg-blue-500 text-white ml-auto rounded-tr-none shadow-md"
                )}>
                  <p className="text-sm leading-relaxed font-medium">{m.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 border-t border-gray-100 dark:border-gray-800">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask WellNotes AI..."
                className="w-full pl-4 pr-12 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all">
                <Send size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

