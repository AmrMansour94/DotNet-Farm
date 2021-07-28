using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ChicksApp.Domain
{
    public class WardInsertionOperation
    {
        public int ID { get; set; }
        [ForeignKey("Ward")]
        public int WardID { get; set; }
        public int AddedChicksNum { get; set; }
        public int DeadChicksNum { get; set; }
        public decimal ConsumedFoodQuantityPerDay { get; set; }
        public decimal ConsumedWoodDustQuantityPerDay { get; set; }
        public DateTime InsertionDate { get; set; }
        public decimal DeadRatio { get; set; }
        public decimal ConversionFactor { get; set; }
        public int Age { get; set; }
        public decimal TotalFoodQuantity { get; set; }
        public decimal TotalWoodDust { get; set; }
        public int TotalNumOfChicks { get; set; }
        public virtual Ward Ward { get; set; }

    }
}
