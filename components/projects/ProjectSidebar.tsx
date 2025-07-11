'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getAllProjects } from '@/lib/projects';

const recentComments = [
  {
    author: 'Morgan T Malaila',
    text: 'on The Surfing Man Will Blow Your Mind',
    href: '#',
    date: '2 days ago',
  },
  {
    author: 'B Moyo',
    text: 'on Separated they live in Bookmarksgrove',
    href: '#',
    date: '3 days ago',
  },
  {
    author: 'Trymore Bhene',
    text: 'on Even the all-powerful Pointing',
    href: '#',
    date: '5 days ago',
  },
  {
    author: 'John Smith',
    text: 'on Pityful a rethoric question ran',
    href: '#',
    date: '1 week ago',
  },
  {
    author: 'John Smitho',
    text: 'on I am so happy, my dear friend',
    href: '#',
    date: '2 weeks ago',
  },
];

export default function ProjectSidebar() {
  const recentProjects = getAllProjects().slice(0, 9); // Up to 9 projects

  return (
    <aside className="space-y-10 text-slate-800">
      {/* Text Widget */}
      <div className="bg-gradient-to-br from-blue-50 to-slate-100 rounded-xl p-5 border border-slate-200 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-widest text-blue-700 mb-3">About Us</h3>
        <p className="text-sm leading-relaxed text-slate-700">
          We bring ideas to life through strong architectural design, structural precision, and industry-grade construction practices. From blueprint to reality, we deliver quality you can trust.
        </p>
      </div>

      {/* Recent Projects */}
      <div className="bg-gradient-to-br from-white via-blue-50 to-slate-100 rounded-xl p-5 border border-slate-200 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-widest text-blue-700 mb-4">Recent Works</h3>
        <div className="grid grid-cols-3 gap-2">
          {recentProjects.map((project) => (
            <Link key={project.id} href={`/projects/${project.slug}`}>
              <div className="aspect-square relative rounded-lg overflow-hidden group cursor-pointer border border-slate-200 hover:border-blue-400 transition duration-300 shadow-sm">
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 group-hover:brightness-95 transition duration-300"
                  sizes="64px"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent px-1 py-1 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  {project.title}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Comments */}
      <div className="bg-gradient-to-br from-blue-50 to-slate-100 rounded-xl p-5 border border-slate-200 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-widest text-blue-700 mb-4">Recent Comments</h3>
        <ul className="space-y-2 text-sm text-slate-700">
          {recentComments.map((comment, idx) => (
            <li key={idx}>
              <span className="font-semibold text-blue-900">{comment.author}</span>{' '}
              <Link
                href={comment.href}
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {comment.text}
              </Link>
              <div className="text-xs text-slate-500">{comment.date}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Tag Cloud */}
      <div className="bg-gradient-to-br from-white via-blue-50 to-slate-100 rounded-xl p-5 border border-slate-200 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-widest text-blue-700 mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {['Construction', 'Boiler-Making', 'Infrastructure', 'Renovation', 'Consultancy'].map(
            (tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>
    </aside>
  );
}
