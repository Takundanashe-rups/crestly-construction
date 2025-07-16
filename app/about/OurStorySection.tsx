'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FaUsers, FaBuilding, FaHandshake } from 'react-icons/fa';

export default function OurStorySection() {
  const [isClient, setIsClient] = useState(false);
  const [storyCardVisible, setStoryCardVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [elementVisibility, setElementVisibility] = useState({
    title: false,
    foundedSection: false,
    firstParagraph: false,
    teamSection: false,
    secondParagraph: false,
    partnershipSection: false,
    thirdParagraph: false,
    quote: false
  });

  const sectionRef = useRef<HTMLElement>(null);
  const storyCardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent flash by ensuring client-side rendering
    setIsClient(true);

    // Enhanced scroll animation observer
    const initTimer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target === storyCardRef.current) {
              setStoryCardVisible(entry.isIntersecting);
              if (entry.isIntersecting) {
                // Staggered element animations
                setTimeout(() => setElementVisibility(prev => ({ ...prev, title: true })), 200);
                setTimeout(() => setElementVisibility(prev => ({ ...prev, foundedSection: true })), 400);
                setTimeout(() => setElementVisibility(prev => ({ ...prev, firstParagraph: true })), 600);
                setTimeout(() => setElementVisibility(prev => ({ ...prev, teamSection: true })), 800);
                setTimeout(() => setElementVisibility(prev => ({ ...prev, secondParagraph: true })), 1000);
                setTimeout(() => setElementVisibility(prev => ({ ...prev, partnershipSection: true })), 1200);
                setTimeout(() => setElementVisibility(prev => ({ ...prev, thirdParagraph: true })), 1400);
                setTimeout(() => setElementVisibility(prev => ({ ...prev, quote: true })), 1600);
              }
            } else if (entry.target === imageRef.current) {
              setImageVisible(entry.isIntersecting);
            }
          });
        },
        {
          threshold: [0.1, 0.3, 0.5],
          rootMargin: '-50px 0px -50px 0px'
        }
      );

      // Observe story card and image
      if (storyCardRef.current) {
        observer.observe(storyCardRef.current);
      }
      if (imageRef.current) {
        observer.observe(imageRef.current);
      }

      return () => {
        observer.disconnect();
      };
    }, 50);

    return () => {
      clearTimeout(initTimer);
    };
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Prevent flash during SSR
  if (!isClient) {
    return (
      <section className="relative bg-gray-50 py-20 px-6 md:px-16 opacity-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="bg-blue-900 text-white p-10 rounded-3xl shadow-2xl flex flex-col gap-6 relative z-10">
            <div className="h-12 w-48 bg-yellow-300/20 rounded animate-pulse"></div>
          </div>
          <div className="relative w-full h-[320px] sm:h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl border-4 border-yellow-200 bg-gray-200"></div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative bg-gray-50 py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Story Card */}
        <article
          ref={storyCardRef}
          className={`bg-blue-900 text-white p-10 rounded-3xl shadow-2xl flex flex-col gap-6 relative z-10 transition-all duration-1000 ease-out transform ${
            storyCardVisible 
              ? 'opacity-100 translate-x-0 scale-100' 
              : 'opacity-0 -translate-x-12 scale-98'
          }`}
        >
          {/* Title */}
          <h2 className={`text-4xl font-extrabold mb-2 text-yellow-300 tracking-tight transition-all duration-700 ease-out transform ${
            elementVisibility.title ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Our Story
          </h2>

          {/* Founded Section */}
          <div className={`flex items-center gap-4 mb-2 transition-all duration-700 ease-out transform ${
            elementVisibility.foundedSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <FaBuilding className="text-yellow-200 text-2xl" />
            <span className="text-blue-100 text-lg font-semibold">Founded 2022</span>
          </div>

          {/* First Paragraph */}
          <p className={`mb-2 text-lg leading-relaxed text-blue-100 transition-all duration-700 ease-out transform ${
            elementVisibility.firstParagraph ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Crestly Construction emerged during Zimbabwe's construction boom with a clear mission: deliver reliable, skilled execution where the industry lacked consistency.
          </p>

          {/* Team Section */}
          <div className={`flex items-center gap-4 mb-2 transition-all duration-700 ease-out transform ${
            elementVisibility.teamSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <FaUsers className="text-yellow-200 text-2xl" />
            <span className="text-blue-100 text-lg font-semibold">50+ Skilled Professionals</span>
          </div>

          {/* Second Paragraph */}
          <p className={`mb-2 text-lg leading-relaxed text-blue-100 transition-all duration-700 ease-out transform ${
            elementVisibility.secondParagraph ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            From a small workshop with just 3 employees, we've grown into a nationally recognized company specializing in civil engineering, industrial construction, and steel fabrication.
          </p>

          {/* Partnership Section */}
          <div className={`flex items-center gap-4 mb-2 transition-all duration-700 ease-out transform ${
            elementVisibility.partnershipSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <FaHandshake className="text-yellow-200 text-2xl" />
            <span className="text-blue-100 text-lg font-semibold">Trusted Partnerships</span>
          </div>

          {/* Third Paragraph */}
          <p className={`mb-2 text-lg leading-relaxed text-blue-100 transition-all duration-700 ease-out transform ${
            elementVisibility.thirdParagraph ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Our commitment to safety, quality, and timely delivery has earned us partnerships with major corporations and government entities across Zimbabwe.
          </p>

          {/* Quote */}
          <div className={`border-l-4 border-yellow-300 pl-4 mt-4 transition-all duration-700 ease-out transform ${
            elementVisibility.quote ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <p className="text-yellow-100 italic text-base">
              "We don't just build structures; we build lasting relationships and contribute to Zimbabwe's infrastructure development."
            </p>
            <p className="text-sm text-blue-200 mt-2">- Founder, Crestly Construction</p>
          </div>
        </article>

        {/* Image Block */}
        <div
          ref={imageRef}
          className={`relative w-full h-[320px] sm:h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl border-4 border-yellow-200 transition-all duration-1000 ease-out transform ${
            imageVisible 
              ? 'opacity-100 translate-x-0 scale-100 shadow-2xl' 
              : 'opacity-0 translate-x-12 scale-98 shadow-lg'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          {/* Loading shimmer effect */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse"></div>
            </div>
          )}

          {/* Actual Image */}
          <Image
            src="/images/overlay.jpg"
            alt="Crestly Construction team at work on a project site in Zimbabwe"
            fill
            priority
            className={`object-cover w-full h-full transition-all duration-1200 ease-out ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
            onLoad={handleImageLoad}
            onError={handleImageLoad}
          />

          {/* Decorative overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent transition-opacity duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`} />
        </div>
      </div>
    </section>
  );
}