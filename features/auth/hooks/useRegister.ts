'use client';

import { toast } from '@/components/ui';
import { auth } from '@/features/auth/api';
import { RegisterData } from '@/features/auth/types';
import { ApiError } from '@/lib/api/client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterData) => auth.register(data),
    onSuccess: (data) => {
      toast.success(data.message);
      router.push('/login');
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });
}
