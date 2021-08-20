using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChicksAppNew.VM
{
    public class MedicineStockReportVM
    {
        public int ID { get; set; }
        public int MedicineID { get; set; }
        public string MedicineName { get; set; }
        public decimal UnitCost { get; set; }
        public string Unit { get; set; }
        public decimal InitialStockQuantity { get; set; }
        public decimal CurrentStockQuantity { get; set; }
        public decimal ConsumedQuantity { get; set; }
        public decimal StockCurrentMedicineValue { get; set; }
    }
}
