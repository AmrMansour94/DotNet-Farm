import Accordion, { Item } from "devextreme-react/accordion";
import React from "react";
import AddNewEmployee from "./AddNewEmployee";

const EmployeesContainer = () => {
  return (
    <>
      
        <div className="card-header card-header-text card-header-primary">
          <div className="card-text">
            <h4 className="card-title" style={{ textAlign: "center" }}>
              تهيئة الموظفين
            </h4>
          </div>
        </div>
      
      <div className="card-body">
        <div className="card">
          <Accordion
            collapsible={true}
            multiple={false}
            animationDuration={300}
            style = {{margin : 50}}
          >
            <Item title="اضافة موظف جديد">
              <AddNewEmployee />
            </Item>
            <Item title="تعديل الموظفين">
              <AddNewEmployee />
            </Item>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default EmployeesContainer;
