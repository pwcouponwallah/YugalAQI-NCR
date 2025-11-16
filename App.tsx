
import React, { useState, useEffect, useCallback } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Report from './components/Report';
import Track from './components/Track';
import MapView from './components/MapView';
import Profile from './components/Profile';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import type { User, NavItem } from './types';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeNav, setActiveNav] = useState<NavItem>('dashboard');

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setActiveNav('dashboard');
  };

  const renderContent = () => {
    switch (activeNav) {
      case 'dashboard':
        return <Dashboard />;
      case 'report':
        return <Report />;
      case 'track':
        return currentUser ? <Track userId={currentUser.userID} /> : null;
      case 'map':
        return <MapView />;
      case 'profile':
        return currentUser ? <Profile user={currentUser} onLogout={handleLogout} /> : null;
      default:
        return <Dashboard />;
    }
  };

  if (!currentUser) {
    return <Auth onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header user={currentUser} />
      <main className="flex-grow pt-16 pb-20 overflow-y-auto">
        <div className="p-4 md:p-6 lg:p-8">
          {renderContent()}
        </div>
      </main>
      <BottomNav activeNav={activeNav} setActiveNav={setActiveNav} />
    </div>
  );
};

export default App;
