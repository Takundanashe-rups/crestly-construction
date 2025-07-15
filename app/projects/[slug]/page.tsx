import { notFound } from 'next/navigation';
import Image from 'next/image';
import ProjectLayout from '@/components/projects/ProjectLayout';
import { getProjectBySlug, getAllProjects } from '@/lib/projects';
import Link from 'next/link';
import { Calendar, User, Folder, MapPin, Clock, Building2 } from 'lucide-react';
import React from 'react';

export async function generateStaticParams() {
  return getAllProjects().map(project => ({
    slug: project.slug
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };
  
  return {
    title: `${project.title} | Crestly Construction`,
    description: project.excerpt,
    openGraph: {
      images: [project.heroImage]
    }
  };
}



export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  
  if (!project) notFound();

  // Icon system for specs
  const specItems: { icon: React.ReactNode; label: string; value: string }[] = [];
  if (project.location) specItems.push({ icon: <MapPin className="w-5 h-5 text-yellow-600" />, label: 'Location', value: project.location });
  if (project.duration) specItems.push({ icon: <Clock className="w-5 h-5 text-yellow-600" />, label: 'Duration', value: project.duration });
  if (project.client) specItems.push({ icon: <Building2 className="w-5 h-5 text-yellow-600" />, label: 'Client', value: project.client });
  specItems.push({ icon: <Folder className="w-5 h-5 text-yellow-600" />, label: 'Category', value: project.category });
  specItems.push({ icon: <Calendar className="w-5 h-5 text-yellow-600" />, label: 'Date', value: new Date(project.date).toLocaleDateString() });

  return (
    <div className="bg-[#F0F4F8] min-h-screen">
      <ProjectLayout showSidebar={false}>
        <article>
          {/* Hero Section with Title Overlay */}
          <div className="relative h-96 mb-10 rounded-2xl overflow-hidden shadow-xl group border border-blue-100 bg-white">
            <Image
              src={project.heroImage}
              alt={`Hero image for ${project.title} construction project`}
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 75vw"
            />
            {/* Subtle bottom overlay for text contrast */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col gap-3">
              <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-2">{project.title}</h1>
              {/* Material Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="bg-white/80 text-[#1e3a8a] px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-100 transition-colors cursor-pointer border border-blue-200 shadow-sm backdrop-blur">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <section className="py-8 px-6 lg:px-12">
            <div className="grid md:grid-cols-3 gap-8 items-start mb-12">
              <div className="md:col-span-2">
                <div 
                  className="prose prose-lg max-w-prose text-slate-800"
                  dangerouslySetInnerHTML={{ __html: project.content }} 
                />
              </div>
              <div className="md:col-span-1">
                <div className="bg-gradient-to-br from-white via-blue-50 to-slate-100 rounded-2xl p-8 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold text-[#1e3a8a] mb-6 tracking-wide flex items-center gap-2">
                    <Folder className="w-5 h-5 text-yellow-600" /> Project Details
                  </h3>
                  <ul className="space-y-4 text-base text-gray-600">
                    {specItems.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <span className="flex items-center gap-1 font-semibold w-32 text-[#1e3a8a]">{item.icon} {item.label}:</span>
                        <span className="text-slate-700">{item.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
          {/* Divider before gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <section className="mt-20">
              <div className="mb-10 flex items-center gap-4">
                <span className="h-1 w-10 bg-[#1e3a8a] rounded-full" />
                <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a]">Project Gallery</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {project.gallery.map((img, index) => (
                  <div key={index} className="aspect-square relative overflow-hidden shadow-md group border border-blue-100 bg-white hover:shadow-xl transition-all">
                    <Image
                      src={img}
                      alt={`Gallery image ${index + 1} of ${project.title} construction project`}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-95"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </article>
      </ProjectLayout>
    </div>
  );
}