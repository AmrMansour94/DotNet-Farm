import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { storeState } from "../../..";
import { LoginInitialState, LoginDispatcher } from "../../../LoginReducer";
import { LoginApi } from "../../../Services/LoginServices";
import StockContent from "./StockContent";
import StockOperations from "./StockOperations";

const StockMainContainer = () => {
  const { User } = useSelector<storeState, LoginInitialState>(
    (state: storeState) => {
      return {
        User: state.Login.User,
      };
    }
  );

  const onLoad = async () => {
    if (!User) {
      //window.location.href = "/Login";
      console.log(localStorage.userName)
      console.log(localStorage.ID)
    }
  };
  useEffect(() => {
    onLoad();
  }, []);

  return (
    <>
      <div className="card">
        <div className="card-header card-header-text card-header-primary">
          <div className="card-text">
            <h4 className="card-title" style={{ textAlign: "center" }}>
              تهيئة المخزن
            </h4>
          </div>
        </div>
        <div className="card-body">
          <div className="card">
            <StockContent />
            <StockOperations />
          </div>
        </div>
      </div>
    </>
  );
};

export default StockMainContainer;
