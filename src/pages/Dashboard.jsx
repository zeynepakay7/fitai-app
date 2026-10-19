import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ExerciseCard from '../components/ExerciseCard';
import ExerciseModal from '../components/ExerciseModal';
import { INITIAL_EXERCISES } from '../interfaces/types';
import { Plus, Search } from 'lucide-react';

export default function Dashboard() {
  const [exercises, setExercises] = useState(() => {
    const saved = localStorage.getItem('fitai_exercises');
    return saved ? JSON.parse(saved) : INITIAL_EXERCISES;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);

  useEffect(() => {
    localStorage.setItem('fitai_exercises', JSON.stringify(exercises));
  }, [exercises]);

  const handleSaveExercise = (exerciseData) => {
    if (editingExercise) {
      setExercises(exercises.map(item => item.id === editingExercise.id ? { ...exerciseData, id: item.id } : item));
    } else {
      const newExercise = {
        ...exerciseData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      setExercises([newExercise, ...exercises]);
    }
    setEditingExercise(null);
  };

  const handleDeleteExercise = (id) => {
    if (window.confirm('Bu egzersizi silmek istediğinizden emin misiniz?')) {
      setExercises(exercises.filter(item => item.id !== id));
    }
  };

  const handleOpenEditModal = (exercise) => {
    setEditingExercise(exercise);
    setIsModalOpen(true);
  };

  const filteredExercises = exercises.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.targetMuscle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tümü' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-12">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div>
            <h1 className="text-2xl font-bold">Antrenman Paneli</h1>
            <p className="text-slate-400 text-sm mt-1">
              Yapay zeka ile kişiselleştirilmiş egzersizlerinizi yönetin ve takip edin.
            </p>
          </div>
          <button 
            onClick={() => { setEditingExercise(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-4 py-2.5 rounded-xl transition duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>Yeni Program Ekle</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input 
              type="text"
              placeholder="Antrenman veya kas grubu ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {['Tümü', 'Güç', 'Kardiyo', 'Esneklik', 'HIIT'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  selectedCategory === cat 
                    ? 'bg-emerald-500 text-slate-950' 
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredExercises.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl">
            <p className="text-slate-400 text-sm">Aradığınız kriterlere uygun antrenman bulunamadı.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredExercises.map(item => (
              <ExerciseCard 
                key={item.id} 
                exercise={item} 
                onDelete={handleDeleteExercise}
                onEdit={handleOpenEditModal}
              />
            ))}
          </div>
        )}
      </main>

      <ExerciseModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveExercise}
        editingExercise={editingExercise}
      />
    </div>
  );
}