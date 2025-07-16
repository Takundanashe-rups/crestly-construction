'use client';

import { motion } from 'framer-motion';

export default function AnimatedHeader() {
  return (
    <>
      {/* Main Hero Container */}
      <div className="relative h-[500px] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('/images/first-sect-about.jpg')] bg-cover bg-center z-0" />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-20 flex flex-col items-start justify-center h-full px-6 lg:px-12 max-w-7xl mx-auto">
          {/* Subtitle */}
          <motion.div
            className="text-blue-100 text-sm mb-4 font-semibold tracking-wider uppercase"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            &raquo; About Crestly Construction
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-white leading-tight max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Building Zimbabwe’s Tomorrow —<br className="hidden md:block" />
            One Structure at a Time
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-blue-100 mt-6 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            We deliver industrial-grade construction solutions with precision, passion, and purpose —
            empowering infrastructure across every province.
          </motion.p>
        </div>

        {/* Decorative Floating Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-400/10 rounded-full blur-xl animate-pulse hidden lg:block"></div>
        <div className="absolute bottom-20 right-40 w-24 h-24 bg-white/5 rounded-full blur-lg animate-pulse hidden lg:block"></div>
      </div>
    </>
  );
}
