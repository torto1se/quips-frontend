'use client';

import { User, LockKeyhole } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '@/hooks/useAuth';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const { login, loginState } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = String(formData.get('username') ?? '').trim();
    const password = String(formData.get('password') ?? '');

    await login({ username, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {loginState.error && (
        <div className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl text-center font-medium animate-fade-in">
          {loginState.error}
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
        autoComplete="password"
        type="password"
        icon={LockKeyhole}
        required
      />

      <Button
        variant="outline"
        type="submit"
        isLoading={loginState.isLoading}
        isUppercase={true}
        className="font-bold"
      >
        Войти
      </Button>
    </form>
  );
}
