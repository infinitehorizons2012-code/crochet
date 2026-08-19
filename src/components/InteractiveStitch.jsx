import React, { useState } from 'react';
import { Sparkles, RotateCcw, Award, CheckCircle, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/sound';

export default function InteractiveStitch({ currentStitch, onAddStars, onUnlockBadge }) {
  const [stitchCount, setStitchCount] = useState(0);
  const [yarnColor, setYarnColor] = useState('#FF9EAA'); // Default pink yarn
  const [stitches, setStitches] = useState([]);

  const yarnColors = [
    { name: 'Hồng Dâu', code: '#FF9EAA', border: '#FF70A6' },
    { name: 'Xanh Bạc Hà', code: '#A2E9C1', border: '#57CC99' },
    { name: 'Vàng Nắng', code: '#FFDE59', border: '#FFC300' },
    { name: 'Tím Thơ Mộng', code: '#C3ACD0', border: '#9B72CF' },
    { name: 'Xanh Biển Nông', code: '#7FD8BE', border: '#38A3A5' },
    { name: 'Cam Đào', code: '#FF9F1C', border: '#E76F51' },
  ];

  const handleCrochetClick = () => {
    soundFx.playStitch();
    const newCount = stitchCount + 1;
    setStitchCount(newCount);
    
    setStitches((prev) => [
      ...prev,
      { id: Date.now(), color: yarnColor, index: newCount }
    ]);

    // Give 1 star every 5 stitches
    if (newCount % 5 === 0) {
      onAddStars(5);
    }

    // Milestones confetti & badge unlock
    if (newCount === 10 || newCount === 25 || newCount === 50) {
      soundFx.playSuccess();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      if (newCount >= 20) {
        onUnlockBadge('chain_master');
      }
    }
  };

  const handleReset = () => {
    soundFx.playPop();
    setStitchCount(0);
    setStitches([]);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border-4 border-amber-200 shadow-xl space-y-6">
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-amber-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🪄</span>
            <h3 className="font-extrabold text-2xl text-slate-800">
              Góc Tập Móc Tương Tác
            </h3>
          </div>
          <p className="text-sm font-bold text-slate-500">
            Bấm vào nút dưới đây để thử tự tay "móc" từng nấc len trên màn hình!
          </p>
        </div>

        {/* Color Palette Selector */}
        <div className="flex items-center gap-2 bg-amber-50 p-2 rounded-2xl border border-amber-200">
          <span className="text-xs font-black text-amber-800 pl-1">Chọn cuộn len:</span>
          <div className="flex gap-1.5">
            {yarnColors.map((c) => (
              <button
                key={c.code}
                onClick={() => {
                  soundFx.playPop();
                  setYarnColor(c.code);
                }}
                style={{ backgroundColor: c.code, borderColor: c.border }}
                className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-125 ${
                  yarnColor === c.code ? 'ring-2 ring-offset-2 ring-pink-400 scale-110' : ''
                }`}
                title={c.name}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Visual Crochet Chain Simulator Display */}
      <div className="min-h-[160px] bg-slate-50 border-4 border-dashed border-amber-200 rounded-3xl p-6 flex flex-wrap items-center gap-2 justify-center relative overflow-hidden">
        {stitches.length === 0 ? (
          <div className="text-center text-slate-400 font-bold space-y-2">
            <div className="text-5xl animate-bounce-slow">🧶</div>
            <p>Chưa có mũi móc nào! Bấm nút bên dưới để bắt đầu móc dây len nhé!</p>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-full">
            {stitches.map((st, idx) => (
              <div
                key={st.id}
                style={{ backgroundColor: st.color }}
                className="w-9 h-12 rounded-full border-2 border-slate-700/20 shadow-md flex items-center justify-center text-xs font-black text-white transform -rotate-12 animate-popIn hover:scale-125 transition-transform"
                title={`Mũi số ${idx + 1}`}
              >
                ∞
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Controls & Counter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2.5 rounded-2xl font-black text-lg shadow-sm flex items-center gap-2">
            <Flame className="w-5 h-5 text-yellow-300 animate-bounce" />
            <span>{stitchCount} Mũi đã móc!</span>
          </div>

          {stitchCount >= 10 && (
            <div className="bg-emerald-100 border border-emerald-300 text-emerald-800 px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Bé đã làm rất tốt! ✨
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleCrochetClick}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white font-black text-lg px-8 py-3.5 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all border-2 border-white"
          >
            <Sparkles className="w-5 h-5 text-yellow-200" />
            MÓC 1 MŨI! 🧶
          </button>

          {stitchCount > 0 && (
            <button
              onClick={handleReset}
              className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-300 transition-colors"
              title="Làm lại từ đầu"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
