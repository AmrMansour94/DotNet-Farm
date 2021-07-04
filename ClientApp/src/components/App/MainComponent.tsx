import {
  makeStyles,
  Theme,
  createStyles,
  NativeSelect,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import { Col, Row } from "react-bootstrap";
import { WardsApi } from "../../Services/WardsServices";
import { IKeyValuePairsVM } from "../../VM/KeyValuePairs";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

const MainComponent = () => {
  const classes = useStyles();
  const [wardsList, setWardsList] = useState<IKeyValuePairsVM[]>([]);
  const [selectedWard, setSelectedWard] = useState<number>();
  const [addedChicksNumber, setAddedChicksNumber] = useState<number>();

  const onLoad = async () => {
    const data = await WardsApi.getWardsList();
    setWardsList(data);
  };

  useEffect(() => {
    onLoad();
  }, []);
  useEffect(() => {}, [wardsList, addedChicksNumber]);
  // useEffect(() => {}, [addedChicksNumber]);

  return (
    <div>
      <div className="card">
        <div className="row" style={{ margin: "20px" }}>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="عدد النوافق..."
            />
          </div>
          <div className="col-md-2">
            <span
              style={{
                textShadow: "4px 4px 8px #808080",
                fontWeight: 900,
                fontSize: "125%",
              }}
            >
              :عدد النوافق
            </span>
          </div>
          <div className="col-md-4">
            <input
              type="number"
              min={0}
              onChange={(e: any) => {
                setAddedChicksNumber(Number(e.target.value));
              }}
              className="form-control"
              placeholder="عدد الكتاكيت..."
            />
          </div>
          <div className="col-md-2">
            <span
              style={{
                textShadow: "4px 4px 8px #808080",
                fontWeight: 900,
                fontSize: "125%",
              }}
            >
              :عدد الكتاكيت
            </span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          {/* <label>عدد الكتاكيت</label> */}
          <input
            type="text"
            className="form-control"
            placeholder="عدد الكتاكيت..."
          />{" "}
        </div>
        <div className="col-md-3">
          <span
            style={{
              textShadow: "4px 4px 8px #808080",
              fontWeight: 900,
              fontSize: "100%",
            }}
          >
            عدد الكتاكيت
          </span>
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="عدد النوافق..."
          />
        </div>
        <div className="col-md-3">
          <span
            style={{
              textShadow: "4px 4px 8px #808080",
              fontWeight: 900,
              fontSize: "100%",
            }}
          >
            :عدد النوافق
          </span>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <table className="table table-bordered">
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
            {wardsList.map((ward: IKeyValuePairsVM) => {
              return (
                <tr key={ward.id}>
                  <th>{ward.id}</th>
                  <th>{ward.name}</th>
                </tr>
              );
            })}
          </table>
        </div>
        <div className="col-md-4">
          <ul>
            {wardsList.map((ward: IKeyValuePairsVM) => {
              return <li key={ward.id}>{ward.name}</li>;
            })}
          </ul>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="First Name..."
          />
        </div>
      </div>

      <table className="table table-hover">
        <tr>
          <th style={{ width: "50%" }}>ID</th>
          <th style={{ width: "50%" }}>Name</th>
        </tr>

        <tr>
          <th style={{ width: "50%" }}>
            <div className="row">
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="عدد النوافق..."
                />
              </div>
              <div className="col-md-4">
                <span
                  style={{
                    textShadow: "4px 4px 8px #808080",
                    fontWeight: 900,
                    fontSize: "150%",
                  }}
                >
                  :عدد النوافق
                </span>
              </div>
            </div>
          </th>
          <th style={{ width: "50%" }}>
            <div className="row">
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="عدد الكتاكيت..."
                />
              </div>
              <div className="col-md-4">
                <span
                  style={{
                    textShadow: "4px 4px 8px #808080",
                    fontWeight: 900,
                    fontSize: "150%",
                  }}
                >
                  :عدد الكتاكيت
                </span>
              </div>
            </div>
          </th>
        </tr>

        <tr>
          <th style={{ width: "50%" }}>ID</th>
          <th style={{ width: "50%" }}>Name</th>
        </tr>
      </table>

      <div className="col-md-4"></div>

      <input type="text" className="form-control" placeholder="First Name..." />
    </div>
  );
};

export default MainComponent;
