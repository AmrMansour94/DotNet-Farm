using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChicksAppNew.VM
{
    public class StockContentVM
    {
        public int TotalChicksNum { get; set; }
        public int CurrentChicksNum { get; set; }
        public decimal AvailableFoodQuantity { get; set; }
        public int AvailableWoodDust { get; set; }
        public int CurrentAge { get; set; }
    }
}
