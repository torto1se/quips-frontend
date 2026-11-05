import { authApi } from '@/features/auth/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['current-user'] });
    },
  });
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: authApi.register,
  });
}
