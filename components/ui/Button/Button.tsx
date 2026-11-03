'use client';

import { Sizes } from '@/types/ui';
import Link from 'next/link';
import { ReactNode } from 'react';
import { buttonBase, buttonSizes, buttonVariants } from './Button.styles';
import { Icon, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
  icon?: LucideIcon;
  variant?: keyof typeof buttonVariants;
  size?: Sizes;
  isLoading?: boolean;
  isUppercase?: boolean;
  className?: string;
}

export default function Button({
  children,
  href,
  icon: Icon,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isUppercase = false,
  className = '',
  type = 'button',
  disabled,
  ...props
}: ButtonProps) {
  const combinedStyles = cn(`
    ${buttonBase}
    ${buttonVariants[variant]}
    ${buttonSizes[size]} 
    ${isUppercase ? 'uppercase' : ''}
    ${isLoading ? 'pointer-events-none opacity-70' : ''}
    ${className}
  `);

  if (href && !disabled && !isLoading) {
    return (
      <Link
        href={href}
        className={combinedStyles}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={combinedStyles}
      {...props}
    >
      {Icon && <Icon className={cn('w-5.5 h-5.5 pointer-events-none transition-colors')} />}
      {isLoading ? <span>Загрузка...</span> : children}
    </button>
  );
}
