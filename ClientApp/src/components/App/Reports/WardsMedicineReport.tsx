import { DataGrid } from "devextreme-react";
import { Scrolling, Column, Export } from "devextreme-react/data-grid";
import React, { useEffect, useMemo, useState } from "react";
import { WardsApi } from "../../../Services/WardsServices";
import { IKeyValuePairsVM } from "../../../VM/KeyValuePairs";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import { WardMedicineReportVM } from "../../../VM/WardMedicineReportVM";
import { FarmServices } from "../../../Services/FarmServices";

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';

const dataGridRef : any = React.createRef();

const WardsMedicineReport = () => {
    function exportGrid() {
        
        const doc = new jsPDF();
        const dataGrid = dataGridRef.current.instance;
        doc.addFont('/Assets/Fonts/JannaLT-Regular.ttf', 'ArabicFont', 'normal');
        doc.setFont('ArabicFont');
    
        exportDataGridToPdf({
          jsPDFDocument: doc,
          component: dataGrid
        }).then(() => {
          doc.save('تقرير ادخال الادوية للعنابر.pdf');
        });
      }

  const [wardsList, setWardsList] = useState<IKeyValuePairsVM[]>([]);
  const [selectedWard, setSelectedWard] = useState<string>();
  const [selectedWardID, setSelectedWardID] = useState<number>(0);
  const [dataSource, setDataSource] = useState<WardMedicineReportVM[]>([]);
  const [isFullWidth, setIsFullWidth] = useState<boolean>(false);
  const onLoad = async () => {
    const data = await WardsApi.getWardsList();
    setWardsList(data);
  };

  const gridDataBind = async (selectedWardID: number) => {
    if (!selectedWardID) {
      selectedWardID = 0;
    }
    const data = await FarmServices.GetWardsMedicineReport(selectedWardID);
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
    if (e.data.consumptionDate) {
      const date = new Date(e.data.consumptionDate);
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
        {/* <Button
          id='exportButton'
          icon='exportpdf'
          text='Export to PDF'
          onClick={exportGrid}
        /> */}
          <DataGrid
            dataSource={dataSource}
            showBorders={true}
            remoteOperations={true}
            showRowLines={true}
            showColumnLines={true}
            columnWidth={140}
            ref={dataGridRef}
          >
            <Scrolling columnRenderingMode="virtual" />

            <Column dataField="iD" visible={false} />

            <Column dataField="wardName" caption="اسم العنبر" />
            <Column dataField="medicineName" caption="اسم الدواء " />
            <Column
              dataField="consumptionDate"
              caption="تاريخ الاستهلاك"
              cellRender={dateCellRender}
            />
            <Column dataField="quantity" caption="الكمية المستهلكة" />
            <Column dataField="totalCost" caption="اجمالي التكلفة" />

            <Export enabled={true} allowExportSelectedData={true} />
          </DataGrid>
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
                  gridDataBind(selectedWardID);
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

export default WardsMedicineReport;
