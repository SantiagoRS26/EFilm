using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class MovieLanguage
    {
        public string MovieLanguageId { get; set; }

        public string Language { get; set; }

        public ICollection<Movie> Movies { get; set; }
    }
}
