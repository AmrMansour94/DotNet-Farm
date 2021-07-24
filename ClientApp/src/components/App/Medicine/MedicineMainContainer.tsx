import React from "react";
import Medicine from "./Medicine";

const MedicineMainContainer = () => {
  return (
    <div>
      <div className="card">
        <div className="card-header card-header-text card-header-primary">
          <div className="card-text">
            <h4 className="card-title" style={{ textAlign: "center" }}>
              اضافة دواء جديد
            </h4>
          </div>
        </div>
        <div className="card-body">
          <div className="card">
            <Medicine />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineMainContainer;
