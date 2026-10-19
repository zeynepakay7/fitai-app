import React from 'react';
import { Trash2, Edit3, Clock, Flame, BrainCircuit } from 'lucide-react';

export default function ExerciseCard({ exercise, onDelete, onEdit }) {
  return (
    <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5 hover:border-emerald-500/50 transition duration-300 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800/50">
            {exercise.category}
          </span>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => onEdit(exercise)}
              className="p-1.5 text-slate-400 hover:text-amber-400 transition"
              title="Düzenle"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onDelete(exercise.id)}
              className="p-1.5 text-slate-400 hover:text-rose-400 transition"
              title="Sil"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h3 className="text-lg font-bold text-white mb-2">{exercise.title}</h3>
        <p className="text-slate-400 text-sm mb-4">Hedef Bölge: <span className="text-slate-200">{exercise.targetMuscle}</span></p>

        <div className="flex items-center gap-4 text-xs text-slate-300 mb-4 bg-slate-900/50 p-2.5 rounded-lg">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{exercise.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>{exercise.calories} kcal</span>
          </div>
        </div>

        {exercise.aiNote && (
          <div className="bg-emerald-950/30 border border-emerald-800/30 p-3 rounded-lg text-xs text-emerald-300 flex items-start gap-2">
            <BrainCircuit className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>AI Tavsiyesi:</strong> {exercise.aiNote}</span>
          </div>
        )}
      </div>
    </div>
  );
}