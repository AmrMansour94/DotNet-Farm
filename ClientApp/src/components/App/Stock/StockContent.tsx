import React, { useEffect, useState } from "react";
import { StockApi } from "../../../Services/StockServices";
import { StockContentVM } from "../../../VM/StockVM";

const StockContent = () => {
  const [StockContent, setStockContent] = useState<StockContentVM>();
  
  useEffect(() => {
  onload();
  }, [])
  useEffect(() => {

    }, [StockContent])

  const onload =async ()=>{
    const data = await StockApi.getStockContent()
    setStockContent(data)
  }

  return (
    <>
      <div className="row justify-content-center" style={{ margin: "20px" }}>
        <span
          className="badge badge-pill badge-info center"
          style={{
            fontWeight: 900,
            fontSize: "125%",
            display: "inline-block",
            margin: "10px 10px 0 0",
            padding: "5px 10px",
            width: "60%",
          }}
        >
          محتويات المخزن
        </span>
      </div>
      <div className="row" style={{ margin: "20px", direction: "rtl" }}>
        <div className="col-md-3">
          <span
            style={{
              textShadow: "4px 4px 8px #f2cfff",
              fontWeight: 900,
              fontSize: "125%",
            }}
          >
            عدد الكتاكيت الاجمالي:
          </span>
        </div>
        <div className="col-md-3">
          <span
            style={{
              textShadow: "4px 4px 8px #f2cfff",
              fontWeight: 900,
              fontSize: "125%",
              float:"right"
            }}
          >
            {StockContent?.totalChicksNum}
          </span>
        </div>
        <div className="col-md-3">
          <span
            style={{
              textShadow: "4px 4px 8px #f2cfff",
              fontWeight: 900,
              fontSize: "125%",
            }}
          >
            عدد الكتاكيت المتاح:
          </span>
        </div>
        <div className="col-md-3">
          <span
            style={{
              textShadow: "4px 4px 8px #f2cfff",
              fontWeight: 900,
              fontSize: "125%",
              float:"right"
            }}
          >
            {StockContent?.currentChicksNum}
          </span>
        </div>
        </div>
        <div className="row" style={{ margin: "20px", direction: "rtl" }}>
        <div className="col-md-3">
          <span
            style={{
              textShadow: "4px 4px 8px #f2cfff",
              fontWeight: 900,
              fontSize: "125%",
            }}
          >
            كمية العلف المتاحة:
          </span>
        </div>
        <div className="col-md-3">
          <span
            style={{
              textShadow: "4px 4px 8px #f2cfff",
              fontWeight: 900,
              fontSize: "125%",
              float:"right"
            }}
          >
            {StockContent?.availableFoodQuantity} كجم
          </span>
        </div>

        <div className="col-md-3">
          <span
            style={{
              textShadow: "4px 4px 8px #f2cfff",
              fontWeight: 900,
              fontSize: "125%",
            }}
          >
            كمية النشارة المتاحة:
          </span>
        </div>

        <div className="col-md-3">
          <span
            style={{
              textShadow: "4px 4px 8px #f2cfff",
              fontWeight: 900,
              fontSize: "125%",
              float:"right"
            }}
          >
            {StockContent?.availableWoodDust} كجم
          </span>
        </div>
      </div>
    </>
  );
};

export default StockContent;
