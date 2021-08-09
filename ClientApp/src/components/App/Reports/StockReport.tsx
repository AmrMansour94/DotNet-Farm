import { DataGrid } from "devextreme-react";
import { Scrolling, Column, Export } from "devextreme-react/data-grid";
import React, { useEffect, useMemo, useState } from "react";
import FormatSizeIcon from "@material-ui/icons/FormatSize";
import { stockReportsVM } from "../../../VM/StockReportsVM";
import { StockApi } from "../../../Services/StockServices";

const StockReport = () => {
  const [stockReports, setStockReports] = useState<stockReportsVM>();
  const [isFullWidth, setIsFullWidth] = useState<boolean>(false);
  const onLoad = async () => {
    const data = await StockApi.GetStockReports();
    setStockReports(data);
  };

  useEffect(() => {
    onLoad();
  }, []);
  useEffect(() => {}, [stockReports, isFullWidth]);

  const dateCellRender = (e: any) => {
    if (e.data.insertionDate) {
      const date = new Date(e.data.insertionDate);
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
              columnWidth={200}
            >
              <Scrolling columnRenderingMode="virtual" />
              <Column dataField="iD" visible={false} />
              <Column
                dataField="totalInitialChicksNum"
                caption="اجمالي الكتاكيت"
                width={140}
              />
              <Column
                dataField="totalDeadChicksNum"
                caption="اجمالي النوافق"
                width={80}
              />
              <Column
                dataField="totalCurrentChicksNum"
                caption="عدد الكتاكيت الحالي"
                visible={false}
              />
              <Column
                dataField="totalFoodQuantity"
                caption="اجمالي كمية العلف"
                width={140}
              />
              <Column
                dataField="currentFoodQuantity"
                caption="كمية العلف المتاحة"
                width={135}
              />
              <Column
                dataField="totalWoodDustQuantity"
                caption="اجمالي كمية النشارة"
                width={250}
              />
              <Column
                dataField="currentWoodDustQuantity"
                caption="كمية النشارة المتاحة"
                width={260}
              />
              <Column
                dataField="ageInDays"
                caption="العمر"
                width={140}
              />
              <Column dataField="totalFoodCost" caption="اجمالي تكلفة العلف" />
              <Column
                dataField="totalWoodDustCost"
                caption="اجمالي العلف المستهلك"
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
              <Column dataField="wardID" visible={false} />
              <Column
                dataField="totalInitialChicksNum"
                caption="اجمالي الكتاكيت"
              />
              <Column dataField="totalcurrentFoodQuantity" caption="اجمالي كمية العلف" />
              <Column
                dataField="totalCurrentChicksNum"
                caption="عدد الكتاكيت الحالي"
                visible={false}
              />
              <Column dataField="totalWoodDustCost" caption="عدد الكتاكيت" />
              <Column dataField="deadChicksNum" caption="عدد النوافق" />
              <Column
                dataField="totalWoodDustQuantity"
                caption="العلف المستهلك في اليوم"
              />
              <Column
                dataField="currentWoodDustQuantity"
                caption="النشارة المستهلكة في اليوم"
              />
              <Column dataField="ageInDays" caption="نسبة النوافق" />
              <Column dataField="totalFoodCost" caption="معامل التحويل" />
              <Column
                dataField="totalFoodQuantity"
                caption="اجمالي العلف المستهلك"
              />
              <Column
                dataField="totalWoodDust"
                caption="اجمالي النشارة المستهلكة"
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
              تقرير المخزن الاساسي
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
              <Column dataField="wardID" visible={false} />
              <Column
                dataField="insertionDate"
                caption="التاريخ"
                width={140}
                cellRender={dateCellRender}
              />
              <Column dataField="age" caption="العمر" width={80} />
              <Column
                dataField="totalCurrentChicksNum"
                caption="عدد الكتاكيت المضافة "
                visible={false}
              />
              <Column
                dataField="totalNumOfChicks"
                caption="عدد الكتاكيت"
                width={140}
              />
              <Column
                dataField="deadChicksNum"
                caption="عدد النوافق"
                width={135}
              />
              <Column
                dataField="consumedFoodQuantityPerDay"
                caption="العلف المستهلك في اليوم"
                width={250}
              />
              <Column
                dataField="consumedWoodDustQuantityPerDay"
                caption="النشارة المستهلكة في اليوم"
                width={260}
              />
              <Column
                dataField="deadRatio"
                caption="نسبة النوافق"
                width={140}
              />
              <Column dataField="conversionFactor" caption="معامل التحويل" />
              <Column
                dataField="totalFoodQuantity"
                caption="اجمالي العلف المستهلك"
                width={230}
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
              <Column dataField="wardID" visible={false} />
              <Column
                dataField="insertionDate"
                caption="التاريخ"
                cellRender={dateCellRender}
              />
              <Column dataField="age" caption="العمر" />
              <Column
                dataField="addedChicksNum"
                caption="عدد الكتاكيت المضافة "
                visible={false}
              />
              <Column dataField="totalNumOfChicks" caption="عدد الكتاكيت" />
              <Column dataField="deadChicksNum" caption="عدد النوافق" />
              <Column
                dataField="consumedFoodQuantityPerDay"
                caption="العلف المستهلك في اليوم"
              />
              <Column
                dataField="consumedWoodDustQuantityPerDay"
                caption="النشارة المستهلكة في اليوم"
              />
              <Column dataField="deadRatio" caption="نسبة النوافق" />
              <Column dataField="conversionFactor" caption="معامل التحويل" />
              <Column
                dataField="totalFoodQuantity"
                caption="اجمالي العلف المستهلك"
              />
              <Column
                dataField="totalWoodDust"
                caption="اجمالي النشارة المستهلكة"
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
