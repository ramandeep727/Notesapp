"use client";

import React from 'react';
import { 
  Plus, 
  Search, 
  LayoutGrid, 
  List, 
  Flame, 
  Timer, 
  Calendar,
  MoreVertical,
  BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const { notebooks, user } = useAppStore();

  const stats = [
    { label: 'Study Streak', value: '12 Days', icon: Flame, color: 'text-orange-500' },
    { label: 'Pomodoro', value: '2.5h Today', icon: Timer, color: 'text-blue-500' },
    { label: 'Notes Today', value: '4 Pages', icon: Calendar, color: 'text-purple-500' },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Welcome back, {user?.full_name || 'Scholar'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Your digital library is ready for some new ideas.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none transition-all w-64 shadow-sm"
            />
          </div>
          <div className="w-10 h-10 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary font-bold">
            {user?.full_name?.charAt(0) || 'S'}
          </div>
        </div>
      </header>

      {/* Stats Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6 rounded-2xl flex items-center gap-4"
          >
            <div className={cn("p-3 rounded-xl bg-slate-50 dark:bg-slate-950 shadow-inner", stat.color)}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Notebooks Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <BookOpen size={20} className="text-brand-primary" />
            Recent Notebooks
          </h2>
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
            <button className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-md"><LayoutGrid size={16} /></button>
            <button className="p-1.5 text-slate-400"><List size={16} /></button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {/* New Notebook Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/notebook/new')}
            className="aspect-[3/4] rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-brand-primary hover:border-brand-primary/50 transition-all duration-300 group"
          >
            <div className="p-3 rounded-full bg-slate-50 dark:bg-slate-900 group-hover:bg-brand-primary/10 transition-colors">
              <Plus size={32} />
            </div>
            <span className="font-medium">Create New</span>
          </motion.button>

          {/* Placeholder Notebooks */}
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => router.push(`/notebook/${i}`)}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] rounded-2xl shadow-lg relative overflow-hidden transition-all duration-300">
                {/* Notebook Cover */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br",
                  i === 1 ? "from-brand-primary to-brand-accent" :
                  i === 2 ? "from-emerald-400 to-teal-500" :
                  i === 3 ? "from-orange-400 to-rose-500" :
                  "from-indigo-500 to-blue-600"
                )} />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute left-2 top-0 bottom-0 w-1.5 bg-black/10 border-r border-white/10" />
                
                <div className="absolute top-4 right-4">
                  <button className="p-1 rounded-lg bg-white/20 backdrop-blur-md text-white border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical size={16} />
                  </button>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-4 pt-8 bg-gradient-to-t from-black/40 to-transparent">
                  <p className="text-white font-bold leading-tight line-clamp-2">
                    {i === 1 ? 'UPSC History Notes' : 
                     i === 2 ? 'Physics Lab' : 
                     i === 3 ? 'Daily Journal' : 
                     'Project Lumina'}
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-xs text-slate-400 font-medium">Modified 2h ago</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Heatmap/Activity Placeholder */}
      <section className="glass p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-800 dark:text-slate-100">Learning Activity</h3>
          <p className="text-sm text-brand-primary font-medium cursor-pointer hover:underline">View Analytics</p>
        </div>
        <div className="h-32 w-full flex gap-2 overflow-hidden items-end pb-2">
          {Array.from({ length: 30 }).map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "flex-1 rounded-t-sm transition-all duration-500",
                Math.random() > 0.5 ? "bg-brand-primary" : "bg-slate-100 dark:bg-slate-800"
              )}
              style={{ height: `${Math.random() * 100}%` }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
