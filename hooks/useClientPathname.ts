'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useClientPathname() {
  const pathname = usePathname();
  const [clientPathname, setClientPathname] = useState<string | null>(null);

  useEffect(() => {
    setClientPathname(pathname);
  }, [pathname]);

  return clientPathname;
}