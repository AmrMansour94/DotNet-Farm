import React, { useEffect, useMemo, useState } from "react";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import { FarmServices } from "../../../Services/FarmServices";
import { EmployeesVM } from "../../../VM/EmployeesVM";
import DataGrid, {
  Column,
  Editing,
  Export,
  Scrolling,
  Texts,
} from "devextreme-react/data-grid";
import Swal from "sweetalert2";
import UINotify from "../../UINotify/UINotify";

const EmployeesList = () => {
  const [EmployeesList, setEmployeesList] = useState<EmployeesVM[]>([]);
  //   const [EmploymentDate, setEmploymentDate] = useState<Date>();
  //   const [PhoneNumber, setPhoneNumber] = useState<string>("");
  //   const [PlaceOfbirth, setPlaceOfbirth] = useState<string>("");

  async function onload() {
    const data = await FarmServices.GetEmployees();
    setEmployeesList(data);
  }

  useEffect(() => {
    onload();
  }, []);

  useEffect(() => {}, [EmployeesList]);

  async function onRowRemoving(e: any) {
    e.cancel = true;
    Swal.fire({
      title: "هل تريد الحذف؟",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `ايقاف تفعيل`,
      denyButtonText: `حذف نهائي`,
      cancelButtonText: "الغاء",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (Number(e.data.id)) {
          const res = await FarmServices.StopEmployee(Number(e.data.id));
          if (res == "") {
            UINotify.success("تم ايقاف الموظف بنجاح");
            onload();
          } else
            Swal.fire({
              icon: "error",
              title: "عذرا",
              text: res,
            });
        } else {
          UINotify.error("لم يتم اختيار موظف");
        }
      } else if (result.isDenied) {
        if (Number(e.data.id)) {
          const res = await FarmServices.DeleteEmployee(Number(e.data.id));
          if (res == "") {
            UINotify.success("تم حذف الموظف بنجاح");
            onload();
          } else
            Swal.fire({
              icon: "error",
              title: "عذرا",
              text: res,
            });
        } else {
          UINotify.error("لم يتم اختيار موظف");
        }
      }
    });
  }
  const dateRender = (e:any) =>{
    const date = new Date(e.data.employmentDate)
    return date.toISOString().split("T")[0]
  }
  const isActiveCellRender = (e: any) => {
    if (e.data.isActive == true) {
      return "مفعل";
    } else return "موقوف";
  };

  const dataGrid = useMemo(() => {
    return (
      <DataGrid
        dataSource={EmployeesList}
        showBorders={true}
        remoteOperations={true}
        showRowLines={true}
        showColumnLines={true}
        onRowRemoving={onRowRemoving}
      >
        <Editing allowDeleting={true} useIcons={true}>
          <Texts confirmDeleteMessage="" />
        </Editing>
        <Scrolling columnRenderingMode="virtual" />

        <Column dataField="iD" visible={false} />
        <Column dataField="name" caption="اسم الموظف" width="33%" />
        <Column dataField="employmentDate" caption="تاريخ التعيين" cellRender={dateRender} />
        <Column dataField="phoneNumber" caption="رقم الموبايل" />
        <Column
          dataField="isActive"
          caption="علي قيد العمل"
          cellRender={isActiveCellRender}
        />

        <Export enabled={true} allowExportSelectedData={true} />
      </DataGrid>
    );
  }, [EmployeesList]);

  return (
    <>
      <div className="row" style={{ margin: "20px", direction: "rtl" }}>
        {dataGrid}
      </div>
      {/* <div className="row" style={{ margin: "20px", direction: "rtl" }}>
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <button
            className="btn btn-primary btn-round"
            style={{ alignSelf: "center", width: "100%" }}
            onClick={onSaveClick}
          >
            <SupervisorAccountIcon />{" "}
            <label
              style={{
                color: "white",
                fontWeight: 1100,
                fontSize: "160%",
              }}
            >
              حفظ التعديلات
            </label>
          </button>
        </div>

        <div className="col-md-3"></div>
      </div> */}
    </>
  );
};

export default EmployeesList;
