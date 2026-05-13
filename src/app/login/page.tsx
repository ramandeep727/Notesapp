"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    router.push('/');
  };

  const handleSocialLogin = () => {
    setLoading(true);
    setTimeout(() => router.push('/'), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass p-8 rounded-3xl shadow-2xl space-y-8"
      >
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="text-brand-primary" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Welcome to Lumina</h1>
          <p className="text-slate-500 dark:text-slate-400">Sign in to sync your notes across devices</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400 px-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="email" 
                required
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none transition-all shadow-sm disabled:opacity-50"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brand-primary text-white rounded-xl font-bold shadow-lg shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:bg-slate-400 disabled:shadow-none"
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <>
                Continue with Email
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-slate-900 px-2 text-slate-500">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            disabled={loading}
            onClick={handleSocialLogin}
            className="flex items-center justify-center gap-2 py-3 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors disabled:opacity-50"
          >
            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
            <span className="text-sm font-medium">Google</span>
          </button>
          <button 
            disabled={loading}
            onClick={handleSocialLogin}
            className="flex items-center justify-center gap-2 py-3 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors disabled:opacity-50"
          >
            <img src="https://www.svgrepo.com/show/448204/apple.svg" className="w-5 h-5 dark:invert" alt="Apple" />
            <span className="text-sm font-medium">Apple</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

