import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, CheckCircle2, XCircle, Lightbulb, ArrowRight } from 'lucide-react';
import { cn } from '@/src/utils/cn';

const QUESTIONS = [
  {
    id: 1,
    question: "Why isn't pyrometallurgy used for the extraction of Aluminium?",
    options: [
      "Aluminium has a low melting point",
      "Aluminium is highly reactive and forms very stable oxides",
      "Aluminium is too expensive to heat",
      "Aluminium ores are only found in water"
    ],
    correct: 1,
    insight: "Aluminium is high in the reactivity series. Its bond with oxygen is so strong that carbon (used in pyrometallurgy) cannot reduce it. Only electrical force (electrolysis) can break the bond."
  },
  {
    id: 2,
    question: "In the displacement reaction, which metal is typically used to recover Copper from a solution?",
    options: [
      "Gold",
      "Silver",
      "Iron",
      "Platinum"
    ],
    correct: 2,
    insight: "A more reactive metal must be used to displace a less reactive one. Iron is cheaper and more reactive than copper, making it the ideal industrial choice."
  },
  {
    id: 3,
    question: "What is 'Slag' in the context of a blast furnace?",
    options: [
      "Pure molten iron",
      "The fuel used for heating",
      "Waste material formed from impurities like Silica",
      "The gas that escapes from the top"
    ],
    correct: 2,
    insight: "Slag is the byproduct of the reaction between flux (like Limestone) and gangue (impurities like Sand/Silica). It floats on the molten iron and is easily removed."
  }
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showInsight, setShowInsight] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === QUESTIONS[current].correct) {
      setScore(s => s + 1);
    } else {
      setShowInsight(true);
    }
  };

  const next = () => {
    if (current < QUESTIONS.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowInsight(false);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <section className="py-24 px-6 max-w-2xl mx-auto text-center">
        <div className="p-12 bg-zinc-900 border border-zinc-800 rounded-3xl">
          <CheckCircle2 size={64} className="text-teal-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
          <p className="text-zinc-400 mb-8">You scored {score} out of {QUESTIONS.length}.</p>
          <button 
            onClick={() => {
              setCurrent(0);
              setScore(0);
              setFinished(false);
              setSelected(null);
              setShowInsight(false);
            }}
            className="px-8 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-full transition-colors font-medium"
          >
            Restart Quiz
          </button>
        </div>
      </section>
    );
  }

  const q = QUESTIONS[current];

  return (
    <section className="py-24 px-6 max-w-3xl mx-auto">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <span className="text-teal-400 font-mono text-xs uppercase tracking-widest mb-2 block">Knowledge Check</span>
          <h2 className="text-3xl font-bold text-white">Smart Quiz</h2>
        </div>
        <span className="text-zinc-500 font-mono text-sm">Question {current + 1}/{QUESTIONS.length}</span>
      </div>

      <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-xl">
        <h3 className="text-xl text-white mb-8 leading-relaxed">{q.question}</h3>

        <div className="space-y-4 mb-8">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={selected !== null}
              className={cn(
                "w-full text-left p-4 rounded-xl border transition-all duration-200 flex justify-between items-center group",
                selected === null ? "border-zinc-800 hover:border-teal-500/50 hover:bg-teal-500/5" : 
                i === q.correct ? "border-green-500/50 bg-green-500/5 text-green-400" :
                selected === i ? "border-red-500/50 bg-red-500/5 text-red-400" : "border-zinc-800 opacity-50"
              )}
            >
              <span>{opt}</span>
              {selected !== null && i === q.correct && <CheckCircle2 size={18} />}
              {selected === i && i !== q.correct && <XCircle size={18} />}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {showInsight && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl"
            >
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <Lightbulb size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">Expert Insight</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">{q.insight}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {selected !== null && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={next}
            className="w-full py-4 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
          >
            {current === QUESTIONS.length - 1 ? "Finish Quiz" : "Next Question"}
            <ArrowRight size={18} />
          </motion.button>
        )}
      </div>
    </section>
  );
}
