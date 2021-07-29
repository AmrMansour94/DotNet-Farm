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
        public DateTime ExpenseDate { get; set; }
        [ForeignKey("Employee")]
        public int? EmployeeID { get; set; }

        public virtual Employee Employee { get; set; }
    }
}
