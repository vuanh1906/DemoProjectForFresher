using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using EagleDigital.Common.Model.TenantTwo;

namespace EagleDigital.CodeFirst.TenantTwo
{
    public class NewTenantContext : DbContext, INewTenantContext
    {
        public NewTenantContext()
            : base("NewTenantContext")
        { }

        public DbSet<Product> Products { get; set; }
        public DbSet<SalePromotion> SalePromotions { get; set; }
        public DbSet<Tree> Trees { get; set; }
        public DbSet<News> News { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            modelBuilder.Entity<SalePromotion>()
                .HasRequired(c => c.Product)
                .WithMany(e => e.SalePromotions)
                .HasForeignKey(c => c.ProductId);

            modelBuilder.Entity<Tree>();
            modelBuilder.Entity<News>();

            modelBuilder.Entity<SalePromotion>().MapToStoredProcedures();
        }
    }
}
