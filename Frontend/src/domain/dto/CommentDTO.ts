export interface CommentDTO {
  commentId: string;
  userId: string;
  commentText?: string | null;
  qualification?: number | null;
  commentDate: Date;
}
