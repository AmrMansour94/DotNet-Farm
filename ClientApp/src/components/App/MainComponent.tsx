import React, { Component, useEffect } from "react";
import { Layout } from "../Layout";
import TabBar from "../NavBar/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { LoginInitialState, LoginDispatcher } from "../../LoginReducer";
import LoginNavbar from "../NavBar/LoginNavbar";
import { storeState } from "../..";


const MainComponent = () => {
  const { User } = useSelector<storeState, LoginInitialState>(
    (state: storeState) => {
      return {
        User: state.Login.User,
      };
    }
  );
  const dispatch = useDispatch();
  const rootDispatcher = new LoginDispatcher(dispatch);

  useEffect(() => {
    debugger;
    if (!User) {
      window.location.href = "/Login";
    }
  }, []);
  if (User) {
    return (
      <div>
        <LoginNavbar />
        <div style={{display:"block"}}>
           <Layout>
          <TabBar />
        </Layout>
        </div>
       
      </div>
    );
  } else return <></>;
};

export default MainComponent;
