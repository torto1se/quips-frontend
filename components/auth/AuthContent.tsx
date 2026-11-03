'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { UserPlus, LogIn } from 'lucide-react';

export default function AuthContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // 1. По умолчанию строго 'login' для сервера и первой секунды клиента
  const [activeForm, setActiveForm] = useState<'login' | 'register'>('login');

  // 2. Синхронизируем стейт с URL сразу после загрузки страницы в браузере
  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'register') {
      setActiveForm('register');
    } else {
      setActiveForm('login');
    }
  }, [searchParams]);

  const switchForm = (mode: 'login' | 'register') => {
    setActiveForm(mode); // Сразу меняем стейт для мгновенного отклика UI
    const params = new URLSearchParams(searchParams.toString());
    params.set('mode', mode);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-115 rounded-2xl bg-bg-div backdrop-blur-md shadow-2xl border border-zinc-800/40 transition-colors overflow-hidden">
      {/* Контейнер вкладок */}
      <div className="relative pt-4 flex border-b border-border bg-black/10">
        {/* Кнопка: Вход */}
        <button
          type="button"
          onClick={() => switchForm('login')}
          className={`flex-1 flex items-center justify-center gap-2 pb-3 text-center text-md font-medium transition-colors duration-200 z-10 cursor-pointer ${
            activeForm === 'login' ? 'text-text-main' : 'text-text-muted/70 hover:text-text-main'
          }`}
        >
          <LogIn className="w-4 h-4" />
          <span>Вход</span>
        </button>

        {/* Кнопка: Регистрация */}
        <button
          type="button"
          onClick={() => switchForm('register')}
          className={`flex-1 flex items-center justify-center gap-2 pb-3 text-center text-md font-medium transition-colors duration-200 z-10 cursor-pointer ${
            activeForm === 'register' ? 'text-text-main' : 'text-text-muted/70 hover:text-text-main'
          }`}
        >
          <UserPlus className="w-4 h-4" />
          <span>Регистрация</span>
        </button>

        {/* Идеально плавная линия-каретка */}
        <div
          className={`absolute -bottom-px left-0 h-0.5 w-1/2 bg-accent transition-transform duration-300 ease-out ${
            activeForm === 'register' ? 'translate-x-full' : 'translate-x-0'
          }`}
        />
      </div>

      {/* Контент форм */}
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
