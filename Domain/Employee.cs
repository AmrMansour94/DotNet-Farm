using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChicksAppNew.Domain
{
    public class Employee
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public DateTime? EmploymentDate { get; set; }
        public DateTime? UnEmploymentDate { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsActive { get; set; }

    }
}
