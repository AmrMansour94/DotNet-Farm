import axios from "axios";
import { EmployeesVM } from "../VM/EmployeesVM";
import { MedicineSaveVM, MedicineVM, SelectedMedicineDetails , MedicineStockSaveVM } from "../VM/MedicineVM";
import { getBaseUrl } from "./GetBaseURL";

export const FarmServices = {
    GetEmployees: async (): Promise<EmployeesVM[]> => {
      const req = await axios.get(getBaseUrl() + "/Farm/GetEmployees")
      return req.data;
    },

    GetMedicineList: async (): Promise<MedicineVM[]> => {
      const req = await axios.get(getBaseUrl() + "/Farm/GetMedicines")
      return req.data;
    },

    GetMedicineDetails: async (ID : number): Promise<SelectedMedicineDetails> => {
      const req = await axios.get(getBaseUrl() + "/Farm/GetMedicineByID?id="+ ID)
      return req.data;
    },

    SaveNewMedicine: async (medicine : MedicineSaveVM): Promise<string> => {
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
    }).then((res) => res.data)
    .catch((err) => err.data);
    return req1;
    },

    SaveMedicineStock: async (MedicineStockSaveVM : MedicineStockSaveVM): Promise<string> => {
      var data = new FormData();
    data.append("MedicineID", String(MedicineStockSaveVM.MedicineID));
    data.append("NewQuantity", String(MedicineStockSaveVM.StockQuantity));
    const req1 = await axios({
      method: "post",
      url: getBaseUrl() + "/Farm/AddMedicineStock",
      data: data,
    }).then((res) => res.data)
    .catch((err) => err.data);
    return req1;
    },
}