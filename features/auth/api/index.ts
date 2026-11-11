import { api } from '@/lib/api/client';
import { LoginData, LoginResponse, RegisterData, RegisterResponse } from '@/features/auth/types';

export const auth = {
  login: async (data: LoginData): Promise<LoginResponse> => {
    return api.post<LoginResponse, LoginData>('/auth/login', data);
  },
  register: async (data: RegisterData): Promise<RegisterResponse> => {
    return api.post<RegisterResponse, RegisterData>('/auth/registration', data);
  },
};
