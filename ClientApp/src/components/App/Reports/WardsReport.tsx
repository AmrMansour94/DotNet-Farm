import { DataGrid } from "devextreme-react";
import { Scrolling, Column } from "devextreme-react/data-grid";
import React, { useState } from "react";

interface Iprops {
  selectedReport: number;
}
const dataSource = [
  { Order: 1, Name: "Amr", Age: "27" },
  { Order: 2, Name: "Samar", Age: "27" },
  { Order: 3, Name: "Lojy", Age: "2" },
  { Order: 1, Name: "Amr", Age: "27" },
  { Order: 2, Name: "Samar", Age: "27" },
  { Order: 3, Name: "Lojy", Age: "2" },
];

const WardsReport = (props: Iprops) => {
  return (
    <div>
      <DataGrid
        dataSource={dataSource}
        showBorders={true}
        remoteOperations={true}
        showRowLines={true}
        showColumnLines = {true}
      >
        <Scrolling mode="virtual" />
        <Column caption="#" setCellValue={"#"} width={50}/>
        <Column dataField="Name" caption="الاسم" />
        <Column dataField="Age" caption="العمر" />
      </DataGrid>
    </div>
  );
};

export default WardsReport;
