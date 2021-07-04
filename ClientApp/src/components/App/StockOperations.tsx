import React, { useEffect, useState } from "react";
import { WardsApi } from "../../Services/WardsServices";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

const StockOperations = () => {
  const [addedChicksNumber, setAddedChicksNumber] = useState<number>();

  const onLoad = async () => {
    const data = await WardsApi.getWardsList();
  };

  useEffect(() => {
    onLoad();
  }, []);
  useEffect(() => {}, [addedChicksNumber]);

  return (
    <div>
      <div className="card">
        <div className="card-header card-header-text card-header-primary">
          <div className="card-text">
            <h4 className="card-title" style={{ textAlign: "center" }}>
              اضافة كميات جديدة للمخزن
            </h4>
          </div>
        </div>
        <div className="card-body">
          {/* Line 1 */}

          <div className="row" style={{ margin: "20px" }}>
            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                placeholder="عدد النوافق..."
                min ={0}
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
                :عدد الكتاكيت المضافة
              </span>
            </div>
          </div>

          {/* Line 2 */}

          <div className="row" style={{ margin: "20px" }}>
            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                placeholder="كمية النشارة..."
                min ={0}
                step= ".001"
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
      </div>

      <div className="row" style={{ margin: "20px" }}>
        <div className="col-md-3"></div>

        <div className="col-md-6">
          <button
            className="btn btn-primary btn-round"
            style={{ alignSelf: "center", width: "100%" }}
          >
            <PlaylistAddIcon />{" "}
            <label
              style={{
                color: "white",
                fontWeight: 900,
                fontSize: "125%",
              }}
            >
              اضافة الي المخزن
            </label>
          </button>
        </div>

        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

export default StockOperations;
