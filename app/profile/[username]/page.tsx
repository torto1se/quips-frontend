// app/profile/[username]/page.tsx
import { cookies } from 'next/headers';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import ProfileClient from '@/features/profile/components/ProfileClient';
import { Suspense } from 'react';
import { MeResponse, UserProfileResponse } from '@/features/profile/types';

type Props = {
  params: Promise<{ username: string }>;
};

// Вспомогательная функция для серверного fetch
async function fetchServerApi<T>(endpoint: string, cookieHeader: string): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieHeader,
    },
    cache: 'no-store', // Отключаем кеш Next.js, так как используем React Query
  });

  if (!res.ok) {
    throw new Error(`Server fetch failed: ${res.status}`);
  }
  return res.json();
}
export const instant = false;

export default async function Page({ params }: Props) {
  const { username } = await params;
  const queryClient = new QueryClient();

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  // Проверяем наличие куки авторизации (замените 'access_token' на имя вашей куки)
  const hasAuthToken = cookieStore.has('access_token');

  const prefetchPromises = [
    // Профиль префетчим всегда
    queryClient.prefetchQuery({
      queryKey: ['user-profile', username],
      queryFn: () => fetchServerApi<UserProfileResponse>(`/users/${username}`, cookieHeader),
    }),
  ];

  // Запрос /me делаем ТОЛЬКО если есть кука авторизации
  if (hasAuthToken) {
    prefetchPromises.push(
      queryClient.prefetchQuery({
        queryKey: ['current-user'],
        queryFn: () => fetchServerApi<MeResponse>('/users/me', cookieHeader),
      }),
    );
  }

  // Параллельный запуск на сервере
  await Promise.all(prefetchPromises);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div className="p-10 text-center text-text-muted">Загрузка...</div>}>
        {/* Передаем username строкой, как обсуждали ранее */}
        <ProfileClient username={username} />
      </Suspense>
    </HydrationBoundary>
  );
}
