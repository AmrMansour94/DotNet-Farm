import React, { useEffect, useState } from "react";
import { WardsApi } from "../../../Services/WardsServices";
import { IKeyValuePairsVM } from "../../../VM/KeyValuePairs";

import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import { useSelector, useDispatch } from "react-redux";
import { storeState } from "../../..";
import { LoginInitialState, LoginDispatcher } from "../../../LoginReducer";
import WardContent from "./WardContent";

const WardsInsertOperations = () => {
  const { User } = useSelector<storeState, LoginInitialState>(
    (state: storeState) => {
      return {
        User: state.Login.User,
      };
    }
  );

  const [wardsList, setWardsList] = useState<IKeyValuePairsVM[]>([]);
  const [selectedWard, setSelectedWard] = useState<number>(0);
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [addedChicksNumber, setAddedChicksNumber] = useState<number>();

  const onLoad = async () => {
    if (!User) {
      window.location.href = "/Login";
    }
    const data = await WardsApi.getWardsList();
    setWardsList(data);
  };

  useEffect(() => {
    onLoad();
  }, []);
  useEffect(() => {}, [wardsList, selectedWard, isHidden]);
  const onSaveClick = () => {};

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
      <div className="row" style={{ margin: "20px" , direction:"rtl" }}>
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
            style={{
              fontWeight: 900,
              fontSize: "125%",
            }}
          />
        </div>
        
       
      </div>

      {/* Line 2 */}

      <div className="row" style={{ margin: "20px" , direction:"rtl" }}>
      <div className="col-md-2">
          <span
            style={{
              textShadow: "4px 4px 8px #f2cfff",
              fontWeight: 900,
              fontSize: "125%",
            }}
          >
            كمية الطعام المستهلكة:
          </span>
        </div>
        <div className="col-md-4">
          <input
            type="number"
            min={0}
            step=".001"
            onChange={(e: any) => {
              setAddedChicksNumber(Number(e.target.value));
            }}
            className="form-control"
            placeholder="كمية الطعام..."
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
            style={{
              fontWeight: 900,
              fontSize: "125%",
            }}
          />
        </div>

      </div>

      <div className="row" style={{ margin: "20px" , direction:"rtl" }}>
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
            style={{
              fontWeight: 900,
              fontSize: "125%",
            }}
          />
        </div>

       
      </div>
    </>
  );
};

export default WardsInsertOperations;
