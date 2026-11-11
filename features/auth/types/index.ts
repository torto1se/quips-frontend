export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  email: string;
  username: string;
  role: string;
  avatarUrl: string;
  isBanned: boolean;
  bannedAt: string;
  banReason: string;
}

export interface RegisterResponse {
  message: string;
}
