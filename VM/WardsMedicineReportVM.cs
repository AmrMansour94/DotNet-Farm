using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChicksAppNew.VM
{
    public class WardsMedicineReportVM
    {
        public int ID { get; set; }
        public string WardName { get; set; }
        public string MedicineName { get; set; }
        public DateTime ConsumptionDate { get; set; }
        public decimal Quantity { get; set; }
        public decimal TotalCost { get; set; }
    }
}
