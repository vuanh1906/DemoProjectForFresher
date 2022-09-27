using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EagleDigital.Common.Model.TenantTwo;
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
        private readonly ISalePromotionService _salePromotionService;
        public readonly ITreeService _treeService;
        public readonly INewsService _newsService;

      

        public HomeController( 
            IProductService productService,
            ISalePromotionService salePromotionService,
            ITreeService treeService,
            INewsService newsService
            )
        {
            _productService = productService;
            _salePromotionService = salePromotionService;
            _treeService = treeService;
            _newsService = newsService;
        }

        public ActionResult Index()
        {

            var listProductCallProc = _productService.GetListProductProcedure(1, "Industries");
            var listSalePromotion = _salePromotionService.List().ToList();
            var listTree = _treeService.List().OrderBy(p=>p.key).ToList();

            var listProduct = _productService.List().OrderBy(p => p.Name)
                .Where(p => p.Id != 0
                && !p.Name.ToLower().Contains("$")).ToList();

          
            var model = new HomeModelView {ListTree= listTree, LisProduct = listProduct, ListProductByProcedure = listProductCallProc };
            return View(model);
        }

        [HttpPost]
        public JsonResult GetAllTree()
        {
            var listTree = _treeService.List().OrderBy(p => p.key).ToList();
            return Json(new { Status = "OK", Model = listTree }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetListNotify()
        {

            var listTree = _treeService.List().Where(p=>
                                                        (p.BirthDay!=null && ((DateTime)p.BirthDay).Month == DateTime.Now.Month)
                                                        ||
                                                        (p.DateDeath != null && p.BirthDay==null && ((DateTime)p.DateDeath).Month == DateTime.Now.Month)
                                                    ).ToList();
            var result = listTree.Select(p => new 
            {
                IsBirthDay= p.BirthDay != null && p.DateDeath==null,
                BirthDayString = p.BirthDay!=null ? string.Format("{0:dd-MM-yyyy}", p.BirthDay) : "",
                DateDeathString = p.DateDeath != null ? string.Format("{0:dd-MM-yyyy}", p.DateDeath) : "",
                Infor = p
            }).ToList();


            return Json(new { Status = "OK", Model = result }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetListNews()
        {
            var listNew = _newsService.List().ToList();
            return Json(new { Status = "OK", Model = listNew }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult SaveItem(Tree model)
        {

            if(model.Id == 0)
            {
                var result = _treeService.Insert(model);
            }
            else
            {
                var result = _treeService.Update(model);
            }

            return Json(new { Status = "OK"}, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult Delete(int id)
        {
            _treeService.Delete(id);
            return Json(new { Status = "OK" }, JsonRequestBehavior.AllowGet);
        }


        #region
        public ActionResult Dashboard()
        {
            return View();
        }
        #endregion

    }
}
