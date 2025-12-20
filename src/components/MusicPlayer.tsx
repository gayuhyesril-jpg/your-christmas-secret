import { motion } from 'framer-motion';

interface MusicPlayerProps {
  playlistId?: string;
}

const MusicPlayer = ({ playlistId = "37i9dQZF1DX0Yxoavh5qJV" }: MusicPlayerProps) => {
  // Default is Spotify's Christmas Hits playlist
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-t border-white/10"
    >
      <iframe
        src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0&autoplay=1`}
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="eager"
        className="rounded-none"
      />
    </motion.div>
  );
};

export default MusicPlayer;
