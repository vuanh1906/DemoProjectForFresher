using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Autofac;
using Autofac.Integration.Mvc;
//using EagleDigital.DbFirst;
//using EagleDigital.DbFirst.Model;
//using EagleDigital.DbFirst.Repositories;
using EagleDigital.CodeFirst;
using EagleDigital.CodeFirst.TenantOne;
using EagleDigital.CodeFirst.TenantOne.Models;
using EagleDigital.CodeFirst.TenantOne.Repositories;
using EagleDigital.CodeFirst.TenantTwo;
using EagleDigital.CodeFirst.TenantTwo.Models;
using EagleDigital.CodeFirst.TenantTwo.Repositories;
using EagleDigital.Service.IServices;
using EagleDigital.Service.Services;

namespace EagleDigital.Web
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            System.Data.Entity.Database.SetInitializer(new EagleDigital.CodeFirst.DataCommon.InsertDataCommon());

            RegisterDbFirstComponents();
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        private void RegisterDbFirstComponents()
        {

            var builder = new ContainerBuilder();
            builder.RegisterControllers(Assembly.GetExecutingAssembly());

            builder.RegisterType<EntityRepository<Category>>().As<IEntityRepository<Category>>();
            builder.RegisterType<CategoryService>().As<ICategoryService>();

            builder.RegisterType<EntityRepository<Domain>>().As<IEntityRepository<Domain>>();
            builder.RegisterType<DomainService>().As<IDomainService>();

            builder.RegisterType<EntityRepository<DomainInfor>>().As<IEntityRepository<DomainInfor>>();
            builder.RegisterType<DomainInforService>().As<IDomainInforService>();

            builder.RegisterType<EntityRepository<TabName>>().As<IEntityRepository<TabName>>();
            builder.RegisterType<TabNameService>().As<ITabNameService>();

            builder.Register(c => new MickContext()).As<IMickContext>();

            builder.RegisterType<EntityRepositoryNewTenant<Product>>().As<IEntityRepositoryNewTenant<Product>>();
            builder.RegisterType<ProductService>().As<IProductService>();

            builder.RegisterType<EntityRepositoryNewTenant<SalePromotion>>().As<IEntityRepositoryNewTenant<SalePromotion>>();
            builder.RegisterType<SalePromotionService>().As<ISalePromotionService>();

            builder.Register(c => new NewTenantContext()).As<INewTenantContext>();
            var container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
        }

    }
}