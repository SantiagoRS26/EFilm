using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data_Access_Layer.Interfaces
{
    public interface IKeywordRepository
    {
        Task<Keyword> FindByKeywordAsync(string keyword);

        Task<IQueryable<Keyword>> FindAllKeywordsAsync(int page, int pageSize);

        Task<IQueryable<Keyword>> FindByPartialKeywordAsync(string partialKeyword);

        Task<IQueryable<Keyword>> FindByMovieIdAsync(string movieId);
    }
}