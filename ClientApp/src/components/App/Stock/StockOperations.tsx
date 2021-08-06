import React, { useEffect, useState } from "react";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import Swal from "sweetalert2";
import { StockApi } from "../../../Services/StockServices";
import { SaveNewQuantitiesVM } from "../../../VM/StockVM";

const StockOperations = () => {
  const [addedChicksNumber, setAddedChicksNumber] = useState<number>(0);
  const [addedFoodQuantity, setAddedFoodQuantity] = useState<number>(0);
  const [addedWoodDustQuantity, setAddedWoodDustQuantity] = useState<number>(0);
  const [AgeInDays, setAgeInDays] = useState<number>(0);
  const [IsDisabled, setIsDisabled] = useState<boolean>(true);

  const onLoad = async () => {

  };

  useEffect(() => {
    onLoad();
  }, []);
  useEffect(() => {
    if (addedChicksNumber) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [addedChicksNumber]);
  useEffect(() => {}, [
    addedChicksNumber,
    addedFoodQuantity,
    addedWoodDustQuantity,
    AgeInDays,
    IsDisabled,
  ]);

  function collectParams() {
    let params: SaveNewQuantitiesVM = {
      addedChicksNum: addedChicksNumber,
      addedFoodQuantity: addedFoodQuantity,
      addedWoodDustQuantity: addedWoodDustQuantity,
      AgeInDays: AgeInDays,
    };

    return params;
  }

  const saveValuesButtonClick = async () => {
    const params = collectParams();
    debugger;
    if (
      !(
        params.addedChicksNum ||
        params.addedFoodQuantity ||
        params.addedWoodDustQuantity
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "عذرا",
        text: "يرجي ادخال قيمة واحدة علي الاقل للحفظ",
      });
    } else {
      Swal.fire({
        title: "هل تريد الحفظ؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم",
        cancelButtonText: "لا",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await StockApi.saveNewQuantities(params);
          if (res == "") {
            Swal.fire({
              icon: "success",
              title: "تم الحفظ بنجاح",
              showConfirmButton: false,
              timer: 2000,
            });
            onLoad();
          } else {
            debugger;
            Swal.fire({
              icon: "error",
              title: "عذرا",
              text: res,
            });
          }
        }
      });
    }
  };

  return (
    <div>
      <div className="row justify-content-center" style={{ margin: "20px" }}>
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
          ادخال كميات جديدة للمخزن
        </span>
      </div>
      {/* Line 1 */}

      <div className="row" style={{ margin: "20px" }}>
        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="عمر الكتاكيت المضافة..."
            min={0}
            onChange={(e: any) => setAgeInDays(Number(e.target.value))}
            disabled={IsDisabled}
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
            :عمر الكتاكيت المضافة
          </span>
        </div>
        <div className="col-md-4">
          <input
            type="number"
            min={0}
            onChange={(e: any) => {
              setAddedChicksNumber(Number(e.target.value));
            }}
            className="form-control"
            placeholder="عدد الكتاكيت..."
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
            :عدد الكتاكيت المضافة
          </span>
        </div>
      </div>

      {/* Line 2 */}

      <div className="row" style={{ margin: "20px" }}>
        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="كمية النشارة..."
            min={0}
            step=".001"
            onChange={(e: any) => {
              setAddedWoodDustQuantity(Number(e.target.value));
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
            :كمية النشارة
          </span>
        </div>

        <div className="col-md-4">
          <input
            type="number"
            min={0}
            step=".001"
            onChange={(e: any) => {
              setAddedFoodQuantity(Number(e.target.value));
            }}
            className="form-control"
            placeholder="كمية العلف..."
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
            :كمية العلف
          </span>
        </div>
      </div>
      <div className="row" style={{ margin: "20px" }}>
        <div className="col-md-3"></div>

        <div className="col-md-6">
          <button
            className="btn btn-primary btn-round"
            style={{ alignSelf: "center", width: "100%" }}
            onClick={saveValuesButtonClick}
          >
            <PlaylistAddIcon />{" "}
            <label
              style={{
                color: "white",
                fontWeight: 900,
                fontSize: "125%",
              }}
            >
              اضافة الي المخزن
            </label>
          </button>
        </div>

        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

export default StockOperations;
