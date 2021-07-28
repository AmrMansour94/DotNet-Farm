import React, { Suspense, useEffect, useState } from "react";
import 'devextreme/dist/css/dx.material.purple.light.css';
import "./custom.css";
import { BrowserRouter as Router , Switch, Route} from "react-router-dom";
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
