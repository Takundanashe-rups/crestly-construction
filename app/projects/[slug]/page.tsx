import { notFound } from 'next/navigation';
import Image from 'next/image';
import ProjectLayout from '@/components/projects/ProjectLayout';
import { getProjectBySlug, getAllProjects } from '@/lib/projects';

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

  return (
    <ProjectLayout showSidebar={false}>
      <article>
        <div className="relative h-96 mb-10 rounded-2xl overflow-hidden shadow-xl">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 75vw"
          />
          {/* Overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent" />
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div className="md:col-span-2">
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6 leading-tight drop-shadow-lg">{project.title}</h1>
            <div 
              className="prose prose-lg max-w-none text-slate-800"
              dangerouslySetInnerHTML={{ __html: project.content }} 
            />
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-gradient-to-br from-white via-blue-50 to-slate-100 rounded-2xl p-8 border border-blue-100 shadow-lg">
              <h3 className="text-xl font-bold text-blue-800 mb-6 tracking-wide">Project Details</h3>
              <ul className="space-y-4 text-base text-blue-900">
                {project.location && (
                  <li className="flex">
                    <span className="font-semibold w-28">Location:</span>
                    <span className="text-slate-700">{project.location}</span>
                  </li>
                )}
                {project.duration && (
                  <li className="flex">
                    <span className="font-semibold w-28">Duration:</span>
                    <span className="text-slate-700">{project.duration}</span>
                  </li>
                )}
                {project.client && (
                  <li className="flex">
                    <span className="font-semibold w-28">Client:</span>
                    <span className="text-slate-700">{project.client}</span>
                  </li>
                )}
                <li className="flex">
                  <span className="font-semibold w-28">Category:</span>
                  <span className="text-slate-700">{project.category}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {project.gallery && project.gallery.length > 0 && (
          <section className="mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-10">Project Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {project.gallery.map((img, index) => (
                <div key={index} className="aspect-square relative rounded-xl overflow-hidden shadow-md group">
                  <Image
                    src={img}
                    alt={`${project.title} gallery ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-95"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
    </ProjectLayout>
  );
} 