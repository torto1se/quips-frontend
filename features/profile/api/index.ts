import { api } from '@/core/api/client';
import { MeResponse, UserProfileResponse } from '@/features/profile/types';

export const userApi = {
  me: async (): Promise<MeResponse> => {
    return api.get<MeResponse>('/users/me');
  },

  getByUsername: async (username: string): Promise<UserProfileResponse> => {
    return api.get<UserProfileResponse>(`/users/${username}`);
  },
};
