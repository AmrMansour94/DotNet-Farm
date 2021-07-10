import React from "react";
import loaderImg from "../../Assets/img/loader.gif";
import loaderImg2 from "../../Assets/img/loader2.gif";


const FullPageLoader = () => {
  return (
    <div
      className = "justify-content-center"
        style={{
          position: "absolute",
          display: "block",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(130, 130, 130, 0.39)",
          zIndex: 6,
        }}
      >
        <img
          src={loaderImg}
          alt="loading..."
          style={{
            position: "absolute",
            margin: "auto",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 5,
            opacity: 0.8
          }}
        ></img>
         <img
          src={loaderImg2}
          alt="loading..."
          style={{
            position: "absolute",
            margin: "auto",
            top: 150,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 5,
            opacity: 0.8
          }}
        ></img>
      </div>
  );
};

export default FullPageLoader;
