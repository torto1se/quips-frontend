import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api';
import { ApiError } from '@/core/api/client';

export function useCurrentProfile() {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: userApi.me,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.status === 401) return false;
      return failureCount < 2;
    },
  });
}
