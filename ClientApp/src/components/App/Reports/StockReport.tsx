import { DataGrid } from "devextreme-react";
import { Scrolling, Column, Export } from "devextreme-react/data-grid";
import React, { useEffect, useMemo, useState } from "react";
import FormatSizeIcon from "@material-ui/icons/FormatSize";
import { stockReportsVM } from "../../../VM/StockReportsVM";
import { StockApi } from "../../../Services/StockServices";

export const StockReport = () => {
  const [stockReports, setStockReports] = useState<stockReportsVM>();
  const [isFullWidth, setIsFullWidth] = useState<boolean>(false);
  const onLoad = async () => {
    debugger
    const data = await StockApi.GetStockReports();
    console.log(data)
    setStockReports(data);
  };

  useEffect(() => {
    onLoad();
  }, []);
  useEffect(() => {}, [stockReports, isFullWidth]);

  const dateCellRender = (e: any) => {
    if (e.data.insertDate) {
      const date = new Date(e.data.insertDate);
      return date.toISOString().split("T")[0];
    }
  };

  const dataGrid = useMemo(() => {
    return stockReports ? (
      <div>
        <div
          className="card-header card-header-text card-header-primary"
          style={{ marginTop: "50px" }}
        >
          <div className="card-text">
            <h4 className="card-title" style={{ textAlign: "center" }}>
              تقرير المخزن الاساسي
            </h4>
          </div>
        </div>

        <div style={{ display: "table-row", width: 700 }}>
          {isFullWidth ? (
            <DataGrid
              dataSource={stockReports.generalStock}
              showBorders={true}
              remoteOperations={true}
              showRowLines={true}
              showColumnLines={true}
            >
              <Scrolling columnRenderingMode="virtual" />
              <Column dataField="iD" visible={false} />
              <Column
                dataField="totalInitialChicksNum"
                caption="اجمالي الكتاكيت"
                width={250}
              />
              <Column dataField="ageInDays" caption="العمر" width={100} />
              <Column
                dataField="totalDeadChicksNum"
                caption="اجمالي النوافق"
                width={170}
              />
              <Column
                dataField="totalCurrentChicksNum"
                caption="عدد الكتاكيت الحالي"
                visible={false}
              />
              <Column
                dataField="totalFoodQuantity"
                caption="اجمالي كمية العلف"
                width={230}
              />
              <Column
                dataField="currentFoodQuantity"
                caption="كمية العلف المتاحة"
                width={230}
              />
              <Column
                dataField="totalWoodDustQuantity"
                caption="اجمالي كمية النشارة"
                width={230}
              />
              <Column
                dataField="currentWoodDustQuantity"
                caption="كمية النشارة المتاحة"
                width={230}
              />
              
              <Column dataField="totalFoodCost" caption="اجمالي تكلفة العلف" />
              <Column
                dataField="totalWoodDustCost"
                caption="اجمالي تكلفة النشارة"
                width={230}
              />

              <Export enabled={true} allowExportSelectedData={true} />
            </DataGrid>
          ) : (
            <DataGrid
              dataSource={stockReports.generalStock}
              showBorders={true}
              remoteOperations={true}
              showRowLines={true}
              showColumnLines={true}
            >
              <Scrolling columnRenderingMode="virtual" />
              <Column dataField="iD" visible={false} />
              <Column
                dataField="totalInitialChicksNum"
                caption="اجمالي الكتاكيت"
              />
              <Column dataField="ageInDays" caption="العمر" width={100} />
              <Column
                dataField="totalDeadChicksNum"
                caption="اجمالي النوافق"
              />
              <Column
                dataField="totalCurrentChicksNum"
                caption="عدد الكتاكيت الحالي"
                visible={false}
              />
              <Column
                dataField="totalFoodQuantity"
                caption="اجمالي كمية العلف"
              />
              <Column
                dataField="currentFoodQuantity"
                caption="كمية العلف المتاحة"
              />
              <Column
                dataField="totalWoodDustQuantity"
                caption="اجمالي كمية النشارة"
              />
              <Column
                dataField="currentWoodDustQuantity"
                caption="كمية النشارة المتاحة"
              />
              
              <Column dataField="totalFoodCost" caption="اجمالي تكلفة العلف" />
              <Column
                dataField="totalWoodDustCost"
                caption="اجمالي تكلفة النشارة"
              />

              <Export enabled={true} allowExportSelectedData={true} />
            </DataGrid>
          )}
        </div>

        <div
          className="card-header card-header-text card-header-primary"
          style={{ marginTop: "50px" }}
        >
          <div className="card-text">
            <h4 className="card-title" style={{ textAlign: "center" }}>
              عمليات الادخال للمخزن
            </h4>
          </div>
        </div>

        <div style={{ display: "table-row", width: 700 }}>
          {isFullWidth ? (
            <DataGrid
              dataSource={stockReports.insertionOpsReport}
              showBorders={true}
              remoteOperations={true}
              showRowLines={true}
              showColumnLines={true}
              columnWidth={200}
            >
              <Scrolling columnRenderingMode="virtual" />
              <Column dataField="iD" visible={false} />
              <Column
                dataField="insertDate"
                caption="تاريخ الادخال"
                width={140}
                cellRender={dateCellRender}
              />
              <Column
                dataField="addedChicksNum"
                caption="عدد الكتاكيت المضاف"
                width={250}
              />

              <Column
                dataField="addedFoodQuantity"
                caption="كمية العلف المضافة"
                width={250}
              />
              <Column
                dataField="addedWoodDustQuantity"
                caption="كمية النشارة المضافة"
                width={250}
              />
              <Column
                dataField="addedFoodTotalCost"
                caption="تكلفة العلف المضاف"
                width={250}
              />
              <Column
                dataField="addedWoodDustTotalCost"
                caption="تكلفة النشارة المضافة"
                width={250}
              />
              
              <Export enabled={true} allowExportSelectedData={true} />
            </DataGrid>
          ) : (
            <DataGrid
              dataSource={stockReports.insertionOpsReport}
              showBorders={true}
              remoteOperations={true}
              showRowLines={true}
              showColumnLines={true}
            >
              <Scrolling columnRenderingMode="virtual" />
              <Column dataField="iD" visible={false} />
              <Column
                dataField="insertDate"
                caption="تاريخ الادخال"
                cellRender={dateCellRender}
              />
              <Column
                dataField="addedChicksNum"
                caption="عدد الكتاكيت المضاف"
              />

              <Column
                dataField="addedFoodQuantity"
                caption="كمية العلف المضافة"
              />
              <Column
                dataField="addedWoodDustQuantity"
                caption="كمية النشارة المضافة"
              />
              <Column
                dataField="addedFoodTotalCost"
                caption="تكلفة العلف المضاف"
              />
              <Column
                dataField="addedWoodDustTotalCost"
                caption="تكلفة النشارة المضافة"
              />
              
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
  }, [stockReports, isFullWidth]);

  return <div>{dataGrid}</div>;
};

export default StockReport;
