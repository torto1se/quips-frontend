export const inputContainer = 'w-full space-y-1.5';

export const inputLabel = 'block text-sm text-text-main font-medium';

export const inputWrapper = 'relative w-full group';

export const inputLeftIcon =
  'absolute left-4 top-1/2 -translate-y-1/2 w-5.5 h-5.5 pointer-events-none transition-colors text-text-main';

export const inputPasswordButton =
  'absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer transition-colors text-text-main';

export const inputBase =
  'w-full rounded-xl bg-bg-primary border border-border py-3 text-base text-text-main transition-colors focus:outline-none focus:border-accent';

interface InputClassOptions {
  hasIcon: boolean;
  isPassword: boolean;
}

export const getInputClasses = ({ hasIcon, isPassword }: InputClassOptions) => {
  return [inputBase, hasIcon ? 'pl-11.5' : 'px-4', isPassword ? 'pr-12' : 'pr-4']
    .filter(Boolean)
    .join(' ');
};
