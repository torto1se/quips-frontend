'use client';

import { ProfileTabs } from '@/features/user/components/ProfileTabs';
import { useUserProfile } from '@/features/user/hooks/useUserProfile';
import Image from 'next/image';

export function ProfileLayoutClient({
  children,
  username,
  isOwnProfile,
}: {
  children: React.ReactNode;
  username: string;
  isOwnProfile: boolean;
}) {
  const { data: profile, isLoading, error } = useUserProfile(username);

  if (error) return <div>{error.message}</div>;

  return (
    <div className="max-w-300 mx-auto w-full pb-10">
      <div className="relative h-64 bg-gray-900 rounded-b-xl overflow-hidden mb-16">
        <div className="absolute -bottom-12 left-8 flex items-end gap-6 z-10">
          <div className="w-32 h-32 rounded-full border-4 border-black overflow-hidden bg-gray-800 relative">
            {isLoading ? (
              <div className="w-full h-full bg-gray-700 animate-pulse" />
            ) : profile?.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                width={128}
                height={128}
                alt="avatar"
                priority
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                alt="avatar"
                width={128}
                height={128}
                priority
                src={'/default-avatar.png'}
              />
            )}
          </div>
          <div className="mb-2">
            <h1 className="text-3xl font-bold text-white">
              {isLoading ? 'Загрузка...' : profile?.username || username}
            </h1>
            {!isLoading && profile && <p className="text-gray-400 text-sm">В сети</p>}
          </div>
        </div>
      </div>

      <div className="px-8">
        <div className="flex gap-4 mb-4">
          {!isLoading &&
            profile &&
            (isOwnProfile ? (
              <button className="px-6 py-2 bg-purple-600 rounded-md font-medium text-white hover:bg-purple-700">
                Редактировать
              </button>
            ) : (
              <>
                <button className="px-6 py-2 bg-purple-600 rounded-md font-medium text-white hover:bg-purple-700">
                  Сообщение
                </button>
                {'blockStatus' in profile && (
                  <button className="px-4 py-2 bg-gray-800 rounded-md text-white hover:bg-gray-700">
                    {profile.blockStatus.blockedByMe ? 'Разблокировать' : 'Еще'}
                  </button>
                )}
              </>
            ))}
        </div>

        <ProfileTabs username={username} />

        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
