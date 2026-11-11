'use client';

import { CommentSkeleton } from '@/components/ui';
import { useUserComments } from '@/features/user/hooks/useUserComments';
import Image from 'next/image';
import Link from 'next/link';

export function OverviewTab({ username }: { username: string }) {
  const { data: commentsData, isLoading: isCommentsLoading } = useUserComments(username, 1, 3);

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 space-y-8">
        <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Комментарии</h2>
            {commentsData && (
              <Link
                href={`/user/${username}/comments`}
                className="text-sm text-gray-400 hover:text-white bg-gray-800 px-3 py-1 rounded transition-colors"
              >
                Показать все
              </Link>
            )}
          </div>

          {isCommentsLoading ? (
            <div className="grid grid-cols-3 gap-4">
              <CommentSkeleton variant="card" />
              <CommentSkeleton variant="card" />
              <CommentSkeleton variant="card" />
            </div>
          ) : !commentsData?.comments.length ? (
            <div className="text-gray-500">Комментариев пока нет</div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {commentsData.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-gray-800/50 p-4 rounded-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      {comment.author.avatarUrl ? (
                        <Image
                          src={comment.author.avatarUrl}
                          alt={comment.author.username}
                          width={32}
                          height={32}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <Image
                          src={'/default-avatar.png'}
                          alt={comment.author.username}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      )}

                      <div className="flex flex-col">
                        <span className="font-medium text-sm leading-tight">
                          {comment.author.username}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString('ru-RU', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-300 line-clamp-2 mt-2">{comment.text}</p>
                  </div>

                  <div className="text-yellow-500 text-xs mt-3">
                    {'★'.repeat(comment.rating)}
                    {'☆'.repeat(5 - comment.rating)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="col-span-1 space-y-6">о себе</div>
    </div>
  );
}
