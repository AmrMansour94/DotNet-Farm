import React, { useEffect, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TocOutlinedIcon from '@material-ui/icons/TocOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { IKeyValuePairsVM } from '../../VM/KeyValuePairs';
import { WardsApi } from '../../Services/WardsServices';
import MainComponent from '../App/MainComponent';
import StockOperations from '../App/StockOperations';
import WardsInsertOperations from '../App/WardsInsertOperations';

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
          <div className="card" style={{margin:"1px"}}>
          <div className="card-body">
            {children}
          </div>
          </div>
          
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TabBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [wardsList , setWardsList] = useState<IKeyValuePairsVM[]>([]);

  const onLoad = async () =>
  {
    const data = await WardsApi.getWardsList();
    setWardsList(data)
    console.log(data)
  }

  useEffect(() => {
    onLoad();
  }, [])
  useEffect(() => {
  }, [wardsList])

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root} style={{display:"block"}}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
        >
          <Tab icon={<HomeOutlinedIcon />} aria-label="phone" {...a11yProps(0)} label = "المخزن" style={{width : 300}} />
          <Tab icon={<TocOutlinedIcon />} aria-label="favorite" {...a11yProps(1)} label = "تهيئة العنابر" style={{width : 300}}  />
          <Tab icon={<AttachMoneyOutlinedIcon />} aria-label="person" {...a11yProps(2)} label = "مدخلات اضافية" style={{width : 300}} />
          <Tab icon={<AssessmentOutlinedIcon />} aria-label="help" {...a11yProps(3)} label = "التقارير" style={{width : 300}}/>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} >
        <StockOperations />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <WardsInsertOperations />
      </TabPanel>
      <TabPanel value={value} index={2}>
      <MainComponent />
      </TabPanel>
      <TabPanel value={value} index={3}>
      <MainComponent />
      </TabPanel>
     
    </div>
  );
}