import React, { useEffect, useMemo, useState } from "react";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import { FarmServices } from "../../../Services/FarmServices";
import Swal from "sweetalert2";
import UINotify from "../../UINotify/UINotify";
import { PricesSaveVM } from "../../../VM/PricesSaveVM";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

const AddOrUpdatePrices = () => {
  const [FoodPrice, setFoodPrice] = useState<number>(0);
  const [DustPrice, setDustPrice] = useState<number>(0);
  const [ID, setID] = useState<number>(0);

  const onLoad = async () => {
    var data = await FarmServices.GetPrices();
    setFoodPrice(data.FoodUnitCost);
    setDustPrice(data.WoodDustUnitCost);
    setID(data.ID);
  };

  useEffect(() => {
    onLoad();
  }, []);

  useEffect(() => {}, [FoodPrice, DustPrice, ID]);

  async function onSaveClick() {
    let newPrices: PricesSaveVM = {
      ID: ID,
      FoodUnitCost: FoodPrice,
      WoodDustUnitCost: DustPrice,
    };
    if (!newPrices.FoodUnitCost) UINotify.error("يرجي ادخال تكلفة العلف");
    else if (!newPrices.WoodDustUnitCost)
      UINotify.error("يرجي ادخال تكلفة النشارة ");
    else {
      const res = await FarmServices.SavePrices(newPrices);

      if (res == "") {
        Swal.fire({
          icon: "success",
          title: "تم الحفظ بنجاح",
          showConfirmButton: false,
          timer: 2000,
        });
        onLoad();
      } else
        Swal.fire({
          icon: "error",
          title: "عذرا",
          text: res,
        });
    }
  }

  const foodPrice = useMemo(() => {
    debugger;
    return (
      <input
        type="number"
        min={0}
        value={FoodPrice}
        step=".01"
        onChange={(e: any) => {
          setFoodPrice(Number(e.target.value));
        }}
        className="form-control"
        placeholder="تكلفة الوحدة بالجنيه..."
        style={{
          fontWeight: 900,
          fontSize: "125%",
        }}
      />
    );
  }, [FoodPrice]);

  const dustPrice = useMemo(() => {
    return (
      <input
        type="number"
        min={0}
        value={DustPrice}
        step=".01"
        onChange={(e: any) => {
          setDustPrice(Number(e.target.value));
        }}
        className="form-control"
        placeholder="تكلفة الوحدة بالجنيه..."
        style={{
          fontWeight: 900,
          fontSize: "125%",
        }}
      />
    );
  }, [DustPrice]);

  return (
    <>
    <div className="card">
        <div className="card-header card-header-text card-header-primary">
          <div className="card-text">
            <h4 className="card-title" style={{ textAlign: "center" }}>
              تعديل سعر العلف والنشارة
            </h4>
          </div>
        </div>
        <div className="card-body">
          <div className="card">
          <div className="row" style={{ margin: "20px", direction: "rtl" }}>
            <div className="col-md-2">
              <span
                style={{
                  textShadow: "4px 4px 8px #f2cfff",
                  fontWeight: 900,
                  fontSize: "125%",
                }}
              >
                سعر الوحدة من العلف :
              </span>
            </div>
            <div className="col-md-4">{foodPrice}</div>

            <div className="col-md-2">
              <span
                style={{
                  textShadow: "4px 4px 8px #f2cfff",
                  fontWeight: 900,
                  fontSize: "125%",
                }}
              >
                سعر الوحدة من النشارة :
              </span>
            </div>
            <div className="col-md-4">{dustPrice}</div>
          </div>

          <div className="row" style={{ margin: "20px" }}>
            <div className="col-md-3"></div>

            <div className="col-md-6">
              <button
                className="btn btn-primary btn-round"
                style={{ alignSelf: "center", width: "100%" }}
                onClick={onSaveClick}
              >
                <MonetizationOnIcon />{" "}
                <label
                  style={{
                    color: "white",
                    fontWeight: 1100,
                    fontSize: "160%",
                  }}
                >
                  حفظ الاسعار
                </label>
              </button>
            </div>

            <div className="col-md-3"></div>
          </div>
          </div>
        </div>
      </div>
         
    </>
  );
};

export default AddOrUpdatePrices;
