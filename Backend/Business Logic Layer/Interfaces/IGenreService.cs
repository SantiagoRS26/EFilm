using DTO;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Logic_Layer.Interfaces
{
    public interface IGenreService
    {
        Task<Genre?> GetGenreByNameAsync(string name);

        Task<IEnumerable<Genre>> GetAllGenresAsync();

        Task<PagedResultDTO<GenreDTO>> GetPagedGenresAsync(int pageNumber, int pageSize);
    }
}
