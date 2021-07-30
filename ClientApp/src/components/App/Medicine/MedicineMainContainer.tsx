import { Accordion } from "devextreme-react";
import { Item } from "devextreme-react/accordion";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { storeState } from "../../..";
import { LoginInitialState } from "../../../LoginReducer";
import AddNewMedicine from "./AddNewMedicine";
import InsertMedicineIntoWards from "./InsertMedicineIntoWards";

const MedicineMainContainer = () => {

  const { User } = useSelector<storeState, LoginInitialState>(
    (state: storeState) => {
      return {
        User: state.Login.User,
      };
    }
  );

  const onLoad = async () => {
    if (!User) {
      window.location.href = "/Login";
    }
  };

  useEffect(() => {
    onLoad();
  }, []);


  return (
    <div>
      <div className="card">
        <div className="card-header card-header-text card-header-primary">
          <div className="card-text">
            <h4 className="card-title" style={{ textAlign: "center" }}>
              تهيئة الدواء
            </h4>
          </div>
        </div>
        <div className="card-body">
          <Accordion
            collapsible={true}
            multiple={false}
            animationDuration={300}
            style={{ margin: 50 }}
          >
            <Item title="اضافة دواء جديد">
              <AddNewMedicine />
            </Item>
            <Item title="ادخال الدواء للعنابر">
              <InsertMedicineIntoWards />
            </Item>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default MedicineMainContainer;
