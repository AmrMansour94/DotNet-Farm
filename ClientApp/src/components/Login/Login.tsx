import React, { useEffect, useState } from "react";
import { Layout } from "../Layout";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import FaceIcon from "@material-ui/icons/Face";
import VpnKeyRoundedIcon from "@material-ui/icons/VpnKeyRounded";
import LockOpenRoundedIcon from "@material-ui/icons/LockOpenRounded";
import img from "../../Assets/img/1.jpg";
import Swal from "sweetalert2";
import { WardsApi } from "../../Services/WardsServices";
import  { Redirect } from 'react-router-dom'

const Login = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {}, [userName, password]);

  const onClickHandler = async (e: any) => {
    e.preventDefault();
    const Auth = await WardsApi.Login(userName , password)
    if (Auth)
    {
        window.location.href = '/'
    }
    else{
         Swal.fire({
      icon: "error",
      title: "اسم المستخدم او كلمة المرور خطأ",
      showConfirmButton: false,
      timer: 1300,
    });
    }
   
  };
  return (
    <div>
      {/* <NavBar2 /> */}
      <nav className="navbar navbar-absolute bg-primary">
        <button
          className="btn btn-primary btn-round"
          style={{ fontSize: "20px" }}
        >
          DotNet-Farm App
        </button>
      </nav>
      <div
        className="page-header header-filter"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className="container">
          <Layout>
            <div
              className="card card-login"
              style={{
                width: "50%",
                padding: "10px",
                margin: "auto",
              }}
            >
              <form className="form" method="" action="">
                <div className="card-header card-header-primary text-center">
                  <h4 className="card-title">Login</h4>
                  <div className="social-line">
                    <a className="btn btn-just-icon btn-link">
                      <FacebookIcon />
                    </a>
                    <a className="btn btn-just-icon btn-link">
                      <TwitterIcon />
                    </a>
                    <a className="btn btn-just-icon btn-link">
                      <GitHubIcon />
                    </a>
                  </div>
                </div>
                <p className="description text-center">Or Use Special Credintials</p>
                <div className="card-body">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <FaceIcon />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="User Name..."
                      onChange={(e: any) => setUserName(e.target.value)}
                    />
                  </div>

                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <VpnKeyRoundedIcon />
                      </span>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password..."
                      onChange={(e: any) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="footer text-center">
                  <button
                    className="btn btn-primary btn-round"
                    style={{ marginTop: "50px", width: "400px" }}
                    onClick={onClickHandler}
                  >
                    <LockOpenRoundedIcon /> Login
                  </button>
                </div>
              </form>
            </div>
          </Layout>
        </div>
      </div>
    </div>
  );
};

export default Login;
