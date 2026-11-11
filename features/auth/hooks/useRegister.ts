'use client';

import { toast } from '@/components/ui';
import { auth } from '@/features/auth/api';
import { RegisterData } from '@/features/auth/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterData) => auth.register(data),
    onSuccess: (data) => {
      toast.success(data.message);
      router.push('/login');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
