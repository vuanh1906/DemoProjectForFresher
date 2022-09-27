using System.Web.Mvc;

namespace EagleDigital.Web.Areas.SiteView
{
    public class SiteViewAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "SiteView";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "SiteView_default",
                "SiteView/{controller}/{action}/{id}",
                new { controller = "Home", action = "Index", id = UrlParameter.Optional },
                new[] { "EagleDigital.Web.Areas.SiteView.Controllers" }
            );
        }
    }
}
