import React from 'react';
import Hero from './sections/Hero';
import OreGallery from './sections/OreGallery';
import DeepDive from './sections/DeepDive';
import LabGame from './components/LabGame';
import Quiz from './components/Quiz';
import ProfessorMetallurgy from './components/ProfessorMetallurgy';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] selection:bg-teal-500/30">
      {/* Navigation Mockup */}
      <nav className="fixed top-0 w-full z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center font-bold text-white">M</div>
            <span className="font-bold text-white tracking-tight">The Art of Metallurgy</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#" className="hover:text-teal-400 transition-colors">Curriculum</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Virtual Lab</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Quiz</a>
          </div>
          <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm font-medium text-white hover:bg-zinc-800 transition-colors">
            Student Portal
          </button>
        </div>
      </nav>

      <main>
        <Hero />
        <OreGallery />
        <DeepDive />
        <LabGame />
        <Quiz />
      </main>

      <footer className="py-12 px-6 border-t border-zinc-800 bg-zinc-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-teal-600 rounded flex items-center justify-center font-bold text-white text-xs">M</div>
            <span className="font-bold text-white text-sm">The Art of Metallurgy</span>
          </div>
          <p className="text-zinc-500 text-xs">© 2026 EdTech Metallurgy. All chemical mastery reserved.</p>
          <div className="flex gap-6 text-zinc-500 text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* Persistent AI Tutor */}
      <ProfessorMetallurgy />
    </div>
  );
}
