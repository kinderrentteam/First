import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Package, ArrowRight, CheckCircle2, Heart } from 'lucide-react';

export default function BoxDiscoveryFlow({ onPurchaseComplete }) {
  const [selectedPlan, setSelectedPlan] = useState('monthly'); // 'monthly' or 'onetime'

  const handleCheckout = () => {
    // In reality, this would open Stripe. For now, it triggers the success route!
    onPurchaseComplete('box-b');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans selection:bg-blue-100">
      
      {/* --- HERO SECTION --- */}
      <div className="bg-white px-6 pt-12 pb-8 rounded-b-[2.5rem] shadow-sm mb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-orange-50 to-transparent opacity-50"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold mb-4">
            <Star size={12} className="fill-orange-500" /> Perfect for 3-Year-Olds
          </div>
          <h1 className="text-3xl font-black text-gray-900 leading-tight mb-2">
            Meet your first box.
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            Everything you need for a 20-minute daily connection with your child, delivered to your door.
          </p>

          {/* Product Image Showcase */}
          <div className="relative w-full aspect-square bg-gradient-to-br from-orange-100 to-yellow-50 rounded-[2rem] border border-orange-200/50 flex items-center justify-center p-6 shadow-inner">
            {/* You can replace this placeholder with an actual Canva image of Box B later! */}
            <div className="text-center">
              <span className="text-8xl block mb-4 filter drop-shadow-lg">🦋</span>
              <h2 className="text-2xl font-black text-orange-900">Box B: Geo Butterfly</h2>
              <p className="text-orange-700 font-medium text-sm mt-1">3D-Printed Toys & Worksheets</p>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-2xl shadow-lg border border-gray-100 transform rotate-[-5deg]">
              <span className="text-sm font-bold text-gray-800 flex items-center gap-1">
                <Heart size={14} className="text-red-500 fill-red-500"/> Kid Approved
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6">
        
        {/* --- WHAT'S INSIDE --- */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Package size={18} className="text-blue-500" /> What's inside this month?
          </h3>
          <ul className="space-y-3">
            {[
              'Premium 3D-Printed Butterfly Puzzle',
              '7 Days of guided 20-minute lessons',
              'Physical worksheets and flashcards',
              'Access to exclusive animated videos',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-0.5" />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* --- PRICING SELECTOR --- */}
        <div>
          <h3 className="font-bold text-gray-900 mb-3 px-2">Choose your plan</h3>
          <div className="grid grid-cols-2 gap-4">
            
            {/* Monthly Rental */}
            <button 
              onClick={() => setSelectedPlan('monthly')}
              className={`relative p-5 rounded-3xl border-2 text-left transition-all ${selectedPlan === 'monthly' ? 'border-blue-600 bg-blue-50/50 shadow-md' : 'border-gray-200 bg-white hover:border-blue-200'}`}
            >
              {selectedPlan === 'monthly' && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Most Popular</div>}
              <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Rental Plan</div>
              <div className="text-2xl font-black text-gray-900 mb-1">₺299<span className="text-sm font-medium text-gray-500">/mo</span></div>
              <p className="text-[10px] text-gray-500 leading-tight">Swap for a new box every month. Cancel anytime.</p>
            </button>

            {/* One-Time Purchase */}
            <button 
              onClick={() => setSelectedPlan('onetime')}
              className={`relative p-5 rounded-3xl border-2 text-left transition-all ${selectedPlan === 'onetime' ? 'border-gray-900 bg-gray-50 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'}`}
            >
              <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Keep It</div>
              <div className="text-2xl font-black text-gray-900 mb-1">₺850</div>
              <p className="text-[10px] text-gray-500 leading-tight">Buy the box outright. No monthly subscription.</p>
            </button>
            
          </div>
        </div>

        {/* --- TRUST BADGE --- */}
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider pt-2">
          <ShieldCheck size={16} /> Secure Checkout via Stripe
        </div>

      </div>

      {/* --- STICKY CHECKOUT FOOTER --- */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-6 pb-safe z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <button 
          onClick={handleCheckout}
          className="w-full bg-blue-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          {selectedPlan === 'monthly' ? 'Start Rental Subscription' : 'Buy Box Now'} <ArrowRight size={20} />
        </button>
      </div>

    </div>
  );
}