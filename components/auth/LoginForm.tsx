'use client';

import { User, LockKeyhole } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button'; // Исправили импорт под index.ts
import { useAuth } from '@/hooks/useAuth'; // 1. Импортируем наш хук

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  // 2. Подключаем хук и достаем из него нужные стейты и методы
  const { login, isLoading, error } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 3. Собираем данные из инпутов по их атрибуту "name"
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    // 4. Отправляем строго типизированные данные на бэкенд
    login({ username, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* 5. Выводим ошибку от NestJS сервера, если она появится */}
      {error && (
        <div className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl text-center font-medium animate-fade-in">
          ⚠️ {error}
        </div>
      )}

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

      {/* Передали isLoading={isLoading}, чтобы кнопка блокировалась при запросе */}
      <Button
        variant="outline"
        type="submit"
        isLoading={isLoading}
        isUppercase={true}
        className="font-bold"
      >
        Войти
      </Button>
    </form>
  );
}
