"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const WhyWorkWithUs = () => {
  const [isClient, setIsClient] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [servicesVisible, setServicesVisible] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  const services = [
    'Housing Development',
    'Infrastructure Construction', 
    'Commercial Properties',
    'Project Management',
  ];

  useEffect(() => {
    // Prevent flash by ensuring client-side rendering
    setIsClient(true);
    
    // Initialize services visibility state
    setServicesVisible(new Array(services.length).fill(false));

    // Enhanced scroll animation observer
    const initTimer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target === sectionRef.current) {
              setSectionVisible(entry.isIntersecting);
            } else if (entry.target === contentRef.current) {
              if (entry.isIntersecting) {
                setTimeout(() => setContentVisible(true), 200);
              }
            } else {
              // Handle individual service visibility
              const index = serviceRefs.current.indexOf(entry.target as HTMLDivElement);
              if (index !== -1) {
                setServicesVisible(prev => {
                  const newState = [...prev];
                  newState[index] = entry.isIntersecting;
                  return newState;
                });
              }
            }
          });
        },
        {
          threshold: [0.1, 0.3, 0.5],
          rootMargin: '-50px 0px -50px 0px'
        }
      );

      // Observe section
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      // Observe content area
      if (contentRef.current) {
        observer.observe(contentRef.current);
      }

      // Observe individual services
      serviceRefs.current.forEach((ref) => {
        if (ref) {
          observer.observe(ref);
        }
      });

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
      <section className="w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 opacity-100">
        <div className="max-w-7xl mx-auto shadow-xl bg-white min-h-[600px]">
          <div className="bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 h-full"></div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className={`max-w-7xl mx-auto shadow-2xl overflow-hidden bg-white transition-all duration-1000 ease-out transform ${
        sectionVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-98'
      }`}>
        <div className="flex flex-col lg:flex-row items-stretch group">
          
          {/* Left Side: Image + Text Overlay with Enhanced Animation */}
          <div className={`relative w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-auto min-h-[400px] overflow-hidden transition-all duration-1000 ease-out ${
            sectionVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            
            {/* Loading shimmer effect */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
              </div>
            )}

            <Image
              src="/images/projects.webp"
              alt="Work with us image"
              fill
              className={`object-cover transition-all duration-1200 ease-out group-hover:scale-105 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
              }`}
              onLoad={() => setImageLoaded(true)}
              quality={85}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
            />

            {/* Enhanced Overlay with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50 group-hover:from-black/30 group-hover:via-black/20 group-hover:to-black/40 transition-all duration-500" />

            {/* Overlay Text with Staggered Animation */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-6 text-center">
              <h3 className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide leading-tight transition-all duration-1000 ease-out transform ${
                sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '300ms' }}>
                WORK <br className="hidden sm:block" /> WITH US
              </h3>
              <div className={`w-16 h-1 bg-white mt-4 transition-all duration-800 ease-out ${
                sectionVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}
              style={{ transitionDelay: '600ms' }} />
            </div>
          </div>

          {/* Right Side: Content with Enhanced Animations */}
          <div 
            ref={contentRef}
            className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-14 xl:p-16 flex flex-col justify-center bg-white relative hover:bg-gradient-to-br hover:from-white hover:via-blue-50/30 hover:to-amber-50/30 transition-all duration-500"
          >
            
            {/* Enhanced Decorative Grid */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#A5852A" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>

            <div className="relative z-10">
              {/* Badge with Animation */}
              <div className={`inline-flex items-center gap-2 mb-4 transition-all duration-700 ease-out ${
                contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
              style={{ transitionDelay: '200ms' }}>
                <div className="w-8 h-[2px] bg-amber-500 group-hover:w-12 transition-all duration-300" />
                <span className="text-amber-600 font-semibold tracking-wider text-xs sm:text-sm uppercase group-hover:text-amber-700 transition-colors duration-300">
                  EST. 2022
                </span>
              </div>

              {/* Title with Staggered Animation */}
              <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4 transition-all duration-700 ease-out ${
                contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '400ms' }}>
                Solving Housing Challenges
                <span className="block text-amber-600 group-hover:text-amber-700 transition-colors duration-300">With Lasting Impact</span>
              </h2>

              {/* Description with Enhanced Animation */}
              <p className={`text-gray-600 text-base sm:text-lg mb-6 group-hover:text-gray-700 transition-all duration-700 ease-out ${
                contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '600ms' }}>
                We offer a comprehensive spectrum of construction services with specialized focus on
                <span className="font-medium text-gray-800 group-hover:text-blue-700 transition-colors duration-300"> housing development</span>,
                <span className="font-medium text-gray-800 group-hover:text-blue-700 transition-colors duration-300"> infrastructure construction</span>, and
                <span className="font-medium text-gray-800 group-hover:text-blue-700 transition-colors duration-300"> project management</span>.
              </p>

              {/* Services Grid with Individual Animations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 mb-6">
                {services.map((item, i) => (
                  <div 
                    key={i}
                    ref={(el) => { serviceRefs.current[i] = el; }}
                    className={`flex items-center gap-2 text-gray-700 text-sm sm:text-base hover:text-gray-900 hover:translate-x-2 transition-all duration-700 ease-out cursor-pointer ${
                      servicesVisible[i] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
                    }`}
                    style={{ transitionDelay: `${i * 100 + 800}ms` }}
                  >
                    <span className="w-2 h-2 bg-amber-600 group-hover:bg-blue-500 transition-colors duration-300 group-hover:shadow-lg group-hover:shadow-blue-200" />
                    <span className="group-hover:font-medium transition-all duration-300">{item}</span>
                  </div>
                ))}
              </div>

              {/*  CTA Button with  Animation */}
                            <div className={`transition-all duration-700 ease-out ${
                contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '1200ms' }}>
                <Link href="/about">
                  <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold px-6 py-3 transition-all duration-300 hover:shadow-xl hover:shadow-amber-200 hover:-translate-y-1 transform">
                    Learn More About Us
                    <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </button>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithUs;