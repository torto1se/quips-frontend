'use client';

import { Button, toast } from '@/components/ui';
import { api } from '@/lib/api/client';
import { UserPayload } from '@/lib/auth-server';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function SidebarUser({ user }: { user: UserPayload | null }) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await api.post('/auth/logout', {});
      toast.success('Вы вышли из аккаунта');
      router.push('/');
      router.refresh();
    } catch (e) {
      toast.error('Ошибка');
    } finally {
      setIsLoggingOut(false);
    }
  };
  return (
    <>
      {!user ? (
        <div className="py-2 mx-4">
          <Link href="/login">
            <Button variant="primary">Войти</Button>
          </Link>
        </div>
      ) : (
        <div className="mx-4 my-2 ">
          <div className="flex items-center justify-between transition-colors">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full bg-gray-800 border border-accent">
                {user.avatarUrl ? (
                  <Image
                    src={user.avatarUrl}
                    alt={user.username || 'User'}
                    sizes="48px"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm font-bold text-text-main">
                    {user.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
                <div className="absolute bottom-0.5 right-0 w-2.5 h-2.5 bg-success rounded-full" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold text-text-main truncate max-w-30">
                  {user.username || 'Пользователь'}
                </span>
                <span className="text-sm text-success">В сети</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              type="button"
              aria-label="Выйти из аккаунта"
              className="disabled:opacity-50"
            >
              <LogOut className="w-6 h-6 text-text-muted hover:text-text-main transition-colors" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
