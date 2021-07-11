import { PivotViewComponent } from "@syncfusion/ej2-react-pivotview";
import React, { useState } from "react";

const dataSourceSettings = {
  columns: [{ name: "Year", caption: "Production Year" }, { name: "Quarter" }],
  expandAll: false,
  filters: [],
  formatSettings: [{ name: "Amount", format: "C0" }],
  rows: [{ name: "Country" }, { name: "Products" }],
  values: [
    { name: "Sold", caption: "Units Sold" },
    { name: "Amount", caption: "Sold Amount" },
  ],
};

let pivotObj : PivotViewComponent | null
const exportClick = () => {
  if (pivotObj) pivotObj.excelExport();
};

interface Iprops{
  selectedReport:number
}

const WardsReport = (props:Iprops) => {
  return (
    <div>
      <div className="col-md-9">
        {" "}
        <PivotViewComponent
          ref={(d) => {
            pivotObj=d;
          }}
          id="PivotView"
          height={350}
          dataSourceSettings={dataSourceSettings}
          allowExcelExport={true}
        ></PivotViewComponent>
      </div>
      <div>
        <button
          className="btn btn-primary btn-round"
          style={{ alignSelf: "center", width: "100%" }}
          onClick={exportClick}
        >
          <label
            style={{
              color: "white",
              fontWeight: 900,
              fontSize: "125%",
            }}
          >
            Export To Excell
          </label>
        </button>
      </div>
    </div>
  );
};

export default WardsReport;
