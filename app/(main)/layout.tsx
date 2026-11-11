import { Suspense } from 'react';
import { Loader } from '@/components/ui';
import { Sidebar } from '@/components/layout';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Suspense fallback={<Loader />}>
        <Sidebar />
      </Suspense>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
