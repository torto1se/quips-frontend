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
    <div className="flex flex-col gap-4 h-full items-center justify-center text-text-main">
      <div className="flex flex-col gap-4 items-center">
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
        onSubmit={handleSubmit}
        className="space-y-5 flex flex-col items-center"
      >
        <Input
          label="Почта"
          name="email"
          autoComplete="email"
          type="email"
          icon={Mail}
          required
        />
        <Input
          label="Никнейм"
          name="username"
          autoComplete="username"
          icon={User}
          required
        />
        <Input
          label="Пароль"
          name="password"
          autoComplete="current-password"
          type="password"
          icon={LockKeyhole}
          required
        />

        <Button
          variant="outline"
          type="submit"
          isLoading={isPending}
          isUppercase
          className="font-bold w-full"
        >
          Создать аккаунт
        </Button>

        <span>
          Уже есть аккаунт?{' '}
          <Link
            href={'/login'}
            className="text-accent hover:underline"
          >
            Войти
          </Link>
        </span>
      </form>
    </div>
  );
}
