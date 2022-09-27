using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EagleDigital.Common.Model.TenantTwo
{

    [Table("Tree")]
    public class Tree
    {
        [Key]
        public int              Id              { get; set; }
        public int              key             { get; set; }
        public int?             Parent          { get; set; }
        public int              Level           { get; set; }
        public string           Name            { get; set; }
        public bool              Gender          { get; set; }
        public string           Address         { get; set; }
        public string           Job             { get; set; }
        public string           Phone           { get; set; }
        public string           Image           { get; set; }
        public DateTime?        BirthDay        { get; set; }
        public DateTime?        DateDeath       { get; set; }
        public string           Info            { get; set; }

    }
}
