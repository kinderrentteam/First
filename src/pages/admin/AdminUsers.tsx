import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Search, Filter, CheckCircle2, XCircle, Mail, MapPin, Package, CreditCard, ShieldCheck } from 'lucide-react';

export default function AdminUsers() {
  const [activeTab, setActiveTab] = useState('waitlist'); // 'waitlist' | 'active'
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Data: Parents begging to get into KinderRent
  const [waitlist, setWaitlist] = useState([
    { id: 'W-001', parent: 'Elif Yılmaz', email: 'elif.y@example.com', child: 'Can', age: '3', city: 'Istanbul', date: 'Today, 09:30 AM', status: 'Pending' },
    { id: 'W-002', parent: 'David Smith', email: 'dsmith@example.com', child: 'Emma', age: '4', city: 'Izmir', date: 'Yesterday, 14:15 PM', status: 'Pending' },
    { id: 'W-003', parent: 'Ayşe Demir', email: 'ademir@example.com', child: 'Ali', age: '2', city: 'Ankara', date: 'May 15, 11:00 AM', status: 'Pending' }
  ]);

  // Mock Data: Parents currently paying for the service
  const activeUsers = [
    { id: 'U-892', parent: 'Sarah K.', child: 'Leo', age: '3', plan: '6-Month Plan', currentBox: 'Box B: Geo Butterfly', status: 'Active' },
    { id: 'U-893', parent: 'Murat T.', child: 'Aylin', age: '4', plan: 'One-Time Buy', currentBox: 'Box A: Stacking Blocks', status: 'Delivered' }
  ];

  const handleApprove = (id) => {
    // In a real app, this moves them to active users and sends a Stripe checkout email
    setWaitlist(waitlist.filter(user => user.id !== id));
    alert(`Invite sent! They can now checkout and enter the app.`);
  };

  return (
    <div className="max-w-6xl mx-auto font-sans pb-24">
      
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-bold mb-3 border border-teal-100">
          <ShieldCheck size={14} /> Community Access Control
        </div>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">User Management</h1>
        <p className="text-gray-500 text-sm mt-1">Approve waitlist applications and manage your active paying subscribers.</p>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* --- TABS & SEARCH BAR --- */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('waitlist')}
              className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'waitlist' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Waitlist ({waitlist.length})
            </button>
            <button 
              onClick={() => setActiveTab('active')}
              className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'active' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Active Parents ({activeUsers.length})
            </button>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search names or emails..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
            </div>
            <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* --- MAIN DATA TABLES --- */}
        <div className="overflow-x-auto min-h-[400px]">
          <AnimatePresence mode="wait">
            
            {/* WAITLIST VIEW */}
            {activeTab === 'waitlist' && (
              <motion.table key="waitlist" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-bold">Parent Details</th>
                    <th className="px-6 py-4 font-bold">Child Profile</th>
                    <th className="px-6 py-4 font-bold">Location</th>
                    <th className="px-6 py-4 font-bold">Applied On</th>
                    <th className="px-6 py-4 font-bold text-right">Gatekeeper Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {waitlist.length === 0 ? (
                    <tr><td colSpan={5} className="p-8 text-center text-gray-400">Waitlist is currently empty.</td></tr>
                  ) : (
                    waitlist.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-900">{user.parent}</div>
                          <div className="text-gray-500 flex items-center gap-1 mt-1 text-xs"><Mail size={12}/> {user.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-700">{user.child}</div>
                          <div className="text-xs text-gray-500 mt-1">{user.age} Years Old</div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 flex items-center gap-1 mt-2">
                          <MapPin size={14} className="text-gray-400"/> {user.city}
                        </td>
                        <td className="px-6 py-4 text-gray-500 text-xs">{user.date}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => alert("Application rejected.")} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Reject">
                              <XCircle size={20} />
                            </button>
                            <button onClick={() => handleApprove(user.id)} className="flex items-center gap-2 bg-blue-50 text-blue-700 font-bold px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                              <CheckCircle2 size={16} /> Approve & Invite
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </motion.table>
            )}

            {/* ACTIVE USERS VIEW */}
            {activeTab === 'active' && (
              <motion.table key="active" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-bold">Account</th>
                    <th className="px-6 py-4 font-bold">Financial Plan</th>
                    <th className="px-6 py-4 font-bold">Current Hardware</th>
                    <th className="px-6 py-4 font-bold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {activeUsers.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{user.parent}</div>
                        <div className="text-xs text-gray-500 mt-1">Child: {user.child} ({user.age}y)</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold ${user.plan.includes('Month') ? 'bg-purple-50 text-purple-700 border border-purple-100' : 'bg-gray-100 text-gray-700 border border-gray-200'}`}>
                          <CreditCard size={12} /> {user.plan}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700 font-medium text-xs">
                          <Package size={14} className="text-blue-500"/> {user.currentBox}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </motion.table>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}