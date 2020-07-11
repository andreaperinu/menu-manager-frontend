import React, { useState } from 'react'

import { Form, Button, Input, Modal } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import TableTransfer from '../../TableTransfer/TableTransfer'
import {
  formItemLayoutWithOutLabel,
  formItemLayout,
  tableColumns,
} from './menuConfig'

const MenuForm = ({ dishes, onCreateMenu, closeForm }) => {

  const [transferData, setTransferData] = useState([])
  const [form] = Form.useForm()

  const onFinish = ({ menuName, submenuNames }) => {
    const menu = {
      name: menuName,
      items: submenuNames.map((submenuName, idx) => ({
        name: submenuName,
        items: transferData[idx] ?
          dishes
            .filter(({ _id }) => transferData[idx].find((__id) => __id === _id))
            .map(({ name, description, price }) => ({ name, description, price }))
          :
          []
      }))
    }

    const dishesNotFullfilled = !menu.items.length || menu.items.some(submenu => !submenu.items.length)
    if (dishesNotFullfilled) {
      Modal.info({
        title: 'Form error',
        content: <p>Please fill your dishes!</p>,
        onOk() { },
      });
      return
    }

    onCreateMenu(menu)
    form.resetFields()
    setTransferData([])
  };

  return (
    <Form
      name="dynamic_form_item" {...formItemLayoutWithOutLabel}
      initialValues={{ submenuNames: [""] }} onFinish={onFinish}
      form={form}
    >

      <Form.Item
        label="Menu name" name="menuName" {...formItemLayout}
        rules={[{ required: true, message: 'Please name your menu' }]}
      >
        <Input />
      </Form.Item>

      <Form.List name="submenuNames">
        {
          (fields, { add, remove }) => (
            <>
              {
                fields.map((field, index) => (
                  <Form.Item
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? 'Submenus' : ''} required={true} key={field.key}
                  >
                    <Form.Item
                      {...field} validateTrigger={['onChange', 'onBlur']} noStyle
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: 'Please name your submenu'
                        }
                      ]}
                    >
                      <Input placeholder="Submenu name" style={{ width: '100%' }} />
                    </Form.Item>

                    <TableTransfer
                      style={{ marginTop: '1rem' }}
                      name="transfer" leftColumns={tableColumns} rightColumns={tableColumns}
                      dataSource={dishes.map(({ _id, name, description, price }) => ({
                        key: _id, name, description, price
                      }))}
                      targetKeys={transferData[index]} disabled={false} showSearch={true}
                      onChange={nextTargetKeys => setTransferData(prev => {
                        prev[index] = nextTargetKeys
                        return [...prev]
                      })}
                      filterOption={(inputValue, item) =>
                        item.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                      }
                    />

                    {
                      fields.length > 1 && (
                        <MinusCircleOutlined
                          className="dynamic-delete-button" style={{ margin: '0 8px' }}
                          onClick={() => remove(field.name)}
                        />
                      )
                    }
                  </Form.Item>
                ))
              }

              <Form.Item>
                <Button type="dashed" onClick={() => { add() }} style={{ width: '100%' }}>
                  <PlusOutlined /> Add a submenu
                </Button>
              </Form.Item>
            </>
          )
        }
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
        <Button type="primary" onClick={closeForm} style={{ marginLeft: '.5rem' }}>Cancel</Button>
      </Form.Item>

    </Form>
  )
}

export default MenuForm
