import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Shield, ArrowRight, Globe } from 'lucide-react';

export default function AuthScreen({ onLoginSuccess }) {
  const [language, setLanguage] = useState('EN');
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('parent'); // 'parent' or 'admin'

  // Simple translation dictionary
  const t = {
    EN: {
      welcome: "Welcome back!",
      create: "Create an Account",
      parentLabel: "Parent",
      adminLabel: "Admin",
      email: "Email Address",
      pass: "Password",
      child: "Child's Name",
      signinBtn: "Sign In",
      signupBtn: "Create Account",
      switchSignup: "Don't have an account? Create one",
      switchSignin: "Already have an account? Sign in"
    },
    TR: {
      welcome: "Tekrar Hoş Geldiniz!",
      create: "Hesap Oluştur",
      parentLabel: "Ebeveyn",
      adminLabel: "Yönetici",
      email: "E-posta Adresi",
      pass: "Şifre",
      child: "Çocuğun Adı",
      signinBtn: "Giriş Yap",
      signupBtn: "Kayıt Ol",
      switchSignup: "Hesabınız yok mu? Oluşturun",
      switchSignin: "Zaten hesabınız var mı? Giriş yapın"
    }
  }[language];

  const handleSubmit = (e) => {
    e.preventDefault();
    // This sends the selected role back to AppShell!
    onLoginSuccess(role);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
      
      {/* Top Bar: Language Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <button 
          onClick={() => setLanguage(language === 'EN' ? 'TR' : 'EN')}
          className="bg-white px-4 py-2 rounded-full font-black text-gray-900 shadow-sm flex items-center gap-2 border border-gray-200"
        >
          <Globe size={16} className="text-blue-600"/> {language}
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-6 max-w-md mx-auto w-full">
        
        {/* Header */}
        <div className="text-center mb-10 w-full">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-200 rotate-3">
             <span className="text-white font-black text-2xl drop-shadow-md">K</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">{isLogin ? t.welcome : t.create}</h1>
          <p className="text-gray-500 font-medium">KinderRent Ecosystem</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white w-full p-8 rounded-[2rem] shadow-sm border border-gray-200">
          
          {/* ROLE TOGGLE (Parent vs Admin) */}
          {isLogin && (
            <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
              <button type="button" onClick={() => setRole('parent')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${role === 'parent' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                <User size={16} /> {t.parentLabel}
              </button>
              <button type="button" onClick={() => setRole('admin')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${role === 'admin' ? 'bg-slate-800 shadow-sm text-white' : 'text-gray-500 hover:text-gray-700'}`}>
                <Shield size={16} /> {t.adminLabel}
              </button>
            </div>
          )}

          <div className="space-y-5 mb-8">
            {(!isLogin && role === 'parent') && (
              <div className="relative">
                <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder={t.child} className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-4 font-medium focus:border-blue-500 focus:bg-white outline-none transition-colors" />
              </div>
            )}
            <div className="relative">
              <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="email" placeholder={t.email} className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-4 font-medium focus:border-blue-500 focus:bg-white outline-none transition-colors" />
            </div>
            <div className="relative">
              <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="password" placeholder={t.pass} className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-4 font-medium focus:border-blue-500 focus:bg-white outline-none transition-colors" />
            </div>
          </div>

          <button type="submit" className={`w-full text-white font-black text-lg py-4 rounded-xl flex items-center justify-center gap-3 transition-all ${role === 'admin' ? 'bg-slate-900 hover:bg-black shadow-xl shadow-slate-200' : 'bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200'}`}>
            {isLogin ? t.signinBtn : t.signupBtn} <ArrowRight size={20} />
          </button>
        </form>

        <button onClick={() => setIsLogin(!isLogin)} className="mt-8 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">
          {isLogin ? t.switchSignup : t.switchSignin}
        </button>

      </div>
    </div>
  );
}