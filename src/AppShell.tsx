import ProgressRewards from './pages/parent/ProgressRewards';
import RentalSubscriptionPage from './pages/parent/RentalSubscriptionPage';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Imports
import AdminDashboard from './pages/admin/AdminDashboard';
import BoxDiscoveryFlow from './pages/parent/BoxDiscoveryFlow';
import OrderTrackingDashboard from './pages/parent/OrderTrackingDashboard';
import OnboardingGatekeeper from './pages/parent/OnboardingGatekeeper';
import ParentDashboard from './pages/parent/Dashboard';

export default function AppShell() {
  // --- THE APP'S MEMORY (STATE) ---
  // Start the user at the Discovery flow
  const [currentRoute, setCurrentRoute] = useState('admin');
  const [activeBoxCode, setActiveBoxCode] = useState<string | null>(null);

  // --- THE WIRING (ROUTING FUNCTIONS) ---
  
  // 1. When they finish checkout in Discovery
  const handlePurchaseComplete = (boxId: string) => {
    // We know what box they bought, but it's not "Unlocked" yet.
    // Send them to the waiting room!
    setCurrentRoute('tracking'); 
  };

  // 2. When they click "I have my box" in the Tracking screen
  const handleBoxArrived = () => {
    setCurrentRoute('onboarding'); // Send to scanner
  };

  // 3. When they successfully scan the QR code
  const handleBoxUnlock = (boxCode: string) => {
    setActiveBoxCode(boxCode);    
    setCurrentRoute('dashboard'); // Finally, give them the lessons!
  };

  // --- THE RENDERER ---
  return (
    <div className="w-full min-h-screen bg-bg-warm overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        
        {/* Route: Admin (Hidden for now, change initial state to 'admin' to see) */}
        {currentRoute === 'admin' && (
          <motion.div key="route-admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
            <AdminDashboard />
          </motion.div>
        )}

        {/* Route 1: Discovery & Add to Cart */}
        {currentRoute === 'discovery' && (
          <motion.div key="route-discovery" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} className="w-full h-full bg-white z-50">
            <BoxDiscoveryFlow onPurchaseComplete={handlePurchaseComplete} />
          </motion.div>
        )}
        {currentRoute === 'progress' && (
  <motion.div key="route-progress" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full bg-white z-50">
    <ProgressRewards />
  </motion.div>
)}
        {/* Route 2: Post-Purchase Order Tracking & Blogs */}
        {currentRoute === 'tracking' && (
          <motion.div key="route-tracking" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} className="w-full h-full">
            <OrderTrackingDashboard onBoxArrived={handleBoxArrived} />
          </motion.div>
        )}

        {/* Route 3: The Gatekeeper (QR Scanner) */}
        {currentRoute === 'onboarding' && (
          <motion.div key="route-onboarding" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full h-full">
            <OnboardingGatekeeper onSuccessfulScan={handleBoxUnlock} /> 
          </motion.div>
        )}

        {/* Route 4: The Final Parent Dashboard with Lessons unlocked */}
        {currentRoute === 'dashboard' && (
          <motion.div key="route-dashboard" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="w-full h-full">
            <ParentDashboard activeBox={activeBoxCode || undefined} /> 
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}