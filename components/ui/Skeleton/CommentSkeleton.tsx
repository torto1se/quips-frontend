import { Skeleton } from '@/components/ui/Skeleton/Skeleton';

interface CommentSkeletonProps {
  variant?: 'list' | 'card';
}

export function CommentSkeleton({ variant = 'list' }: CommentSkeletonProps) {
  if (variant === 'card') {
    return (
      <div className="bg-gray-800/50 p-4 rounded-lg flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Skeleton className="w-8 h-8 rounded-full shrink-0" />
            <div className="flex flex-col space-y-1.5">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-2 w-20" />
            </div>
          </div>
          <div className="space-y-2 mt-3">
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
    <div className="bg-gray-800/50 p-5 rounded-lg flex gap-4">
      <Skeleton className="w-12 h-12 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="flex gap-4 items-center">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-32 mt-2" />
      </div>
    </div>
  );
}
