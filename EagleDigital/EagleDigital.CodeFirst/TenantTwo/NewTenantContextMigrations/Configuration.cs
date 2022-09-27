using System.Collections.Generic;
using EagleDigital.Common.Model.TenantTwo;

namespace EagleDigital.CodeFirst.TenantTwo.NewTenantContextMigrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<EagleDigital.CodeFirst.TenantTwo.NewTenantContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            MigrationsDirectory = @"TenantTwo\NewTenantContextMigrations";
        }

        protected override void Seed(EagleDigital.CodeFirst.TenantTwo.NewTenantContext context)
        {
            var products = new List<Product>
            { 
                    new Product
                    {
                       Id = 1,
                       Name = "Industries",
                       Content = "Industries"
                    },
                    new Product
                    {
                       Id = 2,
                       Name = "Industries 2",
                       Content = "Industries 2"
                    },
                    new Product
                    {
                       Id = 3,
                       Name = "Industries 3",
                       Content = "Industries 3"
                    }
            };
            context.Products.AddOrUpdate(products.ToArray());
            context.SaveChanges();

            var salePromotion = new List<SalePromotion>
            {
                new SalePromotion()
                    {
                        Id = 1,
                        ProductId = 1,
                        Name = "SalePromotion",
                    },
                     new SalePromotion()
                    {
                        Id = 2,
                        ProductId = 1,
                        Name = "SalePromotion 2",
                    }
            };

            context.SalePromotions.AddOrUpdate(salePromotion.ToArray());
            context.SaveChanges();
        }
    }
}
