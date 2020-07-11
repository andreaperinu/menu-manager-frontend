import React, { useCallback } from "react";

import { Tabs } from 'antd';
import 'antd/dist/antd.css'

import Dish from './components/Dish/Dish'
import Menu from './components/Menu/Menu'
import { A, useStore } from "./store/store";

const App = () => {
	const [state, dispatch] = useStore();

	const getDishes = useCallback(({ page }) => dispatch(A.GET_DISHES, { page }), [dispatch])
	const getMenus = useCallback(({ page }) => dispatch(A.GET_MENUS, { page }), [dispatch])

	const { menus, dishes, loadingMenus } = state

	return (
		<>
			<h1 style={{ textAlign: 'center' }}>Menu manager</h1>

			<h3>Create your own, customizable menu by saving your preferite Dishes. Then start to compose them!</h3>

			<Tabs defaultActiveKey="1" onChange={key => console.log(key)}>

				<Tabs.TabPane tab="Dish" key="1">
					<Dish getDishes={getDishes} dishes={dishes} />
				</Tabs.TabPane>

				<Tabs.TabPane tab="Menu" key="2">
					<Menu getMenus={getMenus} menus={menus} dishes={dishes} loadingMenus={loadingMenus} />
				</Tabs.TabPane>

			</Tabs>

		</>
	)
};

export default App;
