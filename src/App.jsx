import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import ProgressDashboard from './components/ProgressDashboard';
import Level1Lessons from './components/Level1Lessons';
import Level1Projects from './components/Level1Projects';
import Level1Quiz from './components/Level1Quiz';
import Level2Lessons from './components/Level2Lessons';
import Level2SheetLessons from './components/Level2SheetLessons';
import Level2Projects2D from './components/Level2Projects2D';
import Level4GrannyLessons from './components/Level4GrannyLessons';
import Level5BagLessons from './components/Level5BagLessons';
import Level6StitchLessons from './components/Level6StitchLessons';
import SymbolQuiz from './components/SymbolQuiz';
import YarnMixer from './components/YarnMixer';
import Footer from './components/Footer';

// Default initial demo user account
const DEFAULT_DEMO_USER = {
  username: 'hocsinh',
  password: '1234',
  avatar: '👧',
  stars: 20,
  badges: ['slip_knot_master'],
  completedLessons: ['l1_v1', 'l1_v2'],
  quizStats: { stage: 'mam', streak: 0 }
};

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
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Load all user accounts from localStorage
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('crochet_kids_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [DEFAULT_DEMO_USER];
  });

  // Load current logged-in username
  const [currentUsername, setCurrentUsername] = useState(() => {
    try {
      const saved = localStorage.getItem('crochet_kids_current_username');
      if (saved) return saved;
    } catch (e) {}
    return 'hocsinh';
  });

  // Save users array to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('crochet_kids_users', JSON.stringify(users));
    } catch (e) {}
  }, [users]);

  // Save current username to localStorage whenever updated
  useEffect(() => {
    try {
      if (currentUsername) {
        localStorage.setItem('crochet_kids_current_username', currentUsername);
      } else {
        localStorage.removeItem('crochet_kids_current_username');
      }
    } catch (e) {}
  }, [currentUsername]);

  // Find active user object
  const currentUser = users.find(
    (u) => u.username.toLowerCase() === (currentUsername || '').toLowerCase()
  ) || null;

  const stars = currentUser ? currentUser.stars : 20;
  const badges = currentUser ? (currentUser.badges || []) : ['slip_knot_master'];
  const completedLessons = currentUser ? (currentUser.completedLessons || []) : [];
  const quizStats = currentUser ? (currentUser.quizStats || { stage: 'mam', streak: 0 }) : { stage: 'mam', streak: 0 };

  const handleAddStars = (amount) => {
    if (!currentUsername) return;
    setUsers((prevUsers) =>
      prevUsers.map((u) => {
        if (u.username.toLowerCase() === currentUsername.toLowerCase()) {
          return { ...u, stars: (u.stars || 0) + amount };
        }
        return u;
      })
    );
  };

  const handleUnlockBadge = (badgeId) => {
    if (!currentUsername) return;
    setUsers((prevUsers) =>
      prevUsers.map((u) => {
        if (u.username.toLowerCase() === currentUsername.toLowerCase()) {
          const userBadges = u.badges || [];
          if (!userBadges.includes(badgeId)) {
            return { ...u, badges: [...userBadges, badgeId] };
          }
        }
        return u;
      })
    );
  };

  const handleCompleteLesson = (lessonId) => {
    if (!currentUsername) return;
    setUsers((prevUsers) =>
      prevUsers.map((u) => {
        if (u.username.toLowerCase() === currentUsername.toLowerCase()) {
          const completed = u.completedLessons || [];
          if (!completed.includes(lessonId)) {
            return { ...u, completedLessons: [...completed, lessonId] };
          }
        }
        return u;
      })
    );
  };

  const handleUpdateQuizStats = (stage, streak) => {
    if (!currentUsername) return;
    setUsers((prevUsers) =>
      prevUsers.map((u) => {
        if (u.username.toLowerCase() === currentUsername.toLowerCase()) {
          return { ...u, quizStats: { stage, streak } };
        }
        return u;
      })
    );
  };

  const handleLogin = (username, password) => {
    const found = users.find(
      (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );

    if (found) {
      setCurrentUsername(found.username);
      return { success: true };
    }
    return { success: false, message: 'Tên đăng nhập hoặc mật khẩu chưa đúng!' };
  };

  const handleRegister = (username, password, avatar) => {
    const exists = users.some(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    );

    if (exists) {
      return { success: false, message: 'Tên đăng nhập này đã tồn tại! Vui lòng chọn tên khác.' };
    }

    const newUser = {
      username,
      password,
      avatar: avatar || '👧',
      stars: 20,
      badges: ['slip_knot_master'],
      completedLessons: [],
      quizStats: { stage: 'mam', streak: 0 }
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUsername(username);
    return { success: true };
  };

  const handleLogout = () => {
    setCurrentUsername(null);
    setIsAuthModalOpen(false);
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
          currentUser={currentUser}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
        />

        {/* Authentication Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          currentUser={currentUser}
          onLogin={handleLogin}
          onRegister={handleRegister}
          onLogout={handleLogout}
        />

        {/* Main Content Area */}
        <main className="flex-grow">
          
          {/* Progress Dashboard */}
          {activeTab === 'progress' && (
            <ProgressDashboard
              currentUser={currentUser}
              completedLessons={completedLessons}
              quizStats={quizStats}
              onNavigateTab={(tabId) => setActiveTab(tabId)}
            />
          )}

          {/* Tab Router */}
          {activeTab === 'level1_lessons' && (
            <Level1Lessons
              onAddStars={handleAddStars}
              onUnlockBadge={handleUnlockBadge}
              onCompleteLesson={handleCompleteLesson}
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
              onCompleteLesson={handleCompleteLesson}
            />
          )}

          {activeTab === 'level1_quiz' && (
            <Level1Quiz
              onAddStars={handleAddStars}
              onUnlockBadge={handleUnlockBadge}
              quizStats={quizStats}
              onUpdateQuizStats={handleUpdateQuizStats}
            />
          )}

          {activeTab === 'level2_sheet_lessons' && (
            <Level2SheetLessons
              onAddStars={handleAddStars}
              onUnlockBadge={handleUnlockBadge}
              onCompleteLesson={handleCompleteLesson}
            />
          )}

          {activeTab === 'level2_lessons' && (
            <Level2Lessons
              onAddStars={handleAddStars}
              onUnlockBadge={handleUnlockBadge}
              onCompleteLesson={handleCompleteLesson}
            />
          )}

          {activeTab === 'level2_projects_2d' && (
            <Level2Projects2D
              onAddStars={handleAddStars}
              onUnlockBadge={handleUnlockBadge}
              onCompleteLesson={handleCompleteLesson}
            />
          )}

          {activeTab === 'level4_granny_lessons' && (
            <Level4GrannyLessons
              onAddStars={handleAddStars}
              onUnlockBadge={handleUnlockBadge}
              onCompleteLesson={handleCompleteLesson}
            />
          )}

          {activeTab === 'level5_bag_lessons' && (
            <Level5BagLessons
              onAddStars={handleAddStars}
              onUnlockBadge={handleUnlockBadge}
              onCompleteLesson={handleCompleteLesson}
            />
          )}

          {activeTab === 'level6_stitch_lessons' && (
            <Level6StitchLessons
              onAddStars={handleAddStars}
              onUnlockBadge={handleUnlockBadge}
              onCompleteLesson={handleCompleteLesson}
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
