import { ToastType } from '@/components/ui/Toaster/types';
import { CheckCircle2, AlertCircle, Info, XCircle } from 'lucide-react';

export function ToastIcon({ type }: { type: ToastType }) {
  const baseStyle = 'w-6 h-6';
  if (type === 'success') return <CheckCircle2 className={`${baseStyle} text-success`} />;
  if (type === 'error') return <XCircle className={`${baseStyle} text-error`} />;
  if (type === 'info') return <Info className={`${baseStyle} text-info`} />;
  return <AlertCircle className={`${baseStyle} text-warning`} />;
}
