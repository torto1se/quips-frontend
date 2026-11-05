import LoginForm from '@/features/auth/components/LoginForm';
import { Metadata } from 'next';

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
  return <LoginForm />;
}
