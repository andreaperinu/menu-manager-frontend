import React from 'react'

import { Form, Button, Input } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import DynamicDish from '../DynamicDish/DynamicDish';

const DynamicSubMenu = ({
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

                    <Input placeholder="Submenu name" style={{ width: '100%' }} />

                    <DynamicDish
                      label="buh" name="buh" error="Please name your submenu"
                      formItemLayoutWithOutLabel={formItemLayoutWithOutLabel}
                      formItemLayout={formItemLayout} addLabel="Add a submenu"
                    />

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

export default DynamicSubMenu
