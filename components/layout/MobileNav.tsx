'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// @ts-ignore: Could not find a declaration file for module 'react-icons/fa'.
import { 
  FaHome,
  FaUserTie, 
  FaBuilding, 
  FaProjectDiagram, 
  FaEnvelope, 
  FaTimes, 
  FaChevronDown,
  FaCog,
  FaFire,
  FaHammer
} from 'react-icons/fa';

type MobileNavProps = {
  setMenuOpen: (open: boolean) => void;
};

const services = [
  { 
    label: 'Construction Services', 
    icon: <FaCog />, 
    href: '/services/construction',
    description: 'General construction & development'
  },
  { 
    label: 'Boiler Making', 
    icon: <FaFire />, 
    href: '/services/boiler-making',
    description: 'Industrial boiler fabrication'
  },
  { 
    label: 'Welding', 
    icon: <FaHammer />, 
    href: '/services/welding',
    description: 'Professional welding services'
  },
];

const navLinks = [
  { label: 'Home', icon: <FaHome />, href: '/' },
  { label: 'About Us', icon: <FaUserTie />, href: '/about' },
  { label: 'Projects', icon: <FaProjectDiagram />, href: '/projects' },
  { label: 'Contact', icon: <FaEnvelope />, href: '/contact' },
];

export default function MobileNav({ setMenuOpen }: MobileNavProps) {
  const [servicesExpanded, setServicesExpanded] = useState(false);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-40 md:hidden animate-fadeIn"
        onClick={() => setMenuOpen(false)}
      />
      
      {/* Mobile Menu */}
      <div className="bg-white fixed top-0 left-0 w-full h-full z-50 md:hidden animate-slideIn overflow-y-auto">
        {/* Header with logo and close button */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 bg-blue-50">
          <div className="flex items-center">
            <img 
              src="/Crestlyy3.png"
              alt="Crestly Logo"
              className="object-contain h-10 xs:h-12 sm:h-14 w-auto max-w-[140px]"
            />
          </div>
          <button 
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="text-blue-900 text-2xl p-2 hover:text-blue-700 hover:bg-blue-100 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <FaTimes />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 xs:p-6">
          <div className="space-y-1 xs:space-y-2">
            {/* Regular Nav Links */}
            {navLinks.map(({ label, icon, href }, i) => (
              <Link
                key={i}
                onClick={() => setMenuOpen(false)}
                href={href}
                className="flex items-center gap-3 xs:gap-4 text-base xs:text-lg text-blue-900 hover:text-blue-700 font-medium px-3 xs:px-4 py-3 xs:py-4 rounded-lg transition-all duration-200 hover:bg-blue-50 border border-transparent hover:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <span className="text-lg xs:text-xl text-blue-600">{icon}</span>
                {label}
              </Link>
            ))}

            {/* Business Units Expandable Section */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Business Units Header */}
              <button
                onClick={() => setServicesExpanded(!servicesExpanded)}
                className="w-full flex items-center justify-between gap-3 xs:gap-4 text-base xs:text-lg text-blue-900 hover:text-blue-700 font-medium px-3 xs:px-4 py-3 xs:py-4 transition-all duration-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-expanded={servicesExpanded}
              >
                <div className="flex items-center gap-3 xs:gap-4">
                  <span className="text-lg xs:text-xl text-blue-600">
                    <FaBuilding />
                  </span>
                  Business Units
                </div>
                <FaChevronDown 
                  className={`text-sm transition-transform duration-300 ${
                    servicesExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Services Dropdown Content */}
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                servicesExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="bg-gray-50 border-t border-gray-200">
                  {services.map(({ label, icon, href, description }, i) => (
                    <Link
                      key={i}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-start gap-3 px-6 xs:px-8 py-3 xs:py-4 text-blue-900 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 border-l-4 border-transparent hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                    >
                      <span className="text-base text-blue-600 mt-0.5">{icon}</span>
                      <div className="flex-1">
                        <div className="font-medium text-sm xs:text-base">{label}</div>
                        <div className="text-xs xs:text-sm text-gray-600 mt-0.5">{description}</div>
                      </div>
                    </Link>
                  ))}
                  
                  {/* View All Services Link */}
                  <div className="px-6 xs:px-8 py-2 xs:py-3 border-t border-gray-200">
                    <Link
                      href="/services"
                      onClick={() => setMenuOpen(false)}
                      className="text-xs xs:text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-all duration-200"
                    >
                      View all services →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Button in mobile menu */}
          <div className="mt-6 xs:mt-8 pt-4 xs:pt-6 border-t border-gray-200">
            <button 
              onClick={() => setMenuOpen(false)}
              className="w-full bg-blue-900 text-white px-4 xs:px-6 py-2.5 xs:py-3 rounded-lg font-semibold hover:bg-blue-800 transition-all duration-200 shadow-md text-base xs:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Get In Touch »
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
