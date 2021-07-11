import axios from "axios";
import { UserVM } from "../VM/UserVM";
import { getBaseUrl } from "./GetBaseURL";

export const LoginApi = {
    Login: async (userName: string, password: string): Promise<UserVM | null> => {
      const req = await axios.get(getBaseUrl() + "/Wards/Login", {
        params: { userName: userName, password: password },
      });
      return req.data;
    },
}