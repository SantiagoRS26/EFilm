namespace Data_Access_Layer.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Models;

    public interface IMovieRepository
    {

        //Task<IQueryable<Movie>> GetPagedMoviesAsync(int page, int pageSize);

        IQueryable<Movie> GetMoviesQuery();

        Task<Movie> GetByIdAsync(string id);

        //Task<Movie> GetMovieByIdAsync(string id);

        //Task<IQueryable<Movie>> GetFilteredMoviesAsync(string genreId, string keyword, DateTime? releaseDate, int page, int pageSize);

        IQueryable<Movie> SearchMovies(string searchTerm);
    }
}
