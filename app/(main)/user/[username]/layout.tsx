import { ProfileLayoutClient } from '@/features/user';
import { getCurrentUser, UserPayload } from '@/lib/auth-server';
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
  return (
    <Suspense fallback={<ProfileLayoutSkeleton />}>
      <LayoutServer params={params}>{children}</LayoutServer>
    </Suspense>
  );
}

async function LayoutServer({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const currentUser = await getCurrentUser();
  const isOwnProfile = currentUser?.username === username;

  return (
    <ProfileLayoutClient
      params={params}
      currentUser={currentUser}
      isOwnProfile={isOwnProfile}
    >
      {children}
    </ProfileLayoutClient>
  );
}

function ProfileLayoutSkeleton() {
  return (
    <div className="max-w-300 mx-auto w-full pb-10 animate-pulse">
      <div className="relative h-64 bg-gray-900 rounded-b-xl overflow-hidden mb-16" />
      <div className="px-8 space-y-4">
        <div className="w-32 h-10 bg-gray-800 rounded-md" />
        <div className="w-full h-10 bg-gray-800 rounded-md" />
      </div>
    </div>
  );
}
