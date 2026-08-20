import React, { useState } from 'react';
import { BookOpen, CheckCircle2, ChevronRight, Play, Film, Sparkles, Star, Award, Layers, Video } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/sound';
import { CROCHET_SYMBOLS } from '../data/crochetSymbols';
import SymbolRenderer from './SymbolRenderer';
import CrochetMotionPlayer from './CrochetMotionPlayer';

// 9 Level 2 Tấm Vải items: sheet_start, sheet_long_chain, sheet_row2, sheet_adjust_chain, sheet_bottom_loop, sheet_finish, sheet_step_up, sheet_add_yarn, sheet_change_color
const LEVEL2_SHEET_SYMBOL_IDS = [
  'sheet_start',
  'sheet_long_chain',
  'sheet_row2',
  'sheet_adjust_chain',
  'sheet_bottom_loop',
  'sheet_finish',
  'sheet_step_up',
  'sheet_add_yarn',
  'sheet_change_color'
];

export default function Level2SheetLessons({ onAddStars, onUnlockBadge }) {
  const sheetSymbols = LEVEL2_SHEET_SYMBOL_IDS.map((id) => CROCHET_SYMBOLS.find((s) => s.id === id)).filter(Boolean);
  const [selectedId, setSelectedId] = useState('sheet_start');
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [completedStitches, setCompletedStitches] = useState([]);

  const currentSymbol = sheetSymbols.find((s) => s.id === selectedId) || sheetSymbols[0];

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
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
      setCompletedStitches([...completedStitches, id]);
      onAddStars(20);

      if (completedStitches.length + 1 >= sheetSymbols.length) {
        onUnlockBadge('level2_sheet_master');
      }
    }
  };

  // Custom labels for multi-video lessons in Level 2 Tấm Vải
  const getVideoLabel = (symbolId, idx) => {
    if (symbolId === 'sheet_adjust_chain') {
      return idx === 0 ? '🎬 Video 1: Thừa Bính' : '🎬 Video 2: Thiếu Bính';
    }
    if (symbolId === 'sheet_finish') {
      return idx === 0 ? '🎬 Video 1: Kết Thúc Tàng Hình' : '🎬 Video 2: Mẹo Kết Thúc Yêu Thích';
    }
    if (symbolId === 'sheet_change_color') {
      return idx === 0 ? '🎬 Video 1: Đổi Màu Chuẩn' : '🎬 Video 2: Mẹo Đổi Màu Mới';
    }
    return `🎬 Video ${idx + 1}`;
  };

  // Determine active video URL for items with multiple videos (e.g. sheet_adjust_chain, sheet_finish)
  const currentVideoUrl = currentSymbol.videoUrls && currentSymbol.videoUrls[activeVideoIndex]
    ? currentSymbol.videoUrls[activeVideoIndex]
    : currentSymbol.videoUrl;

  const displaySymbol = {
    ...currentSymbol,
    videoUrl: currentVideoUrl
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Banner Level 2 Tấm Vải */}
      <div className="bg-gradient-to-r from-teal-500 via-emerald-500 to-indigo-500 p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-white">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black">
            <Sparkles className="w-4 h-4 text-emerald-200 animate-spin-slow" />
            Lớp Học Kỹ Thuật Móc Phẳng Level 2
          </div>
          <h2 className="text-3xl sm:text-4xl font-black">
            Level 2: Tấm Vải & Kỹ Thuật Móc Phẳng 🧵
          </h2>
          <p className="text-sm sm:text-base font-bold text-emerald-50 max-w-xl">
            Bé hãy xem 7 bài học lý thuyết trực quan về kỹ thuật móc tấm vải phẳng: Bắt Đầu nút bính, Dây Xích Dài, mẹo Thừa/Thiếu bính, Cách Kết Thúc, Lên Hàng thẳng tắp, Thêm Len & Đổi Màu Len nhé!
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-white/90 backdrop-blur-md text-slate-800 p-4 rounded-2xl border-2 border-white shadow-md text-center min-w-[180px]">
          <span className="block text-xs font-black text-slate-500">Tiến Trình Level 2</span>
          <span className="text-2xl font-black text-teal-600">
            {completedStitches.length} / {sheetSymbols.length} Bài
          </span>
          <div className="w-full bg-slate-100 h-2.5 rounded-full mt-2 overflow-hidden border border-slate-200">
            <div 
              className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${(completedStitches.length / sheetSymbols.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* 9 Level 2 Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-3">
        {sheetSymbols.map((item) => {
          const isSelected = item.id === selectedId;
          const isDone = completedStitches.includes(item.id);

          return (
            <button
              key={item.id}
              onClick={() => handleSelectStitch(item.id)}
              className={`p-4 rounded-3xl border-4 font-black transition-all duration-200 flex items-center gap-3 relative ${
                isSelected
                  ? 'bg-gradient-to-tr from-teal-500 to-emerald-500 text-white border-white shadow-xl scale-105'
                  : isDone
                  ? 'bg-emerald-50 border-emerald-200 text-slate-800 hover:bg-emerald-100'
                  : 'bg-white border-teal-100 text-slate-700 hover:border-teal-300 hover:bg-teal-50/50'
              }`}
            >
              {isDone && (
                <span className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-1 shadow-md">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
              )}

              <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center p-2 shadow-inner shrink-0">
                <SymbolRenderer type={item.svgType} className="w-8 h-8" strokeColor="#0F172A" />
              </div>

              <div className="text-left overflow-hidden">
                <span className="block text-sm font-black truncate">{item.abbr}</span>
                <span className="block text-[11px] font-bold opacity-80 truncate">{item.nameVi.split('(')[0]}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Lesson Workspace: Video Player & Flashcard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Column: Cloudinary Video & Motion Simulator */}
        <div className="bg-white rounded-3xl border-4 border-teal-200 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-black bg-teal-100 text-teal-700 px-3.5 py-1 rounded-full border border-teal-200 flex items-center gap-1.5">
              <Film className="w-4 h-4" /> Video Lý Thuyết Tấm Vải ({currentSymbol.nameVi})
            </span>
            <span className="text-xs font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
              Thưởng: +20 ⭐
            </span>
          </div>

          {/* Multi-part Video Switcher (if videoUrls array is present e.g. Thừa và Thiếu) */}
          {currentSymbol.videoUrls && currentSymbol.videoUrls.length > 1 && (
            <div className="flex items-center gap-2 bg-teal-50 p-2 rounded-2xl border border-teal-200">
              <span className="text-xs font-black text-teal-800 px-2 flex items-center gap-1">
                <Video className="w-4 h-4" /> Chọn Video:
              </span>
              {currentSymbol.videoUrls.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    soundFx.playPop();
                    setActiveVideoIndex(idx);
                  }}
                  className={`flex-1 py-1.5 px-3 rounded-xl font-extrabold text-xs transition-all ${
                    activeVideoIndex === idx
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'bg-white text-teal-700 hover:bg-teal-100 border border-teal-200'
                  }`}
                >
                  {getVideoLabel(currentSymbol.id, idx)}
                </button>
              ))}
            </div>
          )}

          <CrochetMotionPlayer symbol={displaySymbol} showSymbolOverlay={true} className="w-full" />

          <div className="bg-teal-50/70 p-4 rounded-2xl border border-teal-200 text-slate-700 space-y-1">
            <h4 className="font-extrabold text-sm text-teal-900 flex items-center gap-2">
              💡 Thao tác căn bản tấm vải:
            </h4>
            <p className="text-xs font-bold text-slate-600 leading-relaxed">
              {currentSymbol.description}
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Level 2 Flashcard */}
        <div className="bg-white rounded-3xl border-4 border-emerald-200 p-6 shadow-xl space-y-6 text-center">
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-black bg-emerald-100 text-emerald-700 px-3.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> Thẻ Flashcard Tấm Vải ({currentSymbol.abbr})
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
            className="w-full min-h-[260px] bg-gradient-to-tr from-teal-50 to-emerald-50 rounded-3xl border-4 border-teal-300 shadow-inner p-8 flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-102 relative overflow-hidden group"
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
                <span className="text-3xl font-black text-teal-600 bg-white px-5 py-2 rounded-2xl border-2 border-teal-200 shadow-sm inline-block">
                  {currentSymbol.abbr}
                </span>
                <h3 className="text-2xl font-black text-slate-800">
                  {currentSymbol.nameVi}
                </h3>
                <p className="text-sm font-extrabold text-emerald-600">
                  {currentSymbol.nameEn}
                </p>
                <p className="text-xs font-bold text-slate-600 max-w-sm mx-auto bg-white/90 p-3 rounded-xl border border-teal-200 shadow-sm">
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
                : 'bg-gradient-to-r from-teal-500 via-emerald-500 to-indigo-500 text-white hover:scale-105'
            }`}
          >
            {completedStitches.includes(currentSymbol.id) ? (
              <>
                <CheckCircle2 className="w-6 h-6" />
                Đã Hoàn Thành Bài Học Tấm Vải ({currentSymbol.abbr}) ✨
              </>
            ) : (
              <>
                <CheckCircle2 className="w-6 h-6" />
                Bấm Đánh Dấu Đã Học (+20 ⭐)
              </>
            )}
          </button>

        </div>

      </div>

    </div>
  );
}
