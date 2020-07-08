export const tableColumns = [
  { dataIndex: 'name', title: 'Name' },
  { dataIndex: 'description', title: 'Description' },
  { dataIndex: 'price', title: 'Price' }
]

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
}

export const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};