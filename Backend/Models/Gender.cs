namespace Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class Gender
    {
        public string GenderId { get; set; }

        public string? Name { get; set; }

        public ICollection<MovieGender> MovieGenders { get; set; }

    }
}
