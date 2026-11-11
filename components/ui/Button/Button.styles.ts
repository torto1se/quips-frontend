import { Sizes } from '@/components/ui/types';

export const buttonBase =
  'w-full rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ' +
  'disabled:opacity-50 disabled:cursor-not-allowed';

export const buttonVariants = {
  primary: 'bg-accent text-text-main hover:opacity-90',
  outline: 'bg-transparent text-accent border border-accent hover:bg-accent/10',
  flat: 'bg-transparent text-muted hover:text-main',
};

export const buttonSizes: Record<Sizes, string> = {
  sm: 'py-1.5 px-3 text-sm',
  md: 'py-3 px-4 text-md tracking-wide',
  lg: 'py-4 px-6 text-lg tracking-wider',
  xl: 'py-5 px-8 text-xl',
};
