import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types/project';
import { Calendar, User, Folder, MessageSquare } from 'lucide-react';

export default function ProjectCard({ project }: { project: Project }) {
  const metaItems = [
    {
      icon: <Calendar className="w-4 h-4 inline-block mr-1 text-blue-500" />,
      text: new Date(project.date).toLocaleDateString()
    },
    {
      icon: <User className="w-4 h-4 inline-block mr-1 text-blue-500" />,
      text: project.author
    },
    {
      icon: <Folder className="w-4 h-4 inline-block mr-1 text-blue-500" />,
      text: project.category
    },
    {
      icon: <MessageSquare className="w-4 h-4 inline-block mr-1 text-blue-500" />,
      text: project.comments.toString()
    },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-slate-200 hover:border-blue-400 group">
      {/* Gallery Grid or Top Image */}
      {project.gallery && project.gallery.length > 0 ? (
        <div
          className={`grid w-full h-48 md:h-64 ${
            project.gallery.length === 1
              ? 'grid-cols-1'
              : project.gallery.length === 2
              ? 'grid-cols-2'
              : project.gallery.length === 3
              ? 'grid-cols-3'
              : 'grid-cols-2 grid-rows-2'
          }`}
        >
          {project.gallery.slice(0, 4).map((img, idx) => (
            <div key={idx} className="relative w-full h-full overflow-hidden">
              <Image
                src={img}
                alt={`${project.title} gallery ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-95"
                sizes="(max-width: 768px) 100vw, 25vw"
                priority={idx === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative h-48 md:h-64 w-full overflow-hidden">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col md:flex-row items-start">
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
        <div className="flex-1 p-6">
          <div className="flex flex-wrap items-center gap-4 text-slate-600 text-sm mb-3">
            {metaItems.map((item, idx) => (
              <span key={idx} className="flex items-center gap-1 hover:text-blue-700 transition-colors">
                {item.icon}
                {item.text}
              </span>
            ))}
          </div>

          <h3 className="text-2xl font-bold text-blue-900 mb-3 leading-tight">
            <Link href={`/projects/${project.slug}`} className="hover:text-blue-700 transition-colors duration-300">
              {project.title}
            </Link>
          </h3>

          <p className="text-slate-700 mb-4 text-base leading-relaxed line-clamp-3">{project.excerpt}</p>

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
  );
}
