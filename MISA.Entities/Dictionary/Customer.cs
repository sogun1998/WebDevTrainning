using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entities
{
    public class Customer
    {
        public Guid CustomerID { get; set; }


        public string CustomerCode { get; set; }//

        public string CustomerName { get; set; }//

        public int CustomerGroupID { get; set; }
        public DateTime Birthday { get; set; }
        public string CompanyName { get; set; }//
        public int Gender { get; set; }
        public string CompanyTaxCode { get; set; }
        public string Address { get; set; }
        public string Tel { get; set; }

        public string Email { get; set; }
        public string MemberShipCode { get; set; }
        public string Amount { get; set; }
        public string Description { get; set; }
        public bool Is5FoodMember { get; set; }
        public bool Inactive { get; set; }
    }
}
