import { Skeleton } from '@/components/ui/Skeleton/Skeleton';

interface CommentSkeletonProps {
  variant?: 'list' | 'card';
}

export function CommentSkeleton({ variant = 'list' }: CommentSkeletonProps) {
  if (variant === 'card') {
    return (
      <div className="flex h-full flex-col justify-between rounded-lg bg-gray-800/50 p-4">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
            <div className="flex flex-col space-y-1.5">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-2 w-20" />
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
          </div>
        </div>
        <div className="mt-4">
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 rounded-lg bg-gray-800/50 p-5">
      <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="mt-2 h-3 w-32" />
      </div>
    </div>
  );
}
