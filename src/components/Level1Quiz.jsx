import React, { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Sparkles, Star, Award, RotateCcw, ArrowRight, BookOpen, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/sound';
import { CROCHET_SYMBOLS } from '../data/crochetSymbols';
import SymbolRenderer from './SymbolRenderer';

const LEVEL1_SYMBOL_IDS = ['begin', 'ch', 'sl_st', 'sc', 'hdc', 'dc', 'tr', 'dc2tog'];

export default function Level1Quiz({ onAddStars, onUnlockBadge }) {
  const level1Symbols = LEVEL1_SYMBOL_IDS.map((id) => CROCHET_SYMBOLS.find((s) => s.id === id)).filter(Boolean);

  const [mode, setMode] = useState('symbol_to_name'); // 'symbol_to_name' (Cho Hình ➔ Chọn Tên) | 'name_to_symbol' (Cho Tên ➔ Chọn Hình)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  // Generate question options
  const targetSymbol = level1Symbols[currentQuestionIndex % level1Symbols.length];

  const generateOptions = () => {
    const wrongPool = level1Symbols.filter((s) => s.id !== targetSymbol.id);
    const shuffledWrong = [...wrongPool].sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [...shuffledWrong, targetSymbol].sort(() => 0.5 - Math.random());
    return options;
  };

  const [options, setOptions] = useState(generateOptions);

  useEffect(() => {
    setOptions(generateOptions());
    setSelectedAnswer(null);
    setIsCorrect(null);
  }, [currentQuestionIndex, mode]);

  const handleAnswerSelect = (option) => {
    if (selectedAnswer !== null) return; // Prevent double clicking

    setSelectedAnswer(option.id);
    const correct = option.id === targetSymbol.id;
    setIsCorrect(correct);

    if (correct) {
      soundFx.playCorrect();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
      setScore((prev) => prev + 10);
      setStreak((prev) => prev + 1);
      onAddStars(5);

      if (streak + 1 >= 5) {
        onUnlockBadge('chart_reader_l1');
      }
    } else {
      soundFx.playWrong();
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    soundFx.playPop();
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Quiz Banner */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-400 to-amber-400 p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-white">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black">
            <Sparkles className="w-4 h-4 text-amber-200" />
            Luyện Đọc Chart Level 1
          </div>
          <h2 className="text-3xl sm:text-4xl font-black">
            Trắc Nghiệm Nhận Diện Ký Hiệu 🎯
          </h2>
          <p className="text-sm sm:text-base font-bold text-pink-50 max-w-xl">
            Rèn luyện kỹ năng đọc bản vẽ chart móc len cho bé qua 8 ký hiệu căn bản Level 1!
          </p>
        </div>

        {/* Scoreboard */}
        <div className="flex items-center gap-3">
          <div className="bg-white/90 backdrop-blur-md text-slate-800 px-4 py-3 rounded-2xl border-2 border-white shadow-md text-center min-w-[100px]">
            <span className="block text-[11px] font-black text-slate-500 uppercase">Điểm Số</span>
            <span className="text-2xl font-black text-purple-600">{score} pt</span>
          </div>

          <div className="bg-white/90 backdrop-blur-md text-slate-800 px-4 py-3 rounded-2xl border-2 border-white shadow-md text-center min-w-[100px]">
            <span className="block text-[11px] font-black text-slate-500 uppercase">Chuỗi Đúng</span>
            <span className="text-2xl font-black text-amber-500 flex items-center justify-center gap-1">
              {streak} 🔥
            </span>
          </div>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 bg-white p-2 rounded-2xl border-2 border-pink-100 shadow-sm max-w-xl mx-auto">
        <button
          onClick={() => {
            soundFx.playPop();
            setMode('symbol_to_name');
            setCurrentQuestionIndex(0);
          }}
          className={`px-5 py-2.5 rounded-xl font-black text-xs transition-all flex items-center gap-2 ${
            mode === 'symbol_to_name'
              ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md scale-105'
              : 'text-slate-600 hover:bg-pink-50'
          }`}
        >
          🖼️ Dạng 1: Cho Hình ➔ Đoán Tên Chart
        </button>

        <button
          onClick={() => {
            soundFx.playPop();
            setMode('name_to_symbol');
            setCurrentQuestionIndex(0);
          }}
          className={`px-5 py-2.5 rounded-xl font-black text-xs transition-all flex items-center gap-2 ${
            mode === 'name_to_symbol'
              ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md scale-105'
              : 'text-slate-600 hover:bg-pink-50'
          }`}
        >
          ✍️ Dạng 2: Cho Tên ➔ Đoán Hình Ký Hiệu
        </button>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl border-4 border-pink-200 p-8 shadow-2xl space-y-8 text-center max-w-3xl mx-auto relative overflow-hidden">
        
        {/* DẠNG 1: CHO HÌNH KÝ HIỆU ➔ HỎI TÊN / VIẾT TẮT */}
        {mode === 'symbol_to_name' && (
          <div className="space-y-6">
            <span className="text-xs font-black bg-pink-100 text-pink-700 px-4 py-1.5 rounded-full border border-pink-200 inline-block">
              Câu Hỏi {currentQuestionIndex + 1}: Ký hiệu này trên bản vẽ chart tên là gì?
            </span>

            {/* Symbol Graphic Box */}
            <div className="w-48 h-48 bg-gradient-to-tr from-amber-50 to-pink-50 rounded-3xl border-4 border-amber-300 shadow-inner mx-auto flex items-center justify-center p-4">
              <SymbolRenderer type={targetSymbol.svgType} className="w-36 h-36" strokeColor="#0F172A" />
            </div>

            {/* Options List (Text Options) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {options.map((option, idx) => {
                const isSelected = selectedAnswer === option.id;
                const isAnswerCorrect = option.id === targetSymbol.id;

                let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:border-pink-300 hover:bg-pink-50/60';
                if (selectedAnswer !== null) {
                  if (isAnswerCorrect) {
                    btnStyle = 'bg-emerald-500 text-white border-emerald-500 shadow-lg font-black';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-500 text-white border-rose-500 shadow-lg font-black';
                  } else {
                    btnStyle = 'bg-slate-50 border-slate-100 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={selectedAnswer !== null}
                    className={`p-4 rounded-2xl border-4 text-left transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                  >
                    <div>
                      <span className="block font-black text-base">{option.nameVi}</span>
                      <span className="block text-xs font-extrabold opacity-80">{option.nameEn} ({option.abbr})</span>
                    </div>
                    {selectedAnswer !== null && isAnswerCorrect && <CheckCircle2 className="w-6 h-6 text-white shrink-0" />}
                    {selectedAnswer !== null && isSelected && !isAnswerCorrect && <XCircle className="w-6 h-6 text-white shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* DẠNG 2: CHO TÊN ➔ HỎI HÌNH KÝ HIỆU CHART */}
        {mode === 'name_to_symbol' && (
          <div className="space-y-6">
            <span className="text-xs font-black bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full border border-purple-200 inline-block">
              Câu Hỏi {currentQuestionIndex + 1}: Ký hiệu chart nào đại diện cho mũi này?
            </span>

            {/* Target Name Header */}
            <div className="bg-gradient-to-tr from-pink-500 to-purple-600 text-white p-6 rounded-3xl shadow-md max-w-md mx-auto space-y-1">
              <span className="text-xs font-black text-amber-300 uppercase tracking-wide">Mũi Móc Len:</span>
              <h3 className="text-2xl font-black">{targetSymbol.nameVi}</h3>
              <p className="text-sm font-extrabold text-pink-100">{targetSymbol.nameEn} ({targetSymbol.abbr})</p>
            </div>

            {/* Options List (4 Symbol Cards) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {options.map((option) => {
                const isSelected = selectedAnswer === option.id;
                const isAnswerCorrect = option.id === targetSymbol.id;

                let cardStyle = 'bg-white border-pink-100 hover:border-pink-300 hover:bg-pink-50/50';
                if (selectedAnswer !== null) {
                  if (isAnswerCorrect) {
                    cardStyle = 'bg-emerald-500 text-white border-emerald-500 shadow-xl scale-105';
                  } else if (isSelected) {
                    cardStyle = 'bg-rose-500 text-white border-rose-500 shadow-xl scale-105';
                  } else {
                    cardStyle = 'bg-slate-50 border-slate-100 opacity-40';
                  }
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={selectedAnswer !== null}
                    className={`p-4 rounded-3xl border-4 transition-all flex flex-col items-center justify-center gap-3 relative min-h-[140px] ${cardStyle}`}
                  >
                    <div className="w-20 h-20 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-center p-2 shadow-inner">
                      <SymbolRenderer type={option.svgType} className="w-16 h-16" strokeColor="#0F172A" />
                    </div>

                    {selectedAnswer !== null && isAnswerCorrect && (
                      <span className="absolute top-2 right-2 bg-white text-emerald-600 rounded-full p-1 shadow-md">
                        <CheckCircle2 className="w-5 h-5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Feedback Banner & Next Question Button */}
        {selectedAnswer !== null && (
          <div className="pt-4 animate-popIn space-y-4 border-t border-pink-100">
            {isCorrect ? (
              <div className="bg-emerald-100 border-2 border-emerald-300 text-emerald-900 p-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                Chính xác rồi bé ơi! Bé vừa nhận +5 ⭐ và +10 Điểm! 🎉
              </div>
            ) : (
              <div className="bg-rose-100 border-2 border-rose-300 text-rose-900 p-4 rounded-2xl font-black text-sm">
                Ối! Chưa đúng rồi. Đáp án đúng là <strong>{targetSymbol.nameVi} ({targetSymbol.abbr})</strong> bé nhé! 💕
              </div>
            )}

            <button
              onClick={handleNextQuestion}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-black text-base shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              Tiếp Tục Câu Tiếp Theo ➔
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
