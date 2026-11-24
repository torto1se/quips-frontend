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
    <div className="border-border flex gap-4 border-b px-6">
      {tabs.map((tab) => {
        const isActive = segment === tab.segment;
        return (
          <Link
            className={`hover:text-text-main relative px-3 py-3 text-base transition-all ${
              isActive ? 'text-text-main' : 'text-text-muted'
            }`}
            key={tab.name}
            href={tab.href}
          >
            {tab.name}
            {isActive && (
              <motion.span
                className="bg-accent absolute -bottom-px left-0 h-px w-full shadow-[0_0_8px_var(--color-accent)]"
                layoutId="active-tab-indicator"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
