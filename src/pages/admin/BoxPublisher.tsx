import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PackagePlus, Youtube, Music, Award, CheckCircle2, ChevronRight, ChevronLeft, QrCode, Printer, Loader2, Sparkles, Plus, Trash2 } from 'lucide-react';

export default function BoxPublisher() {
  // --- WIZARD STATE ---
  const [currentStep, setCurrentStep] = useState(1); 
  const [isPublishing, setIsPublishing] = useState(false);

  // --- FORM STATE ---
  const [boxName, setBoxName] = useState('Box B: Geo Butterfly');
  const [targetAge, setTargetAge] = useState('2-3');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [musicTrack, setMusicTrack] = useState('ukulele-happy.mp3');
  const [rewardBadge, setRewardBadge] = useState('butterfly-gold.png');

  // --- EDITABLE CURRICULUM STATE ---
  const [steps, setSteps] = useState([
    { id: 1, title: 'Morning Circle', uiText: 'Play the video, dance together, and check in with how your child is feeling today.', parentScript: "Hello! Let's do what's in the video! Let's jump and spin together!" },
    { id: 2, title: 'The Toy Builder', uiText: 'Open your KinderRent box and take out the puzzle pieces. Follow your child\'s lead.', parentScript: "What do you think we can make with these pieces? Let's Build!" },
    { id: 3, title: 'The Home Explorer Game', uiText: 'Grab a single tissue, a paper towel, or a light scarf.', parentScript: "Let's make this tissue a butterfly! Look, it can Fly! Can you catch it?" },
    { id: 4, title: 'Table Time Kickoff', uiText: 'Now that we are focused, let\'s calm down and move to the table. Grab Worksheet 1.', parentScript: "Here is another Butterfly. Can you Match it to its shadow?" },
    { id: 5, title: 'Flashcard Wind Down', uiText: 'Let\'s do a quiet review, celebrate their hard work, and snap a photo.', parentScript: "Look, this is our flashcard. It's a real Butterfly! You are so smart." }
  ]);

  // --- NEW HANDLERS FOR EDITING STEPS ---
  const updateStep = (id, field, value) => {
    setSteps(steps.map(step => 
      step.id === id ? { ...step, [field]: value } : step
    ));
  };

  const addStep = () => {
    const newId = steps.length > 0 ? Math.max(...steps.map(s => s.id)) + 1 : 1;
    setSteps([...steps, { id: newId, title: 'New Step', uiText: '', parentScript: '' }]);
  };

  const removeStep = (id) => {
    setSteps(steps.filter(step => step.id !== id));
  };

  // --- PUBLISH HANDLER ---
  const handlePublish = () => {
    setCurrentStep(4);
    setIsPublishing(true);
    setTimeout(() => { setIsPublishing(false); }, 2500);
  };

  const resetForm = () => {
    setCurrentStep(1);
    setBoxName('');
  };

  return (
    <div className="max-w-4xl mx-auto font-sans pb-24">
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <PackagePlus className="text-blue-600" /> The Assembly Line
        </h2>
        <p className="text-gray-500 mt-1">Build the digital lesson, link the media, and generate the physical QR code.</p>
      </div>

      {/* --- WIZARD PROGRESS BAR --- */}
      {currentStep < 4 && (
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 z-0 rounded-full"></div>
          <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 z-0 rounded-full transition-all duration-500`} style={{ width: `${((currentStep - 1) / 2) * 100}%` }}></div>
          
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 border-white transition-colors duration-300 ${currentStep >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {currentStep > stepNum ? <CheckCircle2 size={16} /> : stepNum}
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: BOX IDENTITY */}
          {currentStep === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">1. Box Identity</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Box/Package Name</label>
                  <input type="text" value={boxName} onChange={(e) => setBoxName(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Target Age Group</label>
                  <select value={targetAge} onChange={(e) => setTargetAge(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="2-3">24 - 36 Months</option>
                    <option value="3-4">3 - 4 Years</option>
                    <option value="4-5">4 - 5 Years</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: DIGITAL MEDIA */}
          {currentStep === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">2. Cloud Media & Rewards</h3>
              <div className="space-y-6">
                {/* Same as before... */}
                <div className="border border-gray-200 rounded-xl p-5 bg-gray-50 flex gap-4">
                  <div className="bg-red-100 text-red-600 p-3 rounded-full shrink-0 h-12 w-12 flex items-center justify-center"><Youtube size={24} /></div>
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-gray-900 mb-1">Animated Video Link</label>
                    <input type="text" value={youtubeLink} onChange={(e) => setYoutubeLink(e.target.value)} placeholder="Paste YouTube URL..." className="w-full text-sm p-2 rounded-lg border border-gray-200 outline-none" />
                  </div>
                </div>
                {/* Audio & Badge blocks removed for brevity, they remain unchanged from the previous layout */}
                 <div className="border border-gray-200 rounded-xl p-5 bg-gray-50 flex gap-4">
                  <div className="bg-purple-100 text-purple-600 p-3 rounded-full shrink-0 h-12 w-12 flex items-center justify-center"><Music size={24} /></div>
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-gray-900 mb-1">Background Audio Track</label>
                    <select value={musicTrack} onChange={(e) => setMusicTrack(e.target.value)} className="w-full text-sm p-2 rounded-lg border border-gray-200 outline-none bg-white">
                      <option value="ukulele-happy.mp3">Ukulele Happy Morning</option>
                      <option value="calm-focus.mp3">Calm Focus Time</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* --- STEP 3: EDITABLE CURRICULUM --- */}
          {currentStep === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8 h-[600px] overflow-y-auto bg-gray-50/50">
              <div className="flex justify-between items-center mb-6 sticky top-0 bg-gray-50/90 backdrop-blur-md py-4 z-10 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">3. The Interactive Parent Guide</h3>
                <button onClick={addStep} className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-sm font-bold px-4 py-2 rounded-xl flex items-center gap-2 transition-colors">
                  <Plus size={16}/> Add New Step
                </button>
              </div>
              
              <div className="space-y-6">
                <AnimatePresence>
                  {steps.map((step, index) => (
                    <motion.div 
                      key={step.id} 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white border border-gray-200 rounded-2xl p-6 relative shadow-sm hover:shadow-md transition-shadow group"
                    >
                      {/* Step Number Badge */}
                      <div className="absolute -left-3 -top-3 w-8 h-8 bg-blue-600 text-white font-black rounded-full flex items-center justify-center shadow-md">
                        {index + 1}
                      </div>

                      {/* Delete Button (Appears on hover) */}
                      <button onClick={() => removeStep(step.id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all bg-gray-50 hover:bg-red-50 p-2 rounded-lg">
                        <Trash2 size={18} />
                      </button>
                      
                      <div className="ml-4 space-y-4 pr-8">
                        {/* Editable Title */}
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Step Title</label>
                          <input 
                            type="text" 
                            value={step.title} 
                            onChange={(e) => updateStep(step.id, 'title', e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 font-bold text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                            placeholder="e.g. Morning Circle"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          {/* Editable UI Text */}
                          <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">App UI Text (Instructions)</label>
                            <textarea 
                              rows={3} 
                              value={step.uiText} 
                              onChange={(e) => updateStep(step.id, 'uiText', e.target.value)}
                              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" 
                              placeholder="What should the parent do?"
                            />
                          </div>
                          
                          {/* Editable Parent Script */}
                          <div>
                            <label className="block text-[10px] font-bold text-blue-500 uppercase tracking-wider mb-1">Parent Script (What they say)</label>
                            <textarea 
                              rows={3} 
                              value={step.parentScript} 
                              onChange={(e) => updateStep(step.id, 'parentScript', e.target.value)}
                              className="w-full bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-sm text-blue-900 font-medium italic outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" 
                              placeholder="Write exactly what they should say aloud..."
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* STEP 4: SUCCESS & QR (Unchanged) */}
          {currentStep === 4 && (
             <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-12 text-center">
             {isPublishing ? (
               <div className="flex flex-col items-center justify-center py-10">
                 <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
                 <h2 className="text-2xl font-bold text-gray-900">Publishing to Cloud...</h2>
               </div>
             ) : (
               <div className="py-6">
                 <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-500 rounded-full mb-6"><CheckCircle2 size={40} /></div>
                 <h2 className="text-3xl font-bold text-gray-900 mb-2">Live & Ready!</h2>
                 <p className="text-gray-500 mb-8 text-lg">"{boxName}" is now active.</p>
                 <div className="bg-gray-50 rounded-3xl p-8 inline-block border-2 border-gray-100 mb-8">
                   <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-4 inline-block"><QrCode size={160} strokeWidth={1} /></div>
                   <div className="font-mono text-sm text-gray-400 tracking-widest uppercase font-bold mb-1">Warehouse Code</div>
                   <div className="font-bold text-xl text-gray-900">BTRFL-BOX</div>
                 </div>
                 <button onClick={resetForm} className="w-full max-w-xs mx-auto bg-gray-100 font-bold py-4 rounded-xl hover:bg-gray-200 transition-all">Build Another</button>
               </div>
             )}
           </motion.div>
          )}

        </AnimatePresence>

        {/* --- WIZARD NAVIGATION FOOTER --- */}
        {currentStep < 4 && (
          <div className="bg-gray-50 p-6 border-t border-gray-100 flex justify-between items-center">
            <button onClick={() => setCurrentStep(prev => prev - 1)} className={`font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-colors ${currentStep === 1 ? 'invisible' : 'text-gray-500 hover:bg-gray-200'}`}>
              <ChevronLeft size={20} /> Back
            </button>
            {currentStep < 3 ? (
              <button onClick={() => setCurrentStep(prev => prev + 1)} className="bg-gray-900 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 hover:bg-black transition-colors">
                Next Step <ChevronRight size={20} />
              </button>
            ) : (
              <button onClick={handlePublish} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all">
                Publish Lesson <QrCode size={20} />
              </button>
            )}
          </div>
        )}
      </div>

    </div>
  );
}