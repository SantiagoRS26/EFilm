using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class InteractionType
    {
        public string InteractionTypeId { get; set; }

        public string Name { get; set; }

        public ICollection<UserInteraction>? UserInteractions { get; set; }
    }
}
