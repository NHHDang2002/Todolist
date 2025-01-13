import React from 'react';
import statusOptions from '../constants/StatusOptions';
import { Button, Dropdown, Space, List } from 'antd';
import { DeleteFilled, EditFilled, DownOutlined } from '@ant-design/icons';

export default function TaskList({ tasks, newSearch, setStatusTask, deleteTask, editTask }) {
  // Lọc danh sách task dựa trên tìm kiếm
  const tasksToRender = tasks.filter((task) => {
    const searchLower = newSearch.toLowerCase();
    return (
      task.text.toLowerCase().includes(searchLower) ||
      task.status.toLowerCase().includes(searchLower)
    );
  });

  if (tasksToRender.length === 0) {
    return <p>NOT FOUND</p>;
  }

  return (
    <List
      dataSource={tasksToRender}
      renderItem={(task) => {
        // Tạo các menu items cho dropdown
        const menuItems = statusOptions.map((statusOption) => ({
          key: statusOption.id,
          label: (
            <Button type="text" onClick={() => setStatusTask(task.id, statusOption.content)}>
              {statusOption.content}
            </Button>
          ),
        }));

        // Dropdown Menu
        const dropdownMenu = (
          <Dropdown menu={{ items: menuItems }} trigger={['click']}>
            <Button>
              <Space>
                {task.status}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        );

        return (
          <List.Item
            key={task.id}
            actions={[
              <Button key="edit" type="primary" onClick={() => editTask(task.id)} danger>
                <EditFilled />
              </Button>,
              <Button key="delete" type="primary" onClick={() => deleteTask(task.id)} danger>
                <DeleteFilled />
              </Button>,
              dropdownMenu, // Dropdown menu cho status
            ]}
          >
            <List.Item.Meta
              title={task.text}
              // description={`Task ID: ${task.id}`}
            />
          </List.Item>
        );
      }}
    />
  );
}
