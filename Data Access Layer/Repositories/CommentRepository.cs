namespace Data_Access_Layer.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Data_Access_Layer.Context;
    using Data_Access_Layer.Interfaces;
    using Microsoft.EntityFrameworkCore;
    using Models;

    public class CommentRepository : IGenericRepository<Comment>
    {
        private readonly DataContext context;

        public CommentRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<Comment> CreateAsync(Comment newComment)
        {
            try
            {
                await this.context.AddAsync(newComment);
                await this.context.SaveChangesAsync();

                return newComment;
            }
            catch (DbUpdateException ex)
            {
                throw new Exception("Error saving comment to database", ex);
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                Comment? commentToDelete = await this.context.Comments.FindAsync(id);
                this.context.Remove(commentToDelete);
                await this.context.SaveChangesAsync();

                return true;
            }
            catch (DbUpdateException ex)
            {
                throw new Exception("Error deleting comment from database", ex);
            }
        }

        public Task<IQueryable<Comment>> GetAll()
        {
            try
            {
                IQueryable<Comment> comments = this.context.Comments;
                return Task.FromResult(comments);
            }
            catch (Exception ex)
            {
                throw new Exception("Error retrieving comments from database", ex);
            }
        }

        public async Task<Comment> GetByIdAsync(string id)
        {
            try
            {
                Comment? comment = await this.context.Comments.FindAsync(id);
                return comment;
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching comment from database", ex);
            }
        }

        public async Task<Comment> UpdateAsync(Comment commentUpdated)
        {
            try
            {
                this.context.Update(commentUpdated);
                await this.context.SaveChangesAsync();
                return commentUpdated;
            }
            catch (Exception ex)
            {
                throw new Exception("Unexpected error occurred while updating comment", ex);
            }
        }
    }
}
