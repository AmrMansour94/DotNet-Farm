import React, { Component, useEffect } from "react";
import { Layout } from "../Layout";
import TabBar from "../NavBar/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { LoginInitialState, LoginDispatcher } from "../../LoginReducer";
import LoginNavbar from "../NavBar/LoginNavbar";
import { storeState } from "../..";


const MainComponent = () => {
  // const { User } = useSelector<storeState, LoginInitialState>(
  //   (state: storeState) => {
  //     return {
  //       User: state.Login.User,
  //     };
  //   }
  // );
  // const dispatch = useDispatch();
  // const rootDispatcher = new LoginDispatcher(dispatch);

  useEffect(() => {
    debugger;
    var userName = window.sessionStorage.getItem("UserName")
    if (!userName) {
      window.location.href = "/Login";
    }
  }, []);
  // if (User) {
    return (
      window.sessionStorage.getItem("UserName") ? <div>
        <LoginNavbar />
        <div style={{display:"block"}}>
           <Layout>
          <TabBar />
        </Layout>
        </div>
       
      </div> : null
    );
  // } else return <></>;
};

export default MainComponent;
