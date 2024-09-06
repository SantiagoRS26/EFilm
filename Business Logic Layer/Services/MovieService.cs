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
    using Models;
    using Models.DTO;

    public class MovieService : IMovieService
    {
        private readonly HttpClient httpClient;

        private readonly IExternalMovieService externalMovieService;

        private readonly IMovieRepository movieRepository;

        private readonly IGenderService genderService;

        public MovieService(HttpClient httpClient, IExternalMovieService externalMovieService, IMovieRepository movieRepository, IGenderService genderService)
        {
            this.httpClient = httpClient;
            this.externalMovieService = externalMovieService;
            this.movieRepository = movieRepository;
            this.genderService = genderService;
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

        public async Task<Movie> GetMovieByIdAsync(string id)
        {
            Movie movie = await this.movieRepository.GetByIdAsync(id);

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
                var existingGender = await this.genderService.GetGenderByNameAsync(genreName);

                Gender gender;

                if (existingGender == null)
                {
                    gender = existingGender;
                }
                else
                {
                    gender = new Gender
                    {
                        GenderId = Guid.NewGuid().ToString(),
                        Name = genreName,
                    };
                }

                newMovie.MovieGenders.Add(new MovieGender
                {
                    Movie = newMovie,
                    Gender = gender,
                });
            }

            return newMovie;
        }


        public async Task<List<Movie>> SearchMoviesAsync(string searchTerm)
        {
            var movies = await this.movieRepository.SearchMoviesAsync(searchTerm);

            if (movies.Any())
            {
                return movies;
            }

            MovieSearchResponseDTO externalMoviesResponse = await this.externalMovieService.SearchMoviesAsync(searchTerm);

            if (externalMoviesResponse != null && externalMoviesResponse.Response == "True")
            {
                var externalMovies = externalMoviesResponse.Search.Select(externalMovie => new Movie
                {
                    MovieId = externalMovie.imdbID,
                    Title = externalMovie.Title,
                    ReleaseDate = externalMovie.Year,
                    Poster = externalMovie.Poster,
                }).ToList();

                movies.AddRange(externalMovies);
            }

            return movies;
        }

        public Task<Movie> UpdateMovieAsync(Movie movie)
        {
            throw new NotImplementedException();
        }
    }
}
