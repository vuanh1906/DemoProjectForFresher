using System.ComponentModel.DataAnnotations.Schema;

namespace EagleDigital.Common.Model.TenantTwo
{
    [Table("SalePromotion")]
    public class SalePromotion
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ProductId { get; set; }
        public virtual Product Product { get; set; }

    }
}
