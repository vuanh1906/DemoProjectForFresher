using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EagleDigital.Web.Areas.Admin.Models
{
    public class DomainInforModel
    {
       
        public int Id { get; set; }
        public int DomainId { get; set; }
        public int TabNameId { get; set; }
        public string Content { get; set; }

    }
}