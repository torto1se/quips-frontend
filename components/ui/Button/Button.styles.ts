import { Sizes } from '@/components/ui/types';

export const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-50';

export const buttonVariants = {
  primary: 'bg-accent text-text-main hover:opacity-90',
  outline: 'bg-transparent text-accent border border-accent hover:bg-accent/10',
  flat: 'bg-transparent text-muted hover:text-main',
};

export const buttonSizes: Record<Sizes, string> = {
  sm: 'py-1 px-3 text-sm',
  md: 'py-2 px-4 text-base tracking-widest',
  lg: 'py-3 px-6 text-lg tracking-wider',
  xl: 'py-4 px-8 text-xl',
};
