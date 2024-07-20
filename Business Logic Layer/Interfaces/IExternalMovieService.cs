namespace Business_Logic_Layer.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Models.DTO;

    public interface IExternalMovieService
    {
        Task<MovieSearchResponseDTO?> SearchMoviesAsync(string query);

        Task<ExternalMovieDTO?> GetMovieByIdAsync(string id);
    }
}
