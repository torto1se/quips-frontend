'use client';

import { User, LockKeyhole } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { useLogin } from '@/features/auth/hooks/useLogin';

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
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
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
      />

      <Button
        variant="outline"
        type="submit"
        isLoading={isPending}
        className="font-bold uppercase"
      >
        Войти
      </Button>
    </form>
  );
}
