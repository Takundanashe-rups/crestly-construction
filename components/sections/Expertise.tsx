"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Expertise data
const EXPERTISE_CARDS = [
  {
    title: 'Project Consultancy',
    description:
      'We offer comprehensive project consultancy services, guiding you from initial concept to project completion. Our experts ensure effective planning, risk management, and cost control for successful delivery.',
    image: '/images/consultancy.png',
    cta: 'Book Today',
    ctaHref: '/contact',
  },
  {
    title: 'Welding',
    description:
      'Our welding team delivers precision and strength for all your structural and fabrication needs. We use industry-leading techniques and equipment to guarantee safety and durability.',
    image: '/images/wielding.webp',
    cta: 'Read More',
    ctaHref: '/services/boiler-making',
  },
  {
    title: 'Boiler Making',
    description:
      'Our boiler making specialists provide fabrication, installation, and repair of boilers and pressure vessels, ensuring compliance with industry standards and safety regulations.',
    image: '/images/boiler-making-1.jpg', 
    cta: 'Explore Boiler Making',
    ctaHref: '/services/boiler-making',
  },
  {
    title: 'Construction Services',
    description:
      'From residential to commercial projects, our construction services cover every phase with quality workmanship and timely delivery. We build solutions that last.',
    image: '/images/construction-services.webp', 
    cta: 'See Our Work',
    ctaHref: '/services/construction',
  },
];

const Expertise: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const [imageLoaded, setImageLoaded] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Prevent flash by ensuring client-side rendering
    setIsClient(true);
    
    // Initialize visible cards and image loaded state
    setVisibleCards(new Array(EXPERTISE_CARDS.length).fill(false));
    setImageLoaded(new Array(EXPERTISE_CARDS.length).fill(false));

    // Enhanced scroll animation observer
    const initTimer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target === sectionRef.current) {
              if (entry.isIntersecting) {
                // Staggered header animation
                setTimeout(() => setHeaderVisible(true), 150);
              }
            } else {
              // Handle individual card visibility
              const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
              if (index !== -1) {
                setVisibleCards(prev => {
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

      // Observe section for header animation
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      // Observe individual cards
      cardRefs.current.forEach((ref) => {
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

  const handleImageLoad = (index: number) => {
    setImageLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  // Prevent flash during SSR
  if (!isClient) {
    return (
      <section className="w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 opacity-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-gray-900">
            Our Expertise
          </h2>
          <p className="text-center text-gray-700 max-w-2xl mx-auto mb-10 text-base md:text-lg">
            As a locally owned and operated major construction contractor in Zimbabwe, we are dedicated to the construction growth and economic development of our country.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {EXPERTISE_CARDS.map((card) => (
              <div key={card.title} className="bg-white border border-gray-200 h-64">
                <div className="bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 h-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Header */}
        <div className={`text-center mb-10 transition-all duration-1000 ease-out transform ${
          headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
            Our Expertise
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg">
            As a locally owned and operated major construction contractor in Zimbabwe, we are dedicated to the construction growth and economic development of our country.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {EXPERTISE_CARDS.map((card, idx) => (
            <div
              key={card.title}
              ref={(el) => { cardRefs.current[idx] = el; }}
              className={`card-wrapper bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-1000 ease-out flex flex-col h-full transform ${
                visibleCards[idx] 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-12 scale-98'
              }`}
              style={{
                transitionDelay: `${idx * 150 + 300}ms`
              }}
            >
              <div className="flex flex-col md:flex-row h-full">
                {/* Left Image with Enhanced Animation */}
                <div className={`image-section w-full md:w-1/2 h-48 md:h-64 lg:h-auto relative bg-gray-200 overflow-hidden transition-all duration-700 ${
                  visibleCards[idx] ? 'shadow-lg' : 'shadow-sm'
                }`}>
                  {/* Fallback background with loading shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400" />
                  
                  {/* Loading shimmer effect */}
                  {visibleCards[idx] && !imageLoaded[idx] && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse"></div>
                    </div>
                  )}

                  {/* Actual Image with enhanced animation */}
                  {visibleCards[idx] && (
                    <Image
                      src={card.image}
                      alt={`${card.title} service`}
                      fill
                      loading="lazy"
                      className={`object-cover object-center transition-all duration-1000 ease-out hover:scale-105 ${
                        imageLoaded[idx] ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                      }`}
                      quality={75}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      onLoad={() => handleImageLoad(idx)}
                      onError={() => handleImageLoad(idx)}
                    />
                  )}
                </div>

                {/* Right Content with Staggered Animation */}
                <div className="content-section w-full md:w-1/2 flex items-center">
                  <div className="p-4 md:p-6">
                    {/* Title with staggered animation */}
                    <h4 className={`text-xl font-bold mb-2 text-gray-900 transition-all duration-700 ${
                      visibleCards[idx] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${idx * 150 + 500}ms` }}>
                      {imageLoaded[idx] ? card.title : (
                        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
                      )}
                    </h4>

                    {/* Description with enhanced stagger */}
                    <p className={`text-gray-700 mb-4 transition-all duration-700 ${
                      visibleCards[idx] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${idx * 150 + 650}ms` }}>
                      {imageLoaded[idx] ? card.description : (
                        <div className="space-y-2">
                          <div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
                          <div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
                          <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse"></div>
                        </div>
                      )}
                    </p>

                    {/* CTA Button with final reveal */}
                    <div className={`transition-all duration-700 ${
                      visibleCards[idx] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${idx * 150 + 800}ms` }}>
                      {imageLoaded[idx] ? (
                        <a
                          href={card.ctaHref}
                          className="inline-flex items-center text-red-600 font-semibold hover:underline group transition-all duration-200 hover:transform hover:translate-x-1"
                        >
                          {card.cta}
                          <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
                            →
                          </span>
                        </a>
                      ) : (
                        <div className="h-5 w-24 bg-red-100 rounded animate-pulse"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;