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
  },
  // Add more projects here
  {
    id: '3',
    slug: 'renovation-constructions',// 
    title: 'Mutare',
    excerpt: 'Complete floor tiling renovation project in Mutare featuring premium ceramic and porcelain tiles. Our skilled craftsmen transformed outdated flooring into stunning, durable surfaces using modern installation techniques. The project included substrate preparation, waterproofing, precision tile laying, and professional grouting to deliver a flawless finish that enhances both aesthetics and functionality.',
    content: `Project Overview: This comprehensive floor tiling renovation project in Mutare showcases Crestly Constructions' expertise in transforming residential and commercial spaces through premium flooring solutions. Our team executed a complete floor renovation, replacing old surfaces with high-quality ceramic and porcelain tiles that combine durability with elegant design.

The project involved meticulous planning and execution, starting with thorough substrate preparation to ensure optimal tile adhesion. We implemented advanced waterproofing systems in wet areas, followed by precision tile installation using modern leveling techniques. Our craftsmen paid special attention to pattern alignment, joint consistency, and seamless transitions between different areas.

Key features include slip-resistant surfaces in high-traffic areas, decorative border designs, and professional grouting with stain-resistant materials. The renovation not only enhanced the aesthetic appeal but also improved the property's value and functionality, demonstrating our commitment to building Zimbabwe's tomorrow—one tile at a time.`,
    heroImage: '/images/rd/ra.png',
    category: 'Construction',
    author: 'Crestly',
    date: '2025-03-17',
    isSticky: true,
    comments: 8,
    tags: ['Flooring', 'Tiling'],
    gallery: [
      '/images/rd/ra.png',
      '/images/rd/rb.png',
      '/images/rd/rc.png',
      '/images/rd/rd.png'
      
    ],
    status: 'published',
    location: 'Mutare, Zimbabwe',
    duration: '1 week',
    client: 'New Ltd'
  }
  //new projeects
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