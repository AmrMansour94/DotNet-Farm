import React, { Component } from "react";
import { Layout } from "./components/Layout";
import "./custom.css";
import TabBar from "./components/NavBar/NavBar";
import img from "../src/Assets/img/1.jpg";
import Login from "./components/Login/Login";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <div>
        {/* <nav
          className="navbar navbar-absolute bg-primary"
          style={{ position: "fixed", top: 0 , display:"block"}}
        >
          <button
            className="btn btn-primary btn-round"
            style={{ fontSize: "20px" }}
          >
            DotNet-Farm App
          </button>
        </nav> */}
        <Layout>
          <TabBar />
        </Layout>
      </div>
    );
  }
}
