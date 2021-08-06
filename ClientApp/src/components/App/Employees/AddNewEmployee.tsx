import React, { useEffect, useState } from "react";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import UINotify from "../../UINotify/UINotify";
import { EmployeesSaveVM, EmployeesVM } from "../../../VM/EmployeesVM";
import { FarmServices } from "../../../Services/FarmServices";
import Swal from "sweetalert2";

const AddNewEmployee = () => {
  // التاريخ الافتراضي تاريخ اليوم
  var curr = new Date();
  curr.setDate(curr.getDate());
  var defaultDate = curr.toISOString().substr(0, 10);

  const [EmployeeName, setEmployeeName] = useState<string>("");
  const [EmploymentDate, setEmploymentDate] = useState<string>(
    new Date().toISOString()
  );
  const [PhoneNumber, setPhoneNumber] = useState<string>("");
  const [PlaceOfbirth, setPlaceOfbirth] = useState<string>("");

  useEffect(() => {}, [
    EmployeeName,
    EmploymentDate,
    PhoneNumber,
    PlaceOfbirth,
  ]);

  async function onSaveClick() {
    if (!EmployeeName.trim()) {
      UINotify.error("يرجي ادخال اسم الموظف");
    } else if (!EmploymentDate.trim()) {
      UINotify.error("يرجي ادخال تاريخ التعيين");
    }
    let employee: EmployeesSaveVM = {
      iD: 0,
      name: EmployeeName,
      employmentDate: EmploymentDate,
      isActive: true,
      phoneNumber: PhoneNumber,
      unEmploymentDate: null,
    };

    const res = await FarmServices.AddNewEmployee(employee)
    if (res == "") {
      Swal.fire({
        icon: "success",
        title: "تم الحفظ بنجاح",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      debugger;
      Swal.fire({
        icon: "error",
        title: "عذرا",
        text: res,
      });
    }
  }

  return (
    <>
      <div className="row" style={{ margin: "20px", direction: "rtl" }}>
        <div className="col-md-2">
          <span
            style={{
              textShadow: "4px 4px 8px #f2cfff",
              fontWeight: 900,
              fontSize: "125%",
            }}
          >
            اسم الموظف :
          </span>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            onChange={(e: any) => {
              setEmployeeName(e.target.value);
            }}
            className="form-control"
            placeholder="اسم الموظف..."
            style={{
              fontWeight: 900,
              fontSize: "125%",
            }}
          />
        </div>

        <div className="col-md-2">
          <span
            style={{
              textShadow: "4px 4px 8px #f2cfff",
              fontWeight: 900,
              fontSize: "125%",
            }}
          >
            تاريخ التعيين :
          </span>
        </div>
        <div className="col-md-4">
          <input
            type="date"
            className="form-control"
            placeholder="تاريخ التعيين..."
            defaultValue={defaultDate}
            onChange={(e: any) => {
              setEmploymentDate(new Date(e.target.value).toISOString());
            }}
            dir="rtl"
            style={{
              fontWeight: 900,
              fontSize: "125%",
            }}
          />
        </div>
      </div>

      {/* Line 2 */}

      <div className="row" style={{ margin: "20px", direction: "rtl" }}>
        <div className="col-md-2">
          <span
            style={{
              textShadow: "4px 4px 8px #f2cfff",
              fontWeight: 900,
              fontSize: "125%",
            }}
          >
            رقم الموبايل :
          </span>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="رقم الموبايل..."
            onChange={(e: any) => {
              setPhoneNumber(e.target.value);
            }}
            style={{
              fontWeight: 900,
              fontSize: "125%",
            }}
          />
        </div>

        <div className="col-md-2">
          <span
            style={{
              textShadow: "4px 4px 8px #f2cfff",
              fontWeight: 900,
              fontSize: "125%",
            }}
          >
            محل الاقامة :
          </span>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            min={0}
            step=".01"
            onChange={(e: any) => {
              setPlaceOfbirth(e.target.value);
            }}
            className="form-control"
            placeholder="محل الاقامة..."
            style={{
              fontWeight: 900,
              fontSize: "125%",
            }}
          />
        </div>
      </div>

      <div className="row" style={{ margin: "20px" }}>
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
              حفظ الموظف
            </label>
          </button>
        </div>

        <div className="col-md-3"></div>
      </div>
    </>
  );
};

export default AddNewEmployee;
