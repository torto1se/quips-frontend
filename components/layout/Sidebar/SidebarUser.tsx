'use client';

import { Button, ConfirmModal, toast } from '@/components/ui';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await api.post('/auth/logout', {});
      setIsModalOpen(false);
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
        <div className="mx-4 py-2">
          <Link href="/login">
            <Button variant="primary">Войти</Button>
          </Link>
        </div>
      ) : (
        <div className="mx-4 my-2">
          <div className="flex items-center justify-between transition-colors">
            <div className="flex items-center gap-3">
              <div className="border-accent relative h-12 w-12 rounded-full border bg-gray-800">
                {user.avatarUrl ? (
                  <Image
                    className="object-cover"
                    src={user.avatarUrl}
                    alt={user.username || 'User'}
                    sizes="48px"
                    fill
                  />
                ) : (
                  <div className="text-text-main flex h-full w-full items-center justify-center text-sm font-bold">
                    {user.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
                <div className="bg-success absolute right-0 bottom-0.5 h-2.5 w-2.5 rounded-full" />
              </div>
              <div className="flex flex-col">
                <span className="text-text-main max-w-30 truncate text-base font-semibold">
                  {user.username || 'Пользователь'}
                </span>
                <span className="text-success text-sm">В сети</span>
              </div>
            </div>
            <button
              className="cursor-pointer"
              onClick={() => setIsModalOpen(true)}
              disabled={isLoggingOut}
              type="button"
              aria-label="Выйти из аккаунта"
            >
              <LogOut className="text-text-muted hover:text-text-main h-6 w-6 transition-colors" />
            </button>
          </div>
        </div>
      )}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => handleLogout()}
        title="Выйти из аккаунта?"
        confirmText="Выйти"
        isLoading={isLoggingOut}
      />
    </>
  );
}
