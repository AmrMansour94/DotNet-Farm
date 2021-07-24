using Newtonsoft.Json;

namespace ChicksAppNew.VM
{
    public class UserVM
    {
        [JsonProperty(PropertyName = "ID")]
        public int ID { get; set; }
        [JsonProperty(PropertyName = "UserName")]

        public string UserName { get; set; }
    }
}
