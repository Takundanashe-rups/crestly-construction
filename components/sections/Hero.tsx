'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

const backgroundImages = [
  '/images/back-1.jpg',
  '/images/back-2.jpg',
  '/images/back-3.jpg',
  '/images/back-5.jpg',
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const FADE_DURATION = 1000;
  const INTERVAL = 7000;

  // Preload images once
  useEffect(() => {
    backgroundImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    setHasMounted(true);
  }, []);

  // Slide interval logic
  useEffect(() => {
    if (!hasMounted) return undefined;

    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
          setIsTransitioning(false);
        }, FADE_DURATION);
      }, INTERVAL);
    };

    startInterval();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [hasMounted]);

  const handleDotClick = (index: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrentIndex(index);
  };

  if (!hasMounted) return null;

  return (
    <section className="relative min-h-[80vh] h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Slider */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImages[currentIndex]})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: FADE_DURATION / 1000 }}
            aria-hidden="true"
          />
        </AnimatePresence>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-0" />

      {/* Content */}
      <div className="relative z-10 text-white flex flex-col items-center justify-center h-full px-4 sm:px-8 text-center">
        <div className="max-w-4xl px-2 sm:px-4">
          <motion.h1
            className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight break-words"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Building Dreams, Crafting Realities
          </motion.h1>

          <motion.div
            className="text-base sm:text-xl md:text-2xl font-light min-h-[2.5rem] mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Typewriter
              words={[
                'Innovative Construction Solutions',
                'Premium Quality Craftsmanship',
                'Timely Project Delivery',
                'Sustainable Building Practices',
              ]}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={2500}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <button
              className="bg-amber-600 hover:bg-amber-700 transition-colors text-white font-medium py-2.5 px-6 sm:py-3 sm:px-8 rounded-md shadow-lg text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              aria-label="Explore Our Projects"
            >
              Explore Our Projects
            </button>
          </motion.div>
        </div>
      </div>

      {/* Slide Dots */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
        {backgroundImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 ${
              currentIndex === idx
                ? 'bg-amber-500 scale-125'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
