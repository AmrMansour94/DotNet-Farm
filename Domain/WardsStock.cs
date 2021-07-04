using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ChicksApp.Domain
{
    public class WardsStock
    {
        public int ID { get; set; }
        [ForeignKey("Ward")]
        public int WardID { get; set; }
        public int InitialNumOfChicks { get; set; }
        public int DeadChicks { get; set; }
        public int CurrentNumOfChicks { get; set; }
        public decimal ConsumedFoodQuantity { get; set; }
        public decimal ConsumedWoodDust { get; set; }

        public virtual Ward Ward { get; set; }

    }
}
