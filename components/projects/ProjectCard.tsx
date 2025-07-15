import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types/project';
import { Calendar, User, Folder, MessageSquare } from 'lucide-react';

export default function ProjectCard({ project }: { project: Project }) {
  const metaItems = [
    {
      icon: <Calendar className="w-4 h-4 inline-block mr-1 text-yellow-600" />,
      text: new Date(project.date).toLocaleDateString()
    },
    {
      icon: <User className="w-4 h-4 inline-block mr-1 text-yellow-600" />,
      text: project.author
    },
    {
      icon: <Folder className="w-4 h-4 inline-block mr-1 text-yellow-600" />,
      text: project.category
    },
    {
      icon: <MessageSquare className="w-4 h-4 inline-block mr-1 text-yellow-600" />,
      text: project.comments.toString()
    },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-md shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-2 border-gray-300 hover:border-blue-400 group flex flex-col w-full max-w-[420px] h-[650px]">
      {/* Top Image Only - Improved */}
      <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        <Image
          src={project.gallery && project.gallery.length > 0 ? project.gallery[0] : project.heroImage}
          alt={project.title}
          fill
          className="object-cover object-center transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-105 group-hover:contrast-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        
        {/* Enhanced overlay with subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Corner vignette for better image framing */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 pointer-events-none"></div>
        
        {/* Optional: Category badge overlay */}
        <div className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col md:flex-row items-start min-h-0">
        {/* Date Box */}
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 border-b md:border-b-0 md:border-r border-slate-200 px-4 py-3 md:py-4 min-w-[64px]">
          <span className="text-2xl font-extrabold text-blue-600 leading-none">
            {new Date(project.date).getDate().toString().padStart(2, '0')}
          </span>
          <span className="uppercase text-xs text-blue-700 tracking-widest font-medium">
            {new Date(project.date).toLocaleString('default', { month: 'short' })}
          </span>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 flex flex-col min-h-0">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-slate-600 text-sm mb-3">
            {metaItems.map((item, idx) => (
              <span key={idx} className="flex items-center gap-1 hover:text-blue-700 transition-colors">
                {item.icon}
                {item.text}
              </span>
            ))}
          </div>

          <h3 className="text-2xl font-bold text-blue-900 mb-3 leading-tight line-clamp-2">
            <Link href={`/projects/${project.slug}`} className="hover:text-blue-700 transition-colors duration-300">
              {project.title}
            </Link>
          </h3>

          <p className="text-slate-700 mb-4 text-base leading-relaxed line-clamp-3 flex-1">
            {project.excerpt}
          </p>

          <div className="mt-auto">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-all duration-300 group/link"
            >
              Continue Reading
              <svg className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
