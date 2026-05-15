import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Lock, ChevronRight } from 'lucide-react';

interface OnboardingGatekeeperProps {
  onSuccessfulScan: (code: string) => void;
}

export default function OnboardingGatekeeper({ onSuccessfulScan }: OnboardingGatekeeperProps) {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 5) {
      onSuccessfulScan(code);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-bg-warm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center space-y-4">
          <motion.div 
            animate={{ rotate: [3, -3, 3] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="inline-block p-5 gradient-pink rounded-[2rem] shadow-xl shadow-brand-pink/20 mb-2"
          >
            <Lock className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">
            Kinder<span className="text-brand-pink">Rent</span>
          </h1>
          <p className="text-lg text-slate-500 font-bold">Ready for today's adventure? Scan your box code.</p>
        </div>

        <div className="glass-card p-10 space-y-6">
          <button 
            onClick={() => onSuccessfulScan('BTRFL-BOX')} // For demo purposes, clicking scan "unlocks" a box
            className="w-full py-8 flex flex-col items-center justify-center gap-3 border-4 border-dashed border-slate-200/50 rounded-[2.5rem] hover:border-brand-pink/30 hover:bg-white/40 transition-all group"
          >
            <QrCode className="w-12 h-12 text-slate-300 group-hover:text-brand-pink" />
            <span className="font-black text-slate-400 group-hover:text-brand-pink uppercase tracking-widest text-xs">Scan Box QR Code</span>
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t-2 border-slate-100" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-white/0 px-4 text-slate-400 font-black tracking-widest">OR</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input 
              type="text" 
              maxLength={5}
              placeholder="SECRET CODE"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="w-full text-center text-4xl tracking-[0.4em] font-display font-black py-5 rounded-[2rem] bg-white/50 border-4 border-white focus:border-brand-pink/20 outline-none transition-all placeholder:text-slate-200 placeholder:tracking-widest placeholder:text-lg"
            />
            <button 
              type="submit"
              disabled={code.length < 5}
              className="w-full py-5 gradient-pink disabled:opacity-50 disabled:shadow-none text-white font-black text-xl rounded-[2rem] shadow-2xl shadow-brand-pink/30 flex items-center justify-center gap-3 bouncy-hover group"
            >
              Unlock Box
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <ChevronRight className="w-6 h-6" strokeWidth={3} />
              </motion.div>
            </button>
          </form>
        </div>

        <p className="text-center text-slate-400 text-sm font-bold uppercase tracking-widest pt-4">
          Need a box? <a href="#" className="text-brand-pink hover:underline">Explore Shop</a>
        </p>
      </motion.div>
    </div>
  );
}
