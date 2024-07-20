namespace Models.DTO
{
    public class MovieSearchResponseDTO
    {
        public List<MovieSearchDTO> Search { get; set; }

        public string totalResults { get; set; }

        public string Response { get; set; }
    }
}
