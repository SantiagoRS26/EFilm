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

    public class GenreRepository : IGenreRepository
    {
        private readonly DataContext context;

        public GenreRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<Genre> CreateAsync(Genre newGenre)
        {
            try
            {
                await this.context.AddAsync(newGenre);
                await this.context.SaveChangesAsync();

                return newGenre;
            }
            catch (DbUpdateException ex)
            {
                throw new Exception("Error saving Genre to database", ex);
            }
        }

        public async Task<bool> DeleteAsync(string id)
        {
            try
            {
                Genre? GenreToDelete = await this.context.Genres.FindAsync(id);
                this.context.Remove(GenreToDelete);
                await this.context.SaveChangesAsync();

                return true;
            }
            catch (DbUpdateException ex)
            {
                throw new Exception("Error deleting Genre from database", ex);
            }
        }

        public async Task<IQueryable<Genre>> GetAllAsync()
        {
            try
            {
                IQueryable<Genre> genres = this.context.Genres.AsNoTracking();
                return genres;
            }
            catch (Exception ex)
            {
                throw new Exception("Error retrieving Genres from database", ex);
            }
        }

        public async Task<Genre> GetByIdAsync(string id)
        {
            try
            {
                Genre? Genre = await this.context.Genres.FindAsync(id);
                return Genre;
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching Genre from database", ex);
            }
        }

        public async Task<Genre> UpdateAsync(Genre GenreUpdated)
        {
            try
            {
                this.context.Update(GenreUpdated);
                await this.context.SaveChangesAsync();
                return GenreUpdated;
            }
            catch (Exception ex)
            {
                throw new Exception("Unexpected error occurred while updating Genre", ex);
            }
        }

        public async Task<Genre?> GetByNameAsync(string name)
        {
            try
            {
                return await this.context.Genres.FirstOrDefaultAsync(g => g.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching Genre by name from database", ex);
            }
        }
    }
}
