'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Suspense, useState, useMemo } from 'react';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectLayout from '@/components/projects/ProjectLayout';
import { getAllProjects } from '@/lib/projects';
import { ProjectCategory } from '@/types/project';

const PROJECTS_PER_PAGE = 9;
const categories: ProjectCategory[] = [
  'Construction',
  'Infrastructure',
  'Boiler-Making',
  'Weilding',
];

function ProjectsHero() {
  return (
    <>
      <div className="relative h-[500px] w-full overflow-hidden">
        <Image
          src="/images/projects.png"
          alt="Project Showcase"
          fill
          priority
          className="object-cover object-center z-0 scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-15"></div>
        
        <div className="relative z-20 flex flex-col items-start justify-center h-full px-6 lg:px-12 max-w-7xl mx-auto">
          <motion.div
            className="text-blue-100 text-sm mb-4 font-semibold tracking-wider uppercase"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            &raquo; Portfolio Showcase
          </motion.div>
          
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white leading-tight max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Projects
          </motion.h1>
          
          <motion.p
            className="text-xl text-blue-100 mt-6 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Showcasing excellence in construction, infrastructure, and specialized engineering solutions across diverse industries.
          </motion.p>
          
          <motion.div
            className="flex items-center gap-2 text-blue-200 mt-8 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <span className="hover:text-white transition-colors cursor-pointer">Home</span>
            <span>&raquo;</span>
            <span className="text-white">Projects</span>
          </motion.div>
        </div>
        
        {/* Floating elements for visual interest */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-400/10 rounded-full blur-xl animate-pulse hidden lg:block"></div>
        <div className="absolute bottom-20 right-40 w-24 h-24 bg-white/5 rounded-full blur-lg animate-pulse hidden lg:block"></div>
      </div>
      
      <div className="h-2 bg-gradient-to-b from-blue-900/20 via-blue-100/30 to-[#F0F4F8]" />
    </>
  );
}

function ProjectFilterBar({ 
  category, 
  onCategoryChange, 
  projectCount 
}: {
  category: ProjectCategory | 'All';
  onCategoryChange: (cat: ProjectCategory | 'All') => void;
  projectCount: number;
}) {
  return (
    <motion.div 
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg border border-blue-100/50 mb-12 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12 w-full">
        <div className="flex-1">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Our Portfolio</h2>
          <p className="text-lg lg:text-xl text-gray-600">
            Showing <span className="font-semibold text-blue-600">{projectCount}</span> projects
            {category !== 'All' && (
              <span> in <span className="font-semibold text-blue-600">{category}</span></span>
            )}
          </p>
        </div>
        <div className="flex gap-2 md:gap-3 flex-wrap justify-center lg:justify-end">
          <motion.button
            className={`px-6 py-2 md:px-7 md:py-2.5 rounded-full border-2 text-sm md:text-base font-semibold transition-all duration-300 ${
              category === 'All' 
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/25' 
                : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:text-blue-600'
            }`}
            onClick={() => onCategoryChange('All')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All Projects
          </motion.button>
          {categories.map((cat) => (
            <motion.button
              key={cat}
              className={`px-6 py-2 md:px-7 md:py-2.5 rounded-full border-2 text-sm md:text-base font-semibold transition-all duration-300 ${
                category === cat 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/25' 
                  : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:text-blue-600'
              }`}
              onClick={() => onCategoryChange(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectsList() {
  const allProjects = getAllProjects();
  const [category, setCategory] = useState<ProjectCategory | 'All'>('All');
  const [page, setPage] = useState(1);

  const filteredProjects = useMemo(() => {
    return category === 'All'
      ? allProjects
      : allProjects.filter((p) => p.category === category);
  }, [allProjects, category]);

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const paginatedProjects = useMemo(() => {
    const start = (page - 1) * PROJECTS_PER_PAGE;
    return filteredProjects.slice(start, start + PROJECTS_PER_PAGE);
  }, [filteredProjects, page]);

  function handleCategoryChange(cat: ProjectCategory | 'All') {
    setCategory(cat);
    setPage(1);
  }

  return (
    <section className="py-16 px-4 lg:px-8 max-w-full mx-auto">
      <ProjectFilterBar 
        category={category}
        onCategoryChange={handleCategoryChange}
        projectCount={filteredProjects.length}
      />
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={`${category}-${page}`}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-6 lg:gap-8 justify-items-center mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {paginatedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <motion.div 
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-blue-100/50">
            {/* Previous Button */}
            <motion.button
              className={`w-12 h-12 rounded-xl flex items-center justify-center font-semibold transition-all duration-300 ${
                page === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
              onClick={() => page > 1 && setPage(page - 1)}
              disabled={page === 1}
              whileHover={page > 1 ? { scale: 1.1 } : {}}
              whileTap={page > 1 ? { scale: 0.9 } : {}}
            >
              &lt;
            </motion.button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <motion.button
                key={p}
                className={`w-12 h-12 rounded-xl flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                  p === page 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
                onClick={() => setPage(p)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {p}
              </motion.button>
            ))}

            {/* Next Button */}
            <motion.button
              className={`w-12 h-12 rounded-xl flex items-center justify-center font-semibold transition-all duration-300 ${
                page === totalPages 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
              onClick={() => page < totalPages && setPage(page + 1)}
              disabled={page === totalPages}
              whileHover={page < totalPages ? { scale: 1.1 } : {}}
              whileTap={page < totalPages ? { scale: 0.9 } : {}}
            >
              &gt;
            </motion.button>
          </div>
        </motion.div>
      )}
    </section>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="text-gray-600 mt-4 font-medium">Loading our amazing projects...</p>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div className="bg-[#F0F4F8] min-h-screen">
      <ProjectsHero />
      <ProjectLayout>
        <Suspense fallback={<LoadingSpinner />}>
          <ProjectsList />
        </Suspense>
      </ProjectLayout>
    </div>
  );
}
