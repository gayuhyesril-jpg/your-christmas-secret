import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift } from 'lucide-react';

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
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
        className={isShaking ? 'animate-shake' : ''}
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
        
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 max-w-md w-full border border-gray-100">
          <div className="text-center mb-8">
            <Gift className="w-12 h-12 mx-auto mb-4 text-christmas-gold" />
            <h1 className="text-2xl sm:text-3xl font-serif text-gray-800 font-medium">
              Enter your name to unlock gift
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name..."
              className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-christmas-gold/50 focus:border-christmas-gold transition-all text-gray-700 placeholder:text-gray-400 text-lg"
            />
            
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-sm text-center"
                >
                  Hmm, that's not right... Try again!
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-christmas-gold text-white font-medium text-lg hover:bg-christmas-gold/90 transition-colors"
            >
              Unlock
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default NameGate;
