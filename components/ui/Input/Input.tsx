'use client';

import { useId, useState } from 'react';
import { Eye, EyeOff, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  inputContainer,
  inputLabel,
  inputWrapper,
  inputWrapperError,
  inputIcon,
  inputField,
  inputPasswordButton,
} from './Input.styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string | null;
  action?: React.ReactNode;
  ref?: React.Ref<HTMLInputElement>;
}

export function Input({
  label,
  icon: Icon,
  type = 'text',
  error,
  action,
  className,
  id: externalId,
  ref,
  ...props
}: InputProps) {
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const errorId = `${id}-error`;

  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={inputContainer}>
      <div className="flex items-center justify-between gap-2">
        <label
          className={inputLabel}
          htmlFor={id}
        >
          {label}
        </label>
        {action}
      </div>

      <div className={cn(inputWrapper, error && inputWrapperError)}>
        {Icon && (
          <Icon
            className={inputIcon}
            aria-hidden="true"
          />
        )}

        <input
          className={cn(inputField, className)}
          id={id}
          ref={ref}
          type={inputType}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />

        {isPassword && (
          <button
            className={inputPasswordButton}
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            onMouseDown={(event) => event.preventDefault()}
            aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
            aria-pressed={showPassword}
          >
            {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
          </button>
        )}
      </div>

      {error && (
        <p
          className="text-sm text-red-400"
          id={errorId}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
