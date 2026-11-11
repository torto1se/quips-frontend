import { RegisterForm } from '@/features/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Создать аккаунт · Quips',
  description:
    'Создайте бесплатный аккаунт в Quips за 1 минуту. Получите доступ к лучшей платформе по поиску тиммейтов и начните играть вместе уже сегодня.',
  openGraph: {
    title: 'Создать аккаунт · Quips',
    description:
      'Создайте бесплатный аккаунт в Quips за 1 минуту. Получите доступ к лучшей платформе по поиску тиммейтов и начните играть вместе уже сегодня.',
  },
};

export default function Page() {
  return <RegisterForm />;
}
