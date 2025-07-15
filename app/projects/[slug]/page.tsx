import { notFound } from 'next/navigation';
import Image from 'next/image';
import ProjectLayout from '@/components/projects/ProjectLayout';
import { getProjectBySlug, getAllProjects } from '@/lib/projects';
import Link from 'next/link';
import { Calendar, User, Folder, MapPin, Clock, Building2, ArrowLeft, ExternalLink } from 'lucide-react';
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
  if (project.location) specItems.push({ icon: <MapPin className="w-5 h-5 text-blue-600" />, label: 'Location', value: project.location });
  if (project.duration) specItems.push({ icon: <Clock className="w-5 h-5 text-blue-600" />, label: 'Duration', value: project.duration });
  if (project.client) specItems.push({ icon: <Building2 className="w-5 h-5 text-blue-600" />, label: 'Client', value: project.client });
  specItems.push({ icon: <Folder className="w-5 h-5 text-blue-600" />, label: 'Category', value: project.category });
  specItems.push({ icon: <Calendar className="w-5 h-5 text-blue-600" />, label: 'Date', value: new Date(project.date).toLocaleDateString() });

  return (
    <div className="bg-[#F0F4F8] min-h-screen">
      <ProjectLayout>
        <article className="max-w-7xl mx-auto">
          {/* Breadcrumb Navigation */}
          <div className="px-6 lg:px-12 py-6">
            <Link 
              href="/projects" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </Link>
          </div>

          {/* Enhanced Hero Section */}
          <div className="relative h-[60vh] mb-16 mx-6 lg:mx-12 rounded-3xl overflow-hidden shadow-2xl group">
            <Image
              src={project.heroImage}
              alt={`Hero image for ${project.title} construction project`}
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 85vw"
            />
            {/* Black gradient overlays only */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
          </div>

          {/* Main Content Section */}
          <section className="px-6 lg:px-12 mb-20">
            <div className="grid lg:grid-cols-3 gap-12">
              
              {/* Content Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Project Overview Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blue-100/50">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-1 h-8 bg-blue-600 rounded-full" />
                    Project Overview
                  </h2>
                  <div 
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed
                              prose-headings:text-gray-900 prose-headings:font-semibold
                              prose-p:text-gray-700 prose-p:leading-relaxed
                              prose-strong:text-gray-900 prose-strong:font-semibold
                              prose-ul:text-gray-700 prose-li:text-gray-700"
                    dangerouslySetInnerHTML={{ __html: project.content }} 
                  />
                </div>

                {/* Key Features or Additional Info (if you want to add more content) */}
                <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8 border border-blue-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Project Highlights</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      <span>High-quality construction standards</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      <span>Timely project delivery</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      <span>Sustainable building practices</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      <span>Expert engineering solutions</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-6">
                  
                  {/* Project Details Card */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100/50">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-blue-600 rounded-full" />
                      Project Details
                    </h3>
                    <div className="space-y-4">
                      {specItems.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50/50 transition-colors">
                          <div className="flex-shrink-0 mt-0.5">
                            {item.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-gray-900">{item.label}</div>
                            <div className="text-sm text-gray-600 break-words">{item.value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact CTA Card */}
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
                    <h4 className="text-lg font-bold mb-3">Interested in Similar Work?</h4>
                    <p className="text-blue-100 text-sm mb-4">
                      Get in touch with our team to discuss your construction needs.
                    </p>
                    <Link 
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors w-full justify-center"
                    >
                      Contact Us
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Enhanced Gallery Section */}
          {project.gallery && project.gallery.length > 0 && (
            <section className="px-6 lg:px-12 mb-20">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-4 mb-4">
                  <div className="h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent flex-1" />
                  <div className="w-3 h-3 bg-blue-600 rounded-full" />
                  <div className="h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent flex-1" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Project Gallery</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Explore the visual journey of this project from conception to completion
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {project.gallery?.map((img, index) => (
                  <div 
                    key={index} 
                    className={`relative overflow-hidden rounded-2xl shadow-lg group border border-blue-100 bg-white hover:shadow-2xl transition-all duration-500 ${
                      index === 0 ? 'sm:col-span-2 sm:row-span-2 aspect-square sm:aspect-auto' : 'aspect-square'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Gallery image ${index + 1} of ${project.title} construction project`}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Image overlay info */}
                     
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