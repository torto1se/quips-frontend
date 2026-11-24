import { ProfileLayoutClient } from '@/features/user';
import { getCurrentUser } from '@/lib/auth-server';
import { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  const title = `${username}`;
  const description = `Профиль ${username} в Quips`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      url: `/user/${username}`,
      siteName: 'Quips',
    },
    twitter: { card: 'summary', title, description },
    alternates: { canonical: `user/${username}` },
  };
}

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ username: string }>;
}) {
  const currentUserPromise = getCurrentUser();
  return (
    <Suspense fallback={<ProfileLayoutSkeleton />}>
      <ProfileLayoutClient
        params={params}
        currentUserPromise={currentUserPromise}
      >
        {children}
      </ProfileLayoutClient>
    </Suspense>
  );
}

function ProfileLayoutSkeleton() {
  return (
    <div className="mx-auto w-full max-w-300 animate-pulse pb-10">
      <div className="relative mb-16 h-64 overflow-hidden rounded-b-xl bg-gray-900" />
      <div className="space-y-4 px-8">
        <div className="h-10 w-32 rounded-md bg-gray-800" />
        <div className="h-10 w-full rounded-md bg-gray-800" />
      </div>
    </div>
  );
}
