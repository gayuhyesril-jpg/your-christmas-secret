import { useMemo } from 'react';
import { motion } from 'framer-motion';

const STAR_COUNT = 38;
const SLOW_FLAKES = 42;
const BULBS = 14;

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const FestiveOverlay = () => {
  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, (_, id) => ({
        id,
        top: randomBetween(2, 90),
        left: randomBetween(2, 98),
        size: randomBetween(1.5, 3.2),
        delay: randomBetween(0, 2),
        duration: randomBetween(1.8, 3.4),
      })),
    []
  );

  const slowFlakes = useMemo(
    () =>
      Array.from({ length: SLOW_FLAKES }, (_, id) => ({
        id,
        left: randomBetween(0, 100),
        size: randomBetween(2, 5),
        duration: randomBetween(12, 20),
        delay: randomBetween(0, 8),
        opacity: randomBetween(0.25, 0.6),
      })),
    []
  );

  const bulbs = useMemo(
    () =>
      Array.from({ length: BULBS }, (_, id) => ({
        id,
        offset: (id / (BULBS - 1)) * 100,
        hue: 20 + (id % 4) * 25,
        delay: randomBetween(0, 1.5),
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {/* Twinkling stars */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-white/80 animate-twinkle"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
              boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,0.7)`,
            }}
          />
        ))}
      </div>

      {/* Extra slow snow layer */}
      <div className="absolute inset-0 overflow-hidden">
        {slowFlakes.map((flake) => (
          <div
            key={flake.id}
            className="absolute rounded-full bg-white/70 animate-snowfall"
            style={{
              left: `${flake.left}%`,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              opacity: flake.opacity,
              animationDuration: `${flake.duration}s`,
              animationDelay: `${flake.delay}s`,
              filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.3))',
            }}
          />
        ))}
      </div>

      {/* String lights across the top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-28 z-20">
        <motion.svg
          viewBox="0 0 1200 200"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full text-christmas-gold/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <path
            d="M50 40 Q 200 120 400 60 T 800 80 T 1150 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeOpacity="0.4"
          />
          {bulbs.map((bulb) => (
            <motion.circle
              key={bulb.id}
              cx={50 + (1100 * bulb.offset) / 100}
              cy={60 + Math.sin((bulb.offset / 100) * Math.PI * 2) * 18}
              r={12}
              fill={`hsl(${bulb.hue} 80% 60%)`}
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="3"
              initial={{ opacity: 0.4 }}
              animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.05, 1] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: bulb.delay,
                ease: 'easeInOut',
              }}
              filter="url(#bulb-glow)"
            />
          ))}
          <defs>
            <filter id="bulb-glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </motion.svg>
      </div>
    </div>
  );
};

export default FestiveOverlay;
