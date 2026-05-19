import React from 'react';
import { Settings, Bell, Shield, Palette, Globe, Save } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="max-w-4xl mx-auto font-sans pb-24">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">System Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Configure global application behavior, branding, and permissions.</p>
      </header>

      <div className="space-y-6">
        {/* Branding Section */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Palette size={20} className="text-blue-500" /> Branding & UI
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Platform Name</label>
              <input type="text" defaultValue="KinderRent" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Primary Color</label>
              <div className="flex gap-4">
                <input type="color" defaultValue="#2563eb" className="h-12 w-12 rounded-lg cursor-pointer" />
                <input type="text" defaultValue="#2563eb" className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none" />
              </div>
            </div>
          </div>
        </section>

        {/* Global Config Section */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Globe size={20} className="text-green-500" /> Localization & Language
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-bold text-gray-800">Automatic Translation</p>
                <p className="text-xs text-gray-500">Auto-translate UI for Turkish parents using Google Cloud Translation.</p>
              </div>
              <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer shadow-inner">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-gray-50">
              <div>
                <p className="font-bold text-gray-800">Target Keyword Highlight</p>
                <p className="text-xs text-gray-500">Keep English keywords highlighted in non-English UI copies.</p>
              </div>
              <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer shadow-inner">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Shield size={20} className="text-amber-500" /> Access & Security
          </h2>
          <div className="space-y-4">
             <button className="text-sm font-bold text-blue-600 hover:underline">Manage Admin Access Permissions</button>
             <button className="block text-sm font-bold text-blue-600 hover:underline">Configure OAuth Credentials</button>
          </div>
        </section>

        <div className="flex justify-end pt-4">
          <button className="bg-blue-600 text-white font-bold py-4 px-10 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2">
            <Save size={20} /> Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
