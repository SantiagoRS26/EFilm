namespace Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class Comment
    {
        public int CommentID { get; set; }

        public string? CommentText { get; set; }

        public int Qualification { get; set; }

        public DateTime CommentDate { get; set; }

        public int MovieID { get; set; }

        public Movie? Movies { get; set; }

    }
}
