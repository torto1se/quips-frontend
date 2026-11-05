import { LoginData } from '@/features/auth/types';
import { MeResponse } from '@/features/profile';
import { createContext } from 'react';

export interface AuthContextType {
  user: MeResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoginPending: boolean;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
