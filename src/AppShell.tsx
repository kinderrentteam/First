import AdminDashboard from './pages/admin/AdminDashboard';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// We will import the components we are building in the next steps
import OnboardingGatekeeper from './pages/parent/OnboardingGatekeeper';
import ParentDashboard from './pages/parent/Dashboard';

export default function AppShell() {
  // --- THE APP'S MEMORY (STATE) ---
  // 1. Is the user still onboarding, or are they ready for the dashboard?
  const [currentRoute, setCurrentRoute] = useState('admin'); 
  
  // 2. What specific box did they unlock? (Starts as null)
  const [activeBoxCode, setActiveBoxCode] = useState<string | null>(null);

  // --- THE WIRING (ROUTING FUNCTIONS) ---
  // This function gets passed DOWN to the Onboarding Gatekeeper.
  // When the parent successfully scans a code, the Gatekeeper calls this function
  // to tell the App Shell to change the screen.
  const handleBoxUnlock = (boxCode: string) => {
    console.log("Success! Box unlocked with code:", boxCode);
    setActiveBoxCode(boxCode);    // Save the specific box (e.g., 'BTRFL')
    setCurrentRoute('dashboard'); // Route them to the main dashboard
  };

  // --- THE RENDERER (The Traffic Cop) ---
  return (
    <div className="w-full min-h-screen bg-bg-warm overflow-hidden font-sans">
      {currentRoute === 'admin' && (
  <motion.div key="route-admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full">
    <AdminDashboard />
  </motion.div>
)}
<AnimatePresence mode="wait">
        
        {/* Route 1: The Onboarding Gatekeeper */}
        {currentRoute === 'onboarding' && (
          <motion.div
            key="route-onboarding"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="w-full h-full"
          >
            <OnboardingGatekeeper onSuccessfulScan={handleBoxUnlock} /> 
          </motion.div>
        )}

        {/* Route 2: The Personalized Parent Dashboard */}
        {currentRoute === 'dashboard' && (
          <motion.div
            key="route-dashboard"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full h-full"
          >
            <ParentDashboard activeBox={activeBoxCode || undefined} /> 
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
