import React from 'react';
import { Sparkles, Trophy, Star, Award, CheckCircle2, Circle, TrendingUp, Flower2, Sprout, Trees, ArrowRight, RefreshCw, Layers } from 'lucide-react';
import { soundFx } from '../utils/sound';

export default function ProgressDashboard({
  currentUser,
  completedLessons = [],
  quizStats = { stage: 'mam', streak: 0 },
  onNavigateTab
}) {
  // Quiz Stage Metadata
  const STAGE_INFO = {
    mam: {
      name: 'Mầm 🌱',
      emoji: '🌱',
      color: 'from-amber-400 to-emerald-400',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      desc: 'Bé đang ở cấp Mầm! Cần 2 lần đúng liên tiếp để lớn thành Cây 🌿',
      nextGoal: '2 lần đúng liên tiếp ➔ Cây 🌿'
    },
    cay: {
      name: 'Cây 🌿',
      emoji: '🌿',
      color: 'from-emerald-500 to-teal-500',
      badgeBg: 'bg-teal-100 text-teal-800 border-teal-300',
      desc: 'Giỏi quá! Bé đã lớn thành Cây 🌿! Cần 3 lần đúng liên tiếp nữa để nở thành Hoa 🌸',
      nextGoal: '3 lần đúng liên tiếp ➔ Hoa 🌸'
    },
    hoa: {
      name: 'Hoa 🌸',
      emoji: '🌸',
      color: 'from-pink-500 to-rose-500',
      badgeBg: 'bg-pink-100 text-pink-800 border-pink-300',
      desc: 'Xuất sắc! Cấp độ cao nhất: Hoa Rực Rỡ 🌸! Trả lời sai sẽ bị tụt xuống Cây 🌿 bé nhé!',
      nextGoal: 'Mức Cao Nhất 🏆 (Nếu sai sẽ tụt xuống Cây 🌿)'
    }
  };

  const currentStageInfo = STAGE_INFO[quizStats.stage] || STAGE_INFO.mam;

  // Level lesson counts
  const LEVELS = [
    {
      id: 'level1',
      title: 'Level 1: Nhập Môn Móc Len',
      emoji: '🌟',
      tabId: 'level1_lessons',
      total: 23,
      items: [
        { id: 'l1_v1', name: 'Nút thắt đầu tiên (Slip Knot)' },
        { id: 'l1_v2', name: 'Mũi bính (Chain stitch - ch)' },
        { id: 'l1_v3', name: 'Mũi đơn (Single crochet - sc)' },
        { id: 'l1_v4', name: 'Mũi nửa kép (Half double - hdc)' },
        { id: 'l1_v5', name: 'Mũi kép đơn (Double crochet - dc)' },
        { id: 'l1_v6', name: 'Mũi dời (Slip stitch - sl st)' },
        { id: 'l1_v7', name: 'Mũi kép đôi (Treble crochet - tr)' },
        { id: 'l1_v8', name: 'Mũi giảm kép (dc2tog)' },
        { id: 'l1_v9', name: 'Video Tổng Hợp Đọc Chart' },
        { id: 'proj_l1_new_1', name: 'Dự Án Mẫu Móc #1' },
        { id: 'proj_l1_new_2', name: 'Dự Án Mẫu Móc #2' },
        { id: 'proj_l1_new_3', name: 'Dự Án Mẫu Móc #3' },
        { id: 'proj_l1_new_4', name: 'Dự Án Mẫu Móc #4' },
        { id: 'proj_l1_new_5', name: 'Dự Án Mẫu Móc #5' },
        { id: 'proj_l1_new_6', name: 'Dự Án Mẫu Móc #6' },
        { id: 'proj_l1_new_7', name: 'Dự Án Mẫu Móc #7' },
        { id: 'proj_l1_1', name: 'Dự Án Thực Hành #8' },
        { id: 'proj_l1_2', name: 'Dự Án Thực Hành #9' },
        { id: 'proj_l1_3', name: 'Dự Án Thực Hành #10' },
        { id: 'proj_l1_4', name: 'Dự Án Thực Hành #11' },
        { id: 'proj_l1_5', name: 'Dự Án Thực Hành #12' },
        { id: 'proj_l1_6', name: 'Dự Án Thực Hành #13' },
        { id: 'proj_l1_7', name: 'Dự Án Thực Hành #14' }
      ]
    },
    {
      id: 'level2',
      title: 'Level 2: Kỹ Thuật Tấm Vải',
      emoji: '🧵',
      tabId: 'level2_sheet_lessons',
      total: 8,
      items: [
        { id: 'sheet_start_knot', name: 'Thao tác thắt nút mảnh vải' },
        { id: 'sheet_long_chain', name: 'Khởi tạo dây xích dài' },
        { id: 'sheet_row2', name: 'Móc hàng thứ 2 mượt mà' },
        { id: 'sheet_adjust_chain', name: 'Tăng/Giảm mũi dây xích' },
        { id: 'sheet_finish', name: 'Giấu chỉ & giấu sợi thừa' },
        { id: 'sheet_step_up', name: 'Cách lên hàng tấm vải' },
        { id: 'sheet_add_yarn', name: 'Nối len khi hết sợi' },
        { id: 'sheet_change_color', name: 'Đổi màu len trên tấm vải' }
      ]
    },
    {
      id: 'level3',
      title: 'Level 3: Vòng Tròn Ma Thuật & 2D',
      emoji: '🚀',
      tabId: 'level2_lessons',
      total: 15,
      items: [
        { id: 'mr_magic_ring', name: 'Tạo Vòng Tròn Ma Thuật' },
        { id: 'x_or_v_mr', name: 'Móc mũi đơn (x) & tăng mũi (v)' },
        { id: 'step_up_mr', name: 'Mũi dời & lên hàng vòng tròn' },
        { id: 'join_mr_joining', name: 'Kết vòng mượt không lộ vết' },
        { id: 'color_mr_way1', name: 'Đổi màu len vòng tròn (Cách 1)' },
        { id: 'color_mr_way4', name: 'Đổi màu len mượt (Cách 4)' },
        { id: 'connect_2mr_join_1', name: 'Nối 2 vòng tròn ma thuật' },
        { id: 'inc_dec_mr', name: 'Tăng giảm mũi thẳng hàng' },
        { id: 'join_3d_pieces', name: 'Khâu khép 3D mảnh móc' },
        { id: 'proj_l2_2d_1', name: 'Dự Án 2D #1' },
        { id: 'proj_l2_2d_2', name: 'Dự Án 2D #2' },
        { id: 'proj_l2_2d_3', name: 'Dự Án 2D #3' },
        { id: 'proj_l2_2d_4', name: 'Dự Án 2D #4' },
        { id: 'proj_l2_2d_5', name: 'Dự Án 2D #5' },
        { id: 'proj_l2_2d_6', name: 'Dự Án 2D #6' }
      ]
    },
    {
      id: 'level4',
      title: 'Level 4: Granny Square (Ô Vuông)',
      emoji: '🔳',
      tabId: 'level4_granny_lessons',
      total: 3,
      items: [
        { id: 'granny_basic', name: 'Móc ô vuông Granny cơ bản' },
        { id: 'granny_corner', name: 'Tạo 4 góc vuông hoa văn' },
        { id: 'granny_join', name: 'Nối 2 mảnh ô vuông Granny' }
      ]
    },
    {
      id: 'level5',
      title: 'Level 5: Móc Túi & Phụ Kiện',
      emoji: '👜',
      tabId: 'level5_bag_lessons',
      total: 2,
      items: [
        { id: 'sheet_bottom_loop', name: 'Móc Vòng Đáy Túi Hộp' },
        { id: 'level5_bag', name: 'Túi Len Đính Nơ Xinh Xắn' }
      ]
    },
    {
      id: 'level6',
      title: 'Level 6: Các Mũi Móc Nâng Cao',
      emoji: '🪄',
      tabId: 'level6_stitch_lessons',
      total: 4,
      items: [
        { id: 'stitch_bobble', name: 'Mũi Búp Măng (Bobble Stitch)' },
        { id: 'stitch_loop', name: 'Mũi Vòng Len (Loop Stitch)' },
        { id: 'stitch_popcorn', name: 'Mũi Bỏng Ngô (Popcorn Stitch)' },
        { id: 'stitch_puff', name: 'Mũi Phồng (Puff Stitch)' }
      ]
    }
  ];

  // Calculate stats
  const totalAllItems = LEVELS.reduce((sum, lvl) => sum + lvl.total, 0);
  const totalCompleted = completedLessons.length;
  const overallPercent = Math.min(100, Math.round((totalCompleted / totalAllItems) * 100));

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden border-4 border-white">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-amber-200 border border-white/30">
              <Sparkles className="w-4 h-4" />
              Bảng Tiến Độ Học Tập Của Bé
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-wide flex items-center justify-center md:justify-start gap-3">
              <span>Tiến Độ Học Tập 📈</span>
            </h2>
            <p className="text-sm font-bold text-pink-100 max-w-xl">
              Theo dõi chi tiết số bài học đã hoàn thành, sao tích lũy ⭐ và cấp độ lớn mạnh của cây trắc nghiệm 🌱🌿🌸
            </p>
          </div>

          {/* User Badge Card */}
          <div className="bg-white/90 backdrop-blur-md text-slate-800 p-5 rounded-3xl border-2 border-white shadow-xl flex items-center gap-4 min-w-[240px]">
            <div className="w-16 h-16 bg-pink-100 text-3xl rounded-2xl flex items-center justify-center border-2 border-pink-300 shadow-inner">
              {currentUser ? currentUser.avatar : '👧'}
            </div>
            <div>
              <span className="block text-xs font-extrabold text-slate-500 uppercase">Tài Khoản Bé</span>
              <span className="text-lg font-black text-slate-800">{currentUser ? currentUser.username : 'Học Sinh'}</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-black text-amber-600 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                  {currentUser ? currentUser.stars : 20} ⭐
                </span>
                <span className="text-xs font-black text-purple-600 bg-purple-100 px-2.5 py-0.5 rounded-full border border-purple-300">
                  {overallPercent}% 完成
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QUIZ PLANT GROWTH MECHANIC CARD (ĐIỂM TRẮC NGHIỆM MẦM - CÂY - HOA) */}
      <div className="bg-white rounded-3xl border-4 border-emerald-300 p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-emerald-200">
              {currentStageInfo.emoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-black text-slate-800">Cấp Độ Trắc Nghiệm Đọc Chart</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-black border ${currentStageInfo.badgeBg}`}>
                  {currentStageInfo.name}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500 mt-0.5">
                Cơ chế sinh trưởng: 1 lần đúng ➔ Mầm 🌱 | 2 lần đúng liên tiếp từ Mầm ➔ Cây 🌿 | 3 lần đúng liên tiếp từ Cây ➔ Hoa 🌸 (Sai bị tụt cấp)
              </p>
            </div>
          </div>

          <button
            onClick={() => { soundFx.playPop(); onNavigateTab('level1_quiz'); }}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-xs rounded-2xl shadow-md hover:scale-105 transition-all flex items-center gap-2 shrink-0"
          >
            Làm Bài Trắc Nghiệm Ngay 🎯
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Growth Stages Stepper */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          
          {/* Stage 1: Mầm */}
          <div className={`p-5 rounded-2xl border-2 transition-all relative ${
            quizStats.stage === 'mam'
              ? 'bg-emerald-50 border-emerald-400 shadow-md ring-4 ring-emerald-100 scale-105'
              : 'bg-slate-50 border-slate-200 opacity-70'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">🌱</span>
              <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                Mức 1: Mầm
              </span>
            </div>
            <h4 className="font-black text-slate-800 text-base">Mầm Cây (1 Lần Đúng)</h4>
            <p className="text-xs font-bold text-slate-600 mt-1">
              Bắt đầu với 1 lần trả lời đúng.
            </p>
            {quizStats.stage === 'mam' && (
              <div className="mt-3 pt-3 border-t border-emerald-200 text-xs font-black text-emerald-700 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>Chuỗi đúng hiện tại: {quizStats.streak} / 2 lần để lên Cây 🌿</span>
              </div>
            )}
          </div>

          {/* Stage 2: Cây */}
          <div className={`p-5 rounded-2xl border-2 transition-all relative ${
            quizStats.stage === 'cay'
              ? 'bg-teal-50 border-teal-400 shadow-md ring-4 ring-teal-100 scale-105'
              : 'bg-slate-50 border-slate-200 opacity-70'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">🌿</span>
              <span className="text-xs font-black px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 border border-teal-300">
                Mức 2: Cây
              </span>
            </div>
            <h4 className="font-black text-slate-800 text-base">Cây Xanh (2 Lần Đúng Liên Tiếp)</h4>
            <p className="text-xs font-bold text-slate-600 mt-1">
              Đang mầm ➔ Đạt 2 câu đúng liên tiếp sẽ lớn thành Cây 🌿.
            </p>
            {quizStats.stage === 'cay' && (
              <div className="mt-3 pt-3 border-t border-teal-200 text-xs font-black text-teal-700 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-teal-600" />
                <span>Chuỗi đúng hiện tại: {quizStats.streak} / 3 lần để nở Hoa 🌸</span>
              </div>
            )}
          </div>

          {/* Stage 3: Hoa */}
          <div className={`p-5 rounded-2xl border-2 transition-all relative ${
            quizStats.stage === 'hoa'
              ? 'bg-pink-50 border-pink-400 shadow-md ring-4 ring-pink-100 scale-105'
              : 'bg-slate-50 border-slate-200 opacity-70'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">🌸</span>
              <span className="text-xs font-black px-2.5 py-1 rounded-full bg-pink-100 text-pink-800 border border-pink-300">
                Mức 3: Hoa
              </span>
            </div>
            <h4 className="font-black text-slate-800 text-base">Hoa Rực Rỡ (3 Lần Đúng Liên Tiếp)</h4>
            <p className="text-xs font-bold text-slate-600 mt-1">
              Đang cây ➔ Đạt 3 câu đúng liên tiếp nở thành Hoa 🌸 (Mức tối đa).
            </p>
            {quizStats.stage === 'hoa' && (
              <div className="mt-3 pt-3 border-t border-pink-200 text-xs font-black text-pink-700 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-pink-600" />
                <span>Bé đã đạt danh hiệu Hoa Rực Rỡ cao nhất! 🎉</span>
              </div>
            )}
          </div>

        </div>

        {/* Growth Rules Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs font-bold text-amber-900 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">💡</span>
            <span>
              <strong>Quy tắc tụt cấp khi làm sai:</strong> Đang ở <strong>Hoa 🌸</strong> sai sẽ tụt xuống <strong>Cây 🌿</strong> | Đang ở <strong>Cây 🌿</strong> sai sẽ tụt xuống <strong>Mầm 🌱</strong>.
            </span>
          </div>
        </div>

      </div>

      {/* OVERALL PROGRESS BAR */}
      <div className="bg-white rounded-3xl border-4 border-purple-200 p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-800">Tổng Tiến Độ Tất Cả Các Level</h3>
            <p className="text-xs font-bold text-slate-500">Đã hoàn thành {totalCompleted} / {totalAllItems} bài học & dự án</p>
          </div>
          <span className="text-2xl font-black text-purple-600 bg-purple-100 px-4 py-1.5 rounded-full border border-purple-300">
            {overallPercent}%
          </span>
        </div>

        <div className="w-full bg-slate-100 h-6 rounded-full overflow-hidden p-1 border-2 border-slate-200">
          <div
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${overallPercent}%` }}
          ></div>
        </div>
      </div>

      {/* LEVEL BY LEVEL BREAKDOWN CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {LEVELS.map((lvl) => {
          const completedInLvl = lvl.items.filter((item) => completedLessons.includes(item.id)).length;
          const percent = Math.round((completedInLvl / lvl.total) * 100);

          return (
            <div key={lvl.id} className="bg-white rounded-3xl border-4 border-pink-200 p-6 shadow-xl space-y-5 flex flex-col justify-between">
              
              <div className="space-y-4">
                {/* Level Header */}
                <div className="flex items-center justify-between border-b border-pink-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{lvl.emoji}</span>
                    <div>
                      <h4 className="font-black text-slate-800 text-lg">{lvl.title}</h4>
                      <span className="text-xs font-bold text-slate-500">
                        {completedInLvl} / {lvl.total} bài đã hoàn thành
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-black text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
                    {percent}%
                  </span>
                </div>

                {/* Level Progress Bar */}
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-purple-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>

                {/* Lesson Items Checklist */}
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {lvl.items.map((item) => {
                    const isDone = completedLessons.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold transition-all ${
                          isDone
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                          )}
                          <span>{item.name}</span>
                        </span>
                        {isDone && <span className="text-[10px] bg-emerald-200 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">Đã học ✨</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => { soundFx.playPop(); onNavigateTab(lvl.tabId); }}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black text-xs rounded-2xl shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2 mt-4"
              >
                Vào Học {lvl.title} 🚀
              </button>

            </div>
          );
        })}
      </div>

    </div>
  );
}
