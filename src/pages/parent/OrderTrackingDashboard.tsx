import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Package, Printer, BookOpen, QrCode, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function OrderTrackingDashboard({ onBoxArrived }) {
  // Mock blog data to keep parents engaged while they wait
  const waitingRoomBlogs = [
    {
      id: 1,
      title: "How to prepare your play space for Day 1",
      category: "Environment",
      readTime: "3 min read",
      imageGrad: "from-orange-100 to-yellow-100",
      textColor: "text-orange-600"
    },
    {
      id: 2,
      title: "The psychology of 3D-printed tactile learning",
      category: "Science of Play",
      readTime: "5 min read",
      imageGrad: "from-blue-100 to-cyan-100",
      textColor: "text-blue-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans">
      
      {/* --- HEADER --- */}
      <header className="px-6 py-8 bg-white rounded-b-3xl shadow-sm mb-6">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold mb-3 border border-green-100">
          <CheckCircle2 size={14} /> Payment Successful
        </div>
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">Your KinderRent journey is beginning!</h1>
      </header>

      <main className="px-6 space-y-8">
        
        {/* --- TRACKING TIMELINE --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-6">Order Status</h2>
          
          <div className="relative pl-4 space-y-6">
            {/* The vertical connecting line */}
            <div className="absolute left-[1.4rem] top-2 bottom-6 w-0.5 bg-gray-100 z-0"></div>

            {/* Step 1: Paid */}
            <div className="relative z-10 flex gap-4 opacity-50">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shrink-0 border-4 border-white shadow-sm">
                <CheckCircle2 size={16} className="text-white" />
              </div>
              <div className="pt-1">
                <h3 className="font-bold text-gray-900 text-sm">Order Confirmed</h3>
                <p className="text-xs text-gray-500">Payment received securely.</p>
              </div>
            </div>

            {/* Step 2: Printing (Active Step) */}
            <div className="relative z-10 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 border-4 border-white shadow-md">
                <Printer size={16} className="text-white" />
              </div>
              <div className="pt-1">
                <h3 className="font-bold text-blue-700 text-sm">Printing your toys</h3>
                <p className="text-xs text-gray-500">Our 3D printers are bringing your box to life.</p>
              </div>
            </div>

            {/* Step 3: Shipped */}
            <div className="relative z-10 flex gap-4 opacity-40">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0 border-4 border-white">
                <Truck size={16} className="text-gray-500" />
              </div>
              <div className="pt-1">
                <h3 className="font-bold text-gray-900 text-sm">Shipped</h3>
                <p className="text-xs text-gray-500">Handed over to the courier.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- THE BRIDGE ACTION (SCAN QR) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-1 shadow-lg shadow-blue-200 text-center"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-[1.8rem] p-6 border border-white/20">
            <div className="bg-white text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <Package size={32} />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Did your box arrive?</h2>
            <p className="text-blue-100 text-sm mb-6 px-4">
              Once you have the physical box in your hands, scan the magic QR code inside to unlock your daily lessons!
            </p>
            <button 
              onClick={onBoxArrived}
              className="w-full bg-white text-blue-600 font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <QrCode size={20} /> I have my box! Scan Code
            </button>
          </div>
        </motion.div>

        {/* --- CONTENT HUB (WHILE THEY WAIT) --- */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="text-gray-400" size={20} /> While you wait...
          </h2>
          
          <div className="space-y-4">
            {waitingRoomBlogs.map(blog => (
              <div key={blog.id} className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm flex gap-4 items-center hover:border-blue-200 transition-colors cursor-pointer group">
                <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${blog.imageGrad} flex shrink-0 items-center justify-center`}>
                  <BookOpen className={`${blog.textColor} opacity-50`} size={24} />
                </div>
                <div className="flex-1 pr-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${blog.textColor} block mb-1`}>{blog.category}</span>
                  <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 group-hover:text-blue-600 transition-colors">{blog.title}</h3>
                  <span className="text-xs text-gray-400">{blog.readTime}</span>
                </div>
                <ArrowRight size={16} className="text-gray-300 group-hover:text-blue-500 mr-2" />
              </div>
            ))}
          </div>
        </motion.div>

      </main>
    </div>
  );
}