import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import SidebarWrapper from '@/components/shared/sidebar/SidebarWrapper';
import { MainProvider } from '@/core/providers';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Quips',
  description:
    'Quips — умный поиск тиммейтов по рангу, прайм-тайму и совместимости. Свайпай карточки игроков, находи мэтчи, общайся в чатах и собирай идеальное пати!',
  openGraph: {
    title: 'Quips — Поиск тиммейтов для онлайн-игр',
    description:
      'Quips — умный поиск тиммейтов по рангу, прайм-тайму и совместимости. Свайпай карточки игроков, находи мэтчи, общайся в чатах и собирай идеальное пати!',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="antialiased select-none h-full">
        <MainProvider>
          <SidebarWrapper>{children}</SidebarWrapper>
        </MainProvider>
      </body>
    </html>
  );
}
