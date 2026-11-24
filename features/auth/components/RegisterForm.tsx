'use client';

import { Mail, User, LockKeyhole } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { useRegister } from '@/features/auth/hooks/useRegister';
import Link from 'next/link';
import Image from 'next/image';

export function RegisterForm() {
  const { mutate: register, isPending } = useRegister();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get('email') ?? '');
    const username = String(formData.get('username') ?? '').trim();
    const password = String(formData.get('password') ?? '');

    if (!email || !username || !password) return;

    register({ email, username, password });
  };

  return (
    <div className="text-text-main flex h-full flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <Link href={'/'}>
            <Image
              src={'/icon.svg'}
              alt="Quips"
              width={44}
              height={44}
            />
          </Link>
          <Link href={'/'}>
            <h1 className="text-3xl font-semibold uppercase">QUIPS</h1>
          </Link>
        </div>
        <h1 className="text-xl">Создать аккаунт</h1>
      </div>
      <form
        className="flex flex-col items-center space-y-5"
        onSubmit={handleSubmit}
      >
        <Input
          name="email"
          label="Почта"
          autoComplete="email"
          type="email"
          icon={Mail}
          required
        />
        <Input
          name="username"
          label="Никнейм"
          autoComplete="username"
          icon={User}
          required
        />
        <Input
          name="password"
          label="Пароль"
          autoComplete="current-password"
          type="password"
          icon={LockKeyhole}
          required
        />

        <Button
          className="w-full font-bold"
          variant="outline"
          type="submit"
          isLoading={isPending}
          isUppercase
        >
          Создать аккаунт
        </Button>

        <span>
          Уже есть аккаунт?{' '}
          <Link
            className="text-accent hover:underline"
            href={'/login'}
          >
            Войти
          </Link>
        </span>
      </form>
    </div>
  );
}
