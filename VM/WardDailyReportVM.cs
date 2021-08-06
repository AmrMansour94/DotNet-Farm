using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChicksAppNew.VM
{
    public class WardDailyReportVM
    {

        public int iD { get; set; }
        public int wardID { get; set; }
        public string wardName { get; set; }
        public int addedChicksNum { get; set; }
        public int deadChicksNum { get; set; }
        public decimal consumedFoodQuantityPerDay { get; set; }
        public decimal consumedWoodDustQuantityPerDay { get; set; }
        public DateTime insertionDate { get; set; }
        public decimal deadRatio { get; set; }
        public decimal conversionFactor { get; set; }
        public int age { get; set; }
        public decimal totalFoodQuantity { get; set; }
        public decimal totalWoodDust { get; set; }
        public int totalNumOfChicks { get; set; }
        public decimal totalFoodCost { get; set; }
        public decimal totalWoodDustCost { get; set; }
    }
}
