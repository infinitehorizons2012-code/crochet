import React, { useState } from 'react';
import { BookOpen, CheckCircle2, ChevronRight, Play, Film, Sparkles, Star, Award, Layers, Video, Grid } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/sound';
import { CROCHET_SYMBOLS } from '../data/crochetSymbols';
import SymbolRenderer from './SymbolRenderer';
import CrochetMotionPlayer from './CrochetMotionPlayer';

const LEVEL4_GRANNY_SYMBOL_IDS = [
  'granny_basic',
  'granny_corner',
  'granny_join'
];

export default function Level4GrannyLessons({ onAddStars, onUnlockBadge }) {
  const grannySymbols = LEVEL4_GRANNY_SYMBOL_IDS.map((id) => CROCHET_SYMBOLS.find((s) => s.id === id)).filter(Boolean);
  const [selectedId, setSelectedId] = useState('granny_basic');
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [completedStitches, setCompletedStitches] = useState([]);

  const currentSymbol = grannySymbols.find((s) => s.id === selectedId) || grannySymbols[0];

  const handleSelectStitch = (id) => {
    soundFx.playPop();
    setIsFlipped(false);
    setActiveVideoIndex(0);
    setSelectedId(id);
  };

  const handleCompleteLesson = (id) => {
    if (!completedStitches.includes(id)) {
      soundFx.playSuccess();
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 }
      });
      setCompletedStitches([...completedStitches, id]);
      onAddStars(25);

      if (completedStitches.length + 1 >= grannySymbols.length) {
        onUnlockBadge('level4_granny_master');
      }
    }
  };

  // Custom labels for multi-video lessons
  const getVideoLabel = (symbolId, idx) => {
    if (symbolId === 'granny_basic') {
      return idx === 0 ? '🎬 Cách 1: Vòng Tròn Ma Thuật (MR)' : '🎬 Cách 2: Chuỗi Bính (Chain)';
    }
    if (symbolId === 'granny_join') {
      const labels = [
        '🎬 Cách Nối 1 (Fun Seam)',
        '🎬 Cách Nối 2 (Seamless Join)',
        '🎬 Cách Nối 3 (Decorative 1)',
        '🎬 Cách Nối 4 (Classic Seam)',
        '🎬 Cách Nối 5 (Decorative 2)',
        '🎬 Cách Nối 6 (Mẹo Nối Nhanh)'
      ];
      return labels[idx] || `🎬 Cách Nối ${idx + 1}`;
    }
    return `🎬 Video ${idx + 1}`;
  };

  // Determine active video URL
  const currentVideoUrl = currentSymbol.videoUrls && currentSymbol.videoUrls[activeVideoIndex]
    ? currentSymbol.videoUrls[activeVideoIndex]
    : currentSymbol.videoUrl;

  const displaySymbol = {
    ...currentSymbol,
    videoUrl: currentVideoUrl
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Banner Level 4 Granny Square */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-white">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black">
            <Sparkles className="w-4 h-4 text-purple-200 animate-spin-slow" />
            Lớp Học Kỹ Thuật Chuyên Sâu Level 4
          </div>
          <h2 className="text-3xl sm:text-4xl font-black">
            Level 4: Granny Square (Ô Vuông Granny) 🔳
          </h2>
          <p className="text-sm sm:text-base font-bold text-purple-100 max-w-xl">
            Bé hãy khám phá thế giới Ô Vuông Granny sinh động: 2 cách khởi đầu (MR & Chuỗi Bính), kỹ thuật bo góc vuông vắn và 6 phương pháp ghép nối 2 ô Granny cực kỳ sáng tạo nhé!
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-white/90 backdrop-blur-md text-slate-800 p-4 rounded-2xl border-2 border-white shadow-md text-center min-w-[180px]">
          <span className="block text-xs font-black text-slate-500">Tiến Trình Level 4</span>
          <span className="text-2xl font-black text-violet-600">
            {completedStitches.length} / {grannySymbols.length} Bài
          </span>
          <div className="w-full bg-slate-100 h-2.5 rounded-full mt-2 overflow-hidden border border-slate-200">
            <div 
              className="bg-gradient-to-r from-violet-500 to-indigo-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${(completedStitches.length / grannySymbols.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3 Level 4 Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {grannySymbols.map((item) => {
          const isSelected = item.id === selectedId;
          const isDone = completedStitches.includes(item.id);

          return (
            <button
              key={item.id}
              onClick={() => handleSelectStitch(item.id)}
              className={`p-5 rounded-3xl border-4 font-black transition-all duration-200 flex items-center gap-4 relative ${
                isSelected
                  ? 'bg-gradient-to-tr from-violet-600 to-indigo-600 text-white border-white shadow-xl scale-105'
                  : isDone
                  ? 'bg-emerald-50 border-emerald-200 text-slate-800 hover:bg-emerald-100'
                  : 'bg-white border-violet-100 text-slate-700 hover:border-violet-300 hover:bg-violet-50/50'
              }`}
            >
              {isDone && (
                <span className="absolute top-3 right-3 bg-emerald-500 text-white rounded-full p-1 shadow-md">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              )}

              <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center p-2.5 shadow-inner shrink-0">
                <SymbolRenderer type={item.svgType} className="w-9 h-9" strokeColor="#0F172A" />
              </div>

              <div className="text-left overflow-hidden">
                <span className="block text-base font-black truncate">{item.abbr}</span>
                <span className="block text-xs font-bold opacity-80 truncate">{item.nameVi}</span>
                <span className="inline-block mt-1 text-[10px] bg-white/30 text-white px-2 py-0.5 rounded-full font-bold">
                  {item.videoUrls ? `${item.videoUrls.length} Video` : '1 Video'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Lesson Workspace: Video Player & Flashcard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Column: Cloudinary Video & Motion Simulator */}
        <div className="bg-white rounded-3xl border-4 border-violet-200 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-black bg-violet-100 text-violet-700 px-3.5 py-1 rounded-full border border-violet-200 flex items-center gap-1.5">
              <Film className="w-4 h-4" /> Video Bài Học Granny Square ({currentSymbol.nameVi})
            </span>
            <span className="text-xs font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
              Thưởng: +25 ⭐
            </span>
          </div>

          {/* Multi-part Video Switcher */}
          {currentSymbol.videoUrls && currentSymbol.videoUrls.length > 1 && (
            <div className="flex flex-wrap items-center gap-2 bg-purple-50 p-2.5 rounded-2xl border border-purple-200">
              <span className="text-xs font-black text-purple-800 px-2 flex items-center gap-1 w-full sm:w-auto">
                <Video className="w-4 h-4 text-purple-600" /> Chọn Video Hướng Dẫn:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full mt-1">
                {currentSymbol.videoUrls.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      soundFx.playPop();
                      setActiveVideoIndex(idx);
                    }}
                    className={`py-2 px-3 rounded-xl font-extrabold text-xs transition-all text-left truncate ${
                      activeVideoIndex === idx
                        ? 'bg-violet-600 text-white shadow-md'
                        : 'bg-white text-purple-700 hover:bg-purple-100 border border-purple-200'
                    }`}
                  >
                    {getVideoLabel(currentSymbol.id, idx)}
                  </button>
                ))}
              </div>
            </div>
          )}

          <CrochetMotionPlayer symbol={displaySymbol} showSymbolOverlay={true} className="w-full" />

          <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-200 text-slate-700 space-y-1">
            <h4 className="font-extrabold text-sm text-purple-900 flex items-center gap-2">
              💡 Thao tác căn bản Ô Vuông Granny:
            </h4>
            <p className="text-xs font-bold text-slate-600 leading-relaxed">
              {currentSymbol.description}
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Level 4 Flashcard */}
        <div className="bg-white rounded-3xl border-4 border-indigo-200 p-6 shadow-xl space-y-6 text-center">
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-black bg-indigo-100 text-indigo-700 px-3.5 py-1 rounded-full border border-indigo-200 flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> Thẻ Flashcard Level 4 ({currentSymbol.abbr})
            </span>
            <span className="text-xs font-extrabold text-slate-500">
              💡 Bấm vào thẻ để lật
            </span>
          </div>

          {/* Flashcard Box */}
          <div
            onClick={() => {
              soundFx.playPop();
              setIsFlipped(!isFlipped);
            }}
            className="w-full min-h-[260px] bg-gradient-to-tr from-violet-50 to-indigo-50 rounded-3xl border-4 border-violet-300 shadow-inner p-8 flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-102 relative overflow-hidden group"
          >
            {!isFlipped ? (
              <div className="space-y-4 flex flex-col items-center animate-popIn">
                <SymbolRenderer type={currentSymbol.svgType} className="w-32 h-32" strokeColor="#0F172A" />
                <span className="font-extrabold text-xs text-slate-500">
                  (Bấm vào đây để lật xem tên bài học & chi tiết)
                </span>
              </div>
            ) : (
              <div className="space-y-3 animate-popIn">
                <span className="text-3xl font-black text-violet-600 bg-white px-5 py-2 rounded-2xl border-2 border-violet-200 shadow-sm inline-block">
                  {currentSymbol.abbr}
                </span>
                <h3 className="text-2xl font-black text-slate-800">
                  {currentSymbol.nameVi}
                </h3>
                <p className="text-sm font-extrabold text-indigo-600">
                  {currentSymbol.nameEn}
                </p>
                <p className="text-xs font-bold text-slate-600 max-w-sm mx-auto bg-white/90 p-3 rounded-xl border border-violet-200 shadow-sm">
                  {currentSymbol.description}
                </p>
              </div>
            )}
          </div>

          {/* Lesson Completion Button */}
          <button
            onClick={() => handleCompleteLesson(currentSymbol.id)}
            disabled={completedStitches.includes(currentSymbol.id)}
            className={`w-full py-4 rounded-2xl font-black text-base shadow-lg transition-all flex items-center justify-center gap-2 ${
              completedStitches.includes(currentSymbol.id)
                ? 'bg-emerald-500 text-white cursor-default'
                : 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white hover:scale-105'
            }`}
          >
            {completedStitches.includes(currentSymbol.id) ? (
              <>
                <CheckCircle2 className="w-6 h-6" />
                Đã Hoàn Thành Bài Học Granny Square ({currentSymbol.abbr}) ✨
              </>
            ) : (
              <>
                <CheckCircle2 className="w-6 h-6" />
                Bấm Đánh Dấu Đã Học (+25 ⭐)
              </>
            )}
          </button>

        </div>

      </div>

    </div>
  );
}
