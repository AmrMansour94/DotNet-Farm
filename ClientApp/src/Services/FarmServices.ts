import axios from "axios";
import { addedMedQuantityTOWardSaveModel } from "../components/App/Medicine/InsertMedicineIntoWards";
import { EmployeesSaveVM, EmployeesVM } from "../VM/EmployeesVM";
import { ExpenseSaveVM } from "../VM/ExpenseSaveVM";
import { ExpensesReportVM } from "../VM/ExpensesReport";
import { MedicineStockReportVM } from "../VM/MedicineReportsVMs";
import {
  MedicineSaveVM,
  MedicineVM,
  SelectedMedicineDetails,
  MedicineStockSaveVM,
} from "../VM/MedicineVM";
import { PricesSaveVM } from "../VM/PricesSaveVM";
import { WardMedicineReportVM } from "../VM/WardMedicineReportVM";
import { getBaseUrl } from "./GetBaseURL";

export const FarmServices = {
  ResetFarmCycle: async (): Promise<string> => {
    const req1 = await axios({
      method: "post",
      url: getBaseUrl() + "/Farm/ResetFarmCycle"
    })
      .then((res) => res.data)
      .catch((err) => err.data);
    return req1;
  },


  GetEmployees: async (): Promise<EmployeesVM[]> => {
    const req = await axios.get(getBaseUrl() + "/Farm/GetEmployees");
    return req.data;
  },

  GetPrices: async (): Promise<PricesSaveVM> => {
    const req = await axios.get(getBaseUrl() + "/Farm/GetUnitPrices");
    return req.data;
  },

  SavePrices: async (prices: PricesSaveVM): Promise<string> => {
    var data = new FormData();
    data.append("ID", String(prices.ID));
    data.append("FoodUnitCost", String(prices.FoodUnitCost));
    data.append("WoodDustUnitCost", String(prices.WoodDustUnitCost));

    const req1 = await axios({
      method: "post",
      url: getBaseUrl() + "/Farm/AddOrEditFoodAndDustPrices",
      data: data,
    })
      .then((res) => res.data)
      .catch((err) => err.data);
    return req1;
  },

  AddNewEmployee: async (emp: EmployeesSaveVM): Promise<string> => {
    var data = new FormData();
    data.append("ID", String(emp.iD));
    data.append("Name", String(emp.name));
    data.append("EmploymentDate", String(emp.employmentDate));
    data.append("UnEmploymentDate", String(emp.unEmploymentDate));
    data.append("PhoneNumber", String(emp.phoneNumber));
    data.append("IsActive", String(emp.isActive));

    const req1 = await axios({
      method: "post",
      url: getBaseUrl() + "/Farm/SaveEmployee",
      data: data,
    })
      .then((res) => res.data)
      .catch((err) => err.data);
    return req1;
  },

  DeleteEmployee: async (empID: number): Promise<string> => {
    var data = new FormData();
    data.append("id", String(empID));
    const req1 = await axios({
      method: "post",
      url: getBaseUrl() + "/Farm/DeleteEmployee?id=" + { empID },
      data: data,
    })
      .then((res) => res.data)
      .catch((err) => err.data);
    return req1;
  },

  StopEmployee: async (empID: number): Promise<string> => {
    var data = new FormData();
    data.append("id", String(empID));
    const req1 = await axios({
      method: "post",
      url: getBaseUrl() + "/Farm/StopEmployee?id=" + { empID },
      data: data,
    })
      .then((res) => res.data)
      .catch((err) => err.data);
    return req1;
  },

  GetMedicineList: async (): Promise<MedicineVM[]> => {
    const req = await axios.get(getBaseUrl() + "/Farm/GetMedicines");
    return req.data;
  },

  GetMedicineDetails: async (ID: number): Promise<SelectedMedicineDetails> => {
    const req = await axios.get(
      getBaseUrl() + "/Farm/GetMedicineByID?id=" + ID
    );
    return req.data;
  },

  GetMedicineStockReport: async (): Promise<MedicineStockReportVM[]> => {
    const req = await axios.get(
      getBaseUrl() + "/Farm/GetMedicineStockReport"
    );
    return req.data;
  },

  GetWardsMedicineReport: async (ID: number): Promise<WardMedicineReportVM[]> => {
    const req = await axios.get(
      getBaseUrl() + "/Farm/WardsMedicineReport?wardID=" + ID
    );
    return req.data;
  },

  SaveNewMedicine: async (medicine: MedicineSaveVM): Promise<string> => {
    var data = new FormData();
    data.append("ID", String(medicine.ID));
    data.append("Name", String(medicine.Name));
    data.append("CompanyName", String(medicine.CompanyName));
    data.append("Unit", String(medicine.Unit));
    data.append("UnitCost", String(medicine.UnitCost));
    data.append("Notes", String(medicine.Notes));

    const req1 = await axios({
      method: "post",
      url: getBaseUrl() + "/Farm/AddNewMedicine",
      data: data,
    })
      .then((res) => res.data)
      .catch((err) => err.data);
    return req1;
  },

  SaveMedicineStock: async (
    MedicineStockSaveVM: MedicineStockSaveVM
  ): Promise<string> => {
    var data = new FormData();
    data.append("ID", String(MedicineStockSaveVM.ID));
    data.append("MedicineID", String(MedicineStockSaveVM.MedicineID));
    data.append("InitialStockQuantity", String(MedicineStockSaveVM.InitialStockQuantity));
    data.append("CurrentStockQuantity", String(MedicineStockSaveVM.CurrentStockQuantity));
    data.append("ConsumedQuantity", String(MedicineStockSaveVM.ConsumedQuantity));
    data.append(
      "StockCurrentMedicineValue",
      String(MedicineStockSaveVM.StockCurrentMedicineValue)
    );
    const req1 = await axios({
      method: "post",
      url: getBaseUrl() + "/Farm/AddMedicineStock",
      data: data,
    })
      .then((res) => res.data)
      .catch((err) => err.data);
    return req1;
  },

  AddMedicineToWards: async (
    saveVM: addedMedQuantityTOWardSaveModel
  ): Promise<string> => {
    var data = new FormData();
    data.append("ID", String(saveVM.ID));
    data.append("MedicineID", String(saveVM.MedicineID));
    data.append("WardID", String(saveVM.WardID));
    data.append("ConsumptionDate", String(saveVM.ConsumptionDate));
    data.append("Quantity", String(saveVM.Quantity));
    data.append("TotalCost", String(saveVM.TotalCost));
    const req1 = await axios({
      method: "post",
      url: getBaseUrl() + "/Farm/AddWardMedicine",
      data: data,
    })
      .then((res) => res.data)
      .catch((err) => err.data);
    return req1;
  },

  GetExpensesReport: async (): Promise<ExpensesReportVM[]> => {
    const req = await axios.get(getBaseUrl() + "/Farm/GetExpensesReport");
    return req.data;
  },

  SaveExpenses: async (
    saveVM: ExpenseSaveVM
  ): Promise<string> => {
    var data = new FormData();
    data.append("ID", String(saveVM.ID));
    data.append("BandName", String(saveVM.BandName));
    data.append("Value", String(saveVM.Value));
    data.append("ExpenseDate", String(saveVM.ExpenseDate));
    data.append("EmployeeID", String(saveVM.EmployeeID));
    const req1 = await axios({
      method: "post",
      url: getBaseUrl() + "/Farm/SaveExpenses",
      data: data,
    })
      .then((res) => res.data)
      .catch((err) => err.data);
    return req1;
  },
};
