namespace Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class Comment
    {
        public int CommentId { get; set; }

        public string UserId { get; set; }

        public ApplicationUser User { get; set; }
        
        public string? CommentText { get; set; }

        public int Qualification { get; set; }

        public DateTime CommentDate { get; set; }

        public int MovieId { get; set; }

        public Movie? Movies { get; set; }

    }
}
