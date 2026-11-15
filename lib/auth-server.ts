import { cookies } from 'next/headers';
import { JWTPayload, jwtVerify } from 'jose';
import { cache } from 'react';
import { cacheLife, cacheTag } from 'next/cache';

export interface UserPayload extends JWTPayload {
  email?: string;
  role?: string;
  username?: string;
  avatarUrl?: string;
}

export const getCurrentUser = cache(async (): Promise<UserPayload | null> => {
  'use cache: private';
  cacheTag('current-user');
  cacheLife({ stale: 300 });

  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    return payload as UserPayload;
  } catch (error) {
    return null;
  }
});
