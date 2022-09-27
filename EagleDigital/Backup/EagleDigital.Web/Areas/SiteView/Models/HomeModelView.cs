using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EagleDigital.CodeFirst.TenantOne.Models;
using EagleDigital.CodeFirst.TenantTwo.Models;

namespace EagleDigital.Web.Areas.SiteView.Models
{
    public class HomeModelView
    {
        public List<Domain>   ListDomain { get; set; }
        public List<Category> ListCategory { get; set; }
        public List<Product>  LisProduct { get; set; }
        public List<Product>  ListProductByProcedure { get; set; } 
    }
}