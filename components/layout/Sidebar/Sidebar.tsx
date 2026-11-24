'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SidebarNavLinks } from '@/components/layout/Sidebar/SidebarNavLinks';
import { SidebarUser } from '@/components/layout/Sidebar/SidebarUser';
import type { UserPayload } from '@/lib/auth-server';
import { use } from 'react';

export function Sidebar({
  currentUserPromise,
}: {
  currentUserPromise: Promise<UserPayload | null>;
}) {
  const currentUser = use(currentUserPromise);
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
        <SidebarNavLinks user={currentUser} />

        <div className="mt-auto">
          <div className="h-0 border-t border-border" />
          <SidebarUser user={currentUser} />
        </div>
      </div>
    </aside>
  );
}
