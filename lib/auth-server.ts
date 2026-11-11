import { cookies } from 'next/headers';
import { JWTPayload, jwtVerify } from 'jose';

interface UserPayload extends JWTPayload {
  sub: string;
  email?: string;
  role?: string;
  username?: string;
}

export async function getCurrentUser(): Promise<UserPayload | null> {
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
}
