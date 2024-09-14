using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class RefreshToken
    {
        public int Id { get; set; }

        public string Token { get; set; }

        public string UserId { get; set; }

        public DateTime Expires { get; set; }

        public bool isExpired => DateTime.UtcNow >= Expires;

        public DateTime Created { get; set; }

        public DateTime? Revoked { get; set; }

        public bool IsActive => Revoked == null && !isExpired;

        public virtual ApplicationUser User { get; set; }
    }
}
