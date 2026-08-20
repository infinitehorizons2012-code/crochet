import React, { useState } from 'react';
import { Palette, Sparkles, Star, CheckCircle, Award, ChevronRight, X, Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/sound';
import level2Projects2DData from '../data/level2Projects2D.json';

export default function Level2Projects2D({ onAddStars, onUnlockBadge }) {
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [completedProjects, setCompletedProjects] = useState([]);

  const projects = level2Projects2DData.map((p, idx) => ({
    id: p.id,
    title: p.title,
    emoji: p.emoji || '🍀',
    difficulty: p.difficulty || 'Level 2 2D ⭐⭐',
    time: p.time || '15-20 phút',
    stars: p.stars || 40,
    color: p.color || (idx % 2 === 0 ? 'from-purple-500 to-pink-500' : 'from-indigo-500 to-purple-500'),
    description: `Mẫu thực hành móc 2D Level 2 #${idx + 1} ứng dụng kỹ thuật Vòng Tròn Ma Thuật, đổi màu len và kết vòng mượt mà.`,
    videoUrl: p.videoUrl
  }));

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
      if (completedProjects.length + 1 >= projects.length) {
        onUnlockBadge('level2_2d_master');
      }
      setActiveProjectModal(null);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-white">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black">
            <Palette className="w-4 h-4 text-pink-200" />
            Thư Viện {projects.length} Mẫu Móc 2D Level 2
          </div>
          <h2 className="text-3xl sm:text-4xl font-black">
            Dự Án Project 2D Level 2 🎨
          </h2>
          <p className="text-sm sm:text-base font-bold text-purple-100 max-w-xl">
            Bé hãy chọn một mẫu móc 2D xinh xắn bên dưới (như cỏ 4 lá may mắn, hoa sặc sỡ...), xem video hướng dẫn thao tác mượt mà và tự tay tạo nên tác phẩm nhé!
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-md text-slate-800 p-4 rounded-2xl border-2 border-white shadow-md text-center min-w-[180px]">
          <span className="block text-xs font-black text-slate-500">Tiến Trình Dự Án 2D</span>
          <span className="text-2xl font-black text-purple-600">
            {completedProjects.length} / {projects.length} Mẫu
          </span>
          <div className="w-full bg-slate-100 h-2.5 rounded-full mt-2 overflow-hidden border border-slate-200">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${(completedProjects.length / projects.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Projects Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const isDone = completedProjects.includes(project.id);

          return (
            <div
              key={project.id}
              className="bg-white rounded-3xl border-4 border-purple-100 shadow-xl overflow-hidden hover:shadow-2xl hover:border-purple-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Project Video Thumbnail Container */}
                <div className="relative w-full h-52 bg-slate-900 overflow-hidden flex items-center justify-center">
                  <video
                    src={project.videoUrl}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                  {/* Play Overlay Badge */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => {
                        soundFx.playPop();
                        setActiveProjectModal(project);
                      }}
                      className="w-14 h-14 bg-purple-600/90 text-white rounded-full flex items-center justify-center shadow-2xl backdrop-blur-md group-hover:scale-110 transition-transform"
                    >
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </button>
                  </div>

                  {isDone && (
                    <div className="absolute top-3 right-3 bg-emerald-500 text-white p-1.5 rounded-full shadow-md z-10">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-sm text-purple-200 text-xs font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm border border-purple-300/30">
                    <span>{project.emoji} {project.difficulty}</span>
                  </div>
                </div>

                {/* Card Info Content */}
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl">
                      Thưởng: +{project.stars} ⭐
                    </span>
                  </div>

                  <h3 className="font-black text-lg text-slate-800 leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs font-bold text-slate-500 line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => {
                    soundFx.playPop();
                    setActiveProjectModal(project);
                  }}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-black text-xs transition-all border-2 ${
                    isDone
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-white shadow-md hover:scale-102'
                  }`}
                >
                  {isDone ? 'Xem Lại Video Dự Án 2D' : 'Xem Video Hướng Dẫn Móc 🎬'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Video Project Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-3xl border-4 border-purple-300 shadow-2xl overflow-hidden animate-popIn my-8">
            
            {/* Modal Header */}
            <div className={`bg-gradient-to-r ${activeProjectModal.color} p-6 text-white flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{activeProjectModal.emoji}</span>
                <div>
                  <h3 className="text-2xl font-black">{activeProjectModal.title}</h3>
                  <p className="text-xs font-bold text-purple-100">
                    Dự Án 2D Level 2 | Thưởng: +{activeProjectModal.stars} ⭐
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

            {/* Video Stream Content */}
            <div className="p-6 space-y-4">
              <div className="relative w-full max-h-[460px] bg-black rounded-2xl overflow-hidden border-4 border-slate-800 shadow-inner flex items-center justify-center">
                <video
                  src={activeProjectModal.videoUrl}
                  controls
                  autoPlay
                  className="w-full max-h-[420px] object-contain rounded-xl"
                />
              </div>

              <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 space-y-1">
                <h4 className="font-extrabold text-xs text-purple-900">
                  💡 Hướng dẫn thực hành 2D:
                </h4>
                <p className="text-xs font-bold text-slate-700 leading-relaxed">
                  Bé hãy xem kỹ kỹ thuật tạo Vòng Tròn Ma Thuật và thao tác đổi màu len từng cánh hoa/lá trong video hướng dẫn này để làm nên sản phẩm xinh đẹp nhé!
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs font-extrabold text-slate-500">
                Bé có thể tua lại hoặc xem đi xem lại nhiều lần nhé!
              </span>

              <button
                onClick={() => handleCompleteProject(activeProjectModal)}
                disabled={completedProjects.includes(activeProjectModal.id)}
                className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                  completedProjects.includes(activeProjectModal.id)
                    ? 'bg-emerald-500 text-white cursor-default'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105'
                }`}
              >
                <Award className="w-5 h-5 text-amber-300" />
                {completedProjects.includes(activeProjectModal.id)
                  ? 'Đã Hoàn Thành Dự Án ✨'
                  : `Đánh Dấu Hoàn Thành (+${activeProjectModal.stars} ⭐)`}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
