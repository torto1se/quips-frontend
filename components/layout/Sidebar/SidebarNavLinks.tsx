// components/layout/SidebarNavLinks.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, MessageCircle, User, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserPayload } from '@/lib/auth-server';

export function SidebarNavLinks({ user }: { user: UserPayload | null }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Главная', href: '/', icon: Home },
    { name: 'Поиск', href: '/search', icon: Search },
    { name: 'Матчи', href: '/matches', icon: Heart, badge: '12' },
    { name: 'Чаты', href: '/chats', icon: MessageCircle, badge: '99+' },
    { name: 'Профиль', href: `/user/${user?.username}`, icon: User },
  ];

  return (
    <nav className="flex flex-col mx-4 gap-1">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex items-center justify-between px-2 py-3 text-lg font-normal transition-all duration-200 group',
              isActive
                ? 'bg-accent-dark text-text-main  border-r-2 rounded-lg border-accent'
                : 'text-text-muted hover:bg-accent-dark/60 hover:rounded-lg border-transparent',
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon
                className={cn('w-6 h-6', isActive ? 'text-text-main' : 'text-text-muted')}
              />
              {item.name}
            </div>
            {item.badge && (
              <span
                className={cn('rounded-full text-text-muted', isActive ? 'text-text-main' : '')}
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
