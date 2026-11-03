// components/ui/Input/Input.tsx
'use client';

import { cn } from '@/lib/utils';
import { Eye, EyeOff, LucideIcon } from 'lucide-react';
import { useState } from 'react';
import {
  inputContainer,
  inputLabel,
  inputWrapper,
  inputLeftIcon,
  inputPasswordButton,
  getInputClasses,
} from './Input.styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
}

export default function Input({
  label,
  icon: Icon,
  type = 'text',
  className,
  onChange,
  value,
  defaultValue,
  ...props // Тут остаются остальные HTML-атрибуты вроде required, placeholder и т.д.
}: InputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Безопасная инициализация текста
  const [inputValue, setInputValue] = useState(() => {
    return String(value ?? defaultValue ?? '');
  });

  const isPassword = type === 'password';
  const hasText = inputValue.length > 0;
  const inputType = isPassword && showPassword ? 'text' : type;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onChange) onChange(e);
  };

  const dynamicInputClasses = getInputClasses({
    hasText,
    hasIcon: !!Icon,
    isPassword,
  });

  return (
    <div className={inputContainer}>
      {label && <label className={inputLabel}>{label}</label>}

      <div
        className={inputWrapper}
        data-has-text={hasText}
      >
        {Icon && <Icon className={inputLeftIcon} />}

        <input
          type={inputType}
          value={value !== undefined ? value : inputValue} // Избавляемся от одновременного value и defaultValue
          onChange={handleInputChange}
          className={cn(dynamicInputClasses, className)}
          {...props} // Теперь props безопасны и не перезапишут value заново
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            onMouseDown={(e) => e.preventDefault()}
            className={inputPasswordButton}
          >
            {showPassword ? <Eye className="w-5.5 h-5.5" /> : <EyeOff className="w-5.5 h-5.5" />}
          </button>
        )}
      </div>
    </div>
  );
}
