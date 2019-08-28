namespace MISA.Entities.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Customers",
                c => new
                    {
                        CustomerID = c.Guid(nullable: false, defaultValueSql:"newid()"),
                        CustomerCode = c.String(),
                        CustomerName = c.String(),
                        CustomerGroupID = c.Int(nullable: false),
                        Birthday = c.DateTime(nullable: false),
                        CompanyName = c.String(),
                        Gender = c.Int(nullable: false),
                        CompanyTaxCode = c.String(),
                        Address = c.String(),
                        Tel = c.String(),
                        Email = c.String(),
                        MemberShipCode = c.String(),
                        Amount = c.String(),
                        Description = c.String(),
                        Is5FoodMember = c.Boolean(nullable: false),
                        Inactive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.CustomerID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Customers");
        }
    }
}
