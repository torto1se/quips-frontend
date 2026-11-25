'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, MessageCircle, User, Home } from 'lucide-react';
import type { UserPayload } from '@/lib/auth-server';
import { cn } from '@/lib/utils';

export function SidebarNavLinks({ user }: { user: UserPayload | null }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Главная', href: '/', icon: Home },
    { name: 'Поиск', href: '/search', icon: Search },
    { name: 'Матчи', href: '/matches', icon: Heart, badge: '12' },
    { name: 'Чаты', href: '/chats', icon: MessageCircle, badge: '99+' },
    { name: 'Профиль', href: user ? `/user/${user?.username}` : '/login', icon: User },
  ];

  return (
    <nav className="mx-4 flex flex-col gap-1 font-normal">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        return (
          <Link
            className={cn(
              'group flex items-center justify-between px-2 py-3 text-lg transition-all duration-200',
              isActive
                ? 'bg-accent-dark text-text-main border-accent rounded-lg border-r-2'
                : 'text-text-muted hover:bg-accent-dark/60 border-transparent hover:rounded-lg',
            )}
            key={item.name}
            href={item.href}
          >
            <div className="flex items-center gap-3">
              <item.icon
                className={cn('h-6 w-6', isActive ? 'text-text-main' : 'text-text-muted')}
                strokeWidth={2}
              />
              {item.name}
            </div>
            {item.badge && (
              <span
                className={cn('text-text-muted rounded-full', isActive ? 'text-text-main' : '')}
              >
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
