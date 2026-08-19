import React, { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award, Sparkles, Star, ChevronRight, Layers, Shuffle, Trophy, Flame, Film, Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/sound';
import { CROCHET_SYMBOLS } from '../data/crochetSymbols';
import SymbolRenderer from './SymbolRenderer';
import CrochetMotionPlayer from './CrochetMotionPlayer';

export default function SymbolQuiz({ onAddStars, onUnlockBadge }) {
  const [activeSubMode, setActiveSubMode] = useState('quiz_symbol_to_name'); // 'flashcard', 'quiz_symbol_to_name', 'quiz_name_to_symbol'
  
  // Flashcard state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Quiz state
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  // Helper to generate a new quiz question
  const generateQuestion = (mode) => {
    setSelectedAnswer(null);
    setIsCorrect(null);

    const randomIndex = Math.floor(Math.random() * CROCHET_SYMBOLS.length);
    const targetSymbol = CROCHET_SYMBOLS[randomIndex];

    // Pick 3 random distractor options
    const distractors = CROCHET_SYMBOLS.filter((s) => s.id !== targetSymbol.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const allOptions = [targetSymbol, ...distractors].sort(() => 0.5 - Math.random());

    setCurrentQuestion(targetSymbol);
    setOptions(allOptions);
  };

  useEffect(() => {
    if (activeSubMode.startsWith('quiz')) {
      generateQuestion(activeSubMode);
    }
  }, [activeSubMode]);

  const handleSelectAnswer = (option) => {
    if (selectedAnswer !== null) return; // Prevent double click

    setSelectedAnswer(option.id);
    const correct = option.id === currentQuestion.id;
    setIsCorrect(correct);

    if (correct) {
      soundFx.playSuccess();
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
      const newScore = score + 10;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
      onAddStars(5);

      if (newStreak >= 5) {
        onUnlockBadge('quiz_master');
      }
    } else {
      soundFx.playPop();
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    soundFx.playPop();
    generateQuestion(activeSubMode);
  };

  // Flashcard controls
  const handleNextFlashcard = () => {
    soundFx.playPop();
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev + 1) % CROCHET_SYMBOLS.length);
  };

  const handlePrevFlashcard = () => {
    soundFx.playPop();
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev - 1 + CROCHET_SYMBOLS.length) % CROCHET_SYMBOLS.length);
  };

  const currentFlashcard = CROCHET_SYMBOLS[flashcardIndex];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-white">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black">
            <Trophy className="w-4 h-4 text-amber-300" />
            Đố Vui Trắc Nghiệm Dành Cho Bé
          </div>
          <h2 className="text-3xl sm:text-4xl font-black">
            Thử Tài Nhận Diện Ký Hiệu Móc Len 🎯
          </h2>
          <p className="text-sm sm:text-base font-bold text-pink-100 max-w-xl">
            Bé hãy xem hình đoán tên hoặc nhìn tên đoán hình ký hiệu để trở thành Bậc Thầy Ký Hiệu Móc Len nhé!
          </p>
        </div>

        {/* Score & Streak Stats */}
        <div className="flex items-center gap-3">
          <div className="bg-white/90 backdrop-blur-md text-slate-800 p-3.5 rounded-2xl border-2 border-white shadow-md text-center min-w-[110px]">
            <span className="block text-xs font-black text-slate-500">Điểm Đố Vui</span>
            <span className="text-2xl font-black text-pink-600">{score} pt</span>
          </div>
          <div className="bg-amber-100 text-amber-900 p-3.5 rounded-2xl border-2 border-amber-300 shadow-md text-center min-w-[110px]">
            <span className="block text-xs font-black text-amber-700 flex items-center justify-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Chuỗi Đúng
            </span>
            <span className="text-2xl font-black text-amber-600">{streak} 🔥</span>
          </div>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 bg-pink-50 p-2 rounded-2xl border-2 border-pink-100">
        <button
          onClick={() => {
            soundFx.playPop();
            setActiveSubMode('quiz_symbol_to_name');
          }}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-extrabold text-sm transition-all ${
            activeSubMode === 'quiz_symbol_to_name'
              ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md scale-105'
              : 'bg-white text-slate-700 hover:bg-pink-100'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          Dạng 1: Cho Hình ➔ Đoán Tên
        </button>

        <button
          onClick={() => {
            soundFx.playPop();
            setActiveSubMode('quiz_name_to_symbol');
          }}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-extrabold text-sm transition-all ${
            activeSubMode === 'quiz_name_to_symbol'
              ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md scale-105'
              : 'bg-white text-slate-700 hover:bg-pink-100'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Dạng 2: Cho Tên ➔ Đoán Hình
        </button>

        <button
          onClick={() => {
            soundFx.playPop();
            setActiveSubMode('quiz_video_to_name');
          }}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-extrabold text-sm transition-all ${
            activeSubMode === 'quiz_video_to_name'
              ? 'bg-gradient-to-r from-indigo-500 via-pink-500 to-rose-500 text-white shadow-md scale-105'
              : 'bg-white text-slate-700 hover:bg-pink-100'
          }`}
        >
          <Film className="w-4 h-4" />
          🎬 Dạng 3: Xem Video ➔ Đoán Tên
        </button>

        <button
          onClick={() => {
            soundFx.playPop();
            setActiveSubMode('flashcard');
          }}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-extrabold text-sm transition-all ${
            activeSubMode === 'flashcard'
              ? 'bg-gradient-to-r from-amber-400 to-pink-500 text-white shadow-md scale-105'
              : 'bg-white text-slate-700 hover:bg-pink-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          🎓 Luyện Tập Flashcard (24 Ký Hiệu)
        </button>
      </div>

      {/* QUIZ MODE 1: SYMBOL TO NAME */}
      {activeSubMode === 'quiz_symbol_to_name' && currentQuestion && (
        <div className="bg-white rounded-3xl border-4 border-pink-200 shadow-2xl p-6 sm:p-8 space-y-6 max-w-3xl mx-auto text-center">
          
          <div className="space-y-1">
            <span className="text-xs font-black bg-pink-100 text-pink-700 px-3 py-1 rounded-full border border-pink-200">
              Câu Hỏi Trắc Nghiệm (Dạng 1)
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800">
              Ký hiệu dưới đây là tên gọi của mũi móc nào?
            </h3>
          </div>

          {/* Target Symbol Render Card */}
          <div className="w-48 h-48 bg-amber-50 rounded-3xl border-4 border-amber-200 mx-auto flex items-center justify-center p-6 shadow-inner animate-popIn">
            <SymbolRenderer type={currentQuestion.svgType} className="w-32 h-32" strokeColor="#1E293B" />
          </div>

          {/* 4 Multiple Choice Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {options.map((option, idx) => {
              const isSelected = selectedAnswer === option.id;
              const isTarget = option.id === currentQuestion.id;

              let btnStyle = "bg-slate-50 border-slate-200 text-slate-800 hover:border-pink-300 hover:bg-pink-50/50";
              if (selectedAnswer !== null) {
                if (isTarget) {
                  btnStyle = "bg-emerald-500 text-white border-emerald-600 shadow-lg scale-102";
                } else if (isSelected) {
                  btnStyle = "bg-rose-500 text-white border-rose-600 animate-shake";
                } else {
                  btnStyle = "bg-slate-100 border-slate-200 opacity-50";
                }
              }

              return (
                <button
                  key={option.id}
                  disabled={selectedAnswer !== null}
                  onClick={() => handleSelectAnswer(option)}
                  className={`p-4 rounded-2xl border-4 font-black text-base flex items-center justify-between transition-all duration-200 ${btnStyle}`}
                >
                  <div className="flex items-center gap-3 text-left">
                    <span className="w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-xs font-black shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <div>
                      <span className="block font-black text-sm">{option.nameVi}</span>
                      <span className="block text-xs opacity-80">{option.nameEn} ({option.abbr})</span>
                    </div>
                  </div>

                  {selectedAnswer !== null && isTarget && <CheckCircle2 className="w-6 h-6 text-white" />}
                  {selectedAnswer !== null && isSelected && !isTarget && <XCircle className="w-6 h-6 text-white" />}
                </button>
              );
            })}
          </div>

          {/* Answer Feedback Banner & Next Button */}
          {selectedAnswer !== null && (
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 animate-popIn">
              <div className="text-left space-y-1">
                {isCorrect ? (
                  <div className="flex items-center gap-2 text-emerald-600 font-black text-lg">
                    <CheckCircle2 className="w-6 h-6" />
                    Chính Xác Giỏi Lắm Bé Ơi! (+5 ⭐)
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-rose-600 font-black text-lg">
                    <XCircle className="w-6 h-6" />
                    Chưa chính xác rồi! Đáp án đúng là: {currentQuestion.nameVi} ({currentQuestion.abbr})
                  </div>
                )}
                <p className="text-xs font-bold text-slate-500">{currentQuestion.description}</p>
              </div>

              <button
                onClick={handleNextQuestion}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black text-base shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 shrink-0"
              >
                Câu Tiếp Theo
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

        </div>
      )}

      {/* QUIZ MODE 2: NAME TO SYMBOL */}
      {activeSubMode === 'quiz_name_to_symbol' && currentQuestion && (
        <div className="bg-white rounded-3xl border-4 border-purple-200 shadow-2xl p-6 sm:p-8 space-y-6 max-w-3xl mx-auto text-center">
          
          <div className="space-y-2">
            <span className="text-xs font-black bg-purple-100 text-purple-700 px-3 py-1 rounded-full border border-purple-200">
              Câu Hỏi Trắc Nghiệm (Dạng 2)
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800">
              Đâu là ký hiệu của <span className="text-purple-600">{currentQuestion.nameVi} ({currentQuestion.abbr})</span>?
            </h3>
            <p className="text-xs font-bold text-slate-500">{currentQuestion.nameEn}</p>
          </div>

          {/* 4 Symbol Graphic Cards */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            {options.map((option, idx) => {
              const isSelected = selectedAnswer === option.id;
              const isTarget = option.id === currentQuestion.id;

              let cardStyle = "bg-amber-50/50 border-amber-200 hover:border-purple-400 hover:bg-amber-100/50";
              if (selectedAnswer !== null) {
                if (isTarget) {
                  cardStyle = "bg-emerald-100 border-emerald-500 ring-4 ring-emerald-200 scale-105";
                } else if (isSelected) {
                  cardStyle = "bg-rose-100 border-rose-500 opacity-60";
                } else {
                  cardStyle = "bg-slate-50 border-slate-200 opacity-40";
                }
              }

              return (
                <button
                  key={option.id}
                  disabled={selectedAnswer !== null}
                  onClick={() => handleSelectAnswer(option)}
                  className={`p-6 rounded-3xl border-4 flex flex-col items-center justify-center gap-3 transition-all duration-200 relative ${cardStyle}`}
                >
                  <span className="absolute top-3 left-3 w-7 h-7 rounded-full bg-white border border-slate-300 font-black text-xs text-slate-700 flex items-center justify-center">
                    {String.fromCharCode(65 + idx)}
                  </span>

                  <SymbolRenderer type={option.svgType} className="w-24 h-24 my-2" strokeColor="#0F172A" />

                  {selectedAnswer !== null && isTarget && (
                    <span className="text-xs font-black bg-emerald-500 text-white px-3 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Đúng Rồi!
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer Feedback Banner */}
          {selectedAnswer !== null && (
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 animate-popIn">
              <div className="text-left space-y-1">
                {isCorrect ? (
                  <div className="flex items-center gap-2 text-emerald-600 font-black text-lg">
                    <CheckCircle2 className="w-6 h-6" />
                    Tuyệt Vời Đúng Rồi Bé Ơi! (+5 ⭐)
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-rose-600 font-black text-lg">
                    <XCircle className="w-6 h-6" />
                    Chưa đúng rồi! Bé xem hình đáp án đúng khoanh xanh nhé.
                  </div>
                )}
                <p className="text-xs font-bold text-slate-500">{currentQuestion.description}</p>
              </div>

              <button
                onClick={handleNextQuestion}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-black text-base shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 shrink-0"
              >
                Câu Tiếp Theo
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

        </div>
      )}

      {/* QUIZ MODE 3: VIDEO MOTION TO NAME */}
      {activeSubMode === 'quiz_video_to_name' && currentQuestion && (
        <div className="bg-white rounded-3xl border-4 border-indigo-200 shadow-2xl p-6 sm:p-8 space-y-6 max-w-3xl mx-auto text-center">
          
          <div className="space-y-1">
            <span className="text-xs font-black bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full border border-indigo-200">
              🎬 Trắc Nghiệm Video & Chuyển Động (Dạng 3)
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800">
              Xem chuyển động ngắn và đoán xem đây là thao tác móc của mũi nào?
            </h3>
          </div>

          {/* Video / Motion Player */}
          <div className="max-w-xl mx-auto">
            <CrochetMotionPlayer symbol={currentQuestion} showSymbolOverlay={false} className="w-full" />
          </div>

          {/* 4 Multiple Choice Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {options.map((option, idx) => {
              const isSelected = selectedAnswer === option.id;
              const isTarget = option.id === currentQuestion.id;

              let btnStyle = "bg-slate-50 border-slate-200 text-slate-800 hover:border-indigo-300 hover:bg-indigo-50/50";
              if (selectedAnswer !== null) {
                if (isTarget) {
                  btnStyle = "bg-emerald-500 text-white border-emerald-600 shadow-lg scale-102";
                } else if (isSelected) {
                  btnStyle = "bg-rose-500 text-white border-rose-600 animate-shake";
                } else {
                  btnStyle = "bg-slate-100 border-slate-200 opacity-50";
                }
              }

              return (
                <button
                  key={option.id}
                  disabled={selectedAnswer !== null}
                  onClick={() => handleSelectAnswer(option)}
                  className={`p-4 rounded-2xl border-4 font-black text-base flex items-center justify-between transition-all duration-200 ${btnStyle}`}
                >
                  <div className="flex items-center gap-3 text-left">
                    <span className="w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-xs font-black shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <div>
                      <span className="block font-black text-sm">{option.nameVi}</span>
                      <span className="block text-xs opacity-80">{option.nameEn} ({option.abbr})</span>
                    </div>
                  </div>

                  {selectedAnswer !== null && isTarget && <CheckCircle2 className="w-6 h-6 text-white" />}
                  {selectedAnswer !== null && isSelected && !isTarget && <XCircle className="w-6 h-6 text-white" />}
                </button>
              );
            })}
          </div>

          {/* Answer Feedback Banner & Next Button */}
          {selectedAnswer !== null && (
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 animate-popIn">
              <div className="text-left space-y-1">
                {isCorrect ? (
                  <div className="flex items-center gap-2 text-emerald-600 font-black text-lg">
                    <CheckCircle2 className="w-6 h-6" />
                    Bé Nhìn Thao Tác Chuẩn Quá! (+5 ⭐)
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-rose-600 font-black text-lg">
                    <XCircle className="w-6 h-6" />
                    Chưa chính xác rồi! Thao tác trong video là: {currentQuestion.nameVi} ({currentQuestion.abbr})
                  </div>
                )}
                <p className="text-xs font-bold text-slate-500">{currentQuestion.description}</p>
              </div>

              <button
                onClick={handleNextQuestion}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-black text-base shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 shrink-0"
              >
                Video Tiếp Theo
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

        </div>
      )}

      {/* FLASHCARD MODE */}
      {activeSubMode === 'flashcard' && (
        <div className="bg-white rounded-3xl border-4 border-amber-200 shadow-2xl p-6 sm:p-8 space-y-6 max-w-xl mx-auto text-center">
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-black bg-amber-100 text-amber-800 px-3 py-1 rounded-full border border-amber-200">
              Thẻ Flashcard Ký Hiệu ({flashcardIndex + 1} / {CROCHET_SYMBOLS.length})
            </span>
            <span className="text-xs font-black text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
              Phân loại: {currentFlashcard.category}
            </span>
          </div>

          {/* Flip Card Container */}
          <div
            onClick={() => {
              soundFx.playPop();
              setIsFlipped(!isFlipped);
            }}
            className="w-full min-h-[280px] bg-gradient-to-tr from-amber-50 to-pink-50 rounded-3xl border-4 border-amber-300 shadow-inner p-8 flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-102 relative overflow-hidden group"
          >
            <span className="absolute top-3 right-3 text-xs font-black text-amber-700 bg-white px-2.5 py-1 rounded-full border border-amber-200 shadow-sm">
              💡 Bấm để lật thẻ
            </span>

            {!isFlipped ? (
              <div className="space-y-4 flex flex-col items-center">
                <SymbolRenderer type={currentFlashcard.svgType} className="w-36 h-36" strokeColor="#0F172A" />
                <span className="font-extrabold text-sm text-slate-500">
                  (Bấm để xem tên mũi móc & ký hiệu viết tắt)
                </span>
              </div>
            ) : (
              <div className="space-y-3 animate-popIn">
                <span className="text-4xl font-black text-pink-600 bg-white px-4 py-2 rounded-2xl border border-pink-200 shadow-sm inline-block">
                  {currentFlashcard.abbr}
                </span>
                <h3 className="text-2xl font-black text-slate-800">
                  {currentFlashcard.nameVi}
                </h3>
                <p className="text-sm font-extrabold text-purple-600">
                  {currentFlashcard.nameEn}
                </p>
                <p className="text-xs font-bold text-slate-600 max-w-sm mx-auto bg-white/80 p-3 rounded-xl border border-amber-200">
                  {currentFlashcard.description}
                </p>
              </div>
            )}
          </div>

          {/* Flashcard Navigation */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              onClick={handlePrevFlashcard}
              className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-amber-100 text-slate-700 font-extrabold text-sm transition-colors border border-slate-200"
            >
              ⬅️ Thẻ Trước
            </button>

            <button
              onClick={() => {
                soundFx.playPop();
                const rand = Math.floor(Math.random() * CROCHET_SYMBOLS.length);
                setIsFlipped(false);
                setFlashcardIndex(rand);
              }}
              className="p-3 rounded-2xl bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors"
              title="Thẻ Ngẫu Nhiên"
            >
              <Shuffle className="w-5 h-5" />
            </button>

            <button
              onClick={handleNextFlashcard}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-pink-500 text-white font-black text-sm shadow-md hover:scale-105 transition-all"
            >
              Thẻ Tiếp Kế ➡️
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
