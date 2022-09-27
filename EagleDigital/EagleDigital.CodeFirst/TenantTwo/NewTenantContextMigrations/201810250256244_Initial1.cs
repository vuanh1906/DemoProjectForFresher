namespace EagleDigital.CodeFirst.TenantTwo.NewTenantContextMigrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Tree", "key", c => c.Int(nullable: false));
            AddColumn("dbo.Tree", "Parent", c => c.Int());
            AlterColumn("dbo.Tree", "Gender", c => c.Boolean(nullable: false));
            DropColumn("dbo.Tree", "CurrentCode");
            DropColumn("dbo.Tree", "ParentCode");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Tree", "ParentCode", c => c.Int());
            AddColumn("dbo.Tree", "CurrentCode", c => c.Int(nullable: false));
            AlterColumn("dbo.Tree", "Gender", c => c.Int(nullable: false));
            DropColumn("dbo.Tree", "Parent");
            DropColumn("dbo.Tree", "key");
        }
    }
}
