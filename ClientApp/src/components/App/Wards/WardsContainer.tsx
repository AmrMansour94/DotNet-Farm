import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { storeState } from "../../..";
import { LoginInitialState } from "../../../LoginReducer";
import { WardsApi } from "../../../Services/WardsServices";
import { IKeyValuePairsVM } from "../../../VM/KeyValuePairs";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import WardContent from "./WardContent";
import WardsInsertOperations from "./WardsInsertOperations";
import StockContent from "../Stock/StockContent";
import Swal from "sweetalert2";

const WardsContainer = () => {
  const { User } = useSelector<storeState, LoginInitialState>(
    (state: storeState) => {
      return {
        User: state.Login.User,
      };
    }
  );

  const [wardsList, setWardsList] = useState<IKeyValuePairsVM[]>([]);
  const [selectedWard, setSelectedWard] = useState<string>();
  const [selectedWardID, setSelectedWardID] = useState<number>(0);
  const [isHidden, setIsHidden] = useState<boolean>(true);

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
  useEffect(() => {}, [wardsList, selectedWardID, isHidden]);
  useEffect(() => {
    debugger;
    for (const ward of wardsList) {
      if (ward.Name == selectedWard) {
        setSelectedWardID(ward.ID);
        setIsHidden(true);
        break;
      }
      else {setSelectedWardID(0)}
    }
  }, [selectedWard]);

  const wardContent = useMemo(() => {
    debugger;
    return selectedWardID>0 ? (
      <div className="card-body">
        <div className="card">
          <StockContent />
          <WardContent wardId={selectedWardID} />
          <WardsInsertOperations wardID={selectedWardID} />
        </div>
      </div>
    ) : null;
  }, [selectedWardID]);

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
                    if(selectedWardID)
                    {
                      setIsHidden(false);
                    console.log(selectedWardID);
                    }
                    else{
                      Swal.fire({
                        icon: "error",
                        title: "يرجي اختيار العنبر اولا",
                        showConfirmButton: false,
                        timer: 2000,
                      });
                    }
                    
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
                  onChange={(e: any) => {
                    debugger;
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

        {wardContent}
      </div>
    </div>
  );
};

export default WardsContainer;
