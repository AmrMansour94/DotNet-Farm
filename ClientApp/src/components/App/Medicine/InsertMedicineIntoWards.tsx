import React, { useEffect, useMemo, useState } from "react";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import { MedicineVM, SelectedMedicineDetails } from "../../../VM/MedicineVM";
import { FarmServices } from "../../../Services/FarmServices";
import { WardsApi } from "../../../Services/WardsServices";
import { IKeyValuePairsVM } from "../../../VM/KeyValuePairs";
import UINotify from "../../UINotify/UINotify";
import Swal from "sweetalert2";

export interface addedMedQuantityTOWardSaveModel {
  ID: number;
  WardID: number;
  MedicineID: number;
  ConsumptionDate: string;
  Quantity: number;
  TotalCost: number;
}

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
  const [addDate, setAddDate] = useState<string>(new Date().toISOString());
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [MedicineDetails, setMedicineDetails] =
    useState<SelectedMedicineDetails>();

  const onLoad = async () => {
    const medList = await FarmServices.GetMedicineList();
    setMedicineList(medList);
    const wardsList = await WardsApi.getWardsList();
    setWardsList(wardsList);
  };

  async function GetMedicineDetails(ID: number) {
    debugger;
    const data = await FarmServices.GetMedicineDetails(ID);
    console.log(data);
    setMedicineDetails(data);
  }

  useEffect(() => {
    if (selectedMedicineID) GetMedicineDetails(selectedMedicineID);
  }, [selectedMedicineID]);

  useEffect(() => {
    onLoad();
  }, []);

  useEffect(() => {}, [
    MedicineList,
    selectedMedicineID,
    wardsList,
    selectedWardID,
    addedQuantity,
    addDate,
    MedicineDetails,
    isHidden,
  ]);

  useEffect(() => {
    for (const med of MedicineList) {
      if (med.name == selectedMedicineName) {
        setSelectedMedicineID(med.id);
        setIsHidden(false);
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
            <option title={Med.notes} key={Med.id} accessKey={String(Med.id)}>
              {Med.name}
            </option>
          );
        })}
      </select>
    );
  }, [MedicineList]);

  const medicineDetails = useMemo(() => {
    return MedicineDetails ? (
      <div hidden={isHidden}>
        <div
          className="row"
          style={{
            margin: "20px",
            direction: "rtl",
            // border: "1px solid",
            // borderRadius: "5px",
            // borderColor: "wheat",
            // height: "30px",
          }}
        >
          <div className="col-md-4">
            <span
              style={{
                textShadow: "4px 4px 8px #f2cfff",
                fontWeight: 900,
                fontSize: "125%",
                float: "right",
              }}
            >
              اسم الدواء:
            </span>
          </div>
          <div className="col-md-2">
            <span
              style={{
                textShadow: "4px 4px 8px #f2cfff",
                fontWeight: 900,
                fontSize: "125%",
                float: "right",
              }}
            >
              {MedicineDetails?.medicineDetails.name}
            </span>
          </div>
          <div className="col-md-4">
            <span
              style={{
                textShadow: "4px 4px 8px #f2cfff",
                fontWeight: 900,
                fontSize: "125%",
                float: "right",
              }}
            >
              اسم الشركة:
            </span>
          </div>
          <div className="col-md-2">
            <span
              style={{
                textShadow: "4px 4px 8px #f2cfff",
                fontWeight: 900,
                fontSize: "125%",
                float: "right",
              }}
            >
              {MedicineDetails?.medicineDetails.companyName}
            </span>
          </div>
        </div>

        <div
          className="row"
          style={{
            margin: "20px",
            direction: "rtl",
            // border: "1px solid",
            // borderRadius: "5px",
            // borderColor: "wheat",
            // height: "30px",
          }}
        >
          <div className="col-md-4">
            <span
              style={{
                textShadow: "4px 4px 8px #f2cfff",
                fontWeight: 900,
                fontSize: "125%",
                float: "right",
              }}
            >
              الكمية المتاحة في المخزن:
            </span>
          </div>
          <div className="col-md-2">
            <span
              style={{
                textShadow: "4px 4px 8px #f2cfff",
                fontWeight: 900,
                fontSize: "125%",
                float: "right",
              }}
            >
              {MedicineDetails?.medicineStock.currentStockQuantity}{" "}
              {MedicineDetails?.medicineDetails.unit}
            </span>
          </div>
          <div className="col-md-4">
            <span
              style={{
                textShadow: "4px 4px 8px #f2cfff",
                fontWeight: 900,
                fontSize: "125%",
                float: "right",
              }}
            >
              قيمة الكمية الحالية:
            </span>
          </div>
          <div className="col-md-2">
            <span
              style={{
                textShadow: "4px 4px 8px #f2cfff",
                fontWeight: 900,
                fontSize: "125%",
                float: "right",
              }}
            >
              {MedicineDetails?.medicineStock.stockCurrentMedicineValue} جنيه
            </span>
          </div>
        </div>

        {MedicineDetails?.medicineDetails.notes ? (
          <div
            className="row"
            style={{
              margin: "20px",
              direction: "rtl",
              //   border: "1px solid",
              //   borderRadius: "5px",
              //   borderColor: "wheat",
              //   height: "30px",
            }}
          >
            <div className="col-md-4">
              <span
                style={{
                  textShadow: "4px 4px 8px #f2cfff",
                  fontWeight: 900,
                  fontSize: "125%",
                  float: "right",
                }}
              >
                تفاصيل الدواء:
              </span>
            </div>
            <div className="col-md-8">
              <span
                style={{
                  textShadow: "4px 4px 8px #f2cfff",
                  fontWeight: 900,
                  fontSize: "125%",
                  float: "right",
                }}
              >
                {MedicineDetails?.medicineDetails.notes}
              </span>
            </div>
          </div>
        ) : null}
      </div>
    ) : null;
  }, [MedicineDetails, isHidden]);

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

  async function onSaveClick() {
    if (!selectedMedicineID) {
      UINotify.error("يرجي اختيار نوع الدواء");
    } else if (!selectedWardID) {
      UINotify.error("يرجي اختيار العنبر");
    } else if (!addedQuantity) {
      UINotify.error("يرجي ادخال الكمية المضافة");
    } else if (
      MedicineDetails &&
      addedQuantity > MedicineDetails?.medicineStock.currentStockQuantity
    ) {
      UINotify.error("الكمية المضافة اكبر من الكمية المتاحة حاليا في المخزن");
    } else {
      let saveVM: addedMedQuantityTOWardSaveModel = {
        ID: 0,
        MedicineID: selectedMedicineID,
        WardID: selectedWardID,
        ConsumptionDate: addDate,
        Quantity: addedQuantity,
        TotalCost: 0,
      };
      debugger
      const res = await FarmServices.AddMedicineToWards(saveVM);
      if (res == "") {
        Swal.fire({
          icon: "success",
          title: "تم الحفظ بنجاح",
          showConfirmButton: false,
          timer: 2000,
        });
        GetMedicineDetails(selectedMedicineID);
      } else {
        debugger;
        Swal.fire({
          icon: "error",
          title: "عذرا",
          text: res,
        });
      }
    }
  }

  return (
    <>
      <div className="card-body">
        {medicineDetails}
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
            <div className="col-md-6">{wards}</div>
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
                  setAddDate(new Date(e.target.value).toISOString());
                  console.log(new Date(e.target.value).toISOString());
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
