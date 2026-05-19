import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowRight, ChevronRight, CheckCircle2, 
  CalendarClock, Star, Users, Brain, MousePointer2, 
  PenTool, Baby, MessageCircle, Hourglass, Lightbulb, Puzzle,
  Shapes
} from 'lucide-react';

export default function PersonalizedStorefront({ onPurchaseComplete }) {
  // Steps: 0(Hook), 1(Profile), 2-10(Questions 1-9), 11(Loading), 12(Results), 13(Checkout)
  const [step, setStep] = useState(0); 
  
  // --- USER DATA ---
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  
  // --- ASSESSMENT DATA ---
  const [answers, setAnswers] = useState({ q1: null, q2: null, q3: null, q4: 2, q5: null, q6: null, q7: null, q8: 2, q9: null });
  const [selectedBox, setSelectedBox] = useState(null);
  const [purchaseType, setPurchaseType] = useState('rent');

  // --- BOX DATABASE ---
  const boxDatabase = [
    { id: 'box-a', name: 'Discovery Box', ageGroup: ['2 years old', '3 years old'], desc: '3D-printed Geo Puzzles, foundational flashcards, and basic step-by-step guided play.', icon: '🧩', color: 'bg-blue-500' },
    { id: 'box-b', name: 'Explorer Box', ageGroup: ['3 years old', '4 years old'], desc: 'Advanced sorting, interactive character mats, and conceptual worksheets.', icon: '🦋', color: 'bg-orange-500' },
    { id: 'box-c', name: 'Achiever Box', ageGroup: ['5-6 years old'], desc: 'Pre-math concepts, intricate building mechanics, and creative reasoning activities.', icon: '⚙️', color: 'bg-purple-500' },
    { id: 'box-d', name: 'Story Crafters', ageGroup: ['3 years old', '4 years old', '5-6 years old'], desc: 'Puppet mechanics, storytelling cards, and imagination prompts.', icon: '📚', color: 'bg-pink-500' },
    { id: 'box-e', name: 'Little Builders', ageGroup: ['2 years old', '3 years old'], desc: 'Chunky stacking blocks and motor-skill challenges.', icon: '🧱', color: 'bg-teal-500' }
  ];

  const handleAnswer = (questionKey, value) => {
    setAnswers(prev => ({ ...prev, [questionKey]: value }));
    setTimeout(() => setStep(prev => prev + 1), 400); 
  };

  useEffect(() => {
    if (step === 11) {
      const timer = setTimeout(() => setStep(12), 3500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const ageBoxes = boxDatabase.filter(box => box.ageGroup.includes(childAge));
  const topMatch = ageBoxes[0] || boxDatabase[1]; 
  const otherOptions = ageBoxes.filter(box => box.id !== topMatch.id);

  // Animation variants
  const slideVariants = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 1.05, y: -20 }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans pb-24 overflow-hidden">
      
      {/* --- DYNAMIC HEADER --- */}
      {step > 0 && step < 11 && (
        <div className="fixed top-0 left-0 w-full z-50">
          <div className="bg-white/80 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-gray-100">
             <span className="text-xs font-black text-blue-600 uppercase tracking-widest">Question {step - 1} of 9</span>
             <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div className="h-full bg-blue-600" initial={{ width: '0%' }} animate={{ width: `${((step - 1) / 9) * 100}%` }} />
             </div>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        
        {/* --- STEP 0: THE HOOK --- */}
        {step === 0 && (
          <motion.div key="s0" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="flex-1 flex flex-col justify-center p-8 max-w-md mx-auto w-full text-center">
            <div className="mx-auto bg-blue-50 text-blue-600 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-inner"><Sparkles size={48} /></div>
            <h1 className="text-4xl font-black text-gray-900 mb-6 leading-[1.1]">Let's find the perfect match.</h1>
            <p className="text-xl text-gray-500 mb-10 leading-relaxed font-medium">Take our expert readiness assessment to curate the exact curriculum {childName || 'your child'} needs right now.</p>
            <button onClick={() => setStep(1)} className="w-full bg-blue-600 text-white font-bold text-xl py-5 rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
              Start Now <ArrowRight size={24} />
            </button>
          </motion.div>
        )}

        {/* --- STEP 1: BASIC PROFILE --- */}
        {step === 1 && (
          <motion.div key="s1" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="flex-1 flex flex-col justify-center p-8 max-w-md mx-auto w-full">
            <h2 className="text-3xl font-black text-gray-900 mb-8 leading-tight">First, tell us about your little one.</h2>
            
            <div className="space-y-6">
                <div>
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Child's Name</label>
                    <input type="text" value={childName} onChange={(e) => setChildName(e.target.value)} placeholder="e.g. Leo" className="w-full text-2xl font-bold bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-5 focus:border-blue-600 focus:bg-white outline-none mt-2 transition-all" />
                </div>
                
                <div>
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Select Age</label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                        {['2 years old', '3 years old', '4 years old', '5-6 years old'].map(age => (
                            <button key={age} onClick={() => setChildAge(age)} className={`py-4 rounded-2xl border-2 font-bold text-sm transition-all ${childAge === age ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-100 bg-white text-gray-500'}`}>{age}</button>
                        ))}
                    </div>
                </div>
            </div>

            <button onClick={() => setStep(2)} disabled={!childName || !childAge} className="w-full bg-gray-900 disabled:bg-gray-100 disabled:text-gray-300 text-white font-bold text-lg py-5 rounded-2xl mt-12 flex justify-center gap-2">
              Begin Assessment <ChevronRight size={20} />
            </button>
          </motion.div>
        )}

        {/* --- Q1: Playing & Thinking (Visual Card) --- */}
        {step === 2 && (
          <motion.div key="s2" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="flex-1 flex flex-col justify-center p-8 max-w-md mx-auto w-full">
            <div className="bg-blue-100 w-full h-48 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-inner"><Puzzle size={80} className="text-blue-500" /></div>
            <h2 className="text-3xl font-black text-gray-900 mb-2 leading-[1.1]">1. Playing & Thinking</h2>
            <p className="text-lg text-gray-500 mb-8 font-medium">How do they play with a new puzzle or toy?</p>
            <div className="space-y-3">
              {[
                {id: 'a', label: 'Touches, shakes, or tests the pieces.'},
                {id: 'b', label: 'Tries different pieces until one fits.'},
                {id: 'c', label: 'Looks and puts it in the right place directly.'}
              ].map((opt) => (
                <button key={opt.id} onClick={() => handleAnswer('q1', opt.label)} className={`w-full text-left p-5 rounded-2xl border-2 font-bold transition-all text-sm leading-snug ${answers.q1 === opt.label ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-100 bg-white text-gray-600 hover:border-blue-200'}`}>{opt.label}</button>
              ))}
            </div>
          </motion.div>
        )}

        {/* --- Q2: Colors & Shapes --- */}
        {step === 3 && (
          <motion.div key="s3" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="flex-1 flex flex-col justify-center p-8 max-w-md mx-auto w-full">
            <div className="bg-teal-100 w-full h-48 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-inner"><Shapes size={80} className="text-teal-500" /></div>
            <h2 className="text-3xl font-black text-gray-900 mb-2 leading-[1.1]">2. Colors & Shapes</h2>
            <p className="text-lg text-gray-500 mb-8 font-medium">Can they group items by color or size? (e.g. red blocks together)</p>
            <div className="grid grid-cols-1 gap-4">
              {['YES', 'NOT YET'].map(opt => (
                <button key={opt} onClick={() => handleAnswer('q2', opt)} className={`w-full p-8 rounded-[2rem] border-2 text-2xl font-black transition-all ${answers.q2 === opt ? 'border-teal-600 bg-teal-50 text-teal-700' : 'border-gray-100 bg-white text-gray-400'}`}>{opt}</button>
              ))}
            </div>
          </motion.div>
        )}

        {/* --- Q3: Holding a Pen --- */}
        {step === 4 && (
          <motion.div key="s4" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="flex-1 flex flex-col justify-center p-8 max-w-md mx-auto w-full">
            <div className="bg-orange-100 w-full h-48 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-inner"><PenTool size={80} className="text-orange-500" /></div>
            <h2 className="text-3xl font-black text-gray-900 mb-2 leading-[1.1]">3. Holding a Pen</h2>
            <p className="text-lg text-gray-500 mb-8 font-medium">How do they hold a crayon or pencil?</p>
            <div className="space-y-4">
              {[
                { id: 'fist', icon: '✊', label: 'Whole Hand', desc: 'Holds it with a fist.' },
                { id: 'all', icon: '🖐️', label: 'All Fingers', desc: 'Holds it with all fingers.' },
                { id: 'pincer', icon: '🤏', label: 'Two Fingers', desc: 'Holds it nicely with thumb & pointer.' }
              ].map(opt => (
                <button key={opt.id} onClick={() => handleAnswer('q3', opt.id)} className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center gap-5 ${answers.q3 === opt.id ? 'border-orange-600 bg-orange-50' : 'border-gray-100 bg-white'}`}>
                  <span className="text-4xl">{opt.icon}</span>
                  <div>
                    <div className={`font-black text-lg ${answers.q3 === opt.id ? 'text-orange-700' : 'text-gray-900'}`}>{opt.label}</div>
                    <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">{opt.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* --- Q4: Physical Balance (Slider) --- */}
        {step === 5 && (
          <motion.div key="s5" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="flex-1 flex flex-col justify-center p-8 max-w-md mx-auto w-full">
            <div className="bg-yellow-100 w-full h-48 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-inner"><Baby size={80} className="text-yellow-500" /></div>
            <h2 className="text-3xl font-black text-gray-900 mb-2 leading-[1.1]">4. Physical Balance</h2>
            <p className="text-lg text-gray-500 mb-12 font-medium">Running, jumping, or balancing on one foot?</p>
            <div className="mb-16 relative px-4">
              <input type="range" min="1" max="3" step="1" value={answers.q4} onChange={(e) => setAnswers({...answers, q4: parseInt(e.target.value)})} className="w-full h-4 bg-gray-100 rounded-full appearance-none cursor-pointer accent-yellow-500" />
              <div className="flex justify-between text-[11px] font-black text-gray-400 mt-8 uppercase tracking-widest absolute w-full left-0 px-2 text-center">
                <span className={`w-1/3 text-left ${answers.q4 === 1 ? 'text-yellow-600' : ''}`}>Still learning</span>
                <span className={`w-1/3 ${answers.q4 === 2 ? 'text-yellow-600' : ''}`}>Getting steady</span>
                <span className={`w-1/3 text-right ${answers.q4 === 3 ? 'text-yellow-600' : ''}`}>Very balanced</span>
              </div>
            </div>
            <button onClick={() => setStep(6)} className="w-full bg-gray-900 text-white font-black text-lg py-5 rounded-2xl flex justify-center gap-2 mt-8">Next Question <ChevronRight size={24} /></button>
          </motion.div>
        )}

        {/* --- Q5: Listening & Doing --- */}
        {step === 6 && (
          <motion.div key="s6" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="flex-1 flex flex-col justify-center p-8 max-w-md mx-auto w-full">
            <div className="bg-blue-100 w-full h-48 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-inner"><MousePointer2 size={80} className="text-blue-500" /></div>
            <h2 className="text-3xl font-black text-gray-900 mb-2 leading-[1.1]">5. Listening & Doing</h2>
            <p className="text-lg text-gray-500 mb-8 font-medium">Can they follow a 2-step instruction? (e.g. "Pick up the book and put it on the table")</p>
            <div className="space-y-4">
              {[
                { id: '1', label: '1 - Rarely', desc: 'Needs one simple step at a time.' },
                { id: '2', label: '2 - Sometimes', desc: 'Can do it if I show them first.' },
                { id: '3', label: '3 - Often', desc: 'Follows the steps easily.' }
              ].map(opt => (
                <button key={opt.id} onClick={() => handleAnswer('q5', opt.id)} className={`w-full text-left p-6 rounded-2xl border-2 transition-all ${answers.q5 === opt.id ? 'border-blue-600 bg-blue-50' : 'border-gray-100 bg-white'}`}>
                  <div className={`font-black text-xl ${answers.q5 === opt.id ? 'text-blue-700' : 'text-gray-900'}`}>{opt.label}</div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* --- Q6: Patience --- */}
        {step === 7 && (
          <motion.div key="s7" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="flex-1 flex flex-col justify-center p-8 max-w-md mx-auto w-full">
            <div className="bg-pink-100 w-full h-48 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-inner"><Brain size={80} className="text-pink-500" /></div>
            <h2 className="text-3xl font-black text-gray-900 mb-2 leading-[1.1]">6. Patience</h2>
            <p className="text-lg text-gray-500 mb-8 font-medium">If a game is hard, do they keep trying before asking for help?</p>
            <div className="space-y-4">
              {['YES, THEY KEEP TRYING', 'NO, THEY GET FRUSTRATED'].map(opt => (
                <button key={opt} onClick={() => handleAnswer('q6', opt)} className={`w-full p-8 rounded-[2rem] border-2 font-black transition-all leading-tight text-center ${answers.q6 === opt ? 'border-pink-600 bg-pink-50 text-pink-700' : 'border-gray-100 bg-white text-gray-400'}`}>{opt}</button>
              ))}
            </div>
          </motion.div>
        )}

        {/* --- Q7: Talking --- */}
        {step === 8 && (
          <motion.div key="s8" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="flex-1 flex flex-col justify-center p-8 max-w-md mx-auto w-full">
            <div className="bg-indigo-100 w-full h-48 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-inner"><MessageCircle size={80} className="text-indigo-500" /></div>
            <h2 className="text-3xl font-black text-gray-900 mb-2 leading-[1.1]">7. Talking</h2>
            <p className="text-lg text-gray-500 mb-8 font-medium">How do they usually talk right now?</p>
            <div className="space-y-3">
              {['Points to things or single words.', 'Uses short sentences (3 to 4 words).', 'Speaks in full sentences and asks "Why?"'].map((opt, i) => (
                <button key={i} onClick={() => handleAnswer('q7', opt)} className={`w-full text-left p-6 rounded-2xl border-2 font-bold transition-all text-sm leading-snug ${answers.q7 === opt ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 bg-white text-gray-600'}`}>{opt}</button>
              ))}
            </div>
          </motion.div>
        )}

        {/* --- Q8: Attention Span (Slider) --- */}
        {step === 9 && (
          <motion.div key="s9" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="flex-1 flex flex-col justify-center p-8 max-w-md mx-auto w-full">
            <div className="bg-purple-100 w-full h-48 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-inner"><Hourglass size={80} className="text-purple-500" /></div>
            <h2 className="text-3xl font-black text-gray-900 mb-2 leading-[1.1]">8. Attention Span</h2>
            <p className="text-lg text-gray-500 mb-12 font-medium">How long can they sit and focus on an activity they like?</p>
            <div className="mb-16 relative px-4">
              <input type="range" min="1" max="3" step="1" value={answers.q8} onChange={(e) => setAnswers({...answers, q8: parseInt(e.target.value)})} className="w-full h-4 bg-gray-100 rounded-full appearance-none cursor-pointer accent-purple-500" />
              <div className="flex justify-between text-[11px] font-black text-gray-400 mt-8 uppercase tracking-widest absolute w-full left-0 px-2 text-center">
                <span className={`w-1/3 text-left ${answers.q8 === 1 ? 'text-purple-600' : ''}`}>Under 5 min</span>
                <span className={`w-1/3 ${answers.q8 === 2 ? 'text-purple-600' : ''}`}>5 to 10 min</span>
                <span className={`w-1/3 text-right ${answers.q8 === 3 ? 'text-purple-600' : ''}`}>15+ min</span>
              </div>
            </div>
            <button onClick={() => setStep(10)} className="w-full bg-gray-900 text-white font-black text-lg py-5 rounded-2xl flex justify-center gap-2 mt-8">Final Question <ChevronRight size={24} /></button>
          </motion.div>
        )}

        {/* --- Q9: Imagination --- */}
        {step === 10 && (
          <motion.div key="s10" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="flex-1 flex flex-col justify-center p-8 max-w-md mx-auto w-full">
            <div className="bg-amber-100 w-full h-48 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-inner"><Lightbulb size={80} className="text-amber-500" /></div>
            <h2 className="text-3xl font-black text-gray-900 mb-2 leading-[1.1]">9. Imagination</h2>
            <p className="text-lg text-gray-500 mb-8 font-medium">How do they pretend-play?</p>
            <div className="space-y-4">
              {['Plays normally (rolling a car).', 'Copies real life (cooking, cleaning).', 'Gives voices and makes up stories.'].map((opt, i) => (
                <button key={i} onClick={() => handleAnswer('q9', opt)} className={`w-full text-left p-6 rounded-2xl border-2 font-bold transition-all text-sm leading-snug ${answers.q9 === opt ? 'border-amber-600 bg-amber-50 text-amber-700' : 'border-gray-100 bg-white text-gray-600'}`}>{opt}</button>
              ))}
            </div>
          </motion.div>
        )}

        {/* --- STEP 11: TEAM REVIEW LOADING --- */}
        {step === 11 && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="relative w-40 h-40 mb-12">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-8 border-gray-100 border-t-blue-600 rounded-full"></motion.div>
              <div className="absolute inset-0 flex items-center justify-center"><Users size={48} className="text-blue-600" /></div>
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4 text-center">Curating your match...</h2>
            <div className="h-10 overflow-hidden">
              <motion.div animate={{ y: [0, -40, -80, -120] }} transition={{ duration: 3.5, ease: "linear" }} className="text-gray-400 font-bold uppercase tracking-widest text-center space-y-10">
                <div>Analyzing Logic...</div>
                <div>Reviewing Motor Control...</div>
                <div>Evaluating Focus...</div>
                <div>Finalizing Experts Match...</div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* --- STEP 12: RESULTS & SELECTION --- */}
        {step === 12 && (
          <motion.div key="results" variants={slideVariants} initial="initial" animate="animate" className="pb-32 px-6 pt-12 max-w-md mx-auto">
            
            <h1 className="text-3xl font-black text-gray-900 mb-4 leading-tight">Expert Match Found!</h1>
            <p className="text-lg text-gray-500 mb-10 leading-relaxed font-medium">
              Our team recommends the <strong>{topMatch.name}</strong> to best support {childName}'s current development milestones.
            </p>

            {/* TOP MATCH CARD */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border-4 border-blue-600 mb-10 relative">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[12px] font-black uppercase tracking-widest px-6 py-2 rounded-full flex items-center gap-2 shadow-xl whitespace-nowrap">
                <Star size={14} className="fill-white" /> Primary Expert Match
              </div>
              <div className="w-full aspect-video bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl flex items-center justify-center mb-6 text-7xl shadow-inner">
                {topMatch.icon}
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-3">{topMatch.name}</h2>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed font-bold">{topMatch.desc}</p>
              
              <button onClick={() => { setSelectedBox(topMatch); setStep(13); }} className="w-full bg-blue-600 text-white font-black text-xl py-5 rounded-2xl flex justify-center gap-3 shadow-xl shadow-blue-200">
                Select This Box <ChevronRight size={24} />
              </button>
            </div>

            {/* OTHER OPTIONS */}
            {otherOptions.length > 0 && (
              <>
                <h3 className="text-xl font-black text-gray-900 mb-6 px-2">Other {childAge} Options</h3>
                <div className="space-y-4">
                  {otherOptions.map(box => (
                    <div key={box.id} className="bg-white rounded-[2rem] p-6 shadow-sm border-2 border-gray-100 flex items-center gap-5 hover:border-blue-200 transition-all">
                      <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center text-4xl shrink-0 shadow-inner">{box.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-black text-lg text-gray-900">{box.name}</h4>
                        <p className="text-xs text-gray-400 font-bold mt-1 leading-snug">{box.desc}</p>
                        <button onClick={() => { setSelectedBox(box); setStep(13); }} className="text-blue-600 text-xs font-black uppercase tracking-widest mt-3 hover:text-blue-800">Select Box</button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* --- STEP 13: CHECKOUT --- */}
        {step === 13 && selectedBox && (
          <motion.div key="checkout" variants={slideVariants} initial="initial" animate="animate" className="pb-32 px-6 pt-12 max-w-md mx-auto">
            <button onClick={() => setStep(12)} className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8 flex items-center gap-2 hover:text-gray-600 transition-colors">
                <ChevronRight size={16} className="rotate-180" /> Change Selection
            </button>
            
            <h1 className="text-3xl font-black text-gray-900 mb-3 leading-tight">Almost ready!</h1>
            <p className="text-lg text-gray-500 mb-10 font-medium">How would you like to receive the <strong>{selectedBox.name}</strong>?</p>

            <div className="space-y-4">
              <div onClick={() => setPurchaseType('rent')} className={`p-6 rounded-[2rem] border-4 cursor-pointer transition-all ${purchaseType === 'rent' ? 'border-blue-600 bg-blue-50/40 shadow-xl' : 'border-gray-100 bg-white'}`}>
                <div className="flex justify-between items-center mb-3">
                  <div className="font-black text-gray-900 text-xl flex items-center gap-2">Rent the Box <span className="bg-blue-600 text-white text-[10px] uppercase px-3 py-1 rounded-full">Best Value</span></div>
                  <div className="text-2xl font-black text-blue-600">₺299<span className="text-sm font-bold text-gray-400">/mo</span></div>
                </div>
                <AnimatePresence>
                  {purchaseType === 'rent' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-amber-100/50 border border-amber-200 rounded-2xl p-5 mt-4 flex gap-4 text-amber-900 shadow-inner">
                      <CalendarClock size={28} className="shrink-0 text-amber-600" />
                      <div className="text-[11px] font-bold leading-relaxed uppercase tracking-wider">
                        <strong>Rule:</strong> Rentals ship on the <strong>1st of the month</strong> and collected at the end. Your unique QR code unlocks lessons instantly upon arrival.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div onClick={() => setPurchaseType('buy')} className={`p-6 rounded-[2rem] border-4 cursor-pointer transition-all ${purchaseType === 'buy' ? 'border-gray-900 bg-gray-50 shadow-xl' : 'border-gray-100 bg-white'}`}>
                <div className="flex justify-between items-center mb-2">
                  <div className="font-black text-gray-900 text-xl">Buy It Forever</div>
                  <div className="text-2xl font-black text-gray-900">₺850</div>
                </div>
              </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-6 z-50">
              <button onClick={() => onPurchaseComplete(selectedBox.id)} className="w-full max-w-md mx-auto bg-blue-600 text-white font-black text-xl py-6 rounded-2xl shadow-2xl shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-3">
                Secure Checkout <ArrowRight size={24} />
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}