namespace Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class Movie
    {
        public string MovieId { get; set; }

        public string? Title { get; set; }
            
        public string? Description { get; set; }

        public string? Poster { get; set; }

        public DateTime? ReleaseDate { get; set; }

        public int? Duration { get; set; }

        public decimal? VoteAverage { get; set; }

        public int? VoteCount { get; set; }

        public long? Revenue { get; set; }

        public long? Budget { get; set; }

        public string? ImdbId { get; set; }

        public string? BackdropPath { get; set; }

        public string? Tagline { get; set; }

        public ICollection<Genre>? Genres { get; set; }

        public ICollection<Keyword>? Keywords { get; set; }

        public ICollection<Comment>? Comments { get; set; }

        public ICollection<MovieLanguage> MovieLanguages { get; set; }

        public ICollection<UserInteraction>? UserInteractions { get; set; }
    }
}
