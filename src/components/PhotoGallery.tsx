import { motion, Variants } from 'framer-motion';
import { Heart, Camera } from 'lucide-react';

const PhotoGallery = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const photos = [
    { id: 1, src: '/1.jpeg', caption: 'I love taking photobooth' },
    { id: 2, src: '/2.jpeg', caption: 'Another photobooth' },
    { id: 3, src: '/3.jpeg', caption: 'Couple goals yeay' },
    { id: 4, src: '/4.jpeg', caption: 'Another photobooth' },
    { id: 5, src: '/5.jpeg', caption: 'Im happy as much as you happy' },
    { id: 6, src: '/6.jpeg', caption: 'Beauty in every moment' },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl mx-auto mt-16 px-4"
    >
      {/* Section title */}
      <motion.div variants={itemVariants} className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-christmas-gold" />
          <Camera className="w-6 h-6 text-christmas-gold" />
          <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-christmas-gold" />
        </div>
        <h3 className="font-script text-4xl sm:text-5xl text-gradient-gold">
          Our Memories
        </h3>
        <p className="font-display text-muted-foreground mt-2">
          Moments we cherish forever
        </p>
      </motion.div>

      {/* Photo grid */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
        variants={containerVariants}
      >
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            variants={itemVariants}
            whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
            className="group relative aspect-square rounded-2xl overflow-hidden bg-card/30 backdrop-blur-sm border border-border/30 shadow-xl cursor-pointer"
          >
            <img
              src={photo.src}
              alt={photo.caption}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Hover overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-christmas-dark/90 via-christmas-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
            >
              <div className="w-full text-center">
                <p className="font-display text-sm sm:text-base text-foreground">
                  {photo.caption}
                </p>
                <div className="flex justify-center mt-2">
                  <Heart className="w-4 h-4 text-primary fill-primary animate-heartbeat" />
                </div>
              </div>
            </motion.div>

            {/* Decorative corner */}
            <div className="absolute top-2 right-2 opacity-50 group-hover:opacity-100 transition-opacity">
              <Heart className="w-4 h-4 text-christmas-gold fill-christmas-gold" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default PhotoGallery;
