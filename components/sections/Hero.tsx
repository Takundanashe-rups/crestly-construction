'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import Image from 'next/image';
import ErrorBoundary from '@/components/ErrorBoundary';
import Link from 'next/link';

const backgroundImages: string[] = [
  '/images/back-1.jpg',
  '/images/back-2.jpg',
  '/images/back-3.jpg',
  '/images/back-5.jpg',
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

  // Auto-slide functionality - Fixed TypeScript error
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
    <section className="relative h-[70vh] sm:h-[80vh] md:h-[60vh] lg:h-[60vh] min-h-[400px] max-h-[700px] w-full overflow-hidden flex items-center justify-center">
    
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
      <div className="relative z-10 text-white flex flex-col items-center justify-center h-full px-4 sm:px-6 md:px-8 text-center">
        <div className="max-w-4xl px-2 sm:px-4">
          <motion.h1
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight"
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
              typeSpeed={isMobile ? 80 : 60}
              deleteSpeed={isMobile ? 60 : 40}
              delaySpeed={isMobile ? 2000 : 2500}
            />
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <Link href="/projects">
              <button
                className="bg-amber-600 hover:bg-amber-700 active:bg-amber-800 transition-colors duration-200 text-white font-medium py-2 px-5 sm:py-2.5 sm:px-6 md:py-3 md:px-8 rounded-md shadow-lg text-sm sm:text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transform hover:scale-105 active:scale-95"
                aria-label="Explore Our Projects"
              >
                Explore Our Projects
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Slide Dots */}
      <div className="absolute bottom-3 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden xs:flex space-x-1.5 sm:space-x-2">
        {backgroundImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            disabled={isTransitioning}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:cursor-not-allowed ${
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
