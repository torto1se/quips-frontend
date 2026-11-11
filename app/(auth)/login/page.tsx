import { Loader } from '@/components/ui';
import { LoginForm } from '@/features/auth';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Вход в аккаунт · Quips',
  description:
    'Войдите в свой профиль Quips, чтобы настроить поиск тиммейтов, проверить новые мэтчи и ответить на сообщения в чатах.',
  openGraph: {
    title: 'Вход в аккаунт · Quips',
    description:
      'Войдите в свой профиль Quips, чтобы настроить поиск тиммейтов, проверить новые мэтчи и ответить на сообщения в чатах.',
  },
};

export default function Page() {
  return (
    <Suspense fallback={<Loader size="xl" />}>
      <LoginForm />
    </Suspense>
  );
}
