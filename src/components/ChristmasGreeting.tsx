import { useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { Heart, Star, Sparkles } from 'lucide-react';
import PhotoGallery from './PhotoGallery';

interface ChristmasGreetingProps {
  onLoad?: () => void;
}

const ChristmasGreeting = ({ onLoad }: ChristmasGreetingProps) => {
  useEffect(() => {
    onLoad?.();
  }, [onLoad]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative z-10"
    >
      {/* Floating decorations */}
      <motion.div
        className="absolute top-16 left-8 text-christmas-gold"
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Star className="w-10 h-10 fill-christmas-gold" />
      </motion.div>
      <motion.div
        className="absolute top-24 right-12 text-christmas-gold"
        animate={{ y: [0, -10, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <Sparkles className="w-8 h-8" />
      </motion.div>
      <motion.div
        className="absolute bottom-24 left-12 text-primary"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Heart className="w-8 h-8 fill-primary" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-8 text-christmas-gold"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Star className="w-6 h-6 fill-christmas-gold" />
      </motion.div>

      {/* Main content */}
      <motion.div
        variants={itemVariants}
        className="text-center mb-8"
      >
        <motion.h1 
          className="font-script text-6xl sm:text-7xl md:text-9xl text-gradient-gold mb-2"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          Merry Christmas
        </motion.h1>
        <motion.div
          className="flex items-center justify-center gap-3 mt-4"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Star className="w-5 h-5 text-christmas-gold fill-christmas-gold" />
          <span className="font-display text-2xl sm:text-3xl text-christmas-gold">2025</span>
          <Star className="w-5 h-5 text-christmas-gold fill-christmas-gold" />
        </motion.div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="text-center mb-10"
      >
        <p className="font-display text-xl sm:text-2xl text-muted-foreground">To my dearest</p>
        <motion.h2 
          className="font-script text-4xl sm:text-5xl md:text-6xl text-foreground mt-2"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        >
          Yesril Unjuk Ginting
        </motion.h2>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-card/40 backdrop-blur-md border border-border/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
          
          <motion.div
            className="flex justify-center mb-8"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart className="w-16 h-16 text-primary fill-primary" />
          </motion.div>

          <p className="font-display text-lg sm:text-xl md:text-2xl text-foreground/90 leading-relaxed text-center whitespace-pre-line">
            Hi my love, Merry Christmas.
            {'\n\n'}
            I hope happiness always comes to you like how happy I am for the year that we have been through together. I'm so proud of you babe in every part of your journey this year.
            {'\n\n'}
            Even it feels like so fast but we made a lot of memories together. I'll remember it forever how grateful I am to be with you.
            {'\n\n'}
            <span className="text-christmas-gold font-semibold">I love you.</span>
          </p>

          <motion.div
            className="mt-10 flex flex-col items-center"
            variants={itemVariants}
          >
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-christmas-gold to-transparent mb-6" />
            <p className="font-display text-muted-foreground text-lg">With all my heart,</p>
            <p className="font-script text-4xl sm:text-5xl text-gradient-gold mt-2">
              Gayuh
            </p>
            <p className="font-display text-sm text-muted-foreground mt-3 italic">
              Akbara Jati Gayuh Risangaji
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Photo Gallery Section */}
      <PhotoGallery />

      <motion.div
        variants={itemVariants}
        className="mt-12 flex items-center gap-2"
      >
        <Heart className="w-4 h-4 text-primary fill-primary animate-heartbeat" />
        <span className="font-display text-muted-foreground">Made with love</span>
        <Heart className="w-4 h-4 text-primary fill-primary animate-heartbeat" style={{ animationDelay: '0.5s' }} />
      </motion.div>
    </motion.div>
  );
};

export default ChristmasGreeting;
