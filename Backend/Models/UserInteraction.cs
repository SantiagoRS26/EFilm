using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class UserInteraction
    {
        public string UserInteractionId { get; set; }

        public string UserId { get; set; }

        public ApplicationUser User { get; set; }

        public string MovieId { get; set; }

        public Movie Movie { get; set; }

        public string InteractionTypeId { get; set; }

        public InteractionType InteractionType { get; set; }

        public DateTime Timestamp { get; set; }

        public string? CommentId { get; set; }

        public Comment? Comment { get; set; }

    }
}
