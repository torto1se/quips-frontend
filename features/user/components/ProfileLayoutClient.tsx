'use client';

import { Button } from '@/components/ui';
import { ProfileSidebar } from '@/features/user/components/ProfileSidebar';
import { ProfileTabs } from '@/features/user/components/ProfileTabs';
import { useUserProfile } from '@/features/user/hooks/useUserProfile';
import { ProfileProvider } from '@/features/user/providers/ProfileContext';
import { UserPayload } from '@/lib/auth-server';
import Image from 'next/image';
import { use } from 'react';

export function ProfileLayoutClient({
  params,
  children,
  currentUserPromise,
}: {
  params: Promise<{ username: string }>;
  children: React.ReactNode;
  currentUserPromise: Promise<UserPayload | null>;
}) {
  const { username } = use(params);
  const currentUser = use(currentUserPromise);
  const isOwnProfile = currentUser?.username === username;
  const { data: user, isLoading, error } = useUserProfile(username);

  if (error) return <div>{error.message}</div>;

  return (
    <ProfileProvider
      isOwnProfile={isOwnProfile}
      user={user}
      currentUser={currentUser}
    >
      <div className="mx-auto w-full max-w-350 p-8 pb-10">
        <div className="mb-16 flex h-52 items-center overflow-hidden rounded-2xl bg-gray-900 p-8">
          <div className="z-10 flex items-center gap-6">
            <div className="border-accent relative h-36 w-36 overflow-hidden rounded-full border bg-gray-800">
              {isLoading ? (
                <div className="h-full w-full animate-pulse bg-gray-700" />
              ) : user?.avatarUrl ? (
                <Image
                  className="h-full w-full object-cover"
                  src={user.avatarUrl}
                  width={144}
                  sizes="144px"
                  alt="avatar"
                  priority
                />
              ) : (
                <Image
                  alt="avatar"
                  width={144}
                  height={144}
                  sizes="144px"
                  priority
                  src={'/default-avatar.png'}
                />
              )}
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold text-white">{user?.username}</h1>
                <p className="text-success bg-success/10 rounded-lg px-2 py-1 text-sm">В сети</p>
              </div>
              <p className="text-base text-gray-400">Статус</p>
              <div>
                <Button size="md">{isOwnProfile ? 'Редактировать' : 'Сообщение'}</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8">
          <div className="mt-8 flex flex-col items-start gap-8 lg:flex-row">
            <div className="bg-bg-card border-border flex w-full min-w-0 flex-1 flex-col overflow-hidden rounded-xl border">
              <ProfileTabs username={username} />

              <div className="flex-1 p-6">{children}</div>
            </div>

            <div className="w-full shrink-0 lg:w-80">
              {isLoading ? (
                <div className="bg-bg-card border-border h-100 w-full animate-pulse rounded-xl border" />
              ) : (
                <ProfileSidebar profile={user?.profile} />
              )}
            </div>
          </div>
        </div>
      </div>
    </ProfileProvider>
  );
}
