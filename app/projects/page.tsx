'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Suspense, useState, useMemo } from 'react';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectLayout from '@/components/projects/ProjectLayout';
import { getAllProjects  } from '@/lib/projects';
import { ProjectCategory } from '@/types/project';

const PROJECTS_PER_PAGE = 3;
const categories: ProjectCategory[] = [
  'Construction',
  'Infrastructure',
  'Boiler-Making',
  'Weilding',
];

function ProjectsHero() {
  return (
    <>
      <div className="relative h-96 w-full overflow-hidden">
        <Image
          src="/images/projects.png"
          alt="Project Showcase"
          fill
          priority
          className="object-cover object-center z-0"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/20 z-10"></div>
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Projects
          </motion.h1>
          <motion.p
            className="text-xl text-white mt-4 max-w-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Home
        »  Projects
          </motion.p>
        </div>
      </div>
      <div className="h-12 bg-gradient-to-b from-black/10 to-white" />
    </>
  );
}

function ProjectsList() {
  const allProjects = getAllProjects();
  //const featured = getFeaturedProjects();
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
    <>
      {/*<section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>*/}

      <section className="py-16 px-6 lg:px-12">
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <h2 className="text-3xl font-bold text-gray-900">Projects</h2>
          <div className="flex gap-2 flex-wrap">
            <button
              className={`px-4 py-2 rounded-full border text-sm font-medium ${category === 'All' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border-gray-300'}`}
              onClick={() => handleCategoryChange('All')}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full border text-sm font-medium ${category === cat ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border-gray-300'}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {paginatedProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-12 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-lg ${p === page ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setPage(p)}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          ))}
          {/* Next Arrow */}
          <button
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-lg ${page === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => page < totalPages && setPage(page + 1)}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            &gt;
          </button>
        </div>
      </section>
    </>
  );
}

export default function ProjectsPage() {
  return (
    <div className="bg-[#F0F4F8] min-h-screen">
      <ProjectsHero />
      <ProjectLayout showSidebar={true}>
        <Suspense fallback={<div className="text-center py-12">Loading projects...</div>}>
          <ProjectsList />
        </Suspense>
      </ProjectLayout>
    </div>
  );
}
