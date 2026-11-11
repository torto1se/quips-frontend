'use client';

import { CommentSkeleton } from '@/components/ui';
import { useUserComments } from '@/features/user/hooks/useUserComments';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function CommentsTab({
  username,
  page,
  limit,
}: {
  username: string;
  page: number;
  limit: number;
}) {
  const router = useRouter();

  const {
    data: commentsData,
    isLoading,
    isPlaceholderData,
    isFetching,
  } = useUserComments(username, page, limit);

  const updateUrl = (newPage: number, newLimit: number) => {
    router.push(`/user/${username}/comments?page=${newPage}&limit=${newLimit}`, { scroll: false });
  };

  const handlePageChange = (newPage: number) => {
    updateUrl(newPage, limit);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(e.target.value);
    updateUrl(1, newLimit);
  };

  return (
    <div className="max-w-4xl bg-gray-900/50 p-6 rounded-xl border border-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          Все комментарии ({commentsData?.meta.totalCount || 0})
        </h2>

        <div className="flex items-center gap-2">
          <label
            htmlFor="limit-select"
            className="text-sm text-gray-400"
          >
            Показывать по:
          </label>
          <select
            id="limit-select"
            value={limit}
            onChange={handleLimitChange}
            className="bg-gray-800 border border-gray-700 text-sm rounded-lg px-3 py-1.5 outline-none text-white cursor-pointer"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>
      </div>
      <div
        className={`space-y-4 transition-opacity duration-200 ${isPlaceholderData ? 'opacity-50 pointer-events-none' : ''}`}
      >
        {!commentsData && isFetching && (
          <div className="space-y-4">
            <CommentSkeleton />
            <CommentSkeleton />
            <CommentSkeleton />
          </div>
        )}

        {commentsData && commentsData.comments.length === 0 && (
          <div className="text-gray-500">Комментариев пока нет</div>
        )}

        {commentsData?.comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-gray-800/50 p-5 rounded-lg flex gap-4"
          >
            {comment.author.avatarUrl ? (
              <Image
                src={comment.author.avatarUrl}
                alt={comment.author.username}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 font-bold">
                {comment.author.username.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <div className="flex gap-4 items-center mb-1">
                <span className="font-bold">{comment.author.username}</span>
                <span className="text-yellow-500 text-sm">
                  {'★'.repeat(comment.rating)}
                  {'☆'.repeat(5 - comment.rating)}
                </span>
              </div>
              <p className="text-gray-300">{comment.text}</p>
              <span className="text-xs text-gray-500 mt-2 block">
                {new Date(comment.createdAt).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
      {commentsData && commentsData?.meta.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8 pt-4 border-t border-gray-800">
          <button
            disabled={page === 1 || isPlaceholderData}
            onClick={() => handlePageChange(page - 1)}
            className="px-4 py-2 bg-gray-800 rounded disabled:opacity-50 hover:bg-gray-700 transition"
          >
            Назад
          </button>

          <span className="text-sm text-gray-400 flex items-center gap-2">
            Страница {page} из {commentsData?.meta.totalPages}
            {isPlaceholderData && (
              <span className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            )}
          </span>

          <button
            disabled={page === commentsData?.meta.totalPages || isPlaceholderData}
            onClick={() => handlePageChange(page + 1)}
            className="px-4 py-2 bg-gray-800 rounded disabled:opacity-50 hover:bg-gray-700 transition"
          >
            Вперед
          </button>
        </div>
      )}
    </div>
  );
}
