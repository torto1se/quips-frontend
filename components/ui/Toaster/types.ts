export type ToastType = 'success' | 'error' | 'info' | 'warning';

export const DEFAULT_TITLES: Record<ToastType, string> = {
  success: 'Успешно',
  error: 'Ошибка',
  info: 'Информация',
  warning: 'Внимание',
};
