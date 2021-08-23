import React, {  } from "react";
import Swal from "sweetalert2";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { FarmServices } from "../../Services/FarmServices";

const Settings = () => {
  const resetCycle = async () => {
    Swal.fire({
      title: "هل تريد الحفظ؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      cancelButtonText: "لا",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        {
          const res = await FarmServices.ResetFarmCycle();
          if (res == "")
            Swal.fire({
              icon: "success",
              title: "تم اعادة التهيئة بنجاح",
              showConfirmButton: false,
              timer: 2000,
            });
          else {
            debugger;
            Swal.fire({
              icon: "error",
              title: "حدث خطأ ما",
              text: res,
            });
          }
        }
      }
    });
  };

  return (
    <div>
      <div className="row" style={{ margin: "20px" }}>
        <div className="col-md-2"></div>

        <div className="col-md-8">
          <button
            className="btn btn-primary btn-round"
            style={{ alignSelf: "center", width: "100%" }}
            onClick={resetCycle}
          >
            <AutorenewIcon />{" "}
            <label
              style={{
                color: "white",
                fontWeight: 900,
                fontSize: "125%",
              }}
            >
              اعادة تهيئة الدورة
            </label>
          </button>
        </div>

        <div className="col-md-2"></div>
      </div>
    </div>
  );
};

export default Settings;
