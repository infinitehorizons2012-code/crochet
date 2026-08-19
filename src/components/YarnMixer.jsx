import React, { useState } from 'react';
import { Palette, ShieldCheck, Sparkles, Heart, Star, CheckCircle, Info } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/sound';

export default function YarnMixer({ onAddStars, onUnlockBadge }) {
  const [baseColor, setBaseColor] = useState('#FF9EAA');
  const [accentColor, setAccentColor] = useState('#FFDE59');
  const [eyeColor, setEyeColor] = useState('#1E293B');
  const [bowColor, setBowColor] = useState('#C3ACD0');
  const [savedPalettes, setSavedPalettes] = useState([]);

  const yarnPaletteOptions = [
    { name: 'Hồng Dâu', hex: '#FF9EAA' },
    { name: 'Xanh Bạc Hà', hex: '#A2E9C1' },
    { name: 'Vàng Nắng', hex: '#FFDE59' },
    { name: 'Tím Thơ Mộng', hex: '#C3ACD0' },
    { name: 'Xanh Biển Nông', hex: '#7FD8BE' },
    { name: 'Cam Đào', hex: '#FF9F1C' },
    { name: 'Trắng Sữa', hex: '#F8FAFC' },
    { name: 'Đỏ Cherry', hex: '#FF4D6D' },
  ];

  const handleSavePalette = () => {
    soundFx.playSuccess();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    
    const newPal = {
      id: Date.now(),
      base: baseColor,
      accent: accentColor,
      bow: bowColor,
    };
    
    setSavedPalettes([newPal, ...savedPalettes]);
    onAddStars(10);
    onUnlockBadge('color_designer');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-white">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black">
            <Palette className="w-4 h-4 text-amber-200" />
            Studio Thiết Kế & An Toàn
          </div>
          <h2 className="text-3xl sm:text-4xl font-black">
            Thử Phối Màu Len & Chuẩn Bị Dụng Cụ 🎨
          </h2>
          <p className="text-sm sm:text-base font-bold text-purple-50 max-w-xl">
            Tự do thử nghiệm phối các màu cuộn len bé thích và tìm hiểu bí kíp chọn kim móc an toàn nhất cho tay bé!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Amigurumi Color Mixer */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border-4 border-purple-200 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-purple-100 pb-4">
            <span className="text-3xl">🎨</span>
            <div>
              <h3 className="font-extrabold text-2xl text-slate-800">
                Phòng Phối Màu Tác Phẩm Len
              </h3>
              <p className="text-xs font-bold text-slate-500">
                Chọn màu sắc bên dưới để xem chú sứa len thay đổi diện mạo ngay lập tức!
              </p>
            </div>
          </div>

          {/* Color Selector Controls */}
          <div className="space-y-4">
            {/* Base Color */}
            <div>
              <label className="block text-xs font-extrabold text-slate-600 mb-1.5">
                Màu Len Thân Sứa (Base Color):
              </label>
              <div className="flex flex-wrap gap-2">
                {yarnPaletteOptions.map((c) => (
                  <button
                    key={`base_${c.hex}`}
                    onClick={() => {
                      soundFx.playPop();
                      setBaseColor(c.hex);
                    }}
                    style={{ backgroundColor: c.hex }}
                    className={`w-8 h-8 rounded-full border-2 border-slate-300 transition-transform ${
                      baseColor === c.hex ? 'ring-4 ring-purple-300 scale-110 shadow-md' : 'hover:scale-105'
                    }`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Accent Color */}
            <div>
              <label className="block text-xs font-extrabold text-slate-600 mb-1.5">
                Màu Tua Rua & Viền (Accent Color):
              </label>
              <div className="flex flex-wrap gap-2">
                {yarnPaletteOptions.map((c) => (
                  <button
                    key={`accent_${c.hex}`}
                    onClick={() => {
                      soundFx.playPop();
                      setAccentColor(c.hex);
                    }}
                    style={{ backgroundColor: c.hex }}
                    className={`w-8 h-8 rounded-full border-2 border-slate-300 transition-transform ${
                      accentColor === c.hex ? 'ring-4 ring-purple-300 scale-110 shadow-md' : 'hover:scale-105'
                    }`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Bow Color */}
            <div>
              <label className="block text-xs font-extrabold text-slate-600 mb-1.5">
                Màu Nơ Xinh Cài Đầu (Bow Color):
              </label>
              <div className="flex flex-wrap gap-2">
                {yarnPaletteOptions.map((c) => (
                  <button
                    key={`bow_${c.hex}`}
                    onClick={() => {
                      soundFx.playPop();
                      setBowColor(c.hex);
                    }}
                    style={{ backgroundColor: c.hex }}
                    className={`w-8 h-8 rounded-full border-2 border-slate-300 transition-transform ${
                      bowColor === c.hex ? 'ring-4 ring-purple-300 scale-110 shadow-md' : 'hover:scale-105'
                    }`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Action to Save Color Combination */}
          <div className="pt-2">
            <button
              onClick={handleSavePalette}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-black text-sm shadow-md hover:scale-102 transition-all border-2 border-white"
            >
              <Sparkles className="w-5 h-5 text-amber-300" />
              Lưu Phối Màu Này Cho Dự Án Móc Real (+10 ⭐)
            </button>
          </div>
        </div>

        {/* Right Column: Live Visual Amigurumi Preview */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          <div className="bg-gradient-to-b from-amber-50 to-pink-100/70 p-8 rounded-3xl border-4 border-white shadow-xl text-center space-y-4 relative overflow-hidden flex-1 flex flex-col items-center justify-center">
            
            <span className="text-xs font-black text-pink-600 bg-white px-3 py-1 rounded-full shadow-sm border border-pink-200">
              Xem Trước Nhân Vật Của Bé ✨
            </span>

            {/* Custom SVG Yarn Jellyfish Preview */}
            <div className="relative w-48 h-48 my-2 animate-bounce-slow">
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
                {/* Bow */}
                <path d="M 80 45 Q 90 35 100 45 Q 110 35 120 45 Q 100 60 80 45 Z" fill={bowColor} stroke="#475569" strokeWidth="3" />
                <circle cx="100" cy="45" r="5" fill="#FFF" />

                {/* Jellyfish Body */}
                <path d="M 50 110 C 50 50, 150 50, 150 110 C 150 120, 135 125, 125 115 C 115 125, 105 125, 100 115 C 95 125, 85 125, 75 115 C 65 125, 50 120, 50 110 Z" fill={baseColor} stroke="#475569" strokeWidth="4" />

                {/* Eyes */}
                <circle cx="80" cy="90" r="7" fill={eyeColor} />
                <circle cx="82" cy="88" r="2.5" fill="#FFF" />

                <circle cx="120" cy="90" r="7" fill={eyeColor} />
                <circle cx="122" cy="88" r="2.5" fill="#FFF" />

                {/* Cheeks */}
                <circle cx="70" cy="98" r="6" fill="#FF70A6" opacity="0.6" />
                <circle cx="130" cy="98" r="6" fill="#FF70A6" opacity="0.6" />

                {/* Smile */}
                <path d="M 93 96 Q 100 104 107 96" fill="none" stroke="#475569" strokeWidth="3" strokeLinecap="round" />

                {/* Tentacles */}
                <path d="M 65 120 Q 55 145 65 170" fill="none" stroke={accentColor} strokeWidth="6" strokeLinecap="round" />
                <path d="M 85 120 Q 95 145 85 175" fill="none" stroke={accentColor} strokeWidth="6" strokeLinecap="round" />
                <path d="M 115 120 Q 105 145 115 175" fill="none" stroke={accentColor} strokeWidth="6" strokeLinecap="round" />
                <path d="M 135 120 Q 145 145 135 170" fill="none" stroke={accentColor} strokeWidth="6" strokeLinecap="round" />
              </svg>
            </div>

            <p className="text-xs font-bold text-slate-600 max-w-xs">
              Màu len thân: <span className="font-black text-pink-600">{baseColor}</span> | Phối viền: <span className="font-black text-amber-600">{accentColor}</span>
            </p>
          </div>

          {/* Safety & Tools Guide Box */}
          <div className="bg-emerald-50 border-4 border-emerald-200 p-6 rounded-3xl space-y-3">
            <h4 className="font-black text-emerald-900 text-base flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Bí Kíp An Toàn Dành Cho Thợ Móc Nhí:
            </h4>
            
            <ul className="space-y-2 text-xs font-bold text-emerald-800">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                Dùng kim móc có tay cầm bằng cao su mềm (3.0mm - 3.5mm) để bé không bị mỏi tay.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                Ưu tiên loại len Milk Cotton không châm chích, an toàn tuyệt đối cho làn da bé.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                Luôn nhờ sự hướng dẫn của người lớn khi dùng kim khâu len và kéo bấm nhé!
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
