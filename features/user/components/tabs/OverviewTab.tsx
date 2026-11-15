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
  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment(username);

  return (
    <div className="w-full space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold">Комментарии</h2>
        {commentsData && (
          <Link
            href={`/user/${username}/comments`}
            className="text-sm text-text-muted hover:text-text-main  px-3 py-1 rounded transition-colors border border-border"
          >
            Показать все
          </Link>
        )}
      </div>

      {isCommentsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <CommentSkeleton variant="card" />
          <CommentSkeleton variant="card" />
          <CommentSkeleton variant="card" />
        </div>
      ) : !commentsData?.comments.length ? (
        <div className="text-text-muted">Комментариев пока нет</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {commentsData.comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              onDelete={deleteComment}
              isDeleting={isDeleting}
              variant="card"
            />
          ))}
        </div>
      )}
    </div>
  );
}
