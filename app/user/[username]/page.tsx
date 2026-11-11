import { Suspense } from 'react';
import { Loader } from '@/components/ui';
import { OverviewTab } from '@/features/user';

export default async function Page({ params }: { params: Promise<{ username: string }> }) {
  return (
    <Suspense fallback={<Loader size="xl" />}>
      <PageContent params={params} />
    </Suspense>
  );
}

async function PageContent({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  return <OverviewTab username={username} />;
}
