'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import Image from 'next/image';
import ErrorBoundary from '@/components/ErrorBoundary';

const backgroundImages: string[] = [
  '/images/back-5.jpg',
  '/images/back-2.jpg',
  '/images/back-3.jpg',
  '/images/back-1.jpg',
];

const HeroWithBoundary = () => (
  <ErrorBoundary>
    <Hero />
  </ErrorBoundary>
);

export default HeroWithBoundary;

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const INTERVAL = 15000;
  const TRANSITION_DURATION = 1000;

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Centralized interval function
  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setNextIndex((nextIndex + 1) % backgroundImages.length);
        setIsTransitioning(false);
      }, TRANSITION_DURATION);
    }, INTERVAL);
  };

  // Auto-slide functionality
  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [nextIndex]);

  const handleDotClick = (index: number) => {
    if (index === currentIndex || isTransitioning) return;
    
    setNextIndex(index);
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentIndex(index);
      setNextIndex((index + 1) % backgroundImages.length);
      setIsTransitioning(false);
      startInterval(); // Restart interval
    }, TRANSITION_DURATION);
  };

  return (
    <section className="relative h-[60vh] sm:h-[70vh] md:h-[60vh] lg:h-[60vh] min-h-[320px] sm:min-h-[400px] max-h-[600px] w-full overflow-hidden">
      
      {/* Background with smooth crossfade */}
      <div className="absolute inset-0 z-0">
        {/* Fallback background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900" />
        
        {/* Current Image (base layer) */}
        <div className="absolute inset-0">
          <Image
            src={backgroundImages[currentIndex]}
            alt="Hero background"
            fill
            className="object-cover object-center"
            quality={isMobile ? 60 : 85}
            sizes="100vw"
            priority
          />
        </div>
        
        {/* Next Image (overlay layer that fades in) */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            isTransitioning ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={backgroundImages[nextIndex]}
            alt="Next hero background"
            fill
            className="object-cover object-center"
            quality={isMobile ? 60 : 85}
            sizes="100vw"
          />
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-5 bg-gradient-to-b from-black/40 via-black/30 to-black/50 md:from-black/60 md:via-black/40 md:to-black/60 lg:from-black/70 lg:via-black/50 lg:to-black/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-3 sm:px-4 md:px-6 lg:px-12">
        <div className="max-w-4xl w-full text-center">
          {/* Subtitle */}
          <motion.div 
            className="text-blue-100 text-xs sm:text-sm mb-2 sm:mb-4 font-semibold tracking-wider uppercase"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            &raquo; Welcome to Crestly Construction
          </motion.div>

          <motion.h1
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-2 sm:mb-4"
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Building Dreams, <br className="block sm:hidden" />Crafting Realities
          </motion.h1>

          <motion.div
            className="text-base xs:text-lg sm:text-xl text-blue-100 mt-2 sm:mt-6 leading-relaxed"
            style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
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
              typeSpeed={isMobile ? 80 : 60}
              deleteSpeed={isMobile ? 60 : 40}
              delaySpeed={isMobile ? 2000 : 2500}
            />
          </motion.div>
        </div>
      </div>

      {/* Slide Dots */}
      <div className="absolute bottom-3 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2 sm:space-x-2.5">
        {backgroundImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            disabled={isTransitioning}
            className={`transition-all duration-300 ease-out focus:outline-none disabled:cursor-not-allowed ${
              currentIndex === idx
                ? 'w-5 sm:w-6 md:w-7 h-2 sm:h-2.5 md:h-3 bg-white rounded-full shadow-lg border border-white/20 backdrop-blur-sm'
                : 'w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3 bg-white/40 hover:bg-white/70 active:bg-white/90 rounded-full backdrop-blur-sm hover:scale-110'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
