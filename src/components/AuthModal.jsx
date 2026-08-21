import React, { useState } from 'react';
import { User, Lock, Sparkles, Check, LogIn, UserPlus, X, ShieldCheck, Heart } from 'lucide-react';
import { soundFx } from '../utils/sound';

const AVATAR_OPTIONS = ['👧', '👦', '🐰', '🐱', '🐻', '🌸', '🚀', '🧶', '🦄', '⭐'];

export default function AuthModal({ isOpen, onClose, currentUser, onLogin, onRegister, onLogout }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('👧');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanUser = username.trim();
    const cleanPass = password.trim();

    if (!cleanUser || !cleanPass) {
      setErrorMsg('Vui lòng nhập tên đăng nhập và mật khẩu bé nhé!');
      return;
    }

    if (mode === 'login') {
      const res = onLogin(cleanUser, cleanPass);
      if (res.success) {
        soundFx.playSuccess();
        setSuccessMsg('Đăng nhập thành công! Chào mừng bé trở lại 🎉');
        setTimeout(() => {
          onClose();
        }, 800);
      } else {
        soundFx.playError();
        setErrorMsg(res.message || 'Tên đăng nhập hoặc mật khẩu chưa đúng!');
      }
    } else {
      const res = onRegister(cleanUser, cleanPass, avatar);
      if (res.success) {
        soundFx.playSuccess();
        setSuccessMsg('Tạo tài khoản thành công! Bắt đầu lưu tiến trình ngay nào 🚀');
        setTimeout(() => {
          onClose();
        }, 800);
      } else {
        soundFx.playError();
        setErrorMsg(res.message || 'Tên đăng nhập này đã tồn tại!');
      }
    }
  };

  const handleUseDemoAccount = () => {
    setUsername('hocsinh');
    setPassword('1234');
    setErrorMsg('');
    setSuccessMsg('Đã điền tài khoản mẫu: hocsinh / 1234 ✨');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-3xl border-4 border-pink-300 shadow-2xl w-full max-w-md overflow-hidden relative transform transition-all duration-300 scale-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-pink-100 hover:text-pink-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Banner */}
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-6 text-white text-center relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl mb-2 border-2 border-white/40 shadow-inner">
              {currentUser ? currentUser.avatar : (mode === 'register' ? avatar : '🔑')}
            </div>
            <h3 className="text-2xl font-black tracking-wide">
              {currentUser
                ? `Tài Khoản Của ${currentUser.username}`
                : (mode === 'login' ? 'Đăng Nhập Tài Khoản 🔑' : 'Tạo Tài Khoản Mới ✨')}
            </h3>
            <p className="text-xs font-bold text-pink-100 mt-1">
              Lưu giữ toàn bộ tiến trình học tập, số sao ⭐ & huy hiệu 🏅
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          
          {/* Logged in state view */}
          {currentUser ? (
            <div className="space-y-6 text-center">
              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 space-y-3">
                <div className="flex justify-around items-center text-center">
                  <div>
                    <span className="text-2xl font-black text-amber-600 block">{currentUser.stars || 20} ⭐</span>
                    <span className="text-xs font-bold text-slate-500">Số Sao Tích Lũy</span>
                  </div>
                  <div className="h-8 w-0.5 bg-amber-200"></div>
                  <div>
                    <span className="text-2xl font-black text-purple-600 block">{(currentUser.badges || []).length} 🏅</span>
                    <span className="text-xs font-bold text-slate-500">Huy Hiệu</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
                <ShieldCheck className="w-5 h-5" />
                <span>Tiến trình đang được tự động lưu vào tài khoản!</span>
              </div>

              <button
                onClick={onLogout}
                className="w-full py-3.5 bg-rose-100 border-2 border-rose-300 text-rose-700 font-extrabold rounded-2xl hover:bg-rose-200 transition-all flex items-center justify-center gap-2"
              >
                <LogIn className="w-5 h-5 rotate-180" />
                Đăng Xuất Tài Khoản 🚪
              </button>
            </div>
          ) : (
            /* Switch Mode Tabs */
            <>
              <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-5 border border-slate-200">
                <button
                  type="button"
                  onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
                  className={`flex-1 py-2.5 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 ${
                    mode === 'login'
                      ? 'bg-white text-pink-600 shadow-md border border-pink-200'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  Đăng Nhập
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('register'); setErrorMsg(''); setSuccessMsg(''); }}
                  className={`flex-1 py-2.5 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 ${
                    mode === 'register'
                      ? 'bg-white text-purple-600 shadow-md border border-purple-200'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <UserPlus className="w-4 h-4" />
                  Tạo Tài Khoản Mới
                </button>
              </div>

              {/* Error / Success Notifications */}
              {errorMsg && (
                <div className="mb-4 p-3 bg-rose-50 border-2 border-rose-200 rounded-xl text-rose-700 text-xs font-bold flex items-center gap-2">
                  <X className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{errorMsg}</span>
                </div>
              )}
              {successMsg && (
                <div className="mb-4 p-3 bg-emerald-50 border-2 border-emerald-200 rounded-xl text-emerald-700 text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0 text-emerald-500" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Form Input */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Username Input */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Tên Đăng Nhập:
                  </label>
                  <div className="relative">
                    <User className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Nhập tên tài khoản của bé..."
                      className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 font-bold text-slate-800 outline-none transition-all text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1.5 uppercase tracking-wider flex justify-between">
                    <span>Mật Khẩu:</span>
                    <span className="text-pink-500 font-bold lowercase text-[11px]">(Mặc định có thể dùng: 1234)</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Nhập mật khẩu (ví dụ: 1234)"
                      className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 font-bold text-slate-800 outline-none transition-all text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Avatar Selection for Register */}
                {mode === 'register' && (
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-2 uppercase tracking-wider">
                      Chọn Emoji Đại Diện:
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {AVATAR_OPTIONS.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => setAvatar(emoji)}
                          className={`h-11 rounded-xl text-2xl flex items-center justify-center border-2 transition-all ${
                            avatar === emoji
                              ? 'border-pink-500 bg-pink-100 scale-110 shadow-sm'
                              : 'border-slate-200 bg-slate-50 hover:bg-pink-50'
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Hint / Demo button in login */}
                {mode === 'login' && (
                  <div className="pt-1 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleUseDemoAccount}
                      className="text-xs font-extrabold text-purple-600 hover:text-purple-800 underline flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Dùng tài khoản mẫu (hocsinh / 1234)
                    </button>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-black text-base rounded-2xl shadow-lg hover:shadow-pink-300/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
                >
                  {mode === 'login' ? (
                    <>
                      <LogIn className="w-5 h-5" />
                      Đăng Nhập & Học Tiếp 🚀
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" />
                      Tạo Tài Khoản & Bắt Đầu 🌟
                    </>
                  )}
                </button>

              </form>
            </>
          )}

        </div>

      </div>
    </div>
  );
}
