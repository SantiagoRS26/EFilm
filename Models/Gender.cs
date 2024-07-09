namespace Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class Gender
    {
        public int GenderID { get; set; }

        public string? Name { get; set; }

        public ICollection<Movie>? Movies { get; set; }

    }
}
