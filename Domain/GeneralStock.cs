using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChicksApp.Domain
{
    public class GeneralStock
    {
        public int ID { get; set; }
        public int TotalInitialChicksNum { get; set; }
        public int TotalDeadChicksNum { get; set; }
        public int TotalCurrentChicksNum { get; set; }
        public decimal TotalFoodQuantity { get; set; }
        public decimal CurrentFoodQuantity { get; set; }
        public decimal TotalWoodDustQuantity { get; set; }
        public decimal CurrentWoodDustQuantity { get; set; }
        public int AgeInDays { get; set; }
    }
}
