import React from "react";
import PaymentIcon from '@material-ui/icons/Payment';

const Expenses = () => {
  // التاريخ الافتراضي تاريخ اليوم
  var curr = new Date();
  curr.setDate(curr.getDate());
  var defaultDate = curr.toISOString().substr(0, 10);
  return (
    <div className="card">
      <div className="card-header card-header-text card-header-primary">
        <div className="card-text">
          <h4 className="card-title" style={{ textAlign: "center" }}>
            مصروفات اضافية
          </h4>
        </div>
      </div>
      <div className="card-body">
        <div className="card">
          <div
            className="row justify-content-center"
            style={{ margin: "20px" }}
          >
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
              اضافة مصروفات جديدة
            </span>
          </div>

          {/* Line 1*/}
          <div className="row" style={{ margin: "20px" }}>
            <div className="col-md-2"></div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="اسم البند..."
                dir="rtl"
                style={{
                  fontWeight: 900,
                  fontSize: "125%",
                }}
              />
            </div>
            <div className="col-md-3">
              <span
                style={{
                  textShadow: "4px 4px 8px #f2cfff",
                  fontWeight: 900,
                  fontSize: "125%",
                  float: "right",
                }}
              >
                :اسم البند
              </span>
            </div>
            <div className="col-md-1"></div>
          </div>

          {/* Line 2 */}
          <div className="row" style={{ margin: "20px" }}>
            <div className="col-md-2"></div>
            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                placeholder="المبلغ بالجنيه..."
                min={0}
                step={0.001}
                dir="rtl"
                style={{
                  fontWeight: 900,
                  fontSize: "125%",
                }}
              />
            </div>

            <div className="col-md-3">
              <span
                style={{
                  textShadow: "4px 4px 8px #f2cfff",
                  fontWeight: 900,
                  fontSize: "125%",
                  float: "right",
                }}
              >
                :المبلغ المدفوع
              </span>
            </div>
            <div className="col-md-1"></div>
          </div>

          {/* Line 3 */}
          <div className="row" style={{ margin: "20px" }}>
            <div className="col-md-2"></div>
            <div className="col-md-6">
              <input
                type="date"
                className="form-control"
                placeholder="تاريخ الادخال..."
                defaultValue={defaultDate}
                dir="rtl"
                style={{
                  fontWeight: 900,
                  fontSize: "125%",
                }}
              />
            </div>

            <div className="col-md-3">
              <span
                style={{
                  textShadow: "4px 4px 8px #f2cfff",
                  fontWeight: 900,
                  fontSize: "125%",
                  float: "right",
                }}
              >
                :التاريخ
              </span>
            </div>
            <div className="col-md-1"></div>
          </div>

          <div className="row" style={{ margin: "20px" }}>
        <div className="col-md-3"></div>

        <div className="col-md-6">
          <button
            className="btn btn-primary btn-round"
            style={{ alignSelf: "center", width: "100%" }}
          >
            <PaymentIcon />{" "}
            <label
              style={{
                color: "white",
                fontWeight: 900,
                fontSize: "130%",
              }}
            >
              اضافة الي المصروفات
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

export default Expenses;