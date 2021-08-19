using ChicksApp.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChicksAppNew.VM
{
    public class StockReportsVM
    {
        public List<GeneralStock> GeneralStock { get; set; }
        public List<StockInsertionOperation> InsertionOpsReport { get; set; }
    }
}
