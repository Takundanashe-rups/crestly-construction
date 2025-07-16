'use client';

import { useEffect, useRef, useState } from 'react';
import { FaTools, FaHandshake, FaUsers } from 'react-icons/fa';

// Floating decorative animation circle with CSS animations
const FloatingCircle = ({
  className,
  delay,
  y = 25,
  x = 10,
  scale = 1.05,
  duration = 5,
}: {
  className: string;
  delay: number;
  y?: number;
  x?: number;
  scale?: number;
  duration?: number;
}) => (
  <div
    aria-hidden="true"
    className={`${className} animate-float`}
    style={{
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      '--float-y': `${y}px`,
      '--float-x': `${x}px`,
      '--float-scale': scale,
    } as React.CSSProperties}
  />
);

export default function MissionSection() {
  const [isClient, setIsClient] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [underlineVisible, setUnderlineVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState<boolean[]>([false, false, false]);

  const sectionRef = useRef<HTMLElement>(null);

  const cards = [
    {
      title: 'Craftsmanship',
      icon: <FaTools size={24} />,
      description: "We don't cut corners. Every project reflects our engineering precision and structural integrity.",
    },
    {
      title: 'Accountability',
      icon: <FaHandshake size={24} />,
      description: 'We meet deadlines, respect budgets, and own every phase of the construction process.',
    },
    {
      title: 'Community Impact',
      icon: <FaUsers size={24} />,
      description: 'We hire local, train local, and build with sustainability and social responsibility in mind.',
    },
  ];

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
              setTimeout(() => setHeaderVisible(true), 150);
              setTimeout(() => setUnderlineVisible(true), 600);
              setTimeout(() => setSubtitleVisible(true), 300);
              
              // Cards staggered reveal
              setTimeout(() => setCardsVisible(prev => {
                const newState = [...prev];
                newState[0] = true;
                return newState;
              }), 800);
              
              setTimeout(() => setCardsVisible(prev => {
                const newState = [...prev];
                newState[1] = true;
                return newState;
              }), 1000);
              
              setTimeout(() => setCardsVisible(prev => {
                const newState = [...prev];
                newState[2] = true;
                return newState;
              }), 1200);
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
      <section className="relative py-20 px-6 md:px-12 w-[95%] mx-auto text-center isolate opacity-100">
        <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-blue-100/80" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="h-12 w-64 bg-blue-200/30 rounded mx-auto mb-6 animate-pulse"></div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-200 bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-sm">
                <div className="w-14 h-14 mx-auto mb-4 bg-blue-100 rounded-full animate-pulse"></div>
                <div className="h-6 w-32 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
                  <div className="h-4 w-3/4 bg-gray-100 rounded mx-auto animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* CSS Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0) scale(1);
          }
          50% {
            transform: translateY(var(--float-y, -25px)) translateX(var(--float-x, 10px)) scale(var(--float-scale, 1.05));
          }
        }
        
        .animate-float {
          animation: float var(--duration, 5s) ease-in-out infinite;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative py-20 px-6 md:px-12 w-[95%] mx-auto text-center isolate"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(to right, #1e40af 1px, transparent 1px), linear-gradient(to bottom, #1e40af 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-blue-100/80" />

          {/* Static Circles */}
          {[
            'top-20 right-10 w-24 h-24 border-[10px] border-blue-200/40',
            'top-32 left-16 w-20 h-20 border-[8px] border-blue-300/30',
            'bottom-32 right-20 w-28 h-28 border-[12px] border-blue-100/50',
            'top-1/3 right-1/4 w-18 h-18 border-[6px] border-amber-300/40',
            'bottom-1/3 left-1/3 w-22 h-22 border-[10px] border-amber-100/35',
            'top-1/2 left-8 w-16 h-16 border-[7px] border-amber-200/25',
            'bottom-16 right-1/3 w-20 h-20 border-[9px] border-amber-300/30',
            'top-16 right-1/2 w-14 h-14 border-[5px] border-amber-200/40',
            'bottom-1/4 left-1/5 w-16 h-16 border-[8px] border-blue-300/35',
          ].map((className, i) => (
            <div
              key={i}
              aria-hidden="true"
              className={`absolute rounded-full transition-opacity duration-1000 ${className} ${
                sectionVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: `${i * 100 + 500}ms` }}
            />
          ))}

          {/* Animated Floating Circles */}
          <FloatingCircle className="absolute top-1/3 left-1/4 w-8 h-8 bg-amber-400/10 rounded-full" delay={0} />
          <FloatingCircle className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-blue-400/10 rounded-full" delay={0.5} y={20} x={-8} />
          <FloatingCircle className="absolute top-1/2 left-1/3 w-10 h-10 bg-blue-300/15 rounded-full" delay={1} y={30} x={15} scale={1.1} />
          <FloatingCircle className="absolute bottom-1/4 left-1/5 w-7 h-7 bg-amber-300/12 rounded-full" delay={1.5} y={18} x={-12} />
          <FloatingCircle className="absolute top-1/4 right-1/3 w-9 h-9 bg-blue-500/8 rounded-full" delay={2} y={22} x={8} />
          <FloatingCircle className="absolute bottom-1/2 right-1/5 w-5 h-5 bg-amber-500/15 rounded-full" delay={2.5} y={25} x={-10} />
          <FloatingCircle className="absolute top-3/4 left-1/2 w-12 h-12 bg-blue-200/10 rounded-full" delay={3} y={35} x={20} scale={1.2} />
          <FloatingCircle className="absolute top-1/6 left-3/4 w-6 h-6 bg-amber-400/12 rounded-full" delay={3.5} y={15} x={-15} />
          <FloatingCircle className="absolute bottom-1/6 left-2/3 w-8 h-8 bg-blue-400/12 rounded-full" delay={4} y={20} x={12} />
          <FloatingCircle className="absolute top-1/5 right-1/6 w-7 h-7 bg-amber-300/8 rounded-full" delay={0.8} y={18} x={8} scale={0.9} />
          <FloatingCircle className="absolute bottom-1/5 right-2/3 w-9 h-9 bg-blue-300/10 rounded-full" delay={1.2} y={22} x={-14} />
          <FloatingCircle className="absolute top-2/3 right-1/8 w-8 h-8 bg-amber-200/12 rounded-full" delay={1.8} y={28} x={16} scale={1.15} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Title */}
          <h2 className={`text-4xl font-extrabold text-blue-900 mb-3 tracking-tight leading-snug transition-all duration-800 ease-out transform ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Our Mission & Values
          </h2>

          {/* Underline */}
          <div className={`h-1 w-16 bg-amber-400 mx-auto mb-6 transition-all duration-500 ease-out origin-left ${
            underlineVisible ? 'scale-x-100' : 'scale-x-0'
          }`} />

          {/* Subtitle */}
          <p className={`text-xl text-blue-700 max-w-3xl mx-auto mb-14 leading-relaxed transition-all duration-800 ease-out ${
            subtitleVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            To empower Zimbabwe's infrastructure growth by delivering world-class construction services rooted in
            quality, safety, and innovation.
          </p>

          {/* Cards - keeping original styling exactly */}
          <div className="grid md:grid-cols-3 gap-8">
            {cards.map((item, i) => (
              <div
                key={i}
                className={`group relative border border-gray-200 bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-sm overflow-hidden transition-all duration-700 ease-out transform ${
                  cardsVisible[i] 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-12 scale-98'
                }`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                {/* Hover Light Strip - keeping original */}
                <div className="absolute inset-0 rounded-xl overflow-hidden" aria-hidden="true">
                  <div className="absolute w-[150%] h-[40px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent top-full group-hover:top-[-10%] transition-all duration-600" />
                </div>

                <div className="relative z-10">
                  <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-100 group-hover:bg-blue-200 transition">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-2">{item.title}</h3>
                  <p className="text-gray-700">
                    {item.description}
                  </p>
                </div>

                {/* Floating decorations - keeping original */}
                <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-blue-200/20 blur-sm" aria-hidden="true" />
                <div className="absolute -top-4 -left-4 w-6 h-6 rounded-full bg-amber-200/20 blur-sm" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}