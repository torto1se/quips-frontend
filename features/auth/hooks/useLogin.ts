'use client';

import { toast } from '@/components/ui';
import { auth } from '@/features/auth/api';
import { LoginData } from '@/features/auth/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginData) => auth.login(data),
    onSuccess: () => {
      toast.success('Вы вошли в аккаунт');
      router.refresh();
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
