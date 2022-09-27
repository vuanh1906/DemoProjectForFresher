using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EagleDigital.CodeFirst.TenantOne.Models;
using EagleDigital.Service.IServices;
using EagleDigital.Service.Services;
using EagleDigital.Web.Areas.Admin.Models;

namespace EagleDigital.Web.Areas.Admin.Controllers
{
    public class DomainInforController : Controller
    {
        //
        // GET: /Admin/DomainInfor/
        private readonly IDomainInforService _domainInforService;
        private readonly IDomainService _domainService;
        private readonly ITabNameService _tabNameService;

        public DomainInforController(IDomainInforService domainInforService
                            , IDomainService domainService
                            , ITabNameService tabNameService)
        {
            _domainInforService = domainInforService;
            _domainService = domainService;
            _tabNameService = tabNameService;
        }

        public ActionResult Index()
        {
            return View();
        }

       // [HttpGet]
        public ActionResult Create()
        {
          //  return Json(new {Status = "OK", Msg = "ABC"}, JsonRequestBehavior.AllowGet);
            return View();
        }


        [HttpPost]
        [ValidateInput(false)]
        public JsonResult Create(DomainInforModel model )
        {
            var modelInsert = new DomainInfor()
                                  {
                                      DomainId = model.DomainId,
                                      TabNameId = model.TabNameId,
                                      Content = model.Content
                                  };
         modelInsert=_domainInforService.Insert(modelInsert);

            return Json(new {Id = modelInsert.Id}, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int id)
        {
          _domainInforService.Delete(id);
          return Json(new {Status="OK", Id = id }, JsonRequestBehavior.AllowGet);
        }

     //   [HttpGet]
        public ActionResult Update(int id)
        {
            ViewBag.Id = id;
            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        public JsonResult Update(DomainInforModel model)
        {
            var modelUpdate = new DomainInfor()
            {
                Id = model.Id,
                DomainId = model.DomainId,
                TabNameId = model.TabNameId,
                Content = model.Content
            };
            modelUpdate = _domainInforService.Update(modelUpdate);
            return Json(new {Id = modelUpdate.Id}, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetModelForUpdate(int id)
        {
            var model = _domainInforService.Details(id);
            var listDomail = _domainService.List().Select(p => new { p.Id, p.Name });
            var listTabName = _tabNameService.List().Select(p => new { p.Id, p.Name });
            return Json(new { DomainList = listDomail.ToList(), TabNameList = listTabName.ToList(), Model = new {model.Content,model.TabNameId,model.DomainId} },
                        JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetListCategory()
        {
            var listDomain = _domainInforService.List();

            return Json(new
                            {
                               data = listDomain.Select(p=>new        {
                                                                    p.Id,
                                                                    p.Content,
                                                                    Domain=p.Domain.Name,
                                                                    TabName=p.TabName.Name
                                                                })
                            },JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetModelForCreate()
        {
            var listDomail = _domainService.List().Select(p=>new {p.Id,p.Name});
            var listTabName = _tabNameService.List().Select(p=>new {p.Id,p.Name});
            return Json(new {DomainList = listDomail.ToList(), TabNameList = listTabName.ToList()},
                        JsonRequestBehavior.AllowGet);
        }




    }
}
