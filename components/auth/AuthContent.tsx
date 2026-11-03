'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { UserPlus, LogIn } from 'lucide-react';

type AuthMode = 'login' | 'register';

export default function AuthContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const activeForm: AuthMode = searchParams.get('mode') === 'register' ? 'register' : 'login';

  const switchForm = (mode: AuthMode) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('mode', mode);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-115 rounded-2xl bg-bg-div backdrop-blur-md shadow-2xl border border-zinc-800/40 transition-colors overflow-hidden">
      <div className="relative pt-4 flex border-b border-border bg-black/10">
        <button
          type="button"
          onClick={() => switchForm('login')}
          aria-current={activeForm === 'login' ? 'true' : undefined}
          className={`flex-1 flex items-center justify-center gap-2 pb-3 text-center text-md font-medium transition-colors duration-200 z-10 cursor-pointer ${
            activeForm === 'login' ? 'text-text-main' : 'text-text-muted/70 hover:text-text-main'
          }`}
        >
          <LogIn className="w-4 h-4" />
          <span>Вход</span>
        </button>

        <button
          type="button"
          onClick={() => switchForm('register')}
          aria-current={activeForm === 'register' ? 'true' : undefined}
          className={`flex-1 flex items-center justify-center gap-2 pb-3 text-center text-md font-medium transition-colors duration-200 z-10 cursor-pointer ${
            activeForm === 'register' ? 'text-text-main' : 'text-text-muted/70 hover:text-text-main'
          }`}
        >
          <UserPlus className="w-4 h-4" />
          <span>Регистрация</span>
        </button>

        <div
          className={`absolute -bottom-px left-0 h-0.5 w-1/2 bg-accent transition-transform duration-300 ease-out ${
            activeForm === 'register' ? 'translate-x-full' : 'translate-x-0'
          }`}
        />
      </div>

      <div className="m-10">
        {activeForm === 'login' ? (
          <LoginForm onSwitchToRegister={() => switchForm('register')} />
        ) : (
          <RegisterForm onSwitchToLogin={() => switchForm('login')} />
        )}
      </div>
    </div>
  );
}
