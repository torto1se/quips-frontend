import { Sizes } from '@/components/ui/types';
import { ReactNode } from 'react';
import { buttonBase, buttonSizes, buttonVariants } from './Button.styles';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Loader } from '@/components/ui/Loader';

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
  const combinedStyles = cn(
    buttonBase,
    buttonVariants[variant],
    buttonSizes[size],
    isUppercase && 'uppercase',
    className,
  );

  return (
    <button
      className={combinedStyles}
      type={type}
      disabled={disabled || isLoading}
      {...props}
    >
      {Icon && <Icon className="pointer-events-none h-5 w-5" />}
      {isLoading ? <Loader size={size} /> : children}
    </button>
  );
}
