import { ReactNode } from 'react';

export default function ProjectLayout({ 
  children
}: { 
  children: ReactNode;
}) {
  return (
    <div className="max-w-[1600px] mx-auto px-2 md:px-6 lg:px-12 py-8">
      <main className="w-full">
        {children}
      </main>
    </div>
  );
} 