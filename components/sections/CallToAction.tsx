'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

interface CallToActionProps {
  heading?: string;
  description?: string;
  primaryLinkHref?: string;
  primaryLinkText?: string;
  secondaryLinkHref?: string;
  secondaryLinkText?: string;
  className?: string;
}

const CallToAction: React.FC<CallToActionProps> = ({
  heading = 'Ready to Start Your Next Project?',
  description = `Let's discuss how Crestly Construction can bring your vision to life with our expertise and commitment to excellence.`,
  primaryLinkHref = '/contact',
  primaryLinkText = 'Get Free Quote',
  secondaryLinkHref = '/projects',
  secondaryLinkText = 'View Our Projects',
  className = '',
}) => {
  const [isClient, setIsClient] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [headingVisible, setHeadingVisible] = useState(false);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Prevent flash by ensuring client-side rendering
    setIsClient(true);

    // Enhanced scroll animation observer
    const initTimer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target === sectionRef.current && entry.isIntersecting) {
              setSectionVisible(true);
              
              // Staggered animations
              setTimeout(() => setHeadingVisible(true), 200);
              setTimeout(() => setDescriptionVisible(true), 400);
              setTimeout(() => setButtonsVisible(true), 600);
            }
          });
        },
        {
          threshold: [0.1, 0.3, 0.5],
          rootMargin: '-50px 0px -50px 0px'
        }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => {
        observer.disconnect();
      };
    }, 50);

    return () => {
      clearTimeout(initTimer);
    };
  }, []);

  // Prevent flash during SSR
  if (!isClient) {
    return (
      <section className={`py-16 px-6 md:px-16 opacity-100 ${className}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="h-8 w-80 bg-gray-200 rounded mx-auto mb-4 animate-pulse"></div>
          <div className="space-y-2 mb-8">
            <div className="h-5 w-full bg-gray-100 rounded animate-pulse"></div>
            <div className="h-5 w-3/4 bg-gray-100 rounded mx-auto animate-pulse"></div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="w-full sm:w-auto h-12 bg-yellow-200 rounded-lg animate-pulse"></div>
            <div className="w-full sm:w-auto h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className={`py-16 px-6 md:px-16 ${className}`}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h2 className={`text-3xl font-bold text-gray-900 mb-4 transition-all duration-800 ease-out transform ${
          headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {heading}
        </h2>

        {/* Description */}
        <p className={`text-gray-700 mb-8 text-lg transition-all duration-800 ease-out transform ${
          descriptionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {description}
        </p>

        {/* Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-800 ease-out transform ${
          buttonsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Link 
            href={primaryLinkHref} 
            className="w-full sm:w-auto bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-all duration-200 transform hover:bg-yellow-600 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2"
          >
            {primaryLinkText}
          </Link>
          <Link 
            href={secondaryLinkHref} 
            className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 bg-white/80 px-8 py-3 rounded-lg font-semibold shadow-sm transition-all duration-200 transform hover:bg-gray-100 hover:border-yellow-500 hover:text-yellow-600 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2"
          >
            {secondaryLinkText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;