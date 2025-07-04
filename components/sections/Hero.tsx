'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import Image from 'next/image';

const backgroundImages: string[] = [
  '/images/back-1.jpg',
  '/images/back-2.jpg',
  '/images/back-3.jpg',
  '/images/back-5.jpg',
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const FADE_DURATION = 800; // Reduced for better mobile performance
  const INTERVAL = 8000; // Slightly longer for mobile users

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Preload images with mobile optimization
  useEffect(() => {
    if (isMobile) {
      // Only preload current and next image on mobile
      const currentImg = new window.Image();
      currentImg.src = backgroundImages[currentIndex];
      const nextImg = new window.Image();
      nextImg.src = backgroundImages[(currentIndex + 1) % backgroundImages.length];
    } else {
      // Preload all images on desktop
      backgroundImages.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    }
    setHasMounted(true);
  }, [isMobile, currentIndex]);

  // Slide interval logic with mobile optimization
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
    <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen min-h-[500px] sm:min-h-[600px] w-full overflow-hidden flex items-center justify-center">
      
      {/* Background Slider */}
      <div className="absolute inset-0">
  <AnimatePresence initial={false}>
    {backgroundImages.map((src, idx) => (
      idx === currentIndex && (
        <motion.div
          key={src}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_DURATION / 1000, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <Image
            src={src}
            alt="Crestly Construction Hero Background"
            fill
            priority={idx === 0}
            className="object-cover object-center z-0 select-none pointer-events-none"
            quality={isMobile ? 60 : 85}
            sizes="100vw"
            draggable={false}
          />
        </motion.div>
      )
    ))}
  </AnimatePresence>
</div>

      {/* Lighter Overlay for Mobile */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 md:from-black/60 md:via-black/40 md:to-black/60 lg:from-black/70 lg:via-black/50 lg:to-black/70" />

      {/* Content */}
      <div className="relative z-10 text-white flex flex-col items-center justify-center h-full px-4 sm:px-6 md:px-8 text-center">
        <div className="max-w-4xl px-2 sm:px-4">
          <motion.h1
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight break-words"
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Building Dreams, Crafting Realities
          </motion.h1>

          <motion.div
            className="text-sm sm:text-lg md:text-xl lg:text-2xl font-light min-h-[2rem] sm:min-h-[2.5rem] mb-4 sm:mb-6"
            style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
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
              typeSpeed={isMobile ? 80 : 60} // Faster typing on mobile
              deleteSpeed={isMobile ? 60 : 40}
              delaySpeed={isMobile ? 2000 : 2500} // Shorter delay on mobile
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <button
              className="bg-amber-600 hover:bg-amber-700 active:bg-amber-800 transition-colors duration-200 text-white font-medium py-2 px-5 sm:py-2.5 sm:px-6 md:py-3 md:px-8 rounded-md shadow-lg text-sm sm:text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transform hover:scale-105 active:scale-95 transition-transform"
              aria-label="Explore Our Projects"
            >
              Explore Our Projects
            </button>
          </motion.div>
        </div>
      </div>

      {/* Slide Dots - Hidden on very small screens */}
      <div className="absolute bottom-3 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-1.5 sm:space-x-2 hidden xs:flex">
        {backgroundImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
              currentIndex === idx
                ? 'bg-amber-500 scale-125 shadow-lg'
                : 'bg-white/60 hover:bg-white/90 active:bg-white'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
