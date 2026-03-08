import React, { useState } from 'react';
import { motion, Reorder } from 'motion/react';
import { Beaker, CheckCircle2, AlertCircle, RefreshCcw } from 'lucide-react';
import { cn } from '@/src/utils/cn';

const METALS = [
  { id: 'na', name: 'Sodium (Na)', category: 'electro', hint: 'Highly reactive metal.' },
  { id: 'fe', name: 'Iron (Fe)', category: 'pyro', hint: 'Extracted using coke in a furnace.' },
  { id: 'cu', name: 'Copper (Cu)', category: 'hydro', hint: 'Can be displaced from solution.' },
  { id: 'al', name: 'Aluminium (Al)', category: 'electro', hint: 'Requires electrolysis of alumina.' },
  { id: 'zn', name: 'Zinc (Zn)', category: 'pyro', hint: 'Often roasted then reduced.' },
];

const CATEGORIES = [
  { id: 'pyro', name: 'Pyrometallurgy', color: 'border-orange-500/30 bg-orange-500/5 text-orange-400' },
  { id: 'hydro', name: 'Hydrometallurgy', color: 'border-cyan-500/30 bg-cyan-500/5 text-cyan-400' },
  { id: 'electro', name: 'Electrometallurgy', color: 'border-yellow-500/30 bg-yellow-500/5 text-yellow-400' },
];

export default function LabGame() {
  const [items, setItems] = useState(METALS);
  const [results, setResults] = useState<Record<string, boolean | null>>({});
  const [showFeedback, setShowFeedback] = useState(false);

  const handleDrop = (itemId: string, categoryId: string) => {
    const metal = METALS.find(m => m.id === itemId);
    const isCorrect = metal?.category === categoryId;
    setResults(prev => ({ ...prev, [itemId]: isCorrect }));
  };

  const reset = () => {
    setResults({});
    setShowFeedback(false);
    setItems([...METALS].sort(() => Math.random() - 0.5));
  };

  const score = Object.values(results).filter(v => v === true).length;
  const finished = Object.keys(results).length === METALS.length;

  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex p-3 rounded-2xl bg-teal-500/10 text-teal-400 mb-4">
          <Beaker size={32} />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">Virtual Lab Simulation</h2>
        <p className="text-zinc-400">Drag each metal to its correct extraction category. Test your metallurgical intuition!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Metals List */}
        <div className="space-y-4">
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-6">Metals to Process</h3>
          {items.map((metal) => (
            <motion.div
              key={metal.id}
              draggable
              onDragStart={(e) => e.dataTransfer.setData('metalId', metal.id)}
              className={cn(
                "p-4 rounded-xl border border-zinc-800 bg-zinc-900 cursor-grab active:cursor-grabbing flex justify-between items-center transition-all",
                results[metal.id] === true && "border-green-500/50 bg-green-500/5 opacity-50 pointer-events-none",
                results[metal.id] === false && "border-red-500/50 bg-red-500/5"
              )}
            >
              <span className="font-bold text-white">{metal.name}</span>
              {results[metal.id] === true && <CheckCircle2 size={18} className="text-green-400" />}
              {results[metal.id] === false && <AlertCircle size={18} className="text-red-400" />}
            </motion.div>
          ))}
        </div>

        {/* Categories */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const metalId = e.dataTransfer.getData('metalId');
                handleDrop(metalId, cat.id);
              }}
              className={cn(
                "h-64 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center p-6 text-center transition-all",
                cat.color
              )}
            >
              <h4 className="font-bold mb-2">{cat.name}</h4>
              <p className="text-[10px] opacity-60 uppercase tracking-widest">Drop Here</p>
            </div>
          ))}
        </div>
      </div>

      {finished && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 p-8 bg-zinc-900 border border-zinc-800 rounded-3xl text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-2">Lab Report Complete</h3>
          <p className="text-zinc-400 mb-6">You correctly identified {score} out of {METALS.length} extraction methods.</p>
          <button 
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-full transition-colors font-medium"
          >
            <RefreshCcw size={18} />
            Try Again
          </button>
        </motion.div>
      )}
    </section>
  );
}
