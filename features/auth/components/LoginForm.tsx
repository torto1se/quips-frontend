'use client';

import { User, LockKeyhole } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useLoginMutation } from '@/features/auth/hooks/useAuthMutations';
import { useAuth } from '@/features/auth/hooks';
import { useState } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const { login, isLoginPending } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = String(formData.get('username') ?? '').trim();
    const password = String(formData.get('password') ?? '');

    if (!username || !password) return;

    try {
      await login({ username, password });
      router.push(`/`);
      router.refresh();
    } catch (err) {
      setError(err.message || 'Ошибка авторизации');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {error && (
        <div
          role="alert"
          className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl text-center"
        >
          {error}
        </div>
      )}

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
        isLoading={isLoginPending}
        className="font-bold uppercase"
      >
        Войти
      </Button>
    </form>
  );
}
