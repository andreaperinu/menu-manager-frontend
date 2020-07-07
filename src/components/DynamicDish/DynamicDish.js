import React from 'react'

import { Form, Button, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const DynamicDish = ({
  addLabel, name, label, error, formItemLayout, formItemLayoutWithOutLabel
}) => {

  return (
    <Form.List name={name}>
      {
        (fields, { add, remove }) => (
          <>
            {
              fields.map((field, index) => (
                <Form.Item
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? label : ''}
                  required={true}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: error ? true : false,
                        whitespace: true,
                        message: error,
                      },
                    ]}
                    noStyle
                  >

                    <Select>
                      <Select.Option value={`demo_${index}`}>Demo</Select.Option>
                      <Select.Option value={`demo_1_${index}`}>Demo1</Select.Option>
                      <Select.Option value={`demo_2_${index}`}>Demo2</Select.Option>
                      <Select.Option value={`demo_3_${index}`}>Demo3</Select.Option>
                    </Select>

                  </Form.Item>
                  {
                    fields.length > 1 ?
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        style={{ margin: '0 8px' }}
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                      :
                      null
                  }
                </Form.Item>
              ))
            }
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => {
                  add();
                }}
                style={{ width: '100%' }}
              >
                <PlusOutlined /> {addLabel}
              </Button>
            </Form.Item>
          </>
        )
      }
    </Form.List>
  )
}

export default DynamicDish
