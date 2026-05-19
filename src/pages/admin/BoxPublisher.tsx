import React, { useState } from 'react';
import { Package, FileText, Image as ImageIcon, Volume2, Award, QrCode, Plus, Trash2, Save, Store, Truck, Camera, Lock, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BoxPublisher() {
  // --- 1. STOREFRONT DETAILS ---
  const [boxDetails, setBoxDetails] = useState({
    title: 'Explorer Box: Geo Butterfly',
    ageGroup: '3 years old',
    description: 'Advanced sorting, interactive character mats, and conceptual worksheets focusing on fine motor skills.',
    contents: '3D-Printed Geo Puzzle, Curriculum Guide, Physical Worksheets',
    heroImage: '' // CloudPanel URL for the Storefront
  });

  // --- 2. LOGISTICS & BOX TYPE ---
  const [boxType, setBoxType] = useState('rent'); // 'rent' (20 lessons) or 'buy' (10 lessons)
  const targetLessonCount = boxType === 'rent' ? 20 : 10;

  // --- 3. NESTED CURRICULUM BUILDER (Lessons -> Steps) ---
  const [lessons, setLessons] = useState([
    {
      id: Date.now(),
      lessonNumber: 1,
      dateLabel: 'Day 1',
      requiresAIScan: true, // The "Gatekeeper" lock
      isExpanded: true,
      steps: [
        { id: Date.now() + 1, title: 'Morning Circle', instruction: '', script: '', mediaUrl: '', audioUrl: '' }
      ]
    }
  ]);

  // --- 4. REWARDS & GAMIFICATION ---
  const [reward, setReward] = useState({
    badgeName: 'Golden Butterfly',
    badgeImage: '', // CloudPanel URL instead of Emoji
    frequency: 'daily'
  });

  // --- 5. WAREHOUSE / LOGISTICS ---
  const [generatedCode, setGeneratedCode] = useState(null);

  // --- HELPER FUNCTIONS FOR NESTED STATE ---
  
  // Lesson Operations
  const addLesson = () => {
    setLessons([...lessons, {
      id: Date.now(),
      lessonNumber: lessons.length + 1,
      dateLabel: `Day ${lessons.length + 1}`,
      requiresAIScan: true,
      isExpanded: true,
      steps: [{ id: Date.now() + 1, title: '', instruction: '', script: '', mediaUrl: '', audioUrl: '' }]
    }]);
  };

  const removeLesson = (lessonIndex) => {
    setLessons(lessons.filter((_, i) => i !== lessonIndex));
  };

  const toggleLessonExpand = (lessonIndex) => {
    const newLessons = [...lessons];
    newLessons[lessonIndex].isExpanded = !newLessons[lessonIndex].isExpanded;
    setLessons(newLessons);
  };

  const updateLessonField = (lessonIndex, field, value) => {
    const newLessons = [...lessons];
    newLessons[lessonIndex][field] = value;
    setLessons(newLessons);
  };

  // Step Operations (Inside a specific lesson)
  const addStepToLesson = (lessonIndex) => {
    const newLessons = [...lessons];
    newLessons[lessonIndex].steps.push({ id: Date.now(), title: '', instruction: '', script: '', mediaUrl: '', audioUrl: '' });
    setLessons(newLessons);
  };

  const updateStepInLesson = (lessonIndex, stepIndex, field, value) => {
    const newLessons = [...lessons];
    newLessons[lessonIndex].steps[stepIndex][field] = value;
    setLessons(newLessons);
  };

  const removeStepFromLesson = (lessonIndex, stepIndex) => {
    const newLessons = [...lessons];
    newLessons[lessonIndex].steps = newLessons[lessonIndex].steps.filter((_, i) => i !== stepIndex);
    setLessons(newLessons);
  };

  // Logistics & Publishing
  const handleGenerateQR = () => {
    if (lessons.length !== targetLessonCount) {
      alert(`Cannot generate QR Code. This is a ${boxType.toUpperCase()} box, which requires exactly ${targetLessonCount} lessons. You currently have ${lessons.length}.`);
      return;
    }
    const code = 'KNDR-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    setGeneratedCode(code);
  };

  const handlePublish = () => {
    if (!generatedCode) {
      alert("Please complete the curriculum and generate a Warehouse QR Code before publishing!");
      return;
    }
    alert("Box Successfully Published! It is now live in the Storefront and ready for warehouse fulfillment.");
  };

  return (
    <div className="max-w-5xl mx-auto font-sans pb-32">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900 leading-tight">Master Box Publisher</h1>
          <p className="text-gray-500 text-sm mt-1">Configure storefront, nested curriculum, rewards, and QA logistics.</p>
        </div>
        <button onClick={handlePublish} className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl text-sm hover:bg-blue-700 flex items-center gap-2 shadow-xl shadow-blue-200 transition-all">
          <Save size={18} /> Publish to Platform
        </button>
      </header>

      <div className="space-y-10">
        
        {/* ========================================== */}
        {/* 1. STOREFRONT & LOGISTICS CONFIG           */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <section className="lg:col-span-2 bg-white rounded-[2rem] shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-orange-50 border-b border-orange-100 px-8 py-5 flex items-center gap-3">
              <Store className="text-orange-600" size={24} />
              <h2 className="text-xl font-black text-orange-900">1. Storefront Profile</h2>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 bg-orange-50/50 p-4 rounded-xl border border-orange-100">
                <label className="text-xs font-bold text-orange-800 uppercase tracking-widest flex items-center gap-2 mb-2">
                  <ImageIcon size={14} /> Storefront Box Image (CloudPanel URL)
                </label>
                <input type="text" value={boxDetails.heroImage} onChange={(e) => setBoxDetails({...boxDetails, heroImage: e.target.value})} placeholder="https://cloudpanel.../box-b-hero.jpg" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-orange-500 outline-none shadow-sm" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Box Title</label>
                <input type="text" value={boxDetails.title} onChange={(e) => setBoxDetails({...boxDetails, title: e.target.value})} className="w-full font-bold text-lg border-b-2 border-gray-200 focus:border-orange-500 outline-none pb-2 mt-1" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Target Age Group</label>
                <select value={boxDetails.ageGroup} onChange={(e) => setBoxDetails({...boxDetails, ageGroup: e.target.value})} className="w-full font-bold text-lg border-b-2 border-gray-200 focus:border-orange-500 outline-none pb-2 mt-1 bg-transparent cursor-pointer">
                  <option>2 years old</option> <option>3 years old</option> <option>4 years old</option> <option>5-6 years old</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Storefront Description</label>
                <textarea value={boxDetails.description} onChange={(e) => setBoxDetails({...boxDetails, description: e.target.value})} className="w-full text-gray-700 border-2 border-gray-100 rounded-xl p-4 focus:border-orange-500 outline-none mt-2 h-24 resize-none" />
              </div>
            </div>
          </section>

          <section className="bg-white rounded-[2rem] shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-100 px-6 py-5 flex items-center gap-3">
              <Truck className="text-slate-600" size={20} />
              <h2 className="text-lg font-black text-slate-900">Box Logistics</h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-3">Fulfillment Type</label>
                <div className="flex bg-gray-100 rounded-xl p-1">
                  <button onClick={() => setBoxType('rent')} className={`flex-1 text-sm font-bold py-3 rounded-lg transition-all ${boxType === 'rent' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}>Rental Box</button>
                  <button onClick={() => setBoxType('buy')} className={`flex-1 text-sm font-bold py-3 rounded-lg transition-all ${boxType === 'buy' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}>Buy to Keep</button>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
                <p className="text-[10px] font-black text-blue-800 uppercase tracking-widest mb-1">Curriculum Requirement</p>
                <p className="text-3xl font-black text-blue-600">{targetLessonCount}</p>
                <p className="text-xs text-blue-600 font-medium">Lessons required before QR generation</p>
              </div>
            </div>
          </section>

        </div>

        {/* ========================================== */}
        {/* 2. NESTED CURRICULUM BUILDER               */}
        {/* ========================================== */}
        <section className="bg-white rounded-[2rem] shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-blue-50 border-b border-blue-100 px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="text-blue-600" size={24} />
              <h2 className="text-xl font-black text-blue-900">2. Curriculum Builder ({lessons.length}/{targetLessonCount})</h2>
            </div>
            <button onClick={addLesson} className="bg-white text-blue-600 font-bold px-4 py-2 rounded-lg text-sm shadow-sm flex items-center gap-2 hover:bg-blue-50"><Plus size={16}/> Add Lesson</button>
          </div>
          
          <div className="p-8 space-y-8 bg-gray-50/50">
            {lessons.map((lesson, lIndex) => (
              <div key={lesson.id} className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 overflow-hidden transition-all">
                
                {/* LESSON HEADER */}
                <div className="bg-slate-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button onClick={() => toggleLessonExpand(lIndex)} className="text-gray-400 hover:text-gray-800">
                      {lesson.isExpanded ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                    </button>
                    <div className="flex items-center gap-3">
                      <span className="bg-slate-200 text-slate-700 font-black px-3 py-1 rounded-md">Lesson {lesson.lessonNumber}</span>
                      <input type="text" value={lesson.dateLabel} onChange={(e) => updateLessonField(lIndex, 'dateLabel', e.target.value)} className="font-bold text-gray-700 bg-transparent border-b border-dashed border-gray-300 focus:border-blue-500 outline-none w-24" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{lesson.steps.length} Steps</span>
                    <button onClick={() => removeLesson(lIndex)} className="text-red-400 hover:text-red-600"><Trash2 size={18}/></button>
                  </div>
                </div>

                {/* LESSON CONTENT (STEPS & SETTINGS) */}
                <AnimatePresence>
                  {lesson.isExpanded && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="p-6 space-y-6">
                        
                        {/* STEPS LIST */}
                        {lesson.steps.map((step, sIndex) => (
                          <div key={step.id} className="bg-gray-50 rounded-xl border border-gray-100 p-5 flex items-start gap-4">
                            <div className="bg-blue-100 text-blue-700 font-black w-8 h-8 flex items-center justify-center rounded-lg shrink-0">{sIndex + 1}</div>
                            <div className="flex-1 space-y-5">
                              
                              <div className="flex justify-between items-start">
                                <input type="text" value={step.title} onChange={(e) => updateStepInLesson(lIndex, sIndex, 'title', e.target.value)} placeholder="Step Title (e.g. Build a Butterfly)" className="font-bold text-lg text-gray-900 bg-transparent border-b border-gray-200 focus:border-blue-500 outline-none w-full max-w-md pb-1" />
                                <button onClick={() => removeStepFromLesson(lIndex, sIndex)} className="text-gray-400 hover:text-red-500"><Trash2 size={16}/></button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Parent Instruction</label>
                                  <textarea value={step.instruction} onChange={(e) => updateStepInLesson(lIndex, sIndex, 'instruction', e.target.value)} placeholder="What should the parent do?" className="w-full bg-white border border-gray-200 rounded-lg p-3 text-sm focus:border-blue-500 outline-none resize-none h-20" />
                                </div>
                                <div>
                                  <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Parent Script</label>
                                  <textarea value={step.script} onChange={(e) => updateStepInLesson(lIndex, sIndex, 'script', e.target.value)} placeholder="What should the parent say?" className="w-full bg-blue-50/50 border border-blue-100 text-blue-900 rounded-lg p-3 text-sm focus:border-blue-500 outline-none resize-none h-20 font-medium" />
                                </div>
                              </div>

                              {/* CLOUDPANEL URLS */}
                              <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                  <ImageIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                  <input type="text" value={step.mediaUrl} onChange={(e) => updateStepInLesson(lIndex, sIndex, 'mediaUrl', e.target.value)} placeholder="Visual Media URL (CloudPanel)" className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:border-blue-500 outline-none shadow-sm" />
                                </div>
                                <div className="flex-1 relative">
                                  <Volume2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                  <input type="text" value={step.audioUrl} onChange={(e) => updateStepInLesson(lIndex, sIndex, 'audioUrl', e.target.value)} placeholder="Audio Pronunciation URL (CloudPanel)" className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:border-purple-500 outline-none shadow-sm" />
                                </div>
                              </div>

                            </div>
                          </div>
                        ))}
                        
                        <button onClick={() => addStepToLesson(lIndex)} className="w-full bg-white border border-dashed border-gray-300 text-blue-600 font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors text-sm">
                          <Plus size={16} /> Add Step to {lesson.dateLabel}
                        </button>

                        {/* THE AI GATEKEEPER LOCK */}
                        <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between bg-green-50/50 p-4 rounded-xl border border-green-100">
                           <div className="flex items-center gap-3">
                             <div className="bg-green-100 text-green-600 p-2 rounded-lg"><Camera size={20}/></div>
                             <div>
                               <p className="font-bold text-green-900 text-sm">Require AI Worksheet Scan</p>
                               <p className="text-xs text-green-700">Parents must upload a photo to unlock tomorrow's lesson.</p>
                             </div>
                           </div>
                           
                           {/* Toggle Switch */}
                           <button 
                             onClick={() => updateLessonField(lIndex, 'requiresAIScan', !lesson.requiresAIScan)}
                             className={`w-14 h-8 rounded-full relative transition-colors ${lesson.requiresAIScan ? 'bg-green-500' : 'bg-gray-300'}`}
                           >
                             <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all ${lesson.requiresAIScan ? 'left-7' : 'left-1'}`} />
                           </button>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================== */}
        {/* 3. GAMIFICATION & REWARDS                  */}
        {/* ========================================== */}
        <section className="bg-white rounded-[2rem] shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-yellow-50 border-b border-yellow-100 px-8 py-5 flex items-center gap-3">
            <Award className="text-yellow-600" size={24} />
            <h2 className="text-xl font-black text-yellow-900">3. Badges & Rewards</h2>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Badge Name</label>
                  <input type="text" value={reward.badgeName} onChange={(e) => setReward({...reward, badgeName: e.target.value})} className="w-full font-bold text-lg border-b-2 border-gray-200 focus:border-yellow-500 outline-none pb-2 mt-1" />
                </div>
                <div>
                  <label className="text-xs font-bold text-yellow-800 uppercase tracking-widest flex items-center gap-2 mb-2">
                    <ImageIcon size={14} /> Badge Graphic (CloudPanel URL)
                  </label>
                  <input type="text" value={reward.badgeImage} onChange={(e) => setReward({...reward, badgeImage: e.target.value})} placeholder="https://cloudpanel.../butterfly-badge.png" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-yellow-500 outline-none shadow-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 block">Reward Logic</label>
                  <div className="flex bg-gray-100 rounded-lg p-1 w-full max-w-xs">
                    <button onClick={() => setReward({...reward, frequency: 'daily'})} className={`flex-1 text-sm font-bold py-2 rounded-md transition-all ${reward.frequency === 'daily' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>Award Daily</button>
                    <button onClick={() => setReward({...reward, frequency: 'weekly'})} className={`flex-1 text-sm font-bold py-2 rounded-md transition-all ${reward.frequency === 'weekly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>Award Weekly</button>
                  </div>
                </div>
             </div>
             
             {/* Preview */}
             <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center overflow-hidden mb-4">
                  {reward.badgeImage ? (
                    <img src={reward.badgeImage} alt="Badge" className="w-full h-full object-cover" />
                  ) : (
                    <Award size={40} className="text-gray-300" />
                  )}
                </div>
                <p className="font-black text-gray-900 text-lg">{reward.badgeName}</p>
             </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* 4. WAREHOUSE & LOGISTICS                   */}
        {/* ========================================== */}
        <section className="bg-white rounded-[2rem] shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-green-50 border-b border-green-100 px-8 py-5 flex items-center gap-3">
            <QrCode className="text-green-600" size={24} />
            <h2 className="text-xl font-black text-green-900">4. Warehouse Linking</h2>
          </div>
          <div className="p-8 flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="max-w-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Generate Scanner Code</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                This requires exactly {targetLessonCount} published lessons. Scanning this code physically ties the box to the user's curriculum account.
              </p>
              
              <div className="flex items-center gap-2">
                {lessons.length === targetLessonCount ? (
                   <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"><CheckCircle2 size={14}/> {lessons.length}/{targetLessonCount} Lessons Complete</span>
                ) : (
                   <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"><Lock size={14}/> Missing Lessons ({lessons.length}/{targetLessonCount})</span>
                )}
              </div>
            </div>
            
            {generatedCode ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-gray-900 text-white rounded-[2rem] p-6 text-center w-full md:w-64 relative overflow-hidden">
                 <QrCode size={48} className="mx-auto text-green-400 mb-3" />
                 <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">Secure Code</p>
                 <p className="text-2xl font-mono font-black tracking-wider">{generatedCode}</p>
              </motion.div>
            ) : (
              <button 
                onClick={handleGenerateQR} 
                disabled={lessons.length !== targetLessonCount}
                className="bg-green-600 disabled:bg-gray-300 text-white font-bold px-8 py-4 rounded-xl hover:bg-green-700 transition-colors flex items-center gap-2 w-full md:w-auto justify-center"
              >
                <QrCode size={20} /> Generate QR Link
              </button>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}