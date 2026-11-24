import { cookies } from 'next/headers';
import { cache } from 'react';

export interface UserPayload {
  id: string;
  email: string;
  role: string;
  username: string;
  avatarUrl?: string;
  isBanned: boolean;
  bannedAt?: string;
  banReason?: string;
}

export const getCurrentUser = cache(async (): Promise<UserPayload | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  if (!token) return null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      headers: {
        Cookie: `access_token=${token}`,
      },
      next: { revalidate: 10 },
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
});
