// app/(main)/layout.tsx
import { Suspense } from 'react';
import { Loader } from '@/components/ui';
import { getCurrentUser } from '@/lib/auth-server';
import { Sidebar } from '@/components/layout';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Suspense fallback={<Loader />}>
        <LayoutContent />
      </Suspense>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}

async function LayoutContent() {
  const user = await getCurrentUser();
  return (
    <>
      <Sidebar user={user} />
    </>
  );
}
