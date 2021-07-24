import React, { useEffect, useState } from "react";
import { WardsApi } from "../../../Services/WardsServices";
import { WardContentVM } from "../../../VM/WardContentVM";

interface Iprops {
  wardId: number;
}

const WardContent = (props: Iprops) => {
  const [WardContent, setWardContent] = useState<WardContentVM>();

  useEffect(() => {
    if (props) {
      onload();
    }
  }, [props]);
  useEffect(() => {}, [WardContent]);

  const onload = async () => {
    const data = await WardsApi.getWardContent(props.wardId);
    setWardContent(data);
  };
  return (
    <>
      <div className="row justify-content-center" style={{ margin: "20px" }}>
        <span
          className="badge badge-pill badge-info center"
          style={{
            fontWeight: 900,
            fontSize: "125%",
            display: "inline-block",
            margin: "10px 10px 0 0",
            padding: "5px 10px",
            width: "60%",
          }}
        >
          محتويات العنبر
        </span>
      </div>
      <div className="row justify-content-center" style={{ margin: "20px" }}>
        <div className="col-md-3">
          <span
            style={{
              textShadow: "4px 4px 8px #f2cfff",
              fontWeight: 900,
              fontSize: "125%",
              float:"right"
            }}
          >
            {WardContent?.deadChicksNum ?? 0}
          </span>
        </div>
        <div className="col-md-3">
          <span
            style={{
              textShadow: "4px 4px 8px #f2cfff",
              fontWeight: 900,
              fontSize: "125%",
            }}
          >
            :عدد النوافق
          </span>
        </div>
        <div className="col-md-3">
          <span
            style={{
              textShadow: "4px 4px 8px #f2cfff",
              fontWeight: 900,
              fontSize: "125%",
              float:"right"
            }}
          >
            {WardContent?.currentChicksNum ?? 0}
          </span>
        </div>
        <div className="col-md-3">
          <span
            style={{
              textShadow: "4px 4px 8px #f2cfff",
              fontWeight: 900,
              fontSize: "125%",
            }}
          >
            :عدد الكتاكيت في العنبر
          </span>
        </div>
      </div>
    </>
  );
};

export default WardContent;
