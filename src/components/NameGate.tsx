import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface NameGateProps {
  onSuccess: () => void;
}

const NameGate = ({ onSuccess }: NameGateProps) => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const correctNames = [
    'yesril unjuk ginting',
    'yesril',
    'yesril ginting',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedName = name.toLowerCase().trim();
    
    if (correctNames.includes(normalizedName)) {
      localStorage.setItem('christmas-auth', 'true');
      onSuccess();
    } else {
      setError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10"
    >
      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 left-1/4 text-christmas-gold"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles className="w-8 h-8 animate-twinkle" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-1/4 text-christmas-gold"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles className="w-6 h-6 animate-twinkle" style={{ animationDelay: '1s' }} />
      </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-center mb-12"
      >
        <motion.h1 
          className="font-script text-5xl sm:text-7xl md:text-8xl text-gradient-gold mb-4"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Merry Christmas
        </motion.h1>
        <p className="font-display text-xl sm:text-2xl text-muted-foreground italic">
          A special message awaits...
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className={`relative ${isShaking ? 'animate-shake' : ''}`}
        style={{
          animation: isShaking ? 'shake 0.5s ease-in-out' : 'none',
        }}
      >
        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }
        `}</style>
        
        <div className="bg-card/50 backdrop-blur-md border border-border/50 rounded-2xl p-8 sm:p-10 shadow-2xl">
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-primary"
            >
              <Heart className="w-12 h-12 fill-primary" />
            </motion.div>
          </div>

          <p className="font-display text-lg text-center text-muted-foreground mb-6">
            Enter your name to unlock
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name..."
              className="w-full px-6 py-4 bg-input/50 border border-border/50 rounded-xl font-display text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all duration-300"
            />
            
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-primary to-christmas-burgundy text-primary-foreground font-display text-lg rounded-xl glow-red transition-all duration-300 hover:opacity-90"
            >
              Reveal My Gift
            </motion.button>
          </form>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-primary font-display text-center mt-4"
              >
                Hmm, that's not right... Try again! 💕
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="font-display text-sm text-muted-foreground mt-8 text-center"
      >
        ✨ This greeting is specially made for someone very special ✨
      </motion.p>
    </motion.div>
  );
};

export default NameGate;
