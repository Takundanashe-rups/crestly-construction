'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MobileNav from './MobileNav';
import { useClientPathname } from '@/hooks/useClientPathname';
import { FaSearch, FaThLarge, FaChevronDown, FaCog, FaHammer, FaFire, FaHome } from 'react-icons/fa';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = useClientPathname();
  const dropdownCloseTimeout = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdownOpen]);

  // Helper function to check if current page matches services
  const isServicesActive = () => {
    return pathname?.startsWith('/services') || false;
  };

  // Render loading state during hydration
  if (!isClient) {
    return (
      <nav className="sticky top-0 bg-white shadow-md px-4 md:px-8 py-2 md:py-3 flex items-center justify-between w-full relative z-50">
        <div className="flex items-center flex-shrink-0">
          <Link href="/" className="relative logo-container group">
            <Image 
              src="/Artboard-1@4x.png" 
              alt="Crestly Construction Logo" 
              width={64}
              height={64}
              className="h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              priority
            />
          </Link>
        </div>
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          <Link 
            href="/contact"
            className="bg-blue-900 text-white px-3 md:px-4 py-2 rounded-md font-semibold hover:bg-blue-800 transition-all duration-200 text-sm whitespace-nowrap shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Get In Touch »
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="sticky top-0 bg-white shadow-md px-4 md:px-8 py-2 md:py-3 flex items-center justify-between w-full relative z-50">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link href="/" className="relative logo-container group">
            {/* Light mode logo */}
            <Image 
              src="/Artboard-1@4x.png" 
              alt="Crestly Construction Logo" 
              width={64}
              height={64}
              className="h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-105 block dark:hidden"
              priority
            />
            {/* Dark mode logo */}
            <Image 
              src="/Artboard-1@4x.png" 
              alt="Crestly Construction Logo (dark)" 
              width={64}
              height={64}
              className="h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-105 hidden dark:block"
              priority
            />
            <div className="absolute inset-0 bg-blue-900/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
          </Link>
        </div>

        {/* Nav Links (centered, desktop only) */}
        <div className="hidden lg:flex flex-1 justify-center gap-6 xl:gap-8 text-blue-900 font-semibold text-sm xl:text-base">
          <Link href="/" className="relative hover:text-blue-700 transition-colors duration-200 py-2 px-3 rounded-md hover:bg-blue-50 flex items-center gap-2">
            <FaHome className="text-sm" />
            Home
            {pathname === '/' && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-500"></div>
            )}
          </Link>
          
          <Link href="/about" className="relative hover:text-blue-700 transition-colors duration-200 py-2 px-3 rounded-md hover:bg-blue-50">
            About Us
            {pathname === '/about' && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-500"></div>
            )}
          </Link>
          
          {/* Enhanced Business Units Dropdown */}
          <div
            className="relative group"
            ref={dropdownRef}
            onMouseEnter={() => {
              if (dropdownCloseTimeout.current) clearTimeout(dropdownCloseTimeout.current);
              setDropdownOpen(true);
            }}
            onMouseLeave={() => {
              dropdownCloseTimeout.current = setTimeout(() => setDropdownOpen(false), 300);
            }}
            tabIndex={-1}
          >
            <button
              className={`relative flex items-center gap-1 hover:text-blue-700 focus:outline-none focus:text-blue-700 transition-all duration-300 py-2 px-3 rounded-md hover:bg-blue-50 focus:bg-blue-50 focus:ring-2 focus:ring-blue-200 ${
                dropdownOpen ? 'text-blue-700 bg-blue-50' : ''
              }`}
              tabIndex={0}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              type="button"
              onClick={() => setDropdownOpen(v => !v)}
              onKeyDown={e => {
                if (e.key === 'Escape') setDropdownOpen(false);
              }}
            >
              Business Units 
              <FaChevronDown 
                className={`ml-1 text-xs transition-transform duration-300 ${
                  dropdownOpen ? 'rotate-180 text-blue-700' : ''
                }`} 
              />
              {isServicesActive() && (
                <div className="absolute -bottom-1 right-0 w-2 h-2 bg-amber-500 rounded-full shadow-sm animate-pulse"></div>
              )}
            </button>
            
            
            {/* Buffer zone for  mouse movement */}
            <div className="absolute left-0 w-full h-5 -top-5 z-[999]" aria-hidden="true"></div>
            {/* Use simpler dropdown animation for performance */}
            <div
              className={`absolute left-0 mt-1 min-w-[280px] bg-white border border-gray-100 rounded-xl shadow-lg transition-all duration-200 z-[999] ${
                dropdownOpen
                  ? 'opacity-100 visible translate-y-0' 
                  : 'opacity-0 invisible -translate-y-2 pointer-events-none'
              }`}
              onMouseEnter={() => {
                if (dropdownCloseTimeout.current) clearTimeout(dropdownCloseTimeout.current);
                setDropdownOpen(true);
              }}
              onMouseLeave={() => {
                dropdownCloseTimeout.current = setTimeout(() => setDropdownOpen(false), 300);
              }}
              tabIndex={-1}
            >
              {/* Dropdown Arrow */}
              <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-l border-t border-gray-100 transform rotate-45 shadow-md z-[999]"></div>
              
              <div className="py-3 relative bg-white rounded-xl z-[999]">
                {/* Header */}
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Our Services</h3>
                </div>
                {/* Menu Items */}
                <div className="py-2">
                  <Link 
                    href="/services/construction" 
                    prefetch={false} 
                    className={`group/item flex items-center px-4 py-3 text-blue-900 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-700 transition-all duration-200 border-l-4 border-transparent hover:border-blue-500 focus:border-blue-500 focus:bg-blue-50 focus:text-blue-700 focus:outline-none relative ${
                      pathname === '/services/construction' ? 'bg-blue-50 text-blue-700 border-blue-500' : ''
                    }`}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaCog className="mr-3 text-blue-600 group-hover/item:text-blue-700 transition-colors duration-200" />
                    <div className="flex-1">
                      <div className="font-semibold">Construction Services</div>
                      <div className="text-xs text-gray-500 group-hover/item:text-blue-600">General construction & development</div>
                    </div>
                    {pathname === '/services/construction' && (
                      <div className="w-2 h-2 bg-amber-500 rounded-full shadow-sm animate-pulse ml-2"></div>
                    )}
                  </Link>
                  <Link 
                    href="/services/boiler-making" 
                    prefetch={false} 
                    className={`group/item flex items-center px-4 py-3 text-blue-900 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-700 transition-all duration-200 border-l-4 border-transparent hover:border-blue-500 focus:border-blue-500 focus:bg-blue-50 focus:text-blue-700 focus:outline-none relative ${
                      pathname === '/services/boiler-making' ? 'bg-blue-50 text-blue-700 border-blue-500' : ''
                    }`}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaFire className="mr-3 text-orange-600 group-hover/item:text-orange-700 transition-colors duration-200" />
                    <div className="flex-1">
                      <div className="font-semibold">Fabrication</div>
                      <div className="text-xs text-gray-500 group-hover/item:text-blue-600">Sheet and metal fabrication</div>
                    </div>
                    {pathname === '/services/boiler-making' && (
                      <div className="w-2 h-2 bg-amber-500 rounded-full shadow-sm animate-pulse ml-2"></div>
                    )}
                  </Link>
                  {/*<Link 
                    href="/services/welding" 
                    prefetch={false} 
                    className={`group/item flex items-center px-4 py-3 text-blue-900 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-700 transition-all duration-200 border-l-4 border-transparent hover:border-blue-500 focus:border-blue-500 focus:bg-blue-50 focus:text-blue-700 focus:outline-none relative ${
                      pathname === '/services/welding' ? 'bg-blue-50 text-blue-700 border-blue-500' : ''
                    }`}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaHammer className="mr-3 text-yellow-600 group-hover/item:text-yellow-700 transition-colors duration-200" />
                    <div className="flex-1">
                      <div className="font-semibold">Welding</div>
                      <div className="text-xs text-gray-500 group-hover/item:text-blue-600">Professional welding services</div>
                    </div>
                    {pathname === '/services/welding' && (
                      <div className="w-2 h-2 bg-amber-500 rounded-full shadow-sm animate-pulse ml-2"></div>
                    )}
                  </Link> */}
                </div>
                {/* Footer <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 rounded-b-xl">
                  <Link 
                    href="/services" 
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline transition-all duration-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    View all services →
                  </Link>
                </div> */}
                
              </div>
            </div>
          </div>
          
          <Link href="/projects" className="relative hover:text-blue-700 transition-colors duration-200 py-2 px-3 rounded-md hover:bg-blue-50">
            Projects
            {pathname === '/projects' && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-500"></div>
            )}
          </Link>
          
          <Link href="/contact" className="relative hover:text-blue-700 transition-colors duration-200 py-2 px-3 rounded-md hover:bg-blue-50">
            Contact
            {pathname === '/contact' && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-500"></div>
            )}
          </Link>
        </div>

        {/* Right section - Better spacing and alignment */}
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          {/*<button 
            aria-label="Search" 
            className="text-blue-900 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <FaSearch size={16} />
          </button>*/}
          <Link 
            href="/contact"
            className="bg-blue-900 text-white px-3 md:px-4 py-2 rounded-md font-semibold hover:bg-blue-800 transition-all duration-200 text-sm whitespace-nowrap shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Get In Touch »
          </Link>
          {/**<button 
            aria-label="Menu Grid" 
            className="hidden md:inline-flex text-blue-900 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <FaThLarge size={18} />
          </button> */}
          {/* Hamburger for mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex md:hidden text-2xl text-blue-900 p-2 rounded-md hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
            aria-label="Mobile Menu"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && <MobileNav setMenuOpen={setMenuOpen} />}
    </>
  );
}
