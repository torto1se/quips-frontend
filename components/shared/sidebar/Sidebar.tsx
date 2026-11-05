'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, User, ChevronLeft, ChevronRight, LogIn, MessageCircle } from 'lucide-react';
import { cn } from '@/shared/utils'; // Утилита shadcn/tailwind для объединения классов

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();

  // Имитация авторизации (замените на ваш стейт из auth-контекста или кук)
  const isAuth = false;

  const menuItems = [
    { name: 'Поиск', href: '/search', icon: Search },
    { name: 'Мэтчи', href: '/matches', icon: Heart },
    { name: 'Чаты', href: '/chats', icon: MessageCircle },
    { name: 'Профиль', href: `/users/`, icon: User },
  ];

  return (
    <aside
      onClick={() => isCollapsed && setIsCollapsed(!isCollapsed)}
      className={cn(
        'relative flex flex-col justify-between border-r border-border bg-bg-card transition-all duration-300 ease-in-out z-40 h-full px-4 pt-8',
        isCollapsed ? 'w-20' : 'w-60',
      )}
    >
      {/* Верхняя часть: Логотип и Кнопка Collapse */}
      <div className="flex flex-col gap-[72px]">
        <div
          className={cn('flex items-center', isCollapsed ? 'justify-center' : 'justify-between')}
        >
          {!isCollapsed && (
            <span className="text-2xl pl-2 font-semibold tracking-wider text-text-main">QUIPS</span>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded  hover:bg-accent-dark cursor-pointer text-gray-400 hover:text-white transition-colors outline-none"
          >
            {isCollapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
          </button>
        </div>

        {/* Ссылки */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  'flex items-center py-2  rounded-lg font-normal transition-all gap-2 group relative',
                  // Если панель развернута — прижимаем к левому краю и даем отступ px-4
                  // Если свернута — центрируем иконку по центру (justify-center) без боковых отступов
                  isCollapsed ? 'justify-center px-0' : 'justify-start px-2',
                  isActive
                    ? 'bg-accent-dark text-white'
                    : 'text-gray-400 hover:bg-accent-dark/60 hover:text-white',
                )}
              >
                {/* Иконка: добавляем flex-shrink-0, чтобы Tailwind ни при каких условиях её не сжимал */}
                <Icon
                  size={22}
                  className={cn(
                    'shrink-0 transition-colors',
                    isActive ? 'text-text-main' : 'text-text-muted group-hover:text-text-main',
                  )}
                />

                {/* Текст ссылки: при скрытии убираем его из потока через absolute, чтобы он не толкал иконку */}
                <span
                  className={cn(
                    'transition-opacity duration-200 whitespace-nowrap ',
                    isCollapsed ? 'opacity-0 pointer-events-none absolute' : 'opacity-100',
                  )}
                >
                  {item.name}
                </span>

                {/* Тултип при наведении, если панель свернута */}
                {isCollapsed && (
                  <div className="absolute left-full ml-4 px-2 py-1 bg-[#1f172f] text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap border border-purple-500/30">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Нижняя часть: Юзер или Войти */}
      <div className="border-t border-[#1f172f] pt-4">
        {isAuth ? (
          <div className={cn('flex items-center gap-3', isCollapsed ? 'justify-center' : '')}>
            <div className="w-10 h-10 rounded-full bg-purple-700 border-2 border-green-500 shrink-0" />
            {!isCollapsed && (
              <div className="overflow-hidden">
                <p className="text-sm font-semibold truncate">torto1se</p>
                <p className="text-xs text-green-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" /> В сети
                </p>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/auth"
            className={cn(
              'flex items-center gap-4 px-4 py-3 rounded-xl font-medium text-purple-400 hover:bg-purple-500/10 transition-all justify-center',
              !isCollapsed && 'justify-start bg-purple-500/5',
            )}
          >
            <LogIn size={22} />
            {!isCollapsed && <span>Войти</span>}
          </Link>
        )}
      </div>
    </aside>
  );
}
