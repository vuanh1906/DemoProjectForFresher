namespace EagleDigital.CodeFirst.TenantTwo.NewTenantContextMigrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.News",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        Content = c.String(),
                        CreateDate = c.DateTime(nullable: false),
                        IsDelete = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Product",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Content = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.SalePromotion",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        ProductId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Product", t => t.ProductId, cascadeDelete: true)
                .Index(t => t.ProductId);
            
            CreateTable(
                "dbo.Tree",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CurrentCode = c.Int(nullable: false),
                        ParentCode = c.Int(),
                        Level = c.Int(nullable: false),
                        Name = c.String(),
                        Gender = c.Int(nullable: false),
                        Address = c.String(),
                        Job = c.String(),
                        Phone = c.String(),
                        Image = c.String(),
                        BirthDay = c.DateTime(),
                        DateDeath = c.DateTime(),
                        Info = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateStoredProcedure(
                "dbo.SalePromotion_Insert",
                p => new
                    {
                        Name = p.String(),
                        ProductId = p.Int(),
                    },
                body:
                    @"INSERT [dbo].[SalePromotion]([Name], [ProductId])
                      VALUES (@Name, @ProductId)
                      
                      DECLARE @Id int
                      SELECT @Id = [Id]
                      FROM [dbo].[SalePromotion]
                      WHERE @@ROWCOUNT > 0 AND [Id] = scope_identity()
                      
                      SELECT t0.[Id]
                      FROM [dbo].[SalePromotion] AS t0
                      WHERE @@ROWCOUNT > 0 AND t0.[Id] = @Id"
            );
            
            CreateStoredProcedure(
                "dbo.SalePromotion_Update",
                p => new
                    {
                        Id = p.Int(),
                        Name = p.String(),
                        ProductId = p.Int(),
                    },
                body:
                    @"UPDATE [dbo].[SalePromotion]
                      SET [Name] = @Name, [ProductId] = @ProductId
                      WHERE ([Id] = @Id)"
            );
            
            CreateStoredProcedure(
                "dbo.SalePromotion_Delete",
                p => new
                    {
                        Id = p.Int(),
                    },
                body:
                    @"DELETE [dbo].[SalePromotion]
                      WHERE ([Id] = @Id)"
            );
            
        }
        
        public override void Down()
        {
            DropStoredProcedure("dbo.SalePromotion_Delete");
            DropStoredProcedure("dbo.SalePromotion_Update");
            DropStoredProcedure("dbo.SalePromotion_Insert");
            DropForeignKey("dbo.SalePromotion", "ProductId", "dbo.Product");
            DropIndex("dbo.SalePromotion", new[] { "ProductId" });
            DropTable("dbo.Tree");
            DropTable("dbo.SalePromotion");
            DropTable("dbo.Product");
            DropTable("dbo.News");
        }
    }
}
