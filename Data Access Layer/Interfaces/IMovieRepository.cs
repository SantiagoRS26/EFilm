﻿namespace Data_Access_Layer.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Models;

    public interface IMovieRepository : IGenericRepository<Movie>
    {
        Task<List<Movie>> SearchMoviesAsync(string searchTerm);
    }
}
