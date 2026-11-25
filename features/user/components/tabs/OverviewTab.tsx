'use client';

import { CommentSkeleton } from '@/components/ui';
import { CommentCard } from '@/features/user/components/CommentCard';
import { useDeleteComment } from '@/features/user/hooks/useDeleteComment';
import { useUserComments } from '@/features/user/hooks/useUserComments';
import Link from 'next/link';
import { use } from 'react';

export function OverviewTab({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params);
  const { data: commentsData, isLoading: isCommentsLoading } = useUserComments(username, 1, 3);
  const { mutateAsync: deleteComment, isPending: isDeleting } = useDeleteComment(username);

  return (
    <div className="w-full space-y-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold">Комментарии</h2>
        {commentsData && (
          <Link
            className="text-text-muted hover:text-text-main border-border rounded border px-3 py-1 text-sm transition-colors"
            href={`/user/${username}/comments`}
          >
            Показать все
          </Link>
        )}
      </div>

      {isCommentsLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <CommentSkeleton variant="card" />
          <CommentSkeleton variant="card" />
          <CommentSkeleton variant="card" />
        </div>
      ) : !commentsData?.comments.length ? (
        <div className="text-text-muted">Комментариев пока нет</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {commentsData.comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              onDelete={deleteComment}
              isDeleting={isDeleting}
            />
          ))}
        </div>
      )}
    </div>
  );
}
