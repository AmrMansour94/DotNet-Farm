import axios from "axios";
import { IKeyValuePairsVM } from "../VM/KeyValuePairs";
import { UserVM } from "../VM/UserVM";
import { getBaseUrl } from "./GetBaseURL";

export const WardsApi = {
  Login: async (userName: string, password: string): Promise<UserVM | null> => {
    const req = await axios.get(getBaseUrl() + "/Wards/Login", {
      params: { userName: userName, password: password },
    });
    return req.data;
  },

  getWardsList: async (): Promise<IKeyValuePairsVM[]> => {
    const req = await axios.get(getBaseUrl() + "/Wards/GetWards");
    return req.data;
  },
};
