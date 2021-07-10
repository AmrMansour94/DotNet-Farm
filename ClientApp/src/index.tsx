import "bootstrap/dist/css/bootstrap.css";
import React, { Suspense, useEffect } from "react";
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import ReactDOM from "react-dom";
import App from "./App";
import Login from "./components/Login/Login";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { LoginInitialState, LoginReducer } from "./LoginReducer";
import StockOperations from "./components/App/Stock/StockOperations";
import Swal from "sweetalert2";
import FullPageLoader from "./components/FullPageLoader/FullPageLoader";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");

export interface storeState {
  Login: LoginInitialState;
}

const rootReducer = combineReducers<storeState>({
  Login: LoginReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>,

  rootElement
);

registerServiceWorker();
