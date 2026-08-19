import React, { useState } from 'react';
import { BookOpen, CheckCircle2, ChevronRight, Play, Film, Sparkles, Star, Award, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/sound';
import { CROCHET_SYMBOLS } from '../data/crochetSymbols';
import SymbolRenderer from './SymbolRenderer';
import CrochetMotionPlayer from './CrochetMotionPlayer';

// ONLY the 5 stitches requested for Level 1
const LEVEL1_SYMBOL_IDS = ['ch', 'sl_st', 'sc', 'hdc', 'dc'];

export default function Level1Lessons({ onAddStars, onUnlockBadge }) {
  const level1Symbols = CROCHET_SYMBOLS.filter((s) => LEVEL1_SYMBOL_IDS.includes(s.id));
  const [selectedId, setSelectedId] = useState('ch');
  const [isFlipped, setIsFlipped] = useState(false);
  const [completedStitches, setCompletedStitches] = useState([]);

  const currentSymbol = level1Symbols.find((s) => s.id === selectedId) || level1Symbols[0];

  const handleSelectStitch = (id) => {
    soundFx.playPop();
    setIsFlipped(false);
    setSelectedId(id);
  };

  const handleCompleteLesson = (id) => {
    if (!completedStitches.includes(id)) {
      soundFx.playSuccess();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      setCompletedStitches([...completedStitches, id]);
      onAddStars(15);

      if (completedStitches.length + 1 >= 5) {
        onUnlockBadge('level1_master');
      }
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-pink-400 to-purple-500 p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-white">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black">
            <Sparkles className="w-4 h-4 text-amber-200 animate-spin-slow" />
            Lớp Học Khởi Đầu Dành Cho Bé
          </div>
          <h2 className="text-3xl sm:text-4xl font-black">
            Level 1: 5 Mũi Móc Len Cơ Bản 🌟
          </h2>
          <p className="text-sm sm:text-base font-bold text-amber-50 max-w-xl">
            Bé hãy xem video bài học và luyện tập flashcard cho 5 mũi móc căn bản: Mũi Bính (ch), Mũi Dời (sl st), Mũi Đơn (sc), Mũi Nửa Kép (hdc) và Mũi Kép Đơn (dc)!
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-white/90 backdrop-blur-md text-slate-800 p-4 rounded-2xl border-2 border-white shadow-md text-center min-w-[180px]">
          <span className="block text-xs font-black text-slate-500">Tiến Trình Level 1</span>
          <span className="text-2xl font-black text-pink-600">
            {completedStitches.length} / 5 Bài
          </span>
          <div className="w-full bg-slate-100 h-2.5 rounded-full mt-2 overflow-hidden border border-slate-200">
            <div 
              className="bg-gradient-to-r from-amber-400 to-pink-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${(completedStitches.length / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* 5 Stitch Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {level1Symbols.map((item, idx) => {
          const isSelected = item.id === selectedId;
          const isDone = completedStitches.includes(item.id);

          return (
            <button
              key={item.id}
              onClick={() => handleSelectStitch(item.id)}
              className={`p-4 rounded-2xl border-4 font-black transition-all duration-200 flex flex-col items-center justify-center gap-2 relative ${
                isSelected
                  ? 'bg-gradient-to-tr from-pink-400 to-purple-500 text-white border-white shadow-xl scale-105'
                  : isDone
                  ? 'bg-emerald-50 border-emerald-200 text-slate-800 hover:bg-emerald-100'
                  : 'bg-white border-pink-100 text-slate-700 hover:border-pink-300 hover:bg-pink-50/50'
              }`}
            >
              {isDone && (
                <span className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              )}

              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center p-1 shadow-inner">
                <SymbolRenderer type={item.svgType} className="w-9 h-9" strokeColor="#0F172A" />
              </div>

              <div className="text-center">
                <span className="block text-xs font-black opacity-90">{item.abbr}</span>
                <span className="block text-[11px] font-bold truncate max-w-[100px]">{item.nameVi.split('(')[0]}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Lesson Workspace: Video Player & Flashcard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Column: Cloudinary Video & Motion Simulator */}
        <div className="bg-white rounded-3xl border-4 border-pink-200 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black bg-pink-100 text-pink-700 px-3.5 py-1 rounded-full border border-pink-200 flex items-center gap-1.5">
              <Film className="w-4 h-4" /> Video Hướng Dẫn Móc ({currentSymbol.abbr})
            </span>
            <span className="text-xs font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
              Thưởng: +15 ⭐
            </span>
          </div>

          <CrochetMotionPlayer symbol={currentSymbol} showSymbolOverlay={true} className="w-full" />

          <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 text-slate-700 space-y-1">
            <h4 className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
              💡 Thao tác căn bản:
            </h4>
            <p className="text-xs font-bold text-slate-600 leading-relaxed">
              {currentSymbol.description}
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Level 1 Flashcard */}
        <div className="bg-white rounded-3xl border-4 border-purple-200 p-6 shadow-xl space-y-6 text-center">
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-black bg-purple-100 text-purple-700 px-3.5 py-1 rounded-full border border-purple-200 flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> Thẻ Flashcard Ký Hiệu ({currentSymbol.abbr})
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
            className="w-full min-h-[260px] bg-gradient-to-tr from-amber-50 to-pink-50 rounded-3xl border-4 border-amber-300 shadow-inner p-8 flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-102 relative overflow-hidden group"
          >
            {!isFlipped ? (
              <div className="space-y-4 flex flex-col items-center animate-popIn">
                <SymbolRenderer type={currentSymbol.svgType} className="w-32 h-32" strokeColor="#0F172A" />
                <span className="font-extrabold text-xs text-slate-500">
                  (Bấm vào đây để lật xem tên mũi móc & ký hiệu viết tắt)
                </span>
              </div>
            ) : (
              <div className="space-y-3 animate-popIn">
                <span className="text-4xl font-black text-pink-600 bg-white px-5 py-2 rounded-2xl border-2 border-pink-200 shadow-sm inline-block">
                  {currentSymbol.abbr}
                </span>
                <h3 className="text-2xl font-black text-slate-800">
                  {currentSymbol.nameVi}
                </h3>
                <p className="text-sm font-extrabold text-purple-600">
                  {currentSymbol.nameEn}
                </p>
                <p className="text-xs font-bold text-slate-600 max-w-sm mx-auto bg-white/90 p-3 rounded-xl border border-amber-200 shadow-sm">
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
                : 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white hover:scale-105'
            }`}
          >
            {completedStitches.includes(currentSymbol.id) ? (
              <>
                <CheckCircle2 className="w-6 h-6" />
                Đã Hoàn Thành Bài Học Mũi ({currentSymbol.abbr}) ✨
              </>
            ) : (
              <>
                <CheckCircle2 className="w-6 h-6" />
                Bấm Đánh Dấu Đã Học (+15 ⭐)
              </>
            )}
          </button>

        </div>

      </div>

    </div>
  );
}
