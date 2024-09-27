namespace Data_Access_Layer.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Models;

    public interface IGenreRepository
    {
        Task<Genre?> GetByNameAsync(string name);

        Task<IQueryable<Genre>> GetAllAsync();
    }
}
