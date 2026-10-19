import React from 'react';
import { Dumbbell, Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-white px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="bg-emerald-500 p-2 rounded-lg text-slate-950">
          <Dumbbell className="w-6 h-6" />
        </div>
        <span className="font-bold text-xl tracking-wide flex items-center gap-1">
          Fit<span className="text-emerald-400">AI</span>
          <Sparkles className="w-4 h-4 text-emerald-400 inline" />
        </span>
      </div>
      <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
        Yapay Zeka Koçu Aktif
      </span>
    </nav>
  );
}