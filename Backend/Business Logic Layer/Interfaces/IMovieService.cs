namespace Business_Logic_Layer.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using DTO;
    using Models;
    using Models.DTO;

    public interface IMovieService
    {
        Task<IEnumerable<Movie>> GetAllMoviesAsync();

        Task<Movie> CreateMovieAsync(Movie movie);

        Task<MovieDetailDTO> GetMovieByIdAsync(string id);

        Task<Movie> UpdateMovieAsync(Movie movie);

        Task<Movie> DeleteMovieAsync(int id);

        Task<PagedResultDTO<MovieBasicInfoDTO>> SearchMoviesAsync(string searchTerm, int pageNumber, int pageSize);

        Task<PagedResultDTO<MovieBasicInfoDTO>> GetFilteredMoviesAsync(string genreId, string keyword, DateTime? releaseDate, int pageNumber, int pageSize);
    }
}