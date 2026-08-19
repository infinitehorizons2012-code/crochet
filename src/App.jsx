import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StitchWorkshop from './components/StitchWorkshop';
import ProjectCatalog from './components/ProjectCatalog';
import YarnMixer from './components/YarnMixer';
import AchievementBadges from './components/AchievementBadges';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('workshop');
  const [isMuted, setIsMuted] = useState(false);

  // Load state from localStorage or default
  const [stars, setStars] = useState(() => {
    const saved = localStorage.getItem('crochet_kids_stars');
    return saved ? parseInt(saved, 10) : 20; // 20 starter stars
  });

  const [badges, setBadges] = useState(() => {
    const saved = localStorage.getItem('crochet_kids_badges');
    return saved ? JSON.parse(saved) : ['slip_knot_master'];
  });

  useEffect(() => {
    localStorage.setItem('crochet_kids_stars', stars.toString());
  }, [stars]);

  useEffect(() => {
    localStorage.setItem('crochet_kids_badges', JSON.stringify(badges));
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
        
        {/* Welcome Hero Banner (Shows on workshop tab) */}
        {activeTab === 'workshop' && (
          <Hero
            onStartLearning={() => setActiveTab('workshop')}
            onExploreProjects={() => setActiveTab('projects')}
          />
        )}

        {/* Tab Router */}
        {activeTab === 'workshop' && (
          <StitchWorkshop
            onAddStars={handleAddStars}
            onUnlockBadge={handleUnlockBadge}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectCatalog
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

        {activeTab === 'badges' && (
          <AchievementBadges
            badges={badges}
            stars={stars}
          />
        )}

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
