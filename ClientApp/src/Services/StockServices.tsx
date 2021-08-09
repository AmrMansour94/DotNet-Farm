import axios from "axios";
import { IKeyValuePairsVM } from "../VM/KeyValuePairs";
import { stockReportsVM } from "../VM/StockReportsVM";
import { SaveNewQuantitiesVM, StockContentVM } from "../VM/StockVM";
import { getBaseUrl } from "./GetBaseURL";

export const StockApi = {
  getStockContent: async (): Promise<StockContentVM> => {
    const req = await axios.get(getBaseUrl() + "/Stock/GetStockContent");
    return req.data;
  },

  saveNewQuantities: async (stock: SaveNewQuantitiesVM): Promise<string> => {
    var data = new FormData();
    data.append("addedChicksNum", String(stock.addedChicksNum));
    data.append("addedFoodQuantity", String(stock.addedFoodQuantity));
    data.append("addedWoodDustQuantity", String(stock.addedWoodDustQuantity));
    data.append("AgeInDays", String(stock.AgeInDays));
    const req1 = await axios({
      method: "post",
      url: getBaseUrl() + "/Stock/SaveNewQuantities",
      data: data,
    }).then((res) => res.data)
    .catch((err) => err.data);
    //  const req = await axios.post(getBaseUrl() + "/Stock/SaveNewQuantities" , formData)
    //   .then((res) => res.data)
    //   .catch((err) => err.data);
    return req1;
  },

  GetStockReports: async (): Promise<stockReportsVM> => {
    const req = await axios.get(getBaseUrl() + "/Stock/GetStockReports");
    return req.data;
  },
};
