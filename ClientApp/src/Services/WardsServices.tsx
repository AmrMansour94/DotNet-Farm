import axios from "axios";
import { IKeyValuePairsVM } from "../VM/KeyValuePairs";
import { UserVM } from "../VM/UserVM";
import { SaveWardNewQuantitiesVM, WardContentVM } from "../VM/WardContentVM";
import { getBaseUrl } from "./GetBaseURL";

export const WardsApi = {
  getWardsList: async (): Promise<IKeyValuePairsVM[]> => {
    const req = await axios.get(getBaseUrl() + "/Wards/GetWards");
    return req.data;
  },

  getWardContent : async (wardId : number): Promise<WardContentVM> => {
    const req = await axios.get(getBaseUrl() + "/Wards/getWardContent?id="+wardId);
    return req.data;
  },

  saveNewQuantities: async (Ward: SaveWardNewQuantitiesVM): Promise<string> => {
    var data = new FormData();
    data.append("wardID", String(Ward.wardID));
    data.append("addedChicksNum", String(Ward.addedChicksNum));
    data.append("addedFoodQuantity", String(Ward.addedFoodQuantity));
    data.append("addedWoodDustQuantity", String(Ward.addedWoodDustQuantity));
    data.append("deadChicksNum", String(Ward.deadChicksNum));
    data.append("avgBirdWeight", String(Ward.avgBirdWeight));
    const req1 = await axios({
      method: "post",
      url: getBaseUrl() + "/Wards/SaveNewQuantities",
      data: data,
    }).then((res) => res.data)
    .catch((err) => err.data);
    //  const req = await axios.post(getBaseUrl() + "/Stock/SaveNewQuantities" , formData)
    //   .then((res) => res.data)
    //   .catch((err) => err.data);
    return req1;
  },
};
