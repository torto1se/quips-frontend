import { Sizes } from '@/components/ui/types';

export const buttonBase =
  'inline-flex items-center justify-center outline-none gap-2 font-medium transition-all duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-50 relative';

export const buttonVariants = {
  primary: 'bg-accent text-text-main hover:opacity-90',
  outline: 'bg-transparent text-accent border border-accent hover:bg-accent/10',
  flat: 'bg-transparent text-text-main hover:bg-accent-dark/60',
};

export const buttonSizes = {
  xs: 'rounded-lg px-2.5 py-1.5 text-xs',
  sm: 'rounded-lg px-3 py-1.5 text-sm',
  md: 'rounded-lg px-4 py-2 text-sm tracking-widest',
  lg: 'rounded-xl px-5 py-2.5 text-base tracking-wider',
  xl: 'rounded-xl px-6 py-3 text-base',
} satisfies Record<Sizes, string>;
