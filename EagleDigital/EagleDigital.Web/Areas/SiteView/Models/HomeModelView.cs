using EagleDigital.Common.Model.TenantTwo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;



namespace EagleDigital.Web.Areas.SiteView.Models
{
    public class HomeModelView
    {
        public List<Product>  LisProduct { get; set; }
        public List<Product>  ListProductByProcedure { get; set; } 
        public List<Tree> ListTree { get; set; }
    }
}