﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class PagedResultDTO<T>
    {
        public List<T> Items { get; set; }

        public int TotalRecords { get; set; }

        public int PageNumber { get; set; }

        public int PageSize { get; set; }

        public int TotalPages => (int)Math.Ceiling((double)TotalRecords / PageSize);

    }
}
