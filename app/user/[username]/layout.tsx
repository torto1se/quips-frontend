import { Loader } from '@/components/ui';
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
  return (
    <Suspense fallback={<Loader size="xl" />}>
      <LayoutContent params={params}>{children}</LayoutContent>
    </Suspense>
  );
}

async function LayoutContent({
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
      username={username}
      isOwnProfile={isOwnProfile}
    >
      {children}
    </ProfileLayoutClient>
  );
}
