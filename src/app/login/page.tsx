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
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full p-12 bg-white dark:bg-[#1c1c1e] rounded-[40px] shadow-2xl border border-gray-100 dark:border-gray-800 space-y-10"
      >
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-blue-500 rounded-[24px] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20">
            <Sparkles className="text-white" size={40} strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">WellNotes</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Your premium digital library awaits</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest px-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="email" 
                required
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-gray-900 border border-transparent rounded-[20px] focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium disabled:opacity-50"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-500 text-white rounded-[20px] font-bold shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:bg-gray-300 disabled:shadow-none"
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
              />
            ) : (
              <>
                Continue with Email
                <ArrowRight size={20} strokeWidth={2.5} />
              </>
            )}
          </button>
        </form>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100 dark:border-gray-800"></div>
          </div>
          <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-[0.2em]">
            <span className="bg-white dark:bg-[#1c1c1e] px-4 text-gray-400">Or connect with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            disabled={loading}
            onClick={handleSocialLogin}
            className="flex items-center justify-center gap-3 py-4 bg-gray-50 dark:bg-gray-900 rounded-[20px] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Google</span>
          </button>
          <button 
            disabled={loading}
            onClick={handleSocialLogin}
            className="flex items-center justify-center gap-3 py-4 bg-gray-50 dark:bg-gray-900 rounded-[20px] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            <img src="https://www.svgrepo.com/show/448204/apple.svg" className="w-5 h-5 dark:invert" alt="Apple" />
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Apple</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}


