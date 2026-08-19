import React from 'react';
import { Award, Lock, Sparkles, Star, CheckCircle, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/sound';

export default function AchievementBadges({ badges, stars }) {
  const badgeDefinitions = [
    {
      id: 'slip_knot_master',
      title: 'Thợ Nút Thắt Tập Sự 🪢',
      icon: '🪢',
      description: 'Hoàn thành bài học Nút Thắt Kỳ Diệu.',
      color: 'from-pink-400 to-rose-400'
    },
    {
      id: 'chain_master',
      title: 'Bậc Thầy Mũi Bính 📿',
      icon: '📿',
      description: 'Thực hành móc 20 mũi bính liên tiếp.',
      color: 'from-amber-400 to-yellow-500'
    },
    {
      id: 'single_crochet_master',
      title: 'Chuyên Gia Mũi Đơn 🧱',
      icon: '🧱',
      description: 'Hoàn thành bài học Mũi Đơn chắc chắn.',
      color: 'from-emerald-400 to-teal-500'
    },
    {
      id: 'jellyfish_master',
      title: 'Chúa Tể Sứa Biển 🐙',
      icon: '🐙',
      description: 'Móc xong dự án Chú Sứa Bảy Sắc Cầu Vồng.',
      color: 'from-purple-400 to-indigo-500'
    },
    {
      id: 'color_designer',
      title: 'Nhà Thiết Kế Màu Sắc 🎨',
      icon: '🎨',
      description: 'Thử nghiệm và lưu phối màu cuộn len bé thích.',
      color: 'from-pink-500 to-purple-600'
    },
    {
      id: 'star_superstar',
      title: 'Ngôi Sao Sáng Chói ⭐',
      icon: '✨',
      description: 'Tích lũy từ 50 Ngôi Sao trở lên.',
      color: 'from-yellow-400 to-amber-500'
    },
    {
      id: 'quiz_master',
      title: 'Bậc Thầy Trắc Nghiệm 🎯',
      icon: '🎯',
      description: 'Đạt chuỗi trả lời đúng đố vui ký hiệu.',
      color: 'from-purple-500 to-indigo-600'
    }
  ];

  const handleBadgeClick = (badgeDef, isUnlocked) => {
    if (isUnlocked) {
      soundFx.playBadge();
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.5 }
      });
    } else {
      soundFx.playPop();
    }
  };

  const unlockedCount = badgeDefinitions.filter((b) => badges.includes(b.id) || (b.id === 'star_superstar' && stars >= 50)).length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-pink-400 to-purple-500 p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-white">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black">
            <Trophy className="w-4 h-4 text-amber-200" />
            Bảng Vàng Bách Khoa Huy Chương
          </div>
          <h2 className="text-3xl sm:text-4xl font-black">
            Bộ Bộ Huy Chương Của Bé 🏆
          </h2>
          <p className="text-sm sm:text-base font-bold text-amber-50 max-w-xl">
            Mỗi bài học và dự án bé hoàn thành sẽ mở khóa một chiếc huy chương rực rỡ!
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-md text-slate-800 p-4 rounded-2xl border-2 border-white shadow-md text-center min-w-[180px]">
          <span className="block text-xs font-black text-slate-500">Huy Chương Đã Mở</span>
          <span className="text-2xl font-black text-amber-600">
            {unlockedCount} / {badgeDefinitions.length}
          </span>
          <div className="w-full bg-slate-100 h-2.5 rounded-full mt-2 overflow-hidden border border-slate-200">
            <div 
              className="bg-gradient-to-r from-amber-400 to-pink-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${(unlockedCount / badgeDefinitions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {badgeDefinitions.map((b) => {
          const isUnlocked = badges.includes(b.id) || (b.id === 'star_superstar' && stars >= 50);

          return (
            <div
              key={b.id}
              onClick={() => handleBadgeClick(b, isUnlocked)}
              className={`p-6 rounded-3xl border-4 transition-all duration-300 cursor-pointer relative overflow-hidden flex items-center gap-4 ${
                isUnlocked
                  ? 'bg-white border-pink-200 shadow-xl hover:scale-105 hover:shadow-2xl'
                  : 'bg-slate-100 border-slate-200 opacity-60 grayscale hover:opacity-80'
              }`}
            >
              {/* Badge Icon circle */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${b.color} text-white flex items-center justify-center text-3xl shadow-md shrink-0`}>
                {b.icon}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-lg text-slate-800">
                    {b.title}
                  </h3>
                  {isUnlocked ? (
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </div>
                <p className="text-xs font-bold text-slate-500">
                  {b.description}
                </p>
                <span className={`inline-block text-[10px] font-black px-2 py-0.5 rounded-full ${
                  isUnlocked ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {isUnlocked ? 'ĐÃ MỞ KHÓA ✨' : 'CHƯA MỞ KHÓA'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
