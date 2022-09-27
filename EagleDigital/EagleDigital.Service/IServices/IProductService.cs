using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EagleDigital.Common.Model.TenantTwo;

namespace EagleDigital.Service.IServices
{
    public interface IProductService
    {
        IQueryable<Product> List();
        Product Details(int id);
        Product Insert(Product product);
        Product Update(Product product);

        List<Product> GetListProductProcedure(int id,string name );

    }
}
