'use client';

import { Button, CommentSkeleton } from '@/components/ui';
import { CommentCard } from '@/features/user/components/CommentCard';
import { useDeleteComment } from '@/features/user/hooks/useDeleteComment';
import { useUserComments } from '@/features/user/hooks/useUserComments';
import { useRouter, useSearchParams } from 'next/navigation';
import { use, useEffect } from 'react';

export function CommentsTab({ params }: { params: Promise<{ username: string }> }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { username } = use(params);

  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 5;

  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment(username);

  const {
    data: commentsData,
    isPlaceholderData,
    isFetching,
  } = useUserComments(username, page, limit);

  const updateUrl = (newPage: number, newLimit: number) => {
    router.push(`/user/${username}/comments?page=${newPage}&limit=${newLimit}`, { scroll: false });
  };

  useEffect(() => {
    if (commentsData?.meta) {
      const totalPages = commentsData.meta.totalPages;

      if (page > totalPages && totalPages > 0) {
        updateUrl(totalPages, limit);
      } else if (commentsData.comments.length === 0 && page > 1) {
        updateUrl(page - 1, limit);
      }
    }
  }, [commentsData, page, limit]);

  const handlePageChange = (newPage: number) => {
    updateUrl(newPage, limit);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(e.target.value);
    updateUrl(1, newLimit);
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Все комментарии ({commentsData?.meta.totalCount || 0})
        </h2>

        <div className="flex items-center gap-2">
          <label
            className="text-text-muted text-sm"
            htmlFor="limit-select"
          >
            Показывать по:
          </label>
          <select
            className="bg-bg-page border-border text-text-muted cursor-pointer rounded-lg border px-3 py-1.5 text-sm transition-all outline-none"
            id="limit-select"
            value={limit}
            onChange={handleLimitChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>
      </div>
      <div
        className={`space-y-4 transition-opacity duration-200 ${isPlaceholderData ? 'pointer-events-none opacity-50' : ''}`}
      >
        {!commentsData && isFetching && (
          <div className="space-y-4">
            <CommentSkeleton />
            <CommentSkeleton />
            <CommentSkeleton />
          </div>
        )}

        {commentsData && commentsData.comments.length === 0 && (
          <div className="text-text-main">Комментариев пока нет</div>
        )}

        {commentsData?.comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            onDelete={deleteComment}
            isDeleting={isDeleting}
          />
        ))}
      </div>
      {commentsData && commentsData?.meta.totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4 border-t border-gray-800 pt-4">
          <Button
            disabled={page === 1 || isPlaceholderData}
            onClick={() => handlePageChange(page - 1)}
            variant="primary"
          >
            Назад
          </Button>

          <span className="flex items-center gap-2 text-sm text-gray-400">
            Страница {page} из {commentsData?.meta.totalPages}
            {isPlaceholderData && (
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
            )}
          </span>

          <Button
            disabled={page === commentsData?.meta.totalPages || isPlaceholderData}
            onClick={() => handlePageChange(page + 1)}
            variant="primary"
          >
            Вперед
          </Button>
        </div>
      )}
    </div>
  );
}
