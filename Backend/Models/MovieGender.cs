using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class MovieGender
    {

        public string MovieId { get; set; }

        public string GenderId { get; set; }

        public Movie Movie { get; set; }

        public Gender Gender { get; set; }

    }
}
