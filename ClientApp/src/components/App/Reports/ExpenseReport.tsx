import { DataGrid } from "devextreme-react";
import { Scrolling, Column, Export } from "devextreme-react/data-grid";
import React, { useEffect, useMemo, useState } from "react";
import FormatSizeIcon from "@material-ui/icons/FormatSize";
import { ExpensesReportVM } from "../../../VM/ExpensesReport";
import { FarmServices } from "../../../Services/FarmServices";

const ExpenseReport = () => {
  const [dataSource, setDataSource] = useState<ExpensesReportVM[]>([]);
  const [isFullWidth, setIsFullWidth] = useState<boolean>(false);
  const onLoad = async () => {
    const data = await FarmServices.GetExpensesReport();
    console.log(data);
    setDataSource(data);
  };

  useEffect(() => {
    onLoad();
  }, []);
  useEffect(() => {}, [dataSource, isFullWidth]);

  const dateCellRender = (e: any) => {
    if (e.data.expenseDate) {
      const date = new Date(e.data.expenseDate);
      return date.toISOString().split("T")[0];
    }
  };

  const dataGrid = useMemo(() => {
    return dataSource.length > 0 ? (
      <div>
        <DataGrid
          dataSource={dataSource}
          showBorders={true}
          remoteOperations={true}
          showRowLines={true}
          showColumnLines={true}
        >
          <Scrolling columnRenderingMode="virtual" />
          <Column dataField="iD" visible={false} />
          <Column dataField="bandName" caption="اسم البند" />
          <Column dataField="value" caption="القيمة" />
          <Column
            dataField="expenseDate"
            caption="تاريخ الصرف"
            cellRender={dateCellRender}
          />
          <Column dataField="empName" caption="اسم الموظف" />

          <Export enabled={true} allowExportSelectedData={true} />
        </DataGrid>
      </div>
    ) : null;
  }, [dataSource, isFullWidth]);

  return (
    <div className="card-body">
      <div
        className="card-header card-header-text card-header-primary"
        style={{ marginTop: "50px" }}
      >
        <div className="card-text">
          <h4 className="card-title" style={{ textAlign: "center" }}>
            تقرير المصروفات
          </h4>
        </div>
      </div>
      <div className="card-body">{dataGrid}</div>
    </div>
  );
};

export default ExpenseReport;
