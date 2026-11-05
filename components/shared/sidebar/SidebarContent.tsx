'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';

interface SidebarContentProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  children: React.ReactNode;
}

export default function SidebarContent({
  isCollapsed,
  setIsCollapsed,
  children,
}: SidebarContentProps) {
  const pathname = usePathname();

  // Теперь хук вызывается внутри Suspense-границы, Next.js не будет ругаться
  const isAuthPage = pathname.startsWith('/auth');

  if (isAuthPage) {
    return <div className="w-full h-screen bg-[#0a0514]">{children}</div>;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0a0514]">
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <main className="flex-1 overflow-y-auto p-8 transition-all duration-300 ease-in-out">
        {children}
      </main>
    </div>
  );
}
