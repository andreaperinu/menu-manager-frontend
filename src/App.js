import React, { useCallback } from "react";

import { Tabs } from 'antd';

import 'antd/dist/antd.css'

import Dish from './components/Dish/Dish'
import Menu from './components/Menu/Menu'

import { A, useStore } from "./store";

import styles from './App.module.css'

const App = () => {
  const [state, dispatch] = useStore();

  const getDishes = useCallback(({ page }) => dispatch(A.GET_DISHES, { page }), [dispatch])

  const { menus, dishes } = state
  const { TabPane } = Tabs

  return (
    <>
      <h1 className={styles.Title}>Create your menu</h1>

      <h3>You can create your menu by writing it down from scratch or using previously created dishes</h3>

      <Tabs defaultActiveKey="1" onChange={key => console.log(key)}>

        <TabPane tab="Tab 1" key="1">
          <Dish getDishes={getDishes} dishes={dishes} />
        </TabPane>

        <TabPane tab="Tab 2" key="2">
          <Menu menus={menus} />
        </TabPane>

      </Tabs>

    </>
  )
};

export default App;
