﻿namespace Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class Movie
    {
        public int MovieID { get; set; }

        public string? Title { get; set; }

        public string? Description { get; set; }

        public string? Director { get; set; }

        public DateTime ReleaseDate { get; set; }
        public int Duration { get; set; }

        public int  GenderID { get; set; }

        public Gender? Gender { get; set; }

        public ICollection<Comment>? Comments { get; set; }

    }
}
