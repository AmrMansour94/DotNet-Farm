import React, { useEffect, useState } from "react";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";

const AddNewMedicine = () => {
  const [MedicineName, setMedicineName] = useState<string>("");
  const [CompanyName, setCompanyName] = useState<string>("");
  const [UnitType, setUnitType] = useState<string>("");
  const [UnitPrice, setUnitPrice] = useState<number>(0);
  const [Notes, setNotes] = useState<string>("");

  const onLoad = async () => {};

  useEffect(() => {
    onLoad();
  }, []);

  useEffect(() => {}, [MedicineName, CompanyName, UnitType, UnitPrice, Notes]);

  function onSaveClick() {}

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
            اسم الدواء :
          </span>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            onChange={(e: any) => {
              setMedicineName(e.target.value);
            }}
            className="form-control"
            placeholder="اسم الدواء..."
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
            اسم الشركة :
          </span>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="اسم الشركة..."
            onChange={(e: any) => {
              setCompanyName(e.target.value);
            }}
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
            نوع الوحدة :
          </span>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="نوع الوحدة..."
            onChange={(e: any) => {
              setUnitType(e.target.value);
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
            تكلفة الوحدة :
          </span>
        </div>
        <div className="col-md-4">
          <input
            type="number"
            min={0}
            step=".01"
            onChange={(e: any) => {
              setUnitPrice(Number(e.target.value));
            }}
            className="form-control"
            placeholder="تكلفة الوحدة بالجنيه..."
            style={{
              fontWeight: 900,
              fontSize: "125%",
            }}
          />
        </div>
      </div>

      <div className="row" style={{ margin: "20px", direction: "rtl" }}>
        <div className="col-md-2">
          <span
            style={{
              textShadow: "4px 4px 8px #f2cfff",
              fontWeight: 900,
              fontSize: "125%",
              float: "left",
              display: "flex",
              marginTop: "20px",
            }}
          >
            ملاحظات :
          </span>
        </div>
        <div className="col-md-9">
          <textarea
            onChange={(e: any) => {
              setNotes(e.target.value);
            }}
            className="form-control"
            placeholder="ملاحظات..."
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
            <BusinessCenterIcon />{" "}
            <label
              style={{
                color: "white",
                fontWeight: 1100,
                fontSize: "160%",
              }}
            >
              حفظ
            </label>
          </button>
        </div>

        <div className="col-md-3"></div>
      </div>
    </>
  );
};

export default AddNewMedicine;
