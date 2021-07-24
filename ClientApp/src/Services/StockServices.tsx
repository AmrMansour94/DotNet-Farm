import axios from "axios";
import { IKeyValuePairsVM } from "../VM/KeyValuePairs";
import { SaveNewQuantitiesVM, StockContentVM } from "../VM/StockVM";
import { getBaseUrl } from "./GetBaseURL";

export const StockApi = {
  getStockContent: async (): Promise<StockContentVM> => {
    const req = await axios.get(getBaseUrl() + "/Stock/GetStockContent");
    return req.data;
  },

  saveNewQuantities: async (stock: SaveNewQuantitiesVM): Promise<string> => {
    var formData = new FormData();
    formData.append("stock", JSON.stringify(stock));
    const req1 = await axios({
      method: "post",
      url: getBaseUrl() + "/Stock/SaveNewQuantities",
      data: {stock : stock},
    }).then((res) => res.data)
    .catch((err) => err.data);
    //  const req = await axios.post(getBaseUrl() + "/Stock/SaveNewQuantities" , formData)
    //   .then((res) => res.data)
    //   .catch((err) => err.data);
    return req1;
  },
};
