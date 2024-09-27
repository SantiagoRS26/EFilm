import { CommentDTO } from "../dto/CommentDTO";

export class Comment {
    public commentId: string;
    public userId: string;
    public commentText: string | null;
    public qualification: number | null;
    public commentDate: Date;
  
    constructor(commentData: CommentDTO) {
      this.commentId = commentData.commentId;
      this.userId = commentData.userId;
      this.commentText = commentData.commentText ?? null;
      this.qualification = commentData.qualification ?? null;
      this.commentDate = new Date(commentData.commentDate);
    }
  }