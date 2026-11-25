import { format, isSameYear, isToday, isYesterday } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();

  if (isToday(date)) {
    return `Сегодня в ${format(date, 'HH:mm', { locale: ru })}`;
  }

  if (isYesterday(date)) {
    return `Вчера в ${format(date, 'HH:mm', { locale: ru })}`;
  }

  if (isSameYear(date, now)) {
    return format(date, 'd MMM в HH:mm', { locale: ru });
  }

  return format(date, 'd MMM yyyy г. в HH:mm', { locale: ru });
};
