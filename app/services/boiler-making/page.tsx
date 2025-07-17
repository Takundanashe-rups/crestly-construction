'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaArrowRight, FaTools, FaIndustry, FaCog, FaShieldAlt } from 'react-icons/fa';
import Link from 'next/link';
import CallToAction from '../../../components/sections/CallToAction';

const services = {
  Fabrication: {
    icon: FaTools,
    items: [
      "Custom Metal Fabrication",
      "Structural Steel Fabrication", 
      "Sheet Metal Bending & Cutting",
      "Precision Boiler Component Manufacturing"
    ],
    color: "from-blue-500 to-blue-600"
  },
  Welding: {
    icon: FaIndustry,
    items: [
      "MIG, TIG & Stick Welding",
      "On-site Welding Services",
      "Pipe Welding & Repairs",
      "High-Pressure Vessel Welding"
    ],
    color: "from-blue-600 to-blue-700"
  },
  Rigging: {
    icon: FaCog,
    items: [
      "Inspection",
      "Maintenance of lifting equipment ",
      "Installation" 
    ],
    color: "from-blue-400 to-blue-500"
  },
  Consulting: {
    icon: FaShieldAlt,
    items: [
      "Design & Planning Assistance",
      "Project Estimations",
      "Compliance & Safety Guidance",
      "Efficiency Optimization"
    ],
    color: "from-blue-500 to-blue-700"
  }
};

// Keep hero exactly as it is
function BoilerMakingHero() {
  return (
    <>
      {/* Main Hero Container */}
      <div className="relative h-[500px] w-full overflow-hidden">
        
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('/images/Bioler-making.jpg')] bg-cover bg-center z-0" />
        
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
            &raquo; Specialized Manufacturing
          </motion.div>
          
          {/* Main Title */}
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white leading-tight max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Sheet & Metal Fabrication
          </motion.h1>
          
          {/* Description */}
          <motion.p 
            className="text-xl text-blue-100 mt-6 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            From fabrication to consulting, our professional services are tailored to meet the demands of construction, manufacturing, and industrial operations.
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
            <span className="text-white">Sheet & Metal Fabrication</span>
          </motion.div>
        </div>
        
        {/* Decorative Floating Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-400/10 rounded-full blur-xl animate-pulse hidden lg:block"></div>
        <div className="absolute bottom-20 right-40 w-24 h-24 bg-white/5 rounded-full blur-lg animate-pulse hidden lg:block"></div>
      </div>
      
    </>
  );
}

export default function BoilerMakingPage() {
  const [open, setOpen] = useState<string | null>('Fabrication');
  const [isClient, setIsClient] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [servicesVisible, setServicesVisible] = useState<boolean[]>([false, false, false, false]);
  const [imageVisible, setImageVisible] = useState(false);
  const [ctaVisible, setCTAVisible] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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
              setTimeout(() => setServicesVisible(prev => {
                const newState = [...prev];
                newState[0] = true;
                return newState;
              }), 600);
              
              setTimeout(() => setServicesVisible(prev => {
                const newState = [...prev];
                newState[1] = true;
                return newState;
              }), 800);
              
              setTimeout(() => setServicesVisible(prev => {
                const newState = [...prev];
                newState[2] = true;
                return newState;
              }), 1000);
              
              setTimeout(() => setServicesVisible(prev => {
                const newState = [...prev];
                newState[3] = true;
                return newState;
              }), 1200);
              
            } else if (entry.target === imageRef.current && entry.isIntersecting) {
              setImageVisible(true);
              setTimeout(() => setCTAVisible(true), 300);
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

  // Prevent flash during SSR
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100">
        <BoilerMakingHero />
        
        {/* Services Section Loading */}
        <section className="py-20 px-4 bg-white/90 opacity-100">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <div className="h-12 w-64 bg-blue-200/30 rounded mx-auto mb-6 animate-pulse"></div>
              <div className="h-6 w-96 bg-gray-200/30 rounded mx-auto animate-pulse"></div>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white/90 rounded-2xl p-6 border border-slate-200 shadow-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-200 rounded-xl animate-pulse"></div>
                      <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-8">
                <div className="w-full h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
                <div className="p-8 rounded-2xl bg-white/90 border border-slate-200 shadow-xl">
                  <div className="h-6 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
                  <div className="space-y-2 mb-6">
                    <div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <CallToAction />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100">
      <BoilerMakingHero />
      
      {/* Services Section */}
      <section ref={sectionRef} className="py-20 px-4 bg-white/90">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className={`text-center mb-16 transition-all duration-800 ease-out transform ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">Expertise</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              From fabrication to consulting, our professional services are tailored to meet the demands of construction, manufacturing, and industrial operations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Services Accordion */}
            <div className="space-y-6">
              {Object.entries(services).map(([category, data], index) => {
                const isOpen = open === category;
                const IconComponent = data.icon;
                
                return (
                  <div
                    key={category}
                    className={`group transition-all duration-700 ease-out transform ${
                      servicesVisible[index] 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-12 scale-98'
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300">
                      <div className={`absolute inset-0 bg-gradient-to-r ${data.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                      
                      <button
                        onClick={() => setOpen(isOpen ? null : category)}
                        className="relative w-full flex items-center justify-between p-6 text-left transition-all duration-300"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${data.color} shadow-lg`}>
                            <IconComponent className="text-white text-xl" />
                          </div>
                          <span className="text-2xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors">
                            {category}
                          </span>
                        </div>
                        <div className={`text-blue-700 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                          <FaChevronDown className="text-xl" />
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6">
                              <div className="grid gap-3 ml-16">
                                {data.items.map((item, itemIndex) => (
                                  <motion.div
                                    key={item}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                                    className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group/item"
                                  >
                                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
                                    <span className="text-slate-700 group-hover/item:text-blue-900 transition-colors">
                                      {item}
                                    </span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Image and CTA Section */}
            <div ref={imageRef} className="lg:sticky lg:top-8">
              {/* Image */}
              <div className={`relative group transition-all duration-1000 ease-out transform ${
                imageVisible 
                  ? 'opacity-100 translate-x-0 scale-100 shadow-2xl' 
                  : 'opacity-0 translate-x-12 scale-98 shadow-lg'
              }`}>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="/images/Bioler-making.jpg"
                    alt="Professional boiler making and welding services"
                    className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                </div>
              </div>

              {/* CTA Card */}
              <div className={`mt-8 p-8 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl transition-all duration-800 ease-out transform ${
                ctaVisible 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-98'
              }`}>
                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  Why Choose Crestly Construction?
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Our skilled professionals and cutting-edge tools guarantee precision and excellence across all services. We are committed to delivering quality-assured solutions with round-the-clock support to ensure your project success.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 rounded-lg bg-blue-50">
                    <div className="text-2xl font-bold text-blue-700">100%</div>
                    <div className="text-sm text-slate-600">Quality Assured</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-blue-50">
                    <div className="text-2xl font-bold text-blue-700">24/7</div>
                    <div className="text-sm text-slate-600">Support Available</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Get Started <FaArrowRight />
                  </button>
                  <Link href="/contact" className="flex-1">
                    <button className="w-full border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300">
                      Contact Us
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <CallToAction />
    </div>
  );
}