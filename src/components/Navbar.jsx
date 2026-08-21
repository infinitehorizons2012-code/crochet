import React, { useState } from 'react';
import { Volume2, VolumeX, Star, Sparkles, Menu, X, BookOpen, Heart, Palette, HelpCircle, ChevronDown, Film, Layers } from 'lucide-react';
import { soundFx } from '../utils/sound';

export default function Navbar({ activeTab, setActiveTab, stars, isMuted, setIsMuted }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdown2Open, setDropdown2Open] = useState(false);
  const [dropdown3Open, setDropdown3Open] = useState(false);
  const [dropdown4Open, setDropdown4Open] = useState(false);
  const [dropdown5Open, setDropdown5Open] = useState(false);
  const [dropdown6Open, setDropdown6Open] = useState(false);

  const handleMuteToggle = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
    if (!muted) soundFx.playPop();
  };

  const handleNavClick = (tabId) => {
    soundFx.playPop();
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    setDropdown2Open(false);
    setDropdown3Open(false);
    setDropdown4Open(false);
    setDropdown5Open(false);
    setDropdown6Open(false);
  };

  const isLevel1Active = activeTab === 'level1_lessons' || activeTab === 'projects' || activeTab === 'level1_quiz';
  const isLevel2Active = activeTab === 'level2_sheet_lessons';
  const isLevel3Active = activeTab === 'level2_lessons' || activeTab === 'level2_projects_2d';
  const isLevel4Active = activeTab === 'level4_granny_lessons';
  const isLevel5Active = activeTab === 'level5_bag_lessons';
  const isLevel6Active = activeTab === 'level6_stitch_lessons';

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-4 border-pink-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('level1_lessons')} 
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
          <nav className="hidden md:flex items-center gap-2 bg-pink-50/80 p-1.5 rounded-full border-2 border-pink-100 relative">
            
            {/* LEVEL 1 DROPDOWN MENU */}
            <div className="relative group">
              <button
                onClick={() => {
                  soundFx.playPop();
                  setDropdownOpen(!dropdownOpen);
                  setDropdown2Open(false);
                  setDropdown3Open(false);
                }}
                onMouseEnter={() => {
                  setDropdownOpen(true);
                  setDropdown2Open(false);
                  setDropdown3Open(false);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-extrabold text-xs sm:text-sm transition-all duration-200 ${
                  isLevel1Active
                    ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md scale-105'
                    : 'text-slate-600 hover:text-pink-500 hover:bg-white/60'
                }`}
              >
                <Sparkles className={`w-4 h-4 ${isLevel1Active ? 'text-white' : 'text-amber-500'}`} />
                Level 1 🌟
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu Content Level 1 */}
              {dropdownOpen && (
                <div 
                  onMouseLeave={() => setDropdownOpen(false)}
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl border-4 border-pink-200 shadow-2xl p-2 z-50 animate-popIn space-y-1"
                >
                  <button
                    onClick={() => handleNavClick('level1_lessons')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                      activeTab === 'level1_lessons'
                        ? 'bg-pink-100 text-pink-700 font-black'
                        : 'text-slate-700 hover:bg-pink-50'
                    }`}
                  >
                    <Film className="w-4 h-4 text-pink-500 shrink-0" />
                    <div>
                      <span className="block font-black text-sm">Video Bài Học Level 1 🎬</span>
                      <span className="block text-[10px] text-slate-500">Video Tổng Hợp + 8 Mũi</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('projects')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                      activeTab === 'projects'
                        ? 'bg-purple-100 text-purple-700 font-black'
                        : 'text-slate-700 hover:bg-pink-50'
                    }`}
                  >
                    <Heart className="w-4 h-4 text-purple-500 shrink-0" />
                    <div>
                      <span className="block font-black text-sm">Dự Án / Project Level 1 🐙</span>
                      <span className="block text-[10px] text-slate-500">14 Mẫu Móc Level 1</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('level1_quiz')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                      activeTab === 'level1_quiz'
                        ? 'bg-amber-100 text-amber-800 font-black'
                        : 'text-slate-700 hover:bg-pink-50'
                    }`}
                  >
                    <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    <div>
                      <span className="block font-black text-sm">Trắc Nghiệm Đọc Chart 🎯</span>
                      <span className="block text-[10px] text-slate-500">8 Ký Hiệu Chart Level 1</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* LEVEL 2 DROPDOWN MENU (Tấm Vải) */}
            <div className="relative group">
              <button
                onClick={() => {
                  soundFx.playPop();
                  setDropdown2Open(!dropdown2Open);
                  setDropdownOpen(false);
                  setDropdown3Open(false);
                }}
                onMouseEnter={() => {
                  setDropdown2Open(true);
                  setDropdownOpen(false);
                  setDropdown3Open(false);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-extrabold text-xs sm:text-sm transition-all duration-200 ${
                  isLevel2Active
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md scale-105'
                    : 'text-slate-600 hover:text-teal-600 hover:bg-white/60'
                }`}
              >
                <Sparkles className={`w-4 h-4 ${isLevel2Active ? 'text-white' : 'text-teal-500'}`} />
                Level 2 🧵
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdown2Open ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu Content Level 2 Tấm Vải */}
              {dropdown2Open && (
                <div 
                  onMouseLeave={() => setDropdown2Open(false)}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl border-4 border-teal-200 shadow-2xl p-2 z-50 animate-popIn space-y-1"
                >
                  <button
                    onClick={() => handleNavClick('level2_sheet_lessons')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                      activeTab === 'level2_sheet_lessons'
                        ? 'bg-teal-100 text-teal-800 font-black'
                        : 'text-slate-700 hover:bg-teal-50'
                    }`}
                  >
                    <Film className="w-4 h-4 text-teal-600 shrink-0" />
                    <div>
                      <span className="block font-black text-sm">Level 2: Tấm Vải 🧵</span>
                      <span className="block text-[10px] text-slate-500">7 Kỹ Thuật Móc Phẳng & Bính</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* LEVEL 3 DROPDOWN MENU (Vòng Tròn Ma Thuật & Projects) */}
            <div className="relative group">
              <button
                onClick={() => {
                  soundFx.playPop();
                  setDropdown3Open(!dropdown3Open);
                  setDropdownOpen(false);
                  setDropdown2Open(false);
                  setDropdown4Open(false);
                }}
                onMouseEnter={() => {
                  setDropdown3Open(true);
                  setDropdownOpen(false);
                  setDropdown2Open(false);
                  setDropdown4Open(false);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-extrabold text-xs sm:text-sm transition-all duration-200 ${
                  isLevel3Active
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md scale-105'
                    : 'text-slate-600 hover:text-purple-600 hover:bg-white/60'
                }`}
              >
                <Sparkles className={`w-4 h-4 ${isLevel3Active ? 'text-white' : 'text-purple-500'}`} />
                Level 3 🚀
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdown3Open ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu Content Level 3 */}
              {dropdown3Open && (
                <div 
                  onMouseLeave={() => setDropdown3Open(false)}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl border-4 border-purple-200 shadow-2xl p-2 z-50 animate-popIn space-y-1"
                >
                  <button
                    onClick={() => handleNavClick('level2_lessons')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                      activeTab === 'level2_lessons'
                        ? 'bg-purple-100 text-purple-700 font-black'
                        : 'text-slate-700 hover:bg-purple-50'
                    }`}
                  >
                    <Film className="w-4 h-4 text-purple-500 shrink-0" />
                    <div>
                      <span className="block font-black text-sm">Level 3: Vòng Tròn Ma Thuật 🌀</span>
                      <span className="block text-[10px] text-slate-500">7 Bài Học Vòng Tròn Ma Thuật</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('level2_projects_2d')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                      activeTab === 'level2_projects_2d'
                        ? 'bg-pink-100 text-pink-700 font-black'
                        : 'text-slate-700 hover:bg-purple-50'
                    }`}
                  >
                    <Palette className="w-4 h-4 text-pink-500 shrink-0" />
                    <div>
                      <span className="block font-black text-sm">Project 2D Level 3 🎨</span>
                      <span className="block text-[10px] text-slate-500">6 Mẫu Móc 2D Level 3</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* LEVEL 4 DROPDOWN MENU (Granny Square) */}
            <div className="relative group">
              <button
                onClick={() => {
                  soundFx.playPop();
                  setDropdown4Open(!dropdown4Open);
                  setDropdownOpen(false);
                  setDropdown2Open(false);
                  setDropdown3Open(false);
                  setDropdown5Open(false);
                }}
                onMouseEnter={() => {
                  setDropdown4Open(true);
                  setDropdownOpen(false);
                  setDropdown2Open(false);
                  setDropdown3Open(false);
                  setDropdown5Open(false);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-extrabold text-xs sm:text-sm transition-all duration-200 ${
                  isLevel4Active
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md scale-105'
                    : 'text-slate-600 hover:text-violet-600 hover:bg-white/60'
                }`}
              >
                <Sparkles className={`w-4 h-4 ${isLevel4Active ? 'text-white' : 'text-violet-500'}`} />
                Level 4 🔳
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdown4Open ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu Content Level 4 Granny Square */}
              {dropdown4Open && (
                <div 
                  onMouseLeave={() => setDropdown4Open(false)}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl border-4 border-violet-200 shadow-2xl p-2 z-50 animate-popIn space-y-1"
                >
                  <button
                    onClick={() => handleNavClick('level4_granny_lessons')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                      activeTab === 'level4_granny_lessons'
                        ? 'bg-violet-100 text-violet-800 font-black'
                        : 'text-slate-700 hover:bg-violet-50'
                    }`}
                  >
                    <Film className="w-4 h-4 text-violet-600 shrink-0" />
                    <div>
                      <span className="block font-black text-sm">Level 4: Granny Square 🔳</span>
                      <span className="block text-[10px] text-slate-500">Kỹ Thuật Ô Vuông & 6 Cách Nối</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* LEVEL 5 DROPDOWN MENU (Móc Túi) */}
            <div className="relative group">
              <button
                onClick={() => {
                  soundFx.playPop();
                  setDropdown5Open(!dropdown5Open);
                  setDropdownOpen(false);
                  setDropdown2Open(false);
                  setDropdown3Open(false);
                  setDropdown4Open(false);
                  setDropdown6Open(false);
                }}
                onMouseEnter={() => {
                  setDropdown5Open(true);
                  setDropdownOpen(false);
                  setDropdown2Open(false);
                  setDropdown3Open(false);
                  setDropdown4Open(false);
                  setDropdown6Open(false);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-extrabold text-xs sm:text-sm transition-all duration-200 ${
                  isLevel5Active
                    ? 'bg-gradient-to-r from-amber-500 via-purple-600 to-pink-500 text-white shadow-md scale-105'
                    : 'text-slate-600 hover:text-amber-600 hover:bg-white/60'
                }`}
              >
                <Sparkles className={`w-4 h-4 ${isLevel5Active ? 'text-white' : 'text-amber-500'}`} />
                Level 5 👜
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdown5Open ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu Content Level 5 Móc Túi */}
              {dropdown5Open && (
                <div 
                  onMouseLeave={() => setDropdown5Open(false)}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl border-4 border-amber-200 shadow-2xl p-2 z-50 animate-popIn space-y-1"
                >
                  <button
                    onClick={() => handleNavClick('level5_bag_lessons')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                      activeTab === 'level5_bag_lessons'
                        ? 'bg-amber-100 text-amber-900 font-black'
                        : 'text-slate-700 hover:bg-amber-50'
                    }`}
                  >
                    <Film className="w-4 h-4 text-amber-600 shrink-0" />
                    <div>
                      <span className="block font-black text-sm">Level 5: Móc Túi 👜</span>
                      <span className="block text-[10px] text-slate-500">Lý Thuyết Kỹ Thuật Móc Túi</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* LEVEL 6 DROPDOWN MENU (Mũi Móc Khác) */}
            <div className="relative group">
              <button
                onClick={() => {
                  soundFx.playPop();
                  setDropdown6Open(!dropdown6Open);
                  setDropdownOpen(false);
                  setDropdown2Open(false);
                  setDropdown3Open(false);
                  setDropdown4Open(false);
                  setDropdown5Open(false);
                }}
                onMouseEnter={() => {
                  setDropdown6Open(true);
                  setDropdownOpen(false);
                  setDropdown2Open(false);
                  setDropdown3Open(false);
                  setDropdown4Open(false);
                  setDropdown5Open(false);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-extrabold text-xs sm:text-sm transition-all duration-200 ${
                  isLevel6Active
                    ? 'bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 text-white shadow-md scale-105'
                    : 'text-slate-600 hover:text-rose-600 hover:bg-white/60'
                }`}
              >
                <Sparkles className={`w-4 h-4 ${isLevel6Active ? 'text-white' : 'text-rose-500'}`} />
                Level 6 🪄
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdown6Open ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu Content Level 6 Mũi Móc Khác */}
              {dropdown6Open && (
                <div 
                  onMouseLeave={() => setDropdown6Open(false)}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl border-4 border-rose-200 shadow-2xl p-2 z-50 animate-popIn space-y-1"
                >
                  <button
                    onClick={() => handleNavClick('level6_stitch_lessons')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                      activeTab === 'level6_stitch_lessons'
                        ? 'bg-rose-100 text-rose-900 font-black'
                        : 'text-slate-700 hover:bg-rose-50'
                    }`}
                  >
                    <Film className="w-4 h-4 text-rose-600 shrink-0" />
                    <div>
                      <span className="block font-black text-sm">Level 6: Các Mũi Móc Khác 🪄</span>
                      <span className="block text-[10px] text-slate-500">Bobble, Loop, Popcorn & Puff</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

          </nav>

          {/* Right Status Actions */}
          <div className="flex items-center gap-3">
            
            {/* Stars Counter */}
            <div className="flex items-center gap-1.5 bg-amber-100 border-2 border-amber-300 text-amber-800 px-3.5 py-1.5 rounded-full font-black text-sm shadow-sm">
              <Star className="w-5 h-5 text-amber-500 fill-amber-400 animate-pulse" />
              <span>{stars} ⭐</span>
            </div>

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
            
            {/* Mobile Level 1 Group */}
            <div className="bg-white p-3 rounded-2xl border-2 border-amber-200 space-y-2">
              <span className="text-xs font-black text-amber-700 block uppercase px-2">
                🌟 LEVEL 1:
              </span>
              <button
                onClick={() => handleNavClick('level1_lessons')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  activeTab === 'level1_lessons'
                    ? 'bg-pink-500 text-white shadow-md'
                    : 'bg-slate-50 text-slate-700'
                }`}
              >
                <Film className="w-4 h-4" />
                Video Bài Học Level 1 🎬 (9 Bài)
              </button>
              <button
                onClick={() => handleNavClick('projects')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  activeTab === 'projects'
                    ? 'bg-purple-500 text-white shadow-md'
                    : 'bg-slate-50 text-slate-700'
                }`}
              >
                <Heart className="w-4 h-4" />
                Dự Án / Project Level 1 🐙 (14 Mẫu)
              </button>
              <button
                onClick={() => handleNavClick('level1_quiz')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  activeTab === 'level1_quiz'
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-slate-50 text-slate-700'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                Trắc Nghiệm Đọc Chart 🎯
              </button>
            </div>

            {/* Mobile Level 2 Group */}
            <div className="bg-white p-3 rounded-2xl border-2 border-teal-200 space-y-2">
              <span className="text-xs font-black text-teal-700 block uppercase px-2">
                🧵 LEVEL 2:
              </span>
              <button
                onClick={() => handleNavClick('level2_sheet_lessons')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  activeTab === 'level2_sheet_lessons'
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-slate-50 text-slate-700'
                }`}
              >
                <Film className="w-4 h-4" />
                Level 2: Tấm Vải 🧵 (8 Bài)
              </button>
            </div>

            {/* Mobile Level 3 Group */}
            <div className="bg-white p-3 rounded-2xl border-2 border-purple-200 space-y-2">
              <span className="text-xs font-black text-purple-700 block uppercase px-2">
                🚀 LEVEL 3:
              </span>
              <button
                onClick={() => handleNavClick('level2_lessons')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  activeTab === 'level2_lessons'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-slate-50 text-slate-700'
                }`}
              >
                <Film className="w-4 h-4" />
                Vòng Tròn Ma Thuật Level 3 🌀 (9 Bài)
              </button>
              <button
                onClick={() => handleNavClick('level2_projects_2d')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  activeTab === 'level2_projects_2d'
                    ? 'bg-pink-500 text-white shadow-md'
                    : 'bg-slate-50 text-slate-700'
                }`}
              >
                <Palette className="w-4 h-4" />
                Project 2D Level 3 🎨 (6 Mẫu)
              </button>
            </div>

            {/* Mobile Level 4 Group */}
            <div className="bg-white p-3 rounded-2xl border-2 border-violet-200 space-y-2">
              <span className="text-xs font-black text-violet-700 block uppercase px-2">
                🔳 LEVEL 4:
              </span>
              <button
                onClick={() => handleNavClick('level4_granny_lessons')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  activeTab === 'level4_granny_lessons'
                    ? 'bg-violet-600 text-white shadow-md'
                    : 'bg-slate-50 text-slate-700'
                }`}
              >
                <Film className="w-4 h-4" />
                Level 4: Granny Square 🔳 (3 Bài)
              </button>
            </div>

            {/* Mobile Level 5 Group */}
            <div className="bg-white p-3 rounded-2xl border-2 border-amber-200 space-y-2">
              <span className="text-xs font-black text-amber-700 block uppercase px-2">
                👜 LEVEL 5:
              </span>
              <button
                onClick={() => handleNavClick('level5_bag_lessons')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  activeTab === 'level5_bag_lessons'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-slate-50 text-slate-700'
                }`}
              >
                <Film className="w-4 h-4" />
                Level 5: Móc Túi 👜 (2 Bài)
              </button>
            </div>

            {/* Mobile Level 6 Group */}
            <div className="bg-white p-3 rounded-2xl border-2 border-rose-200 space-y-2">
              <span className="text-xs font-black text-rose-700 block uppercase px-2">
                🪄 LEVEL 6:
              </span>
              <button
                onClick={() => handleNavClick('level6_stitch_lessons')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  activeTab === 'level6_stitch_lessons'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-slate-50 text-slate-700'
                }`}
              >
                <Film className="w-4 h-4" />
                Level 6: Các Mũi Móc Khác 🪄 (4 Bài)
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
