namespace Business_Logic_Layer.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Text.Json;
    using System.Threading.Tasks;
    using Business_Logic_Layer.Interfaces;
    using Data_Access_Layer.Interfaces;
    using Data_Access_Layer.Repositories;
    using DTO;
    using Microsoft.EntityFrameworkCore;
    using Models;
    using Models.DTO;

    public class MovieService : IMovieService
    {
        private readonly HttpClient httpClient;

        private readonly IExternalMovieService externalMovieService;

        private readonly IMovieRepository movieRepository;

        private readonly IGenreService GenreService;

        public MovieService(HttpClient httpClient, IExternalMovieService externalMovieService, IMovieRepository movieRepository, IGenreService GenreService)
        {
            this.httpClient = httpClient;
            this.externalMovieService = externalMovieService;
            this.movieRepository = movieRepository;
            this.GenreService = GenreService;
        }

        public Task<Movie> CreateMovieAsync(Movie movie)
        {
            throw new NotImplementedException();
        }

        public Task<Movie> DeleteMovieAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Movie>> GetAllMoviesAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<PagedResultDTO<MovieBasicInfoDTO>> GetFilteredMoviesAsync(string genreId, string keyword, DateTime? releaseDate, int pageNumber, int pageSize)
        {
            var query = this.movieRepository.GetMoviesQuery();

            query = query
                        .Where(m => string.IsNullOrEmpty(genreId) || m.Genres.Any(g => g.GenreId == genreId))
                        .Where(m => string.IsNullOrEmpty(keyword) || m.Title.Contains(keyword) || m.Description.Contains(keyword))
                        .Where(m => !releaseDate.HasValue || m.ReleaseDate == releaseDate);

            var totalRecords = await query.CountAsync();

            var baseImageUrl = "https://image.tmdb.org/t/p/w500";

            var movies = await query
                .OrderByDescending(m => m.Revenue)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(m => new MovieBasicInfoDTO
                {
                    MovieId = m.MovieId,
                    Title = m.Title,
                    PosterUrl = string.IsNullOrEmpty(m.Poster) ? null : $"{baseImageUrl}{m.Poster}",
                    ReleaseDate = m.ReleaseDate,
                }).ToListAsync();

            return new PagedResultDTO<MovieBasicInfoDTO>
            {
                Items = movies,
                TotalRecords = totalRecords,
                PageNumber = pageNumber,
                PageSize = pageSize,
            };
        }

        public async Task<MovieDetailDTO> GetMovieByIdAsync(string id)
        {
            var movie = await this.movieRepository.GetByIdAsync(id);

            if (movie == null)
            {
                return null;
            }

            var baseImageUrl = "https://image.tmdb.org/t/p/w500";
            var backdropUrl = "https://image.tmdb.org/t/p/original";

            var movieDto = new MovieDetailDTO
            {
                MovieId = movie.MovieId,
                Title = movie.Title,
                Description = movie.Description,
                Poster = string.IsNullOrEmpty(movie.Poster) ? null : $"{baseImageUrl}{movie.Poster}",
                ReleaseDate = movie.ReleaseDate,
                Duration = movie.Duration,
                VoteAverage = movie.VoteAverage,
                VoteCount = movie.VoteCount,
                Revenue = movie.Revenue,
                Budget = movie.Budget,
                ImdbId = movie.ImdbId,
                BackdropPath = string.IsNullOrEmpty(movie.BackdropPath) ? null : $"{backdropUrl}{movie.BackdropPath}",
                Tagline = movie.Tagline,
                Genres = movie.Genres?.Select(g => new GenreDTO
                {
                    GenreId = g.GenreId,
                    Name = g.Name,
                }).ToList(),
                Keywords = movie.Keywords?.Select(k => new KeywordDTO
                {
                    KeywordId = k.KeywordId,
                    Name = k.Name,
                }).ToList(),
                Comments = movie.Comments?.Select(c => new CommentDTO
                {
                    CommentId = c.CommentId,
                    UserId = c.UserId,
                    CommentText = c.CommentText,
                    Qualification = c.Qualification,
                    CommentDate = c.CommentDate,
                }).ToList(),
                MovieLanguages = movie.MovieLanguages?.Select(ml => new MovieLanguageDTO
                {
                    MovieLanguageId = ml.MovieLanguageId,
                    Language = ml.Language,
                }).ToList(),
            };

            return movieDto;

            /* Movie movie = await this.movieRepository.GetByIdAsync(id);

            if (movie != null)
            {
                return movie;
            }

            ExternalMovieDTO externalMovie = await this.externalMovieService.GetMovieByIdAsync(id.ToString());

            if (externalMovie == null)
            {
                return null;
            }

            var newMovie = new Movie
            {
                MovieId = externalMovie.imdbID,
                Title = externalMovie.Title,
                Description = externalMovie.Plot,
                Director = externalMovie.Director,
                Poster = externalMovie.Poster,
                ReleaseDate = externalMovie.Year,
                Duration = externalMovie.Runtime,
            };

            var genres = externalMovie.Genre.Split(", ")
                                                .Select(g => g.Trim())
                                                .ToList();
            foreach (var genreName in genres)
            {
                var existingGenre = await this.GenreService.GetGenreByNameAsync(genreName);

                Genre Genre;

                if (existingGenre == null)
                {
                    Genre = existingGenre;
                }
                else
                {
                    Genre = new Genre
                    {
                        GenreId = Guid.NewGuid().ToString(),
                        Name = genreName,
                    };
                }

                newMovie.MovieGenres.Add(new MovieGenre
                {
                    Movie = newMovie,
                    Genre = Genre,
                });
            }

            return newMovie;
            */
        }

        public async Task<PagedResultDTO<MovieBasicInfoDTO>> SearchMoviesAsync(string searchTerm, int pageNumber, int pageSize)
        {
            if (searchTerm.Contains(" "))
            {
                searchTerm = "\"" + searchTerm + "\"";
            }

            var query = this.movieRepository.SearchMovies(searchTerm);

            var totalRecords = await query.CountAsync();

            var baseImageUrl = "https://image.tmdb.org/t/p/w500";

            var movies = await query
                .OrderByDescending(m => m.Revenue)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(m => new MovieBasicInfoDTO
                {
                    MovieId = m.MovieId,
                    Title = m.Title,
                    PosterUrl = string.IsNullOrEmpty(m.Poster) ? null : $"{baseImageUrl}{m.Poster}",
                    ReleaseDate = m.ReleaseDate,
                }).ToListAsync();

            return new PagedResultDTO<MovieBasicInfoDTO>
            {
                Items = movies,
                TotalRecords = totalRecords,
                PageNumber = pageNumber,
                PageSize = pageSize
            };
        }

        public Task<Movie> UpdateMovieAsync(Movie movie)
        {
            throw new NotImplementedException();
        }
    }
}
