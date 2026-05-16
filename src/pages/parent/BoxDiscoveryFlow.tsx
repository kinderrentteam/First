import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, PackageOpen, ArrowRight, CheckCircle2, Star, GraduationCap, ChevronRight } from 'lucide-react';

export default function BoxDiscoveryFlow({ onPurchaseComplete }) {
  // --- STATE MANAGEMENT ---
  const [step, setStep] = useState(1);
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [playStyle, setPlayStyle] = useState('');

  // --- MOCK RECOMMENDATION DATA ---
  const recommendedBoxes = [
    {
      id: 'box-b',
      title: "The Geo Explorer Box",
      subtitle: "Featuring the 3D Butterfly Puzzle",
      price: "₺450 / month",
      gradient: "from-purple-100 to-pink-200",
      iconColor: "text-pink-500",
      whatsInside: ["3D-Printed Geo Butterfly Puzzle", "4 High-Contrast Flashcards", "Reusable Shape Worksheets"],
      objectives: ["Spatial Awareness", "Fine Motor Skills", "Shape Recognition"],
      cambridge: "Aligns with Cambridge Early Years: Mathematics (Geometry) and Communication."
    },
    {
      id: 'box-a',
      title: "The Little Engineer",
      subtitle: "Featuring the Stacking Blocks",
      price: "₺450 / month",
      gradient: "from-blue-100 to-cyan-200",
      iconColor: "text-blue-500",
      whatsInside: ["12 Magnetic 3D Blocks", "Architect Blueprint Cards", "Color-matching mat"],
      objectives: ["Cause & Effect", "Balance & Gravity", "Color Sorting"],
      cambridge: "Aligns with Cambridge Early Years: Physical Development and Problem Solving."
    }
  ];

  // --- HANDLERS ---
  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else if (interests.length < 3) {
      setInterests([...interests, interest]);
    }
  };

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4); // Trigger loading screen
    setTimeout(() => {
      setStep(5); // Show recommendations
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col relative overflow-hidden pb-safe">
      
      {/* Top Progress Bar (Hidden on Loading/Results) */}
      {step < 4 && (
        <div className="pt-12 px-6 pb-4">
          <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-2 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-blue-600' : 'bg-gray-100'}`} />
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <AnimatePresence mode="wait">
          
          {/* --- STEP 1: BASICS --- */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Sparkles size={16} /> Let's customize your experience
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Who are we playing with today?</h1>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 block">Child's First Name</label>
                  <input 
                    type="text" value={childName} onChange={(e) => setChildName(e.target.value)}
                    placeholder="e.g. Leo" 
                    className="w-full text-2xl font-bold bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-5 focus:bg-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 block">How old are they?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['2 Years', '3 Years', '4 Years', '5+ Years'].map(age => (
                      <button 
                        key={age} onClick={() => setChildAge(age)}
                        className={`py-4 rounded-2xl font-bold border-2 transition-all ${childAge === age ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white border-gray-100 text-gray-600 hover:border-gray-200'}`}
                      >
                        {age}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setStep(2)} disabled={!childName || !childAge}
                className="w-full mt-10 bg-gray-900 text-white font-bold text-lg py-5 rounded-full flex items-center justify-center gap-2 hover:bg-black disabled:opacity-50 transition-all"
              >
                Next Step <ArrowRight size={20} />
              </button>
            </motion.div>
          )}

          {/* --- STEP 2: INTERESTS --- */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">What does {childName} love?</h1>
              <p className="text-gray-500 mb-8">Choose up to 3 topics to help us find the perfect box.</p>
              
              <div className="grid grid-cols-2 gap-3">
                {['🐾 Animals', '🧱 Building', '🎵 Music & Sounds', '🧩 Puzzles', '🎨 Art & Colors', '🏃‍♂️ Moving Around'].map(interest => {
                  const isSelected = interests.includes(interest);
                  return (
                    <button 
                      key={interest} onClick={() => toggleInterest(interest)}
                      className={`p-4 rounded-2xl font-bold text-left border-2 transition-all flex flex-col gap-2 ${isSelected ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' : 'bg-white border-gray-100 text-gray-600 hover:border-gray-200'}`}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300'}`}>
                        {isSelected && <CheckCircle2 size={14} />}
                      </div>
                      {interest}
                    </button>
                  );
                })}
              </div>

              <button 
                onClick={() => setStep(3)} disabled={interests.length === 0}
                className="w-full mt-10 bg-gray-900 text-white font-bold text-lg py-5 rounded-full flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
              >
                Next Step <ArrowRight size={20} />
              </button>
            </motion.div>
          )}

          {/* --- STEP 3: PLAY STYLE --- */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">How do they play?</h1>
              <p className="text-gray-500 mb-8">This helps us match the lesson pacing to their energy.</p>
              
              <div className="space-y-4">
                {[
                  { id: 'active', title: 'High Energy', desc: 'Loves running, throwing, and moving fast.' },
                  { id: 'focused', title: 'Quiet & Focused', desc: 'Can sit still with a puzzle or drawing.' },
                  { id: 'mixed', title: 'A Bit of Both', desc: 'Depends entirely on the day!' }
                ].map(style => (
                  <button 
                    key={style.id} onClick={() => setPlayStyle(style.id)}
                    className={`w-full p-5 rounded-2xl border-2 text-left transition-all ${playStyle === style.id ? 'bg-blue-50 border-blue-500 shadow-sm' : 'bg-white border-gray-100 hover:border-gray-200'}`}
                  >
                    <h3 className={`font-bold text-lg mb-1 ${playStyle === style.id ? 'text-blue-900' : 'text-gray-900'}`}>{style.title}</h3>
                    <p className={playStyle === style.id ? 'text-blue-700' : 'text-gray-500'}>{style.desc}</p>
                  </button>
                ))}
              </div>

              <button 
                onClick={handleAnalyze} disabled={!playStyle}
                className="w-full mt-10 bg-blue-600 text-white font-bold text-lg py-5 rounded-full flex items-center justify-center gap-2 hover:bg-blue-700 shadow-xl shadow-blue-200 disabled:opacity-50 transition-all"
              >
                <Brain size={20} /> Find Our Perfect Box
              </button>
            </motion.div>
          )}

          {/* --- STEP 4: ANALYZING (LOADING STATE) --- */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center h-[60vh] text-center">
              <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-full mb-8 shadow-inner">
                <Brain size={64} className="text-blue-500" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Profile...</h2>
              <p className="text-gray-500">Matching KinderRent boxes to {childName}'s interests.</p>
            </motion.div>
          )}

          {/* --- STEP 5: RECOMMENDATIONS & CHECKOUT --- */}
          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="pb-10">
              <div className="text-center mb-8 pt-4">
                <span className="inline-block bg-green-100 text-green-700 font-bold px-4 py-1.5 rounded-full text-sm mb-4">✨ Perfect Matches Found</span>
                <h1 className="text-3xl font-bold text-gray-900">Choose your first box!</h1>
              </div>

              <div className="space-y-6">
                {recommendedBoxes.map((box, index) => (
                  <div key={box.id} className="bg-white rounded-[2rem] border border-gray-200 shadow-sm overflow-hidden flex flex-col relative">
                    
                    {/* "Top Match" Badge for the first item */}
                    {index === 0 && (
                      <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm z-10 flex items-center gap-1">
                        <Star size={12} /> Best for {childName}
                      </div>
                    )}

                    {/* Premium Image Header */}
                    <div className={`h-40 bg-gradient-to-br ${box.gradient} p-6 flex items-center justify-center relative overflow-hidden`}>
                      <PackageOpen size={80} className={`${box.iconColor} opacity-75`} />
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">{box.title}</h2>
                          <p className="text-gray-500 font-medium">{box.subtitle}</p>
                        </div>
                        <div className="text-right">
                          <span className="block text-xl font-black text-blue-600">{box.price}</span>
                        </div>
                      </div>

                      {/* Box Details Accordion / List */}
                      <div className="space-y-4 mb-8">
                        <div className="bg-gray-50 rounded-xl p-4">
                          <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2"><PackageOpen size={16} className="text-blue-500"/> What's Inside:</h4>
                          <ul className="text-sm text-gray-600 space-y-1 ml-6 list-disc">
                            {box.whatsInside.map((item, i) => <li key={i}>{item}</li>)}
                          </ul>
                        </div>
                        
                        <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                          <h4 className="font-bold text-orange-900 text-sm mb-2 flex items-center gap-2"><Brain size={16} className="text-orange-500"/> Target Objectives:</h4>
                          <div className="flex flex-wrap gap-2">
                            {box.objectives.map((obj, i) => (
                              <span key={i} className="bg-white px-2 py-1 rounded-md text-orange-700 text-xs font-bold shadow-sm">{obj}</span>
                            ))}
                          </div>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                          <h4 className="font-bold text-blue-900 text-sm mb-2 flex items-center gap-2"><GraduationCap size={16} className="text-blue-600"/> Cambridge Connection:</h4>
                          <p className="text-sm text-blue-800 leading-relaxed">{box.cambridge}</p>
                        </div>
                      </div>

                      {/* Checkout Button */}
                     <button 
  onClick={() => {
    // We simulate a successful payment happening here, then trigger the next step!
    onPurchaseComplete(box.id);
  }}
  className="w-full bg-gray-900 text-white font-bold text-lg py-5 rounded-2xl shadow-xl hover:bg-black active:scale-95 transition-all flex justify-between items-center px-6"
>
  <span>Add to Cart - {box.price}</span>
  <ChevronRight size={20} />
</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}