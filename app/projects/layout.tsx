import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Projects | Crestly Construction',
  description: 'Explore our portfolio of construction projects showcasing excellence in construction, infrastructure, boiler-making, and renovation services.',
  keywords: 'construction projects, infrastructure, boiler-making, renovation, Crestly Construction portfolio',
  openGraph: {
    title: 'Our Projects | Crestly Construction',
    description: 'Discover our exceptional portfolio of construction and infrastructure projects.',
    type: 'website',
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 bg-gradient-to-br from-[#F0F4F8] via-blue-50/80 to-slate-100/90 -z-10"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/30 via-transparent to-transparent -z-10"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 