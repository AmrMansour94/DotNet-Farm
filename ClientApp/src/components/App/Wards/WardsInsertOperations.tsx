import React, { useEffect, useState } from "react";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import { useSelector } from "react-redux";
import { storeState } from "../../..";
import { LoginInitialState } from "../../../LoginReducer";
import { SaveWardNewQuantitiesVM } from "../../../VM/WardContentVM";
import Swal from "sweetalert2";
import { StockApi } from "../../../Services/StockServices";
import { WardsApi } from "../../../Services/WardsServices";

interface IProps {
  wardID : number
}
const WardsInsertOperations = (props : IProps) => {
  const { User } = useSelector<storeState, LoginInitialState>(
    (state: storeState) => {
      return {
        User: state.Login.User,
      };
    }
  );

  const [addedChicksNumber, setAddedChicksNumber] = useState<number>(0);
  const [addedFoodQuantity, setAddedFoodQuantity] = useState<number>(0);
  const [addedWoodDustQuantity, setAddedWoodDustQuantity] = useState<number>(0);
  const [deadChicksNumber, setDeadChicksNumber] = useState<number>(0);
  const [avgBirdWeight, setAvgBirdWeight] = useState<number>(0);

  const onLoad = async () => {
    if (!User) {
      window.location.href = "/Login";
    }
  };

  useEffect(() => {
    onLoad();
  }, []);
  useEffect(() => {}, [
    addedChicksNumber,
    addedFoodQuantity,
    addedWoodDustQuantity,
    avgBirdWeight,
    deadChicksNumber,
  ]);

function collectParams() {
    let params: SaveWardNewQuantitiesVM = {
      wardID : props.wardID,
      addedChicksNum: addedChicksNumber,
      addedFoodQuantity: addedFoodQuantity,
      addedWoodDustQuantity: addedWoodDustQuantity,
      deadChicksNum : deadChicksNumber,
      avgBirdWeight: avgBirdWeight,
    };

    return params;
  }

  const onSaveClick = async () => {
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
          const res = await WardsApi.saveNewQuantities(params);
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
    <>
      {/* Line 2 */}

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
          ادخال البيانات اليومية للعنبر
        </span>
      </div>
      <div className="row" style={{ margin: "20px", direction: "rtl" }}>
        <div className="col-md-2">
          <span
            style={{
              textShadow: "4px 4px 8px #f2cfff",
              fontWeight: 900,
              fontSize: "125%",
            }}
          >
            عدد الكتاكيت المضافة:
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
            عدد النوافق:
          </span>
        </div>
        <div className="col-md-4">
          <input
            type="number"
            min={0}
            className="form-control"
            placeholder="عدد النوافق..."
            onChange={(e: any) => {
              setDeadChicksNumber(Number(e.target.value));
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
            كمية العلف المستهلكة:
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
            كمية النشارة المستهلكة:
          </span>
        </div>
        <div className="col-md-4">
          <input
            type="number"
            min={0}
            step=".001"
            className="form-control"
            placeholder="كمية النشارة..."
            onChange={(e: any) => {
              setAddedWoodDustQuantity(Number(e.target.value));
            }}
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
            }}
          >
            متوسط الوزن للطائر:
          </span>
        </div>

        <div className="col-md-4">
          <input
            type="number"
            min={0}
            step=".001"
            className="form-control"
            placeholder="متوسط وزن الطائر..."
            onChange={(e: any) => {
              setAvgBirdWeight(Number(e.target.value));
            }}
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
            <FavoriteBorderRoundedIcon />{" "}
            <label
              style={{
                color: "white",
                fontWeight: 900,
                fontSize: "125%",
              }}
            >
              اضافة الي العنبر
            </label>
          </button>
        </div>

        <div className="col-md-3"></div>
      </div>
    </>
  );
};

export default WardsInsertOperations;
