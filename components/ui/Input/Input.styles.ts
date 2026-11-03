// components/ui/Input/Input.styles.ts

// Стили для самого верхнего контейнера (с отступом до лейбла)
export const inputContainer = 'w-full space-y-1.5';

// Стили для текста лейбла
export const inputLabel = 'block text-sm text-text-primary font-medium';

// Стили для обертки, которая группирует инпут и абсолютные иконки
export const inputWrapper = 'relative w-full group';

// Стили для левой иконки (никнейм, почта и т.д.)
export const inputLeftIcon =
  'absolute left-4 top-1/2 -translate-y-1/2 w-5.5 h-5.5 pointer-events-none transition-colors ' +
  'text-text-muted group-focus-within:text-text-main group-data-[has-text=true]:text-text-main';

// Кнопка-глаз для переключения видимости пароля
export const inputPasswordButton =
  'absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer transition-colors ' +
  'text-text-muted group-focus-within:text-text-main group-data-[has-text=true]:text-text-main';

// Базовые утилиты для самого тега input
export const inputBase =
  'w-full rounded-xl bg-bg-primary border border-border py-3 text-text-muted ' +
  'focus:outline-none focus:border-accent transition-colors text-base' +
  'autofill:bg-bg-primary ' + // Возвращает ваш темный цвет фона
  'autofill:text-text-main ';

// Функция для динамической сборки классов инпута (в зависимости от наличия текста и иконок)
interface InputClassOptions {
  hasText: boolean;
  hasIcon: boolean;
  isPassword: boolean;
}

export const getInputClasses = ({ hasText, hasIcon, isPassword }: InputClassOptions) => {
  return [
    inputBase,
    hasText ? 'text-text-main' : '',
    hasIcon ? 'pl-11.5' : 'px-4', // Отступ слева под иконку
    isPassword ? 'pr-12' : 'pr-4', // Отступ справа под кнопку глаза
  ]
    .filter(Boolean)
    .join(' ');
};
