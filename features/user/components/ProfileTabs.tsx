'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function ProfileTabs({ username }: { username: string }) {
  const pathname = usePathname();
  const basePath = `/user/${username}`;

  const tabs = [
    { name: 'Обзор', href: basePath },
    { name: 'Библиотека', href: `${basePath}/library` },
    { name: 'Комментарии', href: `${basePath}/comments` },
  ];

  return (
    <div className="flex gap-6 border-b border-gray-800 mt-6">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
              isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {tab.name}
            {isActive && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 rounded-t-md" />
            )}
          </Link>
        );
      })}
    </div>
  );
}
