import React, { useState } from 'react';
import { Volume2, VolumeX, Star, Award, Sparkles, Menu, X, BookOpen, Heart, Palette } from 'lucide-react';
import { soundFx } from '../utils/sound';

export default function Navbar({ activeTab, setActiveTab, stars, badgesUnlocked, isMuted, setIsMuted }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'workshop', label: 'Học Mũi Móc', icon: BookOpen },
    { id: 'projects', label: 'Dự Án Cho Bé', icon: Heart },
    { id: 'mixer', label: 'Phối Màu & Dụng Cụ', icon: Palette },
    { id: 'badges', label: 'Huy Chương', icon: Award },
  ];

  const handleMuteToggle = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
    if (!muted) soundFx.playPop();
  };

  const handleNavClick = (tabId) => {
    soundFx.playPop();
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    if (tabId === 'workshop') {
      setTimeout(() => {
        const el = document.getElementById('stitch-workshop');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-4 border-pink-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('workshop')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 bg-gradient-to-tr from-pink-400 to-amber-300 rounded-2xl flex items-center justify-center text-2xl shadow-md group-hover:rotate-12 transition-transform duration-300">
              🧶
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-amber-500 bg-clip-text text-transparent">
                  Crochet Kids
                </span>
                <Sparkles className="w-5 h-5 text-amber-400 animate-spin-slow" />
              </div>
              <p className="text-xs font-bold text-pink-400 tracking-wide">
                Thế Giới Móc Len Kỳ Diệu
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 bg-pink-50/80 p-1.5 rounded-full border-2 border-pink-100">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-extrabold text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md scale-105'
                      : 'text-slate-600 hover:text-pink-500 hover:bg-white/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-pink-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Status Actions */}
          <div className="flex items-center gap-3">
            
            {/* Stars Counter */}
            <div className="flex items-center gap-1.5 bg-amber-100 border-2 border-amber-300 text-amber-800 px-3.5 py-1.5 rounded-full font-black text-sm shadow-sm">
              <Star className="w-5 h-5 text-amber-500 fill-amber-400 animate-pulse" />
              <span>{stars} ⭐</span>
            </div>

            {/* Badges Counter */}
            <button 
              onClick={() => handleNavClick('badges')}
              className="hidden sm:flex items-center gap-1.5 bg-purple-100 border-2 border-purple-300 text-purple-800 px-3.5 py-1.5 rounded-full font-black text-sm hover:bg-purple-200 transition-colors"
            >
              <Award className="w-5 h-5 text-purple-500" />
              <span>{badgesUnlocked}/6</span>
            </button>

            {/* Mute Button */}
            <button
              onClick={handleMuteToggle}
              title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
              className="p-2.5 rounded-full bg-slate-100 border-2 border-slate-200 text-slate-600 hover:bg-pink-100 hover:border-pink-300 transition-all"
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-slate-400" /> : <Volume2 className="w-5 h-5 text-pink-500" />}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full bg-pink-100 border-2 border-pink-200 text-pink-600"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t-2 border-pink-100 space-y-2 bg-amber-50/90 rounded-b-2xl px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-base transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-pink-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
