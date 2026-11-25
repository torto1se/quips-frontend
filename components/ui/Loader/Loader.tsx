import { cn } from '@/lib/utils';
import { Sizes } from '@/components/ui/types';
import { Loader2 } from 'lucide-react';

interface LoaderProps {
  className?: string;
  size?: Sizes;
  'aria-label'?: string;
}

const sizeMap = {
  xs: 'w-2 h-2',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

export function Loader({
  className,
  size = 'md',
  'aria-label': ariaLabel = 'Загрузка',
}: LoaderProps) {
  return (
    <Loader2
      className={cn('animate-spin text-current', sizeMap[size], className)}
      role="status"
      aria-label={ariaLabel}
    />
  );
}
