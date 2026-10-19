import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function ExerciseModal({ isOpen, onClose, onSave, editingExercise }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Güç',
    targetMuscle: '',
    duration: '',
    calories: '',
    aiNote: ''
  });

  useEffect(() => {
    if (editingExercise) {
      setFormData(editingExercise);
    } else {
      setFormData({
        title: '',
        category: 'Güç',
        targetMuscle: '',
        duration: '',
        calories: '',
        aiNote: ''
      });
    }
  }, [editingExercise, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 text-white relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4">
          {editingExercise ? 'Antrenmanı Düzenle' : 'Yeni Antrenman / Plan Ekle'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Başlık</label>
            <input 
              type="text" 
              required
              placeholder="Örn: AI Bacak Günü"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Kategori</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Güç">Güç</option>
                <option value="Kardiyo">Kardiyo</option>
                <option value="Esneklik">Esneklik</option>
                <option value="HIIT">HIIT</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Hedef Bölge</label>
              <input 
                type="text" 
                required
                placeholder="Örn: Bacak / Karın"
                value={formData.targetMuscle}
                onChange={(e) => setFormData({...formData, targetMuscle: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Süre (Sadece Sayı)</label>
              <input 
                type="text" 
                required
                placeholder="Örn: 40 dk"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Tahmini Kalori</label>
              <input 
                type="number" 
                required
                placeholder="Örn: 300"
                value={formData.calories}
                onChange={(e) => setFormData({...formData, calories: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">AI Notu / İpucu</label>
            <textarea 
              rows="2"
              placeholder="Örn: Set sonlarında tükenişe git."
              value={formData.aiNote}
              onChange={(e) => setFormData({...formData, aiNote: e.target.value})}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2.5 rounded-lg transition mt-2"
          >
            {editingExercise ? 'Güncelle' : 'Kaydet'}
          </button>
        </form>
      </div>
    </div>
  );
}