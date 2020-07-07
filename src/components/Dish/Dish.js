import React, { useEffect, useState } from "react";

import { Table, Button, Row, Col, Form } from 'antd';

import { A, useStore } from "../../store/store";
import DishFormFields from "./DishFormFields/DishFormFields";

const Dish = ({ dishes, getDishes }) => {
	const dispatch = useStore(false)[1];

	const [loading, setLoading] = useState(false)
	const [selectedDishes, setSelectedDishes] = useState([])

	const [form] = Form.useForm()

	useEffect(() => {
		getDishes({ page: 0 });
	}, [getDishes]);

	useEffect(() => {
		setLoading(false)
		setSelectedDishes([])
	}, [dishes])


	const onFinishHandler = payload => {
		dispatch(A.CREATE_DISH, payload)
		form.resetFields()
	}

	const onSelectDishes = selected => setSelectedDishes(selected)

	const onDeleteHandler = () => {
		setLoading(true)

		selectedDishes.length > 1 ?
			dispatch(A.DELETE_DISHES, { ids: selectedDishes })
			:
			dispatch(A.DELETE_DISH, { id: selectedDishes[0] })
	}

	const columns = [
		{ title: 'Name', dataIndex: 'name' },
		{ title: 'Description', dataIndex: 'description' },
		{ title: 'Price', dataIndex: 'price' },
	]

	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 16 },
	};

	const tailLayout = {
		wrapperCol: { offset: 8, span: 16 },
	};

	const formattedDishes = dishes.map(({ _id, name, description, price }) => (
		{ key: _id, name, description, price }
	))

	const hasSelected = selectedDishes.length > 0

	return (
		<Row gutter={[32, 0]}>

			<Col xs={24} lg={8}>
				<Form {...layout} form={form} name="dishForm" onFinish={onFinishHandler}>

					<DishFormFields />

					<Form.Item {...tailLayout}>
						<Button type="primary" htmlType="submit">
							Create
        		</Button>
					</Form.Item>

				</Form>
			</Col>

			<Col xs={24} lg={16}>

				<div style={{ marginBottom: 16 }}>

					<Button
						type="primary" onClick={onDeleteHandler} loading={loading}
						disabled={!hasSelected}
					>
						Delete
					</Button>

					<span style={{ marginLeft: 8 }}>
						{hasSelected ? `Selected ${selectedDishes.length} items` : ''}
					</span>

				</div>

				<Table
					rowSelection={{ selectedRowKeys: selectedDishes, onChange: onSelectDishes }}
					columns={columns} dataSource={formattedDishes}
				/>
			</Col>

		</Row>
	);
};

export default Dish;
