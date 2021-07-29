using ChicksApp.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ChicksAppNew.Domain
{
    public class WardsMedicineConsumption
    {
        public int ID { get; set; }
        [ForeignKey("Ward")]
        public int WardID { get; set; }
        [ForeignKey("MedicineDetails")]
        public int MedicineID { get; set; }
        public DateTime ConsumptionDate { get; set; }
        public decimal Quantity { get; set; }
        public decimal TotalCost { get; set; }

        public virtual MedicineDetails MedicineDetails { get; set; }
        public virtual Ward Ward { get; set; }

    }
}
