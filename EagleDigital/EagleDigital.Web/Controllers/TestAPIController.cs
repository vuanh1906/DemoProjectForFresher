using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;
using EagleDigital.Common.Model.TenantTwo;
using EagleDigital.Service.IServices;

namespace EagleDigital.Web.Controllers
{
    [System.Web.Http.RoutePrefix("api/TestAPI")]
    public class TestAPIController : ApiController
    {
        private readonly IProductService _productService;


        public TestAPIController(IProductService productService)
        {
            this._productService = productService;
        }

        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("~/api/TestAPI/getlistproducts")]
        public HttpResponseMessage GetListProducts()
        {
            try
            {
                // IProductService _productService = DIFactoryDesigntime.GetInstance<IProductService>();
                var listProduct = _productService.List().OrderBy(p => p.Name)
                   .Where(p => p.Id != 0
                   && !p.Name.ToLower().Contains("$")).ToList();

                var returnValue = listProduct.Select(p => new Product()
                {
                    //SalePromotions = p.SalePromotions,
                    Content = p.Content,
                    Id = p.Id,
                    Name = p.Name
                }).ToList();
                //return returnValue;

                var json = GlobalConfiguration.Configuration.Formatters.JsonFormatter;


                // return Json(new { Data = listProduct });
                return Request.CreateResponse(HttpStatusCode.OK, returnValue, json);

            }
            catch (Exception ex)
            {

                throw;
            }




            //[System.Web.Http.HttpGet]
            //[Route("~/api/TestAPI/getlistproducts")]
            //public async Task<IList<Product>> GetListProducts()
            //{
            //    try
            //    {
            //        // IProductService _productService = DIFactoryDesigntime.GetInstance<IProductService>();
            //        var listProduct = _productService.List().OrderBy(p => p.Name)
            //           .Where(p => p.Id != 0
            //           && !p.Name.ToLower().Contains("$")).ToList();

            //        var returnValue = listProduct.Select(p => new Product()
            //        {
            //            SalePromotions = p.SalePromotions,
            //            Content = p.Content,
            //            Id = p.Id,
            //            Name = p.Name
            //        }).ToList();
            //        return returnValue;

            //        // return  Json(new {Data= listProduct }) ;
            //        //return Request.CreateResponse(HttpStatusCode.OK, returnValue);

            //    }
            //    catch (Exception ex)
            //    {

            //        throw;
            //    }

        }
    }
}
