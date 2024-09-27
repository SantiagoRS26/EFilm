using Business_Logic_Layer.Interfaces;
using Data_Access_Layer.Interfaces;
using Data_Access_Layer.Repositories;
using DTO;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Logic_Layer.Services
{
    public class GenreService : IGenreService
    {
        private readonly IGenreRepository genreRepository;

        public GenreService(IGenreRepository GenreRepository)
        {
            this.genreRepository = GenreRepository;
        }

        public async Task<IEnumerable<Genre>> GetAllGenresAsync()
        {
            return await this.genreRepository.GetAllAsync();
        }

        public async Task<PagedResultDTO<GenreDTO>> GetPagedGenresAsync(int pageNumber, int pageSize)
        {
            var query = await this.genreRepository.GetAllAsync();

            var genres = await query
                .OrderBy(g => g.Name)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(g => new GenreDTO
                {
                    GenreId = g.GenreId,
                    Name = g.Name
                }).ToListAsync();

            var totalRecords = await query.CountAsync();

            return new PagedResultDTO<GenreDTO>
            {
                Items = genres,
                TotalRecords = totalRecords,
                PageNumber = pageNumber,
                PageSize = pageSize,
            };
        }

        public async Task<Genre?> GetGenreByNameAsync(string name)
        {
            return await this.genreRepository.GetByNameAsync(name);
        }


    }
}
