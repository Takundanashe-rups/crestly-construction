import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: '1',
    slug: 'modern-office-complex-harare',
    title: 'Modern Office Complex - Harare CBD',
    excerpt: 'Highland Heights is a luxury residential complex consisting of 48 modern apartments spread across 6 blocks. Our team handled the full spectrum of construction services—from architectural planning and structural engineering to final finishing. Each unit features open-plan living, high-end fittings, and eco-friendly designs powered by solar and borehole systems..',
    content: `<p>Project Overview Gun hill Office Complex is a modern, multi-functional commercial building located in the tranquil suburbs of Bluffhill, Harare. Designed and executed by Crestly Constructions, the building showcases a harmonious blend of structural elegance and functional workspace design. It marks a significant milestone in our commitment to building Zimbabwe’s tomorrow—one structure at a time.</p>`,
    heroImage: '/images/projects-img/Gunhill1.jpg',
    category: 'Construction',
    author: 'Crestly Constructions',
    date: '2024-03-15',
    isSticky: true,
    comments: 8,
    tags: ['commercial', 'sustainable'],
    gallery: [
      '/images/projects-img/Gunhill1.jpg',
      '/images/projects-img/Gunhill2.jpg',
      '/images/projects-img/Gunhill2.jpg',
      '/images/projects-img/Gunhill2.jpg'
      
    ],
    status: 'published',
    location: 'Harare, Zimbabwe',
    duration: '18 months',
    client: 'Gunhill Ltd'
  },
   {
    id: '2',
    slug: 'world-weilding',// put - between the worlds for routing
    title: 'Weilding - Harare CBD',
    excerpt: 'Highland Heights is a luxury residential complex consisting of 48 modern apartments spread across 6 blocks. Our team handled the full spectrum of construction services—from architectural planning and structural engineering to final finishing. Each unit features open-plan living, high-end fittings, and eco-friendly designs powered by solar and borehole systems..',
    content: `<p>Project Overview Bluffhill Office Complex is a modern, multi-functional commercial building located in the tranquil suburbs of Bluffhill, Harare. Designed and executed by Crestly Constructions, the building showcases a harmonious blend of structural elegance and functional workspace design. It marks a significant milestone in our commitment to building Zimbabwe’s tomorrow—one structure at a time.</p>`,
    heroImage: '/images/back-1.jpg',
    category: 'Boiler-Making',
    author: 'Crestly Constructions',
    date: '2024-03-17',
    isSticky: true,
    comments: 8,
    tags: ['commercial', 'sustainable'],
    gallery: [
      '/images/back-1.jpg',
      '/images/back-2.jpg',
      '/images/back-5.jpg',
      '/images/contact-us.webp'
      
    ],
    status: 'published',
    location: 'Mutare, Zimbabwe',
    duration: '18 months',
    client: 'NewWorld Ltd'
  }
  // Add more projects here
];

export const getAllProjects = (): Project[] => 
  projects.filter(p => p.status === 'published');

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find(p => p.slug === slug && p.status === 'published');

export const getFeaturedProjects = (): Project[] =>
  [...projects]
    .filter(p => p.status === 'published')
    .sort((a, b) => 
      (b.isSticky ? 1 : 0) - (a.isSticky ? 1 : 0) || 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, 3); 