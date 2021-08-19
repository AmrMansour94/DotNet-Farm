import React, { useEffect, useMemo, useState } from "react";
import PaymentIcon from "@material-ui/icons/Payment";
import { FarmServices } from "../../../Services/FarmServices";
import { EmployeesVM } from "../../../VM/EmployeesVM";
import { ExpenseSaveVM } from "../../../VM/ExpenseSaveVM";
import UINotify from "../../UINotify/UINotify";
import Swal from "sweetalert2";

const Expenses = () => {
  // التاريخ الافتراضي تاريخ اليوم
  var curr = new Date();
  curr.setDate(curr.getDate());
  var defaultDate = curr.toISOString().substr(0, 10);

  const [EmployeesList, setEmployeesList] = useState<EmployeesVM[]>([]);
  const [selectedEmpName, setSelectedEmpName] = useState<string>("");
  const [BandName, setBandName] = useState<string>("");
  const [selectedEmpID, setSelectedEmpID] = useState<number>(0);
  const [costValue, setCostValue] = useState<number>(0);
  const [addDate, setAddDate] = useState<string>(new Date().toISOString());

  async function onload() {
    const data = await FarmServices.GetEmployees();
    setEmployeesList(data);
  }

  function clearState() {
    setSelectedEmpName("--");
    setBandName("");
    setCostValue(0);
  }

  useEffect(() => {
    onload();
  }, []);

  useEffect(() => {}, [
    EmployeesList,
    selectedEmpID,
    costValue,
    addDate,
    BandName,
  ]);
  useEffect(() => {
    debugger;
    for (const emp of EmployeesList) {
      if (emp.name == selectedEmpName) {
        setSelectedEmpID(emp.id);
        break;
      } else {
        setSelectedEmpID(0);
      }
    }
  }, [selectedEmpName]);

  async function onSaveClick() {
    let newExpense: ExpenseSaveVM = {
      ID: 0,
      BandName: BandName,
      Value: costValue,
      ExpenseDate: addDate,
      EmployeeID: selectedEmpID,
    };
    if (!newExpense.BandName) UINotify.error("يرجي ادخال اسم البند");
    else if (!newExpense.Value) UINotify.error("يرجي ادخال قيمة البند ");
    else {
      debugger;
      if (newExpense.EmployeeID == 0) newExpense.EmployeeID = null;

      const res = await FarmServices.SaveExpenses(newExpense);
      if (res == "") {
        Swal.fire({
          icon: "success",
          title: "تم الحفظ بنجاح",
          showConfirmButton: false,
          timer: 3000,
        });
        clearState();
      } else
        Swal.fire({
          icon: "error",
          title: "عذرا",
          text: res,
        });
    }
  }

  const employees = useMemo(() => {
    return (
      <select
        className="form-control selectpicker"
        data-style="btn btn-link"
        id="exampleFormControlSelect1"
        dir="rtl"
        onChange={(e: any) => {
          setSelectedEmpName(e.target.value);
        }}
        style={{
          fontWeight: 900,
          fontSize: "125%",
        }}
      >
        <option>--</option>
        {EmployeesList.map((emp: EmployeesVM) => {
          return (
            <option title={emp.name} key={emp.id} accessKey={String(emp.id)}>
              {emp.name}
            </option>
          );
        })}
      </select>
    );
  }, [EmployeesList]);
  return (
    <div className="card">
      <div className="card-header card-header-text card-header-primary">
        <div className="card-text">
          <h4 className="card-title" style={{ textAlign: "center" }}>
            مصروفات اضافية
          </h4>
        </div>
      </div>
      <div className="card-body">
        <div className="card">
          <div
            className="row justify-content-center"
            style={{ margin: "20px" }}
          >
            <span
              className="badge badge-pill badge-info center"
              style={{
                fontWeight: 900,
                fontSize: "125%",
                display: "inline-block",
                margin: "10px 10px 0 0",
                padding: "5px 10px",
                width: "60%",
              }}
            >
              اضافة مصروفات جديدة
            </span>
          </div>

          {/* Line 1*/}
          <div className="row" style={{ margin: "20px" }}>
            <div className="col-md-2"></div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="اسم البند..."
                dir="rtl"
                style={{
                  fontWeight: 900,
                  fontSize: "125%",
                }}
                onChange={(e: any) => {
                  setBandName(e.target.value);
                }}
              />
            </div>
            <div className="col-md-3">
              <span
                style={{
                  textShadow: "4px 4px 8px #f2cfff",
                  fontWeight: 900,
                  fontSize: "125%",
                  float: "right",
                }}
              >
                :اسم البند
              </span>
            </div>
            <div className="col-md-1"></div>
          </div>

          {/* Line 2 */}
          <div className="row" style={{ margin: "20px" }}>
            <div className="col-md-2"></div>
            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                placeholder="المبلغ بالجنيه..."
                min={0}
                step={0.001}
                dir="rtl"
                onChange={(e: any) => {
                  setCostValue(Number(e.target.value));
                }}
                style={{
                  fontWeight: 900,
                  fontSize: "125%",
                }}
              />
            </div>

            <div className="col-md-3">
              <span
                style={{
                  textShadow: "4px 4px 8px #f2cfff",
                  fontWeight: 900,
                  fontSize: "125%",
                  float: "right",
                }}
              >
                :المبلغ المدفوع
              </span>
            </div>
            <div className="col-md-1"></div>
          </div>

          {/* Line 3 */}
          <div className="row" style={{ margin: "20px" }}>
            <div className="col-md-2"></div>
            <div className="col-md-6">
              <input
                type="date"
                className="form-control"
                placeholder="تاريخ الصرف..."
                defaultValue={defaultDate}
                onChange={(e: any) => {
                  setAddDate(new Date(e.target.value).toISOString());
                }}
                dir="rtl"
                style={{
                  fontWeight: 900,
                  fontSize: "125%",
                }}
              />
            </div>

            <div className="col-md-3">
              <span
                style={{
                  textShadow: "4px 4px 8px #f2cfff",
                  fontWeight: 900,
                  fontSize: "125%",
                  float: "right",
                }}
              >
                :التاريخ
              </span>
            </div>
            <div className="col-md-1"></div>
          </div>

          <div className="row" style={{ margin: "20px" }}>
            <div className="col-md-2"></div>
            <div className="col-md-6">{employees}</div>

            <div className="col-md-3">
              <span
                style={{
                  textShadow: "4px 4px 8px #f2cfff",
                  fontWeight: 900,
                  fontSize: "125%",
                  float: "right",
                }}
              >
                :اسم الموظف
              </span>
            </div>
            <div className="col-md-1"></div>
          </div>

          <div className="row" style={{ margin: "20px" }}>
            <div className="col-md-3"></div>

            <div className="col-md-6">
              <button
                className="btn btn-primary btn-round"
                style={{ alignSelf: "center", width: "100%" }}
                onClick={onSaveClick}
              >
                <PaymentIcon />{" "}
                <label
                  style={{
                    color: "white",
                    fontWeight: 900,
                    fontSize: "130%",
                  }}
                >
                  اضافة الي المصروفات
                </label>
              </button>
            </div>

            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
