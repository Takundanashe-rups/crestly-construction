'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ProjectsPage() {
  return (
    <>
      {/* Header section with background image and gradient overlay */}
      <div
        className="relative h-96 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/Projects3.jpg')" }}
        aria-label="Crestley Construction Project Showcase"
      >
        {/* Gradient overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10"></div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Projects
          </motion.h1>

          <motion.p
            className="text-lg text-white mt-4 max-w-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            A glimpse into the construction excellence we deliver across every project.
          </motion.p>
        </div>
      </div>

      {/* Decorative divider for transition */}
      <div className="h-12 bg-gradient-to-b from-black/10 to-white" />

      {/* Page Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* You can map and render your project cards or content here */}
        <div className="text-center text-gray-600">
          {/* Placeholder */}
          <p>Explore our featured projects and recent accomplishments here.</p>
        </div>
      </div>
    </>
  );
}
