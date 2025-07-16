'use client';

import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import Image from 'next/image';
import ErrorBoundary from '@/components/ErrorBoundary';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';

// cn utility
import { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) {
  return twMerge(require('clsx')(inputs));
}

// ImagesSlider component
export const ImagesSlider = React.memo(({
  images,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = 'up',
}: {
  images: string[];
  children: React.ReactNode;
  overlay?: React.ReactNode;
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
  direction?: 'up' | 'down';
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  // Memoize handlers
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  // Preload images only once
  useEffect(() => {
    let isMounted = true;
    const loadPromises = images.map((image) => {
      return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.src = image;
        img.onload = () => resolve(image);
        img.onerror = reject;
      });
    });
    Promise.all(loadPromises)
      .then((loadedImages) => {
        if (isMounted) setLoadedImages(loadedImages as string[]);
      })
      .catch((error) => console.error('Failed to load images', error));
    return () => { isMounted = false; };
  }, [images]);

  // Keyboard and autoplay
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handlePrevious();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    let interval: any;
    if (autoplay) {
      interval = setInterval(() => {
        handleNext();
      }, 9000);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, [autoplay, handleNext, handlePrevious]);

  // Memoize slideVariants
  const slideVariants = useMemo(() => ({
    initial: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.645, 0.045, 0.355, 1.0] as any,
      },
    },
    upExit: {
      opacity: 0,
      transition: {
        duration: 0.7,
      },
    },
    downExit: {
      opacity: 0,
      transition: {
        duration: 0.7,
      },
    },
  }), []);

  const areImagesLoaded = loadedImages.length > 0;

  return (
    <div
      className={cn(
        'overflow-hidden h-full w-full relative flex items-center justify-center',
        className
      )}
      style={{
        perspective: '1000px',
      }}
    >
      {areImagesLoaded && children}
      {areImagesLoaded && overlay && (
        <div
          className={cn('absolute inset-0 bg-black/60 z-40', overlayClassName)}
        />
      )}
      {areImagesLoaded && (
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            initial="initial"
            animate="visible"
            exit={direction === 'up' ? 'upExit' : 'downExit'}
            variants={slideVariants}
            className="image h-full w-full absolute inset-0"
            style={{ position: 'absolute', inset: 0 }}
          >
            <Image
              src={loadedImages[currentIndex]}
              alt=""
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority={currentIndex === 0}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
});

const backgroundImages: string[] = [
  '/images/back-2.jpg',
  '/images/back-3.jpg',
  '/images/back-5.jpg',
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
    <section className="relative h-[60vh] sm:h-[70vh] md:h-[60vh] lg:h-[60vh] min-h-[320px] sm:min-h-[400px] max-h-[600px] w-full overflow-hidden">
      {/* Use ImagesSlider for background */}
      <ImagesSlider images={backgroundImages} autoplay direction="up" className="absolute inset-0 z-0" >
        {/* Overlay */}
        <div className="absolute inset-0 z-5 bg-gradient-to-b from-black/40 via-black/30 to-black/50 md:from-black/60 md:via-black/40 md:to-black/60 lg:from-black/70 lg:via-black/50 lg:to-black/70" />
      </ImagesSlider>
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
