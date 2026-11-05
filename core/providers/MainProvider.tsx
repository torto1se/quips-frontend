'use client';

import QueryProvider from '@/core/providers/QueryProvider';
import { type PropsWithChildren } from 'react';

export function MainProvider({ children }: PropsWithChildren<unknown>) {
  return <QueryProvider>{children}</QueryProvider>;
}
