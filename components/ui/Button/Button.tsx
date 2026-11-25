import { Sizes } from '@/components/ui/types';
import { ReactNode } from 'react';
import { buttonBase, buttonSizes, buttonVariants } from './Button.styles';
import { LucideIcon } from 'lucide-react';
import { Loader } from '@/components/ui/Loader';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: LucideIcon;
  variant?: keyof typeof buttonVariants;
  size?: Sizes;
  isLoading?: boolean;
  isUppercase?: boolean;
}

export function Button({
  children,
  icon: Icon,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isUppercase = false,
  className,
  type = 'button',
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      className={cn(
        buttonBase,
        buttonVariants[variant],
        buttonSizes[size],
        isUppercase && 'uppercase',
        className,
      )}
      type={type}
      disabled={isDisabled}
      {...props}
    >
      <span
        className={cn(
          'inline-flex items-center justify-center gap-2 transition-opacity',
          isLoading && 'invisible',
        )}
      >
        {Icon && <Icon className="pointer-events-none h-5 w-5" />}
        {children}
      </span>

      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader size={size} />
        </span>
      )}
    </button>
  );
}
