import React, { useState } from 'react'

import { Table, Form } from 'antd';

import { A, useStore } from "../../../store/store"
import EditableCell from './EditableCell/EditableCell'

const EditableTable = ({ data, rowSelection }) => {

	const dispatch = useStore(false)[1]

	const [form] = Form.useForm();
	const [editingKey, setEditingKey] = useState('');

	const isEditing = record => record.key === editingKey;

	const edit = record => {
		form.setFieldsValue({
			name: '',
			description: '',
			price: 0,
			...record,
		});
		setEditingKey(record.key);
	};

	const cancel = () => {
		setEditingKey('');
	};

	const save = async key => {
		const row = await form.validateFields()
		const item = { id: key, ...row }

		dispatch(A.EDIT_DISH, item)
		setEditingKey('')
	};

	const columns = [
		{ title: 'Name', dataIndex: 'name', editable: false },
		{ title: 'Description', dataIndex: 'description', editable: true },
		{ title: 'Price', dataIndex: 'price', editable: true },
		{
			title: 'operation',
			dataIndex: 'operation',
			render: (_, record) => {
				const editable = isEditing(record);

				return editable ?
					<span>
						<a href="javascript:;" onClick={() => save(record.key)} style={{ marginRight: 8 }}>Save</a>
						<a onClick={cancel}>Cancel</a>
					</span>
					:
					<a disabled={editingKey !== ''} onClick={() => edit(record)}>Edit</a>
			}
		}
	]

	const mergedColumns = columns.map(col => {
		if (!col.editable) {
			return col;
		}

		return {
			...col,
			onCell: record => ({
				record,
				inputType: col.dataIndex === 'price' ? 'number' : 'text',
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
			}),
		};
	});

	return (
		<Form form={form} component={false}>
			<Table
				components={{
					body: {
						cell: EditableCell
					},
				}}
				bordered
				dataSource={data}
				columns={mergedColumns}
				rowClassName="editable-row"
				rowSelection={rowSelection}
				pagination={{
					onChange: cancel,
				}}
			/>
		</Form>
	);
};

export default EditableTable
