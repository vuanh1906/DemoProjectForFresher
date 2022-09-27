using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EagleDigital.Common.Model.TenantTwo;
using EagleDigital.CodeFirst.TenantTwo.Repositories;
using EagleDigital.Service.IServices;

namespace EagleDigital.Service.Services
{
    public class ProductService : IProductService
    {

        private readonly IEntityRepositoryNewTenant<Product> _productRepository;
        public ProductService(IEntityRepositoryNewTenant<Product> productRepository)
        {
            _productRepository = productRepository;
        }

        public IQueryable<Product> List()
        {
            var productList = _productRepository.GetAll().OrderBy(p => p.Name);
            return productList;
        }

        public Product Details(int id)
        {
            var productDetails = _productRepository.Get(id);
            return productDetails;
        }

        public Product Insert(Product product)
        {
            var productDetails = new Product();
            productDetails.Name = product.Name;
            productDetails.Content = product.Content;
            productDetails = _productRepository.InsertOnCommit(productDetails);
            _productRepository.CommitChanges();
            return productDetails;
        }

        public Product Update(Product product)
        {
            var productDetails = _productRepository.Get(product.Id);
            productDetails.Name = product.Name;
            productDetails.Content = product.Content;
            _productRepository.CommitChanges();
            return productDetails;
        }

        public List<Product> GetListProductProcedure(int id, string name)
        {

            return new List<Product>();

            //return (List<Product>)_productRepository.ExecWithStoreProcedure("Product_GetAll @Id,@Name",
            //        new SqlParameter("Id", SqlDbType.Int) { Value = id },
            //        new SqlParameter("Name", SqlDbType.NVarChar) { Value = name }
            //    );

            // return (List<Product>) _productRepository.ExecWithStoreProcedure(query, parameters);
            //var listProductCallProc = _productService.GetListProductProcedure("Product_GetAll @Id,@Name",
            //   new SqlParameter("Id", SqlDbType.Int) { Value = 1 },
            //   new SqlParameter("Name", SqlDbType.NVarChar) { Value = "Industries" }
            //   );

        }
    }
}
