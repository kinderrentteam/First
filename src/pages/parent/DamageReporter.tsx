import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, AlertTriangle, Send, X, Package, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function DamageReporter({ onClose }) {
  const [step, setStep] = useState(1); // 1: Form, 2: Success
  const [selectedToy, setSelectedToy] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a live app, this sends the photo and note to your Admin Triage database!
    setStep(2);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-4 bg-gray-900/40 backdrop-blur-sm font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 100 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: 100 }}
        className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden relative"
      >
        
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-b border-gray-100">
          <div className="flex items-center gap-2 text-orange-600 font-bold">
            <AlertTriangle size={18} /> Report an Issue
          </div>
          <button onClick={onClose} className="p-2 bg-white rounded-full text-gray-400 hover:text-gray-600 shadow-sm">
            <X size={16} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.form key="form" onSubmit={handleSubmit} className="p-6 space-y-6">
              
              <div className="bg-orange-50 text-orange-800 p-4 rounded-xl text-sm border border-orange-100 flex gap-3 leading-relaxed">
                <ShieldCheck className="shrink-0 text-orange-500 mt-0.5" size={18} />
                <p>Accidents happen! Snap a quick photo and tell us what went wrong. Our team will review it and let you know the next steps.</p>
              </div>

              {/* Toy Selector */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Which piece is damaged?</label>
                <div className="relative">
                  <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <select 
                    required
                    value={selectedToy}
                    onChange={(e) => setSelectedToy(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-4 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none appearance-none"
                  >
                    <option value="" disabled>Select a toy from your box...</option>
                    <option value="butterfly-wing">Geo Butterfly - Wing</option>
                    <option value="butterfly-body">Geo Butterfly - Body</option>
                    <option value="flashcards">Worksheet / Flashcards</option>
                  </select>
                </div>
              </div>

              {/* Camera Upload Simulator */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Photo Evidence</label>
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 hover:border-orange-300 transition-colors cursor-pointer group">
                  <div className="bg-orange-100 text-orange-500 p-4 rounded-full mb-3 group-hover:scale-110 transition-transform">
                    <Camera size={24} />
                  </div>
                  <span className="font-bold text-gray-700">Tap to take a photo</span>
                  <span className="text-xs text-gray-400 mt-1">Make sure the damage is clearly visible</span>
                </div>
              </div>

              {/* Parent Note */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">What happened?</label>
                <textarea 
                  required
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g., Leo accidentally stepped on it..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-gray-900 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-black active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Submit Report to KinderRent <Send size={18} />
              </button>

            </motion.form>
          ) : (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-10 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-500 rounded-full mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Sent!</h2>
              <p className="text-gray-500 mb-8">Our AI and support team are reviewing the photo. We will notify you here in the app shortly!</p>
              <button 
                onClick={onClose}
                className="w-full bg-gray-100 text-gray-700 font-bold text-lg py-4 rounded-xl hover:bg-gray-200 transition-all"
              >
                Back to Dashboard
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}