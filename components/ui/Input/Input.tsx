'use client';

import { useId, useState } from 'react';
import { Eye, EyeOff, LucideIcon } from 'lucide-react';
import { cn } from '@/shared/utils';
import {
  inputContainer,
  inputLabel,
  inputWrapper,
  inputLeftIcon,
  inputPasswordButton,
  getInputClasses,
} from './Input.styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string | null;
}

export default function Input({
  label,
  icon: Icon,
  type = 'text',
  error,
  className,
  ...props
}: InputProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={inputContainer}>
      <label
        htmlFor={id}
        className={inputLabel}
      >
        {label}
      </label>

      <div className={inputWrapper}>
        {Icon && <Icon className={inputLeftIcon} />}

        <input
          id={id}
          type={inputType}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            getInputClasses({
              hasIcon: Boolean(Icon),
              isPassword,
            }),
            className,
          )}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            onMouseDown={(event) => event.preventDefault()}
            className={inputPasswordButton}
            aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </button>
        )}
      </div>

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-sm text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}
