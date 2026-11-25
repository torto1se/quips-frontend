'use client';

import { useState } from 'react';
import { ConfirmModal } from '@/components/ui';
import { useProfileContext } from '@/features/user/providers/ProfileContext';
import { IComment } from '@/features/user/types';
import { cn } from '@/lib/utils';
import { Star, Trash } from 'lucide-react';
import Image from 'next/image';
import { formatDate } from '@/lib/utils/date';

interface CommentCardProps {
  comment: IComment;
  onDelete?: (commentId: string) => Promise<unknown>;
  isDeleting?: boolean;
}

export function CommentCard({ comment, onDelete, isDeleting }: CommentCardProps) {
  const { isOwnProfile, currentUser } = useProfileContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const canDelete = currentUser?.username === comment.author.username || isOwnProfile;

  const handleConfirm = async () => {
    try {
      await onDelete?.(comment.id);
      setIsModalOpen(false);
    } catch (e) {}
  };

  return (
    <>
      <div className={cn('border-border relative flex gap-4 rounded-lg border bg-transparent p-4')}>
        {canDelete && (
          <button
            className="text-text-muted hover:text-text-main absolute top-4 right-4 cursor-pointer transition-all disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => setIsModalOpen(true)}
            disabled={isDeleting}
            aria-label="Удалить комментарий"
          >
            <Trash size={20} />
          </button>
        )}
        <div className={cn('flex flex-col gap-4')}>
          <div className="flex gap-2">
            <div className="shrink-0">
              {comment.author.avatarUrl ? (
                <Image
                  className="border-accent h-12 w-12 rounded-full border object-cover"
                  src={comment.author.avatarUrl}
                  alt={comment.author.username}
                  width={48}
                  height={48}
                />
              ) : (
                <div className="border-accent flex h-12 w-12 items-center justify-center rounded-full border bg-gray-700 text-base font-bold text-gray-400">
                  {comment.author.username.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-text-main truncate text-base font-bold">
                {comment.author.username}
              </span>
              <span className="text-text-muted text-sm whitespace-nowrap">
                {formatDate(comment.createdAt)}
              </span>
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className={cn('flex items-center gap-1')}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  className={
                    index < comment.rating
                      ? 'fill-accent text-accent'
                      : 'text-accent fill-transparent'
                  }
                  key={index}
                  size={16}
                />
              ))}
            </div>
            <p className="text-text-main mt-1 text-base wrap-break-word">{comment.text}</p>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="Удалить этот комментарий?"
        isLoading={isDeleting}
      />
    </>
  );
}
