import React, { useEffect, useState, useCallback } from "react";

import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import Dish from './components/Dish/Dish'
import Menu from './components/Menu/Menu'

import { useStore } from "./store";

import styles from './App.module.css'

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const App = () => {
  const [state, dispatch] = useStore();

  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    dispatch('getDish', { id: '5ef2555f0bcbcd7a8505e5ce' })
  }, [dispatch]);

  const getDishes = useCallback(({ page }) => dispatch('getDishes', { page }), [dispatch])

  const { menus, dishes } = state

  return (
    <>
      <h1 className={styles.Title}>Create your menu</h1>

      <Box mt={5}>
        <p>You can create your menu by writing it down from scratch or using previously created dishes</p>
      </Box>

      <Box mt={5}>
        <AppBar className={styles.AppBar} position="static" color="default">
          <Tabs
            value={activeTab}
            onChange={(_, value) => setActiveTab(value)}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Dish" />
            <Tab label="Menu" />
          </Tabs>
        </AppBar>

        <SwipeableViews index={activeTab} onChangeIndex={value => setActiveTab(value)}>

          <TabPanel value={activeTab} index={0}>
            <Dish getDishes={getDishes} dishes={dishes} />
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <Menu menus={menus} />
          </TabPanel>

        </SwipeableViews>
      </Box>
    </>
  )
};

export default App;
