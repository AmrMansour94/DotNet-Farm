import { DataGrid } from "devextreme-react";
import { Scrolling, Column, Export } from "devextreme-react/data-grid";
import React, { useEffect, useMemo, useState } from "react";
import FormatSizeIcon from "@material-ui/icons/FormatSize";
import { FarmServices } from "../../../Services/FarmServices";
import { MedicineStockReportVM } from "../../../VM/MedicineReportsVMs";

export const MedicineStockReport = () => {
  const [MedicineStock, setMedicineStock] = useState<MedicineStockReportVM[]>();
  const [isFullWidth, setIsFullWidth] = useState<boolean>(false);
  const onLoad = async () => {
    debugger;
    const data = await FarmServices.GetMedicineStockReport();
    console.log(data);
    setMedicineStock(data);
  };

  useEffect(() => {
    onLoad();
  }, []);
  useEffect(() => {}, [MedicineStock, isFullWidth]);

  const initialStockQuantityRender = (e: any) => {
    if (e.data.initialStockQuantity) {
      return e.data.initialStockQuantity + " " + e.data.unit;
    }
  };

  const currentStockQuantityRender = (e: any) => {
    if (e.data.currentStockQuantity) {
      return e.data.currentStockQuantity + " " + e.data.unit;
    }
  };
  const consumedQuantityRender = (e: any) => {
    if (e.data.consumedQuantity) {
      return e.data.consumedQuantity + " " + e.data.unit;
    }
  };

  const dataGrid = useMemo(() => {
    return MedicineStock ? (
      <div>
        <div
          className="card-header card-header-text card-header-primary"
          style={{ marginTop: "50px" }}
        >
          <div className="card-text">
            <h4 className="card-title" style={{ textAlign: "center" }}>
              تقرير مخزن الدواء
            </h4>
          </div>
        </div>

        <div style={{ display: "table-row", width: 700 }}>
          {isFullWidth ? (
            <DataGrid
              dataSource={MedicineStock}
              showBorders={true}
              remoteOperations={true}
              showRowLines={true}
              showColumnLines={true}
            >
              <Scrolling columnRenderingMode="virtual" />
              <Column dataField="iD" visible={false} />
              <Column
                dataField="medicineName"
                caption="اسم الدواء"
                width={170}
              />
              <Column
                dataField="initialStockQuantity"
                caption="اجمالي الكمية"
                width={220}
                cellRender={initialStockQuantityRender}
              />
              <Column
                dataField="currentStockQuantity"
                caption="الكمية المتاحة"
                width={230}
                cellRender={currentStockQuantityRender}
              />
              <Column
                dataField="consumedQuantity"
                caption="الكمية المستهلكة"
                width={230}
                cellRender={consumedQuantityRender}
              />
              <Column
                dataField="stockCurrentMedicineValue"
                caption="قيمة الكمية المتاحة"
                width={230}
              />
              <Column dataField="unitCost" caption="تكلفة الوحدة" width={120} />

              <Export enabled={true} allowExportSelectedData={true} />
            </DataGrid>
          ) : (
            <DataGrid
              dataSource={MedicineStock}
              showBorders={true}
              remoteOperations={true}
              showRowLines={true}
              showColumnLines={true}
            >
              <Scrolling columnRenderingMode="virtual" />
              <Column dataField="iD" visible={false} />
              <Column dataField="medicineName" caption="اسم الدواء" />
              <Column
                dataField="initialStockQuantity"
                caption="اجمالي الكمية"
                width={220}
                cellRender={initialStockQuantityRender}
              />
              <Column
                dataField="currentStockQuantity"
                caption="الكمية المتاحة"
                cellRender={currentStockQuantityRender}
              />
              <Column
                dataField="consumedQuantity"
                caption="الكمية المستهلكة"
                cellRender={consumedQuantityRender}
              />
              <Column
                dataField="stockCurrentMedicineValue"
                caption="قيمة الكمية المتاحة"
              />
              <Column dataField="unitCost" caption="تكلفة الوحدة" />

              <Export enabled={true} allowExportSelectedData={true} />
            </DataGrid>
          )}
        </div>

        <div className="row" style={{ margin: "20px" }}>
          <div className="col-md-3"></div>

          <div className="col-md-6">
            {isFullWidth ? (
              <button
                className="btn btn-primary btn-round"
                style={{ alignSelf: "center", width: "100%" }}
                onClick={() => setIsFullWidth(false)}
              >
                <FormatSizeIcon />{" "}
                <label
                  style={{
                    color: "white",
                    fontWeight: 900,
                    fontSize: "130%",
                  }}
                >
                  حجم اصغر
                </label>
              </button>
            ) : (
              <button
                className="btn btn-primary btn-round"
                style={{ alignSelf: "center", width: "100%" }}
                onClick={() => setIsFullWidth(true)}
              >
                <FormatSizeIcon />{" "}
                <label
                  style={{
                    color: "white",
                    fontWeight: 900,
                    fontSize: "130%",
                  }}
                >
                  عرض بالحجم الطبيعي
                </label>
              </button>
            )}
          </div>

          <div className="col-md-3"></div>
        </div>
      </div>
    ) : null;
  }, [MedicineStock, isFullWidth]);

  return <div>{dataGrid}</div>;
};

export default MedicineStockReport;
