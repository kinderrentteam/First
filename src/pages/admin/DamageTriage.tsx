import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Camera, Bot, CheckCircle2, AlertTriangle, Send, XCircle, CreditCard } from 'lucide-react';

export default function DamageTriage() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [actionStatus, setActionStatus] = useState(null);

  // Mock data of reports sent in by parents
  const reports = [
    {
      id: 'REP-001',
      parent: 'Sarah K.',
      plan: '6-Month Rental',
      box: 'Box B: Geo Butterfly',
      item: 'Butterfly Right Wing',
      date: 'Today, 10:42 AM',
      parentNote: "Leo stepped on it by accident while running to the kitchen. So sorry!",
      image: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&q=80&w=400&h=300", // Placeholder broken toy
      aiAnalysis: 'Severe structural snap detected. Part cannot be re-used.',
      aiSeverity: 'High',
      replacementCost: '₺85'
    },
    {
      id: 'REP-002',
      parent: 'Murat Y.',
      plan: '3-Month Rental',
      box: 'Box A: Stacking Blocks',
      item: 'Blue Cylinder Block',
      date: 'Yesterday, 4:15 PM',
      parentNote: "The dog chewed on the corner a little bit.",
      image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=400&h=300", 
      aiAnalysis: 'Minor cosmetic teeth marks. Part is safe but fails visual QC.',
      aiSeverity: 'Low',
      replacementCost: '₺20'
    }
  ];

  const handleAction = (type) => {
    setActionStatus(type);
    setTimeout(() => {
      setSelectedReport(null);
      setActionStatus(null);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto font-sans pb-24">
      
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-bold mb-3 border border-orange-100">
          <ShieldAlert size={14} /> Damage Control Center
        </div>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">Reported Damages</h1>
        <p className="text-gray-500 text-sm mt-1">Review parent photos, check the AI analysis, and issue invoices or waivers.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: INBOX --- */}
        <div className="lg:col-span-1 space-y-4">
          {reports.map((report) => (
            <div 
              key={report.id}
              onClick={() => setSelectedReport(report)}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${selectedReport?.id === report.id ? 'border-orange-500 bg-orange-50/30 shadow-md' : 'border-gray-100 bg-white hover:border-orange-200'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{report.id}</span>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${report.aiSeverity === 'High' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-700'}`}>
                  {report.aiSeverity} Damage
                </span>
              </div>
              <h3 className="font-bold text-gray-900">{report.parent}</h3>
              <p className="text-sm text-gray-500 mb-2">{report.box}</p>
              <p className="text-xs text-gray-400 flex items-center gap-1"><Camera size={12}/> Photo attached</p>
            </div>
          ))}
        </div>

        {/* --- RIGHT COLUMN: TRIAGE VIEWER --- */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedReport ? (
              <motion.div 
                key="viewer"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Header Info */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedReport.item}</h2>
                    <p className="text-sm text-gray-500">Reported by {selectedReport.parent} • {selectedReport.plan}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Replacement Cost</p>
                    <p className="text-2xl font-black text-gray-900">{selectedReport.replacementCost}</p>
                  </div>
                </div>

                <div className="p-6 grid grid-cols-2 gap-6">
                  {/* Photo Evidence */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2"><Camera size={14}/> Parent Evidence</h3>
                    <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-100 aspect-video relative">
                      <img src={selectedReport.image} alt="Damage" className="w-full h-full object-cover opacity-80" />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="border-2 border-red-500 w-1/2 h-1/2 rounded-full border-dashed animate-pulse"></div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <p className="text-sm text-gray-700 italic">"{selectedReport.parentNote}"</p>
                    </div>
                  </div>

                  {/* AI Analysis & Actions */}
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl">
                      <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center gap-2 mb-2"><Bot size={14}/> AI Vision Assessment</h3>
                      <p className="text-sm text-blue-900 font-medium leading-relaxed">{selectedReport.aiAnalysis}</p>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <h3 className="text-sm font-bold text-gray-900 mb-4">Admin Decision</h3>
                      
                      {actionStatus === 'forgive' ? (
                        <div className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-3 font-bold border border-green-200">
                          <CheckCircle2 size={24} /> Minor damage waived. Parent notified.
                        </div>
                      ) : actionStatus === 'penalty' ? (
                        <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-center gap-3 font-bold border border-red-200">
                          <Send size={24} /> {selectedReport.replacementCost} penalty invoice sent.
                        </div>
                      ) : (
                        <div className="flex gap-3">
                          <button 
                            onClick={() => handleAction('forgive')}
                            className="flex-1 bg-white border-2 border-gray-200 text-gray-700 font-bold py-3 px-4 rounded-xl hover:bg-gray-50 hover:border-green-400 transition-all flex items-center justify-center gap-2"
                          >
                            <CheckCircle2 size={18} className="text-green-500"/> Forgive
                          </button>
                          <button 
                            onClick={() => handleAction('penalty')}
                            className="flex-1 bg-gray-900 text-white font-bold py-3 px-4 rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg"
                          >
                            <CreditCard size={18} className="text-red-400"/> Issue Penalty
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-gray-400 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <ShieldAlert size={48} className="mb-4 text-gray-300" />
                <p className="font-bold">Select a report to review</p>
                <p className="text-sm mt-1">AI analysis is standing by.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}