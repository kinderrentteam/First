import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- IMPORTS ---
import AdminDashboard from './pages/admin/AdminDashboard';
import AuthScreen from './pages/parent/AuthScreen';
import PersonalizedStorefront from './pages/parent/PersonalizedStorefront';
import OrderTrackingDashboard from './pages/parent/OrderTrackingDashboard';
import OnboardingGatekeeper from './pages/parent/OnboardingGatekeeper';
import ParentDashboard from './pages/parent/ParentDashboard'; 
import ProgressRewards from './pages/parent/ProgressRewards';

export default function AppShell() {
  // --- THE APP'S MEMORY (STATE) ---
  // We start at the absolute beginning: The Auth Screen
const [currentRoute, setCurrentRoute] = useState('auth');
  const [activeBoxCode, setActiveBoxCode] = useState(null);

  // --- THE WIRING (ROUTING FUNCTIONS) ---
  
  // 0. After they log in, check their role!
  const handleLoginSuccess = (role) => {
    if (role === 'admin') {
      setCurrentRoute('admin'); // Send admin to the command center
    } else {
      setCurrentRoute('discovery'); // Send parent to the storefront
    }
  };

  // 1. After they buy the box, send them to the waiting room!
  const handlePurchaseComplete = (boxId) => {
    setCurrentRoute('tracking'); 
  };

  // 2. When the courier arrives and they tap "I have my box", open the scanner!
  const handleBoxArrived = () => {
    setCurrentRoute('onboarding'); 
  };

  // 3. When the camera successfully scans the QR code, unlock the dashboard!
  const handleBoxUnlock = (boxCode) => {
    setActiveBoxCode(boxCode);    
    setCurrentRoute('dashboard'); 
  };

  // --- THE RENDERER ---
  return (
    <div className="w-full min-h-screen bg-gray-50 overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        
        {/* Route: Admin (Change initial state to 'admin' to see this again) */}
        {currentRoute === 'admin' && (
          <motion.div key="route-admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
            <AdminDashboard />
          </motion.div>
        )}

        {/* Route 0: The Front Door (Sign Up) */}
        {currentRoute === 'auth' && (
          <motion.div key="route-auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full h-full bg-white z-50">
            <AuthScreen onLoginSuccess={handleLoginSuccess} />
          </motion.div>
        )}

        {/* Route 1: Discovery & Add to Cart */}
{currentRoute === 'discovery' && (
  <motion.div key="route-discovery" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} className="w-full h-full bg-white z-50">
    <PersonalizedStorefront onPurchaseComplete={handlePurchaseComplete} />
  </motion.div>
)}

        {/* Route 2: Post-Purchase Order Tracking */}
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
            <ParentDashboard activeBox={activeBoxCode} /> 
          </motion.div>
        )}

        {/* Hidden Route: Progress Rewards */}
        {currentRoute === 'progress' && (
          <motion.div key="route-progress" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full bg-white z-50">
            <ProgressRewards />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}