import axios from "axios";
import { EmployeesVM } from "../VM/EmployeesVM";
import { MedicineVM } from "../VM/MedicineVM";
import { getBaseUrl } from "./GetBaseURL";

export const FarmServices = {
    GetEmployees: async (): Promise<EmployeesVM[]> => {
      const req = await axios.get(getBaseUrl() + "/Farm/GetEmployees")
      return req.data;
    },

    GetMedicineList: async (): Promise<MedicineVM[]> => {
      const req = await axios.get(getBaseUrl() + "/Farm/GetEmployees")
      return req.data;
    },
}