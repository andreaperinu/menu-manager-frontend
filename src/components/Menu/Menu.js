import React, { useEffect } from 'react'

import { Row, Col, List, Collapse, Form, Button, Input } from 'antd'

import DynamicSubMenu from '../DynamicSubMenu/DynamicSubMenu'

const Menu = ({ menus, dishes, getMenus }) => {

	useEffect(() => {
		getMenus({ page: 0 });
	}, [getMenus]);

	useEffect(() => {
		console.log(menus)
	}, [menus])

	const callback = key => console.log(key)

	const formItemLayout = {
		labelCol: {
			xs: { span: 24 },
			sm: { span: 4 },
		},
		wrapperCol: {
			xs: { span: 24 },
			sm: { span: 20 },
		},
	}

	// const layout = {
	// 	labelCol: { span: 8 },
	// 	wrapperCol: { span: 16 },
	// };

	const formItemLayoutWithOutLabel = {
		wrapperCol: {
			xs: { span: 24, offset: 0 },
			sm: { span: 20, offset: 4 },
		},
	};

	const onFinish = values => {
		console.log('Received values of form:', values);
	};

	return (
		<Row gutter={[32, 16]}>

			<Col xs={24}/*  lg={8} */>
				{/* <DishForm /> */}

				<Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>

					<Form.Item
						label="Menu name" name="menuName"
						rules={[{ required: true, message: 'Please name your menu' }]}
						{...formItemLayout}
					>
						<Input />
					</Form.Item>

					<DynamicSubMenu
						label="boh" name="boh" error="Please name your submenu"
						formItemLayoutWithOutLabel={formItemLayoutWithOutLabel}
						formItemLayout={formItemLayout} addLabel="Add a submenu"
					/>

					<Form.Item>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>

				</Form>
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
