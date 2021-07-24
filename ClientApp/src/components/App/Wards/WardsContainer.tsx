import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { storeState } from "../../..";
import { LoginInitialState } from "../../../LoginReducer";
import { WardsApi } from "../../../Services/WardsServices";
import { IKeyValuePairsVM } from "../../../VM/KeyValuePairs";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import WardContent from "./WardContent";
import WardsInsertOperations from "./WardsInsertOperations";
import StockContent from "../Stock/StockContent";

const WardsContainer = () => {
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

  const onLoad = async () => {
    if (!User) {
      window.location.href = "/Login";
    }
    const data = await WardsApi.getWardsList();
    console.log(data)
    setWardsList(data);
  };

  useEffect(() => {
    onLoad();
  }, []);
  useEffect(() => {}, [wardsList, selectedWard, isHidden]);
  const onSaveClick = () => {};

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
                  onClick={() => {
                    setIsHidden(false);
                    console.log(User);
                  }}
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

        <div className="card-body" hidden={isHidden}>
          <div className="card">
            <StockContent />
            <WardContent wardId={selectedWard} />
            <WardsInsertOperations />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardsContainer;
