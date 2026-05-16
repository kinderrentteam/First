import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Sparkles, CheckCircle2, Crown, BookOpen, Medal } from 'lucide-react';

export default function ProgressRewards() {
  const [activeTab, setActiveTab] = useState('stickers'); // 'stickers' | 'stats'

  // Mock data reflecting the day's hard work
  const learnedWords = ["Butterfly", "Build", "Fly", "Happy", "Weather"];
  
  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans">
      
      {/* --- HEADER & CELEBRATION --- */}
      <header className="px-6 py-8 bg-white rounded-b-3xl shadow-sm mb-6 relative overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 rounded-full blur-3xl opacity-60 -mr-10 -mt-10"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold mb-3 border border-yellow-100">
            <Crown size={14} /> Explorer Rank
          </div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">Leo's Journey</h1>
          <p className="text-gray-500 text-sm">Every step completed unlocks a new piece of the magic.</p>
        </div>
      </header>

      {/* --- TAB NAVIGATION --- */}
      <div className="px-6 mb-6">
        <div className="bg-white p-1.5 rounded-2xl flex shadow-sm border border-gray-100">
          <button 
            onClick={() => setActiveTab('stickers')}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'stickers' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Sticker Book
          </button>
          <button 
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'stats' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Learning Stats
          </button>
        </div>
      </div>

      <main className="px-6">
        <AnimatePresence mode="wait">
          
          {/* --- VIEW 1: THE STICKER BOOK --- */}
          {activeTab === 'stickers' && (
            <motion.div key="stickers" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              
              {/* Active Sticker (Earned from Day 1) */}
              <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 mb-6 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500"></div>
                <h2 className="font-bold text-gray-900 mb-6 flex items-center justify-center gap-2">
                  <Star className="text-yellow-400 fill-yellow-400" size={20} /> Newest Reward
                </h2>
                
                <motion.div 
                  animate={{ y: [0, -10, 0] }} 
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center border-4 border-white shadow-xl mb-4 relative"
                >
                  <Sparkles className="absolute -top-2 -right-2 text-yellow-400" size={24} />
                  <span className="text-5xl">🦋</span>
                </motion.div>
                
                <h3 className="text-xl font-bold text-gray-900">The Geo Butterfly</h3>
                <p className="text-sm text-gray-500 mt-1">Earned by completing all 5 steps of Day 1!</p>
              </div>

              {/* Locked/Upcoming Stickers */}
              <h3 className="font-bold text-gray-900 mb-4 px-2">Upcoming Stickers</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 rounded-2xl p-6 text-center border border-gray-200 border-dashed opacity-70">
                  <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-3 grayscale">
                    <span className="text-2xl opacity-50">🧱</span>
                  </div>
                  <h4 className="font-bold text-gray-500 text-sm">Stacking Blocks</h4>
                  <p className="text-[10px] text-gray-400 mt-1">Unlock on Day 2</p>
                </div>
                <div className="bg-gray-100 rounded-2xl p-6 text-center border border-gray-200 border-dashed opacity-70">
                  <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-3 grayscale">
                    <span className="text-2xl opacity-50">🚂</span>
                  </div>
                  <h4 className="font-bold text-gray-500 text-sm">Color Train</h4>
                  <p className="text-[10px] text-gray-400 mt-1">Unlock on Day 3</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* --- VIEW 2: LEARNING STATS --- */}
          {activeTab === 'stats' && (
            <motion.div key="stats" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              
              {/* Milestones Card */}
              <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Medal className="text-blue-500" size={20} /> Box Progress
                </h3>
                
                <div className="flex items-center justify-around mb-2">
                  <div className="text-center">
                    <div className="text-3xl font-black text-blue-600 mb-1">5</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Steps Done</div>
                  </div>
                  <div className="w-px h-12 bg-gray-200"></div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-orange-500 mb-1">1</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Worksheets</div>
                  </div>
                </div>
              </div>

              {/* Target Words Card */}
              <div className="bg-blue-50 rounded-[2rem] p-6 border border-blue-100">
                <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <BookOpen className="text-blue-500" size={20} /> English Words Explored
                </h3>
                <p className="text-sm text-blue-700 mb-4">Great job practicing these target words together!</p>
                
                <div className="flex flex-wrap gap-2">
                  {learnedWords.map((word, i) => (
                    <motion.div 
                      key={word}
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }}
                      className="bg-white px-4 py-2 rounded-xl text-blue-600 font-bold shadow-sm border border-blue-100 flex items-center gap-2"
                    >
                      <CheckCircle2 size={16} className="text-green-500" /> {word}
                    </motion.div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

    </div>
  );
}