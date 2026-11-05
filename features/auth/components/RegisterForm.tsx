'use client';

import { Mail, User, LockKeyhole } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useRegisterMutation } from '@/features/auth/hooks/useAuthMutations';
import { useState } from 'react';

export default function RegisterForm() {
  const router = useRouter();
  const { mutateAsync: register, isPending: isLoading, error: serverError } = useRegisterMutation();

  const [clientError, setClientError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setClientError(null);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get('email') ?? '');
    const username = String(formData.get('username') ?? '').trim();
    const password = String(formData.get('password') ?? '');

    if (!username || !password || !email) {
      setClientError('Заполните все поля');
      return;
    }

    try {
      await register({ email, username, password });

      router.push('/login');
      router.refresh();
    } catch (err) {}
  };

  const displayedError = clientError || serverError?.message;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {displayedError && (
        <div
          role="alert"
          className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl text-center font-medium animate-fade-in"
        >
          {displayedError}
        </div>
      )}

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
        isLoading={isLoading}
        className="font-bold uppercase"
      >
        Создать аккаунт
      </Button>
    </form>
  );
}
