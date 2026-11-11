import { user } from '@/features/user/api';
import { UserProfileResponse } from '@/features/user/types';
import { useQuery } from '@tanstack/react-query';

export function useUserProfile(username: string) {
  return useQuery<UserProfileResponse>({
    queryKey: ['user', 'profile', username],
    queryFn: () => user.getByUsername(username),
    enabled: !!username,
    retry: false,
    staleTime: 2 * 60_000,
  });
}
