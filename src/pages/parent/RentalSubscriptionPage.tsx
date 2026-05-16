import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, AlertTriangle, ShieldCheck, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

export default function RentalSubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [activeNotification, setActiveNotification] = useState<'promo' | 'return' | null>('promo');

  // Subscription plan configurations managed via the Admin Dashboard control panel
  const subscriptionPlans = [
    { id: '3-month', duration: '3 Months', price: '₺400', billing: 'Billed monthly', savings: 'Save 10%' },
    { id: '6-month', duration: '6 Months', price: '₺360', billing: 'Billed monthly', savings: 'Save 20%', popular: true },
    { id: '12-month', duration: '12 Months', price: '₺320', billing: 'Billed monthly', savings: 'Best Value! Save 30%' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans">
      
      {/* --- FLOATING LOGISTICS NOTIFICATIONS (TIMELINE SIMULATOR) --- */}
      <AnimatePresence mode="wait">
        {activeNotification && (
          <div className="p-4 bg-white border-b border-gray-100 shadow-sm space-y-3">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest flex justify-between items-center">
              <span>Simulated Timeline Alert:</span>
              <button onClick={() => setActiveNotification(null)} className="text-gray-400 hover:text-gray-600">Close</button>
            </div>
            
            {/* Alert A: One week before next month starts */}
            {activeNotification === 'promo' && (
              <motion.div 
                key="promo-alert"
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex gap-4 items-start"
              >
                <div className="bg-blue-600 text-white p-2 rounded-xl shrink-0"><Sparkles size={20} /></div>
                <div className="flex-1">
                  <h4 className="font-bold text-blue-900 text-sm">Keep the Adventure Going! 🚀</h4>
                  <p className="text-xs text-blue-700 mt-0.5 leading-relaxed">
                    Your current box chapter is ending soon. Unlock a continuous supply of 3D-printed toys by subscribing to a monthly rotation plan below!
                  </p>
                  <button 
                    onClick={() => setActiveNotification('return')} 
                    className="mt-3 text-xs font-bold text-blue-700 bg-blue-100/50 px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
                  >
                    Simulate: End of Month Return Warning
                  </button>
                </div>
              </motion.div>
            )}

            {/* Alert B: One week before current month ends */}
            {activeNotification === 'return' && (
              <motion.div 
                key="return-alert"
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-4 items-start"
              >
                <div className="bg-amber-500 text-white p-2 rounded-xl shrink-0"><AlertTriangle size={20} /></div>
                <div className="flex-1">
                  <h4 className="font-bold text-amber-900 text-sm">Return Window is Approaching 📦</h4>
                  <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                    Your rental cycle ends in 7 days. Please gently clean the pieces and pack them safely back into your KinderRent box. Your courier will arrive on the 1st, bringing your brand new box!
                  </p>
                  <button 
                    onClick={() => setActiveNotification('promo')} 
                    className="mt-3 text-xs font-bold text-amber-800 bg-amber-100/50 px-3 py-1.5 rounded-lg border border-amber-200 hover:bg-amber-100 transition-colors"
                  >
                    Simulate: Next Promo Warning
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>

      {/* --- MAIN SUBSCRIPTION CONTENT --- */}
      <main className="px-6 pt-8 space-y-8">
        
        <header className="text-center">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-bold mb-3 border border-purple-100">
            <RefreshCw size={14} /> The Rental Club
          </div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">Never stop learning.</h1>
          <p className="text-gray-500 text-sm">Subscribe once, and a new 3D-printed adventure arrives on the 1st of every month.</p>
        </header>

        {/* Plan Selection */}
        <div className="space-y-4">
          {subscriptionPlans.map(plan => (
            <div 
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative bg-white rounded-2xl p-5 border-2 cursor-pointer transition-all ${
                selectedPlan === plan.id 
                  ? 'border-blue-500 shadow-md ring-4 ring-blue-50' 
                  : 'border-gray-100 shadow-sm hover:border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                  Most Popular
                </div>
              )}
              <div className="flex justify-between items-center mb-1">
                <h3 className={`text-xl font-bold ${selectedPlan === plan.id ? 'text-blue-900' : 'text-gray-900'}`}>{plan.duration}</h3>
                <span className="text-xl font-black text-blue-600">{plan.price}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">{plan.billing}</span>
                <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-md">{plan.savings}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Security & Logistics Rules (To reassure the parent) */}
        <div className="bg-gray-900 rounded-[2rem] p-6 text-white shadow-lg">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><ShieldCheck className="text-blue-400" /> How the Rental Works</h3>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-green-400 shrink-0 mt-0.5" /> 
              <span><strong className="text-white">Seamless Delivery:</strong> Your new box arrives on the 1st of the month. Give the old box to the same courier.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-green-400 shrink-0 mt-0.5" /> 
              <span><strong className="text-white">Exclusive Access:</strong> Scan the unique QR code inside to unlock that month's lessons. <em className="text-gray-400">(Codes are one-time-use per family).</em></span>
            </li>
          </ul>
        </div>

        <button 
          disabled={!selectedPlan}
          className="w-full bg-blue-600 text-white font-bold text-lg py-5 rounded-2xl shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:shadow-none active:scale-95"
          onClick={() => alert(`Subscribing to ${selectedPlan} plan! Routing to checkout...`)}
        >
          Subscribe & Secure Next Box <ChevronRight size={20} />
        </button>
      </main>

    </div>
  );
}