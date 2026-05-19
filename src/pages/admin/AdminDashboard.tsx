import SubscriberCRM from './SubscriberCRM';
import AssessmentEditor from './AssessmentEditor';
import AdminUsers from './AdminUsers';
import DamageTriage from './DamageTriage';
import React, { useState } from 'react';
import AdminOverview from './AdminOverview';
import BoxPublisher from './BoxPublisher';
import AdminSettings from './AdminSettings';
import { 
  LayoutDashboard, Image as ImageIcon, Package, Users, 
  LogOut, Bell, Search, Activity, QrCode, AlertTriangle,
  Settings 
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
            onClick={() => setActiveTab('crm')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'crm' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Users size={18} /> Subscriber CRM
          </button>
          <button 
            onClick={() => setActiveTab('assessment')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'assessment' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Settings size={18} /> Assessment Engine
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
          <button 
  onClick={() => setActiveTab('damage')}
  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'damage' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
>
  <div className="flex items-center gap-3"><AlertTriangle size={18} /> Damage Control</div>
  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">2</span>
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
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, CEO.</h1>
            <p className="text-gray-500">Your KinderRent operations at a glance.</p>
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

        {/* --- DYNAMIC TAB ROUTING --- */}
        {activeTab === 'dashboard' && <AdminOverview />}
        {activeTab === 'publisher' && <BoxPublisher />}
        {activeTab === 'settings' && <AdminSettings />}
        {activeTab === 'users' && <AdminUsers />}
        {activeTab === 'damage' && <DamageTriage />}
{activeTab === 'assessment' && <AssessmentEditor />}
{activeTab === 'crm' && <SubscriberCRM />}
      </main>
    </div>
  );
}