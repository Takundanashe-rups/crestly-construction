'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  FaTools,
  FaPencilRuler,
  FaDraftingCompass,
  FaHardHat,
  FaHammer,
  FaRedo,
  FaComments,
  FaCogs,
  FaLayerGroup,
  FaHome,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import CallToAction from '../../../components/sections/CallToAction';

const services = [
  { icon: <FaPencilRuler className="text-yellow-600 text-3xl" />, title: 'Quotations', description: 'Transparent and competitive project estimates tailored to your budget.' },
  { icon: <FaDraftingCompass className="text-yellow-600 text-3xl" />, title: 'Architectural Design', description: 'Custom design solutions that combine functionality and beauty.' },
  { icon: <FaTools className="text-yellow-600 text-3xl" />, title: 'Plan Drawing', description: 'Accurate technical drawings for construction and regulatory compliance.' },
  { icon: <FaHardHat className="text-yellow-600 text-3xl" />, title: 'Bricklaying', description: 'Expert bricklayers delivering durable and precise masonry work.' },
  { icon: <FaHammer className="text-yellow-600 text-3xl" />, title: 'Construction', description: 'Full-scale construction for residential, commercial, and industrial projects.' },
  { icon: <FaLayerGroup className="text-yellow-600 text-3xl" />, title: 'Tiling', description: 'Professional floor, pavement, and wall tiling for a polished finish.' },
  { icon: <FaHome className="text-yellow-600 text-3xl" />, title: 'Roofing', description: 'Complete roofing solutions from installation to repair and maintenance.' },
  { icon: <FaRedo className="text-yellow-600 text-3xl" />, title: 'Renovations', description: 'Revamp and modernize spaces with minimal disruption and expert care.' },
  { icon: <FaComments className="text-yellow-600 text-3xl" />, title: 'Consultancy', description: 'Professional guidance to navigate permits, budgets, and timelines.' },
  { icon: <FaCogs className="text-yellow-600 text-3xl" />, title: 'Other Services', description: 'We handle all related construction activities tailored to your goals.' },
];

// Keep hero exactly as it is
function ConstructionServicesHero() {
  return (
    <>
      {/* Main Hero Container */}
      <div className="relative h-[500px] w-full overflow-hidden">
        
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('/images/constructionn.jpg')] bg-cover bg-center z-0" />
        
        {/* Gradient Overlays */}
<div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>
<div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-15"></div>
        
        {/* Hero Content */}
        <div className="relative z-20 flex flex-col items-start justify-center h-full px-6 lg:px-12 max-w-7xl mx-auto">
          
          {/* Subtitle */}
          <motion.div 
            className="text-blue-100 text-sm mb-4 font-semibold tracking-wider uppercase"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            &raquo; Professional Services
          </motion.div>
          
          {/* Main Title */}
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white leading-tight max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Construction Services
          </motion.h1>
          
          {/* Description */}
          <motion.p 
            className="text-xl text-blue-100 mt-6 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            From concept to completion, we deliver professional and reliable services across all construction phases with excellence and precision.
          </motion.p>
          
          {/* Breadcrumb Navigation */}
          <motion.div 
            className="flex items-center gap-2 text-blue-200 mt-8 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <span className="hover:text-white transition-colors cursor-pointer">Home</span>
            <span>&raquo;</span>
            <span className="text-white">Construction</span>
          </motion.div>
        </div>
        
       {/* Decorative Floating Elements */}
<div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse hidden lg:block"></div>
<div className="absolute bottom-20 right-40 w-24 h-24 bg-white/5 rounded-full blur-lg animate-pulse hidden lg:block"></div>
</div>

 
    </>
  );
}

export default function ConstructionServices() {
  const [isClient, setIsClient] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [servicesVisible, setServicesVisible] = useState<boolean[]>(new Array(services.length).fill(false));

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
              setTimeout(() => setHeaderVisible(true), 200);
              
              // Services staggered reveal
              services.forEach((_, index) => {
                setTimeout(() => {
                  setServicesVisible(prev => {
                    const newState = [...prev];
                    newState[index] = true;
                    return newState;
                  });
                }, 600 + (index * 150));
              });
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
      <>
        <ConstructionServicesHero />
        
        {/* Loading state */}
        <section className="bg-gray-50 py-16 px-6 lg:px-12 opacity-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="h-10 w-80 bg-gray-300/30 rounded mx-auto mb-4 animate-pulse"></div>
              <div className="h-6 w-96 bg-gray-200/30 rounded mx-auto animate-pulse"></div>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow p-6 text-center border border-gray-200">
                  <div className="mb-4 flex justify-center">
                    <div className="w-12 h-12 bg-yellow-200/30 rounded animate-pulse"></div>
                  </div>
                  <div className="h-6 w-32 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-gray-100 rounded mx-auto animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
            <CallToAction />
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <ConstructionServicesHero />
      
      {/* Services Section */}
      <section ref={sectionRef} className="bg-gray-50 py-16 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className={`text-center mb-12 transition-all duration-800 ease-out transform ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h1 className="text-4xl font-bold text-gray-800">Our Construction Services</h1>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              From concept to completion, we deliver professional and reliable services across all construction phases.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow hover:shadow-lg transition-all duration-700 ease-out transform p-6 text-center border border-gray-200 ${
                  servicesVisible[index] 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-12 scale-98'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="mb-4 flex justify-center">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <CallToAction />
        </div>
      </section>
    </>
  );
}