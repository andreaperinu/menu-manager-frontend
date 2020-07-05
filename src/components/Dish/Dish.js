import React, { useEffect, useState } from "react";

import { Table, Button, Row, Col, Form, Input, InputNumber } from 'antd';

import { A, useStore } from "../../store";

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

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onSelectDishes = selected => setSelectedDishes(selected)

  const onFinishHandler = payload => {
    dispatch(A.CREATE_DISH, payload)
    form.resetFields()
  }

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

  const formattedDishes = dishes.map(({ _id, name, description, price }) => (
    { key: _id, name, description, price }
  ))

  const hasSelected = selectedDishes.length > 0

  return (
    <Row>
      <Col xs={24} /* lg={8} */>

        <Form {...layout} form={form} name="dishForm" onFinish={onFinishHandler}>

          <Form.Item
            label="Name" name="name"
            rules={[{ required: true, message: 'Please name your dish' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>

          <Form.Item
            label="Price" name="price"
            rules={[{ required: true, message: 'Please insert a price' }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>

        </Form>

      </Col>

      <Col xs={24} /* lg={16} */>

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
