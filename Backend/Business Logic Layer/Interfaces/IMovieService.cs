namespace Business_Logic_Layer.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Models;
    using Models.DTO;

    public interface IMovieService
    {
        Task<IEnumerable<Movie>> GetAllMoviesAsync();

        Task<Movie> CreateMovieAsync(Movie movie);

        Task<Movie> GetMovieByIdAsync(string id);

        Task<Movie> UpdateMovieAsync(Movie movie);

        Task<Movie> DeleteMovieAsync(int id);

        Task<List<Movie>> SearchMoviesAsync(string searchTerm);
    }
}