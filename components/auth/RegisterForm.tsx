'use client';

import { Mail, User, LockKeyhole } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '@/hooks/useAuth'; // 1. Импортируем наш хук

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const { register, isLoading, error, successMessage } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 3. Собираем данные из инпутов по значению их атрибута "name"
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    // 4. Отправляем строго типизированные данные на NestJS сервер
    // Передаем колбэк onSwitchToLogin, который сработает автоматически при успехе
    register({ email, username, password }, onSwitchToLogin);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* 5. Выводим ошибку от NestJS (например, 409 Conflict: "Пользователь с такой почтой уже существует") */}
      {error && (
        <div className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl text-center font-medium animate-fade-in">
          ⚠️ {error}
        </div>
      )}

      {/* 6. Выводим плашку успеха, если бэкенд ответил статусом 200 */}
      {successMessage && (
        <div className="p-3 text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl text-center font-medium animate-fade-in">
          🎉 {successMessage}. Перенаправление...
        </div>
      )}

      {/* Обязательно добавили name="email" */}
      <Input
        label="Почта"
        name="email"
        type="email"
        icon={Mail}
        required
      />

      {/* Обязательно добавили name="username" */}
      <Input
        label="Никнейм"
        name="username"
        icon={User}
        required
      />

      {/* Обязательно добавили name="password" */}
      <Input
        label="Пароль"
        name="password"
        type="password"
        icon={LockKeyhole}
        required
      />

      {/* Передали isLoading={isLoading} для блокировки кликов и вывода спиннера */}
      <Button
        variant="outline"
        type="submit"
        isLoading={isLoading}
        isUppercase={true}
        className="font-bold"
      >
        Создать аккаунт
      </Button>
    </form>
  );
}
