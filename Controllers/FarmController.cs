using ChicksApp.Context;
using ChicksAppNew.Domain;
using ChicksAppNew.VM;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChicksAppNew.Controllers
{
    public class FarmController : ControllerBase
    {
        private readonly DataContext _context;

        public FarmController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public string ResetFarmCycle()
        {
            var stockInsertOps = _context.StockInsertionOperations.ToList();
            _context.RemoveRange(stockInsertOps);
            var wardsInsert = _context.WardInsertionOperations.ToList();
            _context.RemoveRange(wardsInsert);
            var wardsMedicine = _context.WardsMedicineConsumptions.ToList();
            _context.RemoveRange(wardsMedicine);
            var medicineStock = _context.MedicineStock.ToList();
            _context.RemoveRange(medicineStock);
            var expenses = _context.GeneralExpenses.ToList();
            _context.RemoveRange(expenses);
            var emps = _context.Employees.ToList();
            _context.RemoveRange(emps);
            var wardsStock = _context.WardsStocks.ToList();
            _context.RemoveRange(wardsStock);
            var stock = _context.GeneralStocks.ToList();
            _context.RemoveRange(stock);

            _context.SaveChanges();

            return "";
        }

        [HttpGet]
        public List<Employee> GetEmployees()
        {
            var content = _context.Employees.ToList();
            return content;
        }

        [HttpPost]
        public string DeleteEmployee([FromForm] int id)
        {
            var content = _context.Employees.Where(x => x.ID == id).FirstOrDefault();
            var expenses = _context.GeneralExpenses.Where(x => x.EmployeeID == id).ToList();
            if (content != null)
            {
                if(expenses.Count > 0)
                {
                _context.Remove(expenses);
                }
                _context.Remove(content);
                _context.SaveChanges();
                return "";
            }
            else return "الموظف غير موجود";
        }

        [HttpPost]
        public string StopEmployee([FromForm] int id)
        {
            var content = _context.Employees.Where(x => x.ID == id).FirstOrDefault();
            if (content != null)
            {
                content.IsActive = false;
                _context.SaveChanges();
                return "";
            }
            else return "الموظف غير موجود";
           
        }


        [HttpPost]
        public string SaveEmployee([FromForm] Employee employee)
        {
            if (string.IsNullOrWhiteSpace(employee.Name.Trim()))
                return "يرجي ادخال اسم الموظف";
            if (!(employee.EmploymentDate > DateTime.MinValue))
                employee.EmploymentDate = DateTime.Now.Date;

            var empExist = _context.Employees.Where(x => x.Name.Trim() == employee.Name.Trim() && x.IsActive == true).FirstOrDefault();
            if (empExist != null)
                return "اسم الموظف موجود من قبل";

            employee.ID = 0;
            employee.IsActive = true;
            employee.Name = employee.Name.Trim();
            employee.UnEmploymentDate = null;
            _context.Add(employee);
            _context.SaveChanges();

            return "";
        }


        [HttpGet]
        public List<MedicineDetails> GetMedicines()
        {
            var content = _context.MedicineDetails.ToList();
            return content;
        }

        [HttpGet]
        public MedicineVM GetMedicineByID(int id)
        {
            var content = new MedicineVM
            {
                MedicineDetails = _context.MedicineDetails.Where(x => x.ID == id).FirstOrDefault(),
                MedicineStock = _context.MedicineStock.Where(x => x.MedicineID == id).FirstOrDefault()
            };
            return content;
        }

        [HttpPost]
        public string AddNewMedicine([FromForm] MedicineDetails Details)
        {
            if (string.IsNullOrWhiteSpace(Details.Name.Trim()))
                return "يرجي ادخال اسم الدواء";

            if (string.IsNullOrWhiteSpace(Details.Unit.Trim()))
                return "يرجي ادخال اسم الوحدة";

            if (!(Details.UnitCost > 0))
                return "يرجي ادخال تكلفة الوحدة";

            var empExist = _context.MedicineDetails.Where(x => x.Name.Trim() == Details.Name.Trim()).FirstOrDefault();
            if (empExist != null)
                return "اسم الدواء موجود من قبل";

            Details.ID = 0;
            Details.Name = Details.Name.Trim();

            _context.Add(Details);

            _context.SaveChanges();

            var medStock = new MedicineStock
            {
                ID = 0,
                MedicineID = Details.ID,
                StockQuantity = 0,
                StockCurrentMedicineValue = 0
            };
            _context.Add(medStock);
            _context.SaveChanges();

            return "";
        }

        [HttpPost]
        public string AddMedicineStock([FromForm] MedicineStock Details)
        {
            if (!(Details.MedicineID > 0))
                return "يرجي اختيار اسم الدواء";

            if (!(Details.StockQuantity > 0))
                return "يرجي ادخال كمية الدواء";


            var medicine = _context.MedicineDetails.Where(x => x.ID == Details.MedicineID).FirstOrDefault();
            if (medicine == null) return "هذا الدواء غير موجود";

            Details.StockCurrentMedicineValue = Details.StockQuantity * medicine.UnitCost;

            var medicineStock = _context.MedicineStock.Where(x => x.MedicineID == Details.MedicineID).FirstOrDefault();

            if (medicineStock == null)
                return "هذا الدواء غير موجود بالمخزن";


            medicineStock.StockQuantity += Details.StockQuantity;
            medicineStock.StockCurrentMedicineValue += Details.StockCurrentMedicineValue;



            _context.SaveChanges();

            return "";
        }

        [HttpPost]
        public string AddWardMedicine([FromForm] WardsMedicineConsumption Details)
        {
            if (!(Details.MedicineID > 0))
                return "يرجي اختيار اسم الدواء";

            if (!(Details.WardID > 0))
                return "يرجي أختيار اسم العنبر";

            if (!(Details.Quantity > 0))
                return "يرجي ادخال كمية الدواء";
            if ((Details.ConsumptionDate! > DateTime.MinValue))
                Details.ConsumptionDate = DateTime.Now.Date;

            var medicine = _context.MedicineDetails.Where(x => x.ID == Details.MedicineID).FirstOrDefault();
            if (medicine == null) return "هذا الدواء غير موجود";

            var medicineStock = _context.MedicineStock.Where(x => x.MedicineID == Details.MedicineID).FirstOrDefault();
            if (Details.Quantity > medicineStock.StockQuantity)
                return "الكمية المدخلة اكبر من الكمية المتاحة بالمخزن";

            Details.ID = 0;
            Details.TotalCost = Details.Quantity * medicine.UnitCost;

            _context.Add(Details);
            medicineStock.StockQuantity -= Details.Quantity;
            medicineStock.StockCurrentMedicineValue -= Details.TotalCost;

            _context.SaveChanges();

            return "";
        }
    }
}
