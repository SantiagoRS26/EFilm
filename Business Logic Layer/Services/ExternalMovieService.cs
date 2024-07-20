namespace Business_Logic_Layer.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Text.Json;
    using System.Threading.Tasks;
    using Business_Logic_Layer.Interfaces;
    using Models.DTO;

    public class ExternalMovieService : IExternalMovieService
    {
        private readonly HttpClient httpClient;

        public ExternalMovieService(HttpClient httpClient)
        {
            this.httpClient = httpClient;
        }

        public async Task<ExternalMovieDTO?> GetMovieByIdAsync(string id)
        {
            var response = await this.httpClient.GetAsync($"http://www.omdbapi.com/?apikey=1850a55a&i={id}");

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception("Error while fetching movie");
            }

            var jsonString = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<ExternalMovieDTO>(jsonString);
        }

        public async Task<MovieSearchResponseDTO?> SearchMoviesAsync(string query)
        {
            var response = await this.httpClient.GetAsync($"http://www.omdbapi.com/?apikey=1850a55a&s={query}");

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception("Error while fetching movies");
            }

            var jsonString = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<MovieSearchResponseDTO>(jsonString);
        }
    }
}
