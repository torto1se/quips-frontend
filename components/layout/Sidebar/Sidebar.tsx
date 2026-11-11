// components/layout/Sidebar.tsx
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { getCurrentUser, UserPayload } from '@/lib/auth-server';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { SidebarNavLinks } from '@/components/layout/Sidebar/SidebarNavLinks';

export async function Sidebar() {
  const user = await getCurrentUser();
  return (
    <aside className="w-60 bg-bg-card border-r border-border flex flex-col gap-18 h-full shrink-0">
      <div className="pt-8 pl-6 flex items-center">
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="relative flex items-center justify-center">
            <Image
              src={'/icon.svg'}
              width={32}
              height={32}
              alt="Quips"
              priority
            />
            <div className="absolute w-2.5 h-2.5 bg-purple-500 rounded-full" />
          </div>
          <span className="text-3xl font-semibold tracking-widest uppercase">Quips</span>
        </Link>
      </div>

      <div className="flex flex-col flex-1">
        <SidebarNavLinks user={user} />
        <div className="mt-auto">
          <div className="h-0 border-t border-border" />
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
                <LogOut className="w-6 h-6 text-text-muted cursor-pointer hover:text-text-main transition-colors" />
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
