import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shapes, Monitor, Home, BarChart2, Calendar, Settings, X, ChevronRight } from 'lucide-react';
import LessonInterface from './LessonInterface'; // <-- Here is the new connection!

export default function ParentDashboard({ activeBox = 'BTRFL-BOX' }) {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [waitlistStatus, setWaitlistStatus] = useState('idle');
  
  // <-- Here is the state that controls opening the lesson
  const [isLessonOpen, setIsLessonOpen] = useState(false); 

  const getLessonDetails = () => {
    if (activeBox === 'BTRFL-BOX') {
      return {
        title: "Day 1: Build a Butterfly",
        subtitle: "Using your Geo Animal Puzzle",
        color: "from-yellow-100 to-orange-200",
        iconColor: "text-orange-400"
      };
    }
    return {
      title: "Play & Learn Together",
      subtitle: "Easy daily guides for you and your child.",
      color: "from-blue-100 to-purple-200",
      iconColor: "text-purple-400"
    };
  };

  const lessonContent = getLessonDetails();

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    setWaitlistStatus('loading');
    setTimeout(() => {
      setWaitlistStatus('success');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans relative">
      <header className="px-6 py-8 bg-white rounded-b-3xl shadow-sm mb-6">
        <h2 className="text-xl font-bold text-blue-600 tracking-wide mb-1">KinderRent</h2>
        <h1 className="text-2xl font-bold text-gray-900">How would you like to play today?</h1>
      </header>

      <main className="px-6 space-y-6">
        <motion.div whileHover={{ y: -4 }} className="bg-white rounded-[2rem] p-4 shadow-sm border border-gray-100">
          <div className={`w-full h-40 rounded-[1.5rem] bg-gradient-to-br ${lessonContent.color} flex items-center justify-center mb-4 relative overflow-hidden`}>
            <Shapes size={64} className={`${lessonContent.iconColor} opacity-80`} />
            <div className="absolute top-4 left-4 bg-white/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-700">
              Box Active
            </div>
          </div>
          <div className="px-2">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{lessonContent.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{lessonContent.subtitle}</p>
            
            {/* <-- This button now triggers the lesson! */}
            <button 
              onClick={() => setIsLessonOpen(true)}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
            >
              Open Lesson Guide <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        <motion.div className="bg-white/60 rounded-[2rem] p-4 border border-gray-200 relative">
          <div className="absolute -top-3 right-6 bg-amber-400 text-amber-900 text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md z-10">✨ Coming Soon</div>
          <div className="w-full h-32 rounded-[1.5rem] bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center mb-4 opacity-75">
            <Monitor size={48} className="text-teal-500 opacity-60" />
          </div>
          <div className="px-2">
            <h3 className="text-xl font-bold text-gray-900 mb-1">Join a Live Class</h3>
            <p className="text-sm text-gray-500 mb-4">Fun, online sessions led by a KinderRent teacher.</p>
            <button onClick={() => setIsWaitlistOpen(true)} className="w-full bg-white border-2 border-blue-100 text-blue-600 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
              🔔 Join the Waitlist
            </button>
          </div>
        </motion.div>
      </main>

      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 px-6 py-4 flex justify-between items-center pb-safe">
        <button className="flex flex-col items-center text-blue-600"><Home size={24} /><span className="text-[10px] font-bold mt-1">Home</span></button>
        <button className="flex flex-col items-center text-gray-400 hover:text-blue-600"><BarChart2 size={24} /><span className="text-[10px] font-bold mt-1">Progress</span></button>
        <button className="flex flex-col items-center text-gray-400 hover:text-blue-600"><Calendar size={24} /><span className="text-[10px] font-bold mt-1">Plan</span></button>
        <button className="flex flex-col items-center text-gray-400 hover:text-blue-600"><Settings size={24} /><span className="text-[10px] font-bold mt-1">Settings</span></button>
      </nav>

      {/* --- WAITLIST MODAL --- */}
      <AnimatePresence>
        {isWaitlistOpen && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-white rounded-3xl w-full max-w-sm p-6 relative shadow-2xl">
              <button onClick={() => {setIsWaitlistOpen(false); setWaitlistStatus('idle');}} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-100 rounded-full p-2"><X size={20} /></button>
              {waitlistStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">You're on the list!</h3>
                  <p className="text-gray-500">We will email you as soon as classes open.</p>
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="mt-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Join the Live Class Waitlist</h3>
                  <div className="space-y-4 mb-8">
                    <div><input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none" placeholder="Child's Name" /></div>
                    <div>
                      <select required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none">
                        <option value="" disabled selected>Select age</option>
                        <option value="2">2 Years</option><option value="3">3 Years</option><option value="4">4 Years</option>
                      </select>
                    </div>
                    <div><input type="email" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none" placeholder="Parent Email" /></div>
                  </div>
                  <button type="submit" disabled={waitlistStatus === 'loading'} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl">
                    {waitlistStatus === 'loading' ? 'Sending...' : 'Join Waitlist'}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- THE LESSON INTERFACE --- */}
      {/* If the button is clicked, this renders your beautiful step-by-step guide over the screen! */}
      <AnimatePresence>
        {isLessonOpen && <LessonInterface onClose={() => setIsLessonOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}