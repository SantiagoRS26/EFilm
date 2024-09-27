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

    public class MovieRepository : IMovieRepository
    {
        private readonly DataContext context;

        public MovieRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<Movie> GetByIdAsync(string id)
        {
            try
            {
                Movie? movie = await this.context.Movies
                    .Include(m => m.Genres)
                    .Include(m => m.Keywords)
                    .Include(m => m.Comments)
                    .Include(m => m.MovieLanguages)
                    .FirstOrDefaultAsync(m => m.MovieId == id);

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

        public IQueryable<Movie> SearchMovies(string searchTerm)
        {
            try
            {
                IQueryable<Movie> query = this.context.Movies;

                if (!string.IsNullOrEmpty(searchTerm))
                {
                    query = query.Where(m => EF.Functions.Contains(m.Title, searchTerm) ||
                                     EF.Functions.Contains(m.Description, searchTerm) ||
                                     EF.Functions.Contains(m.Tagline, searchTerm));
                }

                return query;
            }
            catch (Exception ex)
            {
                throw new Exception("Error searching for movies", ex);
            }
        }

        public IQueryable<Movie> GetMoviesQuery()
        {
            return this.context.Movies.AsQueryable();
        }
    }
}
