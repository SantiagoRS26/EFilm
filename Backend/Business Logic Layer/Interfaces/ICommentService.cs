namespace Business_Logic_Layer.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Models;

    public interface ICommentService
    {
        Task<Comment> CreateCommentAsync(Comment newComment, string userId);

        Task<bool> DeleteCommentAsync(int id, string userId);

        Task<Comment> GetCommentByIdAsync(int id);

        Task<Comment> UpdateCommentAsync(Comment updatedComment, string userId);

        Task<IEnumerable<Comment>> GetCommentsByMovieIdAsync(int movieId);
    }
}
