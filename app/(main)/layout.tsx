import { Sidebar } from '@/components/layout';
import { SidebarServer } from '@/components/layout/Sidebar/SidebarServer';
import { SidebarSkeleton } from '@/components/layout/Sidebar/SidebarSkeleton';
import { Suspense } from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Suspense fallback={<SidebarSkeleton />}>
        <SidebarServer />
      </Suspense>
      <main className="flex-1 overflow-y-auto overflow-x-hidden">{children}</main>
    </div>
  );
}
