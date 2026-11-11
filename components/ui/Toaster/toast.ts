import { DEFAULT_TITLES } from '@/components/ui/Toaster/types';
import { toast as sonnerToast, ExternalToast } from 'sonner';

export const toast = {
  success: (description?: string, options?: ExternalToast) =>
    sonnerToast.success(DEFAULT_TITLES.success, { description, ...options }),

  error: (description?: string, options?: ExternalToast) =>
    sonnerToast.error(DEFAULT_TITLES.error, { description, ...options }),

  info: (description?: string, options?: ExternalToast) =>
    sonnerToast.info(DEFAULT_TITLES.info, { description, ...options }),

  warning: (description?: string, options?: ExternalToast) =>
    sonnerToast.warning(DEFAULT_TITLES.warning, { description, ...options }),
};
