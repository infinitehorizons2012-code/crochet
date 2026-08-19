import React from 'react';
import { Play, Sparkles, Heart, Star, CheckCircle, Smile } from 'lucide-react';
import { soundFx } from '../utils/sound';

export default function Hero({ onStartLearning, onExploreProjects }) {
  const handleStart = () => {
    soundFx.playSuccess();
    onStartLearning();
    setTimeout(() => {
      const el = document.getElementById('stitch-workshop');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleProjects = () => {
    soundFx.playPop();
    onExploreProjects();
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-pink-100/70 via-amber-50 to-purple-100/50 py-12 md:py-20 rounded-3xl my-6 border-4 border-white shadow-xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Decorative floating shapes background */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-200/50 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute top-1/2 -right-10 w-60 h-60 bg-amber-200/40 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Content */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border-2 border-pink-200 text-pink-600 font-extrabold text-sm shadow-sm animate-bounce-slow">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Góc Nhỏ Sáng Tạo Dành Riêng Cho Bé! 🎀</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-800 leading-tight tracking-tight">
            Học Móc Len <br />
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-amber-500 bg-clip-text text-transparent">
              Cực Kỳ Đơn Giản & Vui!
            </span> 🧶
          </h1>

          <p className="text-lg sm:text-xl font-bold text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Chỉ với một chiếc kim móc và cuộn len nhiều màu, bé có thể tự tay biến hóa ra chú sứa cầu vồng, trái tim xinh xắn hay bông hoa rực rỡ!
          </p>

          {/* Key Feature Pills */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
            <div className="flex items-center gap-2 bg-white/90 px-3.5 py-1.5 rounded-2xl border border-pink-200 font-extrabold text-xs text-slate-700 shadow-sm">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              Hướng dẫn từng bước dễ hiểu
            </div>
            <div className="flex items-center gap-2 bg-white/90 px-3.5 py-1.5 rounded-2xl border border-amber-200 font-extrabold text-xs text-slate-700 shadow-sm">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              Tích sao đổi huy chương
            </div>
            <div className="flex items-center gap-2 bg-white/90 px-3.5 py-1.5 rounded-2xl border border-purple-200 font-extrabold text-xs text-slate-700 shadow-sm">
              <Smile className="w-4 h-4 text-purple-500" />
              100% An toàn & Miễn phí
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <button
              onClick={handleStart}
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-black text-lg px-8 py-4 rounded-3xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white"
            >
              <Play className="w-6 h-6 fill-white" />
              Học Móc Ngay Thôi!
            </button>

            <button
              onClick={handleProjects}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-pink-50 text-pink-600 font-extrabold text-base px-6 py-4 rounded-3xl shadow-md border-2 border-pink-200 hover:border-pink-300 transition-all duration-200"
            >
              <Heart className="w-5 h-5 text-pink-500 fill-pink-100" />
              Xem Mẫu Móc Dễ Thương
            </button>
          </div>
        </div>

        {/* Right Illustration Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md bg-white p-6 rounded-3xl border-4 border-pink-200 shadow-2xl space-y-4 text-center">
            
            {/* Cute Banner Graphic */}
            <div className="w-full h-48 bg-gradient-to-tr from-pink-200 via-amber-100 to-purple-200 rounded-2xl flex items-center justify-center relative overflow-hidden group">
              <div className="text-8xl animate-bounce-slow transform group-hover:scale-110 transition-transform">
                🐙
              </div>
              <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-black text-pink-600 flex items-center gap-1 border border-pink-200">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                Mẫu Đang Hot!
              </div>
              <div className="absolute bottom-3 right-3 text-4xl animate-pulse">
                🧶
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-black text-xl text-slate-800">
                Chú Sứa Bảy Sắc Cầu Vồng 🌈
              </h3>
              <p className="text-xs font-bold text-slate-500">
                Mẫu móc cực dễ dành cho bé mới bắt đầu tập móc!
              </p>
            </div>

            {/* Steps Quick Badge */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
              <div className="bg-pink-50 p-2 rounded-xl text-center">
                <span className="block text-xs font-bold text-slate-400">Thời gian</span>
                <span className="font-extrabold text-sm text-pink-600">15-20 phút</span>
              </div>
              <div className="bg-amber-50 p-2 rounded-xl text-center">
                <span className="block text-xs font-bold text-slate-400">Độ khó</span>
                <span className="font-extrabold text-sm text-amber-600">Rất Dễ ⭐</span>
              </div>
              <div className="bg-purple-50 p-2 rounded-xl text-center">
                <span className="block text-xs font-bold text-slate-400">Điểm thưởng</span>
                <span className="font-extrabold text-sm text-purple-600">+30 ⭐</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
