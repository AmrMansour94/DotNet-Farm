using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChicksApp.VM
{
    public class KeyValuePairsVM
    {
        [JsonProperty(PropertyName = "ID")]
        public int ID { get; set; }
        [JsonProperty(PropertyName = "Name")]
        public string Name { get; set; }
    }
}
