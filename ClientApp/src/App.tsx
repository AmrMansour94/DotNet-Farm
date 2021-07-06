import React, { Component, useEffect } from "react";
import { Layout } from "./components/Layout";
import "./custom.css";
import TabBar from "./components/NavBar/NavBar";
import img from "../src/Assets/img/1.jpg";
import Login from "./components/Login/Login";
import { useSelector, useDispatch } from "react-redux";
import { storeState } from ".";
import { LoginInitialState, LoginDispatcher } from "./LoginReducer";

const App = () => {
  const { ID } = useSelector<storeState, LoginInitialState>(
    (state: storeState) => {
      return {
        ID: state.Login.ID,
      };
    }
  );
  const dispatch = useDispatch();
  const rootDispatcher = new LoginDispatcher(dispatch);

  useEffect(() => {
    if (!ID) {
      window.location.href = "/Login";
    }
  }, []);
  if (ID) {
    return (
      <div>
        <Layout>
          <TabBar />
        </Layout>
      </div>
    );
  } else return <></>;
};

export default App;
