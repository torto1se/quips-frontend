'use client';

import React, { useState, Suspense, useEffect } from 'react';
import SidebarContent from './SidebarContent';

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem('sidebar-collapsed');
    if (savedState !== null) {
      setIsCollapsed(JSON.parse(savedState));
    }
  }, []);

  // 3. Создаем обертку для изменения стейта, которая сразу пишет значение в localStorage
  const handleSetCollapsed = (value: boolean) => {
    setIsCollapsed(value);
    localStorage.setItem('sidebar-collapsed', JSON.stringify(value));
  };

  return (
    // Оборачиваем внутренности в Suspense. На время статической сборки
    // Next.js просто отрендерит пустой фоновый каркас, и билд пройдет успешно.
    <Suspense
      fallback={
        <div className="flex h-screen w-screen overflow-hidden bg-[#0a0514]">{children}</div>
      }
    >
      <SidebarContent
        isCollapsed={isCollapsed}
        setIsCollapsed={handleSetCollapsed}
      >
        {children}
      </SidebarContent>
    </Suspense>
  );
}
