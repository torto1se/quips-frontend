'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api';
import { useCurrentProfile } from '@/features/profile/hooks/useCurrentProfile';

type ProfileClientProps = {
  paramsPromise: Promise<{ username: string }>;
};

export default function ProfileClient({ username }: { username: string }) {
  const {
    data: targetUser,
    isLoading: isProfileLoading,
    error,
  } = useQuery({
    queryKey: ['user-profile', username],
    queryFn: () => userApi.getByUsername(username),
    enabled: Boolean(username),
  });

  const { data: currentUser } = useCurrentProfile();

  if (isProfileLoading)
    return <div className="p-10 text-center text-text-muted">Загрузка профиля...</div>;
  if (error || !targetUser)
    return <div className="p-10 text-center text-red-400">Пользователь не найден</div>;

  const isMyProfile = currentUser?.username === targetUser.username;

  return (
    <div className="p-6 space-y-6 max-w-2xl bg-bg-div border border-zinc-800/40 rounded-2xl shadow-xl">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-full bg-zinc-800 bg-cover bg-center"
            style={{ backgroundImage: `url(${targetUser.avatarUrl || '/default-avatar.png'})` }}
          />
          <div>
            <h1 className="text-2xl font-bold text-text-main">{targetUser.username}</h1>
            <p className="text-sm text-text-muted">{targetUser.role}</p>
          </div>
        </div>

        {isMyProfile ? (
          <button className="px-4 py-2 text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-text-main rounded-xl transition">
            Редактировать профиль
          </button>
        ) : (
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm bg-accent hover:bg-accent/90 text-black font-bold rounded-xl transition">
              Написать сообщение
            </button>
            {/* Безопасный доступ к blockStatus через optional chaining */}
            {targetUser.blockStatus?.blockedByMe && (
              <button className="px-3 py-2 text-sm bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl">
                В ЧС
              </button>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-zinc-800/60 pt-4 space-y-2">
        {targetUser.profile ? (
          <>
            <p className="text-text-main">
              <span className="text-text-muted">О себе:</span>{' '}
              {targetUser.profile.bio || 'Геймер скрыл информацию о себе'}
            </p>
            <p className="text-text-main">
              <span className="text-text-muted">Возраст:</span>{' '}
              {targetUser.profile.age ? `${targetUser.profile.age} лет` : 'Не указан'}
            </p>
            <p className="text-text-main">
              <span className="text-text-muted">Платформа:</span>{' '}
              <span className="uppercase">{targetUser.profile.platform || 'Не указана'}</span>
            </p>
          </>
        ) : (
          <p className="text-text-muted italic">Анкета еще не заполнена пользователем</p>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-text-muted">Любимые игры:</h3>
        <div className="flex flex-wrap gap-2">
          {targetUser.games?.length > 0 ? (
            targetUser.games.map((game) => (
              <span
                key={game.id}
                className="px-3 py-1 text-xs bg-black/30 border border-zinc-800 rounded-lg text-text-main"
              >
                {game.title}
              </span>
            ))
          ) : (
            <p className="text-xs text-text-muted">Игры не указаны</p>
          )}
        </div>
      </div>
    </div>
  );
}
