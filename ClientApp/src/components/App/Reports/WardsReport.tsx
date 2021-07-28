import { DataGrid } from "devextreme-react";
import { Scrolling, Column, Export } from "devextreme-react/data-grid";
import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { WardsApi } from "../../../Services/WardsServices";
import { IKeyValuePairsVM } from "../../../VM/KeyValuePairs";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import { wardDailyReportVM } from "../../../VM/WardContentVM";

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
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [dataSource, setDataSource] = useState<wardDailyReportVM[]>([]);

  const onLoad = async () => {
    const data = await WardsApi.getWardsList();
    setWardsList(data);
  };

  const gridDataBind = async (selectedWardID: number) => {
    const data = await WardsApi.getWardDailyDataReport(selectedWardID);
    console.log(data)
    setDataSource(data);
  };

  useEffect(() => {
    onLoad();
  }, []);
  useEffect(() => {}, [wardsList, selectedWardID, isHidden, dataSource]);

  useEffect(() => {
    debugger;
    for (const ward of wardsList) {
      if (ward.Name == selectedWard) {
        setSelectedWardID(ward.ID);
        setIsHidden(true);
        break;
      } else {
        setSelectedWardID(0);
      }
    }
  }, [selectedWard]);

//  function onExporting(e : any) {
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('Main sheet');

//     function exportDataGrid({
//       component: e.component,
//       worksheet: worksheet,
//       autoFilterEnabled: true
//     }).then(() => {
//       workbook.xlsx.writeBuffer().then((buffer) => {
//         saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
//       });
//     });
//     e.cancel = true;
//   }

  const dataGrid = useMemo(() => {
    return dataSource.length>0 ? (
      <div>
        <div className="card-header card-header-text card-header-primary">
          <div className="card-text">
            <h4 className="card-title" style={{ textAlign: "center" }}>
              {dataSource[0].wardName}
            </h4>
          </div>
        </div>
        <div style = {{display : "table-row" , width : 700}}>
        {/* <DataGrid
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
          <Column dataField="insertionDate" caption="التاريخ" width={120} />
          <Column dataField="age" caption="العمر" width={80}/>
          <Column dataField="addedChicksNum" caption="عدد الكتاكيت المضافة " visible={false}/>
          <Column dataField="TotalNumOfChicks" caption="عدد الكتاكيت" width={120} />
          <Column dataField="deadChicksNum" caption="عدد النوافق" width={135}/>
          <Column dataField="consumedFoodQuantityPerDay" caption="العلف المستهلك في اليوم" />
          <Column dataField="consumedWoodDustQuantityPerDay" caption="النشارة المستهلكة في اليوم" />
          <Column dataField="deadRatio" caption="% النوافق" width={120}/>
          <Column dataField="conversionFactor" caption="معامل التحويل" />
          <Column dataField="totalFoodQuantity" caption="اجمالي العلف المستهلك" />
          <Column dataField="totalWoodDust" caption="اجمالي النشارة المستهلكة" />

          <Export enabled={true} allowExportSelectedData={true} />
        </DataGrid> */}
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
          <Column dataField="insertionDate" caption="التاريخ" />
          <Column dataField="age" caption="العمر" />
          <Column dataField="addedChicksNum" caption="عدد الكتاكيت المضافة " visible={false}/>
          <Column dataField="TotalNumOfChicks" caption="عدد الكتاكيت" />
          <Column dataField="deadChicksNum" caption="عدد النوافق"/>
          <Column dataField="consumedFoodQuantityPerDay" caption="العلف المستهلك في اليوم" />
          <Column dataField="consumedWoodDustQuantityPerDay" caption="النشارة المستهلكة في اليوم" />
          <Column dataField="deadRatio" caption="نسبة النوافق"/>
          <Column dataField="conversionFactor" caption="معامل التحويل" />
          <Column dataField="totalFoodQuantity" caption="اجمالي العلف المستهلك" />
          <Column dataField="totalWoodDust" caption="اجمالي النشارة المستهلكة" />

          <Export enabled={true} allowExportSelectedData={true} />
        </DataGrid>
        </div>
        
      </div>
    ) : null;
  }, [dataSource]);

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
                    setIsHidden(false);
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
