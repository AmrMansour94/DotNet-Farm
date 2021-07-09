import React, { useEffect, useState } from "react";
import { IKeyValuePairsVM } from "../../../VM/KeyValuePairs";
import WardsReport from "./WardsReport";

const ReportsList: IKeyValuePairsVM[] = [
  { ID: 1, Name: "--" },
  { ID: 2, Name: "تقرير المخازن" },
  { ID: 3, Name: "تقرير العنابر" },
  { ID: 4, Name: "تقرير المصروفات المالية اليومية" },
];

const ReportsMainContainer = () => {
  const [selectedReport, setSelectedReport] = useState<number>(0);
  const [isHidden, setIsHidden] = useState<boolean>(true);

  useEffect(() => {}, [selectedReport, isHidden]);

  return (
    <div className="card">
      <div className="card-header card-header-text card-header-primary">
        <div className="card-text">
          <h4 className="card-title" style={{ textAlign: "center" }}>
            الادخال اليومي للعنابر
          </h4>
        </div>
      </div>
      <div className="card-body">
        {/* Line 1 */}
        <div className="card">
          <div className="row" style={{ margin: "20px", direction: "rtl" }}>
            <div className="col-md-2"></div>

            <div className="col-md-2">
              <span
                style={{
                  textShadow: "4px 4px 8px #f2cfff",
                  fontWeight: 900,
                  fontSize: "125%",
                }}
              >
                :اختر العنبر
              </span>
            </div>
            <div className="col-md-5">
              <select
                className="form-control selectpicker"
                data-style="btn btn-link"
                id="exampleFormControlSelect1"
                onChange={() => setIsHidden(false)}
                style={{
                  fontWeight: 900,
                  fontSize: "125%",
                }}
              >
                {ReportsList.map((ward: IKeyValuePairsVM) => {
                  return <option key={ward.ID}>{ward.Name}</option>;
                })}
              </select>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>

      <div className="card-body" hidden={isHidden}>
        <div className="card">
          <WardsReport />
        </div>
      </div>
    </div>
  );
};

export default ReportsMainContainer;
