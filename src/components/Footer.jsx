import React from 'react';
import { Heart, Sparkles, Globe, Code } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 bg-white border-t-4 border-pink-200 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center text-xl font-bold shadow-sm">
            🧶
          </div>
          <div>
            <span className="font-extrabold text-lg text-slate-800 flex items-center gap-1.5 justify-center sm:justify-start">
              Crochet Kids Studio
              <Sparkles className="w-4 h-4 text-amber-400" />
            </span>
            <p className="text-xs font-bold text-slate-500">
              Trang web dạy móc len tương tác dành cho bé yêu sáng tạo ✨
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 text-xs font-bold text-slate-600">
          <div className="flex items-center gap-1">
            <span>Thiết kế với</span>
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" />
            <span>cho bé</span>
          </div>

          <a
            href="https://github.com/infinitehorizons2012-code/crochet"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-pink-100 hover:text-pink-600 px-3.5 py-1.5 rounded-full border border-slate-200 transition-colors"
          >
            <Globe className="w-4 h-4 text-pink-500" />
            <span>GitHub Repository</span>
          </a>
        </div>

      </div>
    </footer>
  );
}
