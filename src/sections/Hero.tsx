import React from 'react';
import { motion } from 'motion/react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center z-10"
      >
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-teal-400 font-mono text-sm tracking-widest uppercase mb-4 block"
        >
          Extractive Metallurgy 101
        </motion.span>
        
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-8">
          The Journey of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
            Metal Liberation
          </span>
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          From the depths of the earth to the purity of industry. Explore the chemical mastery required to free metals from their mineral bonds.
        </p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="inline-block p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl backdrop-blur-sm"
        >
          <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2 font-mono">The Core Principle: Reduction</p>
          <div className="text-2xl md:text-3xl font-mono text-teal-300">
            <BlockMath math="M^{n+} + ne^- \rightarrow M" />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-600"
      >
        <div className="w-px h-12 bg-gradient-to-b from-teal-500/50 to-transparent mx-auto" />
        <span className="text-[10px] uppercase tracking-[0.2em] mt-2 block">Scroll to Explore</span>
      </motion.div>
    </section>
  );
}
