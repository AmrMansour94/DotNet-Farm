import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import Login from "./components/Login/Login";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { LoginInitialState, LoginReducer } from "./LoginReducer";
import StockOperations from "./components/App/StockOperations";

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
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/Test">
          <StockOperations />
        </Route>
      </Switch>
    </Router>
    ,
  </Provider>,

  rootElement
);

registerServiceWorker();
