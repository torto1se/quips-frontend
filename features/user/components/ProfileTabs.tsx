'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { motion } from 'framer-motion';

export function ProfileTabs({ username }: { username: string }) {
  const segment = useSelectedLayoutSegment();
  const basePath = `/user/${username}`;

  const tabs = [
    { name: 'Обзор', href: basePath, segment: null },
    { name: 'Библиотека', href: `${basePath}/library`, segment: 'library' },
    { name: 'Комментарии', href: `${basePath}/comments`, segment: 'comments' },
  ];

  return (
    <div className="flex gap-4 border-b border-border px-6">
      {tabs.map((tab) => {
        const isActive = segment === tab.segment;
        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={`py-3 px-3 text-base transition-all relative   hover:text-text-main ${
              isActive ? 'text-text-main' : 'text-text-muted '
            }`}
          >
            {tab.name}
            {isActive && (
              <motion.span
                layoutId="active-tab-indicator"
                className="absolute -bottom-px left-0 w-full h-px bg-accent shadow-[0_0_8px_var(--color-accent)]"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
