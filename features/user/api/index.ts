import { api } from '@/lib/api/client';
import { CommentsResponse, UserProfileResponse } from '@/features/user/types';

export const user = {
  getByUsername: async (username: string): Promise<UserProfileResponse> => {
    return api.get<UserProfileResponse>(`/users/${username}`);
  },
  getComments: (username: string, page = 1, limit = 3): Promise<CommentsResponse> => {
    return api.get(`/users/${username}/comments?page=${page}&limit=${limit}`);
  },
};
