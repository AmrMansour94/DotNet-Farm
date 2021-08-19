using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChicksAppNew.VM
{
    public class ExpensesReportVM
    {
        public int ID { get; set; }
        public string BandName { get; set; }
        public decimal Value { get; set; }
        public DateTime ExpenseDate { get; set; }
        public string EmpName { get; set; }
    }
}
