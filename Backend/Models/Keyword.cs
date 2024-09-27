using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Keyword
    {
        public string KeywordId { get; set; }

        public string Name { get; set; }

        public bool? IsActivate { get; set; }

        public ICollection<Movie>? Movies { get; set; }
    }
}
