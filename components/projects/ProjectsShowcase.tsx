"use client";

import Link from "next/link";
import Image from "next/image";
import { getFeaturedProjects } from "@/lib/projects";
import { useEffect, useRef, useState } from "react";

export default function ProjectsShowcase() {
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState<boolean[]>([]);
  const [imageLoaded, setImageLoaded] = useState<boolean[]>([]);
  const [headerVisible, setHeaderVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Get the two most recent/featured projects
  const projects = getFeaturedProjects().slice(0, 3);

  useEffect(() => {
    // Prevent flash by ensuring client-side rendering
    setIsClient(true);
    
    // Initialize visible projects and image loaded state
    setVisibleProjects(new Array(projects.length).fill(false));
    setImageLoaded(new Array(projects.length).fill(false));

    // Enhanced scroll animation observer
    const initTimer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target === sectionRef.current) {
              setIsVisible(entry.isIntersecting);
              if (entry.isIntersecting) {
                // Staggered header animation
                setTimeout(() => setHeaderVisible(true), 150);
              }
            } else {
              // Handle individual project visibility with enhanced triggering
              const index = projectRefs.current.indexOf(entry.target as HTMLDivElement);
              if (index !== -1) {
                setVisibleProjects(prev => {
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

      // Observe individual projects with enhanced detection
      projectRefs.current.forEach((ref) => {
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
  }, [projects.length]);

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
      <section className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-16 opacity-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-blue-900 text-sm mb-2 font-semibold">&raquo; Latest Projects</div>
          </div>
          <div className="flex flex-col lg:flex-row gap-16 justify-center items-start relative">
            {projects.map((project, idx) => (
              <div key={project.id} className="relative w-full lg:w-[600px] h-[400px] overflow-visible">
                <div className="relative w-full h-full bg-gradient-to-br from-slate-100 via-blue-50 to-slate-50 rounded-lg"></div>
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
      className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-16"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Animated Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ease-out transform ${
          headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-blue-900 text-sm mb-2 font-semibold">&raquo; Latest Projects</div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-16 justify-center items-start relative">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              ref={(el) => { projectRefs.current[idx] = el; }}
              className={`relative w-full lg:w-[600px] h-[400px] overflow-visible group transition-all duration-1000 ease-out transform ${
                visibleProjects[idx] 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-12 scale-98'
              }`}
              style={{
                transitionDelay: `${idx * 200 + 300}ms`
              }}
            >
              {/* Image Container with Enhanced Scroll Animation */}
              <div className={`relative w-full h-full overflow-hidden shadow-xl border border-slate-200 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 transition-all duration-700 ${
                visibleProjects[idx] ? 'shadow-2xl' : 'shadow-lg'
              }`}>
                {/* Loading shimmer effect */}
                {!imageLoaded[idx] && (
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse"></div>
                  </div>
                )}

                {/* Actual Image with enhanced animation */}
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  className={`object-cover transition-all duration-1200 ease-out group-hover:scale-105 ${
                    imageLoaded[idx] ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  }`}
                  sizes="(max-width: 1024px) 100vw, 600px"
                  priority={idx === 0}
                  loading={idx === 0 ? "eager" : "lazy"}
                  onLoad={() => handleImageLoad(idx)}
                  onError={() => handleImageLoad(idx)}
                />
              </div>

              {/* Floating Overlay Card with Enhanced Scroll Animation */}
              <div className={`absolute -top-6 -left-6 z-30 transition-all duration-1200 ease-out transform ${
                visibleProjects[idx] 
                  ? 'opacity-100 translate-x-0 translate-y-0 scale-100' 
                  : 'opacity-0 -translate-x-12 -translate-y-8 scale-95'
              }`}
              style={{
                transitionDelay: `${idx * 250 + 500}ms`
              }}>
                <div className={`bg-white/95 backdrop-blur-sm p-6 border border-gray-200/50 min-w-[220px] max-w-[300px] transition-all duration-500 group-hover:bg-white group-hover:shadow-3xl transform ${
                  visibleProjects[idx] ? 'shadow-xl' : 'shadow-lg'
                }`}>
                  
                  {/* Category with staggered animation */}
                  <div className={`text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wide transition-all duration-700 ${
                    visibleProjects[idx] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${idx * 250 + 700}ms` }}>
                    {imageLoaded[idx] ? project.category : (
                      <div className="h-3 w-16 bg-blue-100 rounded animate-pulse"></div>
                    )}
                  </div>

                  {/* Title with enhanced stagger */}
                  <h3 className={`font-bold text-lg mb-3 text-gray-900 leading-tight transition-all duration-700 ${
                    visibleProjects[idx] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${idx * 250 + 850}ms` }}>
                    {imageLoaded[idx] ? (
                      <Link 
                        href={`/projects/${project.slug}`} 
                        className="hover:text-blue-700 transition-colors duration-200"
                      >
                        {project.title}
                      </Link>
                    ) : (
                      <div className="space-y-2">
                        <div className="h-5 w-48 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    )}
                  </h3>

                  {/* Excerpt with smooth reveal */}
                  {imageLoaded[idx] ? (
                    <p className={`text-gray-700 text-sm mb-4 line-clamp-3 leading-relaxed transition-all duration-700 ${
                      visibleProjects[idx] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${idx * 250 + 1000}ms` }}>
                      {project.excerpt}
                    </p>
                  ) : (
                    <div className="space-y-2 mb-4 transition-all duration-700"
                      style={{ transitionDelay: `${idx * 250 + 1000}ms` }}>
                      <div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
                      <div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
                      <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse"></div>
                    </div>
                  )}

                  {/* Read More Button with final reveal */}
                  <div className={`transition-all duration-700 ${
                    visibleProjects[idx] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${idx * 250 + 1150}ms` }}>
                    {imageLoaded[idx] ? (
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2 text-yellow-600 font-semibold text-sm hover:text-yellow-700 transition-all duration-200 group/link hover:transform hover:translate-x-1"
                      >
                        Read More 
                        <span 
                          aria-hidden 
                          className="transition-transform duration-200 group-hover/link:translate-x-1"
                        >
                          &raquo;
                        </span>
                      </Link>
                    ) : (
                      <div className="h-6 w-24 bg-yellow-100 rounded animate-pulse"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Animated Navigation dots */}
        <div className={`flex justify-center mt-12 gap-3 transition-all duration-1000 ease-out ${
          headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
        style={{ transitionDelay: '1300ms' }}>
          {projects.map((_, idx) => (
            <div 
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-500 cursor-pointer hover:scale-150 transform ${
                imageLoaded[idx] ? 'bg-blue-500 shadow-lg' : 'bg-blue-200'
              } ${visibleProjects[idx] ? 'animate-pulse' : ''}`}
              style={{
                transitionDelay: `${idx * 150 + 1500}ms`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}