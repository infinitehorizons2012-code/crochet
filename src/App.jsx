import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Level1Lessons from './components/Level1Lessons';
import Level1Projects from './components/Level1Projects';
import Level1Quiz from './components/Level1Quiz';
import Level2Lessons from './components/Level2Lessons';
import SymbolQuiz from './components/SymbolQuiz';
import YarnMixer from './components/YarnMixer';
import AchievementBadges from './components/AchievementBadges';
import Footer from './components/Footer';

// Simple Error Boundary Component to prevent white screen of death
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Crochet Kids Error Boundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-pink-50 flex items-center justify-center p-6 text-center">
          <div className="bg-white p-8 rounded-3xl border-4 border-pink-300 shadow-2xl max-w-md space-y-4">
            <div className="text-6xl">🧶</div>
            <h2 className="text-2xl font-black text-slate-800">Ối! Có chút gián đoạn nhỏ 🎀</h2>
            <p className="text-sm font-bold text-slate-600">
              Đừng lo bé ơi! Hãy bấm nút bên dưới để khôi phục trang web lại bình thường nhé.
            </p>
            <button
              onClick={this.handleReset}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black rounded-2xl shadow-md hover:scale-105 transition-all"
            >
              Tải Lại Trang Web ✨
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState('level1_lessons');
  const [isMuted, setIsMuted] = useState(false);

  // Safe localStorage loading with try-catch
  const [stars, setStars] = useState(() => {
    try {
      const saved = localStorage.getItem('crochet_kids_stars');
      const val = parseInt(saved, 10);
      return isNaN(val) ? 20 : val;
    } catch (e) {
      return 20;
    }
  });

  const [badges, setBadges] = useState(() => {
    try {
      const saved = localStorage.getItem('crochet_kids_badges');
      return saved ? JSON.parse(saved) : ['slip_knot_master'];
    } catch (e) {
      return ['slip_knot_master'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('crochet_kids_stars', stars.toString());
    } catch (e) {}
  }, [stars]);

  useEffect(() => {
    try {
      localStorage.setItem('crochet_kids_badges', JSON.stringify(badges));
    } catch (e) {}
  }, [badges]);

  const handleAddStars = (amount) => {
    setStars((prev) => prev + amount);
  };

  const handleUnlockBadge = (badgeId) => {
    if (!badges.includes(badgeId)) {
      setBadges((prev) => [...prev, badgeId]);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-amber-50/60 via-pink-50/40 to-purple-50/60 text-slate-800 flex flex-col font-sans">
        
        {/* Navigation Header */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          stars={stars}
          badgesUnlocked={badges.length}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
        />

        {/* Main Content Area */}
        <main className="flex-grow">
          
          {/* Tab Router */}
          {activeTab === 'level1_lessons' && (
            <Level1Lessons
              onAddStars={handleAddStars}
              onUnlockBadge={handleUnlockBadge}
            />
          )}

          {activeTab === 'quiz' && (
            <SymbolQuiz
              onAddStars={handleAddStars}
              onUnlockBadge={handleUnlockBadge}
            />
          )}

          {activeTab === 'projects' && (
            <Level1Projects
              onAddStars={handleAddStars}
              onUnlockBadge={handleUnlockBadge}
            />
          )}

          {activeTab === 'level1_quiz' && (
            <Level1Quiz
              onAddStars={handleAddStars}
              onUnlockBadge={handleUnlockBadge}
            />
          )}

          {activeTab === 'level2_lessons' && (
            <Level2Lessons
              onAddStars={handleAddStars}
              onUnlockBadge={handleUnlockBadge}
            />
          )}

          {activeTab === 'mixer' && (
            <YarnMixer
              onAddStars={handleAddStars}
              onUnlockBadge={handleUnlockBadge}
            />
          )}

        </main>

        {/* Footer */}
        <Footer />

      </div>
    </ErrorBoundary>
  );
}
