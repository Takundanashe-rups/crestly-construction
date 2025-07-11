export type ProjectCategory = 'Construction' | 'Infrastructure' | 'Boiler-Making' | 'Weilding';

export interface Project {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  heroImage: string;
  category: ProjectCategory;
  author: string;
  date: string;
  isSticky?: boolean;
  comments: number;
  tags: string[];
  gallery?: string[];
  status: 'published' | 'draft';
  location?: string;
  duration?: string;
  client?: string;
} 