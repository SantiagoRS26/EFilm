using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class CommentDTO
    {
        public string CommentId { get; set; }

        public string UserId { get; set; }

        public string? CommentText { get; set; }

        public int? Qualification { get; set; }

        public DateTime CommentDate { get; set; }
    }
}
