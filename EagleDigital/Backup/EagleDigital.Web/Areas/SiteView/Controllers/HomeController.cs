using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EagleDigital.CodeFirst.TenantTwo.Models;
using EagleDigital.Service.IServices;
using EagleDigital.Service.Services;
using EagleDigital.Web.Areas.SiteView.Models;

namespace EagleDigital.Web.Areas.SiteView.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /SiteView/Home/
        private readonly IProductService _productService;
        private readonly ICategoryService _categoryService;
        private readonly IDomainService _domainService;
        private readonly IDomainInforService _domainInforService;
        private readonly ISalePromotionService _salePromotionService;
      

        public HomeController( IProductService productService,ICategoryService categoryService,
            IDomainService domainService,
            IDomainInforService domainInforService,
            ISalePromotionService salePromotionService
            )
        {
            _productService = productService;
            _domainInforService = domainInforService;
            _categoryService = categoryService;
            _domainService = domainService;
            _salePromotionService = salePromotionService;
        }

        public ActionResult Index()
        {

            var listProductCallProc = _productService.GetListProductProcedure(1, "Industries");
            var listSalePromotion = _salePromotionService.List().ToList();
            var listCategory = _categoryService.List().ToList();

            var listProduct = _productService.List().OrderBy(p=>p.Name)
                .Where(p=>p.Id!=0 
                && !p.Name.ToLower().Contains("$")).ToList();

            var listDomain = _domainService.List().ToList();
            var model = new HomeModelView { ListDomain = listDomain, ListCategory = listCategory , LisProduct = listProduct , ListProductByProcedure = listProductCallProc};
            ViewBag.ListCategory = listCategory;
            //if (HttpContext.Session != null) HttpContext.Session.Add("listProduct", listProduct);
            //if (HttpContext.Session != null) HttpContext.Session.Add("ListCategory", listCategory);
            return View(model);
        }

        public ActionResult DomainDetail(int id)
        {
            var listDomainInfor = _domainInforService.List().Where(p => p.DomainId == id).ToList();
            var model = new DomainInforModel();
            model.ListDomainInfors = listDomainInfor;
            return View(model);
        }

    }
}
