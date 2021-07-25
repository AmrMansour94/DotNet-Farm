using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChicksAppNew.VM
{
    public class WardAddNewQuantitiesVM
    {
        public int wardID { get; set; }
        public int addedChicksNum { get; set; }
        public decimal addedFoodQuantity { get; set; }
        public decimal addedWoodDustQuantity { get; set; }
        public int deadChicksNum { get; set; }
        public int avgBirdWeight { get; set; }
    }
}
