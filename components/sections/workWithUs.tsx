'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const WhyWorkWithUs = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const services = [
    'Housing Development',
    'Infrastructure Construction', 
    'Commercial Properties',
    'Project Management',
  ];

  if (!hasMounted) {
    return (
      <section className="w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto rounded-2xl shadow-xl bg-white min-h-[600px] animate-pulse" />
      </section>
    );
  }

  return (
    <section className="w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto rounded-2xl lg:rounded-3xl shadow-xl overflow-hidden bg-white">
        <div className="flex flex-col lg:flex-row items-stretch">
          
          {/* Left Side: Image + Text Overlay */}
          <div className="relative w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-auto min-h-[400px]">
            <Image
              src="/images/projects.webp"
              alt="Work with us image"
              fill
              className={`object-cover transition-opacity duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              quality={85}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Overlay Text */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-6 text-center">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide leading-tight">
                WORK <br className="hidden sm:block" /> WITH US
              </h3>
              <div className="w-16 h-1 bg-white mt-4 rounded-full" />
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-14 xl:p-16 flex flex-col justify-center bg-white relative">
            
            {/* Decorative Grid - Simplified */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
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
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-8 h-[2px] bg-amber-500" />
                <span className="text-amber-600 font-semibold tracking-wider text-xs sm:text-sm uppercase">
                  EST. 2022
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                Solving Housing Challenges
                <span className="block text-amber-600">With Lasting Impact</span>
              </h2>

              <p className="text-gray-600 text-base sm:text-lg mb-6">
                We offer a comprehensive spectrum of construction services with specialized focus on
                <span className="font-medium text-gray-800"> housing development</span>,
                <span className="font-medium text-gray-800"> infrastructure construction</span>, and
                <span className="font-medium text-gray-800"> project management</span>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 mb-6">
                {services.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                    <span className="w-2 h-2 bg-amber-600 rounded-full" />
                    {item}
                  </div>
                ))}
              </div>
               
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithUs;
