'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import MissionSection from './MissionSection';

export default function AboutPage() {
  return (
    <main className="bg-white text-gray-900">
      {/* Hero Section */}
      <motion.header
        className="relative isolate bg-gradient-to-br from-blue-50 via-white to-blue-100 py-24 px-6 md:px-16 text-center overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        {/* Animated blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-20 -left-32 w-[300px] h-[300px] bg-blue-300 opacity-20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-yellow-100 opacity-30 rounded-full blur-2xl animate-pulse delay-1500" />
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 leading-tight tracking-tight mb-6">
          Building Zimbabwe’s Tomorrow —<br className="hidden md:block" />
          One Structure at a Time
        </h1>
        <p className="text-lg md:text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
          We deliver industrial-grade construction solutions with precision, passion, and purpose —
          empowering infrastructure across every province.
        </p>
      </motion.header>

      {/* SVG Shape Divider */}
      <div className="w-full overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 80" className="w-full h-16 md:h-20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#EFF6FF" d="M0,80 C480,0 960,160 1440,80 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* Our Story Section */}
      <section className="relative bg-gray-50 py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Story Card */}
          <motion.article
            className="bg-blue-900 text-white p-8 md:p-10 rounded-lg shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 text-yellow-300">Our Story</h2>
            <p className="mb-4 text-base leading-relaxed text-blue-100">
              In the early 2010s, Zimbabwe's construction sector was thriving — yet lacked reliable,
              skilled execution. Crestly Construction was founded to change that.
            </p>
            <p className="mb-4 text-base leading-relaxed text-blue-100">
              From a small workshop driven by passion, we’ve grown into a national brand known for
              civil precision, industrial standards, and integrity-driven operations.
            </p>
            <p className="text-base leading-relaxed text-blue-100">
              Today, we’ve delivered over <strong className="text-white">100+ successful projects</strong>
              — from steel fabrication to boiler installations — always rooted in trust, safety, and community.
            </p>
          </motion.article>

          {/* Image Block */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <img
              src="/images/overlay.jpg"
              alt="Crestly Construction team at work on a project site in Zimbabwe"
              className="rounded-lg object-cover w-full h-full max-h-[500px] shadow-md"
            />
          </motion.div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <MissionSection />
    </main>
  );
}
