import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Droplets, Zap, ChevronRight, ArrowRight } from 'lucide-react';
import { BlockMath } from 'react-katex';
import { cn } from '@/src/utils/cn';

const TABS = [
  { id: 'pyro', label: 'Pyrometallurgy', icon: Flame, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { id: 'hydro', label: 'Hydrometallurgy', icon: Droplets, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
  { id: 'electro', label: 'Electrometallurgy', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
];

export default function DeepDive() {
  const [activeTab, setActiveTab] = useState('pyro');

  return (
    <section className="py-24 px-6 bg-zinc-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">The Big 3: Extraction Methods</h2>
          <p className="text-zinc-400">Deep dive into the thermal, chemical, and electrical pathways of metal production.</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-300",
                activeTab === tab.id 
                  ? "bg-zinc-800 border-zinc-700 text-white shadow-lg" 
                  : "bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-700"
              )}
            >
              <tab.icon size={18} className={activeTab === tab.id ? tab.color : ""} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTab === 'pyro' && (
              <motion.div
                key="pyro"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div>
                  <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <Flame className="text-orange-400" />
                    Pyrometallurgy: The Power of Heat
                  </h3>
                  <p className="text-zinc-400 mb-8 leading-relaxed">
                    Pyrometallurgy involves the use of high temperatures to bring about chemical reductions. The most famous example is the <strong>Blast Furnace</strong> used for iron extraction.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                      <h4 className="text-sm font-mono text-orange-400 mb-4 uppercase tracking-widest">Key Reaction: Carbon Reduction</h4>
                      <div className="text-lg text-zinc-200">
                        <BlockMath math="Fe_2O_3 + 3CO \xrightarrow{\Delta} 2Fe + 3CO_2" />
                      </div>
                    </div>
                    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                      <h4 className="text-sm font-mono text-orange-400 mb-4 uppercase tracking-widest">Slag Formation</h4>
                      <div className="text-lg text-zinc-200">
                        <BlockMath math="CaO + SiO_2 \rightarrow CaSiO_3 \text{ (Slag)}" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative aspect-square bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden flex items-center justify-center p-12">
                   {/* Blast Furnace Mockup */}
                   <div className="w-full h-full relative flex flex-col items-center">
                      <div className="w-32 h-64 bg-gradient-to-b from-orange-900 to-red-950 rounded-t-3xl border-x-4 border-t-4 border-zinc-700 relative overflow-hidden">
                        <motion.div 
                          animate={{ opacity: [0.4, 0.8, 0.4] }}
                          transition={{ repeat: Infinity, duration: 3 }}
                          className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-orange-500 to-transparent" 
                        />
                      </div>
                      <div className="w-48 h-24 bg-zinc-800 border-4 border-zinc-700 rounded-b-3xl -mt-2 flex items-center justify-center">
                        <div className="w-full h-4 bg-orange-600/20 animate-pulse" />
                      </div>
                      <div className="absolute top-1/4 -left-4 flex items-center gap-2">
                        <span className="text-[10px] text-zinc-500 font-mono">ORE + COKE</span>
                        <ChevronRight className="text-zinc-600" />
                      </div>
                      <div className="absolute bottom-1/4 -right-4 flex items-center gap-2">
                        <ChevronRight className="text-zinc-600" />
                        <span className="text-[10px] text-orange-400 font-mono">MOLTEN IRON</span>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'hydro' && (
              <motion.div
                key="hydro"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div>
                  <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <Droplets className="text-cyan-400" />
                    Hydrometallurgy: Aqueous Solutions
                  </h3>
                  <p className="text-zinc-400 mb-8 leading-relaxed">
                    This method uses aqueous solutions for the recovery of metals from ores. It typically involves <strong>Leaching</strong> followed by <strong>Displacement</strong> (Cementation).
                  </p>

                  <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl mb-6">
                    <h4 className="text-sm font-mono text-cyan-400 mb-4 uppercase tracking-widest">Displacement Reaction</h4>
                    <div className="text-lg text-zinc-200">
                      <BlockMath math="CuSO_4(aq) + Fe(s) \rightarrow FeSO_4(aq) + Cu(s)" />
                    </div>
                    <p className="text-xs text-zinc-500 mt-4">Iron is more reactive than copper, so it displaces copper from its salt solution.</p>
                  </div>
                </div>

                <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-12 flex flex-col items-center justify-center gap-8">
                  <div className="relative w-48 h-64 bg-cyan-900/30 border-x-4 border-b-4 border-zinc-700 rounded-b-2xl flex items-center justify-center">
                    <div className="absolute bottom-0 w-full h-2/3 bg-cyan-500/20" />
                    {/* Nail Visualization */}
                    <motion.div 
                      animate={{ rotate: [0, 2, 0] }}
                      transition={{ repeat: Infinity, duration: 4 }}
                      className="w-4 h-48 bg-zinc-400 rounded-full relative shadow-lg"
                    >
                      <div className="absolute top-0 w-8 h-2 bg-zinc-500 -left-2 rounded-full" />
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 2 }}
                        className="absolute bottom-0 w-full h-1/2 bg-orange-800/60 rounded-b-full" 
                      />
                    </motion.div>
                  </div>
                  <p className="text-xs text-zinc-500 font-mono">Iron Nail in Copper Sulphate Solution</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'electro' && (
              <motion.div
                key="electro"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold text-white mb-6 flex items-center justify-center gap-3">
                    <Zap className="text-yellow-400" />
                    Electrometallurgy: Electrical Force
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    Used for highly reactive metals like Sodium and Aluminium. It involves the electrolysis of fused (molten) salts.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { step: '01', title: 'Melting', desc: 'The ore is heated until it reaches a molten (fused) state to allow ion mobility.' },
                    { step: '02', title: 'Current Application', desc: 'Direct current is passed through the electrolyte using carbon electrodes.' },
                    { step: '03', title: 'Recovery', desc: 'Pure metal ions are reduced at the cathode and deposited for collection.' }
                  ].map((item, i) => (
                    <div key={i} className="relative p-8 bg-zinc-900 border border-zinc-800 rounded-3xl flex flex-col items-center text-center">
                      <span className="text-4xl font-bold text-zinc-800 mb-4">{item.step}</span>
                      <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-sm text-zinc-500">{item.desc}</p>
                      {i < 2 && <ArrowRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-zinc-700 z-10" />}
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-8 bg-yellow-400/5 border border-yellow-400/20 rounded-3xl">
                   <h4 className="text-sm font-mono text-yellow-400 mb-4 uppercase tracking-widest text-center">Electrolytic Reduction of Alumina</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                      <div>
                        <p className="text-xs text-zinc-500 mb-2">At Cathode (Reduction)</p>
                        <BlockMath math="Al^{3+} + 3e^- \rightarrow Al(l)" />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 mb-2">At Anode (Oxidation)</p>
                        <BlockMath math="C(s) + 2O^{2-} \rightarrow CO_2(g) + 4e^-" />
                      </div>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
