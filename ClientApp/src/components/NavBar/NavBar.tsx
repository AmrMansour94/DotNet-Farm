import React, { useEffect, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TocOutlinedIcon from "@material-ui/icons/TocOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import AssessmentOutlinedIcon from "@material-ui/icons/AssessmentOutlined";
import AttachMoneyOutlinedIcon from "@material-ui/icons/AttachMoneyOutlined";
import Box from "@material-ui/core/Box";
import { IKeyValuePairsVM } from "../../VM/KeyValuePairs";
import { WardsApi } from "../../Services/WardsServices";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import WardsContainer from "../App/Wards/WardsContainer";
import StockMainContainer from "../App/Stock/StockMainContainer";
import Expenses from "../App/Expenses/Expenses";
import ReportsMainContainer from "../App/Reports/ReportsMainContainer";
import MedicineMainContainer from "../App/Medicine/MedicineMainContainer";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import EmployeesContainer from "../App/Employees/EmployeesContainer";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <div className="card" style={{ margin: "1px" }}>
            <div className="card-body">{children}</div>
          </div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    "aria-controls": `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TabBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [wardsList, setWardsList] = useState<IKeyValuePairsVM[]>([]);

  const onLoad = async () => {
    const data = await WardsApi.getWardsList();
    setWardsList(data);
    console.log(data);
  };

  useEffect(() => {
    onLoad();
  }, []);
  useEffect(() => {}, [wardsList]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root} style={{ display: "block" }}>
      <AppBar position="relative" style={{ backgroundColor: "#9c27b0" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
        >
          <Tab
            icon={<HomeOutlinedIcon />}
            aria-label="phone"
            {...a11yProps(0)}
            label="تهيئة المخزن"
            style={{ width: 180 }}
          />
          <Tab
            icon={<TocOutlinedIcon />}
            aria-label="favorite"
            {...a11yProps(1)}
            label="تهيئة العنابر"
            style={{ width: 180 }}
          />
          <Tab
            icon={<AttachMoneyOutlinedIcon />}
            aria-label="person"
            {...a11yProps(2)}
            label="مصروفات اضافية"
            style={{ width: 180 }}
          />
          <Tab
            icon={<LocalHospitalIcon />}
            aria-label="help"
            {...a11yProps(3)}
            label="تهيئة الدواء"
            style={{ width: 180 }}
          />
          <Tab
            icon={<AssignmentIndIcon />}
            aria-label="help"
            {...a11yProps(4)}
            label="تهيئة الموظفين"
            style={{ width: 180 }}
          />
          <Tab
            icon={<AssessmentOutlinedIcon />}
            aria-label="help"
            {...a11yProps(5)}
            label="التقارير"
            style={{ width: 180 }}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <StockMainContainer />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WardsContainer />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Expenses />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <MedicineMainContainer />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <EmployeesContainer />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <ReportsMainContainer />
      </TabPanel>
    </div>
  );
}
