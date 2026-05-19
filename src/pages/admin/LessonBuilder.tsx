import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Youtube, Music, Image as ImageIcon, Save, PlusCircle, Trash2, LayoutTemplate, PlayCircle, Award } from 'lucide-react';

export default function LessonBuilder() {
  // --- CMS STATE MANAGEMENT ---
  const [lessonTitle, setLessonTitle] = useState('Day 1: Hello, Butterfly!');
  const [assignedBox, setAssignedBox] = useState('box-b');
  const [youtubeLink, setYoutubeLink] = useState('https://youtube.com/watch?v=...');
  const [musicTrack, setMusicTrack] = useState('ukulele-happy-morning.mp3');
  const [rewardBadge, setRewardBadge] = useState('butterfly-gold-sticker.png');

  // Pre-loaded with your signature 5-step structure
  const [steps, setSteps] = useState([
    { id: 1, title: 'Morning Circle', type: 'video', uiText: 'Play the video, dance together, and check in.', parentScript: "Hello! Let's jump and spin together!" },
    { id: 2, title: 'The Toy Builder', type: 'activity', uiText: 'Open your KinderRent box and take out the puzzle pieces.', parentScript: "What do you think we can make with these pieces?" },
    { id: 3, title: 'The Home Explorer Game', type: 'play', uiText: 'Grab a single tissue or a light scarf.', parentScript: "Look, it can fly! Can you catch it?" },
    { id: 4, title: 'Table Time Kickoff', type: 'worksheet', uiText: 'Grab Worksheet 1 and a crayon.', parentScript: "Can you match it to its shadow? You draw the line!" },
    { id: 5, title: 'Flashcard Wind Down', type: 'camera', uiText: 'Let\'s do a quiet review and log progress.', parentScript: "Look, this is our flashcard. You are so smart." }
  ]);

  const handleSave = (e) => {
    e.preventDefault();
    alert("Lesson published to the Cloud! Parents will now see this instantly on their app.");
  };

  return (
    <div className="max-w-5xl mx-auto font-sans pb-24">
      
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold mb-3 border border-blue-100">
          <LayoutTemplate size={14} /> Content Management System
        </div>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">Interactive Lesson Builder</h1>
        <p className="text-gray-500 text-sm mt-1">Design the parent experience, attach your media, and publish instantly.</p>
      </header>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* --- GLOBAL LESSON SETTINGS --- */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">1. Core Settings & Media</h2>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Lesson Title (English)</label>
              <input type="text" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Assign to Box</label>
              <select value={assignedBox} onChange={(e) => setAssignedBox(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="box-b">Box B: Geo Butterfly</option>
                <option value="box-a">Box A: Stacking Blocks</option>
              </select>
            </div>
          </div>

          {/* Cloud Media Attachments */}
          <div className="grid grid-cols-3 gap-4">
            
            {/* YouTube Link */}
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 hover:border-red-300 transition-colors">
              <div className="flex items-center gap-2 mb-3 text-red-600 font-bold text-sm"><Youtube size={18} /> Animated Video Link</div>
              <input type="text" value={youtubeLink} onChange={(e) => setYoutubeLink(e.target.value)} placeholder="Paste YouTube URL..." className="w-full text-xs p-2 rounded-lg border border-gray-200 outline-none" />
            </div>

            {/* Cloud Audio */}
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 hover:border-purple-300 transition-colors">
              <div className="flex items-center gap-2 mb-3 text-purple-600 font-bold text-sm"><Music size={18} /> Background Audio</div>
              <select value={musicTrack} onChange={(e) => setMusicTrack(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200 outline-none bg-white">
                <option value="ukulele-happy-morning.mp3">Ukulele Happy Morning</option>
                <option value="calm-focus.mp3">Calm Focus Time</option>
              </select>
              <button type="button" className="text-[10px] text-purple-600 font-bold mt-2 underline">Upload new audio to cloud</button>
            </div>

            {/* Reward Badge */}
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 hover:border-yellow-400 transition-colors">
              <div className="flex items-center gap-2 mb-3 text-yellow-600 font-bold text-sm"><Award size={18} /> Completion Reward</div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center text-xl">🦋</div>
                <select value={rewardBadge} onChange={(e) => setRewardBadge(e.target.value)} className="flex-1 text-xs p-2 rounded-lg border border-gray-200 outline-none bg-white">
                  <option value="butterfly-gold-sticker.png">Butterfly Badge</option>
                  <option value="train-sticker.png">Train Badge</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* --- THE 5-STEP LESSON BUILDER --- */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
            <h2 className="text-lg font-bold text-gray-900">2. The 5-Step Parent Guide</h2>
          </div>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={step.id} className="border-2 border-gray-100 rounded-xl p-5 relative group hover:border-blue-200 transition-colors">
                <div className="absolute -left-3 -top-3 w-8 h-8 bg-blue-600 text-white font-black rounded-full flex items-center justify-center shadow-md">
                  {index + 1}
                </div>
                
                <div className="grid grid-cols-3 gap-6 ml-4">
                  <div className="col-span-1 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Step Title</label>
                      <input type="text" value={step.title} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 font-bold text-gray-900 outline-none" readOnly />
                    </div>
                  </div>
                  
                  <div className="col-span-2 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">App UI Text (Instructions)</label>
                      <textarea rows={2} value={step.uiText} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none resize-none" readOnly />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-blue-500 uppercase tracking-wider mb-1">Parent Script (What they say aloud)</label>
                      <textarea rows={2} value={step.parentScript} className="w-full bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-sm text-blue-900 font-medium italic outline-none resize-none" readOnly />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- PUBLISH BUTTON --- */}
        <div className="flex justify-end gap-4">
          <button type="button" className="px-6 py-4 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors">Save as Draft</button>
          <button type="submit" className="bg-blue-600 text-white font-bold text-lg px-10 py-4 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2">
            <Save size={20} /> Publish Lesson to App
          </button>
        </div>

      </form>
    </div>
  );
}