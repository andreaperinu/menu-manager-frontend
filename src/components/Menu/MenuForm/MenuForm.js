import React, { useState } from 'react'

import { Form, Button, Input } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import TableTransfer from '../../TableTransfer/TableTransfer';
import { formItemLayoutWithOutLabel, formItemLayout, tableColumns } from './menuConfig';

const MenuForm = ({ dishes, onCreateMenu }) => {

  const [transferData, setTransferData] = useState([])

  const onFinish = ({ menuName, submenuNames }) => {

    const menu = {
      name: menuName,
      items: submenuNames.map((subMenuName, idx) => ({
        name: subMenuName,
        items: dishes.map(({ _id }) => transferData[idx].find(__id => __id === _id))
      }))
    }

    console.log('menu', menu)


    // console.log(values)
    // const dishes = dishes.map(({_id}) => )
    // const menu = {

    // }
    // values => onCreateMenu(values, [...transferData])


    // state.dishes.filter(({ _id }) => !ids.find(removed_id => removed_id === _id))
  }

  return (
    <Form
      name="dynamic_form_item" {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
    >

      <Form.Item
        label="Menu name" name="menuName"
        rules={[{ required: true, message: 'Please name your menu' }]}
        {...formItemLayout}
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
                    label={index === 0 ? 'Submenus' : ''}
                    required={true}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: 'Please name your submenu',
                        },
                      ]}
                      noStyle
                    >

                      <Input placeholder="Submenu name" style={{ width: '100%' }} />

                    </Form.Item>

                    <TableTransfer
                      name="transfer"
                      dataSource={dishes.map(({ _id, name, description, price }) => ({
                        key: _id, name, description, price
                      }))}
                      targetKeys={transferData[index]}
                      disabled={false}
                      showSearch={true}
                      onChange={nextTargetKeys => setTransferData(prev => {
                        prev[index] = nextTargetKeys
                        return [...prev]
                      })}
                      filterOption={(inputValue, item) =>
                        item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
                      }
                      leftColumns={tableColumns}
                      rightColumns={tableColumns}
                    />

                    {
                      fields.length > 1 ?
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          style={{ margin: '0 8px' }}
                          onClick={() => remove(field.name)}
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
                  <PlusOutlined /> Add a submenu
                </Button>
              </Form.Item>
            </>
          )
        }
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
						</Button>
      </Form.Item>

    </Form>
  )
}

export default MenuForm
