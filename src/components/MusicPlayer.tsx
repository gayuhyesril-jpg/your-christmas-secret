import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';

interface MusicPlayerProps {
  /** When true, attempt to start playback */
  autoPlay?: boolean;
  /** Optional override for the track source */
  src?: string;
}

const DEFAULT_TRACK = '/Wham! - Last Christmas (Official Video).mp3';

const MusicPlayer = ({ autoPlay = false, src = DEFAULT_TRACK }: MusicPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.7;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !autoPlay) return;

    audio.play().catch(() => {
      // Autoplay might be blocked; user can tap play.
    });
  }, [autoPlay]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.1, duration: 0.7, ease: "easeOut" }}
      className="fixed bottom-4 right-4 z-50 w-[clamp(260px,40vw,360px)] rounded-2xl bg-black/80 backdrop-blur-lg border border-white/10 shadow-2xl shadow-black/40"
    >
      <div className="flex items-center gap-4 px-4 py-3 text-white">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-christmas-burgundy to-primary shadow-inner shadow-primary/30">
          <button
            type="button"
            onClick={togglePlayback}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-[1px]" />}
          </button>
        </div>

        <div className="flex flex-1 flex-col">
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/60">Now Playing</span>
          <div className="flex flex-wrap items-baseline gap-1">
            <p className="font-display text-lg text-white leading-tight">Last Christmas</p>
            <span className="text-xs text-white/60">• Wham!</span>
          </div>
          <p className="text-[11px] text-white/50">From Gayuh with love</p>
        </div>

        <div className="hidden sm:block text-[10px] text-white/60">Auto plays with the greeting</div>
      </div>

      <audio ref={audioRef} src={src} preload="auto" loop />
    </motion.div>
  );
};

export default MusicPlayer;
