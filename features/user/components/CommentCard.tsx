import { Button } from '@/components/ui';
import { useProfileContext } from '@/features/user/providers/ProfileContext';
import { IComment } from '@/features/user/types';
import { cn } from '@/lib/utils';
import { Star, Trash } from 'lucide-react';
import Image from 'next/image';

interface CommentCardProps {
  comment: IComment;
  variant?: 'card' | 'list';
  onDelete?: (commentId: string) => void;
  isDeleting?: boolean;
}

export function CommentCard({ comment, variant = 'list', onDelete, isDeleting }: CommentCardProps) {
  const { isOwnProfile, user, currentUser } = useProfileContext();
  const isCard = variant === 'card';
  const canDelete =
    currentUser?.username === comment.author.username || currentUser?.username === user?.username;

  const handleDelete = () => {
    if (window.confirm('Удалить комментарий?')) {
      onDelete?.(comment?.id);
    }
  };

  return (
    <div
      className={cn('bg-transparent relative border border-border md:p-4  rounded-lg flex gap-4')}
    >
      {canDelete && (
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="absolute top-4 right-4 cursor-pointer text-text-muted hover:text-text-main transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash size={20} />
        </button>
      )}
      {/* Блок аватара и имени */}
      <div className={cn('flex flex-col gap-4')}>
        <div className="flex gap-2">
          <div className="shrink-0">
            {comment.author.avatarUrl ? (
              <Image
                src={comment.author.avatarUrl}
                alt={comment.author.username}
                width={48}
                height={48}
                className="rounded-full object-cover border border-accent w-12 h-12"
              />
            ) : (
              <div className="rounded-full border border-accent bg-gray-700 flex items-center justify-center text-gray-400 font-bold w-12 h-12 text-base">
                {comment.author.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base text-text-main truncate">
              {comment.author.username}
            </span>
            <span className="text-sm text-text-muted whitespace-nowrap">
              {new Date(comment.createdAt).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>

        {/* Информация о комментарии */}
        <div className="flex flex-col gap-2 min-w-0 flex-1">
          <div className={cn('flex items-center gap-1')}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={16}
                className={
                  index < comment.rating
                    ? 'fill-accent text-accent' // Закрашенная звезда
                    : 'fill-transparent text-accent' // Пустая звезда
                }
              />
            ))}
          </div>
          <p className="text-text-main text-base wrap-break-word mt-1">{comment.text}</p>
        </div>
      </div>
    </div>
  );
}
