'use client';

import { motion } from 'framer-motion';

export default function AnimatedHeader() {
  return (
    <>
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
    </>
  );
}
