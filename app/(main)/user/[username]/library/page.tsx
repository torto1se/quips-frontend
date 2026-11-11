import { Loader } from '@/components/ui';
import { Suspense } from 'react';

export default function Page({ params }: { params: Promise<{ username: string }> }) {
  return (
    <Suspense fallback={<Loader size="xl" />}>
      <PageContent params={params} />
    </Suspense>
  );
}

async function PageContent({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  return <div>библиотека {username}</div>;
}
