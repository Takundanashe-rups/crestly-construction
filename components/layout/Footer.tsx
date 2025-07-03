'use client';

import { FaPhone, FaEnvelope, FaFacebookF, FaXTwitter, FaLinkedinIn } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' },
  ];

  const services = [
    'Civil Engineering',
    'Steel Fabrication',
    'Boiler Installations',
    'Project Management',
  ];

  return (
    <footer className="bg-[#0f172a] text-white text-sm mt-8 md:mt-16 shadow-inner rounded-t-2xl overflow-hidden">
      {/* Main Animated Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-[#1e293b] py-6 md:py-12 px-4 md:px-16 rounded-t-2xl shadow-inner"
      >
        {/* Decorative SVG Wave Divider - Hidden on mobile */}
        <div aria-hidden="true" className="hidden md:block -mt-12 md:-mt-16">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-16 md:h-24">
            <path d="M0,32 C360,120 1080,0 1440,96 L1440,120 L0,120 Z" fill="#1e293b" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {/* Column 1: Company Info */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-3 md:mb-4 group">
              <span className="inline-block bg-amber-400 rounded-full p-1 group-hover:scale-105 transition-transform">
                <svg width="24" height="24" viewBox="0 0 28 28" fill="none" className="w-6 h-6 md:w-7 md:h-7">
                  <circle cx="14" cy="14" r="14" fill="#f59e0b" />
                  <path d="M8 20L14 8L20 20" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              <h3 className="text-lg md:text-xl font-bold text-amber-400 group-hover:text-amber-300 transition-colors duration-300 tracking-wide">
                Crestly Construction
              </h3>
            </Link>
            <p className="text-gray-300 leading-relaxed mb-3 md:mb-4 text-sm">
              Building Zimbabwe's tomorrow — one structure at a time. We specialize in industrial-grade engineering and infrastructure.
            </p>
            <div className="flex flex-col gap-1.5 md:gap-2 mt-2">
              <a href="tel:+263772000000" className="flex items-center gap-2 text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm">
                <FaPhone className="text-amber-400 text-xs" /> +263 77 200 0000
              </a>
              <a href="mailto:info@crestly.co.zw" className="flex items-center gap-2 text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm">
                <FaEnvelope className="text-amber-400 text-xs" /> info@crestly.co.zw
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-base md:text-lg font-semibold text-amber-400 mb-3 md:mb-4">Quick Links</h4>
            <ul className="space-y-1.5 md:space-y-2 text-gray-300">
              {quickLinks.map((link, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.3 }}
                  className="hover:text-amber-400 cursor-pointer text-sm"
                >
                  <Link href={link.href} className="flex items-center">
                    <span className="mr-1 text-amber-400">•</span> {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-base md:text-lg font-semibold text-amber-400 mb-3 md:mb-4">Our Services</h4>
            <ul className="space-y-1.5 md:space-y-2 text-gray-300">
              {services.map((service, i) => (
                <motion.li
                  key={i}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.3 }}
                  className="hover:text-amber-400 cursor-pointer text-sm"
                >
                  <span className="mr-1 text-amber-400">•</span> {service}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="bg-[#0b1120] py-3 md:py-4 px-4 md:px-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs gap-2 border-t border-[#1e293b]">
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
              <FaFacebookF className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener" aria-label="Twitter/X" className="hover:text-amber-400 transition p-1.5 md:p-2 rounded-full hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-amber-400">
              <FaXTwitter className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener" aria-label="LinkedIn" className="hover:text-amber-400 transition p-1.5 md:p-2 rounded-full hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-amber-400">
              <FaLinkedinIn className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
