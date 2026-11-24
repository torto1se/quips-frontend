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
      <div className="w-full p-8 pb-10 max-w-350 mx-auto">
        <div className="flex items-center h-52 bg-gray-900 rounded-2xl overflow-hidden mb-16 p-8">
          <div className="flex items-center gap-6 z-10">
            <div className="w-36 h-36 rounded-full border border-accent overflow-hidden bg-gray-800 relative">
              {isLoading ? (
                <div className="w-full h-full bg-gray-700 animate-pulse" />
              ) : user?.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  width={144}
                  sizes="144px"
                  alt="avatar"
                  priority
                  className="w-full h-full object-cover"
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
              <div className="flex gap-4 items-center">
                <h1 className="text-3xl font-bold text-white">{user?.username}</h1>
                <p className="text-success bg-success/10 py-1 px-2 rounded-lg text-sm">В сети</p>
              </div>
              <p className="text-gray-400 text-base">Статус</p>
              <div>
                <Button size="md">{isOwnProfile ? 'Редактировать' : 'Сообщение'}</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8">
          <div className="flex flex-col lg:flex-row items-start gap-8 mt-8">
            <div className="flex-1 min-w-0 w-full bg-bg-card border border-border rounded-xl overflow-hidden flex flex-col">
              <ProfileTabs username={username} />

              <div className="p-6 flex-1">{children}</div>
            </div>

            <div className="w-full lg:w-80 shrink-0">
              {isLoading ? (
                <div className="w-full h-100 bg-bg-card border border-border rounded-xl animate-pulse" />
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
