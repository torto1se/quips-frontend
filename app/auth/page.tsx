import { Suspense } from 'react';
import AuthContent from '@/components/auth/AuthContent';

export default function AuthPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center  px-4 overflow-hidden">
      {/* Имитация фиолетового свечения на бэкграунде из макета */}

      <Suspense
        fallback={
          <div className="w-full max-w-[460px] animate-pulse rounded-2xl  border border-zinc-800/40 p-10 h-[500px]" />
        }
      >
        <AuthContent />
      </Suspense>
    </div>
  );
}
