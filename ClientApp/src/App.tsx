import React, { Component, Suspense, useEffect, useState } from "react";
import { Layout } from "./components/Layout";
import "./custom.css";
import TabBar from "./components/NavBar/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { storeState } from ".";
import { LoginInitialState, LoginDispatcher } from "./LoginReducer";
import LoginNavbar from "./components/NavBar/LoginNavbar";
import { Link, BrowserRouter as Router , Switch, Route} from "react-router-dom";
// import { Router, Switch, Route } from "react-router";
import StockOperations from "./components/App/Stock/StockOperations";
import Login from "./components/Login/Login";
import MainComponent from "./components/App/MainComponent";
import axios from "axios";
import Swal from "sweetalert2";
import FullPageLoader from "./components/FullPageLoader/FullPageLoader";

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {}, [isLoading]);

  axios.interceptors.request.use(
    function (config) {
      // spinning start to show
      setIsLoading(true);
      return config;
    },
    function (error) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title:
          error.response?.data.ExceptionMessage ?? error.response?.data.Message,
        showConfirmButton: false,
        timer: 1300,
      });
      return error;
    }
  );
  
  axios.interceptors.response.use(
    function (response) {
      // spinning hide
      setIsLoading(false);
  
      return response;
    },
    function (error) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title:
          error.response?.data.ExceptionMessage ?? error.response?.data.Message,
        showConfirmButton: false,
        timer: 1300,
      });
      return error;
    }
  );
  useEffect(() => {
   
  }, []);

    return (<div>
      {isLoading ? <FullPageLoader /> : null}
    <Router>
      <Switch>
        <Route exact path="/">
          <Suspense fallback={<div>Loading</div>}>
            <MainComponent />
          </Suspense>
        </Route>
        <Route path="/Login">
          <Suspense fallback={<div>Loading</div>}>
            <Login />
          </Suspense>
        </Route>
      </Switch>
    </Router>
    </div>);
  }


export default App;
