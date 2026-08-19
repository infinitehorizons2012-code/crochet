import React, { useState } from 'react';
import { Heart, Sparkles, Star, CheckCircle, Clock, Scissors, Layers, Award, ChevronRight, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/sound';

export default function ProjectCatalog({ onAddStars, onUnlockBadge }) {
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [checkedStepsMap, setCheckedStepsMap] = useState({});

  const projects = [
    {
      id: 'jellyfish',
      badgeId: 'jellyfish_master',
      title: 'Chú Sứa Bảy Sắc Cầu Vồng 🌈',
      emoji: '🐙',
      difficulty: 'Rất Dễ ⭐',
      time: '15-20 phút',
      stars: 30,
      color: 'from-pink-400 to-purple-400',
      description: 'Chú sứa biển nhỏ nhắn siêu dễ thương với các tua rua cầu vồng xoăn nhẹ.',
      materials: [
        'Len Milk Cotton màu Hồng/Xanh/Tím (Len 4 sợi)',
        'Kim móc 3.5mm tay cầm dẻo',
        'Bông gòn nhồi thú bông',
        'Mắt nhựa an toàn (hoặc dùng chỉ đen thêu mắt)',
        'Kéo bấm đầu tù cho bé'
      ],
      patternSteps: [
        'Vòng 1: Tạo Vòng tròn ma thuật (MR), móc 6 mũi đơn (sc) [Tổng: 6 mũi].',
        'Vòng 2: Móc 2 mũi đơn vào mỗi chân (inc) x 6 lần [Tổng: 12 mũi].',
        'Vòng 3-5: Móc 12 mũi đơn bình thường để tạo thân mũ sứa tròn [Tổng: 12 mũi].',
        'Vòng 6 (Tạo tua rua): Móc (5 mũi bính ch, quay lại móc mũi đơn) x 4 lần làm chân sứa!',
        'Rút dây, nhồi một nhúm bông gòn mềm vào trong thân sứa.',
        'Dán hoặc thêu 2 mắt nhỏ xinh và chiếc miệng cười ngộ nghĩnh!'
      ]
    },
    {
      id: 'star',
      badgeId: 'star_master',
      title: 'Ngôi Sao May Mắn ✨',
      emoji: '⭐',
      difficulty: 'Dễ ⭐⭐',
      time: '10-15 phút',
      stars: 25,
      color: 'from-amber-400 to-yellow-500',
      description: 'Móc chiếc móc khóa ngôi sao màu vàng nắng mang lại may mắn!',
      materials: [
        'Len Milk Cotton màu Vàng Nắng',
        'Kim móc 3.0mm',
        'Khoen móc khóa kim loại nhỏ',
        'Bông gòn nhồi nhẹ'
      ],
      patternSteps: [
        'Vòng 1: Vòng tròn ma thuật (MR), móc 5 mũi đơn (sc) [Tổng: 5 mũi].',
        'Vòng 2: Móc 2 mũi đơn vào mỗi chân [Tổng: 10 mũi].',
        'Tạo 5 cánh sao: Mỗi cánh móc (3 mũi bính, 1 mũi dời, 1 mũi đơn, 1 mũi kép) gắn vào chân kế.',
        'Lặp lại đủ 5 cánh sao vàng rực rỡ.',
        'Rút chỉ giấu mối len và gắn khoen móc khóa xinh xắn vào đỉnh cánh sao!'
      ]
    },
    {
      id: 'heart',
      badgeId: 'heart_master',
      title: 'Trái Tim Thỏ Bông 💖',
      emoji: '💖',
      difficulty: 'Dễ ⭐⭐',
      time: '15 phút',
      stars: 25,
      color: 'from-rose-400 to-pink-500',
      description: 'Món quà trái tim bằng len ngập tràn tình yêu thương dành tặng người thân!',
      materials: [
        'Len nhung đũa hoặc Milk Cotton màu Đỏ/Hồng',
        'Kim móc 3.5mm - 4.0mm',
        'Bông gòn nhồi thú'
      ],
      patternSteps: [
        'Tạo 2 chóp tròn nhỏ của trái tim: Móc MR 6sc (2 chiếc).',
        'Nối 2 chóp lại với nhau thành vòng tròn lớn 12 mũi.',
        'Vòng 4-5: Móc giảm mũi dần (dec) ở hai bên sườn trái tim.',
        'Nhồi bông gòn căng tròn vào bụng trái tim.',
        'Móc khép chóp nhọn phía dưới và rút thắt nút chỉ gọn gàng!'
      ]
    },
    {
      id: 'flower',
      badgeId: 'flower_master',
      title: 'Bông Hoa Xinh Xắn 🌸',
      emoji: '🌸',
      difficulty: 'Rất Dễ ⭐',
      time: '10 phút',
      stars: 20,
      color: 'from-purple-400 to-pink-400',
      description: 'Bông hoa 5 cánh rực rỡ cài áo hoặc trang trí hộp bút học tập của bé.',
      materials: [
        'Len màu Vàng (làm nhụy) & màu Tím/Hồng (làm cánh)',
        'Kim móc 3.0mm',
        'Ghim cài áo nhỏ'
      ],
      patternSteps: [
        'Nhụy hoa: Vòng tròn ma thuật (MR) bằng len Vàng, móc 5 mũi đơn (sc).',
        'Đổi sang len Tím/Hồng.',
        'Móc 5 cánh hoa: Vào mỗi chân mũi, móc (2 mũi bính + 3 mũi kép + 2 mũi bính + 1 mũi dời).',
        'Cắt chỉ, thắt nút dây đằng sau bông hoa.',
        'Gắn ghim cài áo để làm ghim cài balo xinh lung linh!'
      ]
    }
  ];

  const handleToggleStep = (projectId, stepIndex) => {
    soundFx.playStitch();
    const key = `${projectId}_${stepIndex}`;
    setCheckedStepsMap((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleCompleteProject = (project) => {
    if (!completedProjects.includes(project.id)) {
      soundFx.playSuccess();
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 }
      });
      setCompletedProjects([...completedProjects, project.id]);
      onAddStars(project.stars);
      if (project.badgeId) {
        onUnlockBadge(project.badgeId);
      }
      setActiveProjectModal(null);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-300 via-pink-400 to-purple-400 p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-white">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black">
            <Heart className="w-4 h-4 text-pink-200 fill-pink-200" />
            Thư Viện Dự Án Mẫu Cho Bé
          </div>
          <h2 className="text-3xl sm:text-4xl font-black">
            Tự Tay Móc Thú Bông & Quà Tặng! 🎁
          </h2>
          <p className="text-sm sm:text-base font-bold text-amber-50 max-w-xl">
            Chọn một dự án bé yêu thích, chuẩn bị cuộn len xinh và theo dõi danh sách hướng dẫn từng bước nhé!
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-md text-slate-800 p-4 rounded-2xl border-2 border-white shadow-md text-center min-w-[180px]">
          <span className="block text-xs font-black text-slate-500">Dự Án Đã Móc</span>
          <span className="text-2xl font-black text-amber-600">
            {completedProjects.length} / {projects.length} Mẫu
          </span>
          <div className="w-full bg-slate-100 h-2.5 rounded-full mt-2 overflow-hidden border border-slate-200">
            <div 
              className="bg-gradient-to-r from-amber-400 to-pink-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${(completedProjects.length / projects.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Projects Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project) => {
          const isDone = completedProjects.includes(project.id);

          return (
            <div
              key={project.id}
              className="bg-white rounded-3xl border-4 border-pink-100 shadow-xl overflow-hidden hover:shadow-2xl hover:border-pink-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Project Header Banner Graphic */}
                <div className={`h-40 bg-gradient-to-tr ${project.color} p-6 flex flex-col items-center justify-center relative overflow-hidden`}>
                  <div className="text-7xl animate-bounce-slow transform group-hover:scale-125 transition-transform duration-300">
                    {project.emoji}
                  </div>
                  {isDone && (
                    <div className="absolute top-3 right-3 bg-emerald-500 text-white p-1.5 rounded-full shadow-md">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  )}
                  <div className="absolute bottom-2 left-3 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Clock className="w-3.5 h-3.5 text-pink-500" />
                    {project.time}
                  </div>
                </div>

                {/* Card Info Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black bg-amber-100 text-amber-800 px-2.5 py-1 rounded-xl">
                      {project.difficulty}
                    </span>
                    <span className="text-xs font-black text-purple-600 bg-purple-50 px-2.5 py-1 rounded-xl">
                      +{project.stars} ⭐
                    </span>
                  </div>

                  <h3 className="font-black text-xl text-slate-800 leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs font-bold text-slate-500 line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => {
                    soundFx.playPop();
                    setActiveProjectModal(project);
                  }}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-black text-sm transition-all border-2 ${
                    isDone
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                      : 'bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white border-white shadow-md hover:scale-102'
                  }`}
                >
                  {isDone ? 'Xem Lại Mẫu Móc' : 'Bắt Đầu Móc Ngay!'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Pattern Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl border-4 border-pink-300 shadow-2xl overflow-hidden animate-popIn my-8">
            
            {/* Modal Header */}
            <div className={`bg-gradient-to-r ${activeProjectModal.color} p-6 text-white flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{activeProjectModal.emoji}</span>
                <div>
                  <h3 className="text-2xl font-black">{activeProjectModal.title}</h3>
                  <p className="text-xs font-bold text-pink-100">
                    Thời gian: {activeProjectModal.time} | Thưởng: +{activeProjectModal.stars} ⭐
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  soundFx.playPop();
                  setActiveProjectModal(null);
                }}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              
              {/* Materials Needed Section */}
              <div className="bg-amber-50 border-2 border-amber-200 p-4 rounded-2xl space-y-2">
                <h4 className="font-extrabold text-amber-900 text-sm flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-amber-600" />
                  Dụng Cụ & Nguyên Liệu Cần Chuẩn Bị:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-extrabold text-slate-700">
                  {activeProjectModal.materials.map((mat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      {mat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step-by-Step Pattern Checklist */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
                  <Layers className="w-5 h-5 text-pink-500" />
                  Hướng Dẫn Móc Từng Bước (Bấm tích khi làm xong):
                </h4>

                <div className="space-y-2">
                  {activeProjectModal.patternSteps.map((step, idx) => {
                    const stepKey = `${activeProjectModal.id}_${idx}`;
                    const isChecked = !!checkedStepsMap[stepKey];

                    return (
                      <div
                        key={idx}
                        onClick={() => handleToggleStep(activeProjectModal.id, idx)}
                        className={`p-3.5 rounded-2xl border-2 cursor-pointer flex items-start gap-3 transition-all ${
                          isChecked
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 line-through opacity-80'
                            : 'bg-slate-50 border-slate-200 hover:border-pink-300 text-slate-800'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                          isChecked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isChecked && <CheckCircle className="w-4 h-4" />}
                        </div>
                        <p className="text-xs sm:text-sm font-bold leading-relaxed">
                          {step}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs font-extrabold text-slate-500">
                Hãy nhờ bố mẹ hoặc người lớn giúp bé chuẩn bị kim móc nhé!
              </span>

              <button
                onClick={() => handleCompleteProject(activeProjectModal)}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-black text-sm shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <Award className="w-5 h-5 text-amber-300" />
                Hoàn Thành Dự Án (+{activeProjectModal.stars} ⭐)
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
