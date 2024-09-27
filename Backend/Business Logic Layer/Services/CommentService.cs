namespace Business_Logic_Layer.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Business_Logic_Layer.Interfaces;
    using Data_Access_Layer.Interfaces;
    using Data_Access_Layer.Repositories;
    using Models;

    public class CommentService : ICommentService
    {
        private readonly IGenericRepository<Comment> commentRepository;

        public CommentService(IGenericRepository<Comment> commentRepository)
        {
            this.commentRepository = commentRepository;
        }

        public async Task<Comment> CreateCommentAsync(Comment newComment, string userId)
        {
            newComment.UserId = userId;
            return await this.commentRepository.CreateAsync(newComment);
        }

        public async Task<bool> DeleteCommentAsync(string id, string userId)
        {
            var comment = await this.commentRepository.GetByIdAsync(id.ToString());

            if (comment == null || comment.UserId != userId)
            {
                return false;
            }

            return await this.commentRepository.DeleteAsync(id);
        }

        public async Task<Comment> GetCommentByIdAsync(string id)
        {
            return await this.commentRepository.GetByIdAsync(id.ToString());
        }

        public async Task<Comment> UpdateCommentAsync(Comment updatedComment, string userId)
        {
            var existingComment = await this.commentRepository.GetByIdAsync(updatedComment.CommentId.ToString());

            if (existingComment == null || existingComment.UserId != userId)
            {
                return null;
            }

            existingComment.CommentText = updatedComment.CommentText;
            existingComment.Qualification = updatedComment.Qualification;

            return await this.commentRepository.UpdateAsync(existingComment);
        }

        public async Task<IEnumerable<Comment>> GetCommentsByMovieIdAsync(string movieId)
        {
            var comments = await this.commentRepository.GetAll();
            return comments.Where(c => c.MovieId == movieId).ToList();
        }
    }
}
