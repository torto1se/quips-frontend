const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface ErrorResponse {
  message: string | string[];
  error: string;
  statusCode: number;
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const config: RequestInit = {
    ...options,
    headers,
    credentials: 'include',
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as Partial<ErrorResponse>;

    const message = Array.isArray(errorData.message)
      ? errorData.message.join('. ')
      : errorData.message || `Ошибка сервера: ${response.status}`;

    throw new Error(message);
  }

  return (await response.json()) as T;
}

export const api = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { method: 'GET', ...options }),

  post: <T, B = unknown>(endpoint: string, body: B, options?: RequestInit) =>
    request<T>(endpoint, { method: 'POST', body: JSON.stringify(body), ...options }),

  put: <T, B = unknown>(endpoint: string, body: B, options?: RequestInit) =>
    request<T>(endpoint, { method: 'PUT', body: JSON.stringify(body), ...options }),

  patch: <T, B = unknown>(endpoint: string, body: B, options?: RequestInit) =>
    request<T>(endpoint, { method: 'PATCH', body: JSON.stringify(body), ...options }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { method: 'DELETE', ...options }),
};
