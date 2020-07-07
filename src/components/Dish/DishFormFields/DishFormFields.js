import React from 'react'

import { Form, Input, InputNumber } from 'antd';

const DishFormFields = ({ layout }) => (
  <>
    <Form.Item
      label="Name" name="name" {...layout}
      rules={[{ required: true, message: 'Please name your dish' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item label="Description" name="description" {...layout}>
      <Input />
    </Form.Item>

    <Form.Item
      label="Price" name="price" {...layout}
      rules={[{ required: true, message: 'Please insert a price' }]}
    >
      <InputNumber />
    </Form.Item>

  </>
)

export default DishFormFields
