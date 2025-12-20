import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Snowfall from '@/components/Snowfall';
import NameGate from '@/components/NameGate';
import ChristmasGreeting from '@/components/ChristmasGreeting';
import MusicPlayer from '@/components/MusicPlayer';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for previous authentication
    const auth = localStorage.getItem('christmas-auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSuccess = () => {
    setIsAuthenticated(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="font-script text-4xl text-gradient-gold animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <NameGate key="gate" onSuccess={handleSuccess} />
        ) : (
          <div className="min-h-screen bg-background overflow-hidden relative pb-40">
            {/* Background gradient overlay */}
            <div className="fixed inset-0 bg-gradient-to-br from-christmas-burgundy/20 via-background to-christmas-dark pointer-events-none" />
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
            
            {/* Snowfall effect */}
            <Snowfall />
            
            {/* Main content */}
            <ChristmasGreeting key="greeting" />
            
            {/* Music Player */}
            <MusicPlayer />
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
