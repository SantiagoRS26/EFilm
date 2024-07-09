namespace Data_Access_Layer.Services
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

    public class MovieService : IGenericRepository<Movie>
    {
        private readonly DataContext context;

        public MovieService(DataContext context)
        {
            this.context = context;
        }

        public async Task<Movie> CreateAsync(Movie newMovie)
        {
            try
            {
                await this.context.AddAsync(newMovie);
                await this.context.SaveChangesAsync();

                return newMovie;
            }
            catch (DbUpdateException ex)
            {
                throw new Exception("Error saving movie to database", ex);
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                Movie? movieToDelete = await this.context.Movies.FindAsync(id);
                this.context.Remove(movieToDelete);
                await this.context.SaveChangesAsync();

                return true;
            }
            catch (DbUpdateException ex)
            {
                throw new Exception("Error deleting movie from database", ex);
            }
        }

        public Task<IQueryable<Movie>> GetAll()
        {
            try
            {
                IQueryable<Movie> movies = this.context.Movies;
                return Task.FromResult(movies);
            }
            catch (Exception ex)
            {
                throw new Exception("Error retrieving movies from database", ex);
            }
        }

        public async Task<Movie> GetByIdAsync(int id)
        {
            try
            {
                Movie? movie = await this.context.Movies.FindAsync(id);
                return movie;
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching movie from database", ex);
            }
        }

        public async Task<Movie> UpdateAsync(Movie movieUpdated)
        {
            try
            {
                this.context.Update(movieUpdated);
                await this.context.SaveChangesAsync();
                return movieUpdated;
            }
            catch (Exception ex)
            {
                throw new Exception("Unexpected error occurred while updating movie", ex);
            }
        }
    }
}
