import React, { Component, useEffect } from "react";
import { Layout } from "./components/Layout";
import "./custom.css";
import TabBar from "./components/NavBar/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { storeState } from ".";
import { LoginInitialState, LoginDispatcher } from "./LoginReducer";
import LoginNavbar from "./components/NavBar/LoginNavbar";

const App = () => {
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

export default App;
