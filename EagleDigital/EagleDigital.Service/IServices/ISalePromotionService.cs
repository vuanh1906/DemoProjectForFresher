using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EagleDigital.Common.Model.TenantTwo;

namespace EagleDigital.Service.IServices
{
    public  interface ISalePromotionService
    {
        IQueryable<SalePromotion> List();
        SalePromotion Details(int id);
        SalePromotion Insert(SalePromotion salePromotion);
        SalePromotion Update(SalePromotion salePromotion);
    }
}
