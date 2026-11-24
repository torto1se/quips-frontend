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
  avatarUrl?: string;
}

export interface RegisterResponse {
  message: string;
}
