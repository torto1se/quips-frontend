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
    <aside className="bg-bg-card border-border flex h-full w-60 shrink-0 flex-col gap-18 border-r">
      <div className="flex items-center pt-8 pl-6">
        <Link
          className="flex items-center gap-3"
          href="/"
        >
          <div className="relative flex items-center justify-center">
            <Image
              src={'/icon.svg'}
              width={32}
              height={32}
              alt="Quips"
              priority
            />
            <div className="absolute h-2.5 w-2.5 rounded-full bg-purple-500" />
          </div>
          <span className="text-3xl font-semibold tracking-widest uppercase">Quips</span>
        </Link>
      </div>

      <div className="flex flex-1 flex-col">
        <SidebarNavLinks user={currentUser} />

        <div className="mt-auto">
          <div className="border-border h-0 border-t" />
          <SidebarUser user={currentUser} />
        </div>
      </div>
    </aside>
  );
}
