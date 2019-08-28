﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entities
{
    /// <summary>
    /// Kết quả đầu ra 
    /// </summary>
    public class AjaxResult
    {
        public object Data { get; set; }
        public bool Success { get; set; }
        public string Message { get; set; }
        public int TotalRecord { get; set; }

        public AjaxResult()
        {
            Success = true;
        }
    }
}
