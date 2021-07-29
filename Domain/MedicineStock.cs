using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ChicksAppNew.Domain
{
    public class MedicineStock
    {
        public int ID { get; set; }
        [ForeignKey("MedicineDetails")]
        public int MedicineID { get; set; }
        public decimal StockQuantity { get; set; }
        public decimal StockCurrentMedicineValue { get; set; }

        public virtual MedicineDetails MedicineDetails { get; set; }
    }
}
