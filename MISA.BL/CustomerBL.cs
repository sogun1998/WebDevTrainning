using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.DL;
using MISA.Entities;
namespace MISA.BL
{
    public class CustomerBL
    {
        private CustomerDL _cusDL = new CustomerDL();

        /// <summary>
        /// Phân trang 
        /// </summary>
        /// Người tạo : NDAnh
        /// <param name="_pageIndex"></param>
        /// <param name="_pageSize"></param>
        /// <returns></returns>
        public IEnumerable<Customer> GetPagingData(int _pageIndex, int _pageSize)
        {
            var _employees = _cusDL.GetData().OrderBy(p => p.CustomerCode)
                .Skip((_pageIndex - 1) * _pageSize)
                .Take(_pageSize);
            return _employees;
        }
        /// <summary>
        /// Lấy tổng số bản ghi
        /// </summary>
        /// Người tạo : NDAnh
        /// <returns></returns>
        public int GetTotalRecord()
        {
            return _cusDL.GetData().Count();
        }
    }
}
