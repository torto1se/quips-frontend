'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/api/auth';
import { LoginData, RegisterData } from '@/types/auth';

export function useAuth() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  // Функция для обработки входа
  const login = async (data: LoginData) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const response = await authApi.login(data);

      // Сохраняем access_token в localStorage (ровно с тем именем, как шлет NestJS)
      localStorage.setItem('token', response.access_token);

      console.log('Успешный вход! Данные пользователя:', response.user);

      // Игрок успешно залогинился — отправляем его на главный экран свайпать тиммейтов
      router.push('/');
    } catch (err: any) {
      // Сюда автоматически прилетает ваш текст ошибки из NestJS (например, "Неверный пароль")
      setError(err.message || 'Ошибка авторизации');
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для обработки регистрации
  // onSuccessCallback нужен, чтобы автоматически переключить вкладку таба на "Вход" после успеха
  const register = async (data: RegisterData, onSuccessCallback?: () => void) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const response = await authApi.register(data);

      // Записываем ответ сервера: "Регистрация успешно завершена"
      setSuccessMessage(response.message);

      // Если регистрация успешна, ждем 1.5 секунды (чтобы юзер успел прочесть зеленую плашку)
      // и переключаем его на форму Входа
      if (onSuccessCallback) {
        setTimeout(() => {
          onSuccessCallback();
        }, 1500);
      }
    } catch (err: any) {
      // Сюда прилетит ошибка 409: "Пользователь с такой почтой уже существует" или 400 (ошибка DTO-валидации)
      setError(err.message || 'Ошибка при создании аккаунта');
    } finally {
      setIsLoading(false);
    }
  };

  return { login, register, isLoading, error, successMessage };
}
