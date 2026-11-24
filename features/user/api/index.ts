import { api } from '@/lib/api/client';
import { CommentsResponse, UserProfileResponse } from '@/features/user/types';

export const user = {
  getByUsername: async (username: string): Promise<UserProfileResponse> => {
    return api.get<UserProfileResponse>(`/users/${username}`);
  },
  getComments: async (username: string, page = 1, limit = 3): Promise<CommentsResponse> => {
    return api.get<CommentsResponse>(`/users/${username}/comments?page=${page}&limit=${limit}`);
  },
  deleteComment: async (commentId: string): Promise<{ message: string }> => {
    return api.delete<{ message: string }>(`/comments/${commentId}`);
  },
};
