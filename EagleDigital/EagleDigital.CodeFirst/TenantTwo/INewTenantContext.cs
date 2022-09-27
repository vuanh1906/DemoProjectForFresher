using System.Data.Entity;
using EagleDigital.Common.Model.TenantTwo;

namespace EagleDigital.CodeFirst.TenantTwo
{
    public interface INewTenantContext
    {
        DbSet<Product> Products { get; set; }
        DbSet<SalePromotion> SalePromotions { get; set; }


        DbSet<Tree> Trees { get; set; }
        DbSet<News> News { get; set; }

        int SaveChanges();
        DbSet<T> Set<T>() where T : class;
     
    }
}
