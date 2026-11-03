'use client';

import { Mail, User, LockKeyhole } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '@/hooks/useAuth';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const { register, registerState } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get('email') ?? '');
    const username = String(formData.get('username') ?? '').trim();
    const password = String(formData.get('password') ?? '');

    const result = await register({ email, username, password });
    if (result.success) {
      onSwitchToLogin();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {registerState.error && (
        <div className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl text-center font-medium animate-fade-in">
          {registerState.error}
        </div>
      )}

      {registerState.message && (
        <div className="p-3 text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl text-center font-medium animate-fade-in">
          {registerState.message}
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
        autoComplete="password"
        type="password"
        icon={LockKeyhole}
        required
      />

      <Button
        variant="outline"
        type="submit"
        isLoading={registerState.isLoading}
        isUppercase={true}
        className="font-bold"
      >
        Создать аккаунт
      </Button>
    </form>
  );
}
