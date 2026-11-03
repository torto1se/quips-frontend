export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
}

export interface UserDto {
  id: string;
  email: string;
  username: string;
  role: string;
}

export interface LoginResponse {
  access_token: string;
  user: UserDto;
}

export interface RegisterResponse {
  message: string;
}
