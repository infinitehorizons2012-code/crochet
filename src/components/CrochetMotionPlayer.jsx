import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Film, Sparkles, Image as ImageIcon } from 'lucide-react';
import SymbolRenderer from './SymbolRenderer';
import { getCloudinaryMediaUrl } from '../utils/cloudinary';

export default function CrochetMotionPlayer({ symbol, showSymbolOverlay = true, className = "" }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const videoRef = useRef(null);

  // Cloudinary media URL resolution
  const videoUrl = symbol?.videoUrl ? getCloudinaryMediaUrl(symbol.videoUrl, 'video') : null;
  const imageUrl = symbol?.imageUrl ? getCloudinaryMediaUrl(symbol.imageUrl, 'image') : null;

  const hasVideo = Boolean(videoUrl);
  const hasImage = Boolean(imageUrl);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const handleRestart = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <div className={`relative bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-pink-200 group flex flex-col items-center justify-center min-h-[320px] ${className}`}>
      
      {/* Symbol Overlay Badge on top of media */}
      {showSymbolOverlay && symbol && (
        <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border-2 border-white shadow-lg flex items-center gap-3 animate-popIn">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center border border-amber-300">
            <SymbolRenderer type={symbol.svgType} className="w-7 h-7" strokeColor="#0F172A" />
          </div>
          <div>
            <span className="block font-black text-sm text-slate-800">{symbol.nameVi}</span>
            <span className="block text-[11px] font-extrabold text-pink-600">{symbol.nameEn} ({symbol.abbr})</span>
          </div>
        </div>
      )}

      {/* 1. CLOUDINARY VIDEO PLAYER */}
      {hasVideo ? (
        <div className="relative w-full h-full min-h-[340px] flex items-center justify-center bg-black">
          <video
            ref={videoRef}
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            playbackRate={speed}
            className="w-full max-h-[420px] object-contain rounded-2xl"
          />

          {/* Video Controls Bar */}
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-white/20">
            <button
              onClick={togglePlay}
              className="p-2 rounded-xl bg-pink-500 text-white hover:bg-pink-600 transition-colors"
              title={isPlaying ? "Tạm dừng" : "Phát video"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            </button>

            <button
              onClick={handleRestart}
              className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
              title="Xem lại từ đầu"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setSpeed((prev) => (prev === 1 ? 0.5 : prev === 0.5 ? 0.75 : 1))}
              className="px-2.5 py-1 rounded-xl bg-white/10 text-amber-300 font-black text-xs hover:bg-white/20 transition-colors"
              title="Tốc độ phát"
            >
              {speed}x
            </button>
          </div>
        </div>
      ) : hasImage ? (
        /* 2. CLOUDINARY IMAGE / GIF TUTORIAL VIEW */
        <div className="relative w-full h-full min-h-[320px] bg-slate-950 flex flex-col items-center justify-center p-4">
          <img
            src={imageUrl}
            alt={symbol?.nameVi || 'Crochet Stitch'}
            className="w-full max-h-[360px] object-contain rounded-2xl shadow-md border border-slate-800"
          />
          <div className="mt-3 z-10 text-center bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-xl border border-white/20">
            <span className="text-xs font-black text-amber-300 flex items-center justify-center gap-1">
              <ImageIcon className="w-3.5 h-3.5" /> Hình Ảnh Thực Hành Cloudinary ({symbol?.abbr})
            </span>
          </div>
        </div>
      ) : (
        /* 3. VECTOR SIMULATOR FALLBACK */
        <div className="w-full h-full min-h-[320px] bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
          
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative w-64 h-52 flex items-center justify-center">
            
            <svg viewBox="0 0 200 160" className="w-full h-full">
              <path
                d="M 40 100 Q 70 40 100 80 T 160 90"
                fill="none"
                stroke="#EC4899"
                strokeWidth="12"
                strokeLinecap="round"
                className={isPlaying ? "animate-pulse" : ""}
              />
              <path
                d="M 60 120 C 80 70 120 70 140 120"
                fill="none"
                stroke="#F472B6"
                strokeWidth="10"
                strokeLinecap="round"
              />

              <g className={`transition-transform duration-700 origin-center ${isPlaying ? 'animate-bounce' : ''}`}>
                <rect x="90" y="20" width="16" height="90" rx="8" fill="url(#goldGradient)" transform="rotate(35 90 20)" />
                <path d="M 120 75 Q 130 65 120 55" fill="none" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" />
              </g>

              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FCD34D" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute opacity-10 pointer-events-none">
              <SymbolRenderer type={symbol?.svgType || 'ellipse'} className="w-48 h-48" strokeColor="#FFFFFF" />
            </div>

          </div>

          <div className="z-10 mt-2 text-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
            <span className="text-xs font-black text-amber-300 flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Mô Phỏng Chuyển Động Móc ({symbol?.abbr || 'ch'})
            </span>
            <p className="text-[11px] text-pink-100 font-bold mt-0.5">
              {symbol?.description || 'Bé hãy quan sát thao tác luồn kim móc và kéo sợi len nhé!'}
            </p>
          </div>

          {/* Fallback Controls */}
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-white/20">
            <button
              onClick={togglePlay}
              className="p-2 rounded-xl bg-pink-500 text-white hover:bg-pink-600 transition-colors"
              title={isPlaying ? "Tạm dừng" : "Phát video"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            </button>

            <button
              onClick={handleRestart}
              className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
              title="Xem lại từ đầu"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setSpeed((prev) => (prev === 1 ? 0.5 : prev === 0.5 ? 0.75 : 1))}
              className="px-2.5 py-1 rounded-xl bg-white/10 text-amber-300 font-black text-xs hover:bg-white/20 transition-colors"
              title="Tốc độ phát"
            >
              {speed}x
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
