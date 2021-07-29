using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChicksAppNew.Domain
{
    public class MedicineDetails
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string CompanyName { get; set; }
        public string Unit { get; set; }
        public decimal UnitCost { get; set; }
    }
}
