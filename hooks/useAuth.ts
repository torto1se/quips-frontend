'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/api/auth';
import { LoginData, RegisterData } from '@/types/auth';

interface AuthRequestState {
  isLoading: boolean;
  error?: string | null;
  message?: string | null;
}

function getErrorMessage(error: unknown, fallback = 'Произошла непредвиденная ошибка'): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return fallback;
}

export function useAuth() {
  const router = useRouter();

  const [loginState, setLoginState] = useState<AuthRequestState>({
    isLoading: false,
    error: null,
    message: null,
  });

  const [registerState, setRegisterState] = useState<AuthRequestState>({
    isLoading: false,
    error: null,
    message: null,
  });

  const login = useCallback(
    async (data: LoginData) => {
      setLoginState({ isLoading: true, error: null, message: null });

      try {
        const response = await authApi.login(data);
        setLoginState({ isLoading: false, error: null, message: response.message });
        localStorage.setItem('token', response.access_token);
        router.push('/');
      } catch (error) {
        setLoginState({ isLoading: false, error: getErrorMessage(error, 'Ошибка авторизации') });
      }
    },
    [router],
  );

  const register = useCallback(async (data: RegisterData) => {
    setRegisterState({ isLoading: true, error: null, message: null });

    try {
      const response = await authApi.register(data);

      setRegisterState({
        isLoading: false,
        error: null,
        message: response.message,
      });

      return { success: true };
    } catch (error) {
      setRegisterState({
        isLoading: false,
        error: getErrorMessage(error, 'Ошибка при создании аккаунта'),
        message: null,
      });

      return { success: false };
    }
  }, []);

  return { login, register, loginState, registerState };
}
