'use client';

import { User, LockKeyhole } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { useLogin } from '@/features/auth/hooks/useLogin';
import Image from 'next/image';
import Link from 'next/link';

export function LoginForm() {
  const { mutate: login, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = String(formData.get('username') ?? '').trim();
    const password = String(formData.get('password') ?? '');

    if (!username || !password) return;

    login({ username, password });
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
        <h1 className="text-xl">Войти в аккаунт</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-5 flex flex-col items-center"
      >
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
          action={
            <Link
              href={'#'}
              className="text-sm text-accent hover:underline"
            >
              Забыли пароль?
            </Link>
          }
        />

        <Button
          variant="outline"
          type="submit"
          isLoading={isPending}
          isUppercase
          className="font-bold w-full"
        >
          Войти
        </Button>

        <span>
          Нет аккаунта?{' '}
          <Link
            href={'/register'}
            className="text-accent hover:underline"
          >
            Создать
          </Link>
        </span>
      </form>
    </div>
  );
}
