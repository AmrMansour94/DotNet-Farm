import React from "react";

const StockContent = () => {
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
      <div className="row" style={{ margin: "20px" , direction : "rtl" }}>
      <div className="col-md-1"></div>
        <div className="col-md-2">
          <span
            style={{
              textShadow: "4px 4px 8px #f2cfff",
              fontWeight: 900,
              fontSize: "125%",
            }}
          >
            كمية الطعام المتاحة:
          </span>
        </div>
        <div className="col-md-1">
          <span
            style={{
              textShadow: "4px 4px 8px #f2cfff",
              fontWeight: 900,
              fontSize: "125%",
            }}
          >
            "0"
          </span>
        </div>

        <div className="col-md-2">
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

        <div className="col-md-1">
          <span
            style={{
              textShadow: "4px 4px 8px #f2cfff",
              fontWeight: 900,
              fontSize: "125%",
            }}
          >
            "0"
          </span>
        </div>

        <div className="col-md-2">
          <span
            style={{
              textShadow: "4px 4px 8px #f2cfff",
              fontWeight: 900,
              fontSize: "125%",
            }}
          >
            عدد الكتاكيت المتاحة:
          </span>
        </div>
        <div className="col-md-1">
          <span
            style={{
              textShadow: "4px 4px 8px #f2cfff",
              fontWeight: 900,
              fontSize: "125%",
            }}
          >
            "0"
          </span>
        </div>
      </div>
    </>
  );
};

export default StockContent;
