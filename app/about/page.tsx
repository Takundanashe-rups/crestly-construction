'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import MissionSection from './MissionSection';


export default function AboutPage() {
  return (
    <>
      <main className="bg-white text-gray-900">
      {/* 1. Mission Headline */}
      <motion.header
  className="relative isolate bg-gradient-to-br from-blue-50 via-white to-blue-100 py-20 px-6 md:px-12 text-center overflow-hidden"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: true }}
>
  {/* Home Button 
  
  <Link
    href="/"
    className="absolute left-4 top-4 md:left-8 md:top-8 z-20 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 hover:bg-blue-100 text-blue-900 font-semibold shadow transition-colors border border-blue-100 backdrop-blur"
    aria-label="Back to Home"
  >
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20" className="inline-block mr-1"><path d="M8.5 16.5L2 10L8.5 3.5M2.5 10H18" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    Home
  </Link>
  
  */}
  
  {/* Decorative blur background blob */}
  <div className="absolute inset-0 overflow-hidden -z-10">
    <div className="absolute -top-20 -left-32 w-[300px] h-[300px] bg-blue-300 opacity-20 rounded-full blur-3xl animate-pulse" />
    <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-yellow-200 opacity-30 rounded-full blur-2xl animate-pulse delay-1500" />
  </div>

  <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-5 leading-tight tracking-tight">
    Building Zimbabwe's Tomorrow —<br className="hidden md:block" />
    One Structure at a Time
  </h1>

  <p className="text-lg md:text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
    We deliver industrial-grade construction solutions with precision, passion, and purpose —
    empowering infrastructure across every province.
  </p>
</motion.header>


      {/* SVG Shape Divider */}
      <div className="w-full overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-16 md:h-20">
          <path fill="#EFF6FF" d="M0,80 C480,0 960,160 1440,80 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* 2. Origin Story with Image + Overlay Card */}
      <section className="relative w-full bg-gray-100 py-16 px-4 md:px-12 mb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Card Overlay */}
          <motion.article
            className="relative z-10 bg-blue-900 text-white p-8 md:p-10 rounded-lg shadow-lg mb-8 md:mb-0"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-red-400">Our Story</h2>
            <p className="mb-4 text-sm md:text-base leading-relaxed">
              In the early 2010s, Zimbabwe's construction sector was booming, yet skilled and ethical execution was hard to come by. This gap inspired the foundation of Crestly Construction.
            </p>
            <p className="mb-4 text-sm md:text-base leading-relaxed">
              What started as a modest workshop and a passion for civil engineering quickly transformed into a full-scale construction firm committed to industrial excellence and structural integrity.
            </p>
            <p className="text-sm md:text-base leading-relaxed">
              Since then, we've delivered over 100 successful projects across Zimbabwe — from steel fabrication to large-scale boiler installations — always rooted in transparency, safety, and community trust.
            </p>
          </motion.article>
          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
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

      {/* 3. Mission & Values */}
      <MissionSection />
    </main>
      
    </>
  );
}