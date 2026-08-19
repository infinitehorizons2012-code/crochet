import React, { useState } from 'react';
import { BookOpen, CheckCircle, Sparkles, ChevronRight, ChevronLeft, Lightbulb, Play, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/sound';
import InteractiveStitch from './InteractiveStitch';

export default function StitchWorkshop({ onAddStars, onUnlockBadge }) {
  const [selectedStitchIndex, setSelectedStitchIndex] = useState(0);
  const [completedStitches, setCompletedStitches] = useState([]);

  const stitchesData = [
    {
      id: 'slip_knot',
      badgeId: 'slip_knot_master',
      title: '1. Nút Thắt Kỳ Diệu (Slip Knot)',
      symbol: '●',
      icon: '🪢',
      color: 'from-pink-400 to-rose-400',
      difficulty: 'Rất Dễ',
      stars: 10,
      summary: 'Bước khởi đầu quan trọng nhất để cố định cuộn len vào kim móc!',
      story: 'Tưởng tượng bé tạo một cái tai thỏ từ sợi len, sau đó kéo cuộn len chui qua tai thỏ để thành một nút thắt có thể co giãn!',
      steps: [
        'Tạo một vòng tròn nhỏ bằng sợi len (tai thỏ).',
        'Luồn ngón tay hoặc kim móc qua vòng tròn và nắm lấy sợi len dài.',
        'Kéo nhẹ sợi len dài qua vòng tròn để tạo thành một nút thắt.',
        'Rút nhẹ hai đầu dây để nút thắt ôm vừa vặn thân kim móc (không siết quá chặt nhé!).'
      ],
      tip: 'Mẹo nhỏ: Nút thắt chuẩn là khi bé có thể dễ dàng trượt kim móc qua lại mà không bị kẹt!'
    },
    {
      id: 'chain_stitch',
      badgeId: 'chain_master',
      title: '2. Mũi Bính (Chain Stitch - ch)',
      symbol: 'ch',
      icon: '📿',
      color: 'from-amber-400 to-yellow-500',
      difficulty: 'Dễ',
      stars: 15,
      summary: 'Tạo thành một chuỗi xích dài xinh xắn - nền tảng của mọi sản phẩm móc len.',
      story: 'Giống như bé đang thắt một chuỗi hạt vòng đeo tay rực rỡ sắc màu!',
      steps: [
        'Cầm kim móc có sẵn Nút Thắt Kỳ Diệu trên tay phải, tay trái cầm sợi len.',
        'Vòng kim móc dưới sợi len từ sau ra trước (gọi là "Vắt len" - Yarn Over).',
        'Dùng đầu móc xoay nhẹ và kéo sợi len mới chui qua vòng len cũ trên kim.',
        'Thế là bé vừa hoàn thành 1 Mũi Bính rồi! Lặp lại để chuỗi xích dài ra nhé.'
      ],
      tip: 'Mẹo nhỏ: Giữ lực kéo tay trái đều đặn để các mắt xích có kích thước bằng nhau!'
    },
    {
      id: 'single_crochet',
      badgeId: 'single_crochet_master',
      title: '3. Mũi Đơn (Single Crochet - sc)',
      symbol: 'sc / X / +',
      icon: '🧱',
      color: 'from-emerald-400 to-teal-500',
      difficulty: 'Dễ',
      stars: 15,
      summary: 'Mũi móc khép kín, chắc chắn dùng để tạo hình thú bông (Amigurumi).',
      story: 'Mỗi mũi đơn giống như một viên gạch nhỏ xếp chồng lên nhau để xây ngôi nhà len!',
      steps: [
        'Đâm đầu kim móc vào chân mũi bính bên dưới.',
        'Vắt len trên kim và kéo sợi len qua chân mũi đó (trên kim lúc này có 2 vòng len).',
        'Vắt len thêm một lần nữa.',
        'Kéo sợi len chui qua cả 2 vòng len cùng một lúc. Xong 1 Mũi Đơn!'
      ],
      tip: 'Mẹo nhỏ: Đây là mũi móc quan trọng nhất để làm chú sứa và gấu bông đó bé ơi!'
    },
    {
      id: 'double_crochet',
      badgeId: 'double_crochet_master',
      title: '4. Mũi Kép (Double Crochet - dc)',
      symbol: 'dc / T',
      icon: '🌻',
      color: 'from-purple-400 to-indigo-500',
      difficulty: 'Trung Bình',
      stars: 20,
      summary: 'Mũi móc cao gấp đôi mũi đơn, làm cánh hoa và váy búp bơi cực nhanh!',
      story: 'Như một chú thỏ nhảy vọt cao hai nấc để hái bông hoa ngặt ngào sắc màu!',
      steps: [
        'Vắt len quanh kim trước 1 vòng (trên kim có sẵn 2 vòng len).',
        'Đâm kim vào chân mũi bên dưới, vắt len và kéo qua (trên kim có 3 vòng len).',
        'Vắt len, kéo chui qua 2 vòng len đầu tiên (trên kim còn 2 vòng).',
        'Vắt len lần nữa, kéo chui qua 2 vòng len còn lại. Thần kỳ chưa, mũi móc đã cao lớn rồi!'
      ],
      tip: 'Mẹo nhỏ: Mũi kép rất thích hợp để làm cánh hoa hướng dương mềm mại!'
    },
    {
      id: 'magic_ring',
      badgeId: 'magic_ring_master',
      title: '5. Vòng Tròn Ma Thuật (Magic Ring - MR)',
      symbol: 'MR',
      icon: '🪄',
      color: 'from-pink-500 to-purple-600',
      difficulty: 'Trung Bình',
      stars: 25,
      summary: 'Bí thuật móc hình tròn không hề có lỗ hổng ở giữa!',
      story: 'Phép thuật rút dây thần kỳ khiến chiếc lỗ tròn biến mất hoàn toàn!',
      steps: [
        'Quấn sợi len thành một vòng tròn kép quanh 2 ngón tay.',
        'Luồn kim móc vào trong vòng tròn, kéo sợi len dài ra tạo thành 1 mũi bính.',
        'Móc các mũi đơn (sc) trực tiếp bao quanh vòng tròn len đó (thường là 6 mũi).',
        'Nắm lấy đầu dây len ngắn và RÚT CHẶT! Vòng tròn sẽ khép kín lại kỳ diệu!'
      ],
      tip: 'Mẹo nhỏ: Đừng ngần ngại rút thật mạnh tay dây len ngắn để cái lỗ ở giữa biến mất nhé!'
    }
  ];

  const currentStitch = stitchesData[selectedStitchIndex];

  const handleCompleteLesson = (stitch) => {
    if (!completedStitches.includes(stitch.id)) {
      soundFx.playSuccess();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
      setCompletedStitches([...completedStitches, stitch.id]);
      onAddStars(stitch.stars);
      if (stitch.badgeId) {
        onUnlockBadge(stitch.badgeId);
      }
    } else {
      soundFx.playPop();
    }
  };

  return (
    <div id="stitch-workshop" className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 scroll-mt-24">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-amber-300 p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-white">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black">
            <BookOpen className="w-4 h-4 text-amber-200" />
            Lớp Học Tập Sự Dành Cho Bé
          </div>
          <h2 className="text-3xl sm:text-4xl font-black">
            5 Mũi Móc Len Cơ Bản Kỳ Diệu 🧶
          </h2>
          <p className="text-sm sm:text-base font-bold text-pink-100 max-w-xl">
            Hãy chọn từng bài học bên dưới, đọc hướng dẫn siêu dễ và hoàn thành để nhận ngay Sao Thưởng ⭐ nhé!
          </p>
        </div>

        {/* Lesson Progress Counter */}
        <div className="bg-white/90 backdrop-blur-md text-slate-800 p-4 rounded-2xl border-2 border-white shadow-md text-center min-w-[180px]">
          <span className="block text-xs font-black text-slate-500">Tiến Trình Học</span>
          <span className="text-2xl font-black text-pink-600">
            {completedStitches.length} / {stitchesData.length} Bài
          </span>
          <div className="w-full bg-slate-100 h-2.5 rounded-full mt-2 overflow-hidden border border-slate-200">
            <div 
              className="bg-gradient-to-r from-pink-500 to-amber-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${(completedStitches.length / stitchesData.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Lesson Selector Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {stitchesData.map((stitch, idx) => {
          const isSelected = selectedStitchIndex === idx;
          const isDone = completedStitches.includes(stitch.id);

          return (
            <button
              key={stitch.id}
              onClick={() => {
                soundFx.playPop();
                setSelectedStitchIndex(idx);
              }}
              className={`relative p-4 rounded-2xl font-extrabold text-left transition-all duration-200 border-2 flex flex-col justify-between h-28 ${
                isSelected
                  ? 'bg-white border-pink-400 shadow-lg scale-105 ring-4 ring-pink-100'
                  : 'bg-white/80 border-slate-200 hover:border-pink-200 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-3xl">{stitch.icon}</span>
                {isDone ? (
                  <CheckCircle className="w-5 h-5 text-emerald-500 fill-emerald-100" />
                ) : (
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-black">
                    +{stitch.stars} ⭐
                  </span>
                )}
              </div>

              <div>
                <span className="block text-xs font-black text-slate-400">
                  {stitch.symbol}
                </span>
                <span className="block text-sm font-black text-slate-800 line-clamp-1">
                  {stitch.title.split('.')[1]}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Active Lesson Card */}
      <div className="bg-white rounded-3xl border-4 border-pink-200 shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Lesson Title & Difficulty */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-pink-100 pb-4">
          <div className="flex items-center gap-3">
            <div className={`w-14 h-14 bg-gradient-to-tr ${currentStitch.color} text-white rounded-2xl flex items-center justify-center text-3xl shadow-md`}>
              {currentStitch.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-black text-slate-800">
                  {currentStitch.title}
                </h3>
                <span className="bg-pink-100 text-pink-700 text-xs font-black px-2.5 py-1 rounded-full border border-pink-200">
                  Ký hiệu: {currentStitch.symbol}
                </span>
              </div>
              <p className="text-sm font-bold text-slate-500 mt-0.5">
                {currentStitch.summary}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-amber-100 text-amber-800 font-extrabold text-xs px-3 py-1.5 rounded-xl border border-amber-200">
              Độ khó: {currentStitch.difficulty}
            </span>
            <span className="bg-purple-100 text-purple-800 font-black text-xs px-3 py-1.5 rounded-xl border border-purple-200">
              Thưởng: +{currentStitch.stars} ⭐
            </span>
          </div>
        </div>

        {/* Story Illustration Box */}
        <div className="bg-gradient-to-r from-amber-50 to-pink-50 border-2 border-amber-200 p-4 rounded-2xl flex items-start gap-3">
          <Lightbulb className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <span className="block font-black text-xs text-amber-800 uppercase tracking-wider">
              Tưởng tượng kỳ diệu dành cho bé:
            </span>
            <p className="text-sm font-extrabold text-slate-700 mt-0.5">
              "{currentStitch.story}"
            </p>
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="space-y-4">
          <h4 className="font-extrabold text-lg text-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-500" />
            Các Bước Thực Hành Chi Tiết:
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentStitch.steps.map((step, idx) => (
              <div 
                key={idx}
                className="bg-slate-50 border-2 border-slate-200 hover:border-pink-300 p-4 rounded-2xl flex items-start gap-3 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                  {idx + 1}
                </div>
                <p className="text-sm font-bold text-slate-700 leading-relaxed pt-1">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tip Banner */}
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-emerald-800 text-sm font-extrabold flex items-center gap-2">
          <span>💡 {currentStitch.tip}</span>
        </div>

        {/* Complete Lesson Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-pink-100">
          
          <div className="flex items-center gap-2">
            <button
              disabled={selectedStitchIndex === 0}
              onClick={() => {
                soundFx.playPop();
                setSelectedStitchIndex((prev) => prev - 1);
              }}
              className="p-3 rounded-2xl bg-slate-100 text-slate-600 hover:bg-pink-100 hover:text-pink-600 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-xs font-black text-slate-500">
              Bài {selectedStitchIndex + 1} / {stitchesData.length}
            </span>

            <button
              disabled={selectedStitchIndex === stitchesData.length - 1}
              onClick={() => {
                soundFx.playPop();
                setSelectedStitchIndex((prev) => prev + 1);
              }}
              className="p-3 rounded-2xl bg-slate-100 text-slate-600 hover:bg-pink-100 hover:text-pink-600 disabled:opacity-40 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={() => handleCompleteLesson(currentStitch)}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-base shadow-lg transition-all duration-200 ${
              completedStitches.includes(currentStitch.id)
                ? 'bg-emerald-500 text-white shadow-emerald-200 hover:bg-emerald-600'
                : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white hover:scale-105 active:scale-95'
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            {completedStitches.includes(currentStitch.id)
              ? 'Bé Đã Hoàn Thành Bài Học Này! 🎉'
              : `Bấm Để Hoàn Thành Bài (+${currentStitch.stars} ⭐)`}
          </button>
        </div>

      </div>

      {/* Interactive Hands-On Crochet Simulator Component */}
      <InteractiveStitch 
        currentStitch={currentStitch} 
        onAddStars={onAddStars} 
        onUnlockBadge={onUnlockBadge} 
      />

    </div>
  );
}
