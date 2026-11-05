import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export default function HomePage() {
  return (
    // Ограничиваем контент по центру, добавляем красивые отступы и вертикальный стек
    <div className="max-w-5xl mx-auto space-y-24 py-16 px-4 md:px-8">
      {/* 1. HERO BLOCK (Главый экран) */}
      <section className="text-center space-y-6 pt-12 relative">
        {/* Задний неоновый фоновый блик для атмосферы */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight bg-gradient-to-b from-white via-purple-100 to-purple-400 bg-clip-text text-transparent uppercase">
          Найди идеального тиммейта <br />
          <span className="bg-gradient-to-r from-purple-400 to-fuchsia-500 bg-clip-text text-transparent">
            для побед и общения
          </span>
        </h1>

        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          Сервис умного подбора игроков на основе вашего игрового времени, рангов, любимых
          персонажей и уровня токсичности.
        </p>

        <div className="pt-6">
          <Link
            href="/auth"
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:shadow-[0_0_40px_rgba(147,51,234,0.5)] transition-all transform hover:-translate-y-0.5 inline-block text-base tracking-wide uppercase"
          >
            Создать игровой профиль
          </Link>
        </div>
      </section>

      {/* 2. КАК ЭТО РАБОТАЕТ (Сетка карточек) */}
      <section className="space-y-10">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-purple-500">
            Гайд по сервису
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase">
            Как устроен QUIPS
          </h2>
        </div>

        {/* Сетка: 1 колонка на мобилках, 3 колонки на десктопе */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Карточка 1 */}
          <div className="bg-[#110a24]/40 border border-[#23183a] p-8 rounded-2xl space-y-4 hover:border-purple-500/40 transition-colors group relative overflow-hidden backdrop-blur-sm">
            <div className="absolute -right-4 -top-4 text-8xl font-black text-purple-900/10 group-hover:text-purple-900/20 transition-colors pointer-events-none select-none">
              01
            </div>
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-black">
              1
            </div>
            <h3 className="font-bold text-xl tracking-tight text-white group-hover:text-purple-300 transition-colors">
              Заполни профиль
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Укажи свои игры, ранги, текущий прайм-тайм и добавь ссылку на Discord.
            </p>
          </div>

          {/* Карточка 2 */}
          <div className="bg-[#110a24]/40 border border-[#23183a] p-8 rounded-2xl space-y-4 hover:border-purple-500/40 transition-colors group relative overflow-hidden backdrop-blur-sm">
            <div className="absolute -right-4 -top-4 text-8xl font-black text-purple-900/10 group-hover:text-purple-900/20 transition-colors pointer-events-none select-none">
              02
            </div>
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-black">
              2
            </div>
            <h3 className="font-bold text-xl tracking-tight text-white group-hover:text-purple-300 transition-colors">
              Алгоритм мэтчинга
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Наша система автоматически рассчитает процент совместимости с другими игроками.
            </p>
          </div>

          {/* Карточка 3 */}
          <div className="bg-[#110a24]/40 border border-[#23183a] p-8 rounded-2xl space-y-4 hover:border-purple-500/40 transition-colors group relative overflow-hidden backdrop-blur-sm">
            <div className="absolute -right-4 -top-4 text-8xl font-black text-purple-900/10 group-hover:text-purple-900/20 transition-colors pointer-events-none select-none">
              03
            </div>
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-black">
              3
            </div>
            <h3 className="font-bold text-xl tracking-tight text-white group-hover:text-purple-300 transition-colors">
              Общайся и тащи
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Лайкайте карточки игроков, открывайте взаимные мэтчи и сразу переходите в чат.
            </p>
          </div>
        </div>
      </section>

      {/* 3. ОТЗЫВЫ ИГРОКОВ (Повторяем дизайн твоего макета) */}
      <section className="space-y-10">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-purple-500">
            Комьюнити
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase">
            Отзывы игроков
          </h2>
        </div>

        {/* Карточка отзыва */}
        <div className="bg-[#110a24]/30 border border-[#23183a] p-8 rounded-2xl max-w-2xl mx-auto space-y-5 backdrop-blur-sm relative">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div className="flex items-center gap-4">
              {/* Аватарка-заглушка */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-fuchsia-600 border-2 border-purple-400/50 flex-shrink-0 shadow-[0_0_15px_rgba(147,51,234,0.2)]" />
              <div>
                <div className="font-bold text-base text-white tracking-wide">Reyna_Main</div>
                <div className="text-xs text-purple-400 font-medium">Нашел тиммейта в Valorant</div>
              </div>
            </div>
            {/* Рейтинг звездами */}
            <div className="flex gap-1 text-yellow-500 tracking-wider text-sm select-none">
              ⭐⭐⭐⭐⭐
            </div>
          </div>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed font-normal italic">
            «Шикарный сервис! Раньше приходилось терпеть токсиков в рандоме, а здесь за пару кликов
            нашел отличного саппорта, с которым апнули Алмаз за неделю. Рекомендую!»
          </p>
        </div>
      </section>
    </div>
  );
}
