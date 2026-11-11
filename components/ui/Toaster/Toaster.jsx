'use client';

import { ToastIcon } from '@/components/ui';
import { Toaster as Sonner } from 'sonner';

export const Toaster = () => {
  return (
    <Sonner
      className="toaster group"
      icons={{
        success: <ToastIcon type="success" />,
        error: <ToastIcon type="error" />,
        info: <ToastIcon type="info" />,
        warning: <ToastIcon type="warning" />,
      }}
      position="top-right"
      duration={5000}
      toastOptions={{
        style: {
          background: '#040911',
          border: '#151c29 1px solid',
          color: '#d5d0da',
        },
        classNames: {
          description: '!text-text-muted',
          toast: '!gap-4',
        },
      }}
    />
  );
};
