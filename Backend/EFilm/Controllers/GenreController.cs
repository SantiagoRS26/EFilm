using Business_Logic_Layer.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EFilm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenreController : ControllerBase
    {
        private readonly IGenreService genreService;

        public GenreController(IGenreService genreService)
        {
            this.genreService = genreService;
        }

        [HttpGet]
        public async Task<IActionResult> GetGenresAsync()
        {
            var genres = await this.genreService.GetAllGenresAsync();
            return this.Ok(genres);
        }

        [HttpGet("paged")]
        public async Task<IActionResult> GetPagedGenresAsync(int pageNumber = 1, int pageSize = 10)
        {
            var genres = await this.genreService.GetPagedGenresAsync(pageNumber, pageSize);
            return this.Ok(genres);
        }

        /*
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGenreByIdAsync(string id)
        {
            var genre = await this.genreService.GetGenreByIdAsync(id);
            if (genre == null)
            {
                return this.NotFound();
            }

            return this.Ok(genre);
        }
        */
    }
}
