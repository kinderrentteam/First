import React, { useState } from 'react';
import { Users, Settings, Lock, Unlock, CreditCard, Box, Search, Edit3, Save, AlertCircle, ShoppingBag, RotateCcw, Download, Calendar, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SubscriberCRM() {
  const [activeTab, setActiveTab] = useState('users'); 
  const [userView, setUserView] = useState('renters'); 
  const [editingPlanId, setEditingPlanId] = useState(null);
  
  // --- NEW: REPORTING STATE ---
  const [reportMonth, setReportMonth] = useState('May 2026');

  const [plans, setPlans] = useState([
    { id: 'sub-3', name: '3-Month Explorer', price: '₺850', interval: 'billed quarterly', desc: 'Perfect for testing the waters. Swap boxes every month.' },
    { id: 'sub-6', name: '6-Month Adventurer', price: '₺1,600', interval: 'billed bi-annually', desc: 'Our most popular plan. Save 15% on monthly box swaps.' },
    { id: 'sub-12', name: '1-Year Master', price: '₺3,000', interval: 'billed annually', desc: 'The ultimate curriculum. Best value for dedicated parents.' }
  ]);

  const [users, setUsers] = useState([
    // RENTERS
    { id: 'usr-001', parentName: 'Aisha Yılmaz', childName: 'Leo', childAge: '3 years old', type: 'renter', planName: '3-Month Plan', monthsLeft: 1, totalMonths: 3, currentBox: 'Box B: Geo Butterfly', logisticsStatus: 'Delivered', lessonsUnlocked: false },
    { id: 'usr-002', parentName: 'Elif Kaya', childName: 'Can', childAge: '5-6 years old', type: 'renter', planName: '6-Month Plan', monthsLeft: 4, totalMonths: 6, currentBox: 'Box C: Achiever', logisticsStatus: 'In Transit', lessonsUnlocked: true },
    { id: 'usr-004', parentName: 'Mehmet Demir', childName: 'Ali', childAge: '3 years old', type: 'renter', planName: '1-Year Plan', monthsLeft: 11, totalMonths: 12, currentBox: 'Box B: Geo Butterfly', logisticsStatus: 'Delivered', lessonsUnlocked: false },
    { id: 'usr-005', parentName: 'Sarah Yilmaz', childName: 'Mia', childAge: '2 years old', type: 'renter', planName: '3-Month Plan', monthsLeft: 0, totalMonths: 3, currentBox: 'Box A: Discovery', logisticsStatus: 'Return Pending', lessonsUnlocked: false },
    
    // BUYERS
    { id: 'usr-003', parentName: 'John Smith', childName: 'Emma', childAge: '2 years old', type: 'buyer', planName: 'One-Time Purchase', purchaseDate: 'Oct 12, 2026', currentBox: 'Box A: Discovery', logisticsStatus: 'Delivered', lessonsUnlocked: true },
    { id: 'usr-006', parentName: 'Ayşe Çelik', childName: 'Zeynep', childAge: '4 years old', type: 'buyer', planName: 'One-Time Purchase', purchaseDate: 'Nov 01, 2026', currentBox: 'Box B: Geo Butterfly', logisticsStatus: 'Preparing', lessonsUnlocked: true }
  ]);

  const handleUnlockLessons = (userId, parentName) => {
    setUsers(users.map(u => u.id === userId ? { ...u, lessonsUnlocked: true } : u));
    alert(`Success! The monthly lesson guide for ${parentName} is now unlocked.`);
  };

  const handleSavePlan = () => {
    setEditingPlanId(null);
    alert('Subscription pricing updated!');
  };

  // --- NEW: FUNCTIONAL CSV EXPORTER ---
  const handleDownloadCSV = () => {
    // 1. Filter the users based on the current view (Renters or Buyers)
    const filteredUsers = users.filter(u => u.type === userView.slice(0, -1)); // 'renters' -> 'renter'
    
    // 2. Define the CSV Headers
    const headers = ["User ID", "Parent Name", "Child Name", "Age Group", "Plan Type", "Current Box", "Logistics Status", "Months Left"];
    
    // 3. Map the data into rows
    const rows = filteredUsers.map(u => [
      u.id, 
      `"${u.parentName}"`, 
      `"${u.childName}"`, 
      `"${u.childAge}"`, 
      `"${u.planName}"`, 
      `"${u.currentBox}"`, 
      `"${u.logisticsStatus}"`,
      u.type === 'renter' ? u.monthsLeft : 'N/A'
    ]);

    // 4. Build the CSV String
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    
    // 5. Trigger the browser download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `KinderRent_${userView.toUpperCase()}_Report_${reportMonth.replace(' ', '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getGroupedUsers = (type) => {
    const filtered = users.filter(u => u.type === type);
    const grouped = {};
    filtered.forEach(user => {
      if (!grouped[user.childAge]) grouped[user.childAge] = [];
      grouped[user.childAge].push(user);
    });
    return Object.keys(grouped).sort().reduce((obj, key) => {
      obj[key] = grouped[key];
      return obj;
    }, {});
  };

  const groupedRenters = getGroupedUsers('renter');
  const groupedBuyers = getGroupedUsers('buyer');

  return (
    <div className="max-w-6xl mx-auto font-sans pb-32">
      
      <header className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 leading-tight">Subscriber CRM</h1>
          <p className="text-gray-500 text-sm mt-1">Manage cohorts, track subscription health, and export monthly records.</p>
        </div>
        
        <div className="flex bg-gray-100 rounded-xl p-1 shadow-inner">
          <button onClick={() => setActiveTab('users')} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'users' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
            <Users size={18} /> Cohort Database
          </button>
          <button onClick={() => setActiveTab('plans')} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'plans' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-500 hover:text-gray-700'}`}>
            <Settings size={18} /> Subscription Plans
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        
        {activeTab === 'users' && (
          <motion.div key="users" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            
            {/* --- NEW: REPORTING CONTROL BAR --- */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
              
              <div className="flex gap-2 w-full md:w-auto">
                <button onClick={() => setUserView('renters')} className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-black text-sm transition-all ${userView === 'renters' ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                  <RotateCcw size={16} /> Renters
                </button>
                <button onClick={() => setUserView('buyers')} className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-black text-sm transition-all ${userView === 'buyers' ? 'bg-slate-800 text-white shadow-md shadow-slate-200' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                  <ShoppingBag size={16} /> Buyers
                </button>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none">
                  <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select 
                    value={reportMonth} 
                    onChange={(e) => setReportMonth(e.target.value)} 
                    className="w-full md:w-48 bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm font-bold text-gray-700 focus:border-blue-500 outline-none cursor-pointer appearance-none"
                  >
                    <option>May 2026</option>
                    <option>June 2026</option>
                    <option>July 2026</option>
                  </select>
                </div>
                <button 
                  onClick={handleDownloadCSV}
                  className="bg-green-100 text-green-700 font-bold px-4 py-2.5 rounded-xl hover:bg-green-200 transition-colors flex items-center gap-2 text-sm shadow-sm"
                >
                  <Download size={16} /> Export CSV
                </button>
              </div>
            </div>

            {/* --- RENTERS VIEW --- */}
            {userView === 'renters' && Object.keys(groupedRenters).map(ageGroup => (
              <div key={ageGroup} className="bg-white rounded-[2rem] shadow-sm border border-gray-200 overflow-hidden mb-8">
                <div className="bg-blue-50/50 border-b border-blue-100 px-6 py-4 flex items-center justify-between">
                  <h2 className="text-xl font-black text-blue-900 capitalize">Cohort: {ageGroup}</h2>
                  <span className="bg-white border border-blue-200 text-blue-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {groupedRenters[ageGroup].length} Active Families
                  </span>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                        <th className="p-5">Parent & Child</th>
                        <th className="p-5">Subscription Health</th>
                        <th className="p-5">Current Box</th>
                        <th className="p-5 text-right">Monthly Access</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {groupedRenters[ageGroup].map(user => (
                        <tr key={user.id} className="hover:bg-blue-50/30 transition-colors">
                          <td className="p-5">
                            <p className="font-black text-gray-900">{user.parentName}</p>
                            <p className="text-xs font-bold text-gray-400 mt-0.5">Child: {user.childName}</p>
                          </td>
                          <td className="p-5">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-xs font-black text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md">{user.planName}</span>
                              <span className={`text-xs font-bold ${user.monthsLeft <= 1 ? 'text-red-500' : 'text-blue-600'}`}>
                                {user.monthsLeft} / {user.totalMonths} Mos
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${user.monthsLeft === 0 ? 'bg-red-500' : user.monthsLeft === 1 ? 'bg-amber-400' : 'bg-blue-500'}`} 
                                style={{ width: `${(user.monthsLeft / user.totalMonths) * 100}%` }}
                              />
                            </div>
                            {user.monthsLeft === 1 && <p className="text-[10px] text-amber-600 font-bold mt-1 flex items-center gap-1"><AlertCircle size={10}/> Renewal Alert Sent</p>}
                            {user.monthsLeft === 0 && <p className="text-[10px] text-red-600 font-bold mt-1 flex items-center gap-1"><AlertCircle size={10}/> Subscription Expired</p>}
                          </td>
                          <td className="p-5">
                            <p className="font-bold text-gray-900 text-sm flex items-center gap-2"><Box size={14} className="text-gray-400"/> {user.currentBox}</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">{user.logisticsStatus}</p>
                          </td>
                          <td className="p-5 text-right">
                            {user.monthsLeft === 0 ? (
                               <span className="inline-flex items-center gap-1.5 text-red-500 font-bold text-xs bg-red-50 border border-red-100 px-3 py-1.5 rounded-lg">
                                 <Lock size={14} /> Locked (Unpaid)
                               </span>
                            ) : user.lessonsUnlocked ? (
                              <span className="inline-flex items-center gap-1.5 text-green-600 font-bold text-sm bg-green-50 px-4 py-2 rounded-xl">
                                <Unlock size={16} /> Live
                              </span>
                            ) : (
                              <button 
                                onClick={() => handleUnlockLessons(user.id, user.parentName)}
                                className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-200"
                              >
                                <Lock size={16} /> Approve
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            {/* --- BUYERS VIEW --- */}
            {userView === 'buyers' && Object.keys(groupedBuyers).map(ageGroup => (
               <div key={ageGroup} className="bg-white rounded-[2rem] shadow-sm border border-gray-200 overflow-hidden mb-8">
               <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                 <h2 className="text-xl font-black text-slate-900 capitalize">Cohort: {ageGroup}</h2>
                 <span className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                   {groupedBuyers[ageGroup].length} Buyers
                 </span>
               </div>
               
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="bg-gray-50 border-b border-gray-100 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                       <th className="p-5">Parent & Child</th>
                       <th className="p-5">Purchase Date</th>
                       <th className="p-5">Box Owned</th>
                       <th className="p-5 text-right">Access Status</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                     {groupedBuyers[ageGroup].map(user => (
                       <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                         <td className="p-5">
                           <p className="font-black text-gray-900">{user.parentName}</p>
                           <p className="text-xs font-bold text-gray-400 mt-0.5">Child: {user.childName}</p>
                         </td>
                         <td className="p-5">
                           <span className="text-sm font-bold text-gray-700">{user.purchaseDate}</span>
                         </td>
                         <td className="p-5">
                           <p className="font-bold text-gray-900 text-sm flex items-center gap-2"><Box size={14} className="text-gray-400"/> {user.currentBox}</p>
                           <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">{user.logisticsStatus}</p>
                         </td>
                         <td className="p-5 text-right">
                           <span className="inline-flex items-center gap-1.5 text-slate-600 font-bold text-sm bg-slate-100 px-4 py-2 rounded-xl">
                             <Lock size={16} /> QR Security
                           </span>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>
            ))}
          </motion.div>
        )}

        {/* TAB 2: SUBSCRIPTION PLAN SETTINGS */}
        {activeTab === 'plans' && (
          <motion.div key="plans" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Same Plans mapping as before... */}
            {plans.map(plan => (
              <div key={plan.id} className="bg-white rounded-[2rem] shadow-sm border border-gray-200 p-6 flex flex-col">
                {editingPlanId === plan.id ? (
                  <div className="space-y-4 flex-1">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Plan Name</label>
                      <input type="text" defaultValue={plan.name} className="w-full font-black text-lg border-b-2 border-gray-200 focus:border-purple-600 outline-none pb-1 mt-1 text-gray-900" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Price (₺)</label>
                      <input type="text" defaultValue={plan.price} className="w-full font-black text-3xl text-purple-600 border-b-2 border-gray-200 focus:border-purple-600 outline-none pb-1 mt-1" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Billing Interval</label>
                      <input type="text" defaultValue={plan.interval} className="w-full text-sm font-bold text-gray-500 border-b-2 border-gray-200 focus:border-purple-600 outline-none pb-1 mt-1" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Description</label>
                      <textarea defaultValue={plan.desc} className="w-full text-sm text-gray-600 border-2 border-gray-100 rounded-xl p-3 focus:border-purple-600 outline-none mt-1 h-24 resize-none" />
                    </div>
                    <button onClick={handleSavePlan} className="w-full bg-purple-600 text-white font-bold py-3 rounded-xl mt-4 flex justify-center gap-2 hover:bg-purple-700 transition-colors">
                      <Save size={18} /> Save Plan
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-black text-xl text-gray-900">{plan.name}</h3>
                      <button onClick={() => setEditingPlanId(plan.id)} className="text-gray-400 hover:text-purple-600 p-2 bg-gray-50 rounded-lg transition-colors">
                        <Edit3 size={18} />
                      </button>
                    </div>
                    <div className="mb-6">
                      <span className="text-4xl font-black text-purple-600">{plan.price}</span>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{plan.interval}</p>
                    </div>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed mb-6 flex-1">{plan.desc}</p>
                    
                    <div className="bg-purple-50 text-purple-700 text-xs font-bold p-3 rounded-xl flex items-center justify-center gap-2">
                      <CheckCircle2 size={16} /> Live on Storefront
                    </div>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}