import React from 'react';
import { TrendingUp, Users, Package, AlertCircle, ArrowUpRight, Activity, ShoppingCart, UserPlus, QrCode, ShieldAlert } from 'lucide-react';

export default function AdminOverview() {
  // Upgraded CEO Metrics Array
  const stats = [
    { label: 'Monthly Revenue', value: '₺42,500', increase: '+8% this month', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'New Box Purchases', value: '48', increase: 'First-time buyers', icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'New Rental Plans', value: '15', increase: 'Upgraded to subscription', icon: UserPlus, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Pending Returns', value: '12', increase: 'End of month cycle', icon: Package, color: 'text-amber-600', bg: 'bg-amber-100' },
    { label: 'Unscanned Boxes', value: '7', increase: 'High churn risk', icon: QrCode, color: 'text-red-600', bg: 'bg-red-100' },
    { label: 'Damaged/Missing Toys', value: '3', increase: 'Needs 3D re-printing', icon: ShieldAlert, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  const recentActivity = [
    { user: 'Leo M.', action: 'completed Day 1 of Geo Butterfly', time: '10 mins ago', type: 'lesson' },
    { user: 'Sarah K.', action: 'bought their first box (Add to Cart)', time: '45 mins ago', type: 'sale' },
    { user: 'Murat Y.', action: 'upgraded to 6-Month Rental Plan', time: '1 hour ago', type: 'subscription' },
    { user: 'Courier', action: 'picked up 4 return boxes', time: '2 hours ago', type: 'logistics' },
  ];

  return (
    <div className="max-w-6xl mx-auto font-sans pb-24">
      
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">Good morning, CEO.</h1>
          <p className="text-gray-500 text-sm mt-1">Here is the live pulse of your operations today.</p>
        </div>
        <button className="bg-white border border-gray-200 text-gray-700 font-bold px-4 py-2 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2 shadow-sm transition-colors">
          Download CSV Report
        </button>
      </header>

      {/* --- UPGRADED 6-CARD METRICS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <ArrowUpRight size={20} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm font-bold text-gray-500">{stat.label}</p>
            <p className="text-xs text-gray-400 mt-2 font-medium">{stat.increase}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- APP ENGAGEMENT CHART --- */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><Activity size={20} className="text-blue-500"/> Daily Lesson Completions</h2>
          </div>
          
          <div className="h-48 flex items-end justify-between gap-2 px-2">
            {[40, 65, 45, 80, 55, 90, 75].map((height, i) => (
              <div key={i} className="w-full flex flex-col items-center gap-2 group">
                <div className="w-full bg-blue-100 rounded-t-md relative group-hover:bg-blue-200 transition-colors" style={{ height: `${height}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {height * 12} lessons
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-400">{'MTWTFSS'[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* --- LIVE ACTIVITY FEED --- */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Live Activity</h2>
          <div className="space-y-6">
            {recentActivity.map((act, i) => (
              <div key={i} className="flex gap-4 items-start relative">
                {i !== recentActivity.length - 1 && <div className="absolute left-4 top-8 bottom-[-24px] w-0.5 bg-gray-100 z-0"></div>}
                
                <div className="relative z-10 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-200 text-lg shadow-sm">
                  {act.type === 'lesson' ? '🦋' : act.type === 'sale' ? '📦' : act.type === 'subscription' ? '⭐' : '🚚'}
                </div>
                <div>
                  <p className="text-sm text-gray-800 leading-snug">
                    <span className="font-bold">{act.user}</span> {act.action}
                  </p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 bg-gray-50 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-100 transition-colors">
            View All Logs
          </button>
        </div>

      </div>

    </div>
  );
}