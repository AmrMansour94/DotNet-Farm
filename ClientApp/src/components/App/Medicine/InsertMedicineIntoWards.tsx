import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { storeState } from "../../..";
import { LoginInitialState } from "../../../LoginReducer";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import { MedicineVM } from "../../../VM/MedicineVM";
import { FarmServices } from "../../../Services/FarmServices";
import { WardsApi } from "../../../Services/WardsServices";
import { IKeyValuePairsVM } from "../../../VM/KeyValuePairs";
import { wardDailyReportVM } from "../../../VM/WardContentVM";

const InsertMedicineIntoWards = () => {

      // التاريخ الافتراضي تاريخ اليوم
  var curr = new Date();
  curr.setDate(curr.getDate());
  var defaultDate = curr.toISOString().substr(0, 10);

  //   const [MedicineName, setMedicineName] = useState<string>("");
  //   const [CompanyName, setCompanyName] = useState<string>("");
  //   const [UnitType, setUnitType] = useState<string>("");
  const [selectedMedicineID, setSelectedMedicineID] = useState<number>(0);
  const [addedQuantity, setAddedQuantity] = useState<number>(0);
  const [selectedMedicineName, setSelectedMedicineName] = useState<string>("");
  const [MedicineList, setMedicineList] = useState<MedicineVM[]>([]);
  const [wardsList, setWardsList] = useState<IKeyValuePairsVM[]>([]);
  const [selectedWard, setSelectedWard] = useState<string>();
  const [selectedWardID, setSelectedWardID] = useState<number>(0);
  const [addDate, setAddDate] = useState<Date>(new Date(defaultDate));

  const onLoad = async () => {
    // const medList = await FarmServices.GetMedicineList();
    // setMedicineList(medList);
    const wardsList = await WardsApi.getWardsList();
    setWardsList(wardsList);
  };

  useEffect(() => {
    onLoad();
  }, []);

  useEffect(() => {}, [
    MedicineList,
    selectedMedicineID,
    wardsList,
    selectedWardID,
    addedQuantity,
    addDate
  ]);
  useEffect(() => {
    for (const med of MedicineList) {
      if (med.name == selectedMedicineName) {
        setSelectedMedicineID(med.iD);
        break;
      } else {
        setSelectedMedicineID(0);
      }
    }
  }, [selectedMedicineName]);

  useEffect(() => {
    for (const ward of wardsList) {
      if (ward.Name == selectedWard) {
        setSelectedWardID(ward.ID);
        break;
      } else {
        setSelectedWardID(0);
      }
    }
  }, [selectedWard]);

  const medicine = useMemo(() => {
    return (
      <select
        className="form-control selectpicker"
        data-style="btn btn-link"
        id="exampleFormControlSelect1"
        onChange={(e: any) => {
          setSelectedMedicineName(e.target.value);
        }}
        style={{
          fontWeight: 900,
          fontSize: "125%",
        }}
      >
        <option>--</option>
        {MedicineList.map((Med: MedicineVM) => {
          return (
            <option title={Med.notes} key={Med.iD} accessKey={String(Med.iD)}>
              {Med.name}
            </option>
          );
        })}
      </select>
    );
  }, [MedicineList]);

  const wards = useMemo(() => {
    return (
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
    );
  }, [wardsList]);

  function onSaveClick() {}

  return (
    <>
      <div className="card-body">
        <div className="card">
          <div className="row" style={{ margin: "20px", direction: "rtl" }}>
            <div className="col-md-2"></div>
            <div className="col-md-3">
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
            <div className="col-md-6">{medicine}</div>
          </div>

          <div className="row" style={{ margin: "20px", direction: "rtl" }}>
            <div className="col-md-2"></div>
            <div className="col-md-3">
              <span
                style={{
                  textShadow: "4px 4px 8px #f2cfff",
                  fontWeight: 900,
                  fontSize: "125%",
                }}
              >
                اسم العنبر :
              </span>
            </div>
            <div className="col-md-6">
              {wards}
            </div>
          </div>


          <div className="row" style={{ margin: "20px", direction: "rtl" }}>
            <div className="col-md-2"></div>
            <div className="col-md-3">
              <span
                style={{
                  textShadow: "4px 4px 8px #f2cfff",
                  fontWeight: 900,
                  fontSize: "125%",
                }}
              >
                الكمية المضافة :
              </span>
            </div>
            <div className="col-md-6">
            <input
                type="number"
                className="form-control"
                placeholder="الكمية المضافة..."
                min={0}
                step={0.01}
                dir="rtl"
                onChange={(e: any) => {
                    setAddedQuantity(Number(e.target.value));
                  }}
                style={{
                  fontWeight: 900,
                  fontSize: "125%",
                }}
              />
            </div>
          </div>

          <div className="row" style={{ margin: "20px", direction: "rtl" }}>
            <div className="col-md-2"></div>
            <div className="col-md-3">
              <span
                style={{
                  textShadow: "4px 4px 8px #f2cfff",
                  fontWeight: 900,
                  fontSize: "125%",
                }}
              >
                تاريخ الاضافة :
              </span>
            </div>
            <div className="col-md-6">
            <input
                type="date"
                className="form-control"
                placeholder="تاريخ الاضافة..."
                defaultValue={defaultDate}
                onChange={(e: any) => {
                    setAddDate(new Date(e.target.value));
                    console.log(new Date(e.target.value))
                  }}
                dir="rtl"
                style={{
                  fontWeight: 900,
                  fontSize: "125%",
                }}
              />
            </div>
          </div>



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
              اضافة
            </label>
          </button>
        </div>

        <div className="col-md-3"></div>
      </div>
    </>
  );
};

export default InsertMedicineIntoWards;
