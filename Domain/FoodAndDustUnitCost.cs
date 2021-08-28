using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChicksAppNew.Domain
{
    public class FoodAndDustUnitCost
    {
        [JsonProperty(PropertyName = "ID")]
        public int ID { get; set; }
        [JsonProperty(PropertyName = "FoodUnitCost")]
        public decimal FoodUnitCost { get; set; }
        [JsonProperty(PropertyName = "WoodDustUnitCost")]
        public decimal WoodDustUnitCost { get; set; }
    }
}
