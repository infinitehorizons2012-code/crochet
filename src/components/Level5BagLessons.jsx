import React, { useState } from 'react';
import { CheckCircle2, Film, Sparkles, ShoppingBag, Video, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/sound';
import { CROCHET_SYMBOLS } from '../data/crochetSymbols';
import SymbolRenderer from './SymbolRenderer';
import CrochetMotionPlayer from './CrochetMotionPlayer';

const LEVEL5_BAG_SYMBOL_IDS = ['level5_bag'];

export default function Level5BagLessons({ onAddStars, onUnlockBadge }) {
  const bagSymbols = LEVEL5_BAG_SYMBOL_IDS.map((id) => CROCHET_SYMBOLS.find((s) => s.id === id)).filter(Boolean);
  const [selectedId, setSelectedId] = useState('level5_bag');
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [completedStitches, setCompletedStitches] = useState([]);

  const currentSymbol = bagSymbols.find((s) => s.id === selectedId) || bagSymbols[0];

  const handleSelectSymbol = (id) => {
    soundFx.playPop();
    setSelectedId(id);
    setIsFlipped(false);
    setActiveVideoIndex(0);
  };

  const handleComplete = (id) => {
    if (!completedStitches.includes(id)) {
      soundFx.playSuccess();
      const updated = [...completedStitches, id];
      setCompletedStitches(updated);
      onAddStars(30);

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });

      if (updated.length === bagSymbols.length) {
        onUnlockBadge('level5_bag_master');
      }
    }
  };

  const displaySymbol = {
    ...currentSymbol,
    videoUrl: currentSymbol.videoUrl
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-purple-600 to-pink-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 opacity-20 transform rotate-12">
          <ShoppingBag className="w-48 h-48 text-white" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            Lớp Học Kỹ Thuật Chuyên Sâu Level 5
          </div>
          <h2 className="text-2xl sm:text-4xl font-black mb-2 tracking-tight">
            Level 5: Móc Túi & Phụ Kiện (Crochet Bag) 👜
          </h2>
          <p className="text-amber-100 font-semibold text-sm sm:text-base leading-relaxed">
            Bé hãy khám phá video lý thuyết kỹ thuật móc túi xách handmade thời trang: Khởi tạo đáy túi, móc tạo dáng thân túi đứng phom và hoàn thiện quai túi thời trang cực kỳ xinh xắn nhé!
          </p>
        </div>

        {/* Progress Card */}
        <div className="mt-6 sm:mt-0 sm:absolute sm:top-8 sm:right-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center min-w-[150px]">
          <span className="text-xs font-extrabold uppercase text-amber-200 block mb-1">Tiến Trình Level 5</span>
          <span className="text-2xl font-black text-white">
            {completedStitches.length} / {bagSymbols.length} Bài
          </span>
          <div className="w-full bg-white/20 h-2.5 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-yellow-300 h-full rounded-full transition-all duration-500"
              style={{ width: `${(completedStitches.length / bagSymbols.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Lesson Selection Tab */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {bagSymbols.map((item) => {
          const isSelected = item.id === selectedId;
          const isDone = completedStitches.includes(item.id);

          return (
            <button
              key={item.id}
              onClick={() => handleSelectSymbol(item.id)}
              className={`flex items-center gap-3.5 p-4 rounded-2xl border-2 text-left transition-all duration-300 transform hover:-translate-y-1 ${
                isSelected
                  ? 'bg-gradient-to-r from-amber-500 to-purple-600 border-amber-400 text-white shadow-lg shadow-purple-500/25 scale-[1.02]'
                  : isDone
                  ? 'bg-amber-50/70 border-amber-200 text-slate-700 hover:bg-amber-100/50'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300 shadow-sm'
              }`}
            >
              <div className={`p-2.5 rounded-xl flex-shrink-0 ${
                isSelected ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-700'
              }`}>
                <SymbolRenderer type={item.svgType} className="w-8 h-8" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm truncate">{item.abbr}</h3>
                  {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-100 flex-shrink-0" />}
                </div>
                <p className={`text-xs truncate font-medium ${isSelected ? 'text-amber-100' : 'text-slate-500'}`}>
                  {item.nameVi}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Content Layout: Left Video, Right Flashcard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: Interactive Video Player */}
        <div className="bg-white p-5 rounded-3xl border-2 border-amber-200 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-amber-100 pb-3">
            <div className="flex items-center gap-2 text-amber-800 font-black text-sm">
              <Film className="w-4 h-4 text-amber-600" />
              <span>Video Bài Học Lý Thuyết Móc Túi</span>
            </div>
            <span className="text-xs font-black bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
              Thưởng: +30 ⭐
            </span>
          </div>

          {/* Video Motion Player */}
          <CrochetMotionPlayer symbol={displaySymbol} showSymbolOverlay={true} className="w-full" />

          <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 text-slate-700 space-y-1">
            <h4 className="font-extrabold text-sm text-amber-900 flex items-center gap-2">
              💡 Thao tác căn bản móc túi xách:
            </h4>
            <p className="text-xs leading-relaxed font-semibold text-amber-800">
              {currentSymbol.description}
            </p>
          </div>
        </div>

        {/* Right Column: Interactive 3D Flashcard */}
        <div className="bg-white p-5 rounded-3xl border-2 border-purple-200 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-purple-100 pb-3">
            <div className="flex items-center gap-2 text-purple-900 font-black text-sm">
              <Layers className="w-4 h-4 text-purple-600" />
              <span>Thẻ Flashcard Level 5 (Móc Túi)</span>
            </div>
            <span className="text-xs font-bold text-slate-400">💡 Bấm vào thẻ để lật</span>
          </div>

          <div 
            onClick={() => {
              soundFx.playPop();
              setIsFlipped(!isFlipped);
            }}
            className="perspective-1000 cursor-pointer h-72 w-full"
          >
            <div className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}>
              {/* Front of Flashcard */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl border-4 border-dashed border-amber-300 p-6 flex flex-col items-center justify-center text-center backface-hidden shadow-inner">
                <div className="w-24 h-24 mb-4 p-3 bg-white rounded-2xl shadow-md flex items-center justify-center">
                  <SymbolRenderer type={currentSymbol.svgType} className="w-full h-full text-amber-600" />
                </div>
                <p className="text-xs font-bold text-slate-400 mt-2">
                  (Bấm vào đây để lật xem tên bài học & chi tiết)
                </p>
              </div>

              {/* Back of Flashcard */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-purple-600 text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center rotate-y-180 backface-hidden shadow-lg">
                <span className="text-xs font-black uppercase text-amber-200 tracking-wider mb-2">
                  {currentSymbol.category}
                </span>
                <h3 className="text-xl font-black mb-1">{currentSymbol.nameVi}</h3>
                <p className="text-xs text-amber-100 font-medium italic mb-4">{currentSymbol.nameEn}</p>
                <p className="text-xs leading-relaxed font-semibold bg-black/20 p-3 rounded-xl border border-white/10">
                  {currentSymbol.description}
                </p>
              </div>
            </div>
          </div>

          {/* Mark Complete Button */}
          <button
            onClick={() => handleComplete(currentSymbol.id)}
            disabled={completedStitches.includes(currentSymbol.id)}
            className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
              completedStitches.includes(currentSymbol.id)
                ? 'bg-emerald-500 text-white cursor-default shadow-none'
                : 'bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-white hover:shadow-lg transform active:scale-95'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            {completedStitches.includes(currentSymbol.id)
              ? 'Đã Hoàn Thành Bài Học'
              : 'Bấm Đánh Dấu Đã Học (+30 ⭐)'}
          </button>
        </div>
      </div>
    </div>
  );
}
