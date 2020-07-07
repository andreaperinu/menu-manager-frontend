import React, { useCallback } from "react";

import { Tabs } from 'antd';
import 'antd/dist/antd.css'

import Dish from './components/Dish/Dish'
import Menu from './components/Menu/Menu'
import { A, useStore } from "./store/store";
import styles from './App.module.css'

const App = () => {
	const [state, dispatch] = useStore();

	const getDishes = useCallback(({ page }) => dispatch(A.GET_DISHES, { page }), [dispatch])
	const getMenus = useCallback(({ page }) => dispatch(A.GET_MENUS, { page }), [dispatch])

	const { menus, dishes } = state

	return (
		<>
			<h1 className={styles.Title}>Create your menu</h1>

			<h3>You can create your menu by writing it down from scratch or using previously created dishes</h3>

			<Tabs defaultActiveKey="1" onChange={key => console.log(key)}>

				<Tabs.TabPane tab="Dish" key="1">
					<Dish getDishes={getDishes} dishes={dishes} />
				</Tabs.TabPane>

				<Tabs.TabPane tab="Menu" key="2">
					<Menu getMenus={getMenus} menus={menus} dishes={dishes} />
				</Tabs.TabPane>

			</Tabs>

		</>
	)
};

export default App;
