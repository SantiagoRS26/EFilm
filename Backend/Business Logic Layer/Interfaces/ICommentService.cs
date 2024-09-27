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

        Task<bool> DeleteCommentAsync(string id, string userId);

        Task<Comment> GetCommentByIdAsync(string id);

        Task<Comment> UpdateCommentAsync(Comment updatedComment, string userId);

        Task<IEnumerable<Comment>> GetCommentsByMovieIdAsync(string movieId);
    }
}
