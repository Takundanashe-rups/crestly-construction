import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Projects | Crestly Construction',
  description: 'Explore our portfolio of construction projects showcasing excellence in construction, infrastructure, boiler-making, and renovation services.',
  keywords: 'construction projects, infrastructure, boiler-making, renovation, Crestly Construction portfolio',
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100">
      {children}
    </div>
  );
} 