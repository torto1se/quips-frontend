'use server';

import { cookies } from 'next/headers';
import { updateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { toast } from '@/components/ui';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function logoutAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  // 1. Отзываем сессию на бэкенде (на будущее — если там появится blacklist / refresh в БД).
  //    Не блокируем выход при ошибке — фронт всё равно должен разлогинить.

  if (token) {
    try {
      await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: { Cookie: `access_token=${token}` },
        cache: 'no-store',
      });
      toast.success('Вы вышли из аккаунта');
    } catch {
      // no-op
    }
  }

  // 2. Чистим cookie на домене Next.js — именно её читают proxy.ts и auth-server.ts.
  cookieStore.delete('access_token');

  // 3. КРИТИЧНО: инвалидируем кеш getCurrentUser(), иначе Sidebar будет
  //    показывать пользователя ещё до 5 минут.
  updateTag('current-user');

  redirect('/');
}
