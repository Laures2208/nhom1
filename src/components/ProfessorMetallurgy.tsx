import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { cn } from '@/src/utils/cn';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ProfessorMetallurgy() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Greetings, student! I am Professor Metallurgy. Ask me anything about metal extraction, ores, or the chemical processes of liberation!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const model = 'gemini-3-flash-preview';
      const systemInstruction = `You are "Professor Metallurgy", a distinguished and encouraging AI tutor specializing in extractive metallurgy. 
      Your goal is to explain complex concepts like Pyrometallurgy, Hydrometallurgy, and Electrometallurgy in an accessible way.
      Keep responses concise, academic yet engaging, and use chemical terminology correctly. 
      If asked about non-metallurgy topics, politely steer the conversation back to the art of metal liberation.`;

      const response = await ai.models.generateContent({
        model,
        contents: messages.concat({ role: 'user', content: userMessage }).map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        })),
        config: { systemInstruction }
      });

      const assistantMessage = response.text || "I'm sorry, I couldn't process that. Let's try again!";
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "My apologies, my connection to the blast furnace seems unstable. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-80 sm:w-96 h-[500px] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-teal-600 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <span className="font-semibold">Professor Metallurgy</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-teal-700 p-1 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex gap-2", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                  <div className={cn("p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0", msg.role === 'user' ? "bg-cyan-600" : "bg-teal-600")}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={cn("p-3 rounded-2xl max-w-[80%] text-sm", msg.role === 'user' ? "bg-cyan-900/50 text-cyan-50" : "bg-zinc-800 text-zinc-200")}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2">
                  <div className="p-2 rounded-full h-8 w-8 flex items-center justify-center bg-teal-600 shrink-0">
                    <Loader2 size={16} className="animate-spin" />
                  </div>
                  <div className="p-3 rounded-2xl bg-zinc-800 text-zinc-400 text-sm italic">
                    Professor is thinking...
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-zinc-800 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask the Professor..."
                className="flex-1 bg-zinc-800 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-teal-600 hover:bg-teal-500 disabled:opacity-50 p-2 rounded-lg transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-teal-600 hover:bg-teal-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
      >
        <MessageSquare size={24} />
      </motion.button>
    </div>
  );
}
