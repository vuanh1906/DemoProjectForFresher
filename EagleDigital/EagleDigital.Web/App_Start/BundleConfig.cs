using System.Web;
using System.Web.Optimization;

namespace EagleDigital.Web
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-2.2.1.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));


            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site2.css"));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));


            bundles.Add(new ScriptBundle("~/CustomJs/bootstrap").Include(
                          "~/Scripts/Bootstrap/bootstrap.js"
                      ));

            bundles.Add(new StyleBundle("~/Content/CustomCss/bootstrap").Include(
                            "~/Content/bootstrap-theme.css",
                            "~/Content/bootstrap.css"
                       ));


            bundles.Add(new ScriptBundle("~/CustomJs/angularLibrary").Include(
                           "~/Scripts/Angular/Library/angular.js",
                           "~/Scripts/Angular/Library/angular-route.js",
                           "~/Scripts/Angular/Library/angular-cookies.min.js",
                           "~/Scripts/Angular/Library/ng-onload.min.js",
                           "~/Scripts/Angular/Library/angular-sanitize.min.js",
                           "~/Scripts/jquery.fancybox.pack.js",
                           "~/Scripts/GoJS/go.js"
                       ));


            bundles.Add(new ScriptBundle("~/CustomJs/angularSiteView").Include(


                        "~/Areas/SiteView/Angular/Module/Module.js",
                        "~/Areas/SiteView/Angular/Controller/ngTreeController.js",
                        "~/Areas/SiteView/Angular/Service/ngCommonService.js",
                        "~/Areas/SiteView/Angular/Service/ngTreeService.js"



                        //"~/Areas/SiteView/Angular/Module/Module.js",
                        //"~/Areas/SiteView/Angular/Controller/HomeController.js",
                        //"~/Areas/SiteView/Angular/Controller/OrderMainController.js",
                        //"~/Areas/SiteView/Angular/Controller/StartOverviewController.js",
                        //"~/Areas/SiteView/Angular/Controller/StartTermsController.js",
                        //"~/Areas/SiteView/Angular/Controller/ServiceProvideController.js",
                        //"~/Areas/SiteView/Angular/Controller/MemorialPackageItemsController.js",
                        //"~/Areas/SiteView/Angular/Controller/URNController.js",
                        //"~/Areas/SiteView/Angular/Controller/PickupRemainsController.js",


                        //"~/Areas/SiteView/Angular/Controller/BiographicalDataController.js",
                        //"~/Areas/SiteView/Angular/Controller/DecedantDataController.js",
                        //"~/Areas/SiteView/Angular/Controller/SurvivorDataController.js",
                        //"~/Areas/SiteView/Angular/Controller/MemorialServiceDataController.js",
                        //"~/Areas/SiteView/Angular/Controller/ThankYouController.js",
                        //"~/Areas/SiteView/Angular/Controller/CheckoutController.js",
                        //"~/Areas/SiteView/Angular/Controller/FinalStepsController.js",
                        //"~/Areas/SiteView/Angular/Controller/PickUpController.js",
                        //"~/Areas/SiteView/Angular/Controller/Burial/BurialOptionController.js",
                        //"~/Areas/SiteView/Angular/Controller/Burial/CasketPreferenceController.js",
                        //"~/Areas/SiteView/Angular/Controller/Burial/VaultSelectionController.js",
                        //"~/Areas/SiteView/Angular/Controller/Burial/BurialCemeterySetupController.js",
                        //"~/Areas/SiteView/Angular/Controller/Burial/BurialServiceProvidedController.js",
                        //"~/Areas/SiteView/Angular/Controller/Burial/BurialServiceDetailController.js",
                        //"~/Areas/SiteView/Angular/Controller/Burial/BurialServiceProvideController.js",
                        //"~/Areas/SiteView/Angular/Controller/Burial/BurialPackageController.js",

                        //"~/Areas/SiteView/Angular/Service/OrderMainService.js",
                        //"~/Areas/SiteView/Angular/Service/StartOverviewService.js",
                        //"~/Areas/SiteView/Angular/Service/StartTermsService.js",
                        //"~/Areas/SiteView/Angular/Service/ServiceProvideService.js",
                        //"~/Areas/SiteView/Angular/Service/MemorialPackageItemsService.js",
                        //"~/Areas/SiteView/Angular/Service/URNService.js",
                        //"~/Areas/SiteView/Angular/Service/PickupRemainsService.js",
                        //"~/Areas/SiteView/Angular/Service/BiographicalDataService.js",
                        //"~/Areas/SiteView/Angular/Service/DecedantDataService.js",
                        //"~/Areas/SiteView/Angular/Service/SurvivorDataService.js",
                        //"~/Areas/SiteView/Angular/Service/MemorialServiceDataService.js",
                        //"~/Areas/SiteView/Angular/Service/ThankYouService.js",
                        //"~/Areas/SiteView/Angular/Service/CheckoutService.js",
                        //"~/Areas/SiteView/Angular/Service/FinalStepsService.js",
                        //"~/Areas/SiteView/Angular/Service/PickUpService.js",
                        //"~/Areas/SiteView/Angular/Service/Burial/BurialOptionService.js",
                        //"~/Areas/SiteView/Angular/Service/Burial/CasketPreferenceService.js",
                        //"~/Areas/SiteView/Angular/Service/Burial/VaultSelectionService.js",
                        //"~/Areas/SiteView/Angular/Service/Burial/BurialCemeterySetupService.js",
                        //"~/Areas/SiteView/Angular/Service/Burial/BurialServiceProvidedService.js",
                        //"~/Areas/SiteView/Angular/Service/Burial/BurialServiceDetailService.js",
                        //"~/Areas/SiteView/Angular/Service/Burial/BurialServiceProvideService.js",
                        //"~/Areas/SiteView/Angular/Service/Burial/BurialPackageService.js"

                        ));


        }
    }
}