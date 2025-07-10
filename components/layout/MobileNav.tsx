'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useClientPathname } from '@/hooks/useClientPathname';

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
    label: 'Fabrication',
    icon: <FaFire />,
    href: '/services/boiler-making',
    description: 'Sheet and metal fabrication'
  },
  
  /*
    {label: 'Welding',
    icon: <FaHammer />,
    href: '/services/welding',
    description: 'Professional welding services'}
  */
];

const navLinks = [
  { label: 'Home', icon: <FaHome />, href: '/' },
  { label: 'About Us', icon: <FaUserTie />, href: '/about' },
  { label: 'Projects', icon: <FaProjectDiagram />, href: '/projects' },
  { label: 'Contact', icon: <FaEnvelope />, href: '/contact' }
];

export default function MobileNav({ setMenuOpen }: MobileNavProps) {
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = useClientPathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Sidebar Menu */}
      <div className="fixed top-0 left-0 h-full w-[80%] bg-white/80 backdrop-blur-xl shadow-xl z-50 rounded-r-xl transition-all duration-300 overflow-y-auto animate-slideIn md:hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white/80">
          <img
            src="/Artboard-1@4x.png"
            alt="Crestly Logo"
            className="h-10 object-contain"
          />
          <button
            onClick={() => setMenuOpen(false)}
            className="text-blue-900 text-2xl p-2 hover:text-blue-700 hover:bg-blue-100 rounded-full transition"
          >
            <FaTimes />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-5">
          <div className="space-y-3">
            {navLinks.map(({ label, icon, href }, i) => (
              <Link
                key={i}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-base text-blue-900 hover:text-blue-700 hover:bg-blue-100 px-4 py-3 rounded-lg transition font-medium"
              >
                <span className="text-lg text-blue-600">{icon}</span>
                {label}
              </Link>
            ))}

            {/* Expandable Services */}
            <div className="bg-white/70 border border-gray-200 rounded-xl">
              <button
                onClick={() => setServicesExpanded(!servicesExpanded)}
                className="w-full flex justify-between items-center px-4 py-3 text-blue-900 font-medium hover:bg-blue-100 transition rounded-t-xl"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg text-blue-600">
                    <FaBuilding />
                  </span>
                  Business Units
                </div>
                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    servicesExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown */}
              <div
                className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                  servicesExpanded ? 'max-h-[1000px]' : 'max-h-0'
                }`}
              >
                <div className="flex flex-col gap-1 bg-white/90 backdrop-blur">
                  {services.map(({ label, icon, href, description }, i) => (
                    <Link
                      key={i}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="flex gap-3 px-6 py-3 text-blue-900 hover:text-blue-700 hover:bg-blue-50 transition rounded"
                    >
                      <span className="text-blue-600 mt-1 text-base">{icon}</span>
                      <div>
                        <div className="font-medium text-sm">{label}</div>
                        <div className="text-xs text-gray-600">{description}</div>
                      </div>
                    </Link>
                  ))}
                  {/*<div className="px-6 py-2 border-t border-gray-200">
                    <Link
                      href="/services"
                      onClick={() => setMenuOpen(false)}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline transition"
                    >
                      View all services →
                    </Link>
                  </div>*/}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={() => setMenuOpen(false)}
              className="w-full bg-blue-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition shadow-md text-base"
            >
              Get In Touch »
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
