import Link from "next/link";
import Image from "next/image";
import { getFeaturedProjects } from "@/lib/projects";

export default function ProjectsShowcase() {
  // Get the two most recent/featured projects
  const projects = getFeaturedProjects().slice(0, 2);

  return (
    <section className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="text-blue-900 text-sm mb-2 font-semibold">&raquo; Latest Project</div>
           
        </div>
        <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="relative w-full lg:w-[600px] h-[400px] rounded-xl overflow-hidden shadow-xl group border border-slate-200 bg-white"
            >
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 600px"
                priority={idx === 0}
              />
              
              {/* Strategic overlay positioning - top-left to avoid main focal points */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-lg min-w-[280px] max-w-[360px] border border-gray-200/50 transition-all duration-300 group-hover:bg-white/98 group-hover:shadow-xl">
                {/* Category badge */}
                <div className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wide">
                  {project.category}
                </div>
                
                <h3 className="font-bold text-lg mb-3 text-gray-900 leading-tight">
                  <Link 
                    href={`/projects/${project.slug}`} 
                    className="hover:text-blue-700 transition-colors duration-200"
                  >
                    {project.title}
                  </Link>
                </h3>
                
                <p className="text-gray-700 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {project.excerpt}
                </p>
                
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 text-yellow-600 font-semibold text-sm hover:text-yellow-700 transition-colors duration-200 group/link"
                >
                  Read More 
                  <span 
                    aria-hidden 
                    className="transition-transform duration-200 group-hover/link:translate-x-1"
                  >
                    &raquo;
                  </span>
                </Link>
              </div>

               
               
            </div>
          ))}
        </div>
        
        {/* Navigation dots (if implementing carousel functionality) */}
        <div className="flex justify-center mt-8 gap-2">
          {projects.map((_, idx) => (
            <div 
              key={idx}
              className="w-2 h-2 rounded-full bg-blue-300 hover:bg-blue-500 transition-colors duration-200 cursor-pointer"
            />
          ))}
        </div>
      </div>
    </section>
  );
}