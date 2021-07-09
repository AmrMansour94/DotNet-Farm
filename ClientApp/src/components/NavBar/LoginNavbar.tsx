import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { storeState } from "../..";
import { LoginInitialState } from "../../LoginReducer";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const LoginNavbar = () => {
  const { User } = useSelector<storeState, LoginInitialState>(
    (state: storeState) => {
      return {
        User: state.Login.User,
      };
    }
  );

  const onLogOut = () =>{
    window.location.href = '/Login'
  }
  if(User){

  }else {

  }

  return (
    <nav className="navbar navbar-absolute bg-primary">
     
        
          <button
            className="btn btn-primary btn-round"
            style={{ fontSize: "21px" }}
          >
            دواجن دوت كوم
          </button>
          { User? (<div className="row">

        <div className="col-md-6">
          <h4 className="card-title" style={{ color: "white" }}>
            User: {User.UserName}
          </h4>
        </div>

        <div className="col-md-2">
          <button type="button" className="btn btn-primary" style={{float: "left"}} onClick = {onLogOut}>
            LogOut <ExitToAppIcon />
          </button>
        </div>
      </div>) : null}
    </nav>
  );
};

export default LoginNavbar;
