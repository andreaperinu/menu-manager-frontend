import React, { useEffect, useState } from 'react'

import { Row, Col, List, Collapse, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

import MenuForm from './MenuForm/MenuForm'
import { A, useStore } from '../../store/store'

const Menu = ({ menus, dishes, getMenus }) => {
  const dispatch = useStore(false)[1]

  const [showForm, setShowForm] = useState(false)

  useEffect(() => { getMenus({ page: 0 }) }, [getMenus])

  const onCreateMenuHandler = (data) => {
    dispatch(A.CREATE_MENU, data)
    setShowForm(false)
  }

  const callback = (key) => console.log(key)

  const getDeleteIcon = id => (
    <DeleteOutlined
      onClick={event => {
        event.stopPropagation();
        dispatch(A.DELETE_MENU, { id })
      }}
    />
  )

  return (
    <Row gutter={[32, 16]}>

      <Col xs={24} /*  lg={8} */>
        {
          showForm ?
            <MenuForm
              dishes={dishes} onCreateMenu={onCreateMenuHandler}
              closeForm={() => setShowForm(false)}
            />
            :
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="primary" onClick={() => setShowForm(true)}>Create menu</Button>
            </div>
        }
      </Col>

      <Col xs={24} /*  lg={16} */>
        <h3>Menu list</h3>
        <Collapse defaultActiveKey={['1']} onChange={callback} accordion>
          {
            menus.map((menu) => (
              <Collapse.Panel header={menu.name} key={menu._id} extra={getDeleteIcon(menu._id)}>

                <h4>Submenus</h4>
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
    </Row>
  )
}

export default Menu
