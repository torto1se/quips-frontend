import { toast } from '@/components/ui';
import { user } from '@/features/user/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteComment(username: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => user.deleteComment(commentId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user', 'comments', username] });

      toast.success(data.message);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Не удалось удалить комментарий');
    },
  });
}
