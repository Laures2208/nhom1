import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, Target, Database, X } from 'lucide-react';
import { cn } from '@/src/utils/cn';

const ORES = [
  {
    id: 'hematite',
    name: 'Hematite',
    formula: 'Fe₂O₃',
    metal: 'Iron (Fe)',
    color: 'bg-red-900/20 border-red-500/30',
    accent: 'text-red-400',
    description: 'The primary iron ore, characterized by its reddish-brown color and high iron content.',
    method: 'Pyrometallurgy (Blast Furnace)',
    stats: { extraction: '70%', purity: '98%', energy: 'High' }
  },
  {
    id: 'bauxite',
    name: 'Bauxite',
    formula: 'Al₂O₃·nH₂O',
    metal: 'Aluminium (Al)',
    color: 'bg-orange-900/20 border-orange-500/30',
    accent: 'text-orange-400',
    description: 'The main source of aluminium, requiring significant energy for electrolytic reduction.',
    method: 'Electrometallurgy (Hall-Héroult)',
    stats: { extraction: '95%', purity: '99.9%', energy: 'Very High' }
  },
  {
    id: 'chalcopyrite',
    name: 'Chalcopyrite',
    formula: 'CuFeS₂',
    metal: 'Copper (Cu)',
    color: 'bg-yellow-900/20 border-yellow-500/30',
    accent: 'text-yellow-400',
    description: 'A brassy yellow mineral that is the most important ore of copper.',
    method: 'Hydrometallurgy / Pyrometallurgy',
    stats: { extraction: '85%', purity: '99.5%', energy: 'Medium' }
  },
  {
    id: 'sphalerite',
    name: 'Sphalerite',
    formula: 'ZnS',
    metal: 'Zinc (Zn)',
    color: 'bg-zinc-800/50 border-zinc-600/30',
    accent: 'text-zinc-300',
    description: 'The chief ore of zinc, often found in association with galena.',
    method: 'Pyrometallurgy (Roasting)',
    stats: { extraction: '90%', purity: '99%', energy: 'Medium' }
  }
];

export default function OreGallery() {
  const [selected, setSelected] = useState<typeof ORES[0] | null>(null);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-4">Interactive Ore Gallery</h2>
        <p className="text-zinc-400 max-w-xl">Click on an ore to inspect its chemical composition and target metal extraction data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ORES.map((ore) => (
          <motion.div
            key={ore.id}
            layoutId={ore.id}
            onClick={() => setSelected(ore)}
            whileHover={{ y: -5 }}
            className={cn(
              "cursor-pointer p-6 rounded-2xl border transition-all duration-300 group",
              ore.color
            )}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-2 rounded-lg bg-black/40", ore.accent)}>
                <Database size={20} />
              </div>
              <span className="text-xs font-mono text-zinc-500">{ore.formula}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{ore.name}</h3>
            <p className="text-sm text-zinc-400 line-clamp-2 mb-4">{ore.description}</p>
            <div className="flex items-center gap-2 text-xs font-medium text-teal-400">
              <Target size={14} />
              <span>Yields: {ore.metal}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            />
            <motion.div
              layoutId={selected.id}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-8 z-50 shadow-2xl"
            >
              <button 
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className={cn("inline-block p-3 rounded-xl bg-black/40 mb-6", selected.accent)}>
                <Database size={32} />
              </div>

              <h3 className="text-3xl font-bold text-white mb-1">{selected.name}</h3>
              <p className="text-teal-400 font-mono mb-6">{selected.formula}</p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Description</h4>
                  <p className="text-zinc-300 leading-relaxed">{selected.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50">
                    <p className="text-[10px] uppercase text-zinc-500 mb-1">Target Metal</p>
                    <p className="text-white font-semibold">{selected.metal}</p>
                  </div>
                  <div className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50">
                    <p className="text-[10px] uppercase text-zinc-500 mb-1">Primary Method</p>
                    <p className="text-white font-semibold">{selected.method}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800">
                  <h4 className="text-xs uppercase tracking-widest text-zinc-500 mb-4">Extraction Metrics</h4>
                  <div className="flex justify-between">
                    {Object.entries(selected.stats).map(([key, val]) => (
                      <div key={key} className="text-center">
                        <p className="text-white font-bold text-lg">{val}</p>
                        <p className="text-[10px] uppercase text-zinc-500">{key}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
