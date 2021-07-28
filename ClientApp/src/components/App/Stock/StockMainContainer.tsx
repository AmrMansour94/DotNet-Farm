import React, { useEffect } from "react";
import { LoginApi } from "../../../Services/LoginServices";
import StockContent from "./StockContent";
import StockOperations from "./StockOperations";

const StockMainContainer = () => {


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
