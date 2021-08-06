import axios from "axios";
import { addedMedQuantityTOWardSaveModel } from "../components/App/Medicine/InsertMedicineIntoWards";
import { EmployeesSaveVM, EmployeesVM } from "../VM/EmployeesVM";
import {
  MedicineSaveVM,
  MedicineVM,
  SelectedMedicineDetails,
  MedicineStockSaveVM,
} from "../VM/MedicineVM";
import { getBaseUrl } from "./GetBaseURL";

export const FarmServices = {
  GetEmployees: async (): Promise<EmployeesVM[]> => {
    const req = await axios.get(getBaseUrl() + "/Farm/GetEmployees");
    return req.data;
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
    data.append("StockQuantity", String(MedicineStockSaveVM.StockQuantity));
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
};
