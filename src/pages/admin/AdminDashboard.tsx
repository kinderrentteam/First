import React, { useState } from 'react';
import { 
  LayoutDashboard, Image as ImageIcon, Package, Users, 
  LogOut, Bell, Search, TrendingUp, Activity, QrCode, ListOrdered 
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      
      {/* --- SIDEBAR NAVIGATION --- */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-gray-100 flex items-center gap-2">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <LayoutDashboard size={20} />
          </div>
          <div className="flex items-center">
            <img src="https://dashboard.kinderrent.com/logo1.png" alt="KinderRent Logo" className="h-6 w-auto object-contain" />
            <span className="font-bold text-xs text-gray-400 uppercase tracking-widest ml-3 border-l-2 border-gray-200 pl-3 mt-1">Admin</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Activity size={18} /> Command Center
          </button>
          <button 
            onClick={() => setActiveTab('publisher')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'publisher' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <QrCode size={18} /> Box Publisher
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'settings' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <ImageIcon size={18} /> App Settings
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'users' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Users size={18} /> Waitlist & Users
          </button>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-colors">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 ml-64 p-8">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, Admin.</h1>
            <p className="text-gray-500">Here is what is happening in KinderRent today.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search users or boxes..." 
                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="relative p-2 bg-white border border-gray-200 rounded-full text-gray-500 hover:bg-gray-50">
              <Bell size={18} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold border border-blue-200">
              KR
            </div>
          </div>
        </header>

        {/* --- THE COMMAND CENTER VIEW --- */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* Key Metrics Row */}
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-2 text-blue-600"><Users size={20} /><span className="font-semibold text-gray-700">Active Parents</span></div>
                <div className="text-3xl font-bold text-gray-900 mb-1">1,248</div>
                <div className="text-sm text-green-600 flex items-center gap-1"><TrendingUp size={14} /> +12% this week</div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-2 text-orange-500"><ListOrdered size={20} /><span className="font-semibold text-gray-700">Class Waitlist</span></div>
                <div className="text-3xl font-bold text-gray-900 mb-1">342</div>
                <div className="text-sm text-green-600 flex items-center gap-1"><TrendingUp size={14} /> +45 today</div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-2 text-purple-600"><Package size={20} /><span className="font-semibold text-gray-700">Live Boxes</span></div>
                <div className="text-3xl font-bold text-gray-900 mb-1">14</div>
                <div className="text-sm text-gray-500">All systems go</div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-2 text-teal-600"><Activity size={20} /><span className="font-semibold text-gray-700">Worksheets</span></div>
                <div className="text-3xl font-bold text-gray-900 mb-1">892</div>
                <div className="text-sm text-gray-500">Uploaded today</div>
              </div>
            </div>

            {/* Quick Actions */}
            <h2 className="text-lg font-bold text-gray-900 mt-8 mb-4">Quick Tools</h2>
            <div className="grid grid-cols-3 gap-6">
              <button onClick={() => setActiveTab('publisher')} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-left group">
                <div className="bg-blue-50 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors"><QrCode size={24} /></div>
                <h3 className="font-bold text-gray-900 mb-1">Box Publisher</h3>
                <p className="text-sm text-gray-500">Upload lessons & generate QR codes.</p>
              </button>
              <button onClick={() => setActiveTab('settings')} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-left group">
                <div className="bg-purple-50 text-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors"><ImageIcon size={24} /></div>
                <h3 className="font-bold text-gray-900 mb-1">App UI Settings</h3>
                <p className="text-sm text-gray-500">Change dashboard art & text.</p>
              </button>
              <button onClick={() => setActiveTab('users')} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-left group">
                <div className="bg-orange-50 text-orange-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors"><Users size={24} /></div>
                <h3 className="font-bold text-gray-900 mb-1">Manage Users</h3>
                <p className="text-sm text-gray-500">Approve live class attendees.</p>
              </button>
            </div>

            {/* Waitlist Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-8">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">Recent Waitlist Signups</h2>
                <button className="text-sm text-blue-600 font-semibold hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500">
                    <tr>
                      <th className="px-6 py-4 font-medium">Parent Email</th>
                      <th className="px-6 py-4 font-medium">Child</th>
                      <th className="px-6 py-4 font-medium">Age</th>
                      <th className="px-6 py-4 font-medium">Current Box Inventory</th>
                      <th className="px-6 py-4 font-medium">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">sarah@example.com</td>
                      <td className="px-6 py-4 text-gray-600">Leo</td>
                      <td className="px-6 py-4 text-gray-600">3 yrs</td>
                      <td className="px-6 py-4"><span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">🦋 Box: Geo Butterfly</span></td>
                      <td className="px-6 py-4 text-gray-400">10 mins ago</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">murat.y@example.com</td>
                      <td className="px-6 py-4 text-gray-600">Aylin</td>
                      <td className="px-6 py-4 text-gray-600">4 yrs</td>
                      <td className="px-6 py-4"><span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-bold border border-orange-100">🧱 Box: Stacking Blocks</span></td>
                      <td className="px-6 py-4 text-gray-400">25 mins ago</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">emily.r@example.com</td>
                      <td className="px-6 py-4 text-gray-600">Sam</td>
                      <td className="px-6 py-4 text-gray-600">2 yrs</td>
                      <td className="px-6 py-4"><span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-bold border border-purple-100">🎵 Box: Music Makers</span></td>
                      <td className="px-6 py-4 text-gray-400">1 hour ago</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Placeholders for the other tabs */}
        {activeTab === 'publisher' && <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm text-center"><h2 className="text-2xl font-bold text-gray-800">Box & QR Publisher goes here!</h2></div>}
        {activeTab === 'settings' && <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm text-center"><h2 className="text-2xl font-bold text-gray-800">App UI Settings goes here!</h2></div>}
        {activeTab === 'users' && <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm text-center"><h2 className="text-2xl font-bold text-gray-800">User Management goes here!</h2></div>}

      </main>
    </div>
  );
}