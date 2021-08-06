import { DataGrid, Popup } from "devextreme-react";
import { Scrolling, Column, Export } from "devextreme-react/data-grid";
import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { WardsApi } from "../../../Services/WardsServices";
import { IKeyValuePairsVM } from "../../../VM/KeyValuePairs";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import { wardDailyReportVM } from "../../../VM/WardContentVM";
import FormatSizeIcon from "@material-ui/icons/FormatSize";

interface Iprops {
  selectedReport: number;
}
// const dataSource = [
//   { Order: 1, Name: "Amr", Age: "27" },
//   { Order: 2, Name: "Samar", Age: "27" },
//   { Order: 3, Name: "Lojy", Age: "2" },
//   { Order: 1, Name: "Amr", Age: "27" },
//   { Order: 2, Name: "Samar", Age: "27" },
//   { Order: 3, Name: "Lojy", Age: "2" },
// ];

const WardsReport = (props: Iprops) => {
  const [wardsList, setWardsList] = useState<IKeyValuePairsVM[]>([]);
  const [selectedWard, setSelectedWard] = useState<string>();
  const [selectedWardID, setSelectedWardID] = useState<number>(0);
  const [dataSource, setDataSource] = useState<wardDailyReportVM[]>([]);
  const [isFullWidth, setIsFullWidth] = useState<boolean>(false);
  const onLoad = async () => {
    const data = await WardsApi.getWardsList();
    setWardsList(data);
  };

  const gridDataBind = async (selectedWardID: number) => {
    const data = await WardsApi.getWardDailyDataReport(selectedWardID);
    console.log(data);
    setDataSource(data);
  };

  useEffect(() => {
    onLoad();
  }, []);
  useEffect(() => {}, [wardsList, selectedWardID, dataSource, isFullWidth]);

  useEffect(() => {
    debugger;
    for (const ward of wardsList) {
      if (ward.Name == selectedWard) {
        setSelectedWardID(ward.ID);
        break;
      } else {
        setSelectedWardID(0);
      }
    }
  }, [selectedWard]);

  const dateCellRender = (e: any) => {
    if (e.data.insertionDate) {
      const date = new Date(e.data.insertionDate);
      return date.toISOString().split("T")[0];
    }
  };

  const dataGrid = useMemo(() => {
    return dataSource.length > 0 ? (
      <div>
        <div
          className="card-header card-header-text card-header-primary"
          style={{ marginTop: "50px" }}
        >
          <div className="card-text">
            <h4 className="card-title" style={{ textAlign: "center" }}>
              {dataSource[0].wardName}
            </h4>
          </div>
        </div>

        <div style={{ display: "table-row", width: 700 }}>
          {isFullWidth ? (
            <DataGrid
              dataSource={dataSource}
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
                dataField="addedChicksNum"
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
              <Column
                dataField="totalWoodDust"
                caption="اجمالي النشارة المستهلكة"
                width={250}
              />
              <Column
                dataField="totalFoodCost"
                caption="اجمالي تكلفة العلف"
                width={200}
              />
              <Column
                dataField="totalWoodDustCost"
                caption="اجمالي تكلفة النشارة"
                width={200}
              />

              <Export enabled={true} allowExportSelectedData={true} />
            </DataGrid>
          ) : (
            <DataGrid
              dataSource={dataSource}
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
  }, [dataSource, isFullWidth]);

  return (
    <div>
      <div className="card-body">
        {/* Line 1 */}
        <div className="card">
          <div className="row" style={{ margin: "20px" }}>
            <div className="col-md-2"></div>
            <div className="col-md-1">
              <button
                className="btn btn-primary btn-fab btn-fab-mini btn-round"
                onClick={() => {
                  if (selectedWardID) {
                    gridDataBind(selectedWardID);
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "يرجي اختيار العنبر اولا",
                      showConfirmButton: false,
                      timer: 2000,
                    });
                  }
                }}
              >
                <i className="material-icons">
                  <SearchRoundedIcon />
                </i>
              </button>
            </div>
            <div className="col-md-5">
              <select
                className="form-control selectpicker"
                data-style="btn btn-link"
                id="exampleFormControlSelect1"
                onChange={(e: any) => {
                  setSelectedWard(e.target.value);
                }}
                style={{
                  fontWeight: 900,
                  fontSize: "125%",
                }}
              >
                <option>--</option>
                {wardsList.map((ward: IKeyValuePairsVM) => {
                  return (
                    <option key={ward.ID} accessKey={String(ward.ID)}>
                      {ward.Name}
                    </option>
                  );
                })}
              </select>
            </div>

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
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>
      {dataGrid}
    </div>
  );
};

export default WardsReport;
