import { user } from '@/features/user/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export function useUserComments(username: string, page = 1, limit = 3) {
  return useQuery({
    queryKey: ['user', 'comments', username, { page, limit }],
    queryFn: () => user.getComments(username, page, limit),
    enabled: !!username,
    staleTime: 2 * 60_000,
    placeholderData: keepPreviousData,
  });
}
