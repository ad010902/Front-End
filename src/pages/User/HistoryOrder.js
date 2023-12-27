import React from "react";
import { Avatar, List, Select, Space } from "antd";

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const HistoryOrder = () => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta title={<a> {item.title} </a>} description="" />
        </List.Item>
      )}
    />
  );
};
