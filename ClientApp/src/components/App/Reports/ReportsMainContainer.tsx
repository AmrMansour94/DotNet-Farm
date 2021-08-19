import React, { useEffect, useMemo, useState } from "react";
import { IKeyValuePairsVM } from "../../../VM/KeyValuePairs";
import WardsReport from "./WardsReport";
import StockReport from "./StockReport"
import ExpenseReport from "./ExpenseReport";

const ReportsList: IKeyValuePairsVM[] = [
  { ID: 0, Name: "--" },
  { ID: 1, Name: "تقرير العنابر" },
  { ID: 2, Name: "تقرير المخزن" },
  { ID: 3, Name: "المدفوعات اليومية" },
  { ID: 4, Name: "استهلاك الدواء للعنابر" },
  { ID: 5, Name: "كميات الدواء في المخزن" },
];

const ReportsMainContainer = () => {
  const [selectedReport, setSelectedReport] = useState<string>();
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [selectedReportID, setSelectedReportID] = useState<number>(0);

  useEffect(() => {}, [selectedReport, isHidden, selectedReportID]);

  useEffect(() => {
    debugger;
    for (const report of ReportsList) {
      if (report.Name == selectedReport) {
        setSelectedReportID(report.ID);
        break;
      } else {
        setSelectedReportID(0);
      }
    }
  }, [selectedReport]);

  const reportRender = useMemo(() => {
    switch (selectedReportID) {
      case 1:
        return <WardsReport />;
      case 2:
        return <StockReport />;
      case 3:
        return <ExpenseReport />;
      case 4:
        return <WardsReport />;
      case 5:
        return <WardsReport />;
    }
  }, [selectedReportID]);

  return (
    <div className="card">
      <div className="card-header card-header-text card-header-primary">
        <div className="card-text">
          <h4 className="card-title" style={{ textAlign: "center" }}>
            التقارير
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
                :اختر التقرير
              </span>
            </div>
            <div className="col-md-5">
              <select
                className="form-control selectpicker"
                data-style="btn btn-link"
                id="exampleFormControlSelect1"
                onChange={(e:any) => {
                  setIsHidden(false);
                  setSelectedReport(e.target.value);
                }}
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

      <div
        className="card-body"
        hidden={isHidden}
        style={{ marginTop: "-50px" }}
      >
        {reportRender}
      </div>
    </div>
  );
};

export default ReportsMainContainer;
