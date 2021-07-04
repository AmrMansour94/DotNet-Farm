import axios from "axios"
import { IKeyValuePairsVM } from "../VM/KeyValuePairs"
import { getBaseUrl } from "./GetBaseURL";

export const WardsApi = {
 getWardsList  : async () : Promise<IKeyValuePairsVM[]> => {
    const req = await axios.get( getBaseUrl()+"/Wards/GetWards");
    return req.data
    }
}