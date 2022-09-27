using System.Web.Mvc;

namespace EagleDigital.Web.Areas.Admin
{
    public class AdminAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Admin";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Admin_default",
                "Admin/{controller}/{action}/{id}",
                new { controller = "DomainInfor", action = "Index", id = UrlParameter.Optional },
                new[] { "EagleDigital.Web.Areas.Admin.Controllers" }
            );

           // context.MapRoute(
           //    "Admin_defaults",
           //    "{controller}/{action}/{id}",
           //    new { controller = "DomainInfor", action = "Index", id = UrlParameter.Optional },
           //    new[] { "EagleDigital.Web.Areas.Admin.Controllers" }
           //);
        }
    }
}
