import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Calendar, CheckCircle2, ArrowRight, Camera, Info, RefreshCw } from 'lucide-react';

export default function OnboardingGatekeeper({ onSuccessfulScan }) {
  // DEV TOGGLE: Change this to 'buyer' to see the QR Scanner, or 'renter' to see the Rental Rules.
  // In your final app, this will automatically pull from their database profile!
  const [userType, setUserType] = useState('renter'); 

  const handleSimulateQRScan = () => {
    // Buyers unlock via physical code
    onSuccessfulScan('KNDR-BUYER-123');
  };

  const handleRenterEnterDashboard = () => {
    // Renters bypass the QR code and go straight to the dashboard (which will be locked by Admin)
    onSuccessfulScan('KNDR-RENTER-AUTO');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans p-6">
      
      {/* DEV TESTING TOGGLE - You can remove this before launch! */}
      <div className="bg-white border-2 border-dashed border-purple-300 p-4 rounded-xl mb-8 flex items-center justify-between shadow-sm">
        <span className="text-xs font-bold text-purple-600 uppercase tracking-widest flex items-center gap-2"><RefreshCw size={14}/> Test Mode</span>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button onClick={() => setUserType('renter')} className={`px-4 py-1.5 text-xs font-bold rounded-md ${userType === 'renter' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>Simulate Renter</button>
          <button onClick={() => setUserType('buyer')} className={`px-4 py-1.5 text-xs font-bold rounded-md ${userType === 'buyer' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>Simulate Buyer</button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        
        {/* ========================================== */}
        {/* SCENARIO A: THE BUYER (QR CODE REQUIRED)   */}
        {/* ========================================== */}
        {userType === 'buyer' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
              <QrCode size={40} className="text-blue-600" />
            </div>
            <h1 className="text-3xl font-black text-gray-900 leading-tight">Unlock Your Box</h1>
            <p className="text-gray-600 font-medium text-lg leading-relaxed">
              Find the physical QR code printed on the welcome card inside your box. Scan it to permanently unlock your digital curriculum.
            </p>
            
            <div className="bg-white p-8 rounded-[2rem] border-2 border-dashed border-gray-300 text-center my-8">
              <Camera size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="font-bold text-gray-500">Camera ready for scanning...</p>
            </div>

            <button onClick={handleSimulateQRScan} className="w-full bg-gray-900 text-white font-bold text-lg py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-black transition-colors shadow-xl">
              Simulate Successful Scan <ArrowRight size={20} />
            </button>
          </motion.div>
        )}

        {/* ========================================== */}
        {/* SCENARIO B: THE RENTER (MONTHLY RULES)     */}
        {/* ========================================== */}
        {userType === 'renter' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
              <Calendar size={40} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-black text-gray-900 leading-tight">Your Rental Cycle</h1>
            <p className="text-gray-600 font-medium text-lg leading-relaxed">
              As a subscriber, you don't need a QR code! Here is how your monthly box rotation works:
            </p>
            
            <div className="bg-white p-6 rounded-[2rem] border border-gray-200 shadow-sm space-y-6 my-6">
               <div className="flex items-start gap-4">
                 <div className="bg-green-50 text-green-600 p-3 rounded-xl shrink-0"><CheckCircle2 size={24}/></div>
                 <div>
                   <h3 className="font-black text-gray-900">1st of the Month</h3>
                   <p className="text-sm text-gray-500 font-medium mt-1">Your new box arrives and your digital curriculum automatically unlocks.</p>
                 </div>
               </div>
               <div className="flex items-start gap-4">
                 <div className="bg-amber-50 text-amber-600 p-3 rounded-xl shrink-0"><Info size={24}/></div>
                 <div>
                   <h3 className="font-black text-gray-900">28th of the Month</h3>
                   <p className="text-sm text-gray-500 font-medium mt-1">Pack up the non-consumable toys and prepare for courier pickup.</p>
                 </div>
               </div>
            </div>

            <button onClick={handleRenterEnterDashboard} className="w-full bg-green-600 text-white font-bold text-lg py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-green-700 transition-colors shadow-xl shadow-green-200">
              Enter Dashboard <ArrowRight size={20} />
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
}