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

        public string? Director { get; set; }   

        public string? Poster { get; set; }

        public string ReleaseDate { get; set; }

        public string? Duration { get; set; }

        public string  GenderId { get; set; }

        public Gender? Gender { get; set; }

        public ICollection<Comment>? Comments { get; set; }

    }
}
