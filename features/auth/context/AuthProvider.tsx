'use client';

import { useQueryClient } from '@tanstack/react-query';
import { AuthContext } from './AuthContext';
import { LoginData } from '@/features/auth/types';
import { useRouter } from 'next/navigation';
import { useCurrentProfile } from '@/features/profile/hooks/useCurrentProfile';
import { useLoginMutation } from '@/features/auth/hooks/useAuthMutations';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  // 1. Получаем данные текущего юзера из кеша React Query
  const { data: user, isLoading } = useCurrentProfile();

  // 2. Достаем мутацию для логина
  const { mutateAsync: loginMutation, isPending: isLoginPending } = useLoginMutation();

  const login = async (data: LoginData) => {
    await loginMutation(data);
    // После инвалидации кеша в мутации, принудительно ждем рефетча,
    // чтобы к моменту возврата промиса юзер был загружен в кеш.
    await queryClient.refetchQueries({ queryKey: ['current-user'] });
  };

  const logout = async () => {
    try {
      // Если на бэке есть эндпоинт /auth/logout (удаление HttpOnly cookie), вызови его тут
      // await authApi.logout();
    } finally {
      queryClient.clear(); // Полностью чистим кеш (чтобы данные старого юзера не утекли)
      router.push('/login');
    }
  };

  return (
    <AuthContext
      value={{
        user: user || null,
        isAuthenticated: !!user,
        isLoading,
        isLoginPending,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext>
  );
}
