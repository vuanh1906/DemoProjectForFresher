﻿using EagleDigital.CodeFirst.TenantTwo;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EagleDigital.Common.Model.TenantTwo;

namespace EagleDigital.CodeFirst.DataCommon
{
    public class InsertDataCommon : DropCreateDatabaseIfModelChanges<NewTenantContext>
    {
        protected override void Seed(NewTenantContext context)
        {
            var products = new List<Product>
            {
                    new Product
                    {
                       Id = 1,
                       Name = "Industries",
                       Content = "Industries"
                    },
                    new Product
                    {
                       Id = 2,
                       Name = "Services",
                       Content = "Services"
                    },
                    new Product
                    {
                       Id = 3,
                       Name = "Product",
                       Content = "Product"
                    }
            };

            
            context.Products.AddOrUpdate(products.ToArray());

            context.SaveChanges();

            //var subCategorys = new List<SubCategory>
            //{
            //    new SubCategory()
            //        {
            //            Id = 1,
            //            CategoryId = 1,
            //            Name = "Product Categories",
            //            Description = "Product Categories"
            //        }
            //};

            //context.SubCategories.AddOrUpdate(subCategorys.ToArray());
            //context.SaveChanges();


            //var domains = new List<Domain>
            //{
            //       new Domain()
            //        {
            //            Id = 1,
            //            SubCategoryId = 1,
            //            Name = "Banking",
            //            Description = "Banking"
            //        },
            //        new Domain()
            //        {
            //            Id = 2,
            //            SubCategoryId = 1,
            //            Name = "Education",
            //            Description = "Education"
            //        },
            //        new Domain()
            //        {
            //            Id = 3,
            //            SubCategoryId = 1,
            //            Name = "Management",
            //            Description = "Management"
            //        },
            //        new Domain()
            //        {
            //            Id = 4,
            //            SubCategoryId = 1,
            //            Name = "Business",
            //            Description = "Business"
            //        },
            //        new Domain()
            //        {
            //            Id = 5,
            //            SubCategoryId = 1,
            //            Name = "Advertising",
            //            Description = "Advertising"
            //        },
            //        new Domain()
            //        {
            //            Id = 6,
            //            SubCategoryId = 1,
            //            Name = "Transfer",
            //            Description = "Transfer"
            //        },
            //        new Domain()
            //        {
            //            Id = 7,
            //            SubCategoryId = 1,
            //            Name = "Computing",
            //            Description = "Computing"
            //        },
            //};

            //context.Domains.AddOrUpdate(domains.ToArray());
            //context.SaveChanges();

            //var tabNames = new List<TabName>
            // {
            //        new TabName()
            //        {
            //            Id = 1,
            //            Name = "Tab1"
            //        },
            //        new TabName()
            //        {
            //            Id = 2,
            //            Name = "Tab2"
            //        }
            // };
            //context.TabNames.AddOrUpdate(tabNames.ToArray());
            //context.SaveChanges();

            //var contentDetails =
            //    "<div id=\"rs_digital_storage\">\r\n    <script language=\"JavaScript\" src=\"/Scripts/BrightcoveExperiences.js\" type=\"text/javascript\" space=\"preserve\"> </script>\r\n    <div class=\"hpe_overlay video_bc\" id=\"overlay_mp4_video\">\r\n        <div class=\"video_wrapper\">\r\n            <!-- Begin of Brightcove Player -->\r\n            <object type=\"application/x-shockwave-flash\" data=\"http://c.brightcove.com/services/viewer/federated_f9?&amp;width=640&amp;height=360&amp;flashID=myExperience2516054781001&amp;htmlFallback=true&amp;bgcolor=%23FFFFFF&amp;playerID=1377059119001&amp;playerKey=AQ~~%2CAAABAeI3VIE~%2CN0OfmZCPaxh-U75tF8pHH0iLtpzUxRz-&amp;isVid=true&amp;isUI=true&amp;dynamicStreaming=true&amp;%40videoPlayer=2516054781001&amp;autoStart=&amp;debuggerID=&amp;startTime=1442027587911\" id=\"myExperience2516054781001\" width=\"640\" height=\"360\" class=\"BrightcoveExperience\" seamlesstabbing=\"undefined\">\r\n                <param name=\"allowScriptAccess\" value=\"always\">\r\n                <param name=\"allowFullScreen\" value=\"true\">\r\n                <param name=\"seamlessTabbing\" value=\"false\">\r\n                <param name=\"swliveconnect\" value=\"true\">\r\n                <param name=\"wmode\" value=\"window\">\r\n                <param name=\"quality\" value=\"high\">\r\n                <param name=\"bgcolor\" value=\"#FFFFFF\">\r\n            </object>\r\n            <!-- End of Brightcove Player -->\r\n        </div>\r\n        <a class=\"hpe_overlay_cls\" href=\"javascript:void(0);\" shape=\"rect\" style=\"text-decoration: none;\">&nbsp;</a></div>\r\n    <div class=\"hpe_overlay video_bc\" id=\"overlay_mp9_video\">\r\n        <div class=\"video_wrapper\">\r\n            <!-- Begin of Brightcove Player -->\r\n            <object type=\"application/x-shockwave-flash\" data=\"http://c.brightcove.com/services/viewer/federated_f9?&amp;width=640&amp;height=360&amp;flashID=myExperience2516054781001&amp;htmlFallback=true&amp;bgcolor=%23FFFFFF&amp;playerID=1377059119001&amp;playerKey=AQ~~%2CAAABAeI3VIE~%2CN0OfmZCPaxh-U75tF8pHH0iLtpzUxRz-&amp;isVid=true&amp;isUI=true&amp;dynamicStreaming=true&amp;%40videoPlayer=2516054781001&amp;autoStart=&amp;debuggerID=&amp;startTime=1442027587912\" id=\"myExperience2516054781001\" width=\"640\" height=\"360\" class=\"BrightcoveExperience\" seamlesstabbing=\"undefined\">\r\n                <param name=\"allowScriptAccess\" value=\"always\">\r\n                <param name=\"allowFullScreen\" value=\"true\">\r\n                <param name=\"seamlessTabbing\" value=\"false\">\r\n                <param name=\"swliveconnect\" value=\"true\">\r\n                <param name=\"wmode\" value=\"window\">\r\n                <param name=\"quality\" value=\"high\">\r\n                <param name=\"bgcolor\" value=\"#FFFFFF\">\r\n            </object>\r\n            <!-- End of Brightcove Player -->\r\n        </div>\r\n        <a class=\"hpe_overlay_cls\" href=\"javascript:void(0);\" shape=\"rect\" style=\"text-decoration: none;\">&nbsp;</a></div>\r\n    <script type=\"text/javascript\" space=\"preserve\">                        brightcove.createExperiences();</script>\r\n    <div class=\"pop_drk\"></div>\r\n    <!-- END VIDEOS -->\r\n    <!-- start content integration -->\r\n    <div class=\"breakout_recenter clearfix\">\r\n        <div class=\"hp_recommends\"><strong xmlns=\"\">Mick recommends Windows.</strong></div>\r\n        <div class=\"clearall\"></div>\r\n    </div>\r\n    <div class=\"split_container\">\r\n        <h2><span class=\"f31 str\">Capture customer attention and create an enhanced in-store experience</span></h2>\r\n        <p><span class=\"final\">Go big or go home. You’ve got to be bold and memorable for your brand to stand out from the crowd. Stunning HP Digital Signage and interactive solutions enable you to engage customers, personalize the experience and increase loyalty.</span></p>\r\n    </div>\r\n    <div class=\"split_container interactive_signage_display hairline_bottom\">\r\n        <div class=\"split_50 interactive_signage_display_content clearfix\">\r\n            <div class=\"left\">\r\n                <h2 class=\"m30\">Performance Digital Signage Displays</h2>\r\n                <p>See the difference on a dynamic, touch or non-touch 42 or 47-inch diagonal digital signage display. These displays include factory-integrated multi-touch, touch screens with advanced IR technology for accurate touch recognition and support of numerous gestures with no “ghosting”. They are plug and play and Windows® HID compliant for quick and easy installation.</p>\r\n                <p><span class=\"str\">Features</span></p>\r\n                <ul class=\"bulleted_list_outside\">\r\n                    <li xmlns=\"\">Video-over-Ethernet input </li>\r\n                    <li>Embedded USB Media Sign Player</li>\r\n                    <li>Designed for 24/7 play</li>\r\n                    <li>Local or remote management</li>\r\n                </ul>\r\n                <div class=\"button_set\"><a class=\"button inline primary\" href=\"\" rel=\"Learn more\" shape=\"rect\"><span class=\"btn_label\">Learn more</span></a></div>\r\n            </div>\r\n            <div class=\"right\">\r\n                <div class=\"product_image\">\r\n                    <img xmlns=\"\" alt=\"Performance Digital Signage Displays\" src=\"/Content/Image/performance-hero_v3_tcm_245_1607399.jpg\"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";


            //var domainInfors = new List<DomainInfor>
            //{
            //        new DomainInfor()
            //        {
            //            Id = 1,
            //            DomainId = 1,
            //            TabNameId = 1,
            //            Content = contentDetails
            //        },
            //        new DomainInfor()
            //        {
            //            Id = 2,
            //            DomainId = 2,
            //            TabNameId = 1,
            //            Content = contentDetails
            //        },
            //        new DomainInfor()
            //        {
            //            Id = 3,
            //            DomainId = 3,
            //            TabNameId = 1,
            //            Content = contentDetails
            //        },
            //        new DomainInfor()
            //        {
            //            Id = 4,
            //            DomainId = 4,
            //            TabNameId = 1,
            //            Content = contentDetails
            //        },
            //        new DomainInfor()
            //        {
            //            Id = 5,
            //            DomainId = 5,
            //            TabNameId = 1,
            //            Content = contentDetails
            //        },
            //        new DomainInfor()
            //        {
            //            Id = 6,
            //            DomainId = 6,
            //            TabNameId = 1,
            //            Content = contentDetails
            //        },
            //        new DomainInfor()
            //        {
            //            Id = 7,
            //            DomainId = 7,
            //            TabNameId = 1,
            //            Content = contentDetails
            //        },
            //        new DomainInfor()
            //        {
            //            Id = 8,
            //            DomainId = 1,
            //            TabNameId = 1,
            //            Content = contentDetails
            //        }
            //};

            //context.DomainInfors.AddOrUpdate(domainInfors.ToArray());
            //context.SaveChanges();
        }
    }
}
