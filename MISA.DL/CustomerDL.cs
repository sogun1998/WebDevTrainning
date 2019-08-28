using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DL
{
    public class CustomerDL
    {
        private MISAWDT03NDANHContext db = new MISAWDT03NDANHContext();
        /// <summary>
        /// Hàm lấy Data
        /// NGười tạo  NDAnh
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Customer> GetData()
        {
            return db.Customers;
        }

        /// <summary>
        /// Hàm thêm khách hàng
        /// Người tạo : NDANH
        /// </summary>
        /// <param name="customer"></param>
        public void AddCustomer(Customer customer)
        {
            customer.CustomerID = Guid.NewGuid();
            db.Customers.Add(customer);
            db.SaveChanges();
        }
        /// <summary>
        /// Hàm Sửa khách hàng
        /// Người tạo: NDANH
        /// </summary>
        /// <param name="_cus"></param>
        public void EditCus(Customer _cus)
        {
            var item = db.Customers.Where(p => p.CustomerID == _cus.CustomerID).FirstOrDefault();

            foreach (var property in typeof(Customer).GetProperties())
            {
                var propertyValue = property.GetValue(_cus);
                if (propertyValue != null)
                {
                    property.SetValue(item, propertyValue);
                }
            }
            // có khả năng ko có đủ dữ liệu đổ vào các trường
            db.SaveChanges();
        }
        /// <summary>
        /// Hàm xóa người dùng
        /// Người tạo : NDAnh
        /// </summary>
        /// <param name="customer"></param>
        public void DeleteCustomer(List<Guid> customer)
        {
            foreach (var id in customer)
            {
                var _customer = db.Customers.Where(p => p.CustomerID == id).FirstOrDefault();
                db.Customers.Remove(_customer);
            }
            db.SaveChanges();
        }
    }
}
