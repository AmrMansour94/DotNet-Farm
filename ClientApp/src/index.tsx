import "bootstrap/dist/css/bootstrap.css";
import React, { Suspense } from "react";
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import Login from "./components/Login/Login";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { LoginInitialState, LoginReducer } from "./LoginReducer";
import StockOperations from "./components/App/Stock/StockOperations";
import Swal from "sweetalert2";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");

export interface storeState {
  Login: LoginInitialState;
}

const rootReducer = combineReducers<storeState>({
  Login: LoginReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

var numberOfAjaxCAllPending = 0;
axios.interceptors.request.use(
  (request: any) => {
    numberOfAjaxCAllPending++;
    document.body.classList.add("loading-indicator");
    return request;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: any) => {
    if (numberOfAjaxCAllPending > 0) {
      numberOfAjaxCAllPending--;
    } else {
      numberOfAjaxCAllPending = 0;
    }

    if (numberOfAjaxCAllPending === 0) {
      document.body.classList.remove("loading-indicator");
    }

    return response;
  },
  (error: AxiosError) => {
    numberOfAjaxCAllPending--;
    if (numberOfAjaxCAllPending === 0) {
      document.body.classList.remove("loading-indicator");
    }

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

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/">
          <Suspense fallback={<div>Loading</div>}>
            <App />
          </Suspense>
        </Route>
        <Route path="/Login">
          <Suspense fallback={<div>Loading</div>}>
            <Login />
          </Suspense>
        </Route>
        <Route path="/Test">
          <Suspense fallback={<div>Loading</div>}>
            <StockOperations />
          </Suspense>
        </Route>
      </Switch>
    </Router>
    ,
  </Provider>,

  rootElement
);

registerServiceWorker();
