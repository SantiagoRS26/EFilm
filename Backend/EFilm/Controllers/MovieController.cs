namespace EFilm.Controllers
{
    using Business_Logic_Layer.Interfaces;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly IMovieService movieService;

        public MovieController(IMovieService movieService)
        {
            this.movieService = movieService;
        }

        [HttpGet]
        public async Task<IActionResult> SearchMoviesAsync(string query, int pageNumber = 1, int pageSize = 10)
        {
            var movies = await this.movieService.SearchMoviesAsync(query, pageNumber, pageSize);
            return this.Ok(movies);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMovieByIdAsync(string id)
        {
            var movie = await this.movieService.GetMovieByIdAsync(id);
            if (movie == null)
            {
                return this.NotFound();
            }

            return this.Ok(movie);
        }

        [HttpGet("filtered")]
        public async Task<IActionResult> GetFilteredMoviesAsync(string? genreId, string? keyword, DateTime? releaseDate, int pageNumber = 1, int pageSize = 10)
        {
            var movies = await this.movieService.GetFilteredMoviesAsync(genreId, keyword, releaseDate, pageNumber, pageSize);

            return this.Ok(movies);
        }
    }
}
