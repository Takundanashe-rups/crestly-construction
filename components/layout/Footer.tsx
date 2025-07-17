'use client';

import { FaPhone, FaEnvelope, FaFacebookF, FaXTwitter, FaLinkedinIn } from 'react-icons/fa6';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [isClient, setIsClient] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [columnsVisible, setColumnsVisible] = useState<boolean[]>([false, false, false]);
  const [bottomBarVisible, setBottomBarVisible] = useState(false);

  const footerRef = useRef<HTMLElement>(null);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
    { name: 'Fabrication', href: '/services/boiler-making' },
    { name: 'Construction', href: '/services/construction' },
  ];

  const services = [
    'Civil Engineering',
    'Steel Fabrication',
    'Boiler Installations',
    'Project Management',
  ];

  useEffect(() => {
    // Prevent flash by ensuring client-side rendering
    setIsClient(true);

    // Enhanced scroll animation observer
    const initTimer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target === footerRef.current && entry.isIntersecting) {
              setFooterVisible(true);
              
              // Staggered column animations
              setTimeout(() => setColumnsVisible(prev => {
                const newState = [...prev];
                newState[0] = true;
                return newState;
              }), 200);
              
              setTimeout(() => setColumnsVisible(prev => {
                const newState = [...prev];
                newState[1] = true;
                return newState;
              }), 400);
              
              setTimeout(() => setColumnsVisible(prev => {
                const newState = [...prev];
                newState[2] = true;
                return newState;
              }), 600);
              
              setTimeout(() => setBottomBarVisible(true), 800);
            }
          });
        },
        {
          threshold: [0.1, 0.3, 0.5],
          rootMargin: '-50px 0px -50px 0px'
        }
      );

      if (footerRef.current) {
        observer.observe(footerRef.current);
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
      <footer className="bg-[#0f172a] text-white text-sm shadow-inner overflow-hidden opacity-100">
        {/* Loading state */}
        <div className="bg-[#1e293b] py-6 md:py-12 px-4 md:px-16 shadow-inner">
          <div className="hidden md:block -mt-12 md:-mt-16">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-16 md:h-24">
              <path d="M0,32 C360,120 1080,0 1440,96 L1440,120 L0,120 Z" fill="#1e293b" />
            </svg>
          </div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-6 w-32 bg-amber-400/20 rounded animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-600/30 rounded animate-pulse"></div>
                  <div className="h-4 w-3/4 bg-gray-600/30 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#0b1120] py-3 md:py-4 px-4 md:px-6 border-t border-[#1e293b]">
          <div className="h-4 w-full bg-gray-600/20 rounded animate-pulse"></div>
        </div>
      </footer>
    );
  }

  return (
    <footer ref={footerRef} className="bg-[#0f172a] text-white text-sm shadow-inner overflow-hidden">
      {/* Main Animated Section */}
      <div className={`bg-[#1e293b] py-6 md:py-12 px-4 md:px-16 shadow-inner transition-all duration-1000 ease-out transform ${
        footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}>
        {/* Decorative SVG Wave Divider - Hidden on mobile */}
        <div aria-hidden="true" className="hidden md:block -mt-12 md:-mt-16">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-16 md:h-24">
            <path d="M0,32 C360,120 1080,0 1440,96 L1440,120 L0,120 Z" fill="#1e293b" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {/* Column 1: Company Info */}
          <div className={`transition-all duration-800 ease-out transform ${
            columnsVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <Link href="/" className="inline-flex items-center gap-2 mb-3 md:mb-4 group">
              <span className="inline-block text-yellow-600 rounded-full p-1 group-hover:scale-105 transition-transform">
                <img src="/Artboard.2@4x.png" alt="Crestly Construction Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain rounded-full bg-white p-0.5" />
              </span>
              <h3 className="text-lg md:text-xl font-bold text-amber-400 group-hover:text-amber-300 transition-colors duration-300 tracking-wide">
                Crestly Construction
              </h3>
            </Link>
            <p className="text-gray-300 leading-relaxed mb-3 md:mb-4 text-sm">
              Building Zimbabwe's tomorrow -- one structure at a time. We specialize in industrial-grade engineering and infrastructure.
            </p>
            <div className="flex flex-col gap-1.5 md:gap-2 mt-2">
              <a href="tel:+263772000000" className="flex items-center gap-2 text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm">
                <FaPhone className="text-yellow-600 text-xs" /> +263 77 200 0000
              </a>
              <a href="mailto:info@crestly.co.zw" className="flex items-center gap-2 text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm">
                <FaEnvelope className="text-yellow-600 text-xs" /> info@crestly.co.zw
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className={`transition-all duration-800 ease-out transform ${
            columnsVisible[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h4 className="text-lg md:text-xl font-bold text-amber-400 group-hover:text-amber-300 transition-colors duration-300 tracking-wide mb-3 md:mb-4">Quick Links</h4>
            <ul className="space-y-1.5 md:space-y-2 text-gray-300">
              {quickLinks.map((link, i) => (
                <li
                  key={i}
                  className="hover:text-amber-400 cursor-pointer text-sm transition-all duration-300 hover:translate-x-1.5"
                >
                  <Link href={link.href} className="flex items-center">
                    <span className="mr-1 text-amber-400">•</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className={`transition-all duration-800 ease-out transform ${
            columnsVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h4 className="text-lg md:text-xl font-bold text-amber-400 group-hover:text-amber-300 transition-colors duration-300 tracking-wide mb-3 md:mb-4">Our Services</h4>
            <ul className="space-y-1.5 md:space-y-2 text-gray-300">
              {services.map((service, i) => (
                <li
                  key={i}
                  className="hover:text-amber-400 cursor-pointer text-sm transition-all duration-300 hover:scale-105"
                >
                  <span className="mr-1 text-amber-400">•</span> {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`bg-[#0b1120] py-3 md:py-4 px-4 md:px-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs gap-2 border-t border-[#1e293b] transition-all duration-800 ease-out transform ${
        bottomBarVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <p className="tracking-wide text-center md:text-left">&copy; {new Date().getFullYear()} Crestly Construction. All rights reserved.</p>
        <div className="flex gap-3 md:gap-4 items-center">
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="text-amber-400 hover:text-white hover:bg-[#1e293b] px-2 py-1 rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-xs"
          >
            ↑ Back to Top
          </button>
          <div className="flex gap-2 md:gap-3">
            <a href="https://facebook.com/" target="_blank" rel="noopener" aria-label="Facebook" className="hover:text-amber-400 transition p-1.5 md:p-2 rounded-full hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-amber-400">
              <FaFacebookF className="w-4 h-4 md:w-5 md:h-5 text-yellow-600" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener" aria-label="Twitter/X" className="hover:text-amber-400 transition p-1.5 md:p-2 rounded-full hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-amber-400">
              <FaXTwitter className="w-4 h-4 md:w-5 md:h-5 text-yellow-600" />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener" aria-label="LinkedIn" className="hover:text-amber-400 transition p-1.5 md:p-2 rounded-full hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-amber-400">
              <FaLinkedinIn className="w-4 h-4 md:w-5 md:h-5 text-yellow-600" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}