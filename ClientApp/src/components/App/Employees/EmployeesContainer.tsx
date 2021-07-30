import Accordion, { Item } from "devextreme-react/accordion";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { storeState } from "../../..";
import { LoginInitialState } from "../../../LoginReducer";
import AddNewEmployee from "./AddNewEmployee";
import EmployeesList from "./EmployeesList";

const EmployeesContainer = () => {
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
    <>
      <div className="card">
        <div className="card-header card-header-text card-header-primary">
          <div className="card-text">
            <h4 className="card-title" style={{ textAlign: "center" }}>
              تهيئة الموظفين
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
            <Item title="اضافة موظف جديد">
              <AddNewEmployee />
            </Item>
            <Item title="تعديل الموظفين">
              <EmployeesList />
            </Item>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default EmployeesContainer;
