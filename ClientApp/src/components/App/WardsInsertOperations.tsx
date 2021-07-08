import React, { useEffect, useState } from "react";
import { WardsApi } from "../../Services/WardsServices";
import { IKeyValuePairsVM } from "../../VM/KeyValuePairs";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import { useSelector, useDispatch } from "react-redux";
import { storeState } from "../..";
import { LoginInitialState, LoginDispatcher } from "../../LoginReducer";

const WardsInsertOperations = () => {
  const { User } = useSelector<
  storeState,
  LoginInitialState
>((state: storeState) => {
  return {
    User : state.Login.User
  };
});


  const [wardsList, setWardsList] = useState<IKeyValuePairsVM[]>([]);
  const [selectedWard, setSelectedWard] = useState<number>();
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [addedChicksNumber, setAddedChicksNumber] = useState<number>();

  const onLoad = async () => {
    if(!User)
    {
      window.location.href = '/Login'
    }
    const data = await WardsApi.getWardsList();
    setWardsList(data);
  };

  useEffect(() => {
    onLoad();
  }, []);
  useEffect(() => {}, [wardsList, selectedWard, isHidden]);
  const onSaveClick =() =>{
    
  }

  return (
    <div>
      <div className="card">
        <div className="card-header card-header-text card-header-primary">
          <div className="card-text">
            <h4 className="card-title" style={{ textAlign: "center" }}>
              الادخال اليومي للعنابر
            </h4>
          </div>
        </div>
        <div className="card-body">
          {/* Line 1 */}
          <div className="card">
            <div className="row" style={{ margin: "20px" }}>
              <div className="col-md-2"></div>
              <div className="col-md-1">
                <button
                  className="btn btn-primary btn-fab btn-fab-mini btn-round"
                  onClick={() => {setIsHidden(false)
                    console.log(User)}}
                >
                  <i className="material-icons">
                    <SearchRoundedIcon />
                  </i>
                </button>
              </div>
              <div className="col-md-5">
                <select
                  className="form-control selectpicker"
                  data-style="btn btn-link"
                  id="exampleFormControlSelect1"
                  onChange={() => setIsHidden(true)}
                  style={{
                    fontWeight: 900,
                    fontSize: "125%",
                  }}
                >
                  {wardsList.map((ward: IKeyValuePairsVM) => {
                    return <option key={ward.ID}>{ward.Name}</option>;
                  })}
                </select>
              </div>

              <div className="col-md-2">
                <span
                  style={{
                    textShadow: "4px 4px 8px #f2cfff",
                    fontWeight: 900,
                    fontSize: "125%",
                  }}
                >
                  :اختر العنبر
                </span>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
        </div>

        {/* Line 2 */}
        <div className="card-body" hidden={isHidden}>
          <div className="card">
            <div className="row" style={{ margin: "20px" }}>
              <div className="col-md-4">
                <input
                  type="number"
                  min ={0}
                  className="form-control"
                  placeholder="عدد النوافق..."
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
                  :عدد النوافق
                </span>
              </div>
              <div className="col-md-4">
                <input
                  type="number"
                  min ={0}
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
                  min ={0}
                step= ".001"
                  className="form-control"
                  placeholder="كمية النشارة..."
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
                  min ={0}
                step= ".001"
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
                  :كمية الطعام
                </span>
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
        </div>
      </div>
    </div>
  );
};

export default WardsInsertOperations;
