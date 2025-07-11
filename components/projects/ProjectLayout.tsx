import { ReactNode } from 'react';
import ProjectSidebar from './ProjectSidebar';

export default function ProjectLayout({ 
  children,
  showSidebar = true,
  sidebar
}: { 
  children: ReactNode;
  showSidebar?: boolean;
  sidebar?: ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <main className={`${showSidebar ? 'w-full lg:w-3/4' : 'w-full'}`}>
          {children}
        </main>
        {showSidebar && (
          <aside className="w-full lg:w-1/4 space-y-8">
            {sidebar || <ProjectSidebar />}
          </aside>
        )}
      </div>
    </div>
  );
} 