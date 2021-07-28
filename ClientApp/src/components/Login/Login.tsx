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
import { Redirect } from "react-router-dom";
import { storeState } from "../..";
import { LoginDispatcher, LoginInitialState } from "../../LoginReducer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LoginNavbar from "../NavBar/LoginNavbar";
import FullPageLoader from "../FullPageLoader/FullPageLoader";
import { LoginApi } from "../../Services/LoginServices";


const Login = () => {
  const { User } = useSelector<storeState, LoginInitialState>(
    (state: storeState) => {
      return {
        User: state.Login.User,
      };
    }
  );
  const dispatch = useDispatch();
  const rootDispatcher = new LoginDispatcher(dispatch);

  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const history = useHistory();

  useEffect(() => {}, [userName, password]);
  useEffect(() => {
    if (User) {
      history.push("/");
    }
  }, [User]);

  useEffect(() => {onLoad()}, []);

  async function onLoad () {
  await LoginApi.updateAge();
}

  const onClickHandler = async (e: any) => {
    e.preventDefault();
    const user = await LoginApi.Login(userName, password);
    if (user) {
      rootDispatcher.setUser(user);
    } else {
      rootDispatcher.setUser(null);
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
      <LoginNavbar />
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
                <p className="description text-center">
                  Or Use Special Credintials
                </p>
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
