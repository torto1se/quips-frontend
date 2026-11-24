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
        <h1 className="text-xl">Войти в аккаунт</h1>
      </div>
      <form
        className="flex flex-col items-center space-y-5"
        onSubmit={handleSubmit}
      >
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
          action={
            <Link
              className="text-accent text-sm hover:underline"
              href={'#'}
            >
              Забыли пароль?
            </Link>
          }
        />

        <Button
          className="w-full font-bold"
          variant="outline"
          type="submit"
          isLoading={isPending}
          isUppercase
        >
          Войти
        </Button>

        <span>
          Нет аккаунта?{' '}
          <Link
            className="text-accent hover:underline"
            href={'/register'}
          >
            Создать
          </Link>
        </span>
      </form>
    </div>
  );
}
