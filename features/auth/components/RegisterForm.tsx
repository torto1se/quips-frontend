'use client';

import { Mail, User, LockKeyhole } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { useRegister } from '@/features/auth/hooks/useRegister';

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
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
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
        autoComplete="new-password"
        type="password"
        icon={LockKeyhole}
        required
      />

      <Button
        variant="outline"
        type="submit"
        isLoading={isPending}
        isUppercase={true}
        className="font-bold"
      >
        Создать аккаунт
      </Button>
    </form>
  );
}
