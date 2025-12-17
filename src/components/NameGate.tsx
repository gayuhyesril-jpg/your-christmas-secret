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
  const [isRevealing, setIsRevealing] = useState(false);

  const correctNames = [
    'yesril unjuk ginting',
    'yesril',
    'yesril ginting',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedName = name.toLowerCase().trim();
    
    if (correctNames.includes(normalizedName)) {
      setIsRevealing(true);
      setTimeout(() => {
        localStorage.setItem('christmas-auth', 'true');
        onSuccess();
      }, 2000);
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
      className={`min-h-screen flex flex-col items-center justify-center px-4 relative z-10 transition-all duration-1000 ${
        isRevealing ? '' : 'grayscale'
      }`}
    >
      {/* Decorative elements - hidden until reveal */}
      <motion.div
        className="absolute top-20 left-1/4 text-christmas-gold"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isRevealing ? 1 : 0,
          rotate: isRevealing ? 360 : 0 
        }}
        transition={{ duration: isRevealing ? 1 : 20, repeat: isRevealing ? 0 : Infinity, ease: "linear" }}
      >
        <Sparkles className="w-8 h-8 animate-twinkle" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-1/4 text-christmas-gold"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isRevealing ? 1 : 0,
          rotate: isRevealing ? -360 : 0 
        }}
        transition={{ duration: isRevealing ? 1.2 : 25, repeat: isRevealing ? 0 : Infinity, ease: "linear" }}
      >
        <Sparkles className="w-6 h-6 animate-twinkle" style={{ animationDelay: '1s' }} />
      </motion.div>

      {/* Additional sparkles that appear on reveal */}
      {isRevealing && (
        <>
          <motion.div
            className="absolute top-32 right-1/3 text-christmas-gold"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Sparkles className="w-10 h-10 animate-twinkle" />
          </motion.div>
          <motion.div
            className="absolute bottom-40 left-1/3 text-christmas-gold"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Sparkles className="w-7 h-7 animate-twinkle" />
          </motion.div>
        </>
      )}

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-center mb-12"
      >
        <motion.h1 
          className={`font-script text-5xl sm:text-7xl md:text-8xl mb-4 transition-all duration-1000 ${
            isRevealing ? 'text-gradient-gold' : 'text-muted-foreground/50'
          }`}
          animate={{ scale: isRevealing ? [1, 1.1, 1] : [1, 1.02, 1] }}
          transition={{ duration: isRevealing ? 0.8 : 3, repeat: isRevealing ? 0 : Infinity }}
        >
          Merry Christmas
        </motion.h1>
        <motion.p 
          className={`font-display text-xl sm:text-2xl italic transition-all duration-1000 ${
            isRevealing ? 'text-foreground' : 'text-muted-foreground/30'
          }`}
          animate={{ opacity: isRevealing ? 1 : 0.5 }}
        >
          {isRevealing ? '✨ Welcome, my love! ✨' : 'A special message awaits...'}
        </motion.p>
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
        
        <motion.div 
          className={`backdrop-blur-md border rounded-2xl p-8 sm:p-10 shadow-2xl transition-all duration-1000 ${
            isRevealing 
              ? 'bg-card/50 border-christmas-gold/50 shadow-christmas-gold/20' 
              : 'bg-card/20 border-border/20'
          }`}
          animate={{
            boxShadow: isRevealing 
              ? '0 0 60px rgba(212, 175, 55, 0.4)' 
              : '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ 
                scale: isRevealing ? [1, 1.3, 1] : [1, 1.1, 1],
              }}
              transition={{ duration: isRevealing ? 0.5 : 1.5, repeat: isRevealing ? 2 : Infinity }}
              className={`transition-colors duration-1000 ${
                isRevealing ? 'text-primary' : 'text-muted-foreground/30'
              }`}
            >
              <Heart className={`w-12 h-12 transition-all duration-1000 ${
                isRevealing ? 'fill-primary' : 'fill-muted-foreground/20'
              }`} />
            </motion.div>
          </div>

          <p className={`font-display text-lg text-center mb-6 transition-colors duration-1000 ${
            isRevealing ? 'text-foreground' : 'text-muted-foreground/50'
          }`}>
            {isRevealing ? 'Opening your gift...' : 'Enter your name to unlock'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name..."
              disabled={isRevealing}
              className={`w-full px-6 py-4 rounded-xl font-display text-lg placeholder:text-muted-foreground/30 focus:outline-none transition-all duration-1000 ${
                isRevealing 
                  ? 'bg-primary/20 border-2 border-christmas-gold text-foreground' 
                  : 'bg-input/20 border border-border/20 text-muted-foreground focus:ring-2 focus:ring-muted/30 focus:border-muted/30'
              }`}
            />
            
            <motion.button
              type="submit"
              disabled={isRevealing}
              whileHover={{ scale: isRevealing ? 1 : 1.02 }}
              whileTap={{ scale: isRevealing ? 1 : 0.98 }}
              className={`w-full py-4 font-display text-lg rounded-xl transition-all duration-1000 ${
                isRevealing 
                  ? 'bg-gradient-to-r from-primary to-christmas-burgundy text-primary-foreground glow-red' 
                  : 'bg-muted/30 text-muted-foreground/50 hover:bg-muted/40'
              }`}
            >
              {isRevealing ? '💕 Opening...' : 'Reveal My Gift'}
            </motion.button>
          </form>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-muted-foreground font-display text-center mt-4"
              >
                Hmm, that's not right... Try again!
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: isRevealing ? 1 : 0.3 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className={`font-display text-sm mt-8 text-center transition-colors duration-1000 ${
          isRevealing ? 'text-christmas-gold' : 'text-muted-foreground/30'
        }`}
      >
        {isRevealing ? '✨ Made with all my love for you ✨' : '✨ This greeting is specially made for someone very special ✨'}
      </motion.p>
    </motion.div>
  );
};

export default NameGate;
