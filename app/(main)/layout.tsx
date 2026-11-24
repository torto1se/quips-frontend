import { Sidebar } from '@/components/layout';
import { SidebarSkeleton } from '@/components/layout/Sidebar/SidebarSkeleton';
import { getCurrentUser } from '@/lib/auth-server';
import { Suspense } from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const currentUserPromise = getCurrentUser();
  return (
    <div className="flex h-screen overflow-hidden">
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar currentUserPromise={currentUserPromise} />
      </Suspense>
      <main className="flex-1 overflow-y-auto overflow-x-hidden">{children}</main>
    </div>
  );
}
