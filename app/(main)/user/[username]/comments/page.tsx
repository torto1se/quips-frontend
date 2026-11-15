import { Suspense } from 'react';
import { Loader } from '@/components/ui';
import { CommentsTab } from '@/features/user';

export default function Page({ params }: { params: Promise<{ username: string }> }) {
  return (
    <Suspense fallback={<Loader size="xl" />}>
      <CommentsTab params={params} />
    </Suspense>
  );
}
