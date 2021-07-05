using ChicksApp.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ChicksAppNew.Domain
{
    public class GeneralExpenses
    {
        public int ID { get; set; }
        public string BandName { get; set; }
        public decimal Value { get; set; }
        public DateTime Date { get; set; }
        [ForeignKey("Ward")]
        public int? WardID { get; set; }


        public virtual Ward Ward { get; set; }
    }
}
