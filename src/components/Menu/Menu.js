import React, { useEffect } from 'react'

import { Row, Col, List, Collapse } from 'antd'
import MenuForm from './MenuForm/MenuForm';

const Menu = ({ menus, dishes, getMenus }) => {

	useEffect(() => {
		getMenus({ page: 0 });
	}, [getMenus]);

	useEffect(() => {
		console.log(menus)
	}, [menus])

	const onCreateMenuHandler = (data) => {
		console.log(data)
	}

	const callback = key => console.log(key)

	return (
		<Row gutter={[32, 16]}>

			<Col xs={24}/*  lg={8} */>
				{/* <DishForm /> */}

				<MenuForm dishes={dishes} onCreateMenu={onCreateMenuHandler} />
				
			</Col>

			<Col xs={24}/*  lg={16} */>

				<Collapse defaultActiveKey={['1']} onChange={callback} accordion>
					{
						menus.map(menu => (
							<Collapse.Panel header={menu.name} key={menu._id}>

								<Collapse>
									{
										menu.items.map(subMenu => (
											<Collapse.Panel header={subMenu.name} key={subMenu._id}>

												<List
													itemLayout="horizontal"
													dataSource={subMenu.items}
													renderItem={dish => (
														<List.Item>
															<List.Item.Meta title={dish.name} description={dish.description} />
															<div>{dish.price}</div>
														</List.Item>
													)}
												/>

											</Collapse.Panel>
										))
									}
								</Collapse>

							</Collapse.Panel>
						))
					}
				</Collapse>

			</Col>

		</Row >
	)
}

export default Menu
