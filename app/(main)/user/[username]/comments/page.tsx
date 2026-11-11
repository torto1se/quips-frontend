import { Suspense } from 'react';
import { Loader } from '@/components/ui';
import { CommentsTab } from '@/features/user';

export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  return (
    <Suspense fallback={<Loader size="xl" />}>
      <PageContent
        params={params}
        searchParams={searchParams}
      />
    </Suspense>
  );
}

async function PageContent({
  params,
  searchParams,
}: {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ page?: string; limit?: string }>;
}) {
  const { username } = await params;
  const { page, limit } = await searchParams;
  const currentPage = Number(page) || 1;
  const currentLimit = Number(limit) || 5;

  return (
    <CommentsTab
      username={username}
      page={currentPage}
      limit={currentLimit}
    />
  );
}
